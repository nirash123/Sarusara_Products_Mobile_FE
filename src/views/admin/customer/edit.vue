
<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-button
          @click="$router.push('/suppliers')"
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
                 <b-col v-if="userData.id == 1 || userData.id == 2"  sm="12" md="12" lg="6" >
                    <b-form-group
                        label="User Code"
                        label-for="code"
                    >
                      <validation-provider
                          #default="{ errors }"
                          name="User Code"
                          rules="required"
                      >
                        <b-form-input
                            id="code"
                            v-model="form.user_code"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Enter supplier code"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                        <small v-if="errorUserCode" class="text-danger">{{  errorUserCode }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12" lg="6" >
                    <b-form-group
                        label="User Name"
                        label-for="name"
                    >
                      <validation-provider
                          #default="{ errors }"
                          name="User Name"
                          rules="required"
                      >
                        <b-form-input
                            id="name"
                            v-model="form.user_name"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Enter supplier name"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                        <small v-if="errorUserName" class="text-danger">{{  errorUserName }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12" lg="6">
                    <b-form-group
                        label="Address"
                        label-for="address"
                    >
                      <validation-provider
                          #default="{ errors }"
                          name="address"
                          rules="required"
                      >
                        <b-form-input
                            id="address"
                            v-model="form.address"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Enter Address"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12" lg="6">
                  <b-form-group
                      label="Mobile Number"
                      label-for="phone"
                  >
                    <validation-provider
                        #default="{ errors }"
                        name="phone"
                        rules="required"
                    >
                      <b-form-input
                          id="phone"
                          v-model="form.phone_no"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Enter Mobile Number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorPhoneNo" class="text-danger">{{  errorPhoneNo }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col v-if="userData.id == 1 || userData.id == 2" sm="12" md="12" lg="6">
                  <b-form-group
                      label="Status"
                      label-for="user-status"
                    >
                      <v-select
                        v-model="form.active_status"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="statusOptions"
                        :reduce="val => val.value"
                        :clearable="false"
                        input-id="user-status"
                      />
                    </b-form-group>
                </b-col>
                <b-col v-if="userData.id == 1 || userData.id == 2"  sm="12" md="12" lg="6" >
                  <b-form-group
                    label="Level"
                    label-for="group-input"
                    invalid-feedback="Level is required">
                  <v-select
                    id="group-input"
                    v-model="form.level"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="val => val.value"
                    :options="levelsOptions"
                    class="custom-v-select"
                    required
                  />
                </b-form-group>
                </b-col>
            
      

                <!-- <b-col sm="12" md="12" lg="6" >
                      <b-form-group
                        label="Image"
                        label-for="name"
                    >
                        <b-form-file
                          v-model="file"
                          accept=".png"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                          @change="onFileChange"
                        />
                       </b-form-group>
                       <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        :class="{ 'btn-loading': isLoading }" :disabled="isLoading" 
                        @click="uploadImages"
                        >
                        <span v-if="isLoading">Loading...</span>
                        <span v-else> Upload Image</span>
                        </b-button>
                  </b-col> -->
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
import intlTelInput from 'intl-tel-input';
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
import admin from "@/apis/modules/admin";
import product from "@/apis/modules/product";

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
  setup() {
  
  const statusOptions = [
    { label: 'Active Customer', value: 1 },
    { label: 'InActive Customer', value: 2 },
  ]

  const levelsOptions = [
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2},
    { label: 'Level 3', value: 3},
    { label: 'Level 4', value: 4 },
    { label: 'Level 5', value: 5 },
  ]


  return {
    statusOptions,
    levelsOptions,
  }
},
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
        file: null,
        errorUserCode: '',
        errorUserName: '',
        errorPhoneNo: '',
        errorPhone: '',
        groups:'',
        isLoading: false,
        form: {
          user_code: '',
          user_name: '',
          address: '',
          phone_no: '',
          identity_code: '',
          level: '',
          active_status: '',
      },
      avatar: require('@/assets/images/avatars/avatar.png'),
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },

  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
    this.userDetails()
     }
     else{
      this.$router.push('/')
     }
     
  },
  computed: {
  },
  methods: {


    async formSubmitted() {
      this.errorUserCode = ''
      this.errorUserName = ''
      this.errorPhoneNo= ''
      this.errorPhone= ''
          try {
          this.payload = {
            user_code: this.form.user_code,
            user_name: this.form.user_name,
            address: this.form.address,
            phone_no: this.form.phone_no,
            identity_code: this.form.identity_code,
            level: this.form.level,
            active_status: this.form.active_status,
          }
          this.isLoading = true
          await admin.supplierUpdate(this.$route.params.id,this.payload)
          this.showSuccessMessage('Update Customer Successfully')
          this.$router.push('/suppliers')
          this.isLoading = false
        } catch (error) {
          this.errorUserCode = error.response.data.data.user_code? error.response.data.data.user_code[0]:''
          this.errorUserName = error.response.data.data.user_name? error.response.data.data.user_name[0]:''
          this.errorPhoneNo = error.response.data.data.phone_no? error.response.data.data.phone_no[0]:''
          this.errorID = error.response.data.data.identity_code? error.response.data.data.identity_code[0]:''
          this.isLoading = false
        }
        

    },
    
    async userDetails(){
        try {
          const response = await admin.getCustomerDetails(this.$route.params.id)
  
          this.form.user_code= response.data.user_code
          this.form.user_name= response.data.user_name
          this.form.address= response.data.address
          this.form.phone_no= response.data.phone_no
          this.form.active_status= response.data.active_status
          this.form.level= response.data.level
          this.form.identity_code= response.data.identity_code
          } catch (error) {
            this.showErrorMessage('Customer not found.')
          } 
      },

        
    async category($id){
        try {
          const response = await product.shopCategoryDetails($id)
          this.form.category = response.data
          } catch (error) {
            this.showErrorMessage('Category not found.')
          } 
      },
    
      onFileChange(event) {
       this.file = event.target.files[0];
     },


      async uploadImages() {
      try {
        const formData = new FormData();
        formData.append('image1', this.file);
        formData.append('si_id', this.$route.params.id);

        this.isLoading = true;
        await admin.uploadCustomerImage(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.showSuccessMessage('Image uploaded successfully');
        this.isLoading = false;
      } catch (error) {
        this.showErrorMessage('Error uploading Image');
        this.isLoading = false;
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
