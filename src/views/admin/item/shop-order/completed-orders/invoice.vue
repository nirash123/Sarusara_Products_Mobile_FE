<template>
  <div>
    <section class="invoice-preview-wrapper">

<b-row
  class="invoice-preview"
>
<b-col
    cols="12"
    md="5"
    xl="5"
    class="invoice-actions"
  >
    <b-card>
      <b-form
            class="auth-login-form mt-2"
            @submit.prevent
        >
        <h4 class="mt-2 mb-2">Products List :</h4> 
        <b-row class="mb-2">
            <b-col sm="12" md="2" lg="2" >
            </b-col>
            <b-col sm="12" md="6" lg="6">
              Product Name
            </b-col>
            <b-col sm="12" md="4" lg="4">
              Quantity
            </b-col>
          </b-row>
        <div v-for="item in items" :key="item.id">
          <b-row class="mt-1">
            <b-col sm="12" md="2" lg="2" >
              <b-form-checkbox
                v-model="item.active_status"
                value= "1"
                class="custom-control-primary"
                @change="changeStatus(item.id)"
              >
              </b-form-checkbox>
            </b-col>
            <b-col sm="12" md="6" lg="6">
              {{ item.item_name }}
            </b-col>
            <b-col sm="12" md="4" lg="4">
              {{ item.quentity }}
            </b-col>
          </b-row>
          </div>
      
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
        @click="$router.push('/shop-ordres?tab=3')"
        >
       Cancel
      </b-button>
    </b-card>
  </b-col>
  
<b-col
    cols="12"
    md="12"
    xl="12"
    class="invoice-actions"
  >
  <b-card-body class="invoice-preview pb-0">
      <b-row>
          <b-col cols="4" v-for="(item, index) in flattenedItems" :key="index" >
            <b-card>
              <div class="d-flex justify-content-center ">
                <div class="d-flex justify-content-center">
                  <div class="d-flex justify-content-center" >
                      <th class="text-black text-truncate  ">
                          <h6 style="font-size: 2.0rem; font-weight: bold;">T B S Sarusara Products</h6>
                          <div class="barcode-container">
                                  <vue-barcode
                                    class="d-flex justify-content-center barcode"
                                    :value="item.item_code"
                                    :format="format"
                                    :width="2"
                                    :height="50"
                                    :display-value="false"
                                  />
                                </div>
                          <div class="d-flex justify-content-center" ><h1 style="font-size: 1rem; font-weight: bold;">{{ (item.item_code).slice(0, 30) }}</h1></div>
                          <div class="d-flex justify-content-center">
                              <th class="text-black text-truncate">
                                  <h6 style="font-size: 1.5rem; font-weight: bold;">Rs: {{ (item.sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h6>
                              </th>
                          </div>
                          <div class="d-flex justify-content-center">
                            <h1  style="font-size: 1.4rem; font-weight: bold;">{{  getProcessedItemName(item.item_name).slice(0, 23) }}</h1>
                          </div>
                      
                      </th>
                  </div>
                  </div>
                  </div>
            </b-card>
          </b-col>
      </b-row>
  </b-card-body>
  </b-col>
    <b-card
       class="d-md-none d-lg-none invoice-preview-card"
    >
          

    <b-card-body class="invoice-padding pb-0">
        <b-row>
            <b-col cols="30" v-for="(item, index) in flattenedItems" :key="index" >
              <b-row style="margin-top: 10rem; ">
                <div class="rotate-card d-flex justify-content-center">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex justify-content-center" >
                        <th class="text-black text-truncate  ">
                            <h6 style="font-size: 17rem; margin-top: 10rem;">.</h6>
                            <h6 style="font-size: 14.5rem; margin-top: 12rem; font-weight: bold;">T B S Sarusara Products</h6>
                            <div class=" barcode-container">
                                    <vue-barcode
                                      class="d-flex justify-content-center barcode"
                                      :value="item.item_code"
                                      :format="format"
                                      :width="barcodeWidth"
                                      :height="500"
                                      :display-value="false"
                                    />
                                  </div>
                            <div class="font-large-4 d-flex justify-content-center" ><h1 style="font-size: 7rem; font-weight: bold;">{{ (item.item_code).slice(0, 30) }}</h1></div>
                            <div class="d-flex justify-content-center">
                                <th class="text-black text-truncate">
                                    <h6 style="font-size: 15rem; font-weight: bold;">Rs: {{ (item.sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h6>
                                </th>
                            </div>
                            <div class="d-flex justify-content-center">
                                <h1  style="font-size: 13rem; font-weight: bold;">{{  getProcessedItemName(item.item_name).slice(0, 23) }}</h1>
                            </div>
                        
                        </th>
                    </div>
                    </div>
                    </div>
              </b-row>
              
          
            </b-col>
        </b-row>
    </b-card-body>

    </b-card>
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
import VueBarcode from 'vue-barcode';

export default {
  components: {
    VueBarcode,
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
      barcodeWidth: 25.0,
      items: [],
      print_items: [],
      avatar: require('@/assets/images/avatars/shop.png'),
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters(["currentUser"]),

    flattenedItems() {
    const flattened = [];
    this.print_items.forEach((item) => {
      const quantity = parseInt(item.quentity);
      for (let i = 0; i < quantity; i++) {
        flattened.push(item);
      }
    });
    return flattened;
  },
    
  },
  methods: {

    truncateProductName(name, maxLength) {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
  },

  
  getProcessedItemName(itemName) {
    return itemName.split('#')[0].trim();
  },

    async changeStatus(id){
      await admin.changeHardwareStatus(id)
      await this.companyOrderPrintList()
    },


    async companyOrderList(){
        try {
          const response = await admin.getHardwareOrderList(this.$route.params.id)
          this.items = response.data.data
          await this.companyOrderPrintList()
          } catch (error) {
            
          }
      },

  async companyOrderPrintList(){
        try {
          const response1 = await admin.getHardwareOrderPrintList(this.$route.params.id)
          this.print_items = response1.data.data
          } catch (error) {
            
          }
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
  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){
       this.companyOrderList()
    }
     else{
      this.$router.push('/')
     }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.barcode-container {
display: flex;
justify-content: center;
max-width: 2100px; 
overflow: hidden; /* Optional: to hide overflow if barcode exceeds max width */
}
.barcode {
  width: 100%; 
  
}

.rotate-card {
  transform: rotate(90deg);
}

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
  border: 1px solid #0b6eca;
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
