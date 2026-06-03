<template>
  <div class="fixed-page">
    <section class="invoice-preview-wrapper">
      <b-card no-body class="invoice-actions p-1 bg-primary rounded p-1">
        <b-row>
          <b-col cols="1">
            <feather-icon @click="$router.push('/order_list?tab=2')" icon="ChevronLeftIcon" class="text-white"
              size="54" />
          </b-col>
          <b-col cols="10">
            <h3 class="text-white d-flex justify-content-center">
              <span class="mt-1 text-white">Payment Pending Purchase Order ( {{ orders.sale_orders_bill_number }} )
              </span>
            </h3>
          </b-col>
        </b-row>
      </b-card>
      <b-row class="invoice-actions">
        <b-col lg="6" md="6" sm="12" class="mb-2">
          <div class="ml-2">
            <h4 class="text-capitalize mt-2">
              Bill Number
            </h4>
            <b-card-text>
              {{ orders.sale_orders_bill_number }}
            </b-card-text>
          </div>

          <div class="ml-2">
            <h4 class="text-capitalize mt-2">
              Supplier
            </h4>
            <b-card-text>
              <div>
                {{ (orders.suppliers_supplier_name) }} <br>
                {{ (orders.suppliers_address) }} <br>
                {{ (orders.suppliers_phone_no) }}
              </div>
            </b-card-text>
          </div>

        </b-col>
        <b-col lg="6" md="6" sm="12" class="mb-2">

          <div class="ml-2">
            <h4 class="text-capitalize mt-2">
              Net Amount
            </h4>
            <b-card-text>
              <div>
                Rs: {{ (orders.sale_orders_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </div>
            </b-card-text>
          </div>
          <div class="ml-2">
            <h4 class="text-capitalize mt-2">
              Date & Time
            </h4>
            <b-card-text>
              {{ orders.sale_orders_order_date }} | {{ orders.sale_orders_order_time }}
            </b-card-text>
          </div>
          <div class="ml-2 mb-1">
            <h4 class="text-capitalize mt-2">
              Accountant
            </h4>
            <b-card-text>
              {{ orders.users_user_name }}
            </b-card-text>
          </div>
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="primary" class="" @click="printInvoice">
            invoice
          </b-button>
          <div v-if="orders.sale_orders_cash > 0" class="ml-2">
            <h4 class="text-capitalize mt-2">
              Cash
            </h4>
            <b-card-text>
              Rs: {{ (orders.sale_orders_cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </b-card-text>
          </div>
          <div v-if="orders.sale_orders_hold > 0" class="ml-2">
            <h4 class="text-capitalize mt-2">
              Card
            </h4>
            <b-card-text>
              Rs: {{ (orders.sale_orders_hold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </b-card-text>
          </div>
          <div v-if="orders.sale_orders_cheque > 0" class="ml-2">
            <h4 class="text-capitalize mt-2">
              Cheque
            </h4>
            <b-card-text>
              <div>
                Rs: {{ (orders.sale_orders_cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </div>
            </b-card-text>
          </div>
          <div v-if="orders.sale_orders_credit > 0" class="ml-2">
            <h4 class="text-capitalize mt-2">
              Credit
              <b-button class="single-line-text" variant="primary" id="toggle-btn-price"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                <span class="align-middle"> Add Payment</span>
              </b-button>
              <b-modal id="modal-prevent-closing-price" centered ref="my-modal-price"
                :title="`Add New Payment  ( Rs:  ${orders.sale_orders_credit} )`" ok-title="Submit"
                cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
                @ok="handleOkPrice">
                <form ref="form" @submit.stop.prevent="handleSubmitPrice">

                  <b-col sm="12" md="12">
                    <b-form-group label="Cash Amount" label-for="cash" invalid-feedback="Cash is required">
                      <b-form-input id="name" v-model="new_cash" :state="cash_status" placeholder="Enter Cash Amount" />
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12">
                    <b-form-group label="Card Amount" label-for="card" invalid-feedback="Card is required">
                      <b-form-input id="name" v-model="new_card" :state="card_status" placeholder="Enter Card Amount" />
                    </b-form-group>
                  </b-col>
                  <b-col sm="12" md="12">
                    <b-form-group label="Cheque Amount" label-for="cheque" invalid-feedback="Cheque is required">
                      <b-form-input id="name" v-model="new_cheque" :state="cheque_status"
                        placeholder="Enter Cheque Amount" />
                    </b-form-group>
                  </b-col>
                </form>
              </b-modal>
            </h4>
            <b-card-text>
              <div>
                Rs: {{ (orders.sale_orders_credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </div>
            </b-card-text>
          </div>
          <!-- <span class="ml-1">
              <b-button v-if="orders.sale_orders_active_status == 0" :class="{ 'btn-loading': isLoading }"
                :disabled="isLoading" type="submit" variant="primary" @click="addStore(orders.sale_orders_id)">
                <span v-if="isLoading">Loading...</span>
                <span v-else> Add To Store</span>
              </b-button>
            </span> -->
          <span class="ml-1">
            <!-- <b-button v-if="orders.sale_orders_active_status == 0" :class="{ 'btn-loading': isLoading }"
                :disabled="isLoading" type="submit" variant="danger" @click="deleteOrder(orders.sale_orders_id)">
                <span v-if="isLoading">Loading...</span>
                <span v-else> Cancel Order</span>
              </b-button> -->
          </span>


        </b-col>

      </b-row>
      <b-card style="height: 805px;" class="invoice-actions">

        <div>
          <h4 class="d-flex align-items-center justify-content-start mb-1">
            Order Items List : ( Rs: {{ (orders.sale_orders_total).toString(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            )
          </h4>
        </div>
        <table style="height: 605px;" class="table table-hover shopping-cart-wrap table-responsive">
          <thead>
            <tr>
              <th scope="col" style="width: 40%">Item Name</th>
              <th scope="col" style="width: 30%">QTY</th>
              <th scope="col" style="width: 30%">sale Price</th>
              <th scope="col" style="width: 30%">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in item_orders" :key="product.sale_orders_id">
              <td>
                <figure class="media">
                  <figcaption class="media-body mt-1">
                    <h6 class="title text-truncate"> {{ product.items_item_name || '-' }} </h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <figure class="media">
                  <figcaption class="media-body mt-1">
                    <h6 class="title text-truncate"> {{ product.sale_orders_quentity || 0 }} Kg</h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <figure class="media">
                  <figcaption class="media-body mt-1">
                    <h6 class="title text-truncate">Rs: {{
                      product.sale_orders_purchas_price
                        ? Number(product.sale_orders_purchas_price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                          ",")
                        : '0'
                    }} </h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <figure class="media">
                  <figcaption class="media-body mt-1">
                    <h6 class="title text-truncate">Rs: {{
                      product.sale_orders_total
                        ? Number(product.sale_orders_total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : '0'
                    }}</h6>
                  </figcaption>
                </figure>
              </td>
            </tr>

          </tbody>
        </table>
      </b-card>
      <div class="d-md-none d-lg-none">
        <!-- <div>  -->
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

                      <vue-barcode class="mt-1 d-flex justify-content-end barcode"
                        :value="orders.sale_orders_bill_number" :format="format" :height="55" :display-value="false" />
                      <div>
                        <h6 class="d-flex justify-content-end display-new-81">Purchasing Note (GRN)
                        </h6>
                      </div>
                    </b-col>
                  </b-row>

                  <div class="total"></div>

                  <b-row>

                    <b-col cols="6">
                      <h6 class="font-weight-bolder display-new-8">
                        Invoice No <span class="ml-3">: {{ orders.sale_orders_bill_number }} </span>
                      </h6>
                      <h6 class="font-weight-bolder display-new-8">
                        Invoice By <span class="ml-3">: {{ userData.user_name }} </span>
                      </h6>
                    </b-col>
                    <b-col cols="6">
                      <h6 class="font-weight-bolder display-new-8 d-flex justify-content-end">
                        Invoice Date <span class="ml-3"> : {{ formatDate(orders.sale_orders_order_date) }} </span>
                      </h6>
                      <h6 class="font-weight-bolder display-new-8 d-flex justify-content-end">
                        {{ formatTime(orders.sale_orders_order_time) }}
                      </h6>
                    </b-col>
                    <b-col cols="6">
                      <h6 class="font-weight-bolder display-new-8">
                        Supplier <span class="ml-5"> <span class="ml-50">: {{ orders.suppliers_supplier_name.substring(0, 22) }}
                          </span></span>
                      </h6>
                    </b-col>
                    <b-col cols="6">
                      <h6 class="font-weight-bolder display-new-8 d-flex justify-content-end">
                        Lorry Number <span class="ml-3"> <span class="ml-50">: {{ orders.sale_orders_lorry_number
                            }} </span></span>
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
                <div v-if="item_orders.length <= 16" style="height: 740px;" class="mt-1">
                  <div v-for="(product, index) in item_orders" :key="product.id" class="item-row">
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
                          {{ formatPrice(product.sale_orders_quentity) }}
                        </h6>
                      </b-col>

                      <b-col cols="2" class="text-right">
                        <h6 class="display-new-71 mb-0">
                          {{ formatPrice(product.sale_orders_purchas_price) }}
                        </h6>
                      </b-col>

                      <b-col cols="3" class="text-right">
                        <h6 class="display-new-71 mb-0">
                          {{ formatPrice(product.sale_orders_total) }}
                        </h6>
                      </b-col>

                    </b-row>
                  </div>
                </div>
                <div v-else class="mt-1">
                  <div v-for="(product, index) in item_orders" :key="product.id" class="item-row">
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
                          {{ formatPrice(product.sale_orders_quentity) }}
                        </h6>
                      </b-col>

                      <b-col cols="2" class="text-right">
                        <h6 class="display-new-71 mb-0">
                          {{ formatPrice(product.sale_orders_purchas_price) }}
                        </h6>
                      </b-col>

                      <b-col cols="3" class="text-right">
                        <h6 class="display-new-71 mb-0">
                          {{ formatPrice(product.sale_orders_total) }}
                        </h6>
                      </b-col>

                    </b-row>
                  </div>
                </div>
                <div class="total"></div>
                <b-row>
                  <b-col cols="6" class="pr-5">
                    <div class="payment-box">
                      <div class="payment-row display-new-70">
                        <span>Cash Payment Rs.</span>
                        <span> {{ formatPrice(orders.sale_orders_cash) }}</span>
                      </div>

                      <div class="payment-row display-new-70">
                        <span> CHQ Payment Rs.</span>
                        <span v-if="orders.sale_orders_cheque > 0"> {{ formatPrice(orders.sale_orders_cheque) }}</span>
                        <span v-else> -</span>
                      </div>

                      <div class="payment-row display-new-70">
                        <span> Card Payment Rs.</span>
                        <span v-if="orders.sale_orders_hold > 0"> {{ formatPrice(orders.sale_orders_hold) }}</span>
                        <span v-else> -</span>
                      </div>

                      <div class="payment-row display-new-73">
                        <span> Credit Rs.</span>
                        <span v-if="orders.sale_orders_credit > 0"> {{ formatPrice(orders.sale_orders_credit) }}</span>
                        <span v-else> -</span>
                      </div>
                      <!-- <div v-if="orders.sale_orders_hold > 0" class="payment-row display-new-70">
                      <span>Company Hold Rs.</span>
                      <span> {{ formatPrice(orders.sale_orders_hold) }}</span>
                    </div>
                     <div v-else class="payment-row display-new-70">
                       <span>Balance Rs.</span>
                      <span>
                        0.00
                      </span>
                    </div> -->
                    </div>
                  </b-col>
                  <b-col cols="6" class="pl-5">
                    <div class="payment-box">
                      <div class="payment-row display-new-70">
                        <span>Gross Amount </span>
                        <span> {{ formatPrice(orders.sale_orders_subtotal) }}</span>
                      </div>

                      <div class="payment-row display-new-70">
                        <span> Transport </span>
                        <span v-if="orders.sale_orders_transpoart > 0"> {{ formatPrice(orders.sale_orders_transpoart)
                        }}</span>
                        <span v-else> 0.00</span>
                      </div>

                      <div class="payment-row display-new-70">
                        <span> Labour Charge </span>
                        <span v-if="orders.sale_orders_labour_charge > 0"> {{
                          formatPrice(orders.sale_orders_labour_charge) }}</span>
                        <span v-else> 0.00</span>
                      </div>

                      <div class="payment-row display-new-73">
                        <span>Net Total Rs.</span>
                        <span> {{ formatPrice(orders.sale_orders_total) }}</span>
                      </div>
                    </div>
                  </b-col>
                </b-row>


                <b-row class="mt-5">
                  <b-col cols="4">
                    <div>
                      <h5 class="d-flex justify-content-center title display-new-name ml-3">
                        .................................................
                      </h5>
                    </div>
                    <h4 class="d-flex justify-content-center title display-new-name ml-3">
                      Prepared By</h4>
                  </b-col>
                  <b-col cols="4">
                    <div>
                      <h5 class="d-flex justify-content-center title display-new-name ml-3">
                        .................................................
                      </h5>
                    </div>
                    <h4 class="d-flex justify-content-center title display-new-name ml-3">
                      Checked By</h4>
                  </b-col>
                  <b-col cols="4">
                    <div>
                      <h5 class="d-flex justify-content-center title display-new-name ml-3">
                        .................................................
                      </h5>
                    </div>

                    <h4 class="d-flex justify-content-center title display-new-name ml-3">
                      Approved By</h4>

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

    </section>
  </div>
</template>

<script>
import {
  BImg,
  BAlert,
  BLink,
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
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BListGroup,
  BListGroupItem,
  BModal,
  BOverlay,
  BPagination,
  BRow,
  BCardText,
  BSidebar,
  BTable,
  VBModal,
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
import order from "@/apis/modules/order";
import admin from "@/apis/modules/admin";
import item from "@/apis/modules/item";
import VueBarcode from 'vue-barcode';

export default {
  components: {
    VueBarcode,
    BImg,
    BTable,
    BAvatar,
    BBadge,
    BLink,
    BCardText,
    BRow,
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
      new_cash: 0,
      new_card: 0,
      new_cheque: 0,
      new_credit: 0,
      isLoading: false,
      order_cash: 0,
      order_total: 0,
      item_orders: [],
      userData: JSON.parse(localStorage.getItem('userData')),
      orders: {},
      loading: false,
      assign_worker_id: '',
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      items: [],
    };
  },
  watch: {
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),

    remainingRows() {
      const totalRows = 12;
      return totalRows - this.item_orders.length > 0 ? totalRows - this.item_orders.length : 0;
    },
  },
  mounted() {
    this.saleOrderDetails()
  },
  methods: {

    formatDate(date) {
      if (!date) return ''

      const d = new Date(date)

      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },

    formatTime(time) {
      if (!time) return ''

      return new Date('1970-01-01T' + time)
        .toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
    },

    formatIndex(index) {
      return (index + 1).toString().padStart(2, '0');
    },

    formatPrice(value) {
      return Number(value)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    getAddressPart(address, part) {
      if (!address) return '';
      const parts = address.split(/,(?=[^,]*$)/);
      return parts[part]?.trim() || '';
    },




    getProcessedItemName(itemName) {
      return itemName.split('*')[0].trim();
    },

    async addStore(id) {
      try {
        this.isLoading = true
        const response = await item.addStore(id)
        this.userDetails()
        this.saleOrderDetails()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async saleOrderDetails() {
      try {
        const response = await order.pastSaleOrderDetails(this.$route.params.id)
        this.orders = response.data.data

        this.saleOrderList(this.orders.sale_orders_id)
      } catch (error) {
      }
    },


    async saleOrderList(id) {
      try {
        const response = await order.saleOrderList(id)
        this.item_orders = response.data.data
      } catch (error) {
        this.tableLoading = false;
      }
    },




    async deleteOrder(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to cancel this order?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, cancel',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await item.deleteSaleOrder(id)
            this.showSuccessMessage('Order has been canceld')
            this.$router.push('/order_list')
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
      }
    },


    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.cash_status = valid
      this.cheque_status = valid
      return valid
    },

    resetModalPrice() {
      this.new_cash = 0
      this.new_card = 0
      this.new_cheque = 0
      this.cash_status = null
      this.cheque_status = null
    },

    handleOkPrice(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitPrice()
    },

    async handleSubmitPrice() {
      // Exit when form is not valid
      if (!this.checkFormValidityPrice()) {
        return;
      }

      try {
        await this.companyPrice(
          this.new_cash,
          this.new_card,
          this.new_cheque
        );

        // Close modal
        this.$nextTick(() => {
          this.$refs['my-modal-price'].toggle('#toggle-btn-price');
        });

      } catch (error) {
        // console.error(error);
        // this.showErrorMessage('Something went wrong');
      }
    },


    async companyPrice(new_cash = 0, new_card = 0, new_cheque = 0) {

      const today = new Date();
      const year = today.getFullYear();

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const month = monthNames[today.getMonth()];
      const formattedMonth = `${year}-${month}`;

      // Convert safely to numbers
      const cash = parseFloat(new_cash) || 0;
      const card = parseFloat(new_card) || 0;
      const cheque = parseFloat(new_cheque) || 0;

      const totalPaid = cash + card + cheque;
      const formattedPrice = parseFloat(this.orders.sale_orders_credit) || 0;

      // Credit calculation
      const new_credit = formattedPrice - totalPaid;

      // Validation
      if (totalPaid > formattedPrice) {
        this.showErrorMessage(
          `Total Amount not matching payment`
        );
        return;
      }

      try {
        this.isLoading = true;

        const payload = {
          year,
          month: formattedMonth,
          order_id: this.$route.params.id,
          new_cash: cash,
          new_card: card,
          new_cheque: cheque,
          new_credit,
          cashier_id: JSON.parse(localStorage.getItem('userData')).id,
        };

        await item.submitSaleNewCredit(this.$route.params.id, payload);

        this.showSuccessMessage('Payment added successfully');

        await this.saleOrderDetails();

      } catch (error) {
        console.error(error);
        //  this.showErrorMessage('Failed to submit payment');

      } finally {
        this.isLoading = false;
      }
    },



    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

    dataRefrrsh() {
      this.$refs.table.refresh();
    },
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
  font-size: 12px;
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

.header-card {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
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
.back-btn {
  background: linear-gradient(135deg, #1e3a8a, #1e3a8a);
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