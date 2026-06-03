<template>
  <div>
    <b-card no-body class="p-1 bg-primary rounded p-1">
            <b-row>
              <b-col cols="1">
               <feather-icon @click="$router.push('/return-ordres?tab=2')" icon="ChevronLeftIcon" class="text-white" size="54"/>
              </b-col>
              <b-col cols="10">
                <h3 class="text-white d-flex justify-content-center">
              <span class="mt-1 text-white">Payment Pending Return Order (  H_ORD  {{ this.$route.params.id }} ) </span></h3>
              </b-col>
            </b-row>
          </b-card>
  <b-card>
  <b-row>
      <b-col lg="6" md="6" sm="6">
          <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Number of Items
              </h4>
              <b-card-text>
                    {{ orders.order.return_items_count  }}
              </b-card-text>
              </div>
              <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                Sub Total Amount
              </h4>
              <b-card-text>
                Rs:  {{ (orders.order.subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </b-card-text>
              </div>
              <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Discount
              </h4>
              <b-card-text>
                Rs:  {{ (orders.order.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </b-card-text>
              </div>
              <div class="ml-2">
          <h4 class="text-capitalize mt-2">
              Total Amount
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ (orders.order.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
       
          <div class="ml-2">
          <h4 class="text-capitalize mt-2">
              Paid Amount
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ (orders.order.payment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
          <div class="ml-2">
          <h4 class="text-capitalize mt-2">
              Amount Due
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ ((orders.order.total - orders.order.payment).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
      </b-col>
      <b-col lg="6" md="6" sm="6">
          <div v-if="orders.order.cash > 0" class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Cash
              </h4>
              <b-card-text>
                    Rs:  {{ (orders.order.cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </b-card-text>
              </div>
              <div v-if="orders.order.card > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
              Card
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ (orders.order.card).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
          <div v-if="orders.order.cheque > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
              Cheque
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ (orders.order.cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
          <div v-if="orders.order.credit > 0" class="ml-2">
          <h4  class="text-capitalize mt-2">
              Credit 
              <b-button
            class="single-line-text" variant="primary"
            id="toggle-btn-price"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-modal.modal-prevent-closing-price
          >
          <span class="align-middle"> Add Payment</span>
          </b-button>
          <b-modal
            id="modal-prevent-closing-price"
            centered
            ref="my-modal-price"
            :title="`Add New Return Payment  ( Rs:  ${formattedPrice} )`"
            ok-title="Submit"
            cancel-variant="outline-secondary"
            @show="resetModalPrice"
            @hidden="resetModalPrice"
            @ok="handleOkPrice"
          >
            <form
              ref="form"
              @submit.stop.prevent="handleSubmitPrice"
            >

                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Cash Amount"
                      label-for="cash"
                      invalid-feedback="Cash is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="new_cash"
                          :state="cash_status"
                          placeholder="Enter Cash Amount"
                      />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Card Amount"
                      label-for="card"
                      invalid-feedback="Card is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="new_card"
                          :state="card_status"
                          placeholder="Enter Card Amount"
                      />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Cheque Amount"
                      label-for="cheque"
                      invalid-feedback="Cheque is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="new_cheque"
                          :state="cheque_status"
                          placeholder="Enter Cheque Amount"
                      />
                  </b-form-group>
                </b-col>
            </form>
          </b-modal>
          </h4>
          <b-card-text>
              <div>
                 Rs:  {{ (orders.order.credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
              </div>
          </b-card-text>
          </div>
          <div v-if="orders.order.cash > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
             Cash Status
          </h4>
          <b-card-text>
              <div>
                
                <b-badge  style="padding: 10px" variant="light-success">
                 Done
                </b-badge>
              </div>
          </b-card-text>
          </div>
       
          <div v-if="orders.order.card > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
              Card Status
          </h4>
          <b-card-text>
              <div>
                <b-badge v-if="orders.order.card_status == '1'"  style="padding: 10px" variant="light-warning">
                  Pending
                </b-badge>
                <b-badge v-if="orders.order.card_status == '2'"  style="padding: 10px" variant="light-success">
                 Done
                </b-badge>
              </div>
          </b-card-text>
          </div>
          <div v-if="orders.order.cheque > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
              Cheque Status
          </h4>
          <b-card-text>
              <div>
                <b-badge v-if="orders.order.cheque_status == '1'"  style="padding: 10px" variant="light-warning">
                  Pending
                </b-badge>
                <b-badge v-if="orders.order.cheque_status == '2'"  style="padding: 10px" variant="light-success">
                 Done
                </b-badge>
              </div>
          </b-card-text>
          </div>
          <div v-if="orders.order.credit > 0" class="ml-2">
          <h4 class="text-capitalize mt-2">
              Credit Status
          </h4>
          <b-card-text>
              <div>
                <b-badge v-if="orders.order.credit_status == '1'"  style="padding: 10px" variant="light-warning">
                  Pending
                </b-badge>
                <b-badge v-if="orders.order.credit_status == '2'"  style="padding: 10px" variant="light-success">
                 Done
                </b-badge>
              </div>
          </b-card-text>
          </div>
      </b-col>
  </b-row>
  </b-card>
  <b-card> 

   <div>
              <h4 class="d-flex align-items-center justify-content-start mb-1">
                Order Items List :   ( Rs:  {{ (orders.order.subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }} )
              </h4>
  </div>
    <table class="table table-hover shopping-cart-wrap table-responsive">
                       <thead   >
                          <tr>
                             <th scope="col" style="width: 40%">Item Name</th>
                             <th scope="col" style="width: 30%">QTY</th>
                             <th scope="col" style="width: 30%">Return Price</th>
                             <th scope="col" style="width: 30%">Total</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr v-for="product in orders.item_orders" :key="product.id" >
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> {{ product.item_name }} | {{ product.unit }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> {{ product.quentity }} {{ product.unit }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate">Rs: {{ (product.return_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> Rs: {{ (product.quentity * product.return_price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                          </tr>
                          
                       </tbody>
                      </table>
                    </b-card>

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

export default {
  components: {
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

  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      new_cash: 0,
      new_card: 0,
      new_cheque: 0,
      new_credit: 0,
      item_orders: [],
      item_order_length: 0,
      price: '',
      priceState: null,
      submittedPriceNames: [],
      userData: JSON.parse(localStorage.getItem('userData')),
      orders: {},
      loading: false,
      assign_worker_id:'',
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      bank_amount: 0,
      today_income: 0,
      today_start_amount: 0,
      
      items: [],
    };
  },
  watch: {
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {
    formattedPrice() {
      return this.orders.order.credit;
    },

    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
     this.hardwareReturnOrderDetails()
     this.bankCardData()
    }
     else{
      this.$router.push('/')
     }
  },
  methods: {

    async bankCardData(){
      const status = await admin.getAdminDashboards(1)
        this.bank_amount = status.data.bank_card
        this.today_income = status.data.today_payment_income
        this.today_start_amount  = status.data.today_payment_start_amount
    },

    async hardwareReturnOrderDetails(){
      try {
        const response = await order.hardwareReturnOrderDetails(this.$route.params.id)
        this.orders = response.data
        } catch (error) {
        }
    },
    

    checkFormValidityPrice() {
        const valid = this.$refs.form.checkValidity()
        this.cash_status = valid
        this.card_status = valid
        this.cheque_status = valid
        return valid
      },

      resetModalPrice() {
        this.new_cash = 0
        this.new_card = 0
        this.new_cheque = 0
        this.cash_status = null
        this.card_status = null
        this.cheque_status = null
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
          this.new_cash,
          this.new_card,
          this.new_cheque)

        this.companyPrice(
          this.new_cash,
          this.new_card,
          this.new_cheque
        )
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs['my-modal-price'].toggle('#toggle-btn-price')
        })
      },
      

      async companyPrice(new_cash, new_card, new_cheque) {

        this.todayDate = new Date();
      const year = this.todayDate.getFullYear(); // Get the current year
  
      const monthNumber = this.todayDate.getMonth(); // Get the current month (0-11)
      const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[monthNumber];
  
      const formattedYear = year;
      const formattedMonth = year + '-' + month;

      if(this.new_card == 0){
      }else{
        this.card_status = 1
      }

      
      if(this.new_cheque == 0){
      }else{
        this.cheque_status = 1
      }
      
      this.new_credit = parseFloat(this.formattedPrice) - (parseFloat(new_cash) + parseFloat(new_card) + parseFloat(new_cheque));

      if(this.new_credit == 0){
        this.credit_status = 2
      }else{
        this.credit_status = 1
      }

      if(this.formattedPrice >= (parseFloat(new_cash) + parseFloat(new_card) + parseFloat(new_cheque) ) ){

     
        try {
                this.payload = {
                  year: formattedYear,
                  month: formattedMonth,
                  order_id: this.$route.params.id,
                  new_cash: new_cash,
                  new_card: new_card,
                  new_cheque: new_cheque,
                  new_credit: this.new_credit,
                  card_status: this.card_status,
                  cheque_status: this.cheque_status,
                  credit_status: this.credit_status,
                  cashier_id: JSON.parse(localStorage.getItem('userData')).id,
                }
                this.isLoading = true
                const response = await item.submitHardwareReturnNewCredit(this.$route.params.id, this.payload)
                this.showSuccessMessage('Add Payment Successfully')
                await this.hardwareReturnOrderDetails()
                this.$refs.table.refresh();
                
                this.isLoading = false
              } catch (error) {

                this.isLoading = false
              }
            }
            else{
              this.showErrorMessage('Total Amount ( Rs: '+ this.formattedPrice + ' ) not match Amount')
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

div#dropdown-1 .btn-outline-danger {
  border: none !important;
}

.per-page-selector {
width: 90px;
}

.single-line-text {
  width: 180px;
}

.invoice-filter-select {
min-width: 250px;
}

::v-deep .vs__selected-options {
  flex-wrap: nowrap;
}

::v-deep .vs__selected {
  width: 100px;
}

button {
  height: 38px;
}
</style>
