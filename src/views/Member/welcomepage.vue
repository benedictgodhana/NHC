<template>
    <Navbar></Navbar>

    <v-container>
        <v-card height="100%">
            <div style="display: flex; align-items: center;">    <!-- Image with overlay text -->
    <v-img
      src="/9200913.jpg"
      class="image"
      cover
      height="200"
      style="max-width: 100%; border-radius: 0px;margin-top:0px;"
    ></v-img>
    <!-- Overlay text -->
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
      <h1 style="font-size: 24px; margin-bottom: 10px;color:black">Welcome</h1>
    </div>
    <!-- Avatar -->
    <v-avatar style="position: absolute; top: 150px; left: 10px; border: 2px solid white;">
      <v-img
        src="/medium-shot-man-having-lunch-restaurant.jpg"
        alt="Avatar Image"
        height="60"
        width="60"
        style="border-radius: 50%;"
      ></v-img>
      
    </v-avatar>

    
  </div>
</v-card>

<v-stepper
  editable
  hide-actions
  :items="['My Profile', 'My Membership', 'Discussion Forum']"
>
  <template v-slot:item.1>
    <v-card>
    <v-toolbar color="" dark>
      <v-toolbar-title>User Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined color="red" :disabled="!isDataChanged" @click="cancel">
  <v-icon>mdi-cancel</v-icon> Cancel
</v-btn>
<v-btn color="success" :disabled="!isDataChanged" @click="save">
  <v-icon>mdi-content-save</v-icon> Save
</v-btn>

    </v-toolbar>

    <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>

    <v-scroll-x>
      <v-container>
        <v-row>
          <!-- Profile Card -->
          <v-col cols="12" md="">
            <v-card class="profile-card">
              <v-card-title>Basic Info</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                
  <!-- Add user profile information here -->
  <div class="basic-info-top-item">
    <v-avatar class="form-photo" size="80">
      <v-img
        src="/medium-shot-man-having-lunch-restaurant.jpg"
        alt="Avatar Image"
      ></v-img>
      <!-- Your avatar image -->
    </v-avatar>
    <div class="profile-info">
      <div>
        <div class="title-text">Name: Member</div>
        <div class="subtitle-text with-clipboard-copy">
          ID: 1234567
          <v-btn icon class="copy-clipboard-button" @click="copyToClipboard(profileData.id)" elevation="0">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
      <v-btn text @click="showPasswordDialog" style="border-radius:20px;text-transform: lowercase;" color="primary">
      <v-icon>mdi-lock</v-icon> <!-- MDI icon for lock -->
      Change Password
    </v-btn>

    <v-dialog v-model="passwordDialog" max-width="500px">
      <template v-slot:activator="{ on }"></template>
      <v-card style="border-radius: 20px;">
        <v-card-title>Change Password</v-card-title>
        <v-card-text>
          <!-- Form Fields for Changing Password -->
          <v-text-field v-model="currentPassword" label="Current Password" type="password"></v-text-field>
          <v-text-field v-model="newPassword" label="New Password" type="password"></v-text-field>
          <v-text-field v-model="confirmPassword" label="Confirm Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- Save and Cancel buttons for the password change form -->
          <v-btn color="blue darken-1" text @click="cancelPasswordChange">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="savePasswordChange">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </div>
  <v-card-text class="basic-info-fields">
  <!-- User basic info fields -->
  <div class="basic-info-field">
    <div class="label">First Name:</div>
    <v-text-field v-model="profileData.fname" placeholder="First Name"></v-text-field>
  </div>
  <div class="basic-info-field">
    <div class="label">Last Name:</div>
    <v-text-field v-model="profileData.lname" placeholder="Last Name" ></v-text-field>
  </div>
  <!-- Add more basic info fields as needed -->
  <div class="basic-info-field">
    <div class="label">County:</div>
    <v-text-field v-model="profileData.county" placeholder="County"></v-text-field>
  </div>
  <div class="basic-info-field">
    <div class="label">Sub-County:</div>
    <v-text-field v-model="profileData.subcounty" placeholder="subcounty"></v-text-field>
  </div>

  <div class="basic-info-field">
    <div class="label">Ward:</div>
    <v-text-field v-model="profileData.ward" placeholder="Ward"></v-text-field>
  </div>
  <div class="basic-info-field">
    <div class="label">Clan:</div>
    <v-text-field v-model="profileData.subcounty" placeholder="clan"></v-text-field>
  </div>
  
  <!-- Add more fields below as needed -->
</v-card-text>


  
</v-card-text>

            </v-card>
          </v-col>

          <!-- Contacts Card -->
         
          <!-- Address Card -->
         
          
        </v-row>

        <v-row>
  <!-- Address Card -->
  <v-col cols="6">
  <v-card class="profile-card">
    <v-card-title><v-icon color="red">mdi-map</v-icon>Address</v-card-title>
    <v-card-text>
      <!-- Address information -->
      <div class="address-top-item">
        <div>
          <!-- Address field -->
          <v-text-field v-model="profileData.address" label="Address"></v-text-field>
          <!-- City field -->
          <v-text-field v-model="profileData.city" label="City"></v-text-field>
          <!-- State field -->
          <v-text-field v-model="profileData.state" label="State"></v-text-field>
          <!-- Country field -->
          <v-text-field v-model="profileData.country" label="Country"></v-text-field>
        </div>
      </div>
    </v-card-text>
  </v-card>
</v-col>


  <!-- Contact Card -->
  <v-col cols="6">
  <v-card class="profile-card">
    <v-card-title><v-icon size="23" color="green">mdi-phone</v-icon> Contact</v-card-title>
    
    <v-card-text>
      <!-- Contact information -->
      <div class="address-top-item">
      
        <div>
          <!-- Bind contact information from profileData -->
          <!-- Phone number field -->
          <v-text-field v-model="profileData.phone" label="Phone Number"></v-text-field>
          <!-- Email field -->
          <v-text-field v-model="profileData.email" label="Email"></v-text-field>
        </div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

</v-row>

      </v-container>
    </v-scroll-x>
  </v-card>
  </template>

  <template v-slot:item.2>
    <v-card flat></v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Step Three" flat>...</v-card>
  </template>
</v-stepper>

       
    </v-container>
  
</template>

<script>
  import Navbar from '/src/components/MemberNavbar.vue';
  
  export default {
    components: {
      Navbar
    },
    data() {
      return {
        profileData: {
        name: 'John Doe',
        id: '123456789',},
        
        isDataChanged: false,
      isLoading: true,
      profileData: {},
      isChangePasswordPopupVisible: false,
      isContentScrolled: false,
        model: null,
        upcomingEvents: [
          { id: 1, title: 'Community Cleanup Day', description: 'Join us for a day of cleaning up our neighborhood streets.' },
          { id: 2, title: 'Healthcare Awareness Workshop', description: 'Learn about the importance of healthcare and wellness in our community.' },
          { id: 3, title: 'Education Scholarship Program', description: 'Apply for scholarships to support your education journey.' }
        ],
        passwordDialog: false, // Initially, the password change modal is hidden
      currentPassword: '', // Holds the value of the current password input field
      newPassword: '', // Holds the value of the new password input field
      confirmPassword: '' // Holds the value of the confirm password input field
      };

    },

    methods: {

      showPasswordDialog() {
      // Show the password change modal when the button is clicked
      this.passwordDialog = true;
    },
    cancelPasswordChange() {
      // Clear the input fields and close the modal
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordDialog = false;
    },
    savePasswordChange() {
      // Implement your logic to save the new password
      // You may want to perform validation and handle errors
      console.log('Current Password:', this.currentPassword);
      console.log('New Password:', this.newPassword);
      console.log('Confirm Password:', this.confirmPassword);

      // Clear the input fields and close the modal
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordDialog = false;
    },
    changePassword() {
      this.isChangePasswordPopupVisible = true;
    },
    copyToClipboard(text) {
      // Copy text to clipboard logic
    },
    save() {
      // Save data logic
      this.isDataChanged = false;
    },
    cancel() {
      // Cancel changes logic
      this.isDataChanged = false;
    },
    formatPhone(phone) {
      // Format phone number logic
    },
    scroll() {
      // Scroll event logic
      this.isContentScrolled = !this.isContentScrolled;
    },
  },
  };
  </script>

  <style>

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px; /* Adjust margin as needed */
}

.basic-info-top-item {
  display: flex;
  align-items: center;
}

.basic-info-fields {
  display: flex;
  flex-wrap: wrap;
}

.basic-info-field {
  flex: 1 0 calc(50% - 16px); /* Each field takes 50% of the available width with some margin */
  margin-right: 16px; /* Adjust margin as needed */
  margin-bottom: 16px; /* Add margin below each field */
}



</style>
  