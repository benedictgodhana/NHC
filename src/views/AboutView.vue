<template>
  <div>
    <v-container>
      <v-row>
        <!-- First quick link card -->
        <v-col cols="12" lg="4">
          <v-card elevation="0" style="border-radius: 10px;">
            <!-- Image representing the system -->
            <v-card-title class="text-overline font-weight-bold" style="background-color:  #02338D"><v-icon>mdi-cash</v-icon> Finance Documents</v-card-title>
            <hr>
            <!-- List of Finance documents -->
            <v-list dense style="text-transform: capitalize;">
              <!-- Document links -->
              <a :href="document.link" target="_blank" v-for="document in financeDocuments" :key="document.id"  style="text-decoration: none;">
                <v-list-item>
                  <v-icon>mdi-file-document</v-icon> {{ document.title }}
                </v-list-item>
              </a>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Second quick link card -->
        <v-col cols="12" lg="4">
          <v-card elevation="0" style="border-radius: 10px;">
            <!-- Image representing the system -->
            <v-card-title class="text-overline font-weight-bold " style="background-color:  #02338D"><v-icon>mdi-account-group</v-icon> HR Documents</v-card-title>
            <hr>
            <!-- List of HR documents -->
            <v-list dense style="text-transform: capitalize;">
              <!-- Document links -->
              <a :href="document.link" target="_blank" v-for="document in hrDocuments" :key="document.id"  style="text-decoration: none;">
                <v-list-item>
                  <v-icon>mdi-file-document</v-icon> {{ document.title }}
                </v-list-item>
              </a>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Third quick link card -->
        <v-col cols="12" lg="4">
          <v-card elevation="0" style="border-radius: 10px;">
            <!-- Image representing the system -->
            <v-card-title class="text-overline font-weight-bold " style="background-color:  #02338D"><v-icon>mdi-cart-outline</v-icon> Requisition Forms</v-card-title>
            <hr>
            <!-- List of Requisition Forms -->
            <v-list dense style="text-transform: capitalize;">
              <!-- Document links -->
              <a :href="document.link" target="_blank" v-for="document in requisitionForms" :key="document.id"  style="text-decoration: none;">
                <v-list-item>
                  <v-icon>mdi-file-document</v-icon> {{ document.title }}
                </v-list-item>
              </a>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Fourth quick link card -->
        <v-col cols="12" lg="4">
          <v-card elevation="0" style="border-radius: 10px;">
            <!-- Image representing the system -->
            <v-card-title class="text-overline font-weight-bold " style="background-color:  #02338D"><v-icon>mdi-image</v-icon> Logos and Presentations</v-card-title>
            <hr>
            <!-- List of Logos and Presentations -->
            <v-list dense style="text-transform: capitalize;">
              <!-- Document links -->
              <a :href="document.link" target="_blank" v-for="document in logosAndPresentations" :key="document.id"  style="text-decoration: none;">
                <v-list-item>
                  <v-icon>mdi-file-document</v-icon> {{ document.title }}
                </v-list-item>
              </a>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Fifth quick link card -->
        <v-col cols="12" lg="4">
          <v-card elevation="0" style="border-radius: 10px;">
            <!-- Image representing the system -->
            <v-card-title class="text-overline font-weight-bold " style="background-color:  #02338D"><v-icon>mdi-file-document-outline</v-icon> Policies</v-card-title>
            <hr>
            <!-- List of Policies -->
            <v-list dense style="text-transform: capitalize;">
              <!-- Document links -->
              <a :href="document.link" target="_blank" v-for="document in policies" :key="document.id" style="text-decoration: none;">
                <v-list-item>
                  <v-icon>mdi-file-document</v-icon> {{ document.title }}
                </v-list-item>
              </a>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Add more quick link cards as needed -->
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

   

    <v-divider></v-divider>

    <div>
      @{{ new Date().getFullYear() }} — <strong style="text-transform:none;">@iLabAfrica</strong>
      <p style="font-size: 14px;text-transform:none">All Rights Reserved to @iLabAfrica,Strathmore University</p>
    </div>
  </v-footer>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      financeDocuments: [
      { id: 1, title: 'General claim form', link: 'https://sagana.strathmore.edu/intranet/documents/hr/General_Claim_Form-V2.1-2020.pdf' },
      { id: 2, title: 'IOU form', link: 'https://sagana.strathmore.edu/intranet/uploads/finance/IOU_Form%20(2).docx' },
      { id: 3, title: 'Invoice request form', link: 'https://sagana.strathmore.edu/intranet/documents/INVOICE_REQUEST_FORM.docx' },
      { id: 4, title: 'Lecturers claim form', link: 'https://sagana.strathmore.edu/intranet/documents/hr/Lecturers_claim_form_2020.pdf' },
      { id: 5, title: 'International Per diem rates', link: 'https://sagana.strathmore.edu/intranet/uploads/Policies/International%20Per%20Diems%20(2).pdf' },
      { id: 6, title: 'Local per diem rates', link: 'https://sagana.strathmore.edu/intranet/uploads/HR%20Documents/Local_Per_Diem_Rates%20revised%20(1).pdf' }, 
  // Add more finance documents here
],
hrDocuments: [
  { id: 1, title: 'Employee Requisition Form', link: 'https://example.com/employee-requisition-form' },
  { id: 2, title: 'Contract Renewal Full-time Staff', link: 'https://example.com/contract-renewal-full-time-staff' },
  { id: 3, title: 'Contract Renewal Interns', link: 'https://example.com/contract-renewal-interns' },
  { id: 4, title: 'Staff Training Form - General Staff', link: 'https://example.com/staff-training-form-general-staff' },
  { id: 5, title: 'Administration Staff Employee Assessment', link: 'https://example.com/administration-staff-employee-assessment' },
  { id: 6, title: 'Probation Assessment', link: 'https://example.com/probation-assessment' },
  // Add more HR documents here
],

requisitionForms: [
  { id: 1, title: 'Request Forms', link: 'https://example.com/request-forms' },
  { id: 2, title: 'Store Requisition Forms', link: 'https://example.com/store-requisition-forms' },
  { id: 3, title: 'Internet Service Request Form', link: 'https://example.com/internet-service-request-form' },
  { id: 4, title: 'Item Requisition Form', link: 'https://example.com/office-supplies-requisition-form' },
  { id: 5, title: 'Equipment Requisition Form', link: 'https://example.com/equipment-requisition-form' },
  // Add more requisition forms here
],

logosAndPresentations: [
      { id: 4, title: '@iLabAfrica/logos ', link: 'https://strathmore.edu/wp-content/uploads/2023/05/@iLabAfrica_Logos.zip' },
      { id: 4, title: '@iBizAfrica/logos ', link: 'https://strathmore.edu/wp-content/uploads/2023/05/@iBizAfrica_Logos.zip' },
      { id: 5, title: 'ilab/ibiz templates ppt ', link: 'https://example.com/project-logo' },
      { id: 5, title: 'ilab/ibiz slidedeck ', link: 'https://example.com/project-logo' },
     
  // Add more logos and presentations here
],

      policies: [
        { id: 1, title: 'University Policies', link: 'https://example.com/university-policies' },
        { id: 2, title: 'iLab Policies - Department Policies', link: 'https://example.com/ilab-policies' },
        // Add more Policies here
      ],
      // Add more document categories and their respective arrays as needed
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
