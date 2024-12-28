<script setup>
import { ref } from 'vue';
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
const submit = async () => {
    error.value = null; // Clear any previous errors
    loading.value = true; // Start loading

    try {
        const response = await axiosInstance.post('/login', {
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
            console.log('Redirecting to:', user.roles ? (user.roles[0].name === 'Admin' ? '/dashboard' : user.roles[0].name === 'Manager' ? '/manager-dashboard' : user.roles[0].name === 'Cashier' ? '/cashier-dashboard' : 'Invalid role') : 'Invalid role');

            // Redirect based on role
            switch (user.roles ? user.roles[0].name : '') {
                case 'Admin':
                    router.push('/dashboard');
                    break;
                case 'Manager':
                    router.push('/manager-dashboard');
                    break;
                case 'Cashier':
                    router.push('/cashier-dashboard');
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
    <v-container class="d-flex justify-center align-center min-vh-100" fluid>
        <Head title="Bus Commuter Smart Card Login" />

        <v-card max-width="450" width="100%" class="login-card" elevation="2">
            <!-- Logo and Title -->
            <v-card-title class="d-flex justify-center align-center" style="background-color: white;">
                <v-img
                    src="src/assets/logo.png"
                    contain
                    max-width="80"
                    class="mr-2"
                ></v-img>
            </v-card-title>
<v-card-title>NAMIB CONTRACT HAULAGE</v-card-title>
            <!-- Status Alert -->
            <v-card-text class="mt-16">
                <div v-if="status" class="mb-4">
                    <v-alert type="success" dismissible>
                        {{ status }}
                    </v-alert>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="submit">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Username"
                                v-model="form.username"
                                required
                                variant="outlined"
                                class="input-field"
                                autofocus
                                autocomplete="username"
                                prepend-inner-icon="mdi-account"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Password"
                                type="password"
                                v-model="form.password"
                                required
                                variant="outlined"
                                class="input-field"
                                autocomplete="current-password"
                                prepend-inner-icon="mdi-lock"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-btn
                        width="100%"
                        type="submit"  
                        :loading="loading" 
                        color="red"
                        style="text-transform: capitalize;"
                    >
                        Log in <v-icon class="ml-2">mdi-login</v-icon>
                    </v-btn>

                    <v-row class="mt-2">
                        <v-col cols="12" class="d-flex justify-between">
                            <router-link
                                v-if="canResetPassword"
                                :to="{ name: 'password.request' }"
                                class="forgot-password-link"
                            >
                                Forgot Password?
                            </router-link>
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>

            <!-- Error Alert -->
            <v-alert v-if="error" type="error" dismissible class="mt-4">
                {{ error }}
            </v-alert>
        </v-card>
    </v-container>
</template>

<style scoped>
/* General */
.min-vh-100 {
    min-height: 100vh;
    color: white;
    background-image: url('IMG_0333-scaled.jpg'); /* Background image */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8; /* Dim the image */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Dim overlay with black */
}

/* Responsive adjustments */
@media screen and (max-width: 600px) {
    .min-vh-100 {
        background-size: cover; /* Ensure the image fits within the screen for smaller devices */
    }
}

/* Card */
.login-card {
    background: #ffffff; /* White card background */
    padding: 2rem;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}

/* Title */
.login-title {
    font-size: 1.5rem; /* Slightly increased font size */
    color: #d32f2f; /* Red accent color */
    font-weight: bold;
}

/* Input Fields */
.input-field .v-input__control {
    border-radius: 8px;
    background: #f7f7f7; /* Light grey background for inputs */
    color: black;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.input-field .v-input__control::placeholder {
    color: #bdbdbd;
}

/* Button */
.login-button {
    background: #d32f2f; /* Red background */
    color: white;
    font-weight: bold;
    border-radius: 5px;
    text-transform: capitalize;
    transition: background 0.3s ease;
}

.login-button:hover {
    background: #b71c1c; /* Darker red for hover effect */
}

/* Links */
.forgot-password-link {
    color: #d32f2f; /* Red accent */
    font-size: 0.85rem;
    text-decoration: underline;
}

.forgot-password-link:hover {
    text-decoration: none;
}

/* Responsive Adjustments */
@media screen and (max-width: 600px) {
    .login-card {
        padding: 1.5rem;
    }

    .login-title {
        font-size: 1.2rem; /* Reduced font size for small screens */
    }
}
</style>
