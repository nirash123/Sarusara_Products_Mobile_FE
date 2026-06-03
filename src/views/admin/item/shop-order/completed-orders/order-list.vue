<template>
  <div>
    <b-card no-body class="p-1 bg-primary rounded p-1">
            <b-row>
              <b-col cols="1">
               <feather-icon @click="$router.push('/shop-ordres?tab=3')" icon="ChevronLeftIcon" class="text-white" size="54"/>
              </b-col>
              <b-col cols="10">
                <h3 class="text-white d-flex justify-content-center">
              <span class="mt-1 text-white">Completed Order (  H_ORD  {{ this.$route.params.id }} ) </span></h3>
              </b-col>
            </b-row>
          </b-card>
  <b-card>
  <b-row>
      <b-col lg="6" md="6" sm="12">
          <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Number of Items
              </h4>
              <b-card-text>
                    {{ orders.order.items_count  }}
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
                Order Products List :   ( Rs:  {{ (orders.order.subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }} )
              </h4>
  </div>
    <table class="table table-hover shopping-cart-wrap table-responsive">
                       <thead   >
                          <tr>
                             <th scope="col" style="width: 40%">Item Name</th>
                             <th scope="col" style="width: 20%">QTY</th>
                             <th scope="col" style="width: 20%">Company Price</th>
                             <th scope="col" style="width: 20%">Sale Price</th>
                             <th scope="col" style="width: 30%">Total</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr v-for="product in orders.item_orders" :key="product.id" >
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> {{ product.item_name }} | {{ product.unit }}</h6>
                                      <div> ( {{ (product.item_code).slice(0, 18) }} )</div>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> {{ product.quentity }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate">Rs: {{ (product.company_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate">Rs: {{ (product.sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                   </figcaption>
                                </figure>
                             </td>
                             <td>
                                <figure class="media">
                                   <figcaption class="media-body mt-1">
                                      <h6 class="title text-truncate"> Rs: {{ (product.quentity * product.company_price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
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
      item_orders: [],
      item_order_length: 0,
      submittedPriceNames: [],
      userData: JSON.parse(localStorage.getItem('userData')),
      orders: {},
      loading: false,
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
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){
     this.hardwareOrderDetails()
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


    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.priceState = valid
      return valid
    },


    async hardwareOrderDetails(){
      try {
        const response = await order.hardwareOrderDetails(this.$route.params.id)
        this.orders = response.data
        } catch (error) {
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
