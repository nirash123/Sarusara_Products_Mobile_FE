<template>
  <div class="auth-wrapper auth-v1 px-2 bColor">
  <div class="auth-inner py-1">
    <b-card class="mb-0">
    <b-row class="auth-inner m-0">

        <b-col
            class="px-lg-0 px-xl-0 mx-auto right-col"
            cols="12">

            <!-- <h2 class="txt-black">Forgot Password!</h2> -->
  
          <validation-observer
              ref="personalDetails"
              tag="form"
          >
            <b-form
                class="auth-login-form mt-1"
                @submit.prevent
            >
              <b-row>
                <b-col cols="12">
                  <b-form-group
                      label="Email"
                      label-for="email1"
                  >
                    <validation-provider
                        #default="{ errors }"
                        name="email"
                        rules="required|email"
                    >
                      <b-form-input
                          size="lg"
                          id="email1"
                          v-model="form.email"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Enter Email"
                          type="email"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <label>Verification Code
                  </label>
                  <validation-provider
                      #default="{ errors }"
                      name="Verification Code"
                      rules="required"
                      vid="code"
                  >
                    <b-input-group
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        class="input-group-merge"
                    >
                      <b-form-input
                          size="lg"
                          id="code"
                          v-model="form.otp"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Enter Verification Code"
                      />
                      <b-input-group-append is-text>
                          <b-button :disabled="loading" size="sm" variant="primary" type="submit" @click="otp()"
                                  > {{ 'OTP' }}
                                  </b-button>
                      </b-input-group-append>

                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col cols="12" class="mt-1">
                  <label>New Password
                  </label>
                  <validation-provider
                      #default="{ errors }"
                      name="Password"
                      rules="required"
                      vid="Password"
                  >
                    <b-input-group
                        :class="errors.length > 0 ? 'is-invalid' : null"
                        class="input-group-merge"
                    >
                      <b-form-input
                          size="lg"
                          id="password"
                          v-model="form.login_password"
                          :state="errors.length > 0 ? false:null"
                          :type="passwordFieldType"
                          placeholder="Enter Password"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer"
                            @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>

                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
          <b-overlay

              :opacity="0.5"
              :show="loading"
              rounded="sm"
          >
            <b-button :disabled="loading" block class="bg-black mt-2" variant="primary" type="submit" @click="resetPassword()"
            > {{ 'Continue' }}
            </b-button>
          </b-overlay>
        </b-col>
    </b-row>
    <div class="d-flex justify-content-center mt-2 text-white">
    <p>
            <b-button class="pl-0" variant="link" @click="$router.push('/')"> Login Page</b-button>
          </p>
        </div>
    </b-card>
    
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {FormWizard, TabContent} from 'vue-form-wizard'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import profile from "@/apis/modules/profile";
import {mapActions, mapGetters} from 'vuex'

import {
  BButton,
  BCol,
  BImg,
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
  BFormCheckbox
} from 'bootstrap-vue'
import {togglePasswordVisibility} from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Ripple from "vue-ripple-directive";

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
    BImg,
    BForm,
    BButton,
    BOverlay,
    BCard,
    ValidationProvider,
    ValidationObserver,
    ToastificationContent,
    vSelect,
    VBTooltip
  },
  mixins: [togglePasswordVisibility],
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      is_submitted: '',
      payload: {},
      form:{
        email:'',
        otp:'',
        login_password:'',
      },
      loading: false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
      ...mapActions(['login', 'logout']),
    async resetPassword() {
        this.loading = true
        try {
          this.payload = {
            email: this.form.email,
            otp: this.form.otp,
            login_password: this.form.login_password,
          }
          await profile.customerResetPassword(this.payload)
         
            this.showSuccessMessage('Reset Password Successfully')
            window.location = '/TBS' // /TBS/admin
          this.isLoading = false

        } catch (error) {
          this.showErrorMessage(error.response.data.message)
          this.loading = false
        }
      this.loading = false
  },

  async otp(){
    try {
          this.payload = {
            email: this.form.email,
          }
          await profile.customerOtp(this.payload)
         
            this.showSuccessMessage('Verification Code send successfully, Please check your email')
          this.isLoading = false

        } catch (error) {
          this.showErrorMessage('Email is Invalid.')  
          this.loading = false
        }
  }
}
}
</script>

<style>
.bColor {
background-color: rgb(1, 50, 65);
}
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

