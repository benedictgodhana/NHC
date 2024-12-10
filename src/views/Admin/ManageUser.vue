<template>
  <v-app>
    <Sidebar />
    <v-container class="container">
      <v-card elevation="0" style="background-color: #f9f9f9;">
        <v-card-title style="background-color: #D32F2F; color: white;">
          Registered Users
        </v-card-title>
                <br>


        <!-- User Form Dialog -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title style="background: red;">
              <span class="headline">Add New User</span>
            </v-card-title>
            <v-card-text>
              <v-alert
                v-if="alert.show"
                :type="alert.type"
                :color="alert.color"
                dismissible
                @input="alert.show = false"
              >
                {{ alert.message }}
              </v-alert>

              <v-form ref="form" v-model="formValid">
                <!-- Name Field -->
                <v-text-field 
                  v-model="newUser.name" 
                  label="Name" 
                  required 
                  variant="outlined"
                  prepend-inner-icon="mdi-account"  
                  :rules="[v => !!v || 'Name is required']"
                ></v-text-field>

                <!-- Email Field -->
                <v-text-field 
                  v-model="newUser.email" 
                  label="Email" 
                  type="email" 
                  required 
                  variant="outlined"
                  prepend-inner-icon="mdi-email"  
                  :rules="[v => !!v || 'Email is required']"
                ></v-text-field>

                <!-- Phone Field -->
                <v-text-field 
                  v-model="newUser.phone" 
                  label="Phone" 
                  required 
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"  
                  :rules="[v => !!v || 'Phone number is required']"
                ></v-text-field>

                <!-- Username Field -->
                <v-text-field 
                  v-model="newUser.username" 
                  label="Username" 
                  required 
                  variant="outlined"
                  prepend-inner-icon="mdi-account-circle" 
                  :rules="[v => !!v || 'Username is required']"
                ></v-text-field>

                <!-- Status Field -->
                <v-select 
                  v-model="newUser.status" 
                  :items="['active', 'inactive']" 
                  label="Status" 
                  required 
                  variant="outlined"
                  prepend-inner-icon="mdi-toggle-switch" 
                  :rules="[v => !!v || 'Status is required']"
                ></v-select>

                <!-- Password Field -->
                <v-text-field
                  v-model="newUser.password"
                  label="Password"
                  type="password"
                  required
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"  
                  @click:append="showPassword = !showPassword"
                  :rules="[v => !!v || 'Password is required']"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="submitUser" :disabled="!formValid" color="primary">Submit</v-btn>
              <v-btn @click="dialog = false" color="red">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- User Table -->
        <v-row>
          <v-col>
            <v-text-field v-model="searchQuery" label="Search Users" clearable variant="outlined"></v-text-field>
          </v-col>
          <v-col>
            <v-select v-model="filterByStatus" :items="['All', 'Active', 'Inactive']" label="Filter by Status"  variant="outlined"></v-select>
          </v-col>
          <v-col>
            <v-btn @click="openDialog" style="text-transform: capitalize;" color="green" > <v-icon>mdi-account-plus</v-icon>  Add User</v-btn>
          </v-col>
        </v-row>

        <v-table>
          <thead>
            <tr style="text-transform: uppercase;font-weight: bolder;background-color: red;color:white">
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.status }}</td>
              <td>{{ user.creator?.name || 'N/A' }}</td>

              <td>
                <v-btn icon @click="editUser(user)" color="transparent" elevation="0">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deactivateUser(user.id)" color="transparent" elevation="0">
                  <v-icon color="red">mdi-account-off</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-pagination v-model="page" :length="totalPages" @input="fetchUsers"></v-pagination>

      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axiosInstance from '@/service/api';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      users: [],
      dialog: false, // To toggle the dialog visibility
      formValid: false,
      searchQuery: '',
      filterByStatus: 'All',
      page: 1,
      perPage: 10,
      totalPages: 1, // Ensure totalPages is initialized
      userToEdit: null,
      newUser: {
        name: '',
        email: '',
        phone: '',
        username: '',
        role: '',
        status: 'active',
        created_by: '', 
        password: '',
      },
      showPassword: false,
      alert: {
        show: false,
        message: '',
        type: 'success',
        color: 'green',
      },
    };
  },
  computed: {
    filteredUsers() {
      let users = [...this.users];

      if (this.searchQuery) {
        users = users.filter(user =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.filterByStatus !== 'All') {
        users = users.filter(user => user.status === this.filterByStatus);
      }

      return users;
    },
    paginatedUsers() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.perPage);
    },
  },
  watch: {
    page: 'fetchUsers', 
    searchQuery: 'fetchUsers',
    filterByStatus: 'fetchUsers',
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    // Fetch users
    // Fetch users
async fetchUsers() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    const response = await axiosInstance.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: this.page,
        perPage: this.perPage,
        searchQuery: this.searchQuery || null,
        filterByStatus: this.filterByStatus !== 'All' ? this.filterByStatus : null,
      },
    });

    if (response.data.success && Array.isArray(response.data.data)) {
      this.users = response.data.data;
      this.totalPages = response.data.totalPages || 1;  // Use the totalPages returned from the server
    } else {
      this.users = [];
      this.totalPages = 0;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    this.users = [];
    this.totalPages = 0;
  }
},


    // Open the dialog
    openDialog() {
      this.dialog = true;
    },

    // Submit new user
    async submitUser() {
  if (!this.formValid) {
    this.alert.message = 'Please fill in all required fields.';
    this.alert.type = 'error';
    this.alert.color = 'red';
    this.alert.show = true;
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) return console.error('No token found. Please log in.');

    const response = await axiosInstance.post('/users', this.newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      // Refresh the users list from the server
      this.fetchUsers();

      // Set success alert
      this.alert.message = 'User added successfully!';
      this.alert.type = 'success';
      this.alert.color = 'green';
      this.alert.show = true;

      // Wait for the alert to show before closing the dialog
      setTimeout(() => {
        this.dialog = false; // Close the dialog
      }, 2000); // Close the dialog after 2 seconds to give time for the alert to be visible

    }
  } catch (error) {
    console.error('Error adding user:', error);

    // Set error alert
    this.alert.message = 'Error adding user. Please try again.';
    this.alert.type = 'error';
    this.alert.color = 'red';
    this.alert.show = true;
  }
},


    // Edit user
    editUser(user) {
      this.userToEdit = { ...user };
      this.newUser = { ...user };
      this.dialog = true;
    },

    // Deactivate user
    async deactivateUser(userId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error('No token found. Please log in.');

        const response = await axiosInstance.patch(`/users/${userId}/deactivate`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          this.fetchUsers();  // Refresh the users list
        }
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    },

    // Change page number
    changePage(newPage) {
      this.page = newPage;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
