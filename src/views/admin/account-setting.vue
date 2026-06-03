<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-media-aside class="ml-2">
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            :src="avatar"
            height="150"
          />
        </b-link>
      </b-media-aside>
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
                <b-col v-if="admin_role == 'TBSAdmin'" sm="12" md="12" lg="6" >
                  <b-form-group
                      label="User Name"
                      label-for="name"
                  >
                    <validation-provider
                        #default="{ errors }"
                        name="User Name"
                        rules="required|name_length"
                    >
                      <b-form-input
                          id="name"
                          v-model="form.user_name"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Enter User Name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col v-if="admin_role == 'TBSAdmin'" sm="12" md="12" lg="6">
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
                        name="mobile number"
                        rules="required"
                    >
                      <b-form-input
                          id="mobile"
                          v-model="form.phone_no"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Enter Mobile Number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- <b-col sm="12" md="12" lg="6">
                  <b-form-group
                      label="E-mail"
                      label-for="email"
                  >
                    <validation-provider
                        #default="{ errors }"
                        name="email"
                        rules="required|email"
                    >
                      <b-form-input
                          id="email"
                          v-model="form.email"
                          :state="errors.length > 0 ? false:null"
                          placeholder="mymail@example.com"
                          type="email"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small class="text-danger" v-if="errorEmail">{{ errorEmail }}</small>
                    </validation-provider>
                    
                  </b-form-group>
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
import profile from "@/apis/modules/profile";

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
        preferredCountriesArray: [],
        phoneWidth: '100%',
        isLoading: false,
        form:{phone_no: ''},
        errorEmail:'',
        errorPhone:'',
        user_name:'',
        address:'',
        phone_no:'',
        email:'',
        admin_role: '',
        form: {
        user_name: '',
        address: '',
        phone_no: '',
        email: '',
      },
      changeImageButton: true,
      removeImageButton: false,
      uploadImage: [],
      profileFile: null,
      avatar: require('@/assets/images/avatars/avatar.png'),
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
      this.phone_no = this.form.phone_no;
        this.errorEmail= ''
        this.errorPhone= ''
        try {
          this.payload = {
            id: this.userData.id,
            user_name: this.form.user_name,
            address: this.form.address,
            phone_no: this.phone_no,
            email: "",
          }
          this.isLoading = true
          const response = await profile.currentUserUpdate(this.userData.id,this.payload)
         
            this.showSuccessMessage('Update Account Settings Successfully')
            const cacheUserData = (await profile.getNewCurrentUser(this.payload)).data.data
            localStorage.setItem('userData', JSON.stringify(cacheUserData))
            window.location = '/tbsnew' // /TBS/admin
          this.isLoading = false

        } catch (error) {
          this.showErrorMessage('The given credentials are invalid.')
          this.errorEmail = error.response.data.data.email? error.response.data.data.email[0]:''
          this.errorPhone = error.response.data.data.phone_no? error.response.data.data.phone_no[0]:''
          this.isLoading = false
        }

    },
    resetForm() {
      this.form.user_name= this.userData.user_name,
      this.form.address= this.userData.address,
      this.form.phone_no= this.userData.phone_no,
      this.form.email= this.userData.email  
    },
    
    
    async viewData(){
     (await profile.getCurrentUser(this.userData)).data.data
      this.form.user_name= this.userData.user_name,
      this.form.address= this.userData.address,
      this.form.phone_no= this.userData.phone_no,
      this.form.email= this.userData.email
      this.admin_role= this.userData.admin_role
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

