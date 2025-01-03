<script>
import axiosInstance from '@/service/api'; // Import your axios instance
import Sidebar from '@/components/Sidebar.vue'; // Ensure the path is correct

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      alert: null, // Alert object
      isSubmitting: false,  // Initialize as false
        cards: [], // Initialize cards        dialog: false,
      formValid: false,
      newCard: { name: '', description: '', price: '' }, // Update form for card fields
      searchQuery: '',
      filterByCategory: 'All',
      page: 1,
      perPage: 5,
      showForm: false,
      cardToEdit: null, // Track which card is being edited
    };
  },
  computed: {
    filteredCards() {
      let cards = this.cards;

      if (this.searchQuery) {
        cards = cards.filter(card =>
          card.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.filterByCategory !== 'All') {
        cards = cards.filter(card => card.category === this.filterByCategory);
      }

      return cards;
    },
    paginatedCards() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCards.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCards.length / this.perPage);
    },
  },
  mounted() {
    this.fetchCards();
  },
  methods: {


    clearAlert() {
    this.alert = null;  // Clear alert when user closes it
  },
    // Fetch Cards
    async fetchCards() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const response = await axiosInstance.get('/active-cards', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      this.cards = response.data.data.active_cards; // Directly assigning the array of cards

      // Log the complete cards object

      // Log the specific active cards array
      console.log('Active Cards:', this.cards);
    } else {
      this.cards = [];
      console.warn('No cards available.');
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
},


async submitCard() {
  if (!this.formValid || this.isSubmitting) return;

  this.isSubmitting = true;  // Set submitting to true at the start

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error('No token found. Please log in.');
      this.isSubmitting = false;  // Reset submitting state
      return;
    }

    const response = await axiosInstance.post('/add-card', this.newCard, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      this.cards.push(response.data.data);
      this.toggleForm();

      // Show success alert
      this.alert = { type: 'success', message: 'Card added successfully!' };
    } else {
      console.error('Failed to add card:', response.data.message);

      // Show error alert
      this.alert = { type: 'error', message: response.data.message || 'Failed to add card.' };
    }
  } catch (error) {
    console.error('Error adding card:', error);
    this.alert = { type: 'error', message: 'An unexpected error occurred.' };
  } finally {
    this.isSubmitting = false;  // Reset submitting state regardless of outcome
  }
},


    editCard(card) {
    this.cardToEdit = { ...card }; // Set the card to edit
    this.newCard = { ...card }; // Pre-fill the form
    this.showForm = true; // Show the form in edit mode
  },
 
async updateCard() {
  if (!this.formValid || this.isSubmitting) return;

  this.isSubmitting = true; // Set submitting to true

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error('No token found. Please log in.');
      this.isSubmitting = false;
      return;
    }

    const response = await axiosInstance.put(`/cards/${this.cardToEdit.id}`, this.newCard, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      const index = this.cards.findIndex(card => card.id === this.cardToEdit.id);
      this.cards.splice(index, 1, response.data.data);
      this.toggleForm();

      // Show success alert
      this.alert = { type: 'success', message: 'Card updated successfully!' };

      // Auto-hide alert after 4 seconds
      setTimeout(() => {
        this.clearAlert();
      }, 4000); // 4000 ms = 4 seconds
    } else {
      console.error('Failed to update card:', response.data.message);

      // Show error alert
      this.alert = { type: 'error', message: response.data.message || 'Failed to update card.' };

      // Auto-hide alert after 4 seconds
      setTimeout(() => {
        this.clearAlert();
      }, 4000); // 4000 ms = 4 seconds
    }
  } catch (error) {
    console.error('Error updating card:', error);
    this.alert = { type: 'error', message: 'An unexpected error occurred.' };

    // Auto-hide alert after 4 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 4000); // 4000 ms = 4 seconds
  } finally {
    this.isSubmitting = false; // Reset submitting state
  }
},

    // Delete card
    async deleteCard(cardId) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.delete(`/deleteCard/${cardId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request headers
          },
        });

        if (response.data.success) {
          this.cards = this.cards.filter(card => card.id !== cardId);
        } else {
          console.error('Failed to delete card:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },

    // Print cards
    printCards() {
      window.print();
    },

    // Export cards to CSV
    exportCards() {
      const csvContent = 'Name,Description,Price\n' + this.filteredCards.map(card => {
        return `${card.name},${card.description},${card.price}`;
      }).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cards.csv';
      link.click();
    },

    toggleForm() {
    this.showForm = !this.showForm;
    this.newCard = { name: '', description: '', price: '' }; // Reset form for add
    this.cardToEdit = null; // Clear edit mode
  },
  },

  created() {
    this.fetchCards();
  },
};
</script>

<template>
  <v-app>
    <Sidebar />
    <v-container class="container" width="100%">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" width="100%" style="max-width: 1200px;">
            <v-card-title style="background-color: red; color: white;">Cards</v-card-title>
            <br />

            <!-- Card Form -->
            <div v-if="showForm">

                <!-- Alert for success or error -->
      <v-alert
        v-if="alert"
        :value="alert !== null"
        :type="alert.type"
        :close-button="true"
        @close="clearAlert"
      >
        {{ alert.message }}
      </v-alert>
      <br>
              <v-card>
                <v-card-title style="background:red">
                  <span>{{ cardToEdit ? 'Edit Card' : 'Add New Card' }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="formValid">
  <br>
  <v-text-field
    v-model="newCard.serial_number"
    label="Card Serial Number"
    required
    variant="outlined"
  ></v-text-field>
  
  <v-text-field
    v-model="newCard.name"
    label="Card Name"
    required
    variant="outlined"
  ></v-text-field>
  
  <v-text-field
    v-model="newCard.email"
    label="Card Email"
    required
    variant="outlined"
  ></v-text-field>
  
  <v-text-field
    v-model="newCard.tel"
    label="Card Phone"
    required
    variant="outlined"
    type="tel"  
  ></v-text-field>
  
  <v-select
    v-model="newCard.status"
    :items="['Active', 'Inactive']"
    label="Card Status"
    required
    variant="outlined"
  ></v-select>

  <v-row>
    <v-col>
      <v-btn
        :color="cardToEdit ? 'success' : 'primary'"
        :loading="isSubmitting"  
        @click="cardToEdit ? updateCard() : submitCard()"
        :disabled="!formValid || isSubmitting"  
        style="text-transform: capitalize;"
        width="100%"

      >
        {{ cardToEdit ? 'Update Card' : 'Submit' }}
      </v-btn>
    </v-col>
    <v-col>
      <v-btn
        text
        @click="toggleForm"
        color="red"
        width="100%"
        style="text-transform: capitalize;"
      >
        Cancel
      </v-btn>
    </v-col>
  </v-row>
</v-form>

                </v-card-text>
              </v-card>
            </div>

            <!-- Cards List -->
            <div v-else>
              <v-row class="mb-4">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="searchQuery"
                    label="Search Cards"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="text-right">
                  <v-btn @click="printCards" color="secondary" class="mr-2" style="text-transform: capitalize;">
                    <v-icon>mdi-printer</v-icon>Print
                  </v-btn>
                  <v-btn @click="exportCards" color="primary"  class="mr-2" style="text-transform: capitalize;">
                    <v-icon>mdi-file-export</v-icon>Export
                  </v-btn>
                  <v-btn @click="toggleForm" color="primary" class="mr-2" style="text-transform: capitalize;" >
                    <v-icon>mdi-plus</v-icon>Add Card
                  </v-btn>
                </v-col>
              </v-row>

              <v-table v-if="filteredCards.length">
                <thead>
                  <tr style="background-color: red; color: white; font-weight: bolder;">
                    <th>Serial Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="card in paginatedCards" :key="card.id">
                    <td>{{ card.serial_number }}</td>
                    <td>{{ card.name }}</td>
                    <td>{{ card.email }}</td>
                    <td>{{ card.tel }}</td>
                    <td>{{ card.status }}</td>
                    <td>
                      <v-btn @click="editCard(card)" icon elevation="0">
                        <v-icon color="success">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn @click="deleteCard(card.id)" icon elevation="0">
                        <v-icon color="red">mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <v-alert v-else type="info" elevation="2">
                No cards found matching your criteria.
              </v-alert>

              <v-pagination v-model="page" :length="totalPages" class="mt-4" />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
