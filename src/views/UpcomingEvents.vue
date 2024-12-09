<template>
  <Navbar></Navbar>
  <v-container>
    <!-- Calendar -->
    <v-card class="event-calendar" elevation="0">
      <v-card-title style="font-size: 20px;font-weight: 800;background: burlywood;" class="text-center">
        Gwano Welfare Society Events
      </v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <VDatePicker v-model="date" class="date-picker" outlined dense></VDatePicker>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Event Cards -->
    <v-card class="event-card" elevation="0" v-for="event in events" :key="event.id">
      <v-row align="center">
        <!-- Event Image -->
        <v-col cols="4">
          <v-img :src="event.image" alt="Event Image" style="border-radius: 30px;"></v-img>
        </v-col>

        <!-- Event Details -->
        <v-col cols="8">
          <div class="event-details">
            <!-- Title of the event -->
            <h3 class="event-title">{{ event.title }}</h3>
            <!-- Time and Date of the event -->
            <p class="event-date-time">{{ event.date }} | {{ event.time }}</p>
            <!-- RSVP Button -->
            <v-btn class="rsvp-btn" color="primary" @click="showRSVPForm(event.id)">
              <v-icon left>mdi-calendar-check</v-icon>
              RSVP
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- RSVP Form Dialog -->
    <v-dialog v-model="showRSVPDialog" max-width="800">
      <v-card style="border-radius:3px;">
        <v-card-title class="text-center">RSVP Form for {{ selectedEvent.title }}</v-card-title>
        <v-card-text>
        <!-- RSVP form fields -->
        <v-text-field v-model="formData.name" label="Name" variant="outlined"></v-text-field>
        <v-text-field v-model="formData.email" label="Email" variant="outlined"> </v-text-field>
        <v-text-field v-model="formData.phone" label="Phone Number" variant="outlined"></v-text-field>
              <v-select
          v-model="formData.gender"
          :items="genders"
          label="Gender"
          variant="outlined"
        ></v-select>
  
        
        <!-- Location selection field -->
        <v-select
          v-model="formData.location"
          :items="locations"
          label="Location"
          variant="outlined"
        ></v-select>
  
  <!-- Add more text-fields or selection fields as needed -->
</v-card-text>

        <v-card-actions style="padding-left: 120px;margin-top: -20px;">
          <v-btn  style="background: green;color:white;text-transform: lowercase;" @click="submitRSVP">Submit</v-btn>
          <v-btn style="background: red;color:white;text-transform: lowercase;" @click="showRSVPDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Navbar from '../components/NavbarPage.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      date: new Date(),
      events: [
        {
          id: 1,
          title: 'Community Cleanup Day - Wenje',
          date: 'March 10, 2024',
          time: '9:00 AM - 12:00 PM',
          image: '/8832797_4021480.jpeg' // Add image URL for each event
        },
        {
          id: 2,
          title: 'Healthcare Awareness Workshop - Hara',
          date: 'March 15, 2024',
          time: '2:00 PM - 4:00 PM',
          image: '/medium-shot-smiley-father-kid-posing.jpg' // Add image URL for each event
        },
        {
          id: 3,
          title: 'Education Scholarship Program Info Session - Wenje',
          date: 'March 20, 2024',
          time: '6:00 PM - 8:00 PM',
          image: '/heard-home-02.jpg' // Add image URL for each event
        },
        // Add more events as needed
      ],
      showRSVPDialog: false,
      selectedEvent: null,
      locations: ['Hara', 'Wenje', 'Makere', 'Maroni', 'Kipendi'], // Example locations, replace with actual data
      genders: ['Male', 'Female', 'Other'], // Example genders, replace with actual data
      formData: {
        name: '',
      email: '',
      phone: '',
      gender: null, // Initialize as null or set a default value
      location: null // Initialize as null or set a default value
        // Add more fields if needed
      }
    };
  },
  methods: {
    showRSVPForm(eventId) {
      // Find the selected event based on eventId
      this.selectedEvent = this.events.find(event => event.id === eventId);
      // Set showRSVPDialog to true to display the form dialog
      this.showRSVPDialog = true;
    },
    submitRSVP() {
      // Logic to handle RSVP form submission
      // Once submitted, you can close the dialog and perform any necessary actions
      this.showRSVPDialog = false;
    }
  }
};
</script>

<style scoped>
.event-calendar {
  margin: 30px auto;
  text-align: center;
  
}

.event-card {
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.event-avatar img {
  border-radius: 50%;
}

.event-details {
  padding-left: 20px;
}

.event-title {
  margin: 0 0 5px;
  font-size: 20px;
  text-transform: capitalize;
}

.event-date-time {
  margin: 0;
  font-size: 16px;
}

.rsvp-btn {
  margin-top: 10px;
  border-radius: 30px;
  width: 50%;
}
</style>
