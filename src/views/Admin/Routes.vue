<script>
import axiosInstance from '@/service/api'; // Import your axios instance
import Sidebar from '@/components/Sidebar.vue'; // Ensure the path is correct

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      routes: [],
      dialog: false,
      formValid: false,
      newRoute: { from: '', to: '', fare: '' },
      searchQuery: '',
      filterByDestination: 'All',
      page: 1,
      perPage: 5,
      showForm: false,
      routeToEdit: null, // Track which route is being edited
    };
  },
  computed: {
    filteredRoutes() {
      let routes = this.routes;

      if (this.searchQuery) {
        routes = routes.filter(route =>
          route.from.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          route.to.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.filterByDestination !== 'All') {
        routes = routes.filter(route => route.to === this.filterByDestination);
      }

      return routes;
    },
    paginatedRoutes() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredRoutes.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredRoutes.length / this.perPage);
    },
  },
  mounted() {
    this.fetchRoutes();
  },
  methods: {
    // Fetch Routes
    async fetchRoutes() {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Attempt to fetch routes using the axiosInstance
    const response = await axiosInstance.get('/routes', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      this.routes = response.data.data;
    } else {
      this.routes = [];
      console.warn('No routes available.');
    }
  } catch (error) {
    // Handle errors if any
    if (error.response) {
      // Handle response errors
      console.error('Error fetching routes:', error.response.data.message);

      // Check for unauthorized error (e.g., token expired)
      if (error.response.status === 401) {
        console.error('Unauthorized request. Token may have expired.');
        this.handleTokenExpiration(); // Implement your token expiration logic here
      } else if (error.response.status === 500) {
        console.error('Server error. Please try again later.');
      } else if (error.response.status === 404) {
        console.error('Routes not found. Check the endpoint.');
      }
    } else if (error.request) {
      // Handle request errors (e.g., no response from server)
      console.error('Error fetching routes: No response from server');
    } else {
      // Handle other errors (e.g., configuration issues)
      console.error('Error:', error.message);
    }
  }
},

    // Submit a new route
    async submitRoute() {
  if (!this.formValid) return;

  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Attempt to submit the route using the axiosInstance
    const response = await axiosInstance.post('/addRoute', this.newRoute, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      this.routes.push(response.data.data);
      this.toggleForm();
    } else {
      console.error('Failed to add route:', response.data.message);
    }
  } catch (error) {
    console.error('Error adding route:', error);
  }
},

    // Edit route
    editRoute(route) {
      this.routeToEdit = { ...route }; // Set the route to edit
      this.newRoute = { ...route }; // Pre-fill the form with the selected route's data
      this.showForm = true; // Show the form in edit mode
    },

    // Update route
    async updateRoute() {
  if (!this.formValid) return;

  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Attempt to update the route using the axiosInstance
    const response = await axiosInstance.put(`/routes/{id}/${this.routeToEdit.id}`, this.newRoute, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      const index = this.routes.findIndex(route => route.id === this.routeToEdit.id);
      this.routes.splice(index, 1, response.data.data);
      this.toggleForm();
    } else {
      console.error('Failed to update route:', response.data.message);
    }
  } catch (error) {
    console.error('Error updating route:', error);
  }
},

// Delete route
async deleteRoute(routeId) {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Check if the token exists
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    // Attempt to delete the route using the axiosInstance
    const response = await axiosInstance.delete(`/deleteRoute/${routeId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request headers
      },
    });

    if (response.data.success) {
      this.routes = this.routes.filter(route => route.id !== routeId);
    } else {
      console.error('Failed to delete route:', response.data.message);
    }
  } catch (error) {
    console.error('Error deleting route:', error);
  }
},


    // Print routes
    printRoutes() {
      window.print();
    },

    // Export routes to CSV
    exportRoutes() {
      const csvContent = 'From,To,Fare\n' + this.filteredRoutes.map(route => {
        return `${route.from},${route.to},${route.fare}`;
      }).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'routes.csv';
      link.click();
    },

    // Toggle form visibility
    toggleForm() {
      this.showForm = !this.showForm;
      this.newRoute = { from: '', to: '', fare: '' }; // Clear the form when toggling
      this.routeToEdit = null;
    },

    // Get headers with authorization token
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return {
        Authorization: `Bearer ${token}`,
      };
    },

    // Handle token expiration (optional)
    handleTokenExpiration() {
      // Implement your token expiration logic here, such as redirecting to login page
      console.log('Token expired or invalid');
    },
  },

  created() {
    this.fetchRoutes();
  },
};
</script>

<template>
  <v-app>
    <Sidebar /> <!-- This is where the sidebar is included -->
    <v-container class="container" width="100%">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" width="100%" style="max-width: 1200px; background-color: #f9f9f9;">
  <v-card-title class="font-weight-bold" style="background-color: #D32F2F; color: white; padding: 16px;">
    Routes
  </v-card-title>
  <v-divider></v-divider>
  <br>

  <div v-if="showForm">
    <v-form ref="form" v-model="formValid">
      <v-text-field v-model="newRoute.from" label="From" required variant="outlined" dense></v-text-field>
      <v-text-field v-model="newRoute.to" label="To" required variant="outlined" dense></v-text-field>
      <v-text-field v-model="newRoute.fare" label="Fare (KES)" type="number" required variant="outlined" dense></v-text-field>

      <v-row>
        <v-col>
          <v-btn color="primary" @click="submitRoute" :disabled="!formValid" block style="text-transform: capitalize;">Submit</v-btn>
        </v-col>
        <v-col>
          <v-btn text @click="toggleForm" color="red" block style="text-transform: capitalize;">Cancel</v-btn>
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
          label="Search Routes"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="filterByDestination"
          :items="['All', 'Destination A', 'Destination B', 'Destination C']"
          label="Filter by Destination"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="4" class="text-right">
        <v-btn @click="printRoutes" color="secondary" icon class="mr-2">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn @click="exportRoutes" color="primary" icon class="mr-2">
          <v-icon>mdi-file-export</v-icon>
        </v-btn>
        <v-btn @click="toggleForm" color="primary" class="mr-2" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Routes Table with action buttons -->
    <v-table v-if="filteredRoutes.length" class="v-table">
      <thead>
        <tr style="text-transform: uppercase; background-color: #D32F2F; color: white; font-weight: bold;">
          <th>From</th>
          <th>To</th>
          <th>Fare (KES)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="route in paginatedRoutes" :key="route.id">
          <td>{{ route.from }}</td>
          <td>{{ route.to }}</td>
          <td style="text-transform: uppercase;">KES {{ route.fare }}</td>
          <td>
            <v-btn @click="editRoute(route)" icon elevation="0">
              <v-icon color="success">mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="deleteRoute(route.id)" icon elevation="0">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert v-else type="error" :value="true">No routes found</v-alert>

    <v-pagination v-model="page" :length="totalPages" color="primary" />
  </div>
</v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style>
.container{
  margin-top: 150px;
}

</style>