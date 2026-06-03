<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-button @click="$router.push('/plastic-items')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-dark'
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
                  <b-form-group label="Item Code" label-for="item_code">
                    <validation-provider #default="{ errors }" name="Item Code" rules="required">
                      <b-form-input id="item_code" v-model="form.item_code" :state="errors.length > 0 ? false : null"
                        placeholder="Enter item code" />
                      <small class="text-danger">{{ errors[0] }}</small>
                      <small v-if="errorItem" class="text-danger">{{ errorItem }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Item Name" label-for="product_name">
                    <validation-provider #default="{ errors }" name="Item Name" rules="required">
                      <b-form-input id="name" v-model="form.item_name" :state="errors.length > 0 ? false : null"
                        placeholder="Enter item name" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Quantity" label-for="quentity">
                    <validation-provider #default="{ errors }" name="Quantity" rules="required">
                      <b-form-input id="quentity" v-model="form.quentity" :state="errors.length > 0 ? false : null"
                        placeholder="Enter quentity" type="number" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Cost Price" label-for="company_price">
                    <validation-provider #default="{ errors }" name="Cost Price" rules="required">
                      <b-form-input id="company_price" v-model="form.company_price" type="number" step="0.01"
                        :state="errors.length > 0 ? false : null" placeholder="Enter buying price" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12" lg="6">
                  <b-form-group label="Selling Price" label-for="sale_price">
                    <validation-provider #default="{ errors }" name="Selling Price" rules="required">
                      <b-form-input id="sale_price" v-model="form.sale_price" type="number" step="0.01"
                        :state="errors.length > 0 ? false : null" placeholder="Enter selling price" />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>

          <!-- submit buttons -->

          <b-col cols="12" class="mt-2 d-flex justify-content-end gap-2">
            <span class="mr-2">
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="modern-btn"
                :class="{ 'btn-loading': isLoading }" :disabled="isLoading" @click="formSubmitted()">
                <span v-if="isLoading">Loading...</span>
                <span v-else> Save changes</span>
              </b-button>
            </span>

            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger" class="modern-reset-btn"
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
      { label: 'All', value: 0 },
      { label: 'Active Items', value: 1 },
      { label: 'InActive Items', value: 2 },
    ]

    const unitsOptions = [
      { label: 'Pcs', value: 'Pcs' },
      { label: 'Kg', value: 'Kg' },
      { label: 'm', value: 'm' },
      { label: 'Ft', value: 'Ft' },
      { label: 'L', value: 'L' },
    ]


    return {
      statusOptions,
      unitsOptions

    }
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
      sub_groups: [],
      isLoading: false,
      form: {
        item_code: '',
        item_name: '',
        quentity: '',
        company_price: '',
        sale_price: '',
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
      this.errorItem = ''
      try {
        this.payload = {
          item_code: this.form.item_code,
          item_name: this.form.item_name,
          quentity: this.form.quentity,
          company_price: this.form.company_price,
          sale_price: this.form.sale_price
        }

        this.isLoading = true
        const response = await product.plasticProductUpdate(this.$route.params.id, this.payload)
        this.showSuccessMessage('Update Item Successfully')
        this.$router.push('/plastic-items')
        this.isLoading = false
      } catch (error) {
        this.errorItem = error.response.data.data.item_code ? error.response.data.data.item_code[0] : ''
        error.response.data.data.item_code ? this.showErrorMessage('The item code has been already taken.') : ''
        this.isLoading = false
      }

    },

    async userDetails() {
      try {
        const response = await product.plasticProductDetails(this.$route.params.id)
        this.form.item_code = response.data.item_code
        this.form.item_name = response.data.item_name
        this.form.quentity = response.data.quentity,
          this.form.company_price = response.data.company_price
        this.form.sale_price = response.data.sale_price
      } catch (error) {
        this.showErrorMessage('Product not found.')
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
