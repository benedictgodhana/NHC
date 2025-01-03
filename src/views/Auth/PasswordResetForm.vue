<template>
    <v-container fluid class="d-flex align-center justify-center min-vh-100">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="forgot-password-card" elevation="8" rounded="lg">
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
  
            <v-text-field
              v-model="form.password"
              density="compact"
              placeholder="Enter new password"
              prepend-inner-icon="mdi-key"
              variant="outlined"
              :rules="[value => value && value.length >= 6 || 'Password must be at least 6 characters.']"
              type="password"
            ></v-text-field>
  
            <v-text-field
              v-model="form.password_confirmation"
              density="compact"
              placeholder="Confirm new password"
              prepend-inner-icon="mdi-key"
              variant="outlined"
              :rules="[value => value === form.password || 'Passwords must match.']"
              type="password"
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
              <router-link to="/login" class="text-caption text-decoration-none text-blue">
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
  
  const form = ref({
      email: '',
      password: '',
      password_confirmation: '',
  });
  
  const error = ref(null);
  const loading = ref(false); // Add a loading state for the button
  const router = useRouter(); // Initialize router
  
  // Validate the form
  const isValidForm = computed(() => {
      const emailValid = form.value.email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email);
      const passwordValid = form.value.password.trim() !== '' && form.value.password.length >= 6;
      const passwordMatch = form.value.password === form.value.password_confirmation;
  
      return emailValid && passwordValid && passwordMatch;
  });
  
  const submit = async () => {
      error.value = null; // Clear any previous errors
      loading.value = true; // Start loading
  
      // Check if the form is valid
      if (!isValidForm.value) {
          error.value = 'Please fix the form errors.';
          loading.value = false;
          return;
      }
  
      try {
          const response = await axiosInstance.post('/api/reset-password', {
              email: form.value.email,
              password: form.value.password,
              password_confirmation: form.value.password_confirmation,
              token: new URLSearchParams(window.location.search).get('token'), // Get token from URL
          });
  
          if (response.data.status === 'success') {
              router.push('/login'); // Redirect to login page upon success
          } else {
              error.value = response.data.message || 'Failed to reset password.';
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
  /* Your existing styles or new styles here */
  </style>
  