<template>
  <v-container fluid class="department-container">
    <v-row>
      <!-- Left Column with 5 Cards -->
      <v-col cols="12" md="3" class="department-side-col">
        <v-row>
          <v-col 
            cols="12" 
            v-for="(card, index) in leftCards" 
            :key="index" 
            class="department-col"
          >
            <v-card class="department-card" @click="openDialog(card)">
              <v-icon large>{{ card.icon }}</v-icon>
              <v-card-title style="background-color:darkblue;" class="text-overline font-weight-bold">{{ card.title }}</v-card-title>
              <v-card-subtitle v-if="card.subtitle">{{ card.subtitle }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Center Column with Pie Chart -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="pie-chart-container">
          <canvas id="departmentPieChart"></canvas>
        </div>
      </v-col>

      <!-- Right Column with 5 Cards -->
      <v-col cols="12" md="3" class="department-side-col">
        <v-row>
          <v-col 
            cols="12" 
            v-for="(card, index) in rightCards" 
            :key="index" 
            class="department-col"
          >
            <v-card class="department-card" @click="openDialog(card)">
              <v-icon large>{{ card.icon }}</v-icon>
              <v-card-title style="background-color: darkblue" class="text-overline font-weight-bold">{{ card.title }}</v-card-title>
              <v-card-subtitle v-if="card.subtitle">{{ card.subtitle }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-img :src="selectedCard.image" height="250px" class="dialog-image"></v-img>
        <v-card-title class="headline">{{ selectedCard.title }}</v-card-title>
        <v-card-subtitle v-if="selectedCard.subtitle">{{ selectedCard.subtitle }}</v-card-subtitle>
        <v-card-text>{{ selectedCard.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'DepartmentsView',
  setup() {
    const leftCards = ref([
      { 
        icon: 'mdi-wifi', 
        title: 'Internet of Things', 
        subtitle: 'and Wireless Networks',
        description: 'This department focuses on IoT technologies and wireless communications, enabling smart devices and infrastructure.',
        image: 'https://via.placeholder.com/600x250?text=Internet+of+Things'
      },
      { 
        icon: 'mdi-lock', 
        title: 'Cyber Security',
        description: 'The Cyber Security department works on securing networks, systems, and data from cyber threats.',
        image: 'https://via.placeholder.com/600x250?text=Cyber+Security'
      },
      { 
        icon: 'mdi-chart-bar', 
        title: 'Data Science',
        description: 'This department handles big data analytics, machine learning, and artificial intelligence research.',
        image: 'https://via.placeholder.com/600x250?text=Data+Science'
      },
      { 
        icon: 'mdi-school', 
        title: 'Digital Learning',
        description: 'Digital Learning provides educational technology and tools for e-learning and online courses.',
        image: 'https://via.placeholder.com/600x250?text=Digital+Learning'
      },
      { 
        icon: 'mdi-server', 
        title: 'Outsourcing & Consulting',
        description: 'This department offers IT outsourcing, consultancy, and managed services to organizations.',
        image: 'https://via.placeholder.com/600x250?text=Outsourcing+%26+Consulting'
      },
    ]);

    const rightCards = ref([
      { 
        icon: 'mdi-hospital', 
        title: 'eHealth',
        description: 'eHealth leverages technology to improve healthcare delivery and patient management.',
        image: 'https://via.placeholder.com/600x250?text=eHealth'
      },
      { 
        icon: 'mdi-cloud', 
        title: 'Cloud Computing',
        description: 'This department focuses on cloud technologies and infrastructure solutions.',
        image: 'https://via.placeholder.com/600x250?text=Cloud+Computing'
      },
      { 
        icon: 'mdi-cash', 
        title: 'TAI Fintech',
        description: 'TAI Fintech develops innovative financial technologies and solutions for the modern market.',
        image: 'https://via.placeholder.com/600x250?text=TAI+Fintech'
      },
      { 
        icon: 'mdi-lightbulb-on', 
        title: '@iBizAfrica Incubation Centre',
        description: 'The incubation centre supports startups with mentoring, funding, and networking opportunities.',
        image: 'https://via.placeholder.com/600x250?text=iBizAfrica+Incubation'
      },
      { 
        icon: 'mdi-chart-bar', 
        title: 'Another Department',
        description: 'This department focuses on various research areas and collaborative initiatives.',
        image: 'https://via.placeholder.com/600x250?text=Another+Department'
      },
    ]);

    const dialog = ref(false);
    const selectedCard = ref({});

    const openDialog = (card) => {
      selectedCard.value = card;
      dialog.value = true;
    };

    onMounted(() => {
      // Initialize Pie Chart
      const ctx = document.getElementById('departmentPieChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['IoT', 'Cyber', 'Data', 'Learning', 'Consulting'],
          datasets: [
            {
              data: [12, 19, 3, 5, 2],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
            },
          ],
        },
      });
    });

    return { leftCards, rightCards, dialog, selectedCard, openDialog };
  },
};
</script>

<style scoped>
.department-container {
  padding: 2rem;
  background-color: #f5f5f5;
}

.department-side-col {
  display: flex;
  flex-direction: column;
}

.department-col {
  margin-bottom: 1rem;
}

.department-card {
  border-radius: 25px;
  text-align: center;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.department-card:hover {
  transform: scale(1.05);
}

v-icon {
  margin-bottom: 0.5rem;
  color: #02338D;
}

.pie-chart-container {
  width: 500px;
  height: 500px;
}

.dialog-image {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

@media (max-width: 960px) {
  .pie-chart-container {
    width: 100%;
    height: auto;
  }
}
</style>
