<template>
  <Navbar @change-language="changeLanguage"></Navbar>
<v-container height="100%">
  <div style="position: relative;">
    <!-- Image with overlay text -->
    <v-img
      src="/2148833102.jpg"
      class="image"
      cover
      height="200"
      style="max-width: 100%; border-radius: 29px;"
    ></v-img>
    <!-- Overlay text -->
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
      <h1 style="font-size: 24px; margin-bottom: 10px;">{{$t('leadership') }}</h1>
    </div>
  </div>

  <v-card elevation="0" height="100%">
    <v-card-title>
      {{ $t('Meet_our_leaders') }}
    </v-card-title>
    <v-card-text>
      {{ $t('leaders_description') }}
    </v-card-text>

    <v-expansion-panels class="pa-4" variant="popout">
      <v-expansion-panel  :key="i" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="4" md="1" sm="2">
              <v-avatar size="36px">
                <v-img  src="/file.jpeg" alt="Avatar"></v-img>
              </v-avatar>
            </v-col>

       
                  <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name1') }}</strong>
      </v-col>
      <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name_role1') }}</strong>
      </v-col>

      <v-col  class="text-medium-emphasis text-truncate hidden-sm-and-down">
   {{$t('excerpts') }}
</v-col>

          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
  <v-card-text>
    <strong>{{$t('Roles')}}:</strong>
    <ul>
      <li >{{$t('roles1') }}</li>
      <li >{{$t('roles2') }}</li>
      <li >{{$t('roles3') }}</li>
      <li >{{$t('roles4') }}</li>
      <li >{{$t('roles5') }}</li>
      <li >{{$t('roles6') }}</li>
      <li >{{$t('roles7') }}</li>
      <li >{{$t('roles8') }}</li>
      <li >{{$t('roles9') }}</li>
      <li >{{$t('roles10') }}</li>


    </ul>
  </v-card-text>
</v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="pa-4" variant="popout">
      <v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="4" md="1" sm="2">
              <v-avatar size="36px">
                <v-img  src="/file.jpeg" alt="Avatar"></v-img>
              </v-avatar>
            </v-col>

       
                  <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name') }}</strong>
      </v-col>

      <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name_role') }}</strong>
      </v-col>

      <v-col  class="text-medium-emphasis text-truncate hidden-sm-and-down">
   {{$t('excerpts') }}
</v-col>

          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
  <v-card-text>
    <strong>{{$t('Roles')}}:</strong>
    <ul>
      <li >{{$t('roles.') }}</li>
    </ul>
  </v-card-text>
</v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="pa-4" variant="popout">
      <v-expansion-panel  :key="i" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="4" md="1" sm="2">
              <v-avatar size="36px">
                <v-img  src="/Untitled.png" alt="Avatar"></v-img>
              </v-avatar>
            </v-col>

       
                  <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name2') }}</strong>
      </v-col>


      <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name_role2') }}</strong>
      </v-col>


      <v-col  class="text-medium-emphasis text-truncate hidden-sm-and-down">
   {{$t('excerpts') }}
</v-col>

          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
  <v-card-text>
    <strong>{{$t('Roles')}}:</strong>
    <ul>
      <li >{{$t('roles11') }}</li>
      <li >{{$t('roles12') }}</li>
      <li >{{$t('roles13') }}</li>
      <li >{{$t('roles14') }}</li>
      <li >{{$t('roles15') }}</li>
      <li >{{$t('roles16') }}</li>
      <li >{{$t('roles17') }}</li>
      <li >{{$t('roles18') }}</li>
      <li >{{$t('roles19') }}</li>


    </ul>
  </v-card-text>
</v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels class="pa-4" variant="popout">
      <v-expansion-panel  :key="i" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="4" md="1" sm="2">
              <v-avatar size="36px">
                <v-img  src="/Untitled.png" alt="Avatar"></v-img>
              </v-avatar>
            </v-col>

       
                  <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name3') }}</strong>
      </v-col>


      <v-col class="text-no-wrap text-left" cols="5" sm="3">
        <strong>{{ $t('name_role3') }}</strong>
      </v-col>


      <v-col  class="text-medium-emphasis text-truncate hidden-sm-and-down">
   {{$t('excerpts') }}
</v-col>

          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
  <v-card-text>
    <strong>{{$t('Roles')}}:</strong>
    <ul>
      <li >{{$t('roles21') }}</li>
      <li >{{$t('roles22') }}</li>
      <li >{{$t('roles23') }}</li>
      <li >{{$t('roles24') }}</li>
      <li >{{$t('roles25') }}</li>
      <li >{{$t('roles26') }}</li>
      <li >{{$t('roles27') }}</li>
     


    </ul>
  </v-card-text>
</v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

  
  </v-card>

  <v-card elevation="0" height="100%">
    <v-card-title>
      {{$t('Partner_Organizations')}}
    </v-card-title>
    <v-card-text>
      <v-row>
        <!-- First partner organization -->
        <v-col cols="6">
          <v-list-item>
            <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('Partner_Organization_Name')}}</v-list-item-title>
              <v-list-item-subtitle>{{$t('Short_description_or_mission_statement')}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <!-- Second partner organization -->
        <v-col cols="6">
          <v-list-item>
            <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('Partner_Organization_Name')}}</v-list-item-title>
              <v-list-item-subtitle>{{$t('Short_description_or_mission_statement')}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-col cols="6">
          <v-list-item>
            <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('Partner_Organization_Name')}}</v-list-item-title>
              <v-list-item-subtitle>{{$t('Short_description_or_mission_statement')}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>

        <v-col cols="6">
          <v-list-item>
            <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t('Partner_Organization_Name')}}</v-list-item-title>
              <v-list-item-subtitle>{{$t('Short_description_or_mission_statement')}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        
      </v-row>
    </v-card-text>
  </v-card>
</v-container>
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
    model: null,
   
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
