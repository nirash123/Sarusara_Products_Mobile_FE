<template>
  <div>
    <section class="invoice-preview-wrapper">
      <b-row class="invoice-actions invoice-header">

        <b-col cols="12">
          <b-card class="plastic-header-card">

            <div class="header-wrapper">

              <!-- LEFT -->
              <div class="left-section">

                <div class="title">
                  <h5 class="mb-0">
                    Plastic Sale
                  </h5>
                </div>
              </div>

              <!-- CENTER -->
              <div class="center-section">
                <span>📅 {{ currentDate }}</span>
                <span class="mx-2">|</span>
                <span>⏰ {{ currentTime }}</span>
              </div>
            </div>

          </b-card>
        </b-col>

      </b-row>


      <b-row class="invoice-actions g-2">

        <!-- LEFT SIDE (ITEMS) -->
        <b-col cols="12" lg="7">

          <!-- Search -->
          <b-card class="mb-2 shadow-sm rounded-lg">
            <v-select ref="itemSelectInput" v-model="item_name" :options="groups" label="label"
              placeholder="🔍 Search items..." @input="addtocart(item_name)" class="modern-select" />
          </b-card>

          <!-- Cart Items -->
          <div class="cart-container">

            <!-- DESKTOP TABLE -->
            <div class="d-none d-md-block">

              <div class="cart-header d-flex">
                <div class="col-item">ITEM</div>
                <div class="col-price">UNIT Price</div>
                <div class="col-qty">Qty</div>
                <div class="col-total">TOTAL</div>
                <div class="col-action text-center">ACTION</div>
              </div>

              <div class="cart-container scroll-cart">

                <div v-for="product in sale_carts" :key="product.id" class="cart-row d-flex align-items-center">

                  <div class="col-item d-flex align-items-center">
                    <div class="item-icon">🪣</div>
                    <div>
                      <div class="item-name">{{ product.items_item_name }}</div>
                      <div class="item-unit text-muted">| {{ product.unit }}</div>
                    </div>
                  </div>

                  <div class="col-price">
                    Rs. {{ formatPrice(product.sale_price) }}
                  </div>

                  <div class="col-qty">
                    <div class="qty-box">
                      <button @click="decreaseQty(product)">
                        −
                      </button>

                      <input v-model="product.quentity" :ref="'quantityNameInput_' + product.id"
                        @focus="isQtyActive = true" @blur="isQtyActive = false" @select="isQtyActive = true"
                      @mouseup="isQtyActive = true"
                        @change="updateSaleQuentityCart(product.id, product.quentity)" />

                      <button @click="increaseQty(product)">
                        +
                      </button>
                    </div>
                  </div>

                  <div class="col-total text-success">
                    Rs. {{ formatPrice(product.quentity * product.sale_price) }}
                  </div>

                  <div class="col-action text-center">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger"
                      class="btn-icon mr-50">
                      <feather-icon icon="TrashIcon" size="16" @click="deleteSaleCart(product.id)" />
                    </b-button>
                  </div>

                </div>

              </div>

            </div>

            <!-- 📱 MOBILE CARD VIEW -->
            <div class="mt-5 d-block d-md-none">

              <div v-for="product in sale_carts" :key="product.id" class="mobile-card">

                <!-- Top -->
                <div class="d-flex align-items-center mb-2">
                  <div class="item-icon mr-2">🪣</div>
                  <div>
                    <div class="item-name">{{ product.items_item_name }} </div>
                    <small class="text-muted">{{ product.unit }}</small>
                  </div>
                </div>

                <!-- Price -->
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Price</span>
                  <span>Rs. {{ formatPrice(product.sale_price) }}</span>
                </div>

                <!-- Qty -->
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-muted">Quantity</span>
                  <div class="qty-box">
                    <button @click="decreaseQty(product)">
                      −
                    </button>

                    <input v-model="product.quentity" :ref="'quantityNameInput_' + product.id"
                        @focus="isQtyActive = true" @blur="isQtyActive = false" @select="isQtyActive = true"
                      @mouseup="isQtyActive = true"
                      @change="updateSaleQuentityCart(product.id, product.quentity)" />

                    <button @click="increaseQty(product)">
                      +
                    </button>
                  </div>
                </div>

                <!-- Total + Delete -->
                <div class="d-flex justify-content-between align-items-center">
                  <strong class="text-success">
                    Rs. {{ formatPrice(product.quentity * product.sale_price) }}
                  </strong>

                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger" class="btn-icon mr-50">
                    <feather-icon icon="TrashIcon" size="16" @click="deleteSaleCart(product.id)" />
                  </b-button>
                </div>

              </div>

            </div>

          </div>

        </b-col>

        <!-- RIGHT SIDE (SUMMARY) -->
        <b-col cols="12" lg="5">

          <b-card class="summary-card shadow-lg rounded-lg sticky-top py-0 px-2">

            <div class="d-flex justify-content-between align-items-start">

              <!-- LEFT CONTENT -->

              <h4 class="order-title d-flex align-items-center font-weight-bold mb-2">
                <span class="icon-box blue mr-2">🛒</span>
                Order Summary ( {{ supplier_data.supplier_name }} )
              </h4>



              <!-- ACTION BUTTON -->
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger" class="btn-icon delete-btn">
                <feather-icon icon="TrashIcon" size="16" @click="deleteOrder()" />
              </b-button>

            </div>
            <div>
              <!-- Financial Info -->
              <div class="d-flex flex-column gap-1 py-1">

                <div class="info-row">
                  <span v-if="supplier_data.loan > 0" class="text-primary label">Outstanding Loan <span
                      class="badge badge-primary">
                      {{ formatPrice(supplier_data.loan) }}
                    </span></span><span v-else></span>
                  <span v-if="supplier_data.buy > 0" class="text-danger label">Credit Amount <span
                      class="badge badge-danger">
                      {{ formatPrice(supplier_data.buy) }}
                    </span></span>
                </div>

              </div>
                <div v-if="supplier_data.tbs > 0" class="info-row">
                  <span class="text-success label">TBS Credit Amount <span
                      class="badge badge-success">
                      {{ formatPrice(supplier_data.tbs) }}
                    </span></span>
                </div>
            </div>

            <!-- Invoice Number (Enhanced UI) -->

            <div class="d-flex justify-content-between align-items-center mb-2">

              <span class="text-muted">
                <div class="invoice-box d-flex justify-content-center align-items-center mb-1">
                  <div class="invoice-label mr-2">
                    Invoice No
                  </div>

                  <div class="invoice-number">
                    {{ order_data.bill_number }}
                  </div>
                </div>
              </span>
              <span class="text-muted">
                <div class="invoice-box d-flex justify-content-center align-items-center mb-1">
                  <div class="invoice-label mr-2">
                    Lorry Number
                  </div>

                  <div class="invoice-number">
                    {{ order_data.lorry_number }}
                  </div>
                </div>
              </span>
            </div>

            <!-- Item Count -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted">Items Count</span>
              <span class="badge-count">{{ sale_carts.length }}</span>
            </div>

            <hr>

            <!-- Subtotal -->
            <div class="d-flex justify-content-between mb-3">
              <h3 class="font-weight-bold">Total</h3>
              <h3 class="font-weight-bold">Rs {{ formatPrice(sum_total) }}</h3>
            </div>

            <!-- <div v-if="supplier_data.id == 1" class="input-row">
              <div class="d-flex align-items-center">
                <span class="icon green">🏦</span>
                <span class="hold">Company Payment</span>
              </div>
              <b-form-input type="number" min="0" step="0.01" v-model.number="hold" class="input-box"
                @change="getTotalSalePrice" />
            </div> -->

            <!-- Payments -->
            <div class="input-row">
              <div class="d-flex align-items-center">
                <span class="icon green">💵</span>
                <span>Amount Paid</span>
              </div>
              <b-form-input ref="cashInput" type="number" min="0" step="0.01" v-model.number="cash" class="input-box"
                @change="getTotalSalePrice" />
            </div>

             <div class="input-row">
              <div class="d-flex align-items-center">
                <span class="icon green">🧾</span>
                <span class="scredit">Credit</span>
              </div>
              <b-form-input ref="creditInput" type="number" min="0" step="0.01" v-model.number="credit" class="input-box"
                @change="getTotalSalePrice" />
            </div>


            <hr>

            <div class="d-flex justify-content-between mb-3">
              <h3 class="font-weight-bold">Changes</h3>
              <h3 v-if="balance >= 0" class="font-weight-bold text-danger">Rs {{ formatPrice(balance) }}</h3>
            </div>

            <b-button block class="payment-btn" :disabled="balance < 0 || sub_sum_total == 0 || ((cash + credit) < sub_sum_total ) || isLoading || isQtyActive"
              @click="submitNewData">
              {{ isLoading ? 'Processing...' : '🔒 PROCEED TO PAYMENT' }}
            </b-button>

            <!-- Tip -->
            <div class="tip-box mt-3">
              💡 Tip: You can add custom plastic items if the plastic item is not in the list.
            </div>

          </b-card>

        </b-col>

      </b-row>
    </section>
     <div class="d-md-none d-lg-none">
     <!-- <div> -->
      <b-col cols="12">
        <b-card no-body class="invoice-preview-card">
          <b-row>
            <b-col cols="12">
              <div>

                <b-row>
                  <b-col cols="7">
                    <h1 class="mt-50 d-flex">
                      <b-img class="mt-2" src="@/assets/images/logo/logo2.png" height="100" />

                      <span class="mt-1 ml-2"> <span class="display-new-7"> T B S Sarusara Products </span>
                        <div>
                          <h5 class="mt-50 display-new-9  font-weight-bolder ">
                            <!-- <b-img class="mr-50" src="@/assets/images/logo/loca.png" width="30" height="30" /> <span> -->
                            <i> No 123, Nagaswewa, Dehiattakandiya </i>
                          </h5>
                          <h5 class="display-new-9  font-weight-bolder my-50">
                            <i> 071 30 63 925 / 071 730 53 55 </i>
                          </h5>
                        </div>
                      </span>
                    </h1>
                  </b-col>
                  <b-col cols="5">

                    <!-- <vue-barcode class="mt-1 d-flex justify-content-end barcode" :value="order_data.bill_number"
                      :format="format" :height="55" :display-value="false" />
                    <div>
                      <h6 class="d-flex justify-content-end display-new-81">Selling Note (GRN)
                      </h6>
                    </div> -->
                  </b-col>
                </b-row>

                <div class="total"></div>

                <b-row>

                  <b-col cols="6">
                    <h6 class="font-weight-bolder display-new-8">
                      Invoice No <span class="ml-3">: {{ order_data.bill_number }} </span>
                    </h6>
                    <h6 class="font-weight-bolder display-new-8">
                      Invoice By <span class="ml-3">: {{ userData.user_name }} </span>
                    </h6>
                  </b-col>
                  <b-col cols="6">
                    <h6 class="font-weight-bolder display-new-8 d-flex justify-content-end">
                      Invoice Date <span class="ml-3"> : {{ currentOldDate }}</span>
                    </h6>
                    <h6 class="font-weight-bolder display-new-8 d-flex justify-content-end">
                      {{ currentTime }}
                    </h6>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" class="d-flex justify-content-between align-items-center">

                    <!-- Supplier -->
                    <h6 class="font-weight-bolder display-new-8 mb-0">
                      Supplier
                      <span class="ml-5"> <span class="ml-50">: {{ order_data.supplier_name.substring(0, 22) }}
                        </span></span>
                    </h6>

                    <!-- Lorry Number -->
                    <h6 class="font-weight-bolder display-new-8 mb-0">
                      Lorry Number
                      <span class="ml-2">: {{ order_data.lorry_number }}</span>
                    </h6>

                  </b-col>
                </b-row>
              </div>
              <div>
                <b-row class="mt-2" style="background-color: #999999;">
                  <b-col class="border border-2 d-flex justify-content-start" cols="6">
                    <h5 class="p-50  title-table"> No <span class="ml-2"> Description </span> </h5>
                  </b-col>
                  <b-col class="border border-2 d-flex justify-content-center" cols="1">
                    <h5 class="p-50  title-table"> Qty</h5>
                  </b-col>
                  <b-col class="border border-2 d-flex justify-content-center" cols="2">
                    <h5 class="p-50  title-table"> Price</h5>
                  </b-col>
                  <b-col class="border border-2 d-flex justify-content-center" cols="3">
                    <h5 class="p-50  title-table"> Amount</h5>
                  </b-col>
                </b-row>
              </div>
              <div class="mt-1">
                <div v-for="(product, index) in sale_item_carts" :key="product.id" class="item-row">
                  <b-row class="align-items-center no-gutters">

                    <b-col cols="6">
                      <div class="font-weight-bolder item-text">
                        <h6 class="display-new-71 mb-0">
                          {{ formatIndex(index) }}
                          <span class="ml-50">
                            {{ product.items_item_name.slice(0, 30) }}
                          </span>
                        </h6>
                      </div>
                    </b-col>

                    <b-col cols="1" class="text-right">
                      <h6 class="display-new-71 mb-0">
                        {{ formatPrice(product.quentity) }}
                      </h6>
                    </b-col>

                    <b-col cols="2" class="text-right">
                      <h6 class="display-new-71 mb-0">
                        {{ formatPrice(product.sale_price) }}
                      </h6>
                    </b-col>

                    <b-col cols="3" class="text-right">
                      <h6 class="display-new-71 mb-0">
                        {{ formatPrice(product.total) }}
                      </h6>
                    </b-col>

                  </b-row>
                </div>
              </div>
              <div class="total"></div>
              <b-row>
                <b-col cols="6" class="pr-5">

                </b-col>
                <b-col cols="6" class="pl-5">
                  <div class="payment-box">
                    <div class="payment-row display-new-73">
                      <span>Net Total Rs.</span>
                      <span> {{ formatPrice(sum_total) }}</span>
                    </div>
                    <div class="payment-row display-new-70">
                      <span>Amount Paid </span>
                      <span v-if="cash > 0"> {{ formatPrice(cash) }}</span>
                      <span v-else> 0.00</span>
                    </div>

                    <div v-if="credit > 0" class="payment-row display-new-73">
                      <span>Credit Rs. </span>
                      <span> {{ formatPrice(credit) }}</span>
                    </div>
                    <div class="payment-row display-new-70">
                      <span> Change Rs.</span>
                      <span v-if="balance > 0"> {{ formatPrice(balance) }}</span>
                      <span v-else> 0.00</span>
                    </div>
                  </div>

                </b-col>
              </b-row>


              <b-row class="mt-5">
                <b-col cols="6">
                  <div>
                    <h5 class="d-flex justify-content-center title display-new-name ml-3">
                      .................................................
                    </h5>
                  </div>
                  <h4 class="d-flex justify-content-center title display-new-name ml-3">
                    Authorised By</h4>
                </b-col>
                <b-col cols="6">
                  <div>
                    <h5 class="d-flex justify-content-center title display-new-name ml-3">
                      .................................................
                    </h5>
                  </div>

                  <h4 class="d-flex justify-content-center title display-new-name ml-3">
                    Received By</h4>

                </b-col>
              </b-row>

              <h1 class="display-new-4 d-flex font-weight-bolder justify-content-center mt-0">
                <i> Software By @ Easyones Soft, www.easyonessoft.com Call / Whatsapp : 076 283 38 38 </i>
              </h1>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </div>
  </div>
</template>

<script>
import {
  BFormRating,
  BImg,
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BCol,
  BContainer,
  BDropdown,
  BDropdownItem,
  BForm,
  BCard,
  BFormCheckbox,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormSelect,
  BTableLite,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BListGroup,
  BListGroupItem,
  BModal,
  BOverlay,
  BPagination,
  BRow,
  BSidebar,
  BTable,
  VBModal,
  BTabs,
  BTab,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import ErrorMessages from "@/mixins/ErrorMessages";
import SuccessMessage from "@/mixins/SuccessMessage";
import MomentMixin from "@/mixins/MomentMixin";
import vSelect from "vue-select";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Filter from "@/mixins/FilterMixin";
import { mapGetters } from "vuex";
import product from "@/apis/modules/product";
import item from "@/apis/modules/item";
import admin from "@/apis/modules/admin";
import profile from "@/apis/modules/profile";
import order from "@/apis/modules/order";
import VueBarcode from 'vue-barcode';

export default {
  components: {
    VueBarcode,
    BFormRating,
    BImg,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BTabs,
    BTab,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BOverlay,
    BInputGroupPrepend,
    BListGroup,
    BListGroupItem,
    vSelect,
    BCard,
    BModal,
    BTableLite,
    VBModal,
    BContainer,
    BAlert,
    BSidebar,
    BForm,
    BFormInvalidFeedback,
    BFormDatepicker,
    BFormCheckbox,
    VuePerfectScrollbar,
    draggable,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  setup() {
    const printInvoice = () => {
      window.print()
    }
    return {
      printInvoice,
    }
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      order_data: '',
      supplier_data: '',
      enterPressCount: 0,
      enterTimeout: null,
      item_name: '',
      groups: [],
      wattam_discount: 0,
      bill_total: 0,
      bill_wattam: 0,
      bill_labaya: 0,
      store_setting: false,
      wattam: 0,
      total_discount: 0,
      cheque_status: 0,
      customer_data: null,
      customer_data_discount: 0,
      intermediary_data: null,
      intermediary_data_discount: 0,
      currentTime: '',
      bill_number: '',
      old_bill_number: '',
      currentDate: '',
      currentNewDate: '',
      currentOldDate: '',
      company_total: 0,
      profit: 0,
      sale_total: 0,
      special_sale_total: 0,
      old_sale_total: 0,
      old_special_sale_total: 0,
      old_company_total: 0,
      image: '',
      category: 0,
      resturant_category: 0,
      categories: [],

      return_sum: 0,
      resturant_sum: 0,
      total_sum: 0,
      sub_total: 0,
      customer_id: null,
      customer_name: '',
      image: '',
      user_name: '',
      form: {
        user_name: '',
        address: '',
        phone_no: '',
        identity_code: '',
        active_status: '',
      },
      getData: '',
      getCustomerData: '',
      getIntermediaryData: '',
      getReturnData: '',
      errorPhone: '',
      errorID: '',
      errorUserName: '',
      item_code: '',
      isLoading: false,
      isQtyActive: false,
      discount: 0,
      sale_discount: 0,
      good_discount: 0,
      sum_company: 0,
      customer_id: '',
      discount: 0,
      sub_sum_total: 0,
      sum_total: 0,
      profit: 0,
      transport: 0,
      labour: 0,
      hold: 0,
      cash: 0,
      card: 0,
      cheque: 0,
      customer_discount: 0,
      all_discount: 0,
      credit: 0,
      sum: 0,
      balance: 0,
      paied: 0,
      order_date: '',
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25, 50],
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      pagination: {
        perPage: "6",
        pageOptions: "",
        totalRows: "",
        from: "",
        to: "",
      },
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      pagination3: {
        perPage: "12",
        pageOptions: "",
        totalRows: "",
        from: "",
        to: "",
      },
      sortBy3: "",
      sortDesc3: false,
      sortDirection3: "asc",
      filter3: null,
      filterOn3: [],


      pagination1: {
        perPage: "8",
        pageOptions: "",
        totalRows: "",
        from: "",
        to: "",
      },
      pagination2: {
        perPage: "8",
        pageOptions: "",
        totalRows: "",
        from: "",
        to: "",
      },
      sortBy1: "",
      sortDesc1: false,
      sortDirection1: "asc",
      sortBy2: "",
      sortDesc2: false,
      sortDirection2: "asc",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      new_user_code: '',
      new_user_name: '',
      new_address: '',
      new_phone_no: '',
      new_identity_code: '',

      submittedPriceNames: [],

      user_code_status: null,
      user_name_status: null,
      address_status: null,
      phone_no_status: null,
      identity_code_status: null,

      todayDate: new Date(),
      calendar_date: new Date().toISOString().split('T')[0],
      userData: JSON.parse(localStorage.getItem('userData')),


      fields: [
        {
          key: "item_name",
          label: "item name",
        },
        {
          key: "category",
          label: "category",
          sortable: true,
        },
        {
          key: "quentity",
          label: "quantity",
          sortable: true,
        },
        {
          key: "sale_price",
          label: "sale price",
          sortable: true,
        },
        {
          key: "action",
          label: "action",
        },


      ],
      items: [],
      resturant_carts: [],
      sale_carts: [],
      sale_item_carts: [],
      sale_bill_item_carts: [],
      return_carts: [],
    };
  },
  watch: {
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {

    processedSaleCarts() {
      return this.sale_carts.map(product => {
        // Split the string at the '*' character and take the first part
        return {
          ...product,
          items_item_name: product.items_item_name.split('*')[0].trim()
        };
      });
    },
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.currentDate = this.getCurrentDate();
    this.currentNewDate = this.getNewCurrentDate();
    this.currentOldDate = this.getNewCurrentOldDate();
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  methods: {
    formatIndex(index) {
      return (index + 1).toString().padStart(2, '0');
    },

    formatPrice(value) {
      return Number(value)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.user_code_status = valid,
        this.user_name_status = valid
      this.address_status = valid
      this.phone_no_status = valid
      this.identity_code_status = valid
      return valid
    },

    resetModalPrice() {
      this.new_user_name = ''
      this.new_address = ''
      this.new_phone_no = ''
      this.new_identity_code = ''

      this.user_code_status = null
      this.user_name_status = null
      this.address_status = null
      this.phone_no_status = null
      this.identity_code_status = null
    },

    handleOkPrice(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitPrice()
    },

    handleSubmitPrice() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityPrice()) {
        return
      }
      this.submittedPriceNames.push(
        this.new_user_name,
        this.new_address,
        this.new_phone_no,
        this.new_identity_code,
      )
      this.companyCustomer(
        this.new_user_name,
        this.new_address,
        this.new_phone_no,
        this.new_identity_code,
      )

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-price'].toggle('#toggle-btn-price')
      })
    },

    async companyCustomer(new_user_name, new_address, new_phone_no, new_identity_code) {
      try {
        this.payload = {
          user_code: new_phone_no,
          user_name: new_user_name,
          address: new_address,
          phone_no: new_phone_no,
          identity_code: new_identity_code,
        }
        this.isLoading = true
        const response = await admin.customerCreate(this.payload)
        this.showSuccessMessage('Create Customer Successfully')
        this.resetModalPrice();
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.user_code ? this.showErrorMessage('The Customer code has been already taken.') : ''
        error.response.data.data.user_name ? this.showErrorMessage('The Customer name has been already taken.') : ''
        error.response.data.data.phone_no ? this.showErrorMessage('The Mobile number has been already taken.') : ''
        error.response.data.data.identity_code ? this.showErrorMessage('The NIC number has been already taken.') : ''
        this.isLoading = false
      }
    },


    removeSearch() {
      this.filters['name_or_email'] = ''
      this.filters['id_or_cus_id'] = ''
    },


    handleCustomerClick(event, project) {
      if (event.ctrlKey) {
        this.$router.push(`/edit-pos-customer-details/${project.id}`)
      }
      else {
        this.addtoCustomercart(project)
      }
    },

    handleKeydown(event) {

      if (event.key.toLowerCase() === '*') {
        event.preventDefault();
        const select = this.$refs.itemSelectInput;
        select.$el.querySelector('input').focus();
        select.open = true;
      }
      if (event.key.toLowerCase() === '+') {
        this.$refs.cashInput.select();
      }
      if (event.key.toLowerCase() === 'enter') {
        if (!this.enterPressCount) {
          this.enterPressCount = 1;

          clearTimeout(this.enterTimeout);
          this.enterTimeout = setTimeout(() => {
            this.enterPressCount = 0;
          }, 400);

        } else if (this.enterPressCount === 1) {

          if (this.cash >= 0 && this.sub_sum_total > 0  && !this.isLoading && !this.isQtyActive) {
            this.submitNewData();
          }

          clearTimeout(this.enterTimeout);
          this.enterPressCount = 0;
        }
      }

      if (event.altKey && event.key.toLowerCase() === 'q') {
        this.deleteSaleCartLastItem()
      }


    },


    handleFunctionKeys(event) {
      switch (event.key) {

        case 'Escape':
          event.preventDefault();
          this.$refs.transportInput.select();
          break;

      }
    },

    async checkAdmin() {
      const response = await profile.getDeviceNumber(JSON.parse(localStorage.getItem('userData')).id)
      if (JSON.parse(localStorage.getItem('userData')).device_number != response.data.data.device_number) {
        this.localLogout()
      }
    },

    async localLogout() {
      localStorage.removeItem('userData')
      localStorage.removeItem('isLoggedIn')
      window.location = '/tbsnew'
    },

    getCurrentTime() {
      const now = new Date();
      // Format the time as per your requirement
      return now.toLocaleTimeString();
    },

    getCurrentDate() {
      const now = new Date();
      // Format the date as per your requirement
      return now.toLocaleDateString();
    },

    getNewCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    },

    getNewCurrentOldDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');


      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      return `${day}-${month}-${year}`;
    },

    getProcessedItemName(itemName) {
      return itemName.split('*')[0].trim();
    },

    getProcessedItemCode(itemCode) {
      const code = itemCode.trim();

      return code.length > 6
        ? code.slice(-6)
        : code;
    },


    async groupData() {
      try {
        const response = await product.plasticItemData()
        this.groups = response.data.data

      } catch (error) {

      }
    },

    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },
    refreshPage() {
      if (this.$refs.nameInput) {
        if (this.$refs.nameInput) {
          this.$refs.nameInput.focus()
        }
      }
    },

    async submitNewData() {
      try {
        this.payload = {
          order_id: this.order_data.id,
          subtotal: this.sub_sum_total,
          transport: this.cash,
          labour: this.balance,
          total: this.sum_total,
          profit: this.profit,
          cash: this.paied,
          hold: this.hold,
          cheque: 0,
          credit: this.credit,
        }
        this.isLoading = true
        await item.submitPlasticSaleCart(this.payload)
        this.printInvoice()
        this.transport = 0
        this.labour = 0
        this.cash = 0
        this.hold = 0
        this.card = 0
        this.profit = 0
        this.cheque = 0
        this.credit = 0
        this.balance = 0
       this.$router.push('/plastic-sale')
       this.getAdminSaleCarts()
       this.getItems()

        this.isLoading = false
      }
      catch (error) {
        this.isLoading = false

        if (error.response) {
          if (error.response.status === 404) {
            alert("Order not found")
          } else {
            this.showErrorMessage(error.response.data.message)
          }
        }
      }

    },


    increaseQty(product) {
      product.quentity++
      this.updateSaleQuentityCart(product.id, product.quentity)
    },

    decreaseQty(product) {
      if (product.quentity > 1) {
        product.quentity--
        this.updateSaleQuentityCart(product.id, product.quentity)
      }
    },

    handleManualChange(product) {
      // جلوگیری invalid values
      if (!product.quentity || product.quentity < 1) {
        product.quentity = 1
      }

      this.updateSaleQuentityCart(product.id, product.quentity)
    },

    async updateSaleQuentityCart(id, quentity) {
      this.isLoading = true

      try {
        // Prevent invalid quantity
        if (quentity <= 0) {
          await this.refreshCart()
          return
        }

        const payload = { id, quentity }

        await item.updatePlasticSaleQuentityCart(id, payload)

      } catch (error) {
        console.error('Update failed:', error)
      }

      await this.refreshCart()
      this.isLoading = false

      if (this.customer_data?.user_name) {
        await this.deleteCustomerSaleCart()
      }
    },

    async refreshCart() {
      await this.getAdminSaleCarts()

      if (this.$refs.nameInput) {
        this.$refs.nameInput.focus()
      }
    },

    async deleteSaleCart(id) {

      await item.deletePlasticSaleCart(id)
      await this.getAdminSaleCarts()
      if (this.$refs.nameInput) {
        if (this.$refs.nameInput) {
          this.$refs.nameInput.focus()
        }
      }
      this.isLoading = false
    },

    async deleteSaleCartLastItem() {

      await item.deletePlasticSaleCartLastItem(this.$route.params.id)
      await this.getAdminSaleCarts()
      if (this.$refs.nameInput) {
        if (this.$refs.nameInput) {
          this.$refs.nameInput.focus()
        }
      }
      this.isLoading = false
    },



    async addtocart(project) {

      try {
        this.payload = {
          cashier_id: JSON.parse(localStorage.getItem('userData')).id,
          item_id: project.id,
          order_id: this.$route.params.id,
        }
        this.isLoading = true
        const response = await item.addProductToPlasticSaleCart(this.payload)
        const ItemId = response.data.data.id
        this.item_name = ''
        await this.getAdminSaleCarts()
        if (this.$refs.nameInput) {
          if (this.$refs.nameInput) {
            this.$refs.nameInput.focus()
          }
        }

        this.$nextTick(() => {
          const input = this.$refs['quantityNameInput_' + ItemId]

          if (input && input[0]) {
            input[0].select()
            input[0].focus()
          } else if (input) {
            input.select()
            input.focus()
          }
        })

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async deleteOrder() {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this order?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await item.deletePlasticSaleOrder(this.order_data.id)
            this.showSuccessMessage('Order has been deleted')
            this.$router.push('/plastic-sale')
            this.refreshTable();
          } else if (result.dismiss == 'cancel') {
            this.formLoading = false
            this.showSuccessMessage('Cancelled')
          }
        })

        this.tableLoading = false

      } catch (error) {
        this.convertAndNotifyError(error)
        this.tableLoading = false
        this.$router.push('/plastic-sale')
      }
    },



    async getAdminSaleCarts() {
      try {
        const response = await item.getAdminPlasticPosSaleCarts(this.$route.params.id)
        this.sale_carts = response.data.sale_carts
        this.sale_item_carts = response.data.sale_item_carts
        await this.getTotalPrice()
        if (this.$refs.nameInput) {
          if (this.$refs.nameInput) {
            this.$refs.nameInput.focus()
          }
        }
      } catch (error) {

      }
    },

    async getItems() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await product.getPosShopProducts(
          this.category, this.filters.id_or_cus_id || "", this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          category: x.bar_categories_category_name,
          sale_price: "Rs: " + x.sale_price,
          quentity: x.quentity,
          comapny_price: "( Rs: " + x.company_price + " )",
          active_status: x.active_status,
          unit: x.unit,
          status: x.status,

        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        this.getData = dataArray
      } catch (error) {
        //  this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy1 == "") {
          this.sortDesc1 = true;
        }
        const Response = await admin.getPosCustomers(
          this.filters.name_or_email || "", this.currentPage1, this.pagination1.perPage, this.sortBy1, this.sortDesc1);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          address: x.address ? x.address : "N/A",
          phone_no: x.phone_no ? x.phone_no : "N/A",
          identity_code: x.identity_code ? x.identity_code : "N/A",
          active_status: x.active_status,
          image: x.image,
          level: x.level,
          discount_type: x.discount_type,
          date: x.date,
          time_period: x.time_period,
        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage1 = paginationResponse.current_page;
        this.pagination1.totalRows = paginationResponse.total;
        this.pagination1.perPage = paginationResponse.per_page;
        this.pagination1.from = paginationResponse.from;
        this.pagination1.to = paginationResponse.to;
        this.tableLoading = false;
        this.getCustomerData = dataArray
      } catch (error) {
        this.tableLoading = false;
      }
    },

    async getOrderDetails() {
      try {
        const response = await order.getPlasticOrderDetails(this.$route.params.id)
        this.order_data = response.data.order
        this.supplier_data = response.data.supplier
      } catch (error) {

      }
    },


    async getTotalPrice() {
      this.sub_total = this.sale_carts
        .map(cart => parseFloat(cart.quentity * cart.sale_price))
        .reduce((total, quentity) => total + quentity, 0);

      this.profit = this.sale_carts
        .map(cart => parseFloat((cart.sale_price - cart.company_price) * cart.quentity))
        .reduce((total, quentity) => total + quentity, 0);

      this.sale_total = this.sub_total;


      if (this.cash < 0 || this.cash === null || this.cash === undefined || this.cash === '' || isNaN(this.cash)) {
        this.cash = 0
      }

      if (this.credit < 0 || this.credit === null || this.credit === undefined || this.credit === '' || isNaN(this.credit)) {
        this.credit = 0
      }

      if (this.credit > this.sale_total) {
        this.credit = 0
      }

      this.sub_sum_total = parseFloat(this.sale_total);
      this.sum_total = parseFloat(this.sale_total);
      this.balance = (parseFloat(this.cash) + parseFloat(this.credit)) - parseFloat(this.sum_total);
      this.paied = parseFloat(this.sum_total) - parseFloat(this.credit);
      this.profit = this.profit;

      if (this.$refs.nameInput) {
        this.$refs.nameInput.focus()
      };
      this.isLoading = false

    },

    async getTotalSalePrice() {

      this.sub_total = this.sale_carts
        .map(cart => parseFloat(cart.quentity * cart.sale_price))
        .reduce((total, quentity) => total + quentity, 0);

      this.profit = this.sale_carts
        .map(cart => parseFloat((cart.sale_price - cart.company_price) * cart.quentity))
        .reduce((total, quentity) => total + quentity, 0);


      this.sale_total = this.sub_total;

      if (this.cash < 0 || this.cash === null || this.cash === undefined || this.cash === '' || isNaN(this.cash)) {
        this.cash = 0
      }

      if (this.credit < 0 || this.credit === null || this.credit === undefined || this.credit === '' || isNaN(this.credit)) {
        this.credit = 0
      }

      if (this.credit > this.sale_total) {
        this.credit = 0
      }

      this.sub_sum_total = parseFloat(this.sale_total);
      this.sum_total = parseFloat(this.sale_total);
      this.balance = (parseFloat(this.cash) + parseFloat(this.credit)) - parseFloat(this.sum_total);
      this.paied = parseFloat(this.sum_total) - parseFloat(this.credit);
      this.profit = this.profit;

      if (this.$refs.nameInput) {
        this.$refs.nameInput.focus()
      };
      this.isLoading = false
    },


    refreshTable() {
      this.$refs.table.refresh()
      if (this.$refs.nameInput) {
        this.$refs.nameInput.focus()
      };
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
      if (this.$refs.nameInput) {
        this.$refs.nameInput.focus()
      };
    },

    async getAdmin() {

      const status = (await admin.getAdminDashboards(JSON.parse(localStorage.getItem('userData')).id))
      this.cashier_start_amount = status.data.cashier_payment_start_amount

      if (this.cashier_start_amount < 1 && JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
        this.$router.push('/account-setting?tab=2')
      } else {

      }
    },

  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown);

    window.addEventListener('keydown', this.handleFunctionKeys);

    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
      this.checkAdmin()
      this.getOrderDetails()
      this.getAdmin()
      this.groupData()
      this.getAdminSaleCarts()
    }
    else {
      this.$router.push('/')
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keydown', this.handleFunctionKeys);
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.order-header-card {
  background: #ffffff;
  padding: 14px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f1f1;
}

.order-title {
  font-size: 18px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.info-row .label {
  font-weight: 600;
  font-size: 13px;
  color: #555;
}

.info-row.danger .label {
  color: #dc3545;
}

.info-row.primary .label {
  color: #007bff;
}

.badge {
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 20px;
}

.delete-btn {
  margin-left: 10px;
}

/* Modal content polish */
.modal-content {
  border-radius: 14px;
  overflow: hidden;
}

.modal-header {
  background: linear-gradient(135deg, #dfdeff, #7c8cff);
  color: white;
  font-weight: 600;
}

.modal-footer {
  border-top: 1px solid #f1f1f1;
}

.item-row {
  padding: 4px 0;
  /* reduce vertical spacing */
  border-bottom: 1px solid #3d3d3d;
  /* optional */
}

.item-text {
  line-height: 1.2;
  /* tighter text */
}

.invoice-summary-card {
  border: 2px solid #000;
  border-radius: 10px;
  padding: 16px;
  background: #fff;
  max-width: 400px;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  margin-bottom: 10px;
}

.icon {
  font-size: 18px;
}

/* Rows */
.row {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}

/* Dashed line */
.dashed {
  border: none;
  border-top: 1px dashed #999;
  margin: 10px 0;
}

/* Total */
.total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  border-top: 2px solid #000;
  padding-top: 10px;
  margin-top: 10px;
}

/* Payment box */
.payment-box {
  border: 3px solid #000;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  padding-right: 8px;
  border-bottom: 3px solid #000000;
}

.payment-row:last-child {
  border-bottom: none;
}

/* Balance */
.balance {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 15px;
  font-size: 16px;
}

.invoice-box {
  background: linear-gradient(135deg, #f8f9ff, #eef2ff);
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid #e3e8ff;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.invoice-label {
  font-size: 13px;
  font-weight: 600;
  color: #6c757d;
  letter-spacing: 0.5px;
}

.invoice-number {
  font-size: 20px;
  font-weight: 800;
  color: #2c3e50;
  background: #ffffff;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px dashed #7c8cff;
}

.invoice-header {
  position: sticky;
  top: 0;
  z-index: 999;
}


.plastic-header-card {
  background: linear-gradient(135deg, #228a1e, #2faf16);
  border-radius: 12px;
  color: white;
  padding: 10px 15px;
}

/* Layout */
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Left */
.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title h5 {
  color: #fff;
  font-weight: 600;
  margin: 0;
}

.title-table {
  font-size: 1.4rem;
  color: #000000;
  font-weight: 800;
  margin: 0;
  -webkit-text-stroke: 1px black;
}

.title small {
  color: #dbeafe;
}

/* Back button */
.plastic-back-btn {
  background: linear-gradient(135deg, #228a1e, #228a1e);
  border: none;
  color: white;
  border-radius: 10px;
}

/* Center */
.center-section {
  font-weight: 500;
  color: #e0f2fe;
}

/* Right */
.logout-icon {
  cursor: pointer;
  width: 26px;
  height: 26px;
  color: white;
}

/* Hover */
.logout-icon:hover {
  opacity: 0.7;
}


.scroll-cart {
  max-height: 500px;
  /* 👈 change to 1200px if needed */
  overflow-y: auto;
}

/* Better option (responsive) */
@media (min-width: 768px) {
  .scroll-cart {
    max-height: 70vh;
  }
}

/* Mobile Card */
.mobile-card {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

/* Improve spacing */
.mobile-card .item-name {
  font-weight: 600;
}

.scredit {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-weight: 900;
  color: #008d00;
  -webkit-text-stroke: 1px #00ff00;
}

/* Delete */
.delete-btn {
  border: 1px solid #ff4d4f;
  background: #fff;
  color: #ff4d4f;
  border-radius: 8px;
  padding: 5px 10px;
}

// new

.summary-card {
  border-radius: 16px;
  background: #fff;
}

/* Icon circle */
.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Colors */
.blue {
  background: #e7f0ff;
  color: #3b82f6;
}

.green {
  background: #e6f7ee;
  color: #22c55e;
}

.purple {
  background: #f3e8ff;
  color: #a855f7;
}

.orange {
  background: #fff4e6;
  color: #f59e0b;
}

/* Badge */
.badge-count {
  font-size: 20px;
  background: #eef2ff;
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

/* Input row layout */
.input-row {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* Small icons */
.icon {
  margin-right: 8px;
}

/* Input styling */
.input-box {
  font-size: 17px;
  width: 200px;
  text-align: right;
  border-radius: 8px;
}

/* Button */
.payment-btn {
  background: linear-gradient(135deg, #4f46e5, #2563eb);
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-weight: 600;
}

/* Tip box */
.tip-box {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  color: #475569;
}

// end style

.cart-container {
  background: #f8f9fc;
  border-radius: 12px;
  padding: 10px;
}

/* Header */
.cart-header {
  font-size: 13px;
  font-weight: 600;
  color: #6c757d;
  padding: 10px;
}

/* Rows */
.cart-row {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  transition: 0.2s;
}

.cart-row:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Columns */
.col-item {
  width: 35%;
}

.col-price {
  width: 15%;
}

.col-qty {
  width: 20%;
}

.col-total {
  width: 20%;
}

.col-action {
  width: 10%;
}

/* Item */
.item-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 20px;
}

.item-name {
  font-weight: 600;
}

.item-unit {
  font-size: 12px;
}

/* Qty Box */
.qty-box {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  width: 150px;
}

.qty-box button {
  width: 35px;
  height: 35px;
  border: none;
  background: #f1f3f5;
  font-size: 16px;
}

.qty-box input {
  width: 70px;
  text-align: center;
  border: none;
}

/* Price */
.text-success {
  color: #28a745;
  font-weight: 600;
}


.delete-btn:hover {
  background: #ff4d4f;
  color: #fff;
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }

  .cart-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .col-item,
  .col-price,
  .col-qty,
  .col-total,
  .col-action {
    width: 100%;
    margin-bottom: 8px;
  }


}


.rounded-lg {
  border-radius: 16px;
}

.item-card {
  transition: 0.2s;
}

.item-card:hover {
  transform: translateY(-2px);
}

.qty-input {
  width: 60px;
  border-radius: 8px;
}

.summary-card {
  position: sticky;
  top: 20px;
}

.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}

.modern-select .vs__dropdown-toggle {
  border-radius: 12px;
  padding: 8px;
}

div#dropdown-1 .btn-outline-danger {
  border: none !important;
}

.custom-v-select {
  width: 100%;
  max-height: 200px;
}

.custom-v-select .vs__selected {
  font-size: 18px;
  font-weight: 700;
}

.custom-v-select .vs__dropdown-option {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 10px;
}

.custom-v-select .vs__dropdown-option--highlight {
  background: #2f55ff9f;
  color: #fff;
  font-weight: bold;
}

.per-page-selector {
  width: 90px;
}

.table-container {
  min-height: 500px;
  /* Adjust the value to your desired minimum height */
}

.single-line-text {
  width: 180px;
}

.invoice-filter-select {
  min-width: 190px;
}

::v-deep .vs__selected-options {
  flex-wrap: nowrap;
}

::v-deep .vs__selected {
  width: 100px;
}

.display-4-5 {
  font-size: 2.8rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-5-5 {
  font-size: 2.2rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-red {
  font-size: 1.3rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #ff0000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-name {
  font-size: 1.5rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-1 {
  font-size: 1.1rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-2 {
  font-size: 1.2rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the margin as needed */
}

.display-new-3 {
  font-size: 1.1rem;
  color: #000000;
  /* Adjust the margin as needed */
}

.display-new-9 {
  font-size: 1.5rem;
  color: #000000;
  /* Adjust the margin as needed */
}

.display-new-4 {
  font-size: 1.2rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-5 {
  font-size: 2.0rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-6 {
  font-size: 2.0rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-7 {
  font-size: 2.4rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  -webkit-text-stroke: 1px black;
}

.display-new-70 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
}

.display-new-73 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  -webkit-text-stroke: 1px black;
}



.display-new-71 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
}

.display-new-8 {
  font-size: 1.5rem;
  /* Adjust the font size as needed */
  font-weight: bold;
  color: #000000;
  /* Adjust the color as needed */
  margin-bottom: 0.625rem;
  /* Adjust the margin as needed */
}

.display-new-81 {
  font-size: 1.8rem;
  font-weight: 900;
  color: #000000;
  margin-bottom: 0.625rem;
  -webkit-text-stroke: 1px black;
}

.hold {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-weight: 900;
  color: #000000;
  -webkit-text-stroke: 1px black;
}

.custom-border {
  border: 1px solid;
  /* Adjust the border size as needed */
}

.custom-dashed-border {
  border: none;
  /* Remove the default border */
  border-top: 1px dashed;
  /* Create a dashed border at the top */
  color: black;
  /* Set the color of the dash (you can change this) */
  height: 1px;
  /* Set the height of the hr */
}

button {
  height: 38px;
}

.item-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item-section {
  width: 30%;
  /* Adjust as needed */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.item-image img {
  width: 100%;
  height: auto;
}

.item-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.item-id {
  font-size: 12px;
  color: #888;
}

.item-price {
  margin-top: 10px;
}

.regular-price {
  color: #888;
}

.sale-price {
  color: red;
}

.add-to-cart-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}
</style>

<style lang="scss">
@media print {


  // Global Styles
  body {
    background-color: transparent !important;
  }

  nav.header-navbar {
    display: none;
  }

  .main-menu {
    display: none;
  }

  .header-navbar-shadow {
    display: none !important;
  }

  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }

  footer.footer {
    display: none;
  }

  .card {
    background-color: transparent;
    box-shadow: none;
  }

  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            >.col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
