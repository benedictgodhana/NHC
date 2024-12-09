<template>
  <v-app>
    <v-main style="background-color: aliceblue;">
      <!-- Conditionally render Navbar and Footer based on authentication state or route meta -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/NavbarPage.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isAuthenticated: localStorage.getItem('token') ? true : false, // Check if a token exists
    };
  },
  watch: {
    // Watch for route changes to update the authentication state
    '$route'(to) {
      this.isAuthenticated = localStorage.getItem('token') ? true : false; // Update based on the current route
    }
  },
  methods: {
    changeLanguage(lang) {
      // Your language change logic here
    }
  }
};
</script>

<style scoped>
.v-main {
  /* Any additional styles for main content */
}
</style>
