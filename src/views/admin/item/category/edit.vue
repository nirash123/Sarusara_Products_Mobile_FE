<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-button @click="$router.push('/shop-categories')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-dark'
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
                  <b-form-group label="Category Name" label-for="name">
                    <validation-provider #default="{ errors }" name="Category Name" rules="required">
                      <b-form-input id="name" v-model="form.category_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter category name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- <b-row>
                  <b-col sm="12" md="12" lg="6">
                      <div
                          class="d-flex justify-content-between align-items-center mt-2"
                        >
                          <span class="font-weight-bold">Sale Limit</span>
                          <b-form-checkbox
                            v-model="form.max_sale_limit"
                            checked="false"
                            name="sale_limit"
                            class="mr-0"
                            switch
                            inline
                          />
                        </div>
                      </b-col>
                      <b-col v-if="form.max_sale_limit === true" class="mt-1" sm="12" md="12" lg="6">
                        <b-form-group
                            label-for="max_quentity"
                            invalid-feedback="Quantity is required"
                        >
                            <b-form-input
                                id="a_sale_price"
                                v-model="form.max_quentity"
                                placeholder="Enter sale limit"
                            />
                       </b-form-group>
                      </b-col>
                      </b-row> -->
              <!-- <b-row>
                      <b-col sm="12" md="12" lg="6" >
                  <div
                          class="d-flex justify-content-between align-items-center mt-2"
                        >
                          <span class="font-weight-bold">Product Discount</span>
                          <b-form-checkbox
                            v-model="form.discount_limit"
                            checked="false"
                            name="product_discount"
                            class="mr-0"
                            switch
                            inline
                          />
                        </div>
                </b-col>
                <b-col cols="12">
                  <b-row class="mt-1" v-if="form.discount_limit === true">
                    <b-col sm="6" md="6" lg="6">
                      <b-form-group
                      label="Quantity"
                      label-for="a_quentity"
                      invalid-feedback="Quantity is required"
                  >
                      <b-form-input
                          id="a_quentity"
                          v-model="form.a_quentity"
                          placeholder="Enter quentity"
                      />
                  </b-form-group>
                      </b-col>
                  </b-row>
                  <b-row  v-if="form.discount_limit === true">
                    <b-col sm="6" md="6" lg="6">
                      <b-form-group
                      label="Quantity"
                      label-for="b_quentity"
                      invalid-feedback="Quantity is required"
                  >
                      <b-form-input
                          id="b_quentity"
                          v-model="form.b_quentity"
                          placeholder="Enter quentity"
                      />
                  </b-form-group>
                      </b-col>
                  </b-row>
                  <b-row v-if="form.discount_limit === true">
                    <b-col sm="6" md="6" lg="6">
                      <b-form-group
                      label="Quantity"
                      label-for="c_quentity"
                      invalid-feedback="Quantity is required"
                  >
                      <b-form-input
                          id="a_quentity"
                          v-model="form.c_quentity"
                          placeholder="Enter quentity"
                      />
                  </b-form-group>
                      </b-col>
                  </b-row>
                  <b-row  v-if="form.discount_limit === true">
                    <b-col sm="6" md="6" lg="6">
                      <b-form-group
                      label="Quantity"
                      label-for="d_quentity"
                      invalid-feedback="Quantity is required"
                  >
                      <b-form-input
                          id="d_quentity"
                          v-model="form.d_quentity"
                          placeholder="Enter quentity"
                      />
                  </b-form-group>
                      </b-col>
                  </b-row>
              
                  </b-col>
                </b-row> -->
            </b-form>
          </validation-observer>

          <!-- submit buttons -->

          <b-col cols="12" class="mt-2 d-flex justify-content-end gap-2">

            <!-- Save Button -->
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="modern-btn"
              :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="formSubmitted">
              <span v-if="isLoading">Loading...</span>
              <span v-else>Save changes</span>
            </b-button>

            <!-- Reset Button -->
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="modern-reset-btn ml-1"
              :disabled="isLoading" @click.prevent="userDetails">
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
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      isLoading: false,
      form: {
        category_name: '',
        discount_limit: false,
        max_sale_limit: false,

        max_quentity: '',
        a_quentity: '',
        b_quentity: '',
        c_quentity: '',
        d_quentity: '',
      },
      avatar: require('@/assets/images/avatars/avatar.png'),
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },

  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin') {
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
      try {
        this.payload = {
          id: this.userData.id,
          category_name: this.form.category_name,
          discount_limit: this.form.discount_limit,
          max_sale_limit: this.form.max_sale_limit,
          max_quentity: this.form.max_quentity,
          a_quentity: this.form.a_quentity,
          b_quentity: this.form.b_quentity,
          c_quentity: this.form.c_quentity,
          d_quentity: this.form.d_quentity,
        }
        this.isLoading = true
        const response = await product.shopCategoryUpdate(this.$route.params.id, this.payload)
        this.showSuccessMessage('Update Category Successfully')
        this.$router.push('/shop-categories')
        this.isLoading = false
      } catch (error) {
        this.showErrorMessage('The given credentials are invalid.')
        this.isLoading = false
      }

    },

    async userDetails() {
      try {
        const response = await product.shopCategoryDetails(this.$route.params.id)
        this.form.category_name = response.data.category_name
        this.form.description = response.data.description
        this.form.active_status = response.data.active_status
        this.form.discount_limit = response.data.discount_limit == 1 ? true : false
        this.form.max_sale_limit = response.data.max_sale_limit == 1 ? true : false

        this.form.max_quentity = response.data.max_quentity

        this.form.a_quentity = response.data.a_quentity
        this.form.b_quentity = response.data.b_quentity
        this.form.c_quentity = response.data.c_quentity
        this.form.d_quentity = response.data.d_quentity
      } catch (error) {
        this.showErrorMessage('Category not found.')
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

.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}

.modern-reset-btn {
  background: linear-gradient(135deg, #df4e4e, #be2222);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}


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