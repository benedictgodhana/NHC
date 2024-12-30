<template>
  <v-app>
    <Sidebar />
    <v-container class="container" style="margin-top: 50px;">
      <v-card elevation="0" style="background-color: #f9f9f9;">
        
        <br />

        <!-- User Form Dialog -->
        <v-dialog       v-model="addDialog" max-width="600px">
          <v-card>
            <v-card-title style="background: red;">
              <span class="headline">Add New User</span>
            </v-card-title>
            <v-card-text>
             

              <v-form ref="form" v-model="formValid">
                <!-- Name Field -->
                <v-text-field 
                  v-model="newUser.name" 
                  label="Name" 
                  required 
                  prepend-inner-icon="mdi-account"  
                  :rules="[v => !!v || 'Name is required']"
                ></v-text-field>

                <!-- Email Field -->
                <v-text-field 
                  v-model="newUser.email" 
                  label="Email" 
                  type="email" 
                  required 
                  prepend-inner-icon="mdi-email"  
                  :rules="[v => !!v || 'Email is required']"
                ></v-text-field>

                <!-- Phone Field -->
                <v-text-field 
                  v-model="newUser.phone" 
                  label="Phone" 
                  required 
                  prepend-inner-icon="mdi-phone"  
                  :rules="[v => !!v || 'Phone number is required']"
                ></v-text-field>

                <!-- Username Field -->
                <v-text-field 
                  v-model="newUser.username" 
                  label="Username" 
                  required 
                  prepend-inner-icon="mdi-account-circle" 
                  :rules="[v => !!v || 'Username is required']"
                ></v-text-field>

                <!-- Role Field -->
                <v-select 
    v-model="newUser.role" 
    :items="roles" 
    item-title="name" 
    label="Role" 
    required 
    prepend-inner-icon="mdi-account-group" 
    :rules="[v => !!v || 'Role is required']"
></v-select>


                <!-- Status Field -->
                <v-select 
                  v-model="newUser.status" 
                  :items="['active', 'inactive']" 
                  label="Status" 
                  required 
                  prepend-inner-icon="mdi-toggle-switch" 
                  :rules="[v => !!v || 'Status is required']"
                ></v-select>

                <!-- Password Field -->
                <v-text-field
                  v-model="newUser.password"
                  label="Password"
                  type="password"
                  required
                  prepend-inner-icon="mdi-lock"  
                  @click:append="showPassword = !showPassword"
                  :rules="[v => !!v || 'Password is required']"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
  color="blue"
  :loading="isSubmitting" 
  :disabled="isSubmitting" 
  @click="submitUser"
>
  Submit
</v-btn>


              <v-btn  @click="addDialog = false" color="red">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- User Table -->
        <v-row>
          <v-col>
            <v-text-field v-model="searchQuery" label="Search Users" clearable variant="outlined"></v-text-field>
          </v-col>
          <v-col>
            <v-select v-model="filterByStatus" :items="['All', 'Active', 'Inactive']" label="Filter by Status" variant="outlined"></v-select>
          </v-col>
         
        </v-row>
        <v-data-table
  :headers="headers"
  :items="paginatedUsers" 
  :loading="!users.length"
  item-value="id"  
  :options="paginationOptions"
  class="elevation-1"
  no-data-text="No users found"
>

  <template v-slot:top>
    <v-toolbar flat>
      <v-toolbar-title>User Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  @click="openAddDialog" color="green" style="text-transform: capitalize;"  variant="flat">
        <v-icon left>mdi-account-plus</v-icon>Add User
      </v-btn>
    </v-toolbar>
    <br>
    <v-alert
  v-if="alert.show"
  :type="alert.type"
  :color="alert.color"
  dismissible
  :timeout="5000" 
  @close="alert.show = false"
>
  {{ alert.message }}
</v-alert>

              <br>
  </template>

  <template v-slot:body="{ items }">
    <tr v-for="user in items" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.roles.length > 0 ? user.roles.map(role => role.name).join(', ') : 'N/A' }}</td>
      <td>{{ user.status }}</td>
      <td>{{ user.creator?.name || 'N/A' }}</td>
      <td>
        <v-chip
    class="ma-1"
    color="blue"
    dark
    small
    @click="openEditDialog(user)"
    style="cursor: pointer;"
>
    <v-icon left>mdi-pencil</v-icon> Edit
</v-chip>

  <v-chip
    class="ma-1"
    color="red"
    dark
    small
    @click="deactivateUser(user.id)"
    style="cursor: pointer;"
  >
    <v-icon left>mdi-account-off</v-icon>Deactivate
  </v-chip>
</td>

    </tr>
  </template>
</v-data-table>
<v-dialog
      v-model="dialog"
      :max-width="'500px'"
      persistent
    >
      <v-card>
        <v-toolbar color="white">
<v-card-text class="text-center" style="font-size: 21px;">
  Edit User
</v-card-text>
<v-spacer></v-spacer>
<v-btn color="blue" text @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>

        </v-toolbar>
     
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              label="Name"
              prepend-inner-icon="mdi-account"  
              v-model="newUser.name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              prepend-inner-icon="mdi-email"  
              v-model="newUser.email"
              required
            ></v-text-field>

            <v-text-field
              label="UserName"
              prepend-inner-icon="mdi-account-circle" 

              v-model="newUser.username"
              required
            ></v-text-field>
            <v-text-field
              label="Phone"
              prepend-inner-icon="mdi-phone"  

              v-model="newUser.phone"
              required
            ></v-text-field>
            <v-select
              label="Role"
              :items="roles"
              prepend-inner-icon="mdi-account-group" 
              v-model="newUser.role"
              item-value="name"
              item-title="name"
              required
            ></v-select>

            <v-text-field
              label="Password"
              prepend-inner-icon="mdi-lock"  

              v-model="newUser.password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue" text @click="updateUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      isSubmitting: false,
      paginationOptions: {
      rowsPerPageText: 'Rows per page:',
      rowsPerPageItems: [6, 10, 20, 50],
      firstPageText: 'First',
      lastPageText: 'Last',
      nextPageText: 'Next',
      prevPageText: 'Prev',
    },
      users: [],
      dialog: false, // To toggle the dialog visibility
      addDialog: false, // For adding dialog
      formValid: false,
      searchQuery: '',
      filterByStatus: 'All',
      page: 1,

      headers: [
        { title: 'Name', align: 'start', value: 'name' },
        { title: 'Username', value: 'username' },
        { title: 'Email', value: 'email' },
        { title: 'Phone', value: 'phone' },
        { title: 'Role', value: 'role.name' },
        { title: 'Status', value: 'status' },
        { title: 'Created By', value: 'creator.name' },
        { title: 'Actions', value: 'actions', sortable: false },
      ],
      perPage:2000,
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

      userToEdit: null,
      roles: [], // To store available roles
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
    this.fetchRoles(); // Fetch roles on component mount
  },
  methods: {
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
      this.users = response.data.data;  // Directly assign the fetched users
    } else {
      this.users = [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    this.users = [];
  }
},



    async fetchRoles() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axiosInstance.get('/roles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && Array.isArray(response.data.roles)) {
          this.roles = response.data.roles;
        } else {
          this.roles = [];
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        this.roles = [];
      }
    },

    openEditDialog(user) {
      this.mode = 'edit';
      this.userToEdit = user;
      this.newUser = { ...user, role: user.roles[0]?.name || '' };
      this.dialog = true;
    },
    openAddDialog() {
      this.mode = 'add';
      this.newUser = {
        name: '',
        email: '',
        phone: '',
        role: '',
      };
      this.addDialog = true;
    },
    async submitUser() {
  if (!this.formValid) {
    this.alert.message = 'Please fill in all required fields.';
    this.alert.type = 'error';
    this.alert.color = 'red';
    this.alert.show = true;
    return;
  }

  this.isSubmitting = true;

  try {
    const token = localStorage.getItem("token");
    if (!token) return console.error('No token found. Please log in.');

    const response = await axiosInstance.post('/users', this.newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      this.fetchUsers();

      this.alert.message = 'User added successfully!';
      this.alert.type = 'success';
      this.alert.color = 'green';
      this.alert.show = true;

      setTimeout(() => {
        this.dialog = false; // Close the dialog after 2 seconds
      }, 2000);

      setTimeout(() => {
        this.alert.show = false; // Hide the alert after 4 seconds
      }, 4000); // 4 seconds delay
    }
  } catch (error) {
    console.error('Error adding user:', error);

    if (error.response && error.response.data && error.response.data.errors) {
      this.alert.message = error.response.data.errors.role ? error.response.data.errors.role[0] : 'Error adding user. Please try again.';
    } else {
      this.alert.message = 'Error adding user. Please try again.';
    }

    this.alert.type = 'error';
    this.alert.color = 'red';
    this.alert.show = true;
  } finally {
    this.isSubmitting = false; // Reset submitting state
    this.addDialog = false; // Close the dialog after the process completes
  }
},




async updateUser() {
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

    const response = await axiosInstance.put(`/users/${this.userToEdit.id}`, this.newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      this.fetchUsers();

      this.alert.message = 'User updated successfully!';
      this.alert.type = 'success';
      this.alert.color = 'green';
      this.alert.show = true;

      setTimeout(() => {
        this.dialog = false;
      }, 2000);
    }
  } catch (error) {
    console.error('Error updating user:', error);

    if (error.response && error.response.data && error.response.data.errors) {
      this.alert.message = error.response.data.errors.role ? error.response.data.errors.role[0] : 'Error updating user. Please try again.';
    } else {
      this.alert.message = 'Error updating user. Please try again.';
    }

    this.alert.type = 'error';
    this.alert.color = 'red';
    this.alert.show = true;
  }
},


    editUser(user) {
      this.userToEdit = { ...user };
      this.newUser = { ...user };
      this.dialog = true;
    },

    async deactivateUser(userId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error('No token found. Please log in.');

        const response = await axiosInstance.patch(`/users/${userId}/deactivate`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          this.fetchUsers();
        }
      } catch (error) {
        console.error('Error deactivating user:', error);
      }
    },

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

.uppercase-header {
  text-transform:uppercase;
}

.v-data-table thead th {
  text-transform: uppercase;
  font-weight: bold; /* Optional: Add bold for better visibility */
}


</style>
