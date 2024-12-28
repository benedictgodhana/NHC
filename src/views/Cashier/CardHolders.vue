  <template>
    <v-app>
      <Sidebar />
      <v-container class="container" width="100%">
        <v-row>
          <v-col cols="12">
            <v-card elevation="0" width="100%">

              <!-- Search and Filter Fields -->
              <v-toolbar flat >
                <v-toolbar-title > <v-icon icon="mdi-card-account-details"></v-icon> &nbsp; Cards</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        flat
        hide-details
        single-line
      ></v-text-field>
              
                <v-btn @click="printCards" color="secondary" icon>
                  <v-icon>mdi-printer</v-icon>
                </v-btn>
                <v-btn @click="exportCards" color="primary" icon>
                  <v-icon>mdi-file-export</v-icon>
                </v-btn>
              </v-toolbar>

              <v-data-table
                v-if="filteredCards.length"
                :headers="headers"
                :items="paginatedCards"
                item-key="id"
                class="elevation-1"
                hide-actions
              >
                <template v-slot:top>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.serial_number }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>  <v-chip
            :color="item.status ? 'green' : 'red'"
            :text="item.status ? 'Active' : 'Inactive'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip></td>
                    <td>
                      <v-btn @click="viewCard(item)" icon elevation="0">
                        <v-icon color="primary">mdi-eye</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>

              <v-alert v-else type="error">No cards found</v-alert>
              <v-pagination v-if="totalPages > 1" v-model="page" :length="totalPages" rounded></v-pagination>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Inline CardView Modal -->
      <v-dialog v-model="showModal" persistent max-width="800px">
        <template v-slot:default>
          <v-card>
            <v-card-title class="headline white--text" style="background-color: red;">
              <v-icon left>mdi-card-text-outline</v-icon> Card Details
            </v-card-title>
            <v-card-text>
              <div>
                <p><strong>Serial Number:</strong> {{ cardToView.serial_number }}</p>
                <p><strong>Name:</strong> {{ cardToView.name }}</p>
                <p><strong>Email:</strong> {{ cardToView.email }}</p>
                <p><strong>Status:</strong> {{ cardToView.status }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="closeModal">
                <v-icon>mdi-close</v-icon> Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-app>
  </template>

  <script>
  import axiosInstance from '@/service/api'; // Import your axios instance
  import Sidebar from '@/components/CashierSidebar.vue';

  export default {
    components: {
      Sidebar,
    },
    data() {
      return {
        cards: [],
        dialog: false,
        formValid: false,
        newCard: { name: '', description: '', price: '', category: '' },
        searchQuery: '',
        filterByCategory: 'All',
        page: 1,
        perPage: 5,
        showModal: false,
        cardToView: null,
        headers: [
          { title: 'Serial Number', value: 'serial_number' },
          { title: 'Name', value: 'name' },
          { title: 'Email', value: 'email' },
          { title: 'Status', value: 'status' },
          { title: 'Actions', value: 'actions' },
        ],
        categories: [] // This will hold unique categories
      };
    },
    computed: {
      filteredCards() {
        let cards = this.cards;

        if (this.searchQuery) {
          cards = cards.filter(
            card =>
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
      async fetchCards() {
        try {
          const token = localStorage.getItem('token');

          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }

          const response = await axiosInstance.get('/active-cards', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            this.cards = response.data.data.active_cards;
            // Extract unique categories for filter dropdown
            this.categories = Array.from(new Set(this.cards.map(card => card.category)));
          } else {
            this.cards = [];
            console.warn('No cards available.');
          }
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      },

      viewCard(card) {
        this.cardToView = { ...card };
        this.showModal = true;
      },

      closeModal() {
        this.showModal = false;
      },

      async exportCards() {
        const csvContent =
          'Name,Description,Price,Category\n' +
          this.filteredCards
            .map(card => `${card.name},${card.description},${card.price},${card.category}`)
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cards.csv';
        link.click();
      },

      printCards() {
        window.print();
      },
    },
  };
  </script>

  <style scoped>
  .v-data-table th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .v-data-table td {
    background-color: #ffffff;
  }

  .v-btn {
    margin-left: 5px;
  }
  </style>
