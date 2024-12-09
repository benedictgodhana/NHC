<template>
  <v-container style="max-width: 1700px;width:100%">
    <v-row>
      <v-col>

        <!-- Category Card -->
        <v-card max-width="400" style="border-radius:10px;" elevation="0" >
          <v-card-item  style="background-color:#02338D;color:white">
      <v-card-title class="text-center font-weight-bold ms-1 mb-2" style="background-color: #02338D">
        Categories
      </v-card-title>

      <template v-slot:append>
        <v-btn
          color="white"
          icon="mdi-list-box"
          size="small"
        ></v-btn>
      </template>
    </v-card-item>
          <v-card-text>
            <!-- List of categories -->
            <v-list dense>
      <v-list-item v-for="(category, index) in categories" :key="index" @click="redirectToCategory(category)">
        <v-list-item-icon>
          <v-icon>{{ category.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="ms-8 font-weight-bold ">{{ category.name }}</v-list-item-content>
      </v-list-item>
    </v-list>
          </v-card-text>
        </v-card>
        <br>
        <!-- Calendar Card -->
        <v-card max-width="400" style="border-radius: 10px;" elevation="0">
    <v-card-text>
      <v-card-title style="background-color: #02338D;">
        <div class="text-center font-weight-bold ms-1 mb-2">Notice Board</div>
        <hr>
      </v-card-title>

      <div class="timeline-container">
    <v-timeline align="start" density="compact">
      <v-timeline-item 
        v-for="notice in notices" 
        :key="notice.id">
        <div class="mb-4">
          <div class="font-weight-normal">
            <strong style="text-transform: uppercase;">
              {{ notice.title }} - {{ formatDate(notice.created_at) }}
            </strong> 
            <hr>
            <br>
          </div>
          <div style="text-transform: none;">
            {{ notice.content }}
          </div>
          <br>
          <hr>
          <p style="text-transform: capitalize; font-weight: 500;">
            by {{ notice.user.name }}
          </p>
          <br>
          <v-btn 
            @click="openDialog(notice)" 
            color="primary" 
            text 
            rounded 
            elevation="0" 
            variant="tonal" 
            style="text-transform: capitalize;">
            <v-icon left>mdi-eye</v-icon> View Notice
          </v-btn>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
    </v-card-text>
  </v-card>
        <br>
        <v-card max-width="400" style="background-color: #02338D; color: white; border-radius: 10px;" elevation="0">
    <v-card-title style="background-color: #02338D;">
      <div class="text-center font-weight-bold ms-1 mb-2">Birthdays</div>
      <hr>
    </v-card-title>
    <v-card-text>
      <v-list dense style="background-color: #02338D; color: white">
        <template v-if="latestBirthdays.length > 0">
          <v-list-item v-for="(birthday, index) in latestBirthdays" :key="index">
            <v-avatar style="align-items: center;">
              <v-icon size="32" color="white">mdi-account</v-icon>
            </v-avatar>
            <v-list-item-content style="text-transform: capitalize; font-weight: 600; font-size: 18px;">{{ birthday.name }}</v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item v-else>
          <v-list-item-content style="text-transform: capitalize; font-weight: 600; font-size: 18px;">No birthday today</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn style="text-transform: capitalize;" width="100%" @click="sendWishes(birthday.email)">
      <v-icon>mdi-cake</v-icon>Send Wishes
    </v-btn>
    </v-card-text>
  </v-card>
      </v-col>

      <v-container style="max-width: 1000px;width:100%">      <!-- Search Card -->
     <v-col>
       
  <v-card width="100%" style="max-width:1000px;border-radius: 10px 10px 0 0;margin-top: -10px;" elevation="0">
    <v-carousel style="max-width: 1000px;" width="100%" height="200" :show-arrows="false" cycle>
      <v-carousel-item
        src="/workplace-team-cooperation-businesswoman-laptop-office.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/symbols-come-out-bulb-top-book.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/books-magnifying-glass.jpg"
        cover
      ></v-carousel-item>
    </v-carousel> 
    <v-card-text>
      <br>
      <v-card elevation="0" width="100%" max-width="100%" style="margin-top: -30px;">
          <v-card-text>
            <v-text-field
              :loading="loading"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              label="Search "
              variant="outlined"
              rounded
              hide-details
              single-line
              @click:append-inner="onClick"
            ></v-text-field>
          </v-card-text>
        </v-card>
        
      <v-row>
        <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius:5px;" width="100%" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/dressing-room_8227379.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip label text @click="navigateToSystem1" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>Room Booking</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius:5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/ticket_3414781.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip label text @click="navigateToSystem2" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold " rounded><v-icon class="ma-2">mdi-link</v-icon>ilabAfrica Ticketing </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Third quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius:5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/hr-management_11476452.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem3" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>P&C OrangeHRM</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
      </v-row>
      <v-row>
    <!-- First quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius: 5px;" variant="tonal" >
        <!-- Image representing the system -->
        <v-img src="/education_8262344.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem4" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>AMS</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Second quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius: 5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/contacs_1251119.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem5" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0  " class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>Phone diretory</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Third quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"   style="border-radius:5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/customer-feedback_4739565.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem6" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>perfomance evaluation </v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Add more quick link cards as needed -->
  </v-row>
  <v-row>
    <!-- First quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0" style="border-radius: 5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/generator_8018861.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem7" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>University Dashboard</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Second quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius: 5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/printer-machine_10616579.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem8" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>Printer</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Third quick link card -->
    <v-col cols="12" lg="4">
      <v-card elevation="0"  style="border-radius: 5px;" variant="tonal">
        <!-- Image representing the system -->
        <v-img src="/smart_13961059.png" height="50" style="margin-top: 10px;"></v-img>
        <v-card-actions class="justify-center">
          <!-- Clickable area for the card -->
          <v-chip text @click="navigateToSystem9" style="background-color:#02338D;color:white;border-radius:30px;text-transform:capitalize;width:100%" elevation="0" class="text-overline font-weight-bold "><v-icon class="ma-2">mdi-link</v-icon>password Reset</v-chip>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- Add more quick link cards as needed -->
  </v-row>
    </v-card-text>
  </v-card>
</v-col>
</v-container>


<v-col>
  <v-card
    class="mx-auto"
    max-width="400"
    style="border-radius: 10px;"
    elevation="0"
  >
    <v-card-item style="background-color:#02338D;color:white">
      <v-card-title class=" font-weight-bold ms-1 mb-2" style="background-color: #02338D;">
        Document Directory
      </v-card-title>

      <template v-slot:append>
        <v-btn
          color="white"
          icon="mdi-plus"
          size="small"
        ></v-btn>
      </template>
    </v-card-item>

    <v-card-text class="pt-4">
      Explore our extensive collection of documents at iLabAfrica! From research papers to project reports, our documents provide valuable insights and knowledge. Browse through and find the resources you need for your projects and initiatives.
    </v-card-text>

    <v-divider></v-divider>

    <!-- Document Categories -->
    <v-list dense>
      <v-list-item-group v-for="(category, index) in documentCategories" :key="index">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar
              :color="category.color"
              class="text-white font-weight-bold "
              size="40"
              style="text-transform: uppercase;"
            >
              {{ category.initials }}
            </v-avatar>
          </template>
          <v-list-item-content>
            
            <v-list-item-title class="font-weight-bold ">{{ category.name }}</v-list-item-title>
          </v-list-item-content>
          <template v-slot:append>
            <v-chip
              size="small"
              variant="tonal"
              text @click="redirectToDocument(category)"
            >
              View

              <v-icon
                color="orange-darken-4"
                end
              >
                mdi-eye
              </v-icon>
            </v-chip>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Document List -->
  
  </v-card>


</v-col>

    </v-row>
    <br>

    <v-footer
    class=" text-center d-flex flex-column"
    style="background-color: #02338D;color:white"
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

    <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title>
              <span class="headline">{{ selectedNotice.title }}</span>
            </v-card-title>
            <v-card-text>
              <div class="text-center" style="font-size: 20px; font-weight: bold;">
                {{ selectedNotice.content }}
              </div>
              <p class="text-right" style="font-size: 16px; font-weight: 500; margin-top: 20px;">
                - by {{ selectedNotice.user ? selectedNotice.user.name : 'Unknown' }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <v-divider></v-divider>

    <div>
      @{{ new Date().getFullYear() }} — <strong style="text-transform:none;">@iLabAfrica</strong>
      <p style="font-size: 14px;text-transform:none">All Rights Reserved to @iLabAfrica,Strathmore University</p>
    </div>
  </v-footer>
  </v-container>

  
</template>
<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/service/api'; // Import axios for making HTTP requests

const dialog = ref(false); // To control dialog visibility
const notices = ref([]);

const selectedNotice = ref({}); // To store selected notice details



const fetchNotices = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const response = await axiosInstance.get('/notices', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    notices.value = response.data; // Assuming backend returns an array of notices
  } catch (error) {
    console.error('Error fetching notices:', error);
  }
};


const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Get month name
  const month = date.toLocaleString('default', { month: 'long' });
  
  // Get day with ordinal suffix
  const day = date.getDate();
  let dayWithSuffix;
  switch (day % 10) {
    case 1:
      dayWithSuffix = day + 'st';
      break;
    case 2:
      dayWithSuffix = day + 'nd';
      break;
    case 3:
      dayWithSuffix = day + 'rd';
      break;
    default:
      dayWithSuffix = day + 'th';
      break;
  }
  
  // Get year
  const year = date.getFullYear();
  
  // Construct formatted date
  const formattedDate = `${month} ${dayWithSuffix}, ${year}`;
  
  return formattedDate;
};

// Example usage:
const dateString = '2024-07-06'; // Example input date string
const formatted = formatDate(dateString);
console.log(formatted); // Output: July 6th, 2024




const openDialog = (notice) => {
      selectedNotice.value = notice; // Set the clicked notice as the selected one
      dialog.value = true; // Open the dialog
    };


const latestBirthdays = ref([]); // Reactive reference for the latest birthdays
const fetchBirthdays = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const response = await axiosInstance.get('/birthdays', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    birthdays.value = response.data; // Assuming API returns an array of birthdays
    console.log('Birthdays fetched:', birthdays.value);
    findLatestBirthdays(); // Call findLatestBirthdays after fetching birthdays
  } catch (error) {
    console.error('Error fetching birthdays:', error);
  }
};

// Function to find birthdays celebrated today (ignoring year)
const findLatestBirthdays = () => {
  if (birthdays.value.length === 0) {
    latestBirthdays.value = []; // No birthdays fetched yet
    return;
  }

  // Get today's month and day
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  // Filter birthdays that match today's month and day (ignoring year)
  const todayBirthdays = birthdays.value.filter(birthday => {
    const birthdayDate = new Date(birthday.birthday_date);
    const birthdayMonth = birthdayDate.getMonth();
    const birthdayDay = birthdayDate.getDate();
    return birthdayMonth === todayMonth && birthdayDay === todayDay;
  });

  if (todayBirthdays.length > 0) {
    latestBirthdays.value = todayBirthdays; // Found birthdays for today
  } else {
    latestBirthdays.value = []; // No birthdays found for today
  }
};

onMounted(() => {
  fetchBirthdays();
  fetchNotices();
});
const selectedDate = ref(new Date());
const today = new Date();

const router = useRouter();

// Sample data for events
const events = [
  // { id: 1, title: 'Event 1', date: '2024-05-06', description: 'Description of Event 1' },
  // { id: 2, title: 'Event 2', date: '2024-05-08', description: 'Description of Event 2' },
  // Add more events as needed
];

const categories = ref([
  // { name: 'News', icon: 'mdi-newspaper', route: '/news' },
  // { name: 'Events', icon: 'mdi-calendar', route: '/events' },
  { name: 'Documents', icon: 'mdi-file-document', route: '/documents' },
  { name: 'Departments', icon: 'mdi-account-group', route: '/organization' },
  // Add more categories as needed
]);

const documentCategories = ref([
  {
    name: 'Financial',
    initials: 'FD',
    color: '#2196F3',
    id: 'financial',
    documents: [
      { color: '#2196F3', documentName: 'Financial Document 1', initials: 'FD1' },
      { color: '#90CAF9', documentName: 'Financial Document 2', initials: 'FD2' },
      { color: '#64B5F6', documentName: 'Financial Document 3', initials: 'FD3' },
      // Add more financial documents as needed
    ],
  },
  {
    name: 'Logos',
    id: 'logos',
    initials: 'LG',
    color: '#2196F3',
    documents: [
      { color: '#2196F3', documentName: 'Logo Document 1', initials: 'LD1' },
      { color: '#90CAF9', documentName: 'Logo Document 2', initials: 'LD2' },
      { color: '#64B5F6', documentName: 'Logo Document 3', initials: 'LD3' },
      // Add more logo documents as needed
    ],
  },
  {
    name: 'HR Documents',
    id: 'human_resource',
    initials: 'HR',
    color: '#2196F3',
    documents: [
      { color: '#2196F3', documentName: 'HR Document 1', initials: 'HRD1' },
      { color: '#90CAF9', documentName: 'HR Document 2', initials: 'HRD2' },
      { color: '#64B5F6', documentName: 'HR Document 3', initials: 'HRD3' },
      // Add more HR documents as needed
    ],
  },
  {
    name: 'Requisition',
    id: 'requisition',
    initials: 'RQ',
    color: '#2196F3',
    documents: [
      { color: '#2196F3', documentName: 'Requisition Document 1', initials: 'RQD1' },
      { color: '#90CAF9', documentName: 'Requisition Document 2', initials: 'RQD2' },
      { color: '#64B5F6', documentName: 'Requisition Document 3', initials: 'RQD3' },
      // Add more requisition documents as needed
    ],
  },
  {
    name: 'Policies',
    id: 'policies',
    initials: 'PS',
    color: '#2196F3',
    documents: [
      { color: '#2196F3', documentName: 'Policy Document 1', initials: 'PSD1' },
      { color: '#90CAF9', documentName: 'Policy Document 2', initials: 'PSD2' },
      { color: '#64B5F6', documentName: 'Policy Document 3', initials: 'PSD3' },
      // Add more policy documents as needed
    ],
  },
  // Add more categories as needed
]);

const redirectToDocument = (document) => {
  router.push(`/documents/${document.id}`);
};

const redirectToCategory = (category) => {
  router.push(category.route);
};

// Sample data for birthdays
const birthdays = [
  // { name: 'John Doe', avatar: '/middle-aged-cheerful-dark-skinned-male-with-shining-smile.jpg' },
  // Add more birthdays as needed
];


// Generate sample project data
const projectNames = [
  'Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5',
  'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10'
];

const colors = [
  '#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', 
  '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', 
  '#2979FF', '#2962FF'
];

const items = projectNames.map((name, index) => ({
  projectName: name,
  initials: name.charAt(0),
  color: colors[index % colors.length],
}));

// Define the search logic
const onClick = () => {
  // Define your search logic here
};


const sendWishes = (email, name) => {
  const subject = encodeURIComponent("Happy Birthday!");
  const body = encodeURIComponent(`Dear ${name},\n\nWishing you a very happy birthday! Hope you have a wonderful day!\n\nBest,\nYour Name`);
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink; // Open the email client
};

// Define the navigation functions
const navigateToSystem1 = () => {
  const url = 'https://shaba.strathmore.edu/';
  window.location.href = url;
};

const navigateToSystem2 = () => {
  const url = 'https://support.ilabafrica.ac.ke';
  window.location.href = url;
};

const navigateToSystem3 = () => {
  const url = 'https://tudor.strathmore.edu/hrm/symfony/web/index.php/auth/login';
  window.location.href = url;
};

const navigateToSystem4 = () => {
  const url = 'https://icts.strathmore.edu/ams/';
  window.location.href = url;
};

const navigateToSystem5 = () => {
  const url = 'https://chaka.strathmore.edu/phonebill/directory';
  window.location.href = url;
};

const navigateToSystem6 = () => {
  const url = 'https://pnc-pm.strathmore.edu/';
  window.location.href = url;
};

const navigateToSystem7 = () => {
  const url = 'https://dashboard.strathmore.edu/login';
  window.location.href = url;
};

const navigateToSystem8 = () => {
  const url = 'http://printers.strathmore.edu:8080/';
  window.location.href = url;
};



const navigateToSystem9 = () => {
  const url = 'https://su-sso.strathmore.edu/staff-pss/private/login';
  window.location.href = url;
};
</script>

<style scoped>
/* Make the timeline container scrollable */
.timeline-container {
  height: 400px;  /* Adjust height as needed */
  overflow-y: auto;  /* Enable vertical scrolling */
  padding-right: 8px; /* Avoid scrollbar overlap */
}

/* Optional: Add custom scrollbar styling (for better aesthetics) */
.timeline-container::-webkit-scrollbar {
  width: 8px;
}

.timeline-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.timeline-container::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
