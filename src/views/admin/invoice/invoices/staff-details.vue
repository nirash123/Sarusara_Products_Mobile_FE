<template>
    <div>
      <section class="invoice-preview-wrapper">
        <b-row class="invoice-preview">
    <b-col
      cols="12"
      xl="9"
      md="8"
    >
      <b-card
        no-body
        class="invoice-preview-card"
      >
        <!-- Header -->
        <b-card-body class="invoice-padding pb-0">
          <b-row>
            <b-col cols="6">
            
            </b-col>
            <b-col cols="6">
              <div class="d-flex justify-content-end mb-2 mr-1">
                    <div class="invoice-date-wrapper">
                        <div>
                        <h5>
                            Date Issued:
                        </h5>
                        </div>
                        <div>
                        <h5 class="title text-truncate ml-1">
                            {{ formattedDate }}
                        </h5>
                        </div>
                    </div>
            </div>
            </b-col>
          </b-row>
        </b-card-body>
  
        <b-row class="px-3">
          <b-col class="newonegreen" cols="12">
            <div>
              <div  class="d-flex justify-content-center">
              <b-img
                    src="@/assets/images/logo/slogo.png"
                    width="100"
                    />
            </div>
              <h3 class="newonetext mb-25 d-flex justify-content-center">
               <div>Staff Payments Report</div>  
                </h3>
                <h3 class="newonetext mb-25 d-flex justify-content-center">
               <div> කාරයමණ්ඩල විස්තර</div>  
                </h3>
                <h4 class="newonetext mb-25 mt-50 d-flex justify-content-center">
                 <div>( {{ rangeDate }} )</div>
                </h4>
            </div>
            <hr class="newonegreen"/>
            <div >
              <div class="px-2">
                             <b-row class="pt-25">
                            <b-col cols="4" class="py-1 border-primary d-flex justify-content-center">
                             <h4>ලැබීම් ( Rs: {{ (totalIncome).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} )</h4> 
                            </b-col>
                            <b-col cols="4" class="py-1 border-primary d-flex justify-content-center">
                             <h4>ගෙවීම් ( Rs: {{ (totalExpenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ) </h4> 
                            </b-col>
                            <b-col cols="4" class="py-1 border-primary d-flex justify-content-center">
                             <h4>ඉතිරිය ( Rs: {{ (totalSave).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} )</h4> 
                            </b-col>
                        </b-row>
                   </div>
  
                   <div v-for="product in users" :key="product.id"  class="px-2 mt-1">
                        <b-row class="py-1 border-primary mb-2 rounded ">
                            <b-col cols="12" class="text-white d-flex justify-content-center">
                            <h3>  {{ product.first_name }}  {{ product.last_name }} (  {{ product.user_name }} ) </h3>
                            </b-col>
                        </b-row>
                       <div v-for="product in dates" :key="product.id"  class="px-2 mt-1">
                    <b-row>
                           <b-col cols="12" class="border-primary  ">
                              <h4 class=" d-flex justify-content-start p-1">දිනය - {{ product.date}} - ( Rs: {{  (product.income - product.expenditure).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ) </h4>
                              </b-col>
                    </b-row>
                        <b-row class="border-primary rounded ">
                         
                            <b-col cols="6" class="border-primary ">
                              <h4 class="d-flex justify-content-center"> ලැබීම් ( Rs: {{ (product.income).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ) </h4>
                            </b-col>
                            <b-col cols="6" class="border-primary ">
                              <h4 class="d-flex justify-content-center"> ගෙවීම් ( Rs: {{ (product.expenditure).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ) </h4>
                            </b-col>
                        </b-row>
                        <div class="pb-2">
                          <b-row >
                            <b-col cols="6" class="pt-1 border-primary">
                              <div v-for="income in incomes" :key="income.id">
                                        <b-row v-if="income.date == product.date" class="px-2">
                                          <b-col cols="8">
                                          <h6>  {{ income.users_user_name }} -(DS) </h6>
                                          </b-col>
                                          <b-col cols="4">
                                          <div class="d-flex justify-content-end">
                                            <h6> {{ (income.payment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                          </div>
                                          </b-col>
                                        </b-row>
                                    </div>
                             </b-col>
                            <b-col cols="6" class="pt-1 border-primary">
                              <div v-for="expenditure in expenditures" :key="expenditure.id">
                                  <b-row v-if="expenditure.order_date == product.date" class="px-2 ">
                                    <b-col cols="8">
                                    <h6>{{ expenditure.note}} ({{ expenditure.users_user_name }}) | (AD {{ expenditure.cashier_id }}) </h6>
                                    </b-col>
                                    <b-col cols="4">
                                    <div class="d-flex justify-content-end">
                                      <h6> Rs:{{ (expenditure.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                    </div>
                                    </b-col>
                                  </b-row>
                              </div>
                            </b-col>
                        </b-row>
                      </div>
                   </div>
                   </div>
                   </div>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-end mt-1 mb-1 mr-2">
                <h6>
                    <i> Software By @ Easyones Soft - 076 283 38 38 </i>
                </h6>
            </div>
      </b-card>
    </b-col>
    <b-col
      cols="12"
      md="4"
      xl="3"
      class="invoice-actions"
    >
      <b-card>
        <b-form-group>
        <h5 class="my-2">Select Staff Member :</h5>
        <v-select
                    id="group-input"
                    v-model="user_id"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="label"
                    :options="groups"
                    class="custom-v-select"
                    required
                  />
      </b-form-group>
      <b-form-group>
        <h5 class="my-2">Select Date Range :</h5>
        <flat-pickr
          v-model="rangeDate"
          class="form-control mb-2"
          :config="{ 
            mode: 'range',
            maxDate: new Date().toISOString().split('T')[0] 
          }"
        />
      </b-form-group>
        
      <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="primary"
          class="mb-75 mt-2"
          block
          @click="dateAdd"
        >
          View
        </b-button>

        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="primary"
          class="mb-75 mt-2"
          block
          @click="printInvoice"
        >
          Print
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="danger"
          class="mb-75 mt-2"
          block
          @click="$router.push('/invoice')"
          >
         Cancel
        </b-button>
      </b-card>
    </b-col>
  </b-row>
  </section>
    </div>
  </template>
  
  <script>
  import {
    BAlert,
    BAvatar,
    BBadge,
    BButton,
    BCol,
    BContainer,
    BDropdown,
    BDropdownItem,
    BForm,
    BCard,
    BCardBody,
    BFormCheckbox,
    BFormDatepicker,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormSelect,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BListGroup,
    BListGroupItem,
    BModal,
    BOverlay,
    BPagination,
    BRow,
    BSidebar,
    BTable,
    VBModal,
    BCardText,
    BImg,
    BTableLite,
  } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  import ErrorMessages from "@/mixins/ErrorMessages";
  import SuccessMessage from "@/mixins/SuccessMessage";
  import MomentMixin from "@/mixins/MomentMixin";
  import vSelect from "vue-select";
  import VuePerfectScrollbar from "vue-perfect-scrollbar";
  import draggable from "vuedraggable";
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Filter from "@/mixins/FilterMixin";
  import { mapGetters } from "vuex";
  import admin from "@/apis/modules/admin";
  import invoice from "@/apis/modules/invoice";
  import flatPickr from 'vue-flatpickr-component'
  
  export default {
    components: {
      BTableLite,
      BTable,
      BAvatar,
      BBadge,
      BRow,
      BCol,
      BFormGroup,
      BFormSelect,
      BPagination,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      BButton,
      BDropdown,
      BDropdownItem,
      BOverlay,
      BInputGroupPrepend,
      BListGroup,
      BCardBody,
      BListGroupItem,
      vSelect,
      flatPickr,
      BCard,
      BModal,
      VBModal,
      BCardText,
      BContainer,
      BAlert,
      BSidebar,
      BForm,
      BFormInvalidFeedback,
      BFormDatepicker,
      BFormCheckbox,
      VuePerfectScrollbar,
      draggable,
      ValidationProvider,
      ValidationObserver,
      BImg,
    },
    directives: {
      Ripple,
    },
  
    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
    data() {
      return {
        user_id: '',
        groups: [],
        users: {},
       dates: {},
        incomes: {},
        expenditure: {},
        totalIncome: 0,
        totalExpenditure: 0,
        totalSave: 0,
        rangeDate: null,
        start_date: null,
        end_date: null,
        userData: JSON.parse(localStorage.getItem('userData')),
        today: new Date().toISOString().slice(0, 10),
        date: new Date(),
        
        date_payments: [],
        date_payments_length: 0,
        
      };
    },
    watch: {
      filterQueryUpdate() {
        this.$refs.table.refresh();
      },
    },
    computed: {
      ...mapGetters(["currentUser"]),
  
      formattedDate() {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      return this.date.toLocaleString("en-US", options);
    },
      
    },
    methods: {

        async userNameData(){
            try {
                const response = await admin.staffData()
                this.groups = response.data.data
            
                } catch (error) {
                this.showErrorMessage('Please run server first.') 
                }
            },

      callparentfunction() {
        this.$parent.$parent.$parent.sendInvitation();
      },
  

      async dateAdd() {
            const [startDate, endDate] = this.rangeDate.split(' to ');
            let startDateObj = new Date(startDate); 
            let endDateObj = new Date(endDate); 
            let formattedStartDate = startDateObj.toISOString().split('T')[0];
            let formattedEndDate = endDateObj.toISOString().split('T')[0];
            try {
                this.payload = {
                    user_id: this.user_id,
                    start_date: formattedStartDate, 
                    end_date: formattedEndDate,
                }
                const status = await invoice.getStaffDetailInvoices(this.payload);
                this.users = status.data.user
                this.dates = status.data.data
                this.incomes = status.data.income
                this.expenditures = status.data.expenditure
                this.totalIncome = status.data.total_income
                this.totalExpenditure = status.data.total_expenditure
                this.totalSave = status.data.total_save
                this.getTotalPrice()
                this.getTotalOutPrice()
            } catch (error) {
            }
        },

        async getTotalPrice() {
            try {
              this.totalIncome = this.staff_dates
                .map(income => parseFloat(income.income))
                .reduce((total, income) => total + income, 0);
            } catch (error) {
              console.error("Error calculating total income:", error);
            }
          },

          async getTotalOutPrice() {
            try {
              this.totalExpenditure = this.staff_dates
                .map(expenditure => parseFloat(expenditure.expenditure))
                .reduce((total, expenditure) => total + expenditure, 0);
            } catch (error) {
              console.error("Error calculating total expenditure:", error);
            }
}
  
  
    },
    setup() {
        const printInvoice = () => {
          window.print()
        }
        return {
          printInvoice,
        }
      },
    async mounted() {
      if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){
        this.userNameData()
      }
       else{
        this.$router.push('/')
       }
    },
  };
  </script>
  <style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
  
  div#dropdown-1 .btn-outline-danger {
    border: none !important;
  }
  
   .image-container {
  position: relative;
  }
  
  .display-4-5 {
        font-size: 2.8rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }

  .display-5-5 {
        font-size: 2.2rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-red {
        font-size: 1.3rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #ff0000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-name {
        font-size: 1.3 rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }

    .display-new-1 {
        font-size: 1.1rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-2 {
        font-size: 1.2rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000;  /* Adjust the margin as needed */
    }
    .display-new-3 {
        font-size: 1.1rem; 
        color: #000000; /* Adjust the margin as needed */
    }
    .display-new-9 {
        font-size: 1.3rem; 
        color: #000000; /* Adjust the margin as needed */
    }
    .display-new-4 {
        font-size: 0.84rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-5 {
        font-size: 2.0rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-6 {
        font-size: 2.0rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }
    .display-new-7 {
        font-size: 1.5rem; /* Adjust the font size as needed */
        font-weight: bold;
        color: #000000; /* Adjust the color as needed */
        margin-bottom: 0.625rem; /* Adjust the margin as needed */
    }

    .custom-dashed-border {
        border: none; /* Remove the default border */
        border-top: 1px dashed; /* Create a dashed border at the top */
        color: black; /* Set the color of the dash (you can change this) */
        height: 1px; /* Set the height of the hr */
    }
  
  .custom-border {
        border: 1px solid #090909; /* Adjust color as needed */
    }
  .custom-border-5 {
        border: 1px solid #090909; /* Adjust color as needed */
    }
  
  .custom-image {
    width: 100%;
    height: 160px;
    border-radius: 10px;
  }
  
  .text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: rgba(0, 0, 0, 0); 
  color: rgb(251, 17, 17); /* Text color */
  font-size: 35px; /* Text font size */
  }
  
  .per-page-selector {
  width: 90px;
  }
  
  .single-line-text {
    width: 180px;
  }
  
  .invoice-filter-select {
  min-width: 190px;
  }
  
  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }
  
  ::v-deep .vs__selected {
    width: 100px;
  }
  
  button {
    height: 38px;
  }
  
  .newonegreen {
    border: 1px solid #0b6eca;
  margin: 20px 0;
  }
  </style>
  
  <style>
  /* Define background colors for different columns */
  .blue {
    background-color: #cadfff; /* Light gray */
  }
  
  .newred {
    background-color: #ffa4a0; /* Lighter blue */
  }
  
  .purple {
    background-color: #f5cbf7; /* Light purple */
  }
  
  .red {
    background-color: #f8cecc; /* Light red */
  }
  
  .yellow {
    background-color: #fff2cc; /* Light yellow */
  }
  
  .green {
    background-color: #95f371; /* Lighter gray */
  }
  </style>
  
  <style lang="scss" scoped>
  @import "~@core/scss/base/pages/app-invoice.scss";
  </style>
  
  <style lang="scss">
  @media print {
    
  
    // Global Styles
    body {
      background-color: transparent !important;
    }
    nav.header-navbar {
      display: none;
    }
    .main-menu {
      display: none;
    }
    .header-navbar-shadow {
      display: none !important;
    }
    .content.app-content {
      margin-left: 0;
      padding-top: 2rem !important;
    }
    footer.footer {
      display: none;
    }
    .card {
      background-color: transparent;
      box-shadow: none;
    }
    .customizer-toggle {
      display: none !important;
    }
  
    // Invoice Specific Styles
    .invoice-preview-wrapper {
      .row.invoice-preview {
        .col-md-8 {
          max-width: 100%;
          flex-grow: 1;
        }
  
        .invoice-preview-card {
          .card-body:nth-of-type(2) {
            .row {
                > .col-12 {
                max-width: 50% !important;
              }
  
              .col-12:nth-child(2) {
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;
                margin-top: 0 !important;
              }
            }
          }
        }
      }
  
      // Action Right Col
      .invoice-actions {
        display: none;
      }
    }
  }
  </style>
  
  <style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
  
  div#dropdown-1 .btn-outline-danger {
  border: none !important;
  }
  
  .per-page-selector {
  width: 90px;
  }
  
  .single-line-text {
  width: 180px;
  }
  
  h4.newonetext {
    color: #0b6eca;
  }
  
  h5.newonetext {
    color: #0357a5;
  }
  
  
  .banner {
    background-color: #0b6eca;
  }
  
  h3.newonetext {
    color: #0b6eca;
  }
  
  
  .newonegreen {
  border: 1px solid #0b6eca;
  margin: 10px 0;
  }
  
  .invoice-filter-select {
  min-width: 250px;
  }
  
  ::v-deep .vs__selected-options {
  flex-wrap: nowrap;
  }
  
  ::v-deep .vs__selected {
  width: 100px;
  }
  
  button {
  height: 38px;
  }
  </style>

  <style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
  