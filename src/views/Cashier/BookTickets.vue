<script>
import axiosInstance from '@/service/api';
import Sidebar from '@/components/CashierSidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      tickets: [],
      dialog: false,
      formValid: false,
      dialogTitle: 'Add Ticket',
      ticketToEdit: null,
      newTicket: { route_from: '', route_to: '', card_name: '', ticket_number: '', amount: '' },
      searchQuery: '',
      filterByRoute: 'All',
      page: 1,
      perPage: 8,
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
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.get('/ticket-transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.tickets = response.data.data || [];
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    openDialog(ticket = null) {
      this.dialog = true;
      if (ticket) {
        this.dialogTitle = 'Edit Ticket';
        this.ticketToEdit = ticket;
        this.newTicket = { ...ticket };
      } else {
        this.dialogTitle = 'Add Ticket';
        this.ticketToEdit = null;
        this.newTicket = { route_from: '', route_to: '', card_name: '', ticket_number: '', amount: '' };
      }
    },
    closeDialog() {
      this.dialog = false;
      this.newTicket = { route_from: '', route_to: '', card_name: '', ticket_number: '', amount: '' };
      this.ticketToEdit = null;
    },
    async saveTicket() {
      if (!this.formValid) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        if (this.ticketToEdit) {
          const response = await axiosInstance.put(`/tickets/${this.ticketToEdit.id}`, this.newTicket, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const index = this.tickets.findIndex(ticket => ticket.id === this.ticketToEdit.id);
          this.tickets.splice(index, 1, response.data.data);
        } else {
          const response = await axiosInstance.post('/addTicket', this.newTicket, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.tickets.push(response.data.data);
        }

        this.closeDialog();
      } catch (error) {
        console.error('Error saving ticket:', error);
      }
    },
    async deleteTicket(ticketId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.delete(`/deleteTicket/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        }
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    },
  },
};
</script>

<template>
  <v-app>
    <Sidebar />
    <v-container class="mt-16">
      <v-row>
        <v-col>
          <v-card elevation="0">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="searchQuery" label="Search Tickets" prepend-inner-icon="mdi-magnify" variant="outlined" clearable />
                </v-col>
               
              </v-row>
              <v-toolbar flat>
      <v-toolbar-title>All Tickets</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="openDialog" color="green" style="text-transform: capitalize;"  variant="flat">
        <v-icon left>mdi-account</v-icon>Book A ticket
      </v-btn>
    </v-toolbar>
    <br>
              <v-data-table
  :items="paginatedTickets"
  :headers="[
    { title: 'Ticket Number', value: 'ticket_number' },
    { title: 'Amount', value: 'amount' },
    { title: 'Route', value: 'route' },
    { title: 'Card Name', value: 'card_name' },
    { title: 'Actions', value: 'actions', sortable: false }
  ]"
  class="elevation-0"
  :items-per-page="perPage"
>
  <!-- Scoped slots for custom cell rendering -->
  <template v-slot:body="{ items }">
    <tr v-for="ticket in items" :key="ticket.id">
      <td>{{ ticket.ticket_number }}</td>
      <td>KES {{ ticket.amount }}</td>
      <td>
        {{ ticket.route ? `${ticket.route.from} - ${ticket.route.to}` : 'No route' }}
      </td>
      <td>
        {{ ticket.card ? ticket.card.name : 'No card' }}
      </td>
      <td>
        <v-btn @click="editTicket(ticket)" icon color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="deleteTicket(ticket.id)" icon color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </td>
    </tr>
  </template>
</v-data-table>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-toolbar>
            <v-card-text class="text-center" style="font-size: 21px;">
              {{ dialogTitle }}
            </v-card-text>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <v-text-field v-model="newTicket.route_from" label="Route From" required />
              <v-text-field v-model="newTicket.route_to" label="Route To" required />
              <v-text-field v-model="newTicket.card_name" label="Card Name" required />
              <v-text-field v-model="newTicket.ticket_number" label="Ticket Number" required />
              <v-text-field v-model="newTicket.amount" label="Amount" type="number" required />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveTicket" :disabled="!formValid">Save</v-btn>
            <v-btn text @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
