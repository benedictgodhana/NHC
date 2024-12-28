<script>
import axiosInstance from '@/service/api'; // Import your axios instance
import Sidebar from '@/components/CashierSidebar.vue'; // Ensure the path is correct

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      tickets: [],
      dialog: false,
      formValid: false,
      newTicket: { route_id: '', card_id: '', ticket_number: '', amount: '' },
      searchQuery: '',
      filterByRoute: 'All',
      page: 1,          // Current page
  perPage: 8,       // Items per page
  totalPages: 0,  
      showForm: false,
      ticketToEdit: null, // Track which ticket is being edited
    };
  },


  computed: {
    paginatedTickets() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tickets.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.tickets.length / this.perPage);
    },
  },
 
  mounted() {
    this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        // Fetch ticket transactions from the backend
        const response = await axiosInstance.get("/ticket-transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the full response for debugging
        console.log("API Response:", response);

        // If the response data doesn't contain success, log the response to inspect it
        if (response.data && response.data.data) {
          console.log("Fetched Data:", response.data.data); // Log the data part

          // Map over the ticket data and ensure necessary properties are available
          this.tickets = response.data.data.map(ticket => ({
            ...ticket,
            card_name: ticket.card ? ticket.card.name : "No card", // Ensure card name is available
            route_from: ticket.route ? ticket.route.from : "No route", // Ensure route from is available
            route_to: ticket.route ? ticket.route.to : "No route", // Ensure route to is available
            route_fare: ticket.route ? ticket.route.fare : "No fare", // Include route fare
          }));

          console.log("Tickets fetched successfully:", this.tickets); // Check if tickets are correctly mapped
        } else {
          console.error("Failed to fetch tickets: Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
        if (error.response) {
          console.error("Error Response:", error.response); // Log the full error response
        }
      }
    },

    // Submit a new ticket
    async submitTicket() {
      if (!this.formValid) return;

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.post('/addTicket', this.newTicket, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          this.tickets.push(response.data.data);
          this.toggleForm();
        } else {
          console.error('Failed to add ticket:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding ticket:', error);
      }
    },

    // Edit ticket
    editTicket(ticket) {
      this.ticketToEdit = { ...ticket }; // Set the ticket to edit
      this.newTicket = { ...ticket }; // Pre-fill the form with the selected ticket's data
      this.showForm = true; // Show the form in edit mode
    },

    // Update ticket
    async updateTicket() {
      if (!this.formValid) return;

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.put(`/tickets/${this.ticketToEdit.id}`, this.newTicket, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const index = this.tickets.findIndex(ticket => ticket.id === this.ticketToEdit.id);
          this.tickets.splice(index, 1, response.data.data);
          this.toggleForm();
        } else {
          console.error('Failed to update ticket:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating ticket:', error);
      }
    },

    // Delete ticket
    async deleteTicket(ticketId) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.delete(`/deleteTicket/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        } else {
          console.error('Failed to delete ticket:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    },

    // Print tickets
    printTickets() {
      window.print();
    },

    // Export tickets to CSV
    exportTickets() {
      const csvContent = 'Ticket Number,Amount,Route,Card ID,Created At\n' + this.tickets.map(ticket => {
        return `${ticket.ticket_number},${ticket.amount},${ticket.route_id},${ticket.card_id},${ticket.created_at}`;
      }).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'tickets.csv';
      link.click();
    },

    // Toggle form visibility
    toggleForm() {
      this.showForm = !this.showForm;
      this.newTicket = { route_id: '', card_id: '', ticket_number: '', amount: '' }; // Clear the form when toggling
      this.ticketToEdit = null;
    },
  },

  created() {
    this.fetchTickets();
  },
};
</script>

<template>
  <v-app>
    <Sidebar /> <!-- This is where the sidebar is included -->
    <v-container class="container" width="100%">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" width="100%" style="max-width: 1200px;">
            <v-card-title style="background-color: red;">Tickets</v-card-title>
            <br><br>

            <div v-if="showForm">
              <v-form ref="form" v-model="formValid">
                <v-text-field v-model="newTicket.route.from" label="Route From" required variant="outlined"></v-text-field>
                <v-text-field v-model="newTicket.route.to" label="Route To" required variant="outlined"></v-text-field>
                <v-text-field v-model="newTicket.card.name" label="Name" required variant="outlined"></v-text-field>
                <v-text-field v-model="newTicket.ticket_number" label="Ticket Number" required variant="outlined"></v-text-field>
                <v-text-field v-model="newTicket.amount" label="Amount" type="number" required variant="outlined"></v-text-field>
                <v-row>
                  <v-col>

                <v-btn color="primary" @click="submitTicket" :disabled="!formValid" width="100%" style="text-transform: capitalize;">Submit</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn text @click="toggleForm" color="red" width="100%" style="text-transform: capitalize;">Cancel</v-btn>

                  </v-col>
                </v-row>

              </v-form>
            </div>

            <div v-else>
              <!-- Search and Filter Controls -->
              <v-row class="mb-4">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Search Tickets"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    v-model="searchQuery"
                    @input="fetchTickets"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
               
                <v-col cols="12" sm="12" md="4" class="text-right">
                  <v-btn @click="printTickets" color="secondary" icon class="mr-2">
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                  <v-btn @click="exportTickets" color="primary" icon class="mr-2">
                    <v-icon>mdi-file-export</v-icon>
                  </v-btn>
                  <v-btn @click="toggleForm" color="primary" class="mr-2" icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Tickets Table with action buttons -->
              <v-table v-if="tickets.length" class="v-table">
                <thead>
                  <tr style="text-transform: uppercase; background-color: red; color:white; font-weight:bolder;">
                    <th>Ticket Number</th>
                    <th>Amount</th>
                    <th>Route</th>
                    <th>Card Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <br>
                <tbody>
                  <tr  v-for="ticket in paginatedTickets" :key="ticket.id">
                    <td>{{ ticket.ticket_number }}</td>
                    <td style="text-transform: uppercase;"> KES {{ ticket.amount }}</td>
                    <td>{{ ticket.route ? `${ticket.route.from} - ${ticket.route.to}` : "No route" }}</td>
                    
                    <td>{{ ticket.card ? ticket.card.name : "No card"}}</td>
                    <td>{{ ticket.created_at }}</td>
                    <td>
                      <v-btn @click="editTicket(ticket)" icon color="white" elevation="0">
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn @click="deleteTicket(ticket.id)" icon elevation="0" >
                        <v-icon color="red">mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-pagination v-model="page" :length="totalPages" rounded></v-pagination>

              <!-- Pagination -->
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
