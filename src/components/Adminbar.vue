<template>
  <div class="navbar-container">
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-if="user.name"
            color="primary"
            v-bind="props"
            class="mr-4"
            style="text-transform: capitalize;"
            rounded
            elevation="0"
          >
            <v-icon>mdi-account</v-icon>
            {{ user.name }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card min-width="400">
          <v-list>
            <v-list-item>
              <v-card-text v-if="user.name" class="text-center" style="font-size:18px;text-transform: capitalize;">
                <v-icon size="32">mdi-account</v-icon>
                {{ user.name }}
              </v-card-text>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text
              color="error"
              @click="logout"
            >
              <v-icon left>mdi-logout</v-icon>
              Logout
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="green"
              @click="$emit('open-profile')"
            >
              <v-icon left>mdi-account</v-icon>
              Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/service/api'; // Adjust the import path as needed

export default {
  name: 'Navbar',
  data() {
    return {
      menu: false,
      user: {
        name: '',
      },
    };
  },
  methods: {
    async fetchUserDetails() {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    async logout() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axiosInstance.post('/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          localStorage.removeItem('token');
          this.user = { name: '' };
          this.$router.push({ name: 'login' });
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
  mounted() {
    this.fetchUserDetails();
  },
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  background-color: transparent;
  position: absolute;
  width: 100%;
  top: 0;
}

.text-center {
  display: flex;
  align-items: center;
}
</style>
