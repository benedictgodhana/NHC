<template>
  <v-footer
    class=" text-center d-flex flex-column"
    style="background:#385cad;color:white"
  >
  <v-img src="/logo.png" alt="Logo" class="logo mr-2" max-height="60" contain></v-img>
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

   

    <v-divider></v-divider>

    <div>
      @{{ new Date().getFullYear() }} — <strong style="text-transform:none;">@iLabAfrica</strong>
      <p style="font-size: 14px;text-transform:none">All Rights Reserved to @iLabAfrica,Strathmore University</p>
    </div>
  </v-footer>
</template>
<script>
import { mapState } from 'vuex';


  export default {
    computed: {
  ...mapState(['language']),
  
},
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),

    methods: {
   changeLanguage(language) {
    // Call the function to change language from your language.js file
    this.$i18n.locale = language;
  },
}
  }
</script>