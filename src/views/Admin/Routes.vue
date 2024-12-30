<template>
  <v-app>
    <Sidebar />
    <v-container class="container" width="100%" style="margin-top: 100px;">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" width="100%" style="max-width: 1200px; background-color: #f9f9f9;">
           

            <v-container>
              <v-row class="mb-4">
                <v-col >
                  <v-text-field
                    v-model="searchQuery"
                    label="Search Routes"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    variant="outlined"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col >
                  <v-select
                    v-model="filterByDestination"
                    :items="['All', 'Destination A', 'Destination B', 'Destination C']"
                    label="Filter by Destination"
                    prepend-inner-icon="mdi-filter"
                    variant="outlined"
                    dense
                  ></v-select>
                </v-col>
                
              </v-row>

              <v-data-table
                v-model:items-per-page="perPage"
                :headers="headers"
                :items="paginatedRoutes"
                :search="searchQuery"
                item-value="id"
                class="elevation-0"
                no-data-text="No routes found"
              >
              <template v-slot:top>
    <v-toolbar flat>
      <v-toolbar-title>User Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  @click="toggleForm('add')" color="green" style="text-transform: capitalize;"  variant="flat">
        <v-icon left>mdi-plus</v-icon>Add Route
      </v-btn>
    </v-toolbar>
    <br>
   

              <br>
  </template>
              
                <template v-slot:body="props">
                  <tr v-for="route in props.items" :key="route.id">
                    <td>{{ route.from }}</td>
                    <td>{{ route.to }}</td>
                    <td>KES {{ route.fare }}</td>
                    <td>{{ route.user_name }}</td>

                    <td>
                      <v-chip
                        color="success"
                        @click="toggleForm('edit', route)"
                        close
                      >
                        <v-icon>mdi-pencil</v-icon> Edit
                      </v-chip>
                      <v-chip
                        color="red"
                        @click="deleteRoute(route.id)"
                        close
                      >
                        <v-icon>mdi-delete</v-icon> Delete
                      </v-chip>
                    </td>
                  </tr>
                </template>
              </v-data-table>

            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog for adding a new route -->
    <v-dialog v-model="addDialog" persistent max-width="600px">
  <template v-slot:default="{ close }">
    <v-card>
      <v-toolbar>
        <v-card-text class="text-center" style="font-size: 21px;">
          Add Route
        </v-card-text>
    </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newRoute.from"
                label="From"
                required
                :rules="[v => !!v || 'From is required']"
                prepend-inner-icon="mdi-map-marker"  
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newRoute.to"
                label="To"
                required
                :rules="[v => !!v || 'To is required']"
                prepend-inner-icon="mdi-map-marker"  
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newRoute.fare"
                label="Fare (KES)"
                type="number"
                required
                :rules="[v => !!v || 'Fare is required']"
                prepend-inner-icon="mdi-cash"  
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="addRoute">Add</v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>


    <!-- Dialog for editing an existing route -->
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:default="{ close }">
        <v-card>
          <v-toolbar>
        <v-card-text class="text-center" style="font-size: 21px;">
          Edit Route
        </v-card-text>
    </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="routeToEdit.from"
                    label="From"
                    prepend-inner-icon="mdi-map-marker"  

                    required
                    :rules="[v => !!v || 'From is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="routeToEdit.to"
                    label="To"
                    prepend-inner-icon="mdi-map-marker"  

                    required
                    :rules="[v => !!v || 'To is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="routeToEdit.fare"
                    label="Fare (KES)"
                    type="number"
                    prepend-inner-icon="mdi-cash"  

                    required
                    :rules="[v => !!v || 'Fare is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog">Cancel</v-btn>
            <v-btn color="primary" @click="updateRoute">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!-- Dialog for exporting routes -->
    <v-dialog v-model="exportDialog" persistent max-width="600px">
      <template v-slot:default="{ close }">
        <v-card>
          <v-card-title>
            <span class="headline">Export Routes</span>
          </v-card-title>

          <v-card-text>
            <p>Click below to export the routes as a PDF file.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="exportRoutes">Export</v-btn>
            <v-btn text @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

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
      routeToEdit: null,
      routes: [],
      addDialog: false, // track 'add' or 'edit' dialog state
      editDialog: false, // track 'add' or 'edit' dialog state
      exportDialog: false, // track 'export' dialog state
      newRoute: { from: '', to: '', fare: '' },
      searchQuery: '',
      filterByDestination: 'All',
      page: 1,
      perPage: 5,
      headers: [
        { title: 'From', value: 'from' },
        { title: 'To', value: 'to' },
        { title: 'Fare (KES)', value: 'fare' },
        { title: 'Created By', value: 'user' },
        { title: 'Actions', value: 'actions', sortable: false },
      ],
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
  },
  mounted() {
    this.fetchRoutes();
  },
  methods: {

    async fetchRoutes() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.get('/routes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          this.routes = response.data.data;
        } else {
          this.routes = [];
          console.warn('No routes available.');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error fetching routes:', error.response.data.message);
        } else {
          console.error('Error fetching routes:', error.message);
        }
      }
    },

    async addRoute() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.post('/addRoute', this.newRoute, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          this.routes.push(response.data.data);
          this.newRoute = { from: '', to: '', fare: '' };
          this.addDialog = false;
          console.log('Route added successfully.');
        } else {
          console.error('Failed to add route.');
        }
      } catch (error) {
        console.error('Error adding route:', error.message);
      }
    },

    async updateRoute() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        if (!this.routeToEdit || !this.routeToEdit.id) {
          console.error('Route to edit is not set.');
          return;
        }

        const response = await axiosInstance.put(`/routes/${this.routeToEdit.id}`, this.routeToEdit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const index = this.routes.findIndex(route => route.id === this.routeToEdit.id);
          if (index !== -1) {
            this.routes.splice(index, 1, response.data.data);
          }
          this.routeToEdit = null; // Reset routeToEdit after successful update
          this.editDialog = false;
          console.log('Route updated successfully.');
        } else {
          console.error('Failed to update route.');
        }
      } catch (error) {
        console.error('Error updating route:', error.message);
      }
    },

    async deleteRoute(routeId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.delete(`/routes/${routeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          this.routes = this.routes.filter(route => route.id !== routeId);
          console.log('Route deleted successfully.');
        } else {
          console.error('Failed to delete route.');
        }
      } catch (error) {
        console.error('Error deleting route:', error.message);
      }
    },

    toggleForm(type, route = null) {
      if (type === 'add') {
        this.addDialog = true;
      } else if (type === 'edit') {
        this.routeToEdit = { ...route };
        this.editDialog = true;
      }
    },

    closeDialog() {
      this.addDialog = false;
      this.editDialog = false;
      this.exportDialog = false;
    },

    exportRoutes() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      axiosInstance.get('/routes/export', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // important to receive blob response
      })
      .then(response => {
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.setAttribute('download', 'routes.pdf'); // filename
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.exportDialog = false;
          console.log('Routes exported successfully.');
        } else {
          console.error('Failed to export routes.');
        }
      })
      .catch(error => {
        console.error('Error exporting routes:', error.message);
      });
    },
  },
};
</script>

