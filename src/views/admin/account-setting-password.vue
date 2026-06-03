<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- old password -->
        <b-col md="6">
          <b-form-group
            label="Old Password"
            label-for="account-old-password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-old-password"
                v-model="old_password"
                name="old-password"
                :type="passwordFieldTypeOld"
                placeholder="Old Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconOld"
                  class="cursor-pointer"
                  @click="togglePasswordOld"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ old password -->
      </b-row>
      <b-row>
        <!-- new password -->
        <b-col md="6">
          <b-form-group
            label-for="account-new-password"
            label="New Password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-new-password"
                v-model="new_password"
                :type="passwordFieldTypeNew"
                name="new-password"
                placeholder="New Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconNew"
                  class="cursor-pointer"
                  @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <b-form-group
            label-for="account-retype-new-password"
            label="Retype New Password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-retype-new-password"
                v-model="retype_password"
                :type="passwordFieldTypeRetype"
                name="retype-password"
                placeholder="New Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconRetype"
                  class="cursor-pointer"
                  @click="togglePasswordRetype"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ retype password -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="passwordChange()"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
          >
            Reset
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import profile from "@/apis/modules/profile";

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      error: null,
      old_password: '',
      new_password: '',
      retype_password: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },

    async passwordChange(){
        try {
          this.payload = {
            phone_no: this.userData.phone_no,
            password: this.old_password,
            new_password:this.new_password,
            retype_password: this.retype_password,
          }
          await profile.adminPasswordChange(this.payload)
         
            this.showSuccessMessage('Update Account Settings Successfully')
            window.location = '/tbsnew' // /TBS/admin
          this.isLoading = false

        } catch (error) {
          this.showErrorMessage('The given credentials are invalid.')
          this.isLoading = false
        }

    },
  },
}
</script>
