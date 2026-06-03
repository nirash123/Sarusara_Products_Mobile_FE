<template>
  <div>
      <b-row class="invoice-header">

        <b-col cols="12">
          <b-card class="plastic-header-card">

            <div class="header-wrapper">

              <!-- LEFT -->
              <div class="left-section">

                <div class="title">
                  <h5 class="mb-0">
                    Plastic Sale
                  </h5>
                </div>
              </div>
            </div>

          </b-card>
        </b-col>

      </b-row>
      <div>
        <b-row>
          <b-col md="12">
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
                  <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1"
                    placeholder="Search..." />

                </div>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col cols="12">
                <b-row>
                  <b-col sm="12" md="12" lg="6" xl="4" v-for="project in getData" :key="project.id" class="mb-2">
                    <b-card class="custom-card" :class="project.active_status == 1 ? 'card-assigned' : 'card-pending'">
                      <div class="card-inner">

                        <!-- Top Badge -->
                        <div class="top-row">
                          <span class="plastic-invoice-badge">
                            #{{ String(project.id).padStart(4, '0') }}
                          </span>
                        </div>

                        <!-- Main Info -->
                        <div class="main-content">
                          <div class="lorry-number">
                            🚚 {{ project.lorry_number }}
                          </div>

                          <div class="supplier-name">
                            {{ project.supplier_name }}
                          </div>
                        </div>

                        <!-- Bottom Info -->
                        <div class="bottom-row">
                          <div class="info-item">
                            ⏱ <span>{{ project.order_time }}</span>
                          </div>

                          <div class="info-item price">
                            💰 Rs. {{
                              Number(project.payment).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
                            }}
                          </div>
                        </div>

                      </div>
                    </b-card>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="
                                                  d-flex
                                                  align-items-center
                                                  justify-content-center justify-content-sm-start
                                              " cols="12" sm="6">
                    <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{
                      pagination.to }} of
                      {{ pagination.totalRows }} entries</span>
                    <span v-else class="text-muted">Showing 0 to 0 of 0 entries</span>
                  </b-col>

                  <b-col class="
                                                  d-flex
                                                  align-items-center
                                                  justify-content-center justify-content-sm-end" cols="12" sm="6">
                    <b-pagination v-model="currentPage" :per-page="pagination.perPage"
                      :total-rows="pagination.totalRows" first-number last-number next-class="next-item"
                      prev-class="prev-item" class="pagination-primary">
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" class="pagination-primary" />
                      </template>

                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
                      </template>
                    </b-pagination>
                  </b-col>
                </b-row>

                <b-overlay :show="tableLoading" rounded="sm">
                  <b-table ref="table" :current-page="currentPage" :items="getUsers" :filter="filters['id_or_cus_id']"
                    :filter-included-fields="filterOn">
                  </b-table>
                </b-overlay>

              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
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
  BLink,
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
import driver from "@/apis/modules/driver";
import admin from "@/apis/modules/admin";
import order from "@/apis/modules/order";
import { avatarText } from '@core/utils/filter'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BLink,
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
    avatarText,
    ValidationProvider,
    ValidationObserver,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  setup() {
    const statusOptions = [
      { label: 'Insurance', value: 1 },
      { label: 'Revenue License', value: 2 },
      { label: 'Emission Test Certificate', value: 3 },
    ]

    const datesOptions = [
      { label: 'That day', value: 0 },
      { label: '1 day ago', value: 1 },
      { label: '3 days ago', value: 3 },
      { label: '7 days ago', value: 7 },
      { label: '15 days ago', value: 15 },
      { label: '30 days ago', value: 30 },
    ]

    return {
      statusOptions,
      datesOptions,
    }
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      getData: '',
      driver_id: '',
      company_vehicle: '',
      currentDate: '',
      currentNewDate: '',
      currentOldDate: '',
      currentTime: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      active_status: '',
      avatar: require('@/assets/images/avatars/shop.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [6, 12, 24],
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

      owned: false,

      lorry_code: '',
      lorry_number: '',

      new_supplier_id: '',

      lorry: {
        supplier_id: '',
        lorry_number: '',
      },

      driver_groups: [],

      form: {
        lorry_number: '',
        user_name: '',
        phone_no: '',
        category: '',
        expired_date: '',
        reminder_date: '',
      },


      vehicle_groups: [],
      groups: [],
      cashier_id: null,

      submittedPriceNames: [],
      lorry_code_status: null,
      lorry_number_status: null,
      user_name_status: null,
      last_name_status: null,
      address_status: null,
      phone_no_status: null,

      phoneError: '',



      fields: [
        {
          key: "lorry_number",
          label: "number",
          sortable: true,
        },
        {
          key: "user_name",
          label: "Reciver Name",
          sortable: true,
        },
        {
          key: "phone_no",
          label: "mobile number",
        },
        {
          key: "category",
          label: "category",
          sortable: true,
        },
        {
          key: "expired_date",
          label: "expired date",
          sortable: true,
        },
        {
          key: "schedule_time",
          label: "remind date",
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
    filterQuery() {
      return Object.keys(this.filters)
        .filter(key => this.filters[key])
        .map(key => `${key}=${this.filters[key]}`)
        .join('&')
    },
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.currentDate = this.getCurrentDate();
    this.currentNewDate = this.getNewCurrentDate();
    this.currentOldDate = this.getNewCurrentOldDate();
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  methods: {

       handleCardClick(project) {
      
      if (project.active_status === 1){
      this.$router.push(`/view-plastic-order/${project.id}`)
      }else{ 
      this.$router.push(`/invoice-plastic-order/${project.id}`)
      }

    },

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },


    checkFormValidityLorry() {
      const valid = this.$refs.form.checkValidity()

      this.lorry_supplier_id_status = !!this.lorry.supplier_id
      this.lorry_lorry_number_status = !!this.lorry.lorry_number
      return valid
    },

    resetModalLorry() {
      this.lorry.lorry_number = ''
      this.lorry.supplier_id = ''

      this.lorry_lorry_number_status = null
      this.lorry_supplier_id_status = null
    },

    handleOkLorry(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmitLorry()
    },

    handleSubmitLorry() {
      if (!this.checkFormValidityLorry()) return

      this.companyLorry()
    },

    async companyLorry() {
      try {
        this.isLoading = true

        const payload = {
          supplier_id: this.lorry.supplier_id,
          lorry_number: this.lorry.lorry_number,
        }

        await driver.lorryCreate(payload)

        this.showSuccessMessage('Create Lorry Successfully')
        await this.vehicleGroupData();

        // close modal
        this.$nextTick(() => {
          this.$refs['my-modal-lorry'].hide()
        })

      } catch (error) {
        this.showErrorMessage('The Lorry Number has been already taken.')
      } finally {
        this.isLoading = false
      }
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
        this.groupData()
        this.vehicleGroupData()
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




    async driverGroupData() {
      try {
        const response = await driver.driverData()
        this.driver_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    getCurrentTime() {
      const now = new Date();
      // Format the time as per your requirement
      return now.toLocaleTimeString();
    },

    getCurrentDate() {
      const now = new Date();
      // Format the date as per your requirement
      return now.toLocaleDateString();
    },

    getNewCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    },

    getNewCurrentOldDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    },


    rowClass(item) {
      if (!item?.schedule_time || !item?.expired_date) return '';

      const today = new Date().toISOString().split('T')[0];

      const schedule = item.schedule_time.split(' ')[0];
      const expired = item.expired_date.split(' ')[0];

      if (expired <= today) return 'row-green';
      if (schedule <= today) return 'row-orange';

      return '';
    },

    async groupData() {
      try {
        const response = await driver.supplierdata()
        this.groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    async vehicleGroupData() {
      try {
        const response = await driver.supplierLorryOnlyData()
        this.vehicle_groups = response.data.data

        // ✅ Add "Other" option
        this.vehicle_groups.unshift({
          id: 'other',
          label: 'Other'
        })

      } catch (error) {
        console.error(error)
      }
    },

    async addSubItemData(value) {
      if (value === 'other' || value === 'other' || value?.id === 'other') {
        this.isOtherSelected = true

        this.driver_id = ''
        this.form.user_name = ''
        this.new_supplier_id = ''
        this.order_date = new Date()

        this.filters['filter[name_or_email]'] = ""

        this.$refs['my-modal-lorry'].show()

      } else {
        this.driver_id = ''
        this.form.user_name = ''
        this.new_supplier_id = ''
        this.order_date = new Date()

        try {
          const response = await driver.getLorryDetails(value)

          this.form.lorry_number = response.data.lorry_number
          this.form.user_name = response.data.supplier.supplier_name
          this.new_supplier_id = response.data.supplier.id
          this.company_vehicle = response.data.supplier.active_status
          this.form.phone_no = response.data.supplier.phone_no

        } catch (error) {
        }

      }

      this.getUsers()
      // ✅ refresh table
      this.$refs.table.refresh()
    },

    clearForm() {
      this.form = {
        first_name: '',
        last_name: '',
        address: '',
        phone_no: '',
        category: '',
      };
    },

    resetModalPrice() {
      this.form = {};
    },

    validatePhone() {
      const phone = this.form.phone_no

      if (!/^94\d{9}$/.test(phone)) {
        this.phone_no_status = false
        this.phoneError = 'Enter valid number (947XXXXXXXX)'
      } else {
        this.phone_no_status = true
        this.phoneError = ''
      }
    },


    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },
    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await order.getNewPlasticOrders(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          lorry_number: x.lorry_number,
          supplier_name: x.supplier_name,
          driver_id: x.driver_id,
          order_date: x.order_date ? x.order_date : 'N/A',
          order_time: x.order_time ? x.order_time : 'N/A',
          payment: x.payment ? x.payment : 0,
          active_status: x.active_status,
        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        this.getData = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    async deleteSms(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this?',
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
            await driver.smsDelete(id)
            this.showSuccessMessage('Vehicle has been deleted')
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

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },


    async addNewOrder() {
      try {
        this.isLoading = true

        const payload = {
          cashier_id: JSON.parse(localStorage.getItem('userData')).id,
          lorry_id: this.filters['lorry_number'],
          supplier_id: this.new_supplier_id,
          driver_id: this.driver_id
        }

        await order.plasticOrderCreate(payload)

        this.showSuccessMessage('Create Order Successfully')
        this.filters['lorry_number'] = ''
        this.driver_id = ''
        this.form.user_name = ''
        this.new_supplier_id = ''
        this.$refs.table.refresh()

      } catch (error) {

        const message = error.response?.data?.message;
        if (message) {
          this.showErrorMessage(message);
          return;
        }

        const errors = error.response?.data?.data;
        if (errors && Object.keys(errors).length > 0) {
          const firstError = Object.values(errors)[0][0];
          this.showErrorMessage(firstError);
          return;
        }

        this.showErrorMessage('Something went wrong');

      } finally {
        this.isLoading = false
      }

      this.filters['lorry_number'] = ''
      this.driver_id = ''
      this.form.user_name = ''
      this.new_supplier_id = ''
      this.$refs.table.refresh()
    },

  },

  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin' && JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAccountant') {
      this.$router.push('/')
    }

    this.groupData()
    this.driverGroupData()
    this.vehicleGroupData()

  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";


.plastic-header-card {
  background: linear-gradient(135deg, #228a1e, #2faf16);
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
.plastic-back-btn {
  background: linear-gradient(135deg, #228a1e, #228a1e);
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

.plastic-invoice-badge {
  background: #0d8502;
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
  font-size: 1.3rem;
  font-weight: 700;
  color: #000000;
}

.supplier-name {
  font-size: 1.2rem;
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
  color: #1915ff;
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