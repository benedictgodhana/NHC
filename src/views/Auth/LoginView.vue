<script setup>
import { ref, computed } from 'vue';
import { VContainer, VRow, VCol, VTextField, VBtn, VAlert, VCard, VCardTitle, VCardText, VCardActions, VImg } from 'vuetify/components';
import { useRouter } from 'vue-router'; // Import useRouter from vue-router
import axiosInstance from '@/service/api'; // Axios instance

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = ref({
    username: '',
    password: '',
    remember: false,
});

const error = ref(null);
const loading = ref(false); // Add a loading state for the button
const router = useRouter(); // Initialize router

// Validate the form
const isValidForm = computed(() => {
    const usernameValid = form.value.username.trim() !== '' && form.value.username.length >= 3; // Ensure username is at least 3 characters
    const passwordValid = form.value.password.trim() !== '' && form.value.password.length >= 6;
    return usernameValid && passwordValid;
});
const submit = async () => {
    error.value = null; // Clear any previous errors
    loading.value = true; // Start loading

    // Check if the form is valid
    if (!isValidForm.value) {
        error.value = 'Please fill in all required fields with valid values.';
        loading.value = false;
        return;
    }

    try {
        const response = await axiosInstance.post('/login', { // Adjust to your login endpoint
            username: form.value.username,
            password: form.value.password,
            remember: form.value.remember,
        });

        console.log('Login Response:', response.data); // Log the entire response

        if (response.data.token) {
            const { token, user } = response.data;
            
            // Ensure role exists and save it
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_role', JSON.stringify(user.roles ? user.roles[0].name : '')); // Extract the role if it's available
            
            console.log('User Role:', user.roles ? user.roles[0].name : 'undefined');
            
            // Redirect based on role
            switch (user.roles ? user.roles[0].name : '') {
                case 'Admin':
                    router.push('/dashboard'); // Admin redirects to /dashboard
                    break;
                case 'Manager':
                    router.push('/manager-dashboard'); // Manager redirects to their specific dashboard
                    break;
                case 'Cashier':
                    router.push('/cashier-dashboard'); // Cashier redirects to their specific dashboard
                    break;
                default:
                    error.value = 'Invalid role. Contact system administrator.';
            }
        } else {
            error.value = 'No token found in the response.';
        }
    } catch (err) {
        error.value = 'Login failed. Please check your credentials.';
        console.error(err);
    } finally {
        loading.value = false; // Stop loading after response
    }
};
</script>


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
              v-model="form.username"
              density="compact"
              placeholder="Username"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              :rules="[value => value && value.length >= 3 || 'Username must be at least 3 characters long.']"
            ></v-text-field>
  
            
            <v-text-field
              v-model="form.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              :rules="[value => value && value.length >= 6 || 'Password must be at least 6 characters long.']"
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
              Log In <v-icon>mdi-login</v-icon>
            </v-btn>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
  <a
    class="text-caption text-decoration-none text-blue"
    href="/forgot-password"  
    rel="noopener noreferrer"
    target="_blank"
  >
    Forgot password? Click here!
  </a>
</div>

  
  
           
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>


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
.login-card {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out;
}

.login-card:hover {
    transform: translateY(-10px);
}

/* Title */
.login-title {
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
    .login-card {
        padding: 1.5rem;
    }

    .login-title {
        font-size: 1.2rem;
    }
}
</style>
