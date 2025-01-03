<template>
    <v-app>
      <Sidebar />
      <v-container class="container mt-16" width="100%">
        <v-row>
          <v-col cols="12">
            <v-card elevation="0" width="100%">
              <!-- User Profile Section -->
              <v-toolbar flat color="red">
                <v-toolbar-title style="color:white"><v-icon icon="mdi-account-circle" style="color:white"></v-icon> &nbsp; User Profile</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
  
              <v-card>
                <v-card-text>
                  <v-form ref="form" v-model="formValid">
                    <!-- Name Field -->
                    <v-text-field
                      v-model="user.name"
                      label="Name"
                      class="mb-4"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.username"
                      label="Username"
                      class="mb-4"
                      :rules="[v => !!v || 'Name is required']"
                      required
                    ></v-text-field>
  
                    <!-- Email Field -->
                    <v-text-field
                      v-model="user.email"
                      label="Email"
                      class="mb-4"
                      :rules="[v => !!v || 'Email is required']"
                      required
                      disabled
                    ></v-text-field>
  
                    <!-- Status Field -->
                    <!-- Status Field -->
  
                    <!-- Password Field -->
                    <v-text-field
                      v-model="password"
                      label="New Password"
                      type="password"
                      class="mb-4"
                      :rules="[v => !!v || 'Password is required']"
                      required
                    ></v-text-field>
  
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      class="mb-4"
                      :rules="[v => !!v || 'Please confirm your password']"
                      required
                      :error-messages="passwordMismatch"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="updateProfile" :disabled="!formValid">
                    <v-icon>mdi-content-save</v-icon> Save
                  </v-btn>
                  <v-btn color="secondary" @click="logout">
                    <v-icon>mdi-logout</v-icon> Logout
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import axiosInstance from '@/service/api'; // Import axios instance
  import Sidebar from '@/components/ManagerSidebar.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      Sidebar,
    },
    setup() {
      const user = ref({
        name: '',
        email: '',
        status: '',
      });
      const formValid = ref(false);
      const password = ref('');
      const confirmPassword = ref('');
      const passwordMismatch = ref('');
      const router = useRouter();
  
      // Fetch user data
      onMounted(() => {
        fetchUserProfile();
      });
  
      async function fetchUserProfile() {
        try {
          const token = localStorage.getItem('token');
  
          if (!token) {
            console.error('No token found. Redirecting to login.');
            router.push('/login');
            return;
          }
  
          const response = await axiosInstance.get('/user', { // Using the user endpoint here
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            user.value = response.data.user; // Assign the user data directly
          } else {
            console.warn('Failed to fetch user profile.');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
  
      async function updateProfile() {
        if (password.value !== confirmPassword.value) {
          passwordMismatch.value = 'Passwords do not match.';
          return;
        }
  
        try {
          const token = localStorage.getItem('token');
  
          if (!token) {
            console.error('No token found. Redirecting to login.');
            router.push('/login');
            return;
          }
  
          const response = await axiosInstance.put('/user/profile', { ...user.value, password: password.value }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            console.log('Profile updated successfully.');
          } else {
            console.warn('Failed to update profile.');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      }
  
      function logout() {
        localStorage.removeItem('token');
        router.push('/login');
      }
  
      return {
        user,
        formValid,
        password,
        confirmPassword,
        passwordMismatch,
        updateProfile,
        logout,
      };
    },
  };
  </script>
  <style scoped>
  /* General styles */
  .container {
    max-width: 1300px;
    margin: 0 auto;
  }
  
  .v-card {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }
  
  .v-toolbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .v-toolbar-title {
    font-weight: bold;
    color: #333;
  }
  
  .mb-4 {
    margin-bottom: 16px;
  }
  
  /* Form Field Styling */
  
  
  .v-text-field:focus {
    border-color: #3f51b5;
    box-shadow: 0 0 10px rgba(63, 81, 181, 0.3);
  }
  
  .v-btn {
    text-transform: none;
  }
  
  .v-btn-primary {
    background-color: #3f51b5;
    color: #fff;
  }
  
  .v-btn-secondary {
    background-color: #b0bec5;
    color: #fff;
  }
  </style>