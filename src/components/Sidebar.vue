<template>
    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app style="color: black;">
      <v-img src="/nch-removebg-preview.png" alt="Logo" max-height="100" style="margin-top: 20px;" class=""></v-img>
      <br>
      <v-divider></v-divider>

      <v-list nav dense>

        <v-list-item @click="$router.push('/dashboard')" prepend-icon="mdi-home" title="Dashboard" value="Dashboard">
        </v-list-item>

        <v-list-item @click="$router.push('/commute-schedules')" prepend-icon="mdi-calendar-clock" title="Commute Schedules" value="Commute Schedules"  >
        </v-list-item>

        <v-list-item @click="$router.push('/book-tickets')" prepend-icon="mdi-ticket" title="All Booked Tickets" value="Book Tickets"  >
        </v-list-item>


        <v-list-item @click="$router.push('/routes')" prepend-icon="mdi-routes" title="Routes" value="Routes" >
        </v-list-item>


        <v-list-item @click="$router.push('/users')" prepend-icon="mdi-account-plus" title="Manage Users" value="Users"  >
        </v-list-item>
        <v-list-item @click="$router.push('/card_holders')" prepend-icon="mdi-card" title="Cards" value="Cards"  >
</v-list-item>

<v-list-item @click="$router.push('/card_top_up')" prepend-icon="mdi-cash" title="Card Top Up" value="Card Top Up">
</v-list-item>




        <v-list-item @click="$router.push('/feedback')" prepend-icon="mdi-comment-text-outline" title="Feedback" value="Feedback">
        </v-list-item>

        <v-list-item @click="profileDrawer = true" prepend-icon="mdi-account" title="Profile" value="Profile">
        </v-list-item>

        <v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" value="Logout">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Profile Drawer -->
    
    <!-- App Bar -->
    <v-app-bar app dark elevation="1">
    <v-btn icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn style="background-color: #02338D; color: white;" v-bind="props" class="mr-4">
            <v-icon>mdi-account</v-icon> {{ user.name }} <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item>
              <v-card-text style="font-size: 18px;">
                <v-icon size="32">mdi-account</v-icon> {{ user.name }}
              </v-card-text>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="background-color: red; color: white;" @click="logout">
              <v-icon>mdi-logout</v-icon> Logout
            </v-btn>
            <v-btn style="background-color: green; color: white;" @click="profileDrawer = true">
              <v-icon>mdi-account</v-icon> Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- Second App Bar (New) -->
  <v-app-bar app color="white" dark>
   
    <v-spacer></v-spacer>
    <v-btn icon @click="handleNewAction">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn style="background-color: green; color: white;" @click="handleAnotherAction">
      <v-icon>mdi-refresh</v-icon> Refresh
    </v-btn>
  </v-app-bar>

    <!-- Main Content -->
  
</template>
<script>
import axiosInstance from "@/service/api";

export default {
  data() {
    return {
      menu: false,
      drawer: true,
      user: [], // Holds the user data
    };
  },
  mounted() {
    this.fetchUserDetails(); // Fetch user details when the component is mounted
  },
  methods: {
    // Method to fetch authenticated user details
    async fetchUserDetails() {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (!token) {
    console.error("No token found, cannot fetch user details.");
    return;
  }

  try {
    // Fetch the user details from the backend using the token
    const response = await axiosInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request header
      },
    });

    if (response.data.user) { // Ensure the response contains the 'user' key
      this.user = response.data.user; // Update the user data in the component
    } else {
      console.error("Failed to fetch user details:", response.data.message || 'Unknown error');
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
},


    // Logout method
    async logout() {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, logging out.");
          localStorage.removeItem("token");
          this.$router.push("/login");
          return;
        }

        // Send the logout request to the backend
        await axiosInstance.post(
          "/logout",
          {}, // Empty body, as no data is required
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Remove the token after logging out
        localStorage.removeItem("token");

        // Redirect the user to the login page
        this.$router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
};
</script>

