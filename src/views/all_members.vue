<template>
  <div>
    <Navbar @change-language="changeLanguage"></Navbar>
    <v-container>
        <v-card-title class="text-center">
          {{ $t('welcome_members') }}
        </v-card-title>
        <v-card-text class="text-center">
          {{ $t('members_message') }}
        </v-card-text>
      <v-row>
        
        <!-- Loop through members data and display cards -->
        <v-col
          v-for="(member, index) in members"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card variant="outlined" class="member-card">
            <!-- Member avatar -->
            <v-avatar size="100">
              <v-img
                :src="member.image"
                alt="Member Image"
              ></v-img>
            </v-avatar>
            <!-- Member name -->
            <div class="member-name">{{ member.name }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/NavbarPage.vue';
import { mapState } from 'vuex';


export default {
  components: {
    Navbar
  },
  computed: {
  ...mapState(['language']),
  
},
  data() {
    return {
      // Sample data for members
      members: [
        { name: 'William Hiribae', image: 'public/file.jpeg' },
        { name: 'Zablon Abae', image: '/Untitled.png' },
        { name: 'Jillo Aser Godhana', image: '/Untitled.png' },
        { name: 'Hon. Sammy Malibe', image: '/Untitled.png' },
        { name: 'Michael Bonaya', image: '/Untitled.png' },
        { name: 'Malibe Salim', image: '/Untitled.png' },
        { name: 'Mercy Walali', image: '/Untitled.png' },
        { name: 'Mjidho Benjamin ', image: '/Untitled.png' },
        { name: 'Christine Malibe', image: '/Untitled.png' },
        { name: 'Hon Salim Babusa', image: '/Untitled.png' },
        { name: 'Madam Rita Balaghar', image: '/Untitled.png' },
        { name: 'Francis Malibe', image: '/Untitled.png' },
        { name: 'Uleo Steven Philip', image: '/Untitled.png' },
        { name: 'Norbert Bocha', image: '/Untitled.png' },
        { name: 'Fred Abio', image: '/Untitled.png' },
        { name: 'Leah Hasera', image: '/Untitled.png' },
        { name: 'Jonathan Safari', image: '/Untitled.png' },
        { name: 'Erick Dhadho', image: '/Untitled.png' },
        { name: 'Gafo Salim', image: '/Untitled.png' },
        { name: 'Hiribae Juma', image: '/Untitled.png' },
        { name: 'Moroa Bwoye', image: '/Untitled.png' },
        { name: 'Patience Dhadho', image: '/Untitled.png' },
        { name: 'Justin Hiribae', image: '/Untitled.png' },
        { name: 'Joseph Dhadho', image: '/Untitled.png' },
        { name: 'Mwalimu J.E.Mwaruka', image: '/Untitled.png' },
        { name: 'Hon.Alfelt Mumbo Abio', image: '/Untitled.png' },
        { name: 'Rashid Malibe', image: '/Untitled.png' },
        { name: 'Hassan Morowa', image: '/Untitled.png' },
        { name: 'Juma Gafo', image: '/Untitled.png' },
        { name: 'Sammy Abio Philemon ', image: '/Untitled.png' },
        { name: 'Gafo Hiribae', image: '/Untitled.png' },
        { name: 'Quinter Samuel Daa', image: '/Untitled.png' }
      ]
    };
  },
  methods: {
   changeLanguage(language) {
    // Call the function to change language from your language.js file
    this.$i18n.locale = language;
  },
}
};
</script>

<style scoped>
.member-card {
  margin-bottom: 20px;
  text-align: center;
  border-radius: 20px;
}

.member-image {
  border-radius: 10px 10px 0 0;
}

.member-name {
  text-align: center;
  padding: 10px;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
