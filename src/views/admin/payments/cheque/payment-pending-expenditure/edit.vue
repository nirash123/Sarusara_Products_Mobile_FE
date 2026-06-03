
<template>
    <b-card>
      <!-- media -->
      <b-media no-body>
        <b-button
            @click="$router.push('/admin-cheque?tab=5')"
            v-ripple.400="'rgba(40, 199, 111, 0.15)'"
            variant='light-dark'
            class="btn-icon mb-5 mr-2"
          >
          <feather-icon
                      size="80"
                      icon='ChevronsLeftIcon'
                    />
      </b-button>
      </b-media>
  
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
                    <b-col sm="12" md="12" lg="6" >
                    <b-form-group
                        label="Cheque Number"
                        label-for="item_code"
                    >
                      <validation-provider
                          #default="{ errors }"
                          name="Item Code"
                          rules="required"
                      >
                        <b-form-input
                            id="item_code"
                            v-model="form.cheque_number"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Enter cheque number"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                        <small v-if="errorItem" class="text-danger">{{  errorItem }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12" lg="6">
                    <b-form-group
                        label="Due Date"
                        label-for="item_code"
                    >
                          <b-form-datepicker
                                      id="example-datepicker"
                                      v-model="form.due_date"
                                      placeholder="YYYY-MM-DD"
                                      class="mb-1"
                                    />
                        </b-form-group>
                      </b-col>
                  <b-col sm="12" md="12" lg="6" >
                    <b-form-group
                      label="Bank Name"
                      label-for="group-input"
                      invalid-feedback="Bank name is required">
                    <v-select
                      id="group-input"
                      v-model="form.bank"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="bank_name"
                      :options="groups"
                      class="custom-v-select"
                      required
                    />
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
                  @click.prevent="userDetails"
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
    BFormDatepicker,
  } from 'bootstrap-vue'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import Ripple from "vue-ripple-directive";
  import bank from "@/apis/modules/bank";
  import payment from "@/apis/modules/payment";
  
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
      BFormDatepicker,
      VBTooltip
    },
    props: {
      generalData: {
        type: Object,
        default: () => {},
      },
    },
    setup() {
  },
    directives: {
      Ripple,
      'b-tooltip': VBTooltip,
    },
    data() {
      return {
          file: null,
          errorItem: '',
          groups: [],
          old_bank: '',
          isLoading: false,
          form: {
            cheque_number: '',
            bank: '',
            due_date: '',
        },
        avatar: require('@/assets/images/avatars/avatar.png'),
        userData: JSON.parse(localStorage.getItem('userData')),
      }
    },
  
    mounted() {
      if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' ){
          this.groupData()
          this.userDetails()
       }
       else{
        this.$router.push('/')
       }
       
    },
    computed: {
    },
    methods: {
      async groupData(){
        try {
          const response = await bank.bankData()
          this.groups = response.data.data
        
          } catch (error) {
            
          }
      },

  
      async formSubmitted() {
        this.errorItem = ''
              
            try {
            this.payload = {
              cheque_number: this.form.cheque_number,
              bank: this.form.bank.id,
              due_date: this.form.due_date,
            }
          
            this.isLoading = true
            const response = await payment.chequeUpdate(this.$route.params.id,this.payload)
            this.showSuccessMessage('Update Cheque Successfully')
            this.$router.push('/admin-cheque?tab=5')
            this.isLoading = false
          } catch (error) {
            this.errorItem = error.response.data.data.cheque_number? error.response.data.data.cheque_number[0]:''
            error.response.data.data.bank? this.showErrorMessage('The Bank name is required.'):''
            this.isLoading = false
          }
  
          
  
      },
      
      async userDetails(){
        try {
          const response = await payment.chequeDetails(this.$route.params.id)
          this.form.cheque_number= response.data.cheque_number
          this.form.due_date= response.data.due_date
  
          this.bank(response.data.bank)
          } catch (error) {
          } 
      },
  
          
      async bank($id){
          try {
            const response = await bank.getBankDetails($id)
            this.form.bank = response.data
            } catch (error) {
            } 
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
  