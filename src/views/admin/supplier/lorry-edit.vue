<template>
  <b-card>
    <b-row>
      <b-col class="d-flex align-items-center auth-bg reg-right-side">
        <b-col cols="12">
          <validation-observer ref="personalDetails" tag="form">
            <b-form class="auth-login-form " @submit.prevent>
              <b-row class="mt-2">
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Lorry Number</b></h5>
                  <b-form-group label-for="name">
                    <validation-provider #default="{ errors }" name="Lorry Number" rules="required">
                      <b-form-input id="name" v-model="form.lorry_number" :state="errors.length > 0 ? false : null"
                        placeholder="Enter user name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorLorryNumber" class="text-danger">{{ errorLorryNumber }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Active Status</b></h5>
                  <b-form-group label-for="user-status">
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
  BAvatar,
  BRow,
  VBTooltip,
  BFormCheckbox,
  BFormFile, BAlert, BCardText, BMedia, BMediaAside, BMediaBody, BImg,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Ripple from "vue-ripple-directive";
import driver from "@/apis/modules//driver";
import flatPickr from 'vue-flatpickr-component'
import { ref } from '@vue/composition-api'

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
    BAvatar,
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
    VBTooltip,
    flatPickr
  },
  props: {
    generalData: {
      type: Object,
      default: () => { },
    },
  },
  setup() {
    const previewEl = ref(null)

    const statusOptions = [
      { label: 'Active', value: 1 },
      { label: 'InActive ', value: 2 },
    ]


    return {
      statusOptions,
      previewEl,
    }
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      file: null,
      errorLorryNumber: '',
      errorFirstName: '',
      errorLastName: '',
      preferredCountriesArray: [],
      phoneWidth: '100%',
      isLoading: false,
      lorry_code: '',
      lorry_number: '',
      first_name: '',
      last_name: '',
      address: '',
      status: '',
      phone_no: '',
      new_status: 0,
      form: {
        lorry_number: '',
        active_status: '',
      },
      avatar: require('@/assets/images/avatars/avatar.png'),
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setPhoneWidth);
  },
  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    }
    this.userDetails()
  },
  computed: {
  },
  methods: {
    handleButtonClick() {
      // Open file picker
      this.$refs.fileInput.click()
    },

    async formSubmitted() {
      this.phone_no = this.form.phone_no;
      if (this.form.status === 'TBSAdmin' || this.form.status === 'TBSAccountant') {
        this.new_status = 1
      } else {
        this.new_status = 0
      }
      this.errorCompanyName = ''
      try {
        this.payload = {
          id: this.userData.id,
          lorry_number: this.form.lorry_number,
          active_status: this.form.active_status,
        }
        this.isLoading = true
        const response = await driver.lorryUpdate(this.$route.params.id, this.payload)
        this.showSuccessMessage('Update Lorry Successfully')
        await this.userDetails();
        this.$router.push('/suppliers')
        this.isLoading = false
      } catch (error) {
        this.showErrorMessage('The given credentials are invalid.')
        this.errorLorryNumber = error.response.data.data.lorry_number ? error.response.data.data.lorry_number[0] : ''
        this.isLoading = false
      }

    },

    async userDetails() {
      try {
        const response = await driver.getLorryDetails(this.$route.params.id)
        this.form.lorry_code = response.data.lorry_code
        this.form.lorry_number = response.data.lorry_number
        this.form.first_name = response.data.first_name
        this.form.last_name = response.data.last_name
        this.form.address = response.data.address
        this.form.phone_no = response.data.phone_no
        this.form.status = response.data.status
        this.form.active_status = response.data.active_status
      } catch (error) {
        this.showErrorMessage('Lorry not found.')
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

@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>