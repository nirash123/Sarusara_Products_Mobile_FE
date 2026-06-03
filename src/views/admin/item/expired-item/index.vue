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
              v-model="filters['expired_date']"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="(statusOptions) => statusOptions.value"
              class="invoice-filter-select"
              placeholder="Select Days"
            >
                  {{ filters['expired_date'] }}
            </v-select>
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

        <template #cell(id)="data">
            <div style="width: 90px !important">
              ITEM  {{ data.item.id }}
              </div>
          </template>

          <template #cell(item_name)="data">
              <div style="width: 300px !important">
                <span class="ml-1"> {{ data.item.item_name }} </span> 
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
          <p class="txt-grey mt-1">No Expired Items</p>
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
  BImg,
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
import product from "@/apis/modules/product";
import item from "@/apis/modules/item";



export default {
  components: {
    BImg,
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
  const today = new Date();
      const beforeDays = new Date(today);
      beforeDays.setDate(today.getDate());
      const beforeDaysISOString = beforeDays.toISOString().slice(0, 10);


      const before30Days = new Date(today);
      before30Days.setDate(today.getDate() + 15);
      const before30DaysISOString = before30Days.toISOString().slice(0, 10);

      const before60Days = new Date(today);
      before60Days.setDate(today.getDate() + 30);
      const before60DaysISOString = before60Days.toISOString().slice(0, 10);

      const before90Days = new Date(today);
      before90Days.setDate(today.getDate() + 45);
      const before90DaysISOString = before90Days.toISOString().slice(0, 10);

      const statusOptions = [
        { label: 'All', value: 0 },
        { label: 'Expired', value: beforeDaysISOString },
        { label: '15 Days', value: before30DaysISOString },
        { label: '30 Days', value: before60DaysISOString },
        { label: '45 Days', value: before90DaysISOString },
      ];

      return {
        statusOptions,
        beforeDaysISOString,
        before30DaysISOString,
        before60DaysISOString,
        before90DaysISOString,
      };
    },
    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      today: new Date().toISOString().slice(0, 10),
      threeMonthsAgo: null,
      groups:'',
      userData: JSON.parse(localStorage.getItem('userData')),
      managers: [],
      filters: {},
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
      
      
      fields: [
      {
          key: "id",
          label: "item id",
        },
        {
          key: "item_name",
          label: "item name",
          sortable: true,
        },
        {
          key: "item_code",
          label: "item code",
        },
        {
          key: "company_price",
          label: "company_price",
        },
        {
          key: "sale_price",
          label: "sale price",
        },
        {
          key: "quentity",
          label: "quentity",
          sortable: true,
        },
        {
            key: "expired_date",
            label: "Expired Date",
            sortable: true,
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


    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },
    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await item.getAdminExpiredItems(
            this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          item_code: x.item_code,
          item_name: x.item_name,
          sale_price: "Rs: " + (x.sale_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          quentity: x.quentity,
          expired_date: x.expired_date,
          company_price: "Rss: " + (x.company_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

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

    async groupData(){
      try {
        const response = await product.shopCategoryData()
        this.groups = response.data.data
      
        } catch (error) {
          
        }
    },


  },

  mounted() {
    if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' ){
        this.groupData()
        this.$refs.codeInput.focus();
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
