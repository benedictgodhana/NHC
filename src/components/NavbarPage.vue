<template>
  <!-- Loading Dialog -->
  <v-dialog v-model="loading" persistent max-width="100">
    <v-card color="transparent" flat>
      <v-card-text>
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Navigation Bar -->
  <v-app-bar
    v-if="!isLoginPage && !isDashboardPage"
    :elevation="2"
    height="60"
    style="background-color:#02338D;color:white"
  >
    <!-- Logo on Large Screens -->
    <v-img
      src="/iLab white Logo-01.png"
      alt="Logo"
      max-height="230"
      class="hidden-sm-and-down logo"
    ></v-img>

    <!-- Drawer Toggle Button for Small Screens -->
    <v-btn icon @click="drawer = !drawer" class="hidden-md-and-up">
      <v-icon color="black">mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- Navigation Links for Large Screens -->
    <div class="nav-links hidden-sm-and-down">
      <v-btn text class="nav-btn" to="/">
        <v-icon left>mdi-home-outline</v-icon> Home
      </v-btn>

      <v-btn text class="nav-btn" to="/documents">
        <v-icon left>mdi-file-document</v-icon> All Documents
      </v-btn>

      <v-btn text class="nav-btn" to="/organization">
        <v-icon left>mdi-account-group</v-icon> Departments
      </v-btn>

      <v-btn text class="nav-btn" to="/login">
        <v-icon left>mdi-login</v-icon> Login
      </v-btn>
    </div>

    <v-spacer></v-spacer>
  </v-app-bar>

  <!-- Drawer for Small Screens -->
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    class="navigation-drawer"
  >
    <v-list dense nav>
      <v-list-item v-for="(item, index) in drawerItems" :key="index" link :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

---

### **Script Section**

```javascript
<script>
export default {
  data() {
    return {
      loading: false, // Control the visibility of the loading spinner
      drawer: false, // Control the visibility of the drawer
      drawerItems: [
        { title: "Home", icon: "mdi-home-outline", route: "/" },
        { title: "All Documents", icon: "mdi-file-document", route: "/documents" },
        { title: "Departments", icon: "mdi-account-group", route: "/organization" },
        { title: "Login", icon: "mdi-login", route: "/login" },
      ],
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
    isDashboardPage() {
      return this.$route.path === "/dashboard";
    },
  },
  methods: {
    switchLanguage(lang) {
      console.log("Switching language to:", lang);
    },
    login() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/login");
      }, 2000);
    },
    register() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push("/register");
      }, 2000);
    },
  },
};
</script>
<style scoped>
/* App Bar Styles */
.app-bar {
  background-color: #02338D;
  color: white;
}

/* Logo Styling */
.logo {
  margin-top: 8px;
  max-width: 150px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-btn {
  text-transform: capitalize;
  color:white;
  font-weight: 500;
}

/* Drawer Styling */
.navigation-drawer {
  background-color:darkblue;
  color:white;
}

/* Loading Spinner */
.v-dialog__content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Small Screen Adjustments */
@media (max-width: 960px) {
  .app-bar {
    justify-content: space-between;
  }

  .logo {
    display: none;
  }

  .navigation-drawer .v-list-item-title {
    font-weight: bold;
  }
}
</style>
