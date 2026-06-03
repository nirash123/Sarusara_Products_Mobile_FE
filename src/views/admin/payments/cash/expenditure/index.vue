<template>
    <div>
        <b-card no-body>
  
     <div class="m-2">
  
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
  
          <v-select
              v-model="filters['cash_type']"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="(statusOptions) => statusOptions.value"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
                  {{ filters['cash_type'] }}
            </v-select>
        </b-col>
  
        <!-- Search -->
        <b-col
          cols="12"
          md="7"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
            v-model="filters['name_or_email']"
              class="d-inline-block mr-1"
              placeholder="Search..."
            /> 
          </div>
        </b-col>
      </b-row>
  
    </div>
   
    <b-row class="m-2">
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
  
  
            <template #cell(user_name)="data">
              <div v-if="data.item.shops_shop_name"> {{ data.item.shops_shop_name }} ( Company )</div>
              <div v-else-if="data.item.customers_user_name"> {{ data.item.customers_user_name }} ( Supplier )</div>
              <div v-else> N / A</div>
              <div v-if="data.item.shops_phone_no"> {{ data.item.shops_phone_no }} </div>
              <div v-else-if="data.item.customers_phone_no"> {{ data.item.customers_phone_no }} </div>
              <div v-else> N / A</div>
            </template>
  
            <template #cell(cash_type)="data">
              <b-badge v-if="data.item.cash_type == '2' " class="ml-1" style="padding: 8px" variant="light-primary">
                  Purchase Order
              </b-badge>
              <b-badge v-if="data.item.cash_type == '3' " class="ml-1" style="padding: 8px" variant="light-warning">
                  Plastic Purchase Order
              </b-badge>
             
          </template>
          </b-table>
        </b-overlay>
      </b-col>
  
      <b-col cols="12">
        <div
          v-if="pagination.totalRows == 0">
          <div class="d-flex flex-column align-items-center justify-content-center h-100">
          <div class="empty-state py-2">
            <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
            <p class="txt-grey mt-1">No Data</p>
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
  import payment from "@/apis/modules/payment";
  
  
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
      const statusOptions = [
        { label: 'All', value: 0 },
        { label: 'Purchase Order', value: 2 },
        { label: 'Plastic Purchase Order', value: 3 },
      ]
  
      return {
        statusOptions,
      }
    },
    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
    data() {
      return {
        userData: JSON.parse(localStorage.getItem('userData')),
        cash_type:'',
        avatar: require('@/assets/images/avatars/shop.png'),
        managers: [],
        filters: {},
        jobRoleOption: [],
        tableLoading: false,
        noDataTable: "",
        pageOptions: [5, 10, 25],
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
            key: "order_id",
            label: "order id",
          },
          {
            key: "users_user_name",
            label: "cashier",
            sortable: true,
          },
          {
            key: "user_name",
            label: "customer name or company name",
          },
          {
            key: "note",
            label: "note",
          },
          {
            key: "amount",
            label: "amount",
          },
          {
            key: "cash_type",
            label: "status",
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
      ...mapGetters(["currentUser"]),
    },
    methods: {
      async getUsers() {
        try {
          this.tableLoading = true;
          if (this.sortBy == "") {
            this.sortDesc = true;
          }
          const Response = await payment.getTodayExpenditureCashs(
              this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
          const dataArray = Response.data.data.map((x) => ({
            id: x.id,
            order_id : x.order_id,
            users_user_name : x.users_user_name,
            note: x.note,
            amount: 'Rs: ' + x.amount,
            date: x.date,
            active_status: x.active_status,
            shops_shop_name: x.shops_shop_name,
            shops_phone_no: x.shops_phone_no,
            customers_user_name: x.customers_user_name,
            customers_phone_no: x.customers_phone_no,
            cash_type: x.cash_type,
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
      
      refreshTable(){
        this.$refs.table.refresh()
      },
  
      filterQueryUpdate() {
        this.$refs.table.refresh();
      },
    },
  
    mounted() {
    
       if(JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin'){
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
  