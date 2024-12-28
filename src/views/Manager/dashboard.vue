<template>
    <v-app>
      <Sidebar />  <!-- This is where the sidebar is included -->
      <v-container class="container"  width="100%" >
  
      <v-row>
  
        <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="primary" size="40">mdi-account-multiple</v-icon>
                  <div class="text-title mt-2">Registered Users</div>
                  <div class="text-subtitle-1 font-weight-bold">{{ userCount  }}</div>
                  <v-btn class="mt-3" color="primary" block>View Details</v-btn>
              </v-card>
          </v-col>
          <!-- Total Registered Users -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="primary" size="40">mdi-account-multiple</v-icon>
                  <div class="text-title mt-2">Total card holders</div>
                  <div class="text-subtitle-1 font-weight-bold">{{ activeCardCount }}</div>
                  <v-btn class="mt-3" color="primary" block>View Details</v-btn>
              </v-card>
          </v-col>
  
  
  
  
          <!-- Total Active Cards -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="success" size="40">mdi-card-account-details-outline</v-icon>
                  <div class="text-title mt-2">Total Active Cards</div>
                  <div class="text-subtitle-1 font-weight-bold">{{ activeCardCount }}</div>
                  <v-btn class="mt-3" color="success" block>View Details</v-btn>
              </v-card>
          </v-col>
  
  
          <!-- Total Trips Made -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="info" size="40">mdi-bus</v-icon>
                  <div class="text-title mt-2">Total Trips Made</div>
                  <div class="text-subtitle-1 font-weight-bold">1,000,000</div>
                  <v-btn class="mt-3" color="info" block>View Details</v-btn>
              </v-card>
          </v-col>
  
          <!-- Top-Up Transactions -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="purple" size="40">mdi-wallet-plus-outline</v-icon>
                  <div class="text-title mt-2">Top-Up Transactions</div>
                  <div class="text-subtitle-1 font-weight-bold">85,000</div>
                  <v-btn class="mt-3" color="purple" block>View Details</v-btn>
              </v-card>
          </v-col>
  
          <!-- Available Bus Routes -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="teal" size="40">mdi-map-marker-path</v-icon>
                  <div class="text-title mt-2">Available Bus Routes</div>
                  <div class="text-subtitle-1 font-weight-bold"> {{  routeCount  }}</div>
                  <v-btn class="mt-3" color="teal" block>View Details</v-btn>
              </v-card>
          </v-col>
  
          <!-- Pending Refunds -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="red" size="40">mdi-cash-refund</v-icon>
                  <div class="text-title mt-2">Pending Refunds</div>
                  <div class="text-subtitle-1 font-weight-bold">250</div>
                  <v-btn class="mt-3" color="red" block>View Details</v-btn>
              </v-card>
          </v-col>
  
          <!-- Most Popular Route -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="blue" size="40">mdi-road-variant</v-icon>
                  <div class="text-title mt-2">Most Popular Route</div>
                  <div class="text-subtitle-1 font-weight-bold">Windhoek to Rehoboth</div>
                  <v-btn class="mt-3" color="blue" block>View Details</v-btn>
              </v-card>
          </v-col>
  
          <!-- Customer Feedback -->
          <v-col cols="12" sm="6" md="3">
              <v-card class="pa-4 elevation-2" outlined style="width: 100%; border: 1px solid #ddd;">
                  <v-icon color="indigo" size="40">mdi-message-text-outline</v-icon>
                  <div class="text-title mt-2">Customer Feedback</div>
                  <div class="text-subtitle-1 font-weight-bold">4,200</div>
                  <v-btn class="mt-3" color="indigo" block>View Details</v-btn>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
  
    </v-app>
  </template>
  <script>
  import AdminBar from '@/components/Adminbar.vue';
  import Sidebar from '@/components/ManagerSidebar.vue'; // Ensure the path is correct
  import axiosInstance from '@/service/api'; // Import your axios instance
  
  export default {
    components: {
      AdminBar,
      Sidebar,
    },
    data() {
      return {
        routeCount: 0, // To store the route count
        monthlyTransactions: 0, // Default value for monthly transactions
      todaysTransactions: 0,  //
      activeCardCount: 0,     // To store the active card count
      userCount: 0, // Store the user count
      
      };
    },
    methods: {
      async fetchRouteCount() {
        const token = localStorage.getItem('token'); // Get token from localStorage
  
        if (!token) {
          console.error('No token found.');
          return;
        }
  
        try {
          // Pass the token in the Authorization header to fetch the route count
          const response = await axiosInstance.get('/routes/count', {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          });
  
          if (response.data.success) {
            this.routeCount = response.data.data; // The count is directly available in data
          } else {
            console.error('Failed to fetch route count:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching route count:', error);
        }
      },
      async getUserCount() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error('No token found. Please log in.');
  
        const response = await axiosInstance.get('/user-count', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.success) {
          this.userCount = response.data.count; // Ensure this matches the response format
        } else {
          console.error('Failed to fetch user count:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    },
  
  
  
      async fetchMonthlyTransactions() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      return;
    }
  
    try {
      const response = await axiosInstance.get('/transactions/total/monthly', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Debugging the response
      console.log('Monthly Transactions Response:', response.data);
  
      // Check if the response contains total_monthly_transactions
      if (response.data.total_monthly_transactions) {
        this.monthlyTransactions = response.data.total_monthly_transactions;
      } else {
        console.error('Failed to fetch monthly transactions:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching monthly transactions:', error);
    }
  },
  
  
  
  async fetchActiveCardCount() {
    const token = localStorage.getItem('token'); // Get token from localStorage
  
    if (!token) {
      console.error('No token found.');
      return;
    }
  
    try {
      const response = await axiosInstance.get('/active-cards', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Debugging the response
      console.log('Active Card Count Response:', response.data);
  
      // Check if the response contains the active card count
      if (response.data.success && response.data.data.active_cards_count !== undefined) {
        this.activeCardCount = response.data.data.active_cards_count; // Update active card count
      } else {
        console.error('Failed to fetch active card count:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching active card count:', error);
    }
  },
  
  
  async fetchTodaysTransactions() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found.');
      return;
    }
  
    try {
      const response = await axiosInstance.get('/transactions/total/today', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Debugging the response
      console.log('Today\'s Transactions Response:', response.data);
  
      // Check if the response contains total_todays_transactions
      if (response.data.total_todays_transactions) {
        this.todaysTransactions = response.data.total_todays_transactions;
      } else {
        console.error('Failed to fetch today\'s transactions:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching today\'s transactions:', error);
    }
  },
  
  
      handleLogout() {
        // Clear the authentication token from localStorage
        localStorage.removeItem('token');
  
        // Optionally, reset any user-related data or Vuex store (if you're using Vuex)
        this.$store.commit('setUser', null); // Reset user state if using Vuex
  
        // Redirect user to login or home page after logging out
        this.$router.push('/login'); // Adjust the path if needed (could be '/')
      },
    },
    mounted() {
      // Call fetchRouteCount when the component is mounted
      this.fetchRouteCount();
      this.getUserCount();  // Fetch user count
      this.fetchMonthlyTransactions();
      this.fetchTodaysTransactions();
      this.fetchActiveCardCount(); // Fetch active card count
    },
  };
  </script>
  
  
  <style scoped>
  
  .mt-3{
    text-transform: capitalize;
  }
  
  .container{
      margin-top: 130px;
  }
  /* Additional styles if necessary */
  </style>
  