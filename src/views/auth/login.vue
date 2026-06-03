<template>
  <div class="auth-wrapper auth-v1 bColor">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <b-img
          src="@/assets/images/logo/login.png"
          width="120"
          height="100"
          alt="Login"
        />
        </b-link>

        <b-col class="px-xl-1 mx-auto">
          <h1 class="d-flex justify-content-center" style="font-weight: 900;">
            Welcome Back !
          </h1>
          <!-- <h3 class="mb-1 d-flex justify-content-center" style="font-weight: 900;">
            T B S Sarusara Products
          </h3> -->
          <b-card-text class="mb-2 mt-2">
            Please login to your account.
          </b-card-text>

          <b-alert v-if="msg" variant="primary" show>
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"><span class="font-weight-bold">{{ msg }}</span></small>
              </p>
            </div>
          </b-alert>
          <b-alert v-if="errorMsg" variant="danger" show>
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"><span class="font-weight-bold">{{ errorMsg }}</span></small>
              </p>
            </div>
          </b-alert>
          <!-- form -->
          <validation-observer ref="loginForm">
            <b-form class="auth-login-form mt-2" @submit.prevent="adminLogin">
              <b-form-group label="User Name" label-for="group-input" invalid-feedback="User Name is required">
                <v-select id="group-input" v-model="form.user_name" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="user_name" :options="groups" class="custom-v-select" required />
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <!-- <small>
                        <b-button variant="link" @click="$router.push('/forgot-password')"> <small>Forgot Password?</small></b-button>
                      </small> -->
                </div>
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input id="login-password" v-model="form.password" :state="errors.length > 0 ? false : null"
                      class="form-control-merge" :type="passwordFieldType" name="login-password"
                      placeholder="Enter Password" />
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- submit buttons -->
              <div class="brand-logo">
                <b-button :class="{ 'btn-loading': isLoading }" :disabled="isLoading" type="submit" variant="primary"
                  block>
                  <span v-if="isLoading">Loading...</span>
                  <span v-else> Login</span>
                </b-button>
              </div>
            </b-form>
            <h5 class="d-flex justify-content-center"> <i><b> Software By @ Easyones Soft </b> </i> </h5>
            <h5 class="d-flex justify-content-center"> <i><b> 076 283 38 38 </b></i> </h5>
          </validation-observer>
        </b-col>
      </b-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BImg,
  BButton,
  BAlert,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BFormCheckbox,
  BInputGroupAppend,
  BLink,
  BOverlay,
  BRow,
  BCard,
  BCardTitle,
  BCardText,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { mapActions } from 'vuex'
import { required } from '@validations'
import Cleave from 'vue-cleave-component'
import admin from "@/apis/modules/admin";
import 'cleave.js/dist/addons/cleave-phone.us'

export default {
  name: 'auth-phone',
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCard,
    BFormCheckbox,
    BImg,
    BForm,
    BButton,
    BOverlay,
    BAlert,
    ValidationProvider,
    ValidationObserver,
    BCardTitle,
    Cleave,
    vSelect,
    BCardText,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      groups: [],
      isLoading: false,
      msg: '',
      errorMsg: '',
      status: '',
      form: {
        user_name: '',
        password: '',
      },
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      loading: false,
      required,
    }
  },

  mounted() {

    this.posDataDelete()
    this.userNameData()
  },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },

  methods: {
    ...mapActions(['login', 'logout']),

    async posDataDelete() {
      try {
        await admin.deleteLogins()
      } catch (error) {
        this.tableLoading = false;
      }
    },

    async userNameData() {
      try {
        const response = await admin.loginUserData()
        this.groups = response.data.data

      } catch (error) {
        this.showErrorMessage('Please run server first.')
      }
    },

    async adminLogin() {
      this.msg = ''
      this.errorMsg = ''
      this.loading = true
      try {
        this.form = {
          user_name: this.form.user_name.user_name,
          password: this.form.password,
        }
        this.isLoading = true
        await this.login(this.form)
        this.isLoading = false
      } catch (error) {
        this.errorMsg = error.response.data.message
        this.isLoading = false
      }
    },

  },
}
</script>

<style lang="scss">
.bColor {
  position: relative;
  background-image: url("~@/assets/images/logo/log.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}


.password {
  text-align: right;
}

@import "~@core/scss/vue/pages/page-auth.scss";
</style>
