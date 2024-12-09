<template>
  <div>
    <Navbar></Navbar>
    <v-row>
      <v-col cols="12">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127608.83780472685!2d40.00431202714795!3d-1.8332523053625245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1818039384a41fc5%3A0x50761c89fe22f306!2sGwano!5e0!3m2!1sen!2ske!4v1710323746304!5m2!1sen!2ske" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="10" sm="6" md="6" lg="6" xl="7" class="mx-auto">
        <v-card class="contact-card" variant="outlined">
          <v-card-title>Contact Us</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field v-model="formData.name" label="Name" variant="outlined"></v-text-field>
              <v-text-field v-model="formData.subject" label="Subject" variant="outlined"></v-text-field>
              <v-text-field v-model="formData.phone" label="Phone Number" variant="outlined"></v-text-field>
              <v-text-field v-model="formData.email" label="Email" variant="outlined"></v-text-field>
              <v-textarea v-model="formData.message" label="Message" variant="outlined"></v-textarea>
              <v-btn color="success" style="border-radius:5px;" type="submit">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="10" sm="6" md="6" lg="5" xl="4" class="mx-auto">
        <v-card class="contact-info-card" variant="outlined">
          <v-card-title>Contact Information</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Phone</v-list-item-title>
                  <v-list-item-subtitle>+1234567890</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>info@example.com</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Address</v-list-item-title>
                  <v-list-item-subtitle>123 Main Street, City, Country</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card class="contact-info-card" variant="outlined">
          <v-card-title>Frequently Asked Questions</v-card-title>
          <v-card-text>
            <v-expansion-panels>
  <!-- FAQ 1 -->
  <v-expansion-panel title="What is the mission of Gwano Welfare Society?" text="The mission of Gwano Welfare Society is to foster positive change and development within our community. We are committed to empowering individuals, families, and neighborhoods through various initiatives and programs aimed at addressing social, economic, and environmental challenges.">
    <!-- Additional content can be included here if needed -->
  </v-expansion-panel>

  <!-- FAQ 2 -->
  <v-expansion-panel title="How can I get involved with Gwano Welfare Society?" text="There are several ways to get involved with Gwano Welfare Society. You can volunteer your time, donate resources, participate in our events and programs, or become a member of our organization.">
    <!-- Additional content can be included here if needed -->
  </v-expansion-panel>

  <!-- FAQ 3 -->
  <v-expansion-panel title="What kind of events and programs does Gwano Welfare Society organize?" text="Gwano Welfare Society organizes a variety of events and programs aimed at addressing different community needs. These include educational workshops, health camps, environmental cleanup drives, and social awareness campaigns.">
    <!-- Additional content can be included here if needed -->
  </v-expansion-panel>

  <!-- FAQ 4 -->
  <v-expansion-panel title="How can I donate to Gwano Welfare Society?" text="You can donate to Gwano Welfare Society through our website or by contacting our office directly. We accept monetary donations as well as donations of goods and services.">
    <!-- Additional content can be included here if needed -->
  </v-expansion-panel>

  <!-- FAQ 5 -->
  <v-expansion-panel title="Does Gwano Welfare Society offer scholarships or financial aid?" text="Yes, Gwano Welfare Society offers scholarships and financial aid to deserving students in the community. Our aim is to support education and empower the youth to achieve their goals.">
    <!-- Additional content can be included here if needed -->
  </v-expansion-panel>

  <!-- Add more FAQs as needed -->
</v-expansion-panels>

          </v-card-text>
        </v-card>
      </v-col>

      
    </v-row>
  </div>
</template>

<script>
import Navbar from '../components/NavbarPage.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Implement form submission logic here
      console.log('Form submitted:', this.formData);
      // You can add your logic here to handle the form submission, such as sending the data to a server
    }
  }
};
</script>

<style scoped>
.contact-card,
.contact-info-card {
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
}
</style>
