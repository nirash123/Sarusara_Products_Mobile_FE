<template>
  <div>
    <b-card no-body class="p-1 bg-primary rounded p-1">
            <b-row>
              <b-col cols="1">
               <feather-icon @click="$router.push('/company-orders?tab=2')" icon="ChevronLeftIcon" class="text-white" size="54"/>
              </b-col>
              <b-col cols="10">
                <h3 class="text-white d-flex justify-content-center">
              <span class="mt-1 text-white">Pending Order (  C_ORD  {{ orders.order.id }} ) 
                <b-button
                      variant="success"
                      class="ml-3"
                      @click="completed(orders.order.id)"
                    >
                      Completed
                </b-button>
              </span></h3>   
              </b-col>
            </b-row>
          </b-card>
  <b-card>
  <b-row>
      <b-col lg="6" md="6" sm="12">
          <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Order Id
              </h4>
              <h3>
                C_ORD  {{ orders.order.id  }}
              </h3>
              </div>
              <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                Order Date
              </h4>
              <h3>
                    {{ orders.order.order_date  }}
              </h3>
              </div>
              <div class="ml-2">
          <h4 class="text-capitalize mt-2">
             Items Count
          </h4>
          <b-card-text>
              <h3>
                {{ orders.order.items_count  }}
              </h3>
          </b-card-text>
          </div>
          
      </b-col>

      <b-col lg="6" md="6" sm="12">
          <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                  Company Name
              </h4>
              <h3>
                    {{ orders.shop.shop_name  }}
              </h3>
              </div>
              <div class="ml-2">
              <h4 class="text-capitalize mt-2">
                Supplier Name
              </h4>
              <h3>
                    {{ orders.shop.owner_name  }}
              </h3>
              </div>
              <div class="ml-2">
          <h4 class="text-capitalize mt-2">
             Company Phone Number
          </h4>
          <b-card-text>
              <h3>
                {{ orders.shop.phone_no  }}
              </h3>
          </b-card-text>
          </div>
          <div class="ml-2">
          <h4 class="text-capitalize mt-2">
              Company Address
          </h4>
          <b-card-text>
              <h3>
                {{ orders.shop.address  }}
              </h3>
          </b-card-text>
          </div>
           
      </b-col>
      
    
  </b-row>
  </b-card>

  <b-card v-if="orders.item_orders.length > 0">


 <table class="table table-hover shopping-cart-wrap table-responsive">
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
                                   <h4 class="title text-truncate"> {{ product.item_name }} | {{ product.unit }}</h4>
                                </figcaption>
                             </figure>
                          </td>
                          <td>
                             <figure class="media">
                                <figcaption class="media-body mt-1">
                                   <h4 class="title text-truncate"> {{ product.quentity }} </h4>
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

      userData: JSON.parse(localStorage.getItem('userData')),
      orders: {},
      shops: {},
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
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){
     this.companyOrderDetails()
    }
     else{
      this.$router.push('/')
     }
  },
  methods: {

    async companyOrderDetails(){
      try {
        const response = await order.companyOrderDetails(this.$route.params.id)
        this.orders = response.data
        } catch (error) {
        }
    },



    async completed(id){
      try {
         this.isLoading = true
         const response = await order.completedCompanyOrder(id)
         this.$router.push('/company-orders?tab=2')
         this.isLoading = false
       } catch (error) {
         this.isLoading = false
       }
   },

   async completed(id){
        
        try {
          this.tableLoading = true
          this.$swal({
            title: 'Are you sure you want to complete this order?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, complete',
            cancelButtonText: 'No, go back',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
          }).then(async result => {
            if (result.value) {
            await order.completedCompanyOrder(id)
              this.showSuccessMessage('Order has been completed')
              this.$router.push('/company-orders?tab=2')
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
