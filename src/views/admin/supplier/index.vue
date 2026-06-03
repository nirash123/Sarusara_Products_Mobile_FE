<template>
  <div>

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
              <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1" placeholder="Search..." />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-row>
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive>
              <template #cell(actions)="data">
                <b-card class="custom-card card-pending">
                <div class="card-inner">

                  <!-- Top Badge -->
                  <div class="top-row">
                    <span class="invoice-badge">
                      {{ data.item.phone_no }}
                    </span>
                  </div>

                  <!-- Main Info -->
                  <div class="main-content">
                    <div class="lorry-number">
                     👷 {{ data.item.supplier_name }}
                    </div>

                    <div class="supplier-name">
                      {{ data.item.address }}
                    </div>
                  </div>

                  <!-- Bottom Info -->
                  <div class="bottom-row">
                    <div class="info-item">
                      💵 <span> {{ data.item.loan }}</span>
                    </div>

                    <div class="info-item price">
                      💰 {{ data.item.buy }}
                    </div>
                  </div>

                </div>
              </b-card>
              </template>
            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination.totalRows == 0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <div class="empty-state py-2">
                <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
                <p class="txt-grey mt-1">No Suppliers</p>
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
  </div>
</template>

<script>
import {
  BFormRating,
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
import admin from "@/apis/modules/admin";

export default {
  components: {
    BFormRating,
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

  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      active_status: '',
      avatar: require('@/assets/images/avatars/avatar.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25],
      currentPage: 1,
      image: '',
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
      supplier_name: '',
      address: '',
      phone_no: '',
      vehicle_number: '',

      submittedPriceNames: [],

      supplier_name_status: null,
      address_status: null,
      phone_no_status: null,
      vehicle_number_status: null,


      fields: [
        {
          key: "actions",
          label: "suppliers",
        },


      ],
      new_suppliers: [],
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
        const Response = await admin.getSuppliers(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          supplier_name: x.supplier_name,
          address: x.address ? x.address : "N/A",
          phone_no: x.phone_no ? x.phone_no : "N/A",
          active_status: x.active_status,
          loan: x.loan && Number(x.loan) > 0
            ? `Rs ${Number(x.loan).toFixed(2)}`
            : "N/A",
          buy: x.buy && Number(x.buy) > 0
            ? `Rs ${Number(x.buy).toFixed(2)}`
            : "N/A",
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

    async deleteSupplier(id) {
      this.$swal({
        title: 'Are you sure you want to delete this supplier?',
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
          try {
            this.tableLoading = true

            await admin.supplierDelete(id)

            this.showSuccessMessage('Supplier has been deleted')
            this.refreshTable()

          } catch (error) {
            // ✅ SHOW BACKEND ERROR MESSAGE
            let msg = error.response?.data?.error || 'Something went wrong'

            this.$swal({
              icon: 'error',
              title: 'Delete Failed',
              text: msg
            })
          } finally {
            this.tableLoading = false
          }

        } else if (result.dismiss === 'cancel') {
          this.showSuccessMessage('Cancelled')
        }
      })
    },

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.supplier_name_status = valid
      this.address_status = valid
      this.phone_no_status = valid
      this.vehicle_number_status = valid
      return valid
    },

    resetModalPrice() {
      this.supplier_name = ''
      this.address = ''
      this.phone_no = ''
      this.vehicle_number = ''

      this.supplier_name_status = null
      this.address_status = null
      this.phone_no_status = null
      this.vehicle_number_status = null
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
        this.supplier_name,
        this.address,
        this.phone_no,
        this.vehicle_number,
      )
      this.companySupplier(
        this.supplier_name,
        this.address,
        this.phone_no,
        this.vehicle_number,
      )

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-price'].toggle('#toggle-btn-price')
      })
    },

    async companySupplier(supplier_name, address, phone_no, vehicle_number) {
      try {
        this.payload = {
          supplier_name: supplier_name,
          address: address,
          phone_no: phone_no,
          vehicle_number: vehicle_number,
        }
        this.isLoading = true
        const response = await admin.supplierCreate(this.payload)
        this.showSuccessMessage('Create Supplier Successfully')
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.supplier_name ? this.showErrorMessage('The Supplier name has been already taken.') : ''
        error.response.data.data.phone_no ? this.showErrorMessage('The Mobile number has been already taken.') : ''
        error.response.data.data.vehicle_number ? this.showErrorMessage('The Vehicle number has been already taken.') : ''

        this.isLoading = false
      }
      this.getUsers()
      this.$refs.table.refresh();
    },

  },
  mounted() {
    this.getUsers()
  }
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
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";


.header-card {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  border-radius: 12px;
  color: white;
  padding: 10px 15px;
}

/* Layout */
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


/* Left */
.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title h5 {
  color: #fff;
  font-weight: 600;
  margin: 0;
}

.title small {
  color: #dbeafe;
}

/* Back button */
.back-btn {
  background: linear-gradient(135deg, #1e3a8a, #1e3a8a);
  border: none;
  color: white;
  border-radius: 10px;
}

/* Center */
.center-section {
  font-weight: 500;
  color: #e0f2fe;
}

/* Right */
.logout-icon {
  cursor: pointer;
  width: 26px;
  height: 26px;
  color: white;
}

/* Hover */
.logout-icon:hover {
  opacity: 0.7;
}

.modern-group label {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6px;
}

.modern-input {
  height: 42px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  transition: 0.25s ease;
  font-weight: 500;
}

.modern-input:focus {
  border-color: #7c8cff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0);
  background: #fff;
}

/* Modal content polish */
.modal-content {
  border-radius: 14px;
  overflow: hidden;
}

.modal-header {
  background: linear-gradient(135deg, #dfdeff, #7c8cff);
  color: white;
  font-weight: 600;
}

.modal-footer {
  border-top: 1px solid #f1f1f1;
}

.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}

.modern-group label {
  font-weight: 600;
  font-size: 13px;
  color: #ffffff;
}

.modern-input-group {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.modern-input-group:focus-within {
  border-color: #7c8cff;
  box-shadow: 0 0 0 3px rgba(124, 140, 255, 0.2);
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background: #eef2ff;
  font-size: 16px;
}

.modern-input {
  border: none !important;
  background: transparent !important;
  font-weight: 600;
  color: #2c3e50;
  height: 42px;
}

.modern-select .vs__dropdown-toggle {
  border-radius: 12px;
  padding: 8px;
}

div#dropdown-1 .btn-outline-danger {
  border: none !important;
}

.custom-card {
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  border: none;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* Card States */
.card-assigned {
  background: linear-gradient(135deg, #d6ecff, #b3daff);
}

.card-pending {
  background: linear-gradient(135deg, #d6ffaa, #b8f28a);
}

.custom-card {
  border: none;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  background: #ffffff;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

/* Hover Magic */
.custom-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

/* Assigned / Pending Styles */
.card-assigned {
  background: linear-gradient(135deg, #54ffb2, #ffffff);
  border-left: 5px solid #28c76f;
  box-shadow: 0 6px 18px rgba(40, 199, 111, 0.18);
}

.card-pending {
  background: linear-gradient(135deg, #ffc87f, #ffffff);
  border-left: 5px solid #ff9f43;
  box-shadow: 0 6px 18px rgba(255, 159, 67, 0.18);
}

/* Inner Layout */
.card-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Top Badge */
.top-row {
  display: flex;
  justify-content: flex-end;
}

.invoice-badge {
  background: #7367f0;
  color: white;
  padding: 4px 10px;
  font-size: 1.0rem;
  border-radius: 20px;
  font-weight: 600;
}

/* Main Content */
.main-content {
  text-align: center;
}

.lorry-number {
  font-size: 1.0rem;
  font-weight: 700;
  color: #000000;
}

.supplier-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: #000000;
  margin-top: 4px;
}

/* Bottom Row */
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

/* Info Items */
.info-item {
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-item.price {
  color: #f80000;
  font-weight: 700;
  font-size: 1.2rem;
}

/* Subtle Glow Effect */
.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent);
  transform: rotate(25deg);
  transition: 0.5s;
}

.custom-card:hover::before {
  left: 100%;
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

.row-orange {
  background-color: #ffa50033 !important;
  /* light orange */
}

.row-green {
  background-color: #39ff2733 !important;
  /* light green */
}


@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>