<template>
    <v-container fluid class="d-flex align-center justify-center min-vh-100">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
          >
            <v-img
              class="mx-auto my-6"
              max-width="228"
              src="/nch-removebg-preview.png"
            ></v-img>
  
            <!-- Display error message if any -->
            <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
  
            <v-text-field
              v-model="form.email"
              density="compact"
              placeholder="Enter your email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :rules="[value => value && value.length >= 5 || 'Please enter a valid email address.']"
            ></v-text-field>
  
            <v-btn
              @click="submit"
              class="mb-8"
              color="red"
              variant="flat"
              style="text-transform: capitalize;"
              block
              :loading="loading"
              :disabled="!isValidForm"
            >
              Reset Password <v-icon>mdi-key-variant</v-icon>
            </v-btn>
  
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              <router-link
                to="/login"
                class="text-caption text-decoration-none text-blue"
              >
                Back to Login
              </router-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import axiosInstance from '@/service/api'; // Axios instance
  
  defineProps({
      canResetPassword: Boolean,
      status: String,
  });
  
  const form = ref({
      email: '',
  });
  
  const error = ref(null);
  const loading = ref(false); // Add a loading state for the button
  const router = useRouter(); // Initialize router
  
  // Validate the form
  const isValidForm = computed(() => {
      const emailValid = form.value.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email);
      return emailValid;
  });
  
  const submit = async () => {
      error.value = null; // Clear any previous errors
      loading.value = true; // Start loading
  
      // Check if the form is valid
      if (!isValidForm.value) {
          error.value = 'Please enter a valid email address.';
          loading.value = false;
          return;
      }
  
      try {
          const response = await axiosInstance.post('/forgot-password', { // Adjust to your forgot password endpoint
              email: form.value.email,
          });
  
          console.log('Forgot Password Response:', response.data); // Log the response
  
          if (response.data.success) {
              // Display success message or redirect
              router.push('/login'); // Redirect to login page upon success
          } else {
              error.value = 'Failed to send reset link. Please try again.';
          }
      } catch (err) {
          error.value = 'An error occurred. Please try again later.';
          console.error(err);
      } finally {
          loading.value = false; // Stop loading after response
      }
  };
  </script>
  
  <style scoped>
  /* Custom Styling for NHC */
  .min-vh-100 {
      min-height: 100vh;
      background: url('/IMG_0333-scaled.jpg') no-repeat center center;
      background-size: cover;
      opacity: 0.85;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.6); /* Dim overlay */
  }
  
  /* Card */
  .forgot-password-card {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease-in-out;
  }
  
  .forgot-password-card:hover {
      transform: translateY(-10px);
  }
  
  /* Title */
  .forgot-password-title {
      font-size: 1.5rem;
      color: #d32f2f;
      font-weight: bold;
      text-align: center;
      margin-top: 1rem;
  }
  
  /* Input Fields */
  .input-field .v-input__control {
      border-radius: 8px;
      background-color: #f1f1f1;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      color: black;
  }
  
  .input-field .v-input__control input {
      font-size: 1rem;
  }
  
  /* Button Styling */
  v-btn {
      text-transform: capitalize;
      font-weight: bold;
      transition: background-color 0.3s ease;
  }
  
  v-btn:hover {
      background-color: #b71c1c;
  }
  
  /* Links */
  .forgot-password-link {
      color: #d32f2f;
      text-decoration: underline;
  }
  
  .forgot-password-link:hover {
      color: #b71c1c;
  }
  
  /* Alerts */
  .v-alert {
      background-color: #d32f2f;
      color: white;
      border-radius: 5px;
  }
  
  /* Responsive Adjustments */
  @media screen and (max-width: 600px) {
      .forgot-password-card {
          padding: 1.5rem;
      }
  
      .forgot-password-title {
          font-size: 1.2rem;
      }
  }
  </style>
  