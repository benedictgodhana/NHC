<template>
  <v-app>
    <Sidebar /> <!-- Sidebar -->
    <v-container class="container" width="100%">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" width="100%" style="max-width: 1200px; border-radius: 10px; overflow: hidden;">
  <v-card-title style="background-color: #D32F2F; color: white; text-align: center; font-weight: bold;">
    Card Topups
  </v-card-title>
  
  <br><br>

  <div v-if="showForm">
    <v-form ref="form" v-model="formValid">
      <v-text-field
        v-model="newTopup.card_id"
        label="Card ID"
        required
        variant="outlined"
        style="border-radius: 8px; margin-bottom: 20px;"
      ></v-text-field>
      <v-text-field
        v-model="newTopup.amount"
        label="Amount"
        required
        variant="outlined"
        type="number"
        style="border-radius: 8px; margin-bottom: 20px;"
      ></v-text-field>
      <v-row>
        <v-col>
          <v-btn
            color="primary"
            @click="submitTopup"
            :disabled="!formValid"
            width="100%"
            style="text-transform: capitalize; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
          >
            Submit
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            text
            @click="toggleForm"
            color="red"
            width="100%"
            style="text-transform: capitalize; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
          >
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>

  <div v-else>
    <!-- Search and Filter Controls -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="searchQuery"
          label="Search Topups"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          style="border-radius: 8px;"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4" class="text-right">
        <v-btn @click="printTopups" color="secondary" icon class="mr-2" style="border-radius: 8px;">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn @click="exportTopups" color="primary" icon class="mr-2" style="border-radius: 8px;">
          <v-icon>mdi-file-export</v-icon>
        </v-btn>
        <v-btn @click="toggleForm" color="primary" class="mr-2" icon style="border-radius: 8px;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cards Table with action buttons -->
    <v-table class="v-table" style="border-radius: 8px; overflow: hidden; margin-top: 20px;">
      <thead>
        <tr style="background-color: #D32F2F; color: white; font-weight: bolder;">
          <th>Card ID</th>
          <th>Amount</th>
          <th>Transaction Code</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topup in topups" :key="topup.id" style="transition: background-color 0.3s;">
          <td>{{ topup.card.name }}</td>
          <td>{{ topup.amount }}</td>
          <td>{{ topup.transaction_reference }}</td>
          <td>{{ topup.status }}</td>
          <td>
            <v-btn @click="editTopup(topup)" icon elevation="0">
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deleteTopup(topup.id)" icon elevation="0">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <v-pagination 
      v-if="totalPages > 1" 
      v-model="page" 
      :length="totalPages" 
      rounded 
      @input="fetchTopups"
      style="margin-top: 20px; justify-content: center;"
    />
  </div>
</v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

  
  <script>
  import axiosInstance from '@/service/api'; // Import your axios instance
  import Sidebar from '@/components/Sidebar.vue'; // Ensure the path is correct
  
  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        topups: [],
        dialog: false,
        formValid: false,
        newTopup: { card_id: '', amount: '' }, 
        searchQuery: '',
        
        showForm: false,
        topupToEdit: null, // Track which topup is being edited
        page: 1, // Current page
    perPage: 8, // Records per page
    totalPages: 0, // Total number of pages for pagination
      };
    },
    


    mounted() {
      this.fetchTopups();
    },
    methods: {
      async fetchTopups() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Request with pagination
    const response = await axiosInstance.get(`/card-topups?page=${this.page}&perPage=${this.perPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.topups && response.data.topups.data.length > 0) {
      this.topups = response.data.topups.data; // Access the actual paginated data
      this.totalPages = response.data.topups.last_page; // Total number of pages
    } else {
      console.warn('No topups available.');
    }
  } catch (error) {
    console.error('Error fetching topups:', error);
  }
},




      // Submit a new top-up
      async submitTopup() {
        if (!this.formValid) return;
  
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }
  
          const response = await axiosInstance.post('/top-up', this.newTopup, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            this.topups.push(response.data.data);
            this.toggleForm();
          } else {
            console.error('Failed to top up card:', response.data.message);
          }
        } catch (error) {
          console.error('Error topping up card:', error);
        }
      },
  
      // Edit top-up
      editTopup(topup) {
        this.topupToEdit = { ...topup }; 
        this.newTopup = { ...topup }; 
        this.showForm = true;
      },
  
      // Update top-up
      async updateTopup() {
        if (!this.formValid) return;
  
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }
  
          const response = await axiosInstance.put(`/card-topups/${this.topupToEdit.id}`, this.newTopup, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            const index = this.topups.findIndex(topup => topup.id === this.topupToEdit.id);
            this.topups.splice(index, 1, response.data.data);
            this.toggleForm();
          } else {
            console.error('Failed to update top-up:', response.data.message);
          }
        } catch (error) {
          console.error('Error updating top-up:', error);
        }
      },
  
      // Delete top-up
      async deleteTopup(topupId) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }
  
          const response = await axiosInstance.delete(`/card-topups/${topupId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            this.topups = this.topups.filter(topup => topup.id !== topupId);
          } else {
            console.error('Failed to delete top-up:', response.data.message);
          }
        } catch (error) {
          console.error('Error deleting top-up:', error);
        }
      },
  
      // Print top-ups
      printTopups() {
        window.print();
      },
      
  
      // Export top-ups to CSV
      exportTopups() {
        const csvContent = 'Card ID,Amount\n' + this.filteredTopups.map(topup => {
          return `${topup.card_id},${topup.amount}`;
        }).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'topups.csv';
        link.click();
      },
  
      // Toggle form visibility
      toggleForm() {
        this.showForm = !this.showForm;
        this.newTopup = { card_id: '', amount: '' }; 
        this.topupToEdit = null;
      },
    },
  };
  </script>
  