<template>
    <v-navigation-drawer v-model="profileDrawer" app right temporary color="#f5f5f5">
      <v-toolbar flat color="#02338D" dark>
        <v-toolbar-title>Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-form ref="profileForm" @submit.prevent="updateProfile">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.name"
                label="Name"
                required
                variant="underlined"
                prepend-inner-icon="mdi-account"
                style="text-transform: capitalize"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.email"
                label="Email"
                required
                variant="underlined"
                prepend-inner-icon="mdi-email"
                style="text-transform: capitalize"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="currentPassword"
                label="Current Password"
                type="password"
                required
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                style="text-transform: capitalize"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newPassword"
                label="New Password"
                type="password"
                required
                variant="underlined"
                prepend-inner-icon="mdi-lock"
                style="text-transform: capitalize"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                type="submit"
                color="#02338D"
                text
                block
                style="color: white; text-transform: capitalize;"
              >
                Update Profile
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-navigation-drawer>
  </template>
  
  <script>
  import axiosInstance from '@/service/api';
  
  export default {
    name: 'ProfileDrawer',
    props: {
      profileDrawer: {
        type: Boolean,
        required: true,
      },
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        error: null,
      };
    },
    methods: {
      close() {
        this.$emit('update:profileDrawer', false);
      },
      async updateProfile() {
        try {
          const token = localStorage.getItem('token');
          const payload = {
            name: this.user.name,
            email: this.user.email,
            current_password: this.currentPassword,
            new_password: this.newPassword,
          };
  
          const response = await axiosInstance.put('/user/profile', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Update user data
          this.$emit('profile-updated', response.data);
          this.close();
        } catch (error) {
          console.error('Error updating profile:', error);
          this.error = 'Failed to update profile. Please check your input.';
          // Optionally, emit the error to parent component
          this.$emit('error', this.error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  