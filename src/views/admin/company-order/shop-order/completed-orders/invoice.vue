<template>
  <div>
    <section class="invoice-preview-wrapper">

<b-row
  class="invoice-preview"
>
  <b-col
    cols="12"
    xl="9"
    md="8"
  >
    <b-card
      no-body
      class="invoice-preview-card"
    >
      <!-- Header -->
      <b-card-body class="invoice-padding pb-0">
        <b-row>
          <b-col cols="6">
                    <b-img
                  src="@/assets/images/logo/slogo.png"
                  width="150"
                  />
              <!-- <h2 class=" invoice-logo" style="color: #359be9;">
                  T B S Sarusara Products
              </h2> -->
                  
          </b-col>
          <b-col cols="6">
            <div class="d-flex justify-content-end mb-2">
            <div class="invoice-date-wrapper">
              <div>
                <div>
                  Date Issued:
                </div>
                <div>
                  Invoice Number:
                </div>
                <div>
                  Order Date:
                </div>
              </div>
              <div>
                <div class="invoice-date">
                  {{ formattedDate }}
                </div>
                <div class="invoice-date">
                 #{{ orders.order.order_id }}
                </div>
                <div class="invoice-date">
                 {{  orders.order.order_date }}
                </div>
              </div>
            </div>
          </div>
          </b-col>
        </b-row>
        <div>

          <!-- Header: Left Content -->
          <div class="d-flex justify-content-center mr-5">
            <div class="logo-wrapper ">

            </div>
          </div>

          <!-- Header: Right Content -->
          
        </div>
      </b-card-body>

      <!-- Spacer -->
     

      <!-- Invoice Client & Payment Details -->
      <b-card-body
        class="invoice-padding pt-0"
      >
        <b-row>
          <!-- Col: Invoice To -->
          <b-col cols="6">
            <h4 class="mb-2">
              Invoice From :
            </h4>
                <h4 class="card-text mb-25">
                {{ form.name }}
                </h4>
                <h4 class="card-text mb-25">
                {{ form.address}}
                </h4>
              <h4 class="card-text mb-25">
                {{ form.phone_no }}
              </h4>
              </b-col>
            <b-col cols="6">
            <h4 class="mb-2">
              Invoice To :
            </h4>
            <h4 class="card-text mb-25">
               {{ orders.shop.shop_name }}
            </h4>
            <h4 class="card-text mb-25">
              {{ orders.shop.address }}
            </h4>
            <h4 class="card-text mb-25">
              {{ orders.shop.phone_no }}
            </h4>
          </b-col>
        </b-row>
      </b-card-body>
      

       <table class="table table-hover shopping-cart-wrap table-responsive border">
                    <thead   >
                       <tr>
                          <th scope="col" style="width: 100%">Item Name</th>
                          <th scope="col" style="width: 100%">QTY</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr v-for="product in orders.item_orders" :key="product.id" >
                          <td>
                             <figure class="media">
                                <figcaption class="media-body mt-1">
                                   <h4 class="title"> {{ product.item_name }} </h4>
                                </figcaption>
                             </figure>
                          </td>
                          <td>
                             <figure class="media">
                                <figcaption class="media-body">
                                   <h4 class="title"> {{ product.quentity }} </h4>
                                </figcaption>
                             </figure>
                          </td>
                       </tr>
                       
                    </tbody>
                   </table>
      
      <div class="d-flex justify-content-end mt-1 mb-1 mr-1">
              <h6>
                  <i> Software By @ Easyones Soft - 076 283 38 38 </i>
              </h6>
          </div>
    </b-card>
  </b-col>

  <!-- Right Col: Card -->
  <b-col
    cols="12"
    md="4"
    xl="3"
    class="invoice-actions"
  >
    <b-card>
      <b-form
            class="auth-login-form mt-2"
            @submit.prevent
        >
        <h4 class="mt-2 mb-2">User Details :</h4> 
          <b-row>
            <b-col sm="12" md="12" lg="6" >
              <b-form-group
                  label="User Name"
                  label-for="name"
              >
                  <b-form-input
                      id="name"
                      v-model="form.name"
                      placeholder="Enter user name"
                  />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" lg="6">
              <b-form-group
                  label="Address"
                  label-for="address"
              >
                  <b-form-input
                      id="address"
                      v-model="form.address"
                      placeholder="Enter Address"
                  />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" lg="6">
            <b-form-group
                label="Mobile Number"
                label-for="phone"
            >
                <b-form-input
                    id="phone"
                    v-model="form.phone_no"
                    placeholder="Enter Mobile Number"
                />
            </b-form-group>
          </b-col>
 
          </b-row>
          <h4 class="my-2">Customer Details :</h4> 
          <b-row>
            <b-col sm="12" md="12" lg="6" >
              <b-form-group
                  label="Customer Name"
                  label-for="name"
              >
                  <b-form-input
                      id="name"
                      v-model="orders.shop.shop_name"
                      placeholder="Enter Shop Name"
                  />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" lg="6">
              <b-form-group
                  label="Address"
                  label-for="address"
              >
                  <b-form-input
                      id="address"
                      v-model="orders.shop.address"
                      placeholder="Enter Address"
                  />
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" lg="6">
            <b-form-group
                label="Mobile Number"
                label-for="phone"
            >
                <b-form-input
                    id="phone"
                    v-model="orders.shop.phone_no"
                    placeholder="Enter Mobile Number"
                />
            </b-form-group>
          </b-col>
          </b-row>
          
        </b-form>
      <!-- Button: Print -->
      <b-button
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="primary"
        class="mb-75 mt-2"
        block
        @click="printInvoice"
      >
        Print
      </b-button>
      <b-button
        v-ripple.400="'rgba(186, 191, 199, 0.15)'"
        variant="danger"
        class="mb-75 mt-2"
        block
        @click="$router.push('/company-orders?tab=3')"
        >
       Cancel
      </b-button>
    </b-card>
  </b-col>
</b-row>
</section>
  </div>
</template>

<script>
import {
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
  BCardBody,
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
  BSidebar,
  BTable,
  VBModal,
  BCardText,
  BImg,
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
import admin from "@/apis/modules/admin";
import order from "@/apis/modules/order";


export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
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
    BCardBody,
    BListGroupItem,
    vSelect,
    BCard,
    BModal,
    VBModal,
    BCardText,
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
    BImg,
  },
  directives: {
    Ripple,
  },

  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      orders: {},
      today: new Date().toISOString().slice(0, 10),
      date: new Date(),
      active_status:'',
  
      form:{
        name: 'T B S Sarusara Products',
        address:'No 446, Hulandawa, Monaragala',
        phone_no:'077 032 7380',
      },
    };
  },
  watch: {
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),

    formattedDate() {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return this.date.toLocaleString("en-US", options);
  },
    
  },
  methods: {
    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },

    async saleOrderData(){
      try {
        const response = await order.companyCompletedOrderDetails(this.$route.params.id)
        this.orders = response.data
        } catch (error) {
        }
      },

    refreshTable(){
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

  },
  setup() {
      const printInvoice = () => {
        window.print()
      }
      return {
        printInvoice,
      }
    },
  async mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){
       await this.saleOrderData()
    }
     else{
      this.$router.push('/')
     }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

div#dropdown-1 .btn-outline-danger {
  border: none !important;
}

 .image-container {
position: relative;
}

.custom-image {
  width: 100%;
  height: 160px;
  border-radius: 10px;
}

.text-overlay {
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
align-items: center;
justify-content: end;
background-color: rgba(0, 0, 0, 0); 
color: rgb(251, 17, 17); /* Text color */
font-size: 35px; /* Text font size */
}

.per-page-selector {
width: 90px;
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

button {
  height: 38px;
}

.newonegreen {
border: 1px solid #090909;
margin: 20px 0;
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
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
