<template>
    <br>
    <v-container>
      <v-card class="mx-auto" max-width="100%" outlined elevation="0">
        <div class="documents-container">
          <v-card-title class="text-overline font-weight-bold "  style="background-color: #02338D;">
            <v-icon>{{ getCategoryIcon }}</v-icon> {{ getCategoryName }}
          </v-card-title>
          <br>
          <ul>
            <li v-for="document in documents" :key="document.id" class="document-item">
              <a :href="document.url" class="document-link">
                <v-icon>{{ getDocumentIcon(document.name) }}</v-icon> {{ document.name }}
              </a>
            </li>
          </ul>
        </div>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const categoryId = ref(route.params.categoryId);
  const documents = ref([]);
  
  // Static data for demonstration
  const documentData = {
    financial: [
      { id: 1, name: 'General claim form', url: 'https://sagana.strathmore.edu/intranet/documents/hr/General_Claim_Form-V2.1-2020.pdf' },
      { id: 2, name: 'IOU form', url: 'https://sagana.strathmore.edu/intranet/uploads/finance/IOU_Form%20(2).docx' },
      { id: 3, name: 'Invoice request form', url: 'https://sagana.strathmore.edu/intranet/documents/INVOICE_REQUEST_FORM.docx' },
      { id: 4, name: 'Lecturers claim form', url: 'https://sagana.strathmore.edu/intranet/documents/hr/Lecturers_claim_form_2020.pdf' },
      { id: 5, name: 'International Per diem rates', url: 'https://sagana.strathmore.edu/intranet/uploads/Policies/International%20Per%20Diems%20(2).pdf' },
      { id: 6, name: 'Local per diem rates', url: 'https://sagana.strathmore.edu/intranet/uploads/HR%20Documents/Local_Per_Diem_Rates%20revised%20(1).pdf' },
    ],
    logos: [
      { id: 4, name: '@iLabAfrica/logos ', url: 'https://strathmore.edu/wp-content/uploads/2023/05/@iLabAfrica_Logos.zip' },
      { id: 4, name: '@iBizAfrica/logos ', url: 'https://strathmore.edu/wp-content/uploads/2023/05/@iBizAfrica_Logos.zip' },
      { id: 5, name: 'ilab/ibiz templates ppt ', url: 'https://example.com/project-logo' },
      { id: 5, name: 'ilab/ibiz slidedeck ', url: 'https://example.com/project-logo' },
     
    ],
    human_resource: [
      { id: 6, name: 'HR Policy Document', url: 'https://example.com/hr-policy-document' },
      { id: 7, name: 'Employee Handbook', url: 'https://sagana.strathmore.edu/intranet/uploads/HR%20Documents/SU%20Values%20in%20Action%20Handbook%20EDITED.pdf' },
      { id: 8, name: 'employee requisition form ', url: 'https://sagana.strathmore.edu/intranet/documents/hr/Employee_Requisition_Form_V5_2021.pdf' },
      { id: 9, name: 'contract Renewal Full time staff ', url: 'https://example.com/employee-handbook' },
      { id: 10, name: 'contract Renewal interns ', url: 'https://example.com/employee-handbook' },
      { id: 11, name: 'staff training form - general staff ', url: 'https://example.com/employee-handbook' },
      { id: 12, name: 'administration staff employee assessment ', url: 'https://example.com/employee-handbook' },
      { id: 13, name: 'probation assessment ', url: 'https://example.com/employee-handbook' },

    ],
    requisition: [
      { id: 14, name: 'request forms ', url: 'https://example.com/hr-policy-document' },
      { id: 15, name: 'store requisition forms ', url: 'https://example.com/employee-handbook' },
      { id: 16, name: 'internet service request form ', url: 'https://example.com/employee-handbook' },
      
    ],
    policies: [
      { id: 14, name: 'university policies ', url: 'https://example.com/hr-policy-document' },
      { id: 15, name: 'ilab policies - department policies ', url: 'https://example.com/employee-handbook' },
      
    ],
  };
  
  documents.value = documentData[categoryId.value];
  
  const getCategoryName = computed(() => {
    switch (categoryId.value) {
      case 'financial':
        return 'Financial Documents';
      case 'logos':
        return 'Logo Documents';
      case 'human_resource':
        return 'HR Documents';
        case 'requisition':
        return 'Requisition Documents';
        case 'policies':
        return 'Policies';
      default:
        return '';
    }
  });
  
  const getCategoryIcon = computed(() => {
  switch (categoryId.value) {
    case 'financial':
      return 'mdi-cash';
    case 'logos':
      return 'mdi-image';
    case 'human_resource':
      return 'mdi-account-group';
    case 'policies':
      return 'mdi-file-document-outline'; // Icon for policies
    case 'requisition':
      return 'mdi-cart-outline'; // Icon for requisition
    default:
      return '';
  }
});

  
  const getDocumentIcon = (documentName) => {
    // Add logic to return relevant icons based on document names
    // Example logic:
    switch (documentName.toLowerCase()) {
      case 'general claim form':
        return 'mdi-file-document-outline';
      case 'iou form':
        return 'mdi-file-document-outline';
      case 'invoice request form':
        return 'mdi-file-document-outline';
      // Add more cases for other document names and icons
      default:
        return 'mdi-file-document-outline';
    }
  };
  </script>
  
  <style>
  .documents-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .documents-container h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .document-item {
    list-style-type: none;
    margin-bottom: 10px;
  }
  
  .document-link {
    text-decoration: none;
    color: #333;
    cursor: pointer;
    text-transform: capitalize;
  }
  
  .document-link:hover {
    text-decoration: underline;
  }
  
  .v-card-title {
    background-color: midnightblue;
    color: white;
  }
  </style>
  