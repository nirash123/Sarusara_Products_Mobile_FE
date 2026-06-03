<template>
  <b-card>
    <b-row>
      <b-col class="d-flex align-items-center auth-bg reg-right-side">
        <b-col cols="12">
          <validation-observer ref="personalDetails" tag="form">
            <b-form class="auth-login-form " @submit.prevent>
              <b-row class="align-items-center">

                <!-- Avatar -->
                <b-col cols="auto">
                  <b-avatar v-if="form.image" :ref="previewEl" :src="imageUrl + form.image" size="150px" rounded />
                  <b-avatar v-else src="@/assets/images/avatars/avatar.png" size="150px" rounded />
                </b-col>

                <!-- Right Side Content -->
                <b-col>
                  <div class="d-flex flex-column justify-content-center">

                    <!-- Name -->
                    <h3 class="mb-2 text-dark">
                      {{ form.first_name }} {{ form.last_name }}
                    </h3>

                    <!-- Hidden File Input -->
                    <input type="file" ref="fileInput" accept=".png" style="display: none" @change="onFileChange" />

                    <!-- Buttons -->
                    <div class="d-flex gap-2">
                      <b-button variant="primary" :class="{ 'btn-loading': isLoading }" :disabled="isLoading"
                        @click="handleButtonClick">
                        <span v-if="isLoading">Uploading...</span>
                        <span v-else>Update</span>
                      </b-button>
                    </div>

                  </div>
                </b-col>

              </b-row>
              <b-row class="mt-2">
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>User Code</b></h5>
                  <b-form-group label-for="code">
                    <validation-provider #default="{ errors }" name="User Code" rules="required">
                      <b-form-input id="code" v-model="form.user_code" :state="errors.length > 0 ? false : null"
                        placeholder="Enter user code" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorUserCode" class="text-danger">{{ errorUserCode }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>User Name</b></h5>
                  <b-form-group label-for="name">
                    <validation-provider #default="{ errors }" name="User Name" rules="required">
                      <b-form-input id="name" v-model="form.user_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter user name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorUserName" class="text-danger">{{ errorUserName }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>First Name</b></h5>
                  <b-form-group label-for="name">
                    <validation-provider #default="{ errors }" name="First Name" rules="required">
                      <b-form-input id="name" v-model="form.first_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter first name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorFirstName" class="text-danger">{{ errorFirstName }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Last Name</b></h5>
                  <b-form-group label-for="name">
                    <validation-provider #default="{ errors }" name="Last Name" rules="required">
                      <b-form-input id="name" v-model="form.last_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter last name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorLastName" class="text-danger">{{ errorLastName }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Address</b></h5>
                  <b-form-group label-for="address">
                    <validation-provider #default="{ errors }" name="address" rules="required">
                      <b-form-input id="address" v-model="form.address" :state="errors.length > 0 ? false : null"
                        placeholder="Enter Address" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Mobile Number</b></h5>
                  <b-form-group label-for="phone">
                    <validation-provider #default="{ errors }" name="phone" rules="required">
                      <b-form-input id="phone" v-model="form.phone_no" :state="errors.length > 0 ? false : null"
                        placeholder="Enter Mobile Number" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>NIC Number</b></h5>
                  <b-form-group label-for="nic">
                    <validation-provider #default="{ errors }" name="nic" rules="required">
                      <b-form-input id="nic" v-model="form.nic" :state="errors.length > 0 ? false : null"
                        placeholder="Enter NIC Number" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col v-if="$route.params.id != 1" sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Salary Advance</b></h5>
                  <b-form-group label-for="salary_advance">
                    <validation-provider #default="{ errors }" name="salary_advance" rules="required">
                      <b-form-input id="salary_advance" v-model="form.salary_advance" :state="errors.length > 0 ? false : null"
                        placeholder="Enter Salary Advance" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col v-if="$route.params.id != 1" sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>EPF</b></h5>
                  <b-form-group label-for="epf">
                    <validation-provider #default="{ errors }" name="epf" rules="required">
                      <b-form-input id="epf" v-model="form.epf" :state="errors.length > 0 ? false : null"
                        placeholder="Enter EPF" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Date of Birth</b></h5>
                  <b-form-group label-for="dob">
                    <validation-provider #default="{ errors }" name="dob" rules="required">
                      <flat-pickr v-model="form.dob" class="form-control mb-2" :config="{
                        maxDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                      }" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Joined Date</b></h5>
                  <b-form-group label-for="join_date">
                    <validation-provider #default="{ errors }" name="join_date" rules="required">
                      <flat-pickr v-model="form.join_date" class="form-control mb-2" :config="{
                        maxDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                      }" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col v-if="$route.params.id != 1" sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Role</b></h5>
                  <b-form-group label-for="user-roles">
                    <v-select v-model="form.admin_role" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="rolesOptions" :reduce="val => val.value" :clearable="false" input-id="user-roles" />
                  </b-form-group>
                </b-col>
                <b-col v-if="$route.params.id != 1" sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Status</b></h5>
                  <b-form-group label-for="user-status">
                    <v-select v-model="form.active_status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="statusOptions" :reduce="val => val.value" :clearable="false" input-id="user-status" />
                  </b-form-group>
                </b-col>
              </b-row>
              <h4 class="m-1">
                <b><i>Day Shift (For 01 hour)</i></b>
              </h4>
              <b-row>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Day Shift</b></h5>
                  <b-form-group label-for="a_shift">
                    <validation-provider #default="{ errors }" name="a_shift" rules="required">
                      <b-form-input id="a_shift" v-model="form.a_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>OT Shift</b></h5>
                  <b-form-group label-for="b_shift">
                    <validation-provider #default="{ errors }" name="b_shift" rules="required">
                      <b-form-input id="b_shift" v-model="form.b_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Extra Shift</b></h5>
                  <b-form-group label-for="c_shift">
                    <validation-provider #default="{ errors }" name="c_shift" rules="required">
                      <b-form-input id="c_shift" v-model="form.c_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- <h4 class="m-1">
                <b><i>Night Shift (For 01 hour)</i></b>
              </h4> -->
              <!-- <b-row>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Night Shift</b></h5>
                  <b-form-group label-for="na_shift">
                    <validation-provider #default="{ errors }" name="na_shift" rules="required">
                      <b-form-input id="na_shift" v-model="form.na_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>OT Shift</b></h5>
                  <b-form-group label-for="nb_shift">
                    <validation-provider #default="{ errors }" name="nb_shift" rules="required">
                      <b-form-input id="nb_shift" v-model="form.nb_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6" lg="4">
                  <h5 class="text-dark"><b>Extra Shift</b></h5>
                  <b-form-group label-for="nc_shift">
                    <validation-provider #default="{ errors }" name="nc_shift" rules="required">
                      <b-form-input id="nc_shift" v-model="form.nc_shift" :state="errors.length > 0 ? false : null"
                        placeholder="0.00" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row> -->
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
import admin from "@/apis/modules/admin";
import staff from "@/apis/modules/staff";
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
      { label: 'Active Staff Member', value: 1 },
      { label: 'InActive Staff Member', value: 2 },
    ]

    const rolesOptions = [
      { label: 'Manager', value: 'TBSAdmin' },
      { label: 'Accountant', value: 'TBSAccountant' },
      { label: 'Supervisor', value: 'TBSSupervisor' },
      { label: 'Worker', value: 'TBSWorker' },
      { label: 'Driver', value: 'TBSDriver' },
    ]

    return {
      statusOptions,
      rolesOptions,
      previewEl,
    }
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      file: null,
      errorUserName: '',
      errorFirstName: '',
      errorLastName: '',
      preferredCountriesArray: [],
      phoneWidth: '100%',
      isLoading: false,
      user_code: '',
      user_name: '',
      first_name: '',
      last_name: '',
      address: '',
      admin_role: '',
      phone_no: '',
      nic: '',
      salary_advance: '',
      epf: '',
      dob: '',
      join_date: '',
      new_status: 0,
      form: {
        image: '',
        user_code: '',
        user_name: '',
        first_name: '',
        last_name: '',
        address: '',
        phone_no: '',
        admin_role: '',
        active_status: '',
        nic: '',
        salary_advance: '',
        epf: '',
        dob: '',
        join_date: '',
        a_shift: '',
        b_shift: '',
        c_shift: '',
        na_shift: '',
        nb_shift: '',
        nc_shift: '',
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
      if (this.form.admin_role === 'TBSAdmin' || this.form.admin_role === 'TBSAccountant') {
        this.new_status = 1
      } else {
        this.new_status = 0
      }
      this.errorCompanyName = ''
      try {
        this.payload = {
          id: this.userData.id,
          user_code: this.form.user_code,
          user_name: this.form.user_name,
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          address: this.form.address,
          phone_no: this.form.phone_no,
          admin_role: this.form.admin_role,
          nic: this.form.nic,
          salary_advance: this.form.salary_advance,
          epf: this.form.epf,
          dob: this.form.dob,
          join_date: this.form.join_date,
          active_status: this.form.active_status,
          status: this.new_status,
          a_shift: this.form.a_shift,
          b_shift: this.form.b_shift,
          c_shift: this.form.c_shift,
          na_shift: this.form.na_shift,
          nb_shift: this.form.nb_shift,
          nc_shift: this.form.nc_shift,
        }
        this.isLoading = true
        const response = await staff.staffUpdate(this.$route.params.id, this.payload)
        this.showSuccessMessage('Update Staff Member Successfully')
        await this.userDetails();
        this.$router.push('/staffs')
        this.isLoading = false
      } catch (error) {
        this.showErrorMessage('The given credentials are invalid.')
        this.errorUserName = error.response.data.data.user_name ? error.response.data.data.user_name[0] : ''
        this.errorFirstName = error.response.data.data.first_name ? error.response.data.data.first_name[0] : ''
        this.errorLastName = error.response.data.data.last_name ? error.response.data.data.last_name[0] : ''
        this.isLoading = false
      }

    },

    async userDetails() {
      try {
        const response = await staff.getStaffDetails(this.$route.params.id)
        this.form.user_code = response.data.user_code
        this.form.user_name = response.data.user_name
        this.form.first_name = response.data.first_name
        this.form.last_name = response.data.last_name
        this.form.address = response.data.address
        this.form.phone_no = response.data.phone_no
        this.form.nic = response.data.nic
        this.form.salary_advance = response.data.salary_advance
        this.form.epf = response.data.epf
        this.form.dob = response.data.dob
        this.form.join_date = response.data.join_date
        this.form.admin_role = response.data.admin_role
        this.form.active_status = response.data.active_status
        this.form.image = response.data.image
        this.form.a_shift = response.data.a_shift
        this.form.b_shift = response.data.b_shift
        this.form.c_shift = response.data.c_shift
        this.form.na_shift = response.data.na_shift
        this.form.nb_shift = response.data.nb_shift
        this.form.nc_shift = response.data.nc_shift
      } catch (error) {
        this.showErrorMessage('Staff Member not found.')
      }
    },



    onFileChange(event) {
      this.file = event.target.files[0]

      if (this.file) {
        this.uploadImages()
      }
    },

    async uploadImages() {
      try {
        const formData = new FormData();
        formData.append('image1', this.file);
        formData.append('si_id', this.$route.params.id);

        this.isLoading = true;
        const response = await admin.uploadImage(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.showSuccessMessage('Image uploaded successfully');
        this.isLoading = false;
        await this.userDetails();
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

@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>