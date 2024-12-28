<script>
import axiosInstance from '@/service/api'; // Import your axios instance
import Sidebar from '@/components/ManagerSidebar.vue'; // Ensure the path is correct

export default {
  components: {
    Sidebar,
  },
  data() {
    return {

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



    // Submit a new card
    async submitCard() {
      if (!this.formValid) return;

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.post('/addCard', this.newCard, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request headers
          },
        });

        if (response.data.success) {
          this.cards.push(response.data.data);
          this.toggleForm();
        } else {
          console.error('Failed to add card:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding card:', error);
      }
    },

    // Edit card
    editCard(card) {
      this.cardToEdit = { ...card }; // Set the card to edit
      this.newCard = { ...card }; // Pre-fill the form with the selected card's data
      this.showForm = true; // Show the form in edit mode
    },

    // Update card
    async updateCard() {
      if (!this.formValid) return;

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
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
        } else {
          console.error('Failed to update card:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating card:', error);
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

    // Toggle form visibility
    toggleForm() {
      this.showForm = !this.showForm;
      this.newCard = { name: '', description: '', price: '' }; // Clear the form when toggling
      this.cardToEdit = null;
    },
  },

  created() {
    this.fetchCards();
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
            <v-card-title style="background-color: red;">Cards</v-card-title>
            <br><br>

            <div v-if="showForm">
              <v-form ref="form" v-model="formValid">
                <v-text-field v-model="newCard.serial_number" label="Card Serial Number" required variant="outlined"></v-text-field>
                <v-text-field v-model="newCard.name" label="Card Name" required variant="outlined" ></v-text-field>
                <v-text-field v-model="newCard.email" label="Card Email" required variant="outlined"></v-text-field>
                <v-select 
  v-model="newCard.status" 
  :items="['Active', 'Inactive']" 
  label="Card Status" 
  required
  variant="outlined"
></v-select>
<v-row>
  <v-col>

    <v-btn color="primary" @click="submitCard" :disabled="!formValid" width="100%" style="text-transform: capitalize;">Submit</v-btn>
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
                    v-model="searchQuery"
                    label="Search Cards"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="4" class="text-right">
                  <v-btn @click="printCards" color="secondary" icon class="mr-2">
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                  <v-btn @click="exportCards" color="primary" icon class="mr-2">
                    <v-icon>mdi-file-export</v-icon>
                  </v-btn>
                  <v-btn @click="toggleForm" color="primary" class="mr-2" icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Cards Table with action buttons -->
              <v-table v-if="filteredCards.length" class="v-table">
  <thead>
    <tr style="text-transform: uppercase;background-color: red;color:white;font-weight:bolder;">
      <th>Serial Number</th>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <br>
  <tbody>
    <!-- Use paginatedCards instead of cards -->
    <tr v-for="card in paginatedCards" :key="card.id">
      <td>{{ card.serial_number }}</td>
      <td>{{ card.name }}</td>
      <td>{{ card.email }}</td>
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


              <v-alert v-else type="error">No cards found</v-alert>
              <v-pagination v-if="totalPages > 1" v-model="page" :length="totalPages" rounded></v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
