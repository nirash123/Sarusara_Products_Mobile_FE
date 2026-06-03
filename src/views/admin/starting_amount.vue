<template>
    <b-card>
  
      <b-row>
  
        <b-col
            class="d-flex align-items-center auth-bg reg-right-side"
        >
          <b-col
              cols="12">
            <validation-observer
                ref="personalDetails"
                tag="form"
            >
              <b-form
                  class="auth-login-form mt-2"
                  @submit.prevent
              >
                <b-row>
                  <b-col sm="12" md="12" lg="6">
                    <b-form-group
                        label="Start Amount"
                        label-for="phone"
                    >
                      <validation-provider
                          #default="{ errors }"
                          name="start_amount"
                          rules="required"
                      >
                        <b-form-input
                            id="mobile"
                            v-model="form.start_amount"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Start Amount"
                        />
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
  
            <!-- submit buttons -->
  
            <b-col class="mt-2" cols="12">
              <span class="mr-2">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  :class="{ 'btn-loading': isLoading }" :disabled="isLoading" 
                  @click="formSubmitted()"
                  >
                  <span v-if="isLoading">Loading...</span>
                  <span v-else> Save changes</span>
                  </b-button>
              </span>
                  
                  <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  variant="outline-secondary"
                  type="reset"
                  :class="{ 'btn-loading': isLoading }" :disabled="isLoading" 
                  @click.prevent="resetForm"
                  >
                  Reset
                  </b-button>
            </b-col>
          </b-col>
  
        </b-col>
      </b-row>
    </b-card>
  </template>
  
  <script>
  import 'intl-tel-input/build/css/intlTelInput.css';
  import 'intl-tel-input/build/js/intlTelInput.min.js';
  import vSelect from 'vue-select'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import {ValidationObserver, ValidationProvider} from 'vee-validate'
  
  import {
    BButton,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BInputGroup,
    BInputGroupAppend,
    BLink,
    BOverlay,
    BRow,
    VBTooltip,
    BFormCheckbox,
    BFormFile, BAlert, BCardText, BMedia, BMediaAside, BMediaBody, BImg,
  } from 'bootstrap-vue'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import Ripple from "vue-ripple-directive";
  import order from "@/apis/modules/order";  
  import admin from "@/apis/modules/admin";

  export default {
    components: {
      FormWizard,
      TabContent,
      BFormInvalidFeedback,
      BRow,
      BCol,
      BLink,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
      BFormCheckbox,
      BCard,
      BForm,
      BButton,
      BOverlay,
      ValidationProvider,
      ValidationObserver,
      ToastificationContent,
      BFormFile, 
      BAlert, 
      BCardText, 
      BMedia, 
      BMediaAside, 
      BMediaBody, 
      BImg,
      vSelect,
      VBTooltip
    },
    props: {
      generalData: {
        type: Object,
        default: () => {},
      },
    },
    directives: {
      Ripple,
      'b-tooltip': VBTooltip,
    },
    data() {
      return {
          isLoading: false,
          form: {
            start_amount: '',
        },
        userData: JSON.parse(localStorage.getItem('userData')),
      }
    },
    
    mounted() {
       if(JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin' &&  JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAccountant'){
        this.$router.push('/')
       }
      this.viewData()  
    },
    computed: {
    },
    methods: {
      
  
      async formSubmitted() {
        if( parseInt(this.form.start_amount)  >= 1 ){
          this.todayDate = new Date();
          const year = this.todayDate.getFullYear(); // Get the current year

          const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
          const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
          ];
          const month = monthNames[monthNumber];

          const formattedMonth = year + '-' + month;

          try {
            this.payload = {
              staff_number: this.userData.id,
              start_amount: this.form.start_amount,
              month: formattedMonth,
            }
            this.isLoading = true
            await order.startAmountAdd(this.payload)
           
              this.showSuccessMessage('Payment Add Successfully.')
              this.isLoading = false
              this.$router.push('/')
          } catch (error) {
            this.showErrorMessage('The given credentials are invalid.')
            this.isLoading = false
          }
        }else{
          this.showErrorMessage('The given credentials are invalid.')
          this.isLoading = false
        }
  
      },


      async resetForm() {
        const status = (await admin.getAdminDashboards(JSON.parse(localStorage.getItem('userData')).id))
          this.form.start_amount  = status.data.cashier_payment_start_amount
      },

      async viewData(){

          const status = (await admin.getAdminDashboards(JSON.parse(localStorage.getItem('userData')).id))
          this.form.start_amount  = status.data.cashier_payment_start_amount
          },
    },
  }
  </script>
  
  <style>
  .remove_border .wizard-navigation .wizard-nav {
    border-bottom: none !important;
  }
  
  </style>
  <style lang="scss">
  @import "~@core/scss/vue/pages/page-auth.scss";
  @import '~@core/scss/vue/libs/vue-wizard.scss';
  @import '~@core/scss/vue/libs/vue-select.scss';
  
  .reg_success {
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100vh;
    background-image: url('~@/assets/images/pages/registration/reg_success.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .custom-width {
    width: 320% !important;
  }
  
  </style>
  
  