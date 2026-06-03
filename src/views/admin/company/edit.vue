<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-button @click="$router.push('/companies')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-dark'
        class="btn-icon mb-5 mr-2">
        <feather-icon size="80" icon='ChevronsLeftIcon' />
      </b-button>
    </b-media>

    <b-row>
      <b-col class="d-flex align-items-center auth-bg reg-right-side">
        <b-col cols="12">
          <validation-observer ref="personalDetails" tag="form">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <b-row>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="User Name" label-for="name">
                    <validation-provider #default="{ errors }" name="User Name" rules="required">
                      <b-form-input id="name" v-model="form.company_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter company name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorUserName" class="text-danger">{{ errorUserName }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Address" label-for="address">
                    <validation-provider #default="{ errors }" name="address" rules="required">
                      <b-form-input id="address" v-model="form.address" :state="errors.length > 0 ? false : null"
                        placeholder="Enter Address" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Mobile Number" label-for="phone">
                    <validation-provider #default="{ errors }" name="phone" rules="required">
                      <b-form-input id="phone" v-model="form.phone_no" :state="errors.length > 0 ? false : null"
                        placeholder="Enter Mobile Number" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorPhoneNo" class="text-danger">{{ errorPhoneNo }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col v-if="userData.id == 1 || userData.id == 2" sm="12" md="12" lg="6">
                  <b-form-group label="Status" label-for="user-status">
                    <v-select v-model="form.active_status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusOptions" :reduce="val => val.value" :clearable="false" input-id="user-status" />
                  </b-form-group>
                </b-col>



              </b-row>
            </b-form>
          </validation-observer>

          <!-- submit buttons -->

          <b-col class="mt-2" cols="12">
            <span class="mr-2">
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
                :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="formSubmitted()">
                <span v-if="isLoading">Loading...</span>
                <span v-else> Save changes</span>
              </b-button>
            </span>

            <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" type="reset"
              :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click.prevent="userDetails">
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
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

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
      default: () => { },
    },
  },
  setup() {

    const statusOptions = [
      { label: 'Active Company', value: 1 },
      { label: 'InActive Company', value: 2 },
    ]



    return {
      statusOptions,
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
      groups: '',
      isLoading: false,
      form: {
        company_name: '',
        address: '',
        phone_no: '',
        active_status: '',
      },
      avatar: require('@/assets/images/avatars/avatar.png'),
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },

  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
      this.userDetails()
    }
    else {
      this.$router.push('/')
    }

  },
  computed: {
  },
  methods: {


    async formSubmitted() {
      this.errorUserCode = ''
      this.errorUserName = ''
      this.errorPhoneNo = ''
      this.errorPhone = ''
      try {
        this.payload = {
          company_name: this.form.company_name,
          address: this.form.address,
          phone_no: this.form.phone_no,
          active_status: this.form.active_status,
        }
        this.isLoading = true
        await admin.companyUpdate(this.$route.params.id, this.payload)
        this.showSuccessMessage('Update Company Successfully')
        this.$router.push('/companies')
        this.isLoading = false
      } catch (error) {
        this.errorUserName = error.response.data.data.company_name ? error.response.data.data.company_name[0] : ''
        this.errorPhoneNo = error.response.data.data.phone_no ? error.response.data.data.phone_no[0] : ''
        this.isLoading = false
      }


    },

    async userDetails() {
      try {
        const response = await admin.getCompanyDetails(this.$route.params.id)

        this.form.company_name = response.data.company_name
        this.form.address = response.data.address
        this.form.phone_no = response.data.phone_no
        this.form.active_status = response.data.active_status
      } catch (error) {
        this.showErrorMessage('Company not found.')
      }
    },


    async category($id) {
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
