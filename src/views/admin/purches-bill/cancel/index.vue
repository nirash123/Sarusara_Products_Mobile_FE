<template>
  <div>
    <b-card>

      <div>

        <!-- Table Top -->
        <b-row>


          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Entries</label>
            <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="7">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="filters['id_or_cus_id']" class="d-inline-block mr-1" placeholder="Search..." />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-row class="my-2">
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive>

              <template #cell(id)="data">
                <div style="width: 90px !important">
                  S_ORD {{ data.item.id }}
                </div>
              </template>
              <template #cell(users_user_name )="data">
                <div style="width: 90px !important">
                  {{ data.item.users_user_name }}
                </div>
              </template>
              <!-- Column: Actions -->
              <template #cell(actions)="data">

                <div class="text-nowrap">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="EyeIcon" size="16"
                      @click="$router.push({ name: 'view-cancel-sale-order', params: { id: data.item.id } })" />
                  </b-button>
                </div>
              </template>

            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination.totalRows == 0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <div class="empty-state py-2">
                <img class="img-fluid " src="@/assets/images/pages/doc-icon.png" alt="" width="100">
                <p class="txt-grey mt-1 ml-1">No Orders</p>
              </div>
            </div>
          </div>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
          <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{ pagination.to
            }} of
            {{ pagination.totalRows }} entries</span>
          <span v-else class="text-muted">Showing 0 to 0 of 0 entries</span>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-end" cols="12" sm="6">
          <b-pagination v-model="currentPage" :per-page="pagination.perPage" :total-rows="pagination.totalRows"
            first-number last-number next-class="next-item" prev-class="prev-item" class="pagination-primary">
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
      avatar: require('@/assets/images/avatars/shop.png'),
      managers: [],
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
          key: "bill_number",
          label: "bill number",
          sortable: true,
        },
        {
          key: "suppliers_supplier_name",
          label: "Supplier",
          sortable: true,
        },
        {
          key: "lorry_number",
          label: "Vehicle No",
        },
        {
          key: "total",
          label: "net amount",
        },

        {
          key: "subtotal",
          label: "total weight",
        },

        {
          key: "order_date",
          label: "date",
          sortable: true,
        },
        {
          key: "order_time",
          label: "time",
          sortable: true,
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
        const Response = await order.getCancelledSalesOrder(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.sale_orders_id,
          order_date: x.sale_orders_order_date,
          cashier_id: x.sale_orders_cashier_id,
          users_user_name: x.users_user_name,
          suppliers_supplier_name: x.suppliers_supplier_name,
          bill_number: x.sale_orders_bill_number,
          lorry_number: x.sale_orders_lorry_number,
          order_time: x.sale_orders_order_time,
          subtotal: 'Rs: ' + (x.sale_orders_subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          discount: 'Rs: ' + (x.sale_orders_discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          total: 'Rs: ' + (x.sale_orders_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          active_status: x.sale_orders_active_status


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

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

  },

  mounted() {

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