<template>
    <div>
        <section class="invoice-preview-wrapper">
                    <b-card no-body class="invoice-actions p-1 bg-primary rounded p-1">
                            <b-row>
                                <b-col cols="1">
                                <feather-icon @click="$router.push('/return_order_list?tab=3')" icon="ChevronLeftIcon" class="text-white" size="54"/>
                                </b-col>
                                <b-col cols="10">
                                <h3 class="text-white d-flex justify-content-center">
                                <span class="mt-1 text-white">Payment Pending Sale Return Order (  S_ORD  {{ this.$route.params.id }} ) </span></h3>
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
                                <div class="ml-2">
                                    <h4 class="text-capitalize mt-2">
                                        Date & Time
                                    </h4>
                                    <b-card-text>
                                    {{ orders.order_time  }}
                                    </b-card-text>
                                    </div>
                                   
                                   
                            </b-col>
                            <b-col lg="6" md="6" sm="6">
                               <div class="ml-2">
                                    <h4 class="text-capitalize mt-2">
                                        Accountant
                                    </h4>
                                    <b-card-text>
                                     {{ orders.users_user_name  }}
                                    </b-card-text>
                                    </div>
                                    <!-- <b-button
                                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                                        variant="primary"
                                        class="mb-75 mt-2"
                                        @click="printInvoice"
                                    >
                                        invoice
                                    </b-button> -->
                                <div v-if="orders.cash > 0" class="ml-2">
                                    <h4 class="text-capitalize mt-2">
                                        Cash
                                    </h4>
                                    <b-card-text>
                                          Rs:  {{ (orders.cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                    </b-card-text>
                                    </div>
                                    <div v-if="orders.card > 0" class="ml-2">
                                <h4 class="text-capitalize mt-2">
                                    Card
                                </h4>
                                <b-card-text>
                                    <div>
                                      Rs:  {{ (orders.card).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                    </div>
                                </b-card-text>
                                </div>
                                <div v-if="orders.cheque > 0" class="ml-2">
                                <h4 class="text-capitalize mt-2">
                                    Cheque
                                </h4>
                                <b-card-text>
                                    <div>
                                      Rs:  {{ (orders.cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                    </div>
                                </b-card-text>
                                </div>
                                <div v-if="orders.credit > 0" class="ml-2">
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
                                  :title="`Add New Payment  ( Rs:  ${formattedPrice} )`"
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
                                      Rs:  {{ (orders.credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  }}
                                    </div>
                                </b-card-text>
                                </div>
                            
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
        bank_amount: 0,
        cash_status: "",
        card_status: "",
        cheque_status: "",
        new_cash: 0,
        new_card: 0,
        new_cheque: 0,
        new_credit: 0,
        item_orders: [],
        item_order_length: 0,
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
      return this.orders.credit;
    },

    ...mapGetters(["currentUser"]),
  },
    mounted() {
       this.bankCardData()
       this.saleReturnOrderDetails()
       this.saleReturnOrderList()
    },
    methods: {

      async bankCardData(){
      const status = await admin.getAdminDashboards(1)
        this.bank_amount = status.data.bank_card
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


      this.new_credit = parseFloat(this.formattedPrice) - (parseFloat(new_cash) + parseFloat(new_card) + parseFloat(new_cheque));

      if(parseInt(this.bank_amount) >= parseInt(new_cash)){

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
                  cashier_id: JSON.parse(localStorage.getItem('userData')).id,
                }
                this.isLoading = true
                const response = await item.submitSaleReturnNewCredit(this.$route.params.id, this.payload)
                this.showSuccessMessage('Add Payment Successfully')
                await this.saleReturnOrderDetails()
                this.$refs.table.refresh();
                
                this.isLoading = false
              } catch (error) {
                this.$refs.table.refresh();
                this.isLoading = false
              }
            }
            else{
              this.showErrorMessage('Total Amount ( Rs: '+ this.formattedPrice + ' ) not match Amount')
            }
          }
            else{
              this.showErrorMessage('Not enough money for pay in the bank card')
            } 

      },


      getProcessedItemName(itemName) {
      return itemName.split('*')[0].trim();
    },
  
  
      async saleReturnOrderDetails(){
        try {
          const response = await order.saleReturnOrderDetails(this.$route.params.id)
          this.orders = response.data.data
          } catch (error) {
          }
      },

  
  
      async saleReturnOrderList() {
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
  