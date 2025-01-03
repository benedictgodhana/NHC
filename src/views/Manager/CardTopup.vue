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

            <!-- Top-Up Dialog -->
           
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

            <!-- v-data-table -->
            <v-data-table
              :headers="headers"
              :items="topups"
              :search="searchQuery"
              item-value="id"
              class="elevation-1"
              :loading="loading"
              :total-items="totalItems"
              :items-per-page="perPage"
              :page.sync="page"
            >
              <template v-slot:body="{ items }">
                <tr v-for="topup in items" :key="topup.id">
                  <td>{{ topup.card.name }}</td>
                  <td>{{ topup.amount }}</td>
                  <td>{{ topup.transaction_reference }}</td>
                  <td>{{ topup.user.name }}</td>
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
              </template>
            </v-data-table>

            <!-- Pagination -->
          
          </v-card>
        </v-col>
      </v-row>

      
    </v-container>


     <v-dialog
              v-model="dialog"
              max-width="500px"
              persistent
            >
                <v-card>
                  <v-card-title class="headline">Top-up Form</v-card-title>

                  <v-card-text>

                  <!-- Form Section -->
                  <v-form ref="form" v-model="formValid">
                    <v-select
  v-model="newTopup.card_id"
  :items="cards"
  label="Card Holder"
  item-value="id"
  item-title="name"
  required
  variant="outlined"
  style="border-radius: 8px; margin-bottom: 20px;"
></v-select>


                    <!-- Amount Field -->
                    <v-text-field
                      v-model="newTopup.amount"
                      label="Amount"
                      required
                      variant="outlined"
                      type="number"
                      style="border-radius: 8px; margin-bottom: 20px;"
                    ></v-text-field>

                    <!-- Action Buttons Row -->
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
                </v-card-text>
                </v-card>
            </v-dialog>

  </v-app>
</template>

<script>
import axiosInstance from '@/service/api'; // Import your axios instance
import Sidebar from '@/components/ManagerSidebar.vue'; // Ensure the path is correct

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      topups: [],
      cards: [], // Array to hold the fetched cards
      dialog: false,
      formValid: false,
      newTopup: { card_id: '', amount: '' },
      searchQuery: '',
      showForm: false,
      topupToEdit: null,
      page: 1, // Current page
      perPage: 10, // Records per page
      totalPages: 0, // Total number of pages
      totalItems: 0, // Total items for pagination
      headers: [
        { title: 'Card Holder', value: 'card.name' },
        { title: 'Amount', value: 'amount' },
        { title: 'Transaction Code', value: 'transaction_reference' },
        { title: 'Created BY', value: 'user,name' },
        { title: 'Status', value: 'status' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
    };
  },

  mounted() {
    this.fetchTopups();
    this.fetchCards(); // Ensure this method is called
  },

  methods: {
    async fetchTopups() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        this.loading = true;

        const response = await axiosInstance.get(`/card-topups?page=${this.page}&perPage=${this.perPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.topups && response.data.topups.data.length > 0) {
          this.topups = response.data.topups.data; 
          this.totalItems = response.data.topups.total; 
          this.totalPages = response.data.topups.last_page; 
        } else {
          console.warn('No topups available.');
        }
      } catch (error) {
        console.error('Error fetching topups:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCards() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('No token found. Please log in.');
      this.cards = []; // Reset cards to an empty array
      return;
    }

    const response = await axiosInstance.get('/active-cards', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update to correctly reference the `active_cards` array
    if (response.data && Array.isArray(response.data.data.active_cards) && response.data.data.active_cards.length > 0) {
      console.log('Cards fetched successfully:', response.data.data.active_cards);
      this.cards = response.data.data.active_cards;
    } else {
      console.warn('No active cards available. Response:', response.data);
      this.cards = []; // Reset cards to an empty array
    }
  } catch (error) {
    console.error('Error fetching cards:', error.message || error);
    this.cards = []; // Reset cards to an empty array
  }
},




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
          this.dialog = false;
        } else {
          console.error('Failed to top up card:', response.data.message);
        }
      } catch (error) {
        console.error('Error topping up card:', error);
      }
    },

    editTopup(topup) {
      this.topupToEdit = { ...topup };
      this.newTopup = { ...topup };
      this.dialog = true;
    },

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
          this.dialog = false;
        } else {
          console.error('Failed to update top-up:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating top-up:', error);
      }
    },

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

    toggleForm() {
      this.dialog = !this.dialog;
      this.topupToEdit = null;
      this.newTopup = { card_id: '', amount: '' };
      this.formValid = false;
    },

    printTopups() {
      // Handle printing functionality
      console.log('Print top-ups');
    },

    exportTopups() {
      // Handle exporting functionality
      console.log('Export top-ups');
    },
  },
};
</script>
``
