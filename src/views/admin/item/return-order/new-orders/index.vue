<template>
  <div>
      <b-card>

   <div class="my-2">

    <!-- Table Top -->
    <b-row>

      <!-- Per Page -->
      <b-col
        cols="12" md="5"
        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
      >
        <label>Entries</label>
        <v-select
          v-model="pagination.perPage"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="pageOptions"
          :clearable="false"
          class="per-page-selector d-inline-block ml-50 mr-1"
        />
      </b-col>

      <!-- Search -->
      <b-col
        cols="12"
        md="7"
      >
        <div class="d-flex align-items-center justify-content-end">
          <b-form-input
          v-model="filters['id_or_cus_id']"
            class="d-inline-block mr-1"
            placeholder="Search..."
          />
          <b-button
            class="single-line-text" style="width: 320px;" variant="primary"
            id="toggle-btn-price"
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            v-b-modal.modal-prevent-closing-price
          >
          <span class="align-middle"> Add New Return Order</span>
          </b-button>
          <b-modal
            id="modal-prevent-closing-price"
            centered
            ref="my-modal-price"
            title="Add New Return Order"
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
                <b-col cols="12">
                  <b-row class="mt-1" >
                <b-col sm="12" md="12"  >
                  <b-form-group
                    label="Company Name"
                    label-for="group-input"
                    invalid-feedback="Company Name is required">
                   <v-select
                                      id="shop-id-input"
                                      v-model="shop_id"
                                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                      label="shop_name"
                                      value="id"
                                      :options="shop_names"
                                      required
                                    />
                </b-form-group>
                </b-col>
                </b-row>
                </b-col>
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Sub Total Amount"
                      label-for="total"
                      invalid-feedback="Sub Total amount is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="subtotal"
                          :state="subtotal_status"
                          placeholder="Enter Sub Total Amount"
                      />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Discount"
                      label-for="discount"
                      invalid-feedback="Discount is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="discount"
                          :state="discount_status"
                          placeholder="Enter Discount"
                      />
                  </b-form-group>
                </b-col>

                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Total Amount"
                      label-for="total"
                  >
                  <b-form-input
                      id="total"
                      :value="totalAmount"
                      readonly
                    />
                  </b-form-group>
                </b-col>
                
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Cash Amount"
                      label-for="cash"
                      invalid-feedback="Cash is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="cash"
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
                          v-model="card"
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
                          v-model="cheque"
                          :state="cheque_status"
                          placeholder="Enter Cheque Amount"
                      />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="12"  >
                  <b-form-group
                      label="Credit Amount"
                      label-for="credit"
                      invalid-feedback="Credit is required"
                  >
                      <b-form-input
                          id="name"
                          v-model="credit"
                          :state="credit_status"
                          placeholder="Enter Credit Amount"
                      />
                  </b-form-group>
                </b-col>
            </form>
          </b-modal>
        </div>
      </b-col>
    </b-row>

  </div>
 
  <b-row class="my-2">
    <b-col cols="12">
      <b-overlay :show="tableLoading" rounded="sm">
        <b-table
          ref="table"
          :current-page="currentPage"
          :fields="fields"
          :items="getUsers"
          :per-page="pagination.perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          class="mobile_table_css"
          hover
          responsive
        >

        <template #cell(id)="data">
            <div style="width: 90px !important">
              H_ORD  {{ data.item.id}}
              </div>
          </template>

          <!-- Column: Actions -->
    <template #cell(actions)="data">

    <div class="text-nowrap">
      <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="outline-primary"
                  class="btn-icon mr-50"
                >
    <feather-icon
      :id="`invoice-row-${data.item.id}-preview-icon`"
      icon="EyeIcon"
      size="16"
      @click="$router.push({ name: 'view-hardware-return-order-list', params: { id: data.item.id }})"
    />
    </b-button>
    <b-button v-if="data.item.order_date == today"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="outline-primary"
                  class="btn-icon"
                >
  <feather-icon
    :id="`invoice-row-${data.item.id}-preview-icon`"
    icon="TrashIcon"
    size="16"
    @click="deleteOrder(data.item.id)"
  />
  </b-button>
    </div>
    </template>

        </b-table>
      </b-overlay>
    </b-col>

    <b-col cols="12">
      <div
        v-if="pagination.totalRows == 0">
        <div class="d-flex flex-column align-items-center justify-content-center h-100">
        <div class="empty-state py-2">
          <img class="img-fluid " src="@/assets/images/pages/doc-icon.png" alt="" width="100">
          <p class="txt-grey mt-1 ml-1">No Orders</p>
        </div>
      </div>
    </div>
    </b-col>

    <b-col
      class="
        d-flex
        align-items-center
        justify-content-center justify-content-sm-start
      "
      cols="12"
      sm="6"
    >
      <span v-if="pagination.totalRows !== 0" class="text-muted"
        >Showing {{ pagination.from }} to {{ pagination.to }} of
        {{ pagination.totalRows }} entries</span>
        <span v-else class="text-muted"
        >Showing 0 to 0 of 0 entries</span>
    </b-col>

    <b-col
      class="
        d-flex
        align-items-center
        justify-content-center justify-content-sm-end"
      cols="12"
      sm="6"
    >
      <b-pagination
        v-model="currentPage"
        :per-page="pagination.perPage"
        :total-rows="pagination.totalRows"
        first-number
        last-number
        next-class="next-item"
        prev-class="prev-item"
        class="pagination-primary"
      >
        <template #prev-text>
          <feather-icon icon="ChevronLeftIcon" size="18" class="pagination-primary" />
        </template>

        <template #next-text>
          <feather-icon icon="ChevronRightIcon" size="18" />
        </template>
      </b-pagination>
    </b-col>
  </b-row>
  </b-card>
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
import shop from "@/apis/modules/shop";
import order from "@/apis/modules/order";
import item from "@/apis/modules/item";
import admin from "@/apis/modules/admin";


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
    let today = new Date();
    let options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = today.toLocaleDateString('en-CA', options).replace(/\//g, '-');

    return {
      shop_id: '',
      cash: 0,
      card: 0,
      cheque: 0,
      credit: 0,
      total: 0,
      subtotal: 0,
      discount:0,
      payment:0,
      old_total:0,
      shop_names: [],
      card_status: '',
      cheque_status: '',
      credit_status: '',
      submittedPriceNames: [],
      today: formattedDate,
      shop_id_status: null,
      subtotal_status: null,
      discount_status: null,
      cash_status: null,
      card_status: null,
      cheque_status: null,
      credit_status: null,
      
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25, 50],
      currentPage: 1,
      pagination: {
        perPage: "",
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
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      
      fields: [
      {
          key: "id",
          label: "order id",
        },
        {
          key: "order_date",
          label: "order_date",
          sortable: true,
        },
        {
          key: "shops_shop_name",
          label: "company name",
          sortable: true,
        },
        {
          key: "subtotal",
          label: "subtotal",
        },
        {
          key: "discount",
          label: "discount",
        },
        {
          key: "total",
          label: "total",
        },
        {
          key: "cash",
          label: "cash",
        },
        {
          key: "card",
          label: "card",
        },
        {
          key: "cheque",
          label: "cheque",
        },
        {
          key: "credit",
          label: "credit",
        },
        {
          key: "actions",
          label: "actions",
        },
        

      ],
      items: [],
    };
  },
  watch: {
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {
    totalAmount() {
      return this.subtotal - this.discount;
    },

    ...mapGetters(["currentUser"]),
  },
  methods: {
    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },


    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await order.getHardwareReturnNewOrder(
            this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          order_date:x.order_date,
          shops_shop_name: x.shops_shop_name,
          cash: 'Rs: ' + (x.cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          card: 'Rs: ' + (x.card).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          cheque: 'Rs: ' + (x.cheque).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          credit: 'Rs: ' + (x.credit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          subtotal: 'Rs: ' + (x.subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          discount: 'Rs: ' + (x.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          total: 'Rs: ' + (x.total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          card_status: x.card_status,
          cheque_status: x.cheque_status,
          credit_status: x.credit_status,
          payment: x.payment,
          old_total: x.total,

        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        return dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    

    checkFormValidityPrice() {
        const valid = this.$refs.form.checkValidity()
        this.priceState = valid
        this.shop_id_status = valid
        this.subtotal_status = valid
        this.discount_status = valid
        this.cash_status = valid
        this.card_status = valid
        this.cheque_status = valid
        this.credit_status = valid
        return valid
      },

      resetModalPrice() {
        this.price = ''
        this.priceState = null

        this.subtotal  = 0
        this.discount = 0
        this.cash = 0
        this.card = 0
        this.cheque = 0
        this.credit = 0
        this.shop_id = ''

        this.shop_id_status = null
        this.subtotal_status = null
        this.discount_status = null
        this.cash_status = null
        this.card_status = null
        this.cheque_status = null
        this.credit_status = null
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
          this.shop_id,
          this.subtotal,
          this.discount,
          this.cash,
          this.card,
          this.cheque,
          this.credit)

        this.companyPrice(
          this.shop_id,
          this.subtotal,
          this.discount,
          this.cash,
          this.card,
          this.cheque,
          this.credit,
        )
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs['my-modal-price'].toggle('#toggle-btn-price')
        })
      },
      

      async companyPrice(shop_id,subtotal,discount,cash, card, cheque, credit) {

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

      if(this.card == 0){
        this.card_status = 2
      }else{
        this.card_status = 1
      }

      
      if(this.cheque == 0){
        this.cheque_status = 2
      }else{
        this.cheque_status = 1
      }

      
      if(this.credit == 0){
        this.credit_status = 2
      }else{
        this.credit_status = 1
      }


      if((parseFloat(subtotal) - parseFloat(discount)) == (parseFloat(cash) + parseFloat(card) + parseFloat(cheque) + parseFloat(credit)) ){
            this.total = parseFloat(subtotal) - parseFloat(discount)

        try {
                this.payload = {
                  year: formattedYear,
                  month: formattedMonth,
                  shop_id: shop_id.id,
                  cashier_id: JSON.parse(localStorage.getItem('userData')).id,
                  subtotal: subtotal,
                  discount: discount,
                  total: this.total,
                  cash: cash,
                  card: card,
                  cheque: cheque,
                  credit: credit,
                  card_status: this.card_status,
                  cheque_status: this.cheque_status,
                  credit_status: this.credit_status,
                }
                this.isLoading = true
                const response = await item.submitHardwareReturnNewCart(this.payload)
                this.showSuccessMessage('Create Order Successfully')
                this.$refs.table.refresh();
                this.isLoading = false
              } catch (error) {
                error.response.data.data.shop_id? this.showErrorMessage('The company name is required.'):''

                this.isLoading = false
              }
            }
            else{
              this.showErrorMessage('Total Amount not match Paied Amount')
            }

      },

    refreshTable(){
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

    async shopsData(){
      try {
        const response = await shop.shopsData()
        this.shop_names = response.data.data
        } catch (error) {
          
        }
    },

    async deleteOrder(id) {
  
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
          await item.deleteHardwareReturnNewCart(id)
            this.showSuccessMessage('Order has been deleted')
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

  },

  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
      this.shopsData()
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
</style>
