<template>
  <div>
      <section class="invoice-preview-wrapper">
                  <b-card no-body class="invoice-actions p-1 bg-primary rounded p-1">
                          <b-row>
                              <b-col cols="1">
                              <feather-icon @click="$router.push('/return_order_list')" icon="ChevronLeftIcon" class="text-white" size="54"/>
                              </b-col>
                              <b-col cols="10">
                              <h3 class="text-white d-flex justify-content-center">
                              <span class="mt-1 text-white">Past Sale Return Order (  S_ORD  {{ this.$route.params.id }} ) </span></h3>
                              </b-col>
                          </b-row>
                          </b-card>
                  <b-card>
                      <b-row class="invoice-actions">
                          <b-col lg="6" md="6" sm="12">
                              <div class="ml-2">
                                  <h4 class="text-capitalize mt-2">
                                      Bill Number
                                  </h4>
                                  <b-card-text>
                                      {{ orders.bill_number  }}
                                  </b-card-text>
                                  </div>

                                  <div class="ml-2">
                              <h4 class="text-capitalize mt-2">
                                  Sub Total
                              </h4>
                              <b-card-text>
                                  <div>
                                  Rs:  {{ (orders.subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                  </div>
                              </b-card-text>
                              </div>
                              <div class="ml-2">
                              <h4 class="text-capitalize mt-2">
                                  Discount
                              </h4>
                              <b-card-text>
                                  <div>
                                  Rs:  {{ (orders.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                  </div>
                              </b-card-text>
                              </div>
                                  <div class="ml-2">
                              <h4 class="text-capitalize mt-2">
                                  Total Amount
                              </h4>
                              <b-card-text>
                                  <div>
                                  Rs:  {{ (orders.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                  </div>
                              </b-card-text>
                              </div>
                          </b-col>
                          <b-col lg="6" md="6" sm="12">
                                  <div class="ml-2">
                                  <h4 class="text-capitalize mt-2">
                                      Date & Time
                                  </h4>
                                  <b-card-text>
                                  {{ orders.order_date  }} |  {{ orders.order_time  }}
                                  </b-card-text>
                                  </div>
                                  <div class="ml-2">
                                  <h4 class="text-capitalize mt-2">
                                      Accountant
                                  </h4>
                                  <b-card-text>
                                    {{ orders.users_user_name  }}
                                  </b-card-text>
                                  </div>
                                  <b-button
                                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                                      variant="primary"
                                      class="mb-75 mt-2"
                                      @click="printInvoice"
                                  >
                                      invoice
                                  </b-button>
                          </b-col>
                          
                      </b-row>
                      </b-card>
                      <b-card class="invoice-actions" v-if="item_order_length > 0">
                  
                      <div>
                                  <h4 class="d-flex align-items-center justify-content-start mb-1">
                                  Order Items List :   ( Rs:  {{ (orders.total).toString(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }} )
                                  </h4>
                      </div>
                      <table class="table table-hover shopping-cart-wrap table-responsive">
                                          <thead   >
                                              <tr>
                                              <th scope="col" style="width: 40%">Item Name</th>
                                              <th scope="col" style="width: 30%">QTY</th>
                                              <th scope="col" style="width: 30%">sale Price</th>
                                              <th scope="col" style="width: 30%">Total Price</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr v-for="product in item_orders" :key="product.id" >
                                              <td>
                                                  <figure class="media">
                                                      <figcaption class="media-body mt-1">
                                                          <h6 class="title text-truncate"> {{ product.item_name }} </h6>
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
                                                          <h6 class="title text-truncate">Rs: {{ (product.return_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                                      </figcaption>
                                                  </figure>
                                              </td>
                                              <td>
                                                  <figure class="media">
                                                      <figcaption class="media-body mt-1">
                                                          <h6 class="title text-truncate">Rs: {{ (product.total).replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </h6>
                                                      </figcaption>
                                                  </figure>
                                              </td>
                                              </tr>
                                              
                                          </tbody>
                                          </table>
                                      </b-card>

                 <div class="d-md-none d-lg-none">
                  <!-- <div> -->
                      <b-col cols="12">
                            <b-card
                            no-body
                            class="invoice-preview-card"
                          >
                          <b-row>
                                <b-col  cols="6">
                          <b-row>
                            <b-col  cols="11">
                              <b-row class="mr-50">
                                <b-col  cols="11">
                                    <div>
                                  <div  class="d-flex justify-content-center">
                                  <b-img
                                        src="@/assets/images/logo/slogo.png"
                                      width="100px"
                                        />
                                </div>
                                <h5 class="display-new-5  font-weight-bolder d-flex justify-content-center mb-25">
                       
                                  T B S Sarusara Products
                                                </h5>
                                                <h5 class="display-new-7  font-weight-bolder d-flex justify-content-center mb-25">
                                                  අංක 446, හුලංදාව, මොනරාගල
                                                </h5>
                                                <h4 class="display-new-6  font-weight-bolder d-flex justify-content-center mb-25">
                                                055 22 77 230
                                                </h4>
                                                <h5 class="display-new-7  font-weight-bolder d-flex justify-content-center mb-25">
                                                 ( Return Bill )
                                                </h5>
                                </div>
                                <b-row class="mt-2">
                                  <b-col cols="12">
                                    <h1 class="display-new-1  font-weight-bolder  mb-25">
                                      බිල්පත් අංකය : {{  orders.bill_number  }}
                                    </h1>
                                  </b-col>
                                  <b-col cols="6">
                                      <h1 class="display-new-1  font-weight-bolder  mb-25">
                                        දිනය : {{ orders.order_date }}
                                      </h1>
                                    </b-col>
                                    <b-col cols="6">
                                      <h1 class="display-new-1  font-weight-bolder  mb-25">
                                        වේලාව :{{ orders.order_time }} 
                                      </h1>
                                    </b-col>
                                  <b-col cols="12">
                                    <h1 class="display-new-1  font-weight-bolder  mb-25">
                                      මුදල් අයකැමි : {{  userData.user_name }} 
                                    </h1>
                                  </b-col>
                                  </b-row>
                                  <div class="mt-50 custom-border">

                                      <b-row>
                                        <b-col cols="3">
                                          <h1 class="display-new-2 mt-50 ml-5 d-flex justify-content-end  font-weight-bolder  mb-25">
                                            ප්‍රමාණය
                                          </h1>
                                        </b-col>
                                        <b-col cols="5">
                                          <h1 class="display-new-2 mt-50   d-flex justify-content-end font-weight-bolder  mb-25">
                                            සා. මිල
                                          </h1>
                                        </b-col>
                                        <b-col cols="4">
                                          <h1 class="display-new-2 mt-50  d-flex justify-content-center  font-weight-bolder  mb-25">
                                            එකතුව
                                          </h1>
                                        </b-col>
                                      </b-row>
                                </div>
                                  <div class="mt-1">
                                    <div v-for="product in item_orders" :key="product.id" >
                                      <b-row class="mt-50">
                                        <b-col cols="11">
                                        <h1 class="display-new-3  font-weight-bolder ">
                                          {{ getProcessedItemName(product.item_name) }}
                                        </h1>
                                      </b-col>
                                      </b-row>
                                      <b-row>
                                        <b-col cols="3">
                                          <h1 v-if="product.unit != 'Pcs'" class="display-new-3  d-flex justify-content-end   mb-0">
                                            {{ product.quentity }} {{  product.unit }}
                                          </h1>
                                          <h1 v-else class="display-new-3  d-flex justify-content-end   mb-0">
                                            {{ Math.round(product.quentity) }} {{  product.unit }}
                                          </h1>
                                        </b-col>
                                        <b-col cols="5">
                                          <h1 class="display-new-3  d-flex justify-content-end  font-weight-bolder  mb-0">
                                            
                                            {{ (product.return_price * 1).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                          </h1>
                                        </b-col>
                                    
                                        <b-col cols="4">
                                            <h1 class="display-new-3  d-flex justify-content-end  font-weight-bolder  mb-0">
                                              {{(product.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                                            </h1>
                                        </b-col>
                                      </b-row>
                                      <hr class="custom-dashed-border">
                                      </div>
                                    </div>
                                    <hr class="custom-border">
                                    <b-row>
                                        <b-col cols="6">
                                          <h1 class="display-new-3  font-weight-bolder ">
                                            ලාභය
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3  font-weight-bolder ">
                                                <dd class="text-right"> {{(orders.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                    <b-row>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            එකතුව
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3   ">
                                            <dd class="text-right"> {{(order_total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                        </b-row>

                                  <hr class="custom-dashed-border">
                                  <b-row class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-7 font-weight-bolder ">
                                            මුළු මුදල
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-7 font-weight-bolder ">
                                            <dd class="text-right mt-1 b">   {{(orders.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}  </dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <hr class="custom-dashed-border">
                                  <b-row class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-3  ">
                                            මුදල් :
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            <dd class="text-right"> {{(order_cash).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <b-row v-if="orders.card > 0" class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-3  ">
                                            කාඩ් :
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            <dd class="text-right"> {{(orders.card).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <b-row v-if="orders.cheque > 0" class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-3  ">
                                            බැංකු චෙක්පත් :
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            <dd class="text-right"> {{(orders.cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <b-row v-if="orders.credit > 0" class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-3  ">
                                            ණය මුදල :
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            <dd class="text-right"> {{(orders.credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <b-row class="mt-25">
                                        <b-col cols="6">
                                          <h1 class="display-new-3  ">
                                            භාණ්ඩ ගණන
                                          </h1>
                                        </b-col>
                                        <b-col cols="6">
                                          <h1 class="display-new-3 ">
                                            <dd class="text-right">{{ item_orders.length }}</dd> 
                                          </h1>
                                        </b-col>
                                  </b-row>
                                  <h1 class="display-new-1  font-weight-bolder d-flex justify-content-center ">
                                    ස්තුතියි, නැවත එන්න!
                                  </h1>
                                    <h1 class="display-new-4 d-flex font-weight-bolder justify-content-center mb-1 ">
                                        <i> Software By @ Easyones Soft - 076 283 38 38 </i>
                                    </h1>
                                </b-col>
                                </b-row>
                                </b-col>
                                </b-row>
                                </b-col>
                                <b-col  cols="6">
                                
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
      order_cash: 0,
      order_total:0,
      order_wattam:0,
      item_orders: [],
      item_order_length: 0,
      userData: JSON.parse(localStorage.getItem('userData')),
      orders: {},
      loading: false,
      assign_worker_id:'',
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
  },
  mounted() {
     this.saleOrderDetails()
     this.saleOrderList()
  },
  methods: {


    getProcessedItemName(itemName) {
    return itemName.split('*')[0].trim();
  },


    async saleOrderDetails(){
      try {
        const response = await order.saleReturnOrderDetails(this.$route.params.id)
        this.orders = response.data.data
        this.order_cash = parseFloat(this.orders.cash)
        this.order_total = parseFloat(this.orders.subtotal) - parseFloat(this.orders.discount)
        this.order_wattam = parseFloat(this.order_total)
        } catch (error) {
        }
    },



    async saleOrderList() {
      try {
        const response = await order.saleReturnOrderList(this.$route.params.id)
           this.item_orders = response.data.data
           this.item_order_length = response.data.data.length
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
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


.display-4-5 {
      font-size: 2.8rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }

.display-5-5 {
      font-size: 2.2rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-red {
      font-size: 1.3rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #ff0000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-name {
      font-size: 1.3 rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }

  .display-new-1 {
      font-size: 1.1rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-2 {
      font-size: 1.2rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000;  /* Adjust the margin as needed */
  }
  .display-new-3 {
      font-size: 1.1rem; 
      color: #000000; /* Adjust the margin as needed */
  }
  .display-new-9 {
      font-size: 1.3rem; 
      color: #000000; /* Adjust the margin as needed */
  }
  .display-new-4 {
      font-size: 0.84rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-5 {
      font-size: 2.0rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-6 {
      font-size: 2.0rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .display-new-7 {
      font-size: 1.5rem; /* Adjust the font size as needed */
      font-weight: bold;
      color: #000000; /* Adjust the color as needed */
      margin-bottom: 0.625rem; /* Adjust the margin as needed */
  }
  .custom-border {
      border: 1px solid; /* Adjust the border size as needed */
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
              > .col-12 {
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
