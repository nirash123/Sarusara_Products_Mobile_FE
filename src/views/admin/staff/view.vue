<template>
  <div>
    <b-card no-body class="card card-congratulations-profile">
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-button @click="$router.push('/staffs')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-white'
              class="action-card btn-icon mb-5 mx-2">
              <feather-icon size="80" icon='ChevronsLeftIcon' />
            </b-button>

            <b-media-aside>

              <b-avatar v-if="users.image" :ref="previewEl" :src="imageUrl + users.image" size="120px" rounded />
              <b-avatar v-else :src="avatar" size="120px" rounded />

            </b-media-aside>

          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h1 class="font-large-1 text-white">
              {{ users.first_name }} {{ users.last_name }} - {{ users.user_code }} ( {{ users.user_name }} )
            </h1>
            <h4 class="text-white">
              <span class="user-status">{{ users.owner_name }} </span>
            </h4>
            <b-badge v-if="users.active_status == '1'" style="padding: 10px" variant="light-success">
              Active
            </b-badge>
            <b-badge v-if="users.active_status == '2'" style="padding: 10px" variant="light-warning">
              InActive
            </b-badge>
          </div>


          <!--/ profile title -->
        </div>
      </div>
    </b-card>
    <b-card>
      <b-row>
        <b-col lg="12" md="12" sm="12">
          <b-row>
            <b-col lg="6" md="6" sm="6">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2">
                  About
                </h4>
                <b-card-text>
                  I am {{ users.first_name }} {{ users.last_name }} . I am
                  <span v-if="users.admin_role == 'TBSAdmin' && users.id == 1">Super Admin</span>
                  <span v-if="users.admin_role == 'TBSAdmin' && users.id != 1">Admin</span>
                  <span v-if="users.admin_role == 'TBSAccountant'">Accountant</span>
                  <span v-if="users.admin_role == 'TBSWorker'">Worker</span>
                  <span v-if="users.admin_role == 'TBSSupervisor'">Supervisor</span>
                  <span v-if="users.admin_role == 'TBSDriver'">Driver</span>
                  in T B S Sarusara Products.
                </b-card-text>
              </div>

              <div class="ml-2">
                <h4 class="text-capitalize mt-2">
                  Lives
                </h4>
                <b-card-text>
                  <div v-if="users.address">
                    {{ users.address }}
                  </div>
                  <div v-else>
                    N/A
                  </div>
                </b-card-text>
              </div>

              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Mobile Number
                </h4>
                <b-card-text>
                  <div v-if="users.phone_no">
                    {{ users.phone_no }}
                  </div>
                  <div v-else>
                    N/A
                  </div>
                </b-card-text>
              </div>

              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Role
                </h4>
                <b-card-text>
                  <div>
                    <span v-if="users.admin_role == 'TBSAdmin' && users.id == 1">Super Admin</span>
                    <span v-if="users.admin_role == 'TBSAdmin' && users.id != 1">Admin</span>
                    <span v-if="users.admin_role == 'TBSAccountant'">Accountant</span>
                    <span v-if="users.admin_role == 'TBSWorker'">Worker</span>
                    <span v-if="users.admin_role == 'TBSSupervisor'">Supervisor</span>
                    <span v-if="users.admin_role == 'TBSDriver'">Driver</span>
                  </div>

                </b-card-text>
              </div>
            </b-col>
            <b-col lg="6" md="6" sm="6">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Date of Birth
                </h4>
                <b-card-text>
                  <div v-if="users.dob">
                    {{ users.dob }}
                  </div>
                  <div v-else>
                    N/A
                  </div>
                </b-card-text>
              </div>
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Joined Date
                </h4>
                <b-card-text>
                  <div v-if="users.join_date">
                    {{ users.join_date }}
                  </div>
                  <div v-else>
                    N/A
                  </div>
                </b-card-text>
              </div>
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Loan Amount
                </h4>
                <b-card-text>
                  <div v-if="users.loan" class="text-danger">
                    Rs. {{ users.loan }}
                  </div>
                </b-card-text>
              </div>
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Salary Advance
                </h4>
                <b-card-text>
                  <div v-if="users.salary_advance">
                    Rs. {{ users.salary_advance }}
                  </div>
                </b-card-text>
              </div>
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  EPF
                </h4>
                <b-card-text>
                  <div v-if="users.epf">
                    Rs. {{ users.epf }}
                  </div>
                </b-card-text>
              </div>
            </b-col>
            <b-col lg="12" md="12" sm="12">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Day Shift (For 01 hour)
                </h4>
                <b-row>
                  <b-col cols="4">
                    <b><i>Day Shift</i></b><br>
                    {{ users.a_shift ? 'Rs: ' + users.a_shift : 'N/A' }}
                  </b-col>
                  <b-col cols="4">
                    <b><i>OT Shift</i></b><br>
                    {{ users.b_shift ? 'Rs: ' + users.b_shift : 'N/A' }}
                  </b-col>
                  <b-col cols="4">
                    <b><i>Extra Shift </i></b><br>
                    {{ users.c_shift ? 'Rs: ' + users.c_shift : 'N/A' }}
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <!-- <b-col lg="12" md="12" sm="12">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                  Night Shift (For 01 hour)
                </h4>
                <b-row>
                  <b-col cols="4">
                    <b><i>Night Shift</i></b><br>
                    {{ users.na_shift ? 'Rs: ' + users.na_shift : 'N/A' }}
                  </b-col>
                  <b-col cols="4">
                    <b><i>OT Shift</i></b><br>
                    {{ users.nb_shift ? 'Rs: ' + users.nb_shift : 'N/A' }}
                  </b-col>
                  <b-col cols="4">
                    <b><i>Extra Shift </i></b><br>
                    {{ users.nc_shift ? 'Rs: ' + users.nc_shift : 'N/A' }}
                  </b-col>
                </b-row>
              </div>
            </b-col> -->
          </b-row>
        </b-col>
        <b-col lg="6" md="12" sm="12">
        </b-col>
      </b-row>
    </b-card>
    <div class="invoice-page loan-page">
      <section class="invoice-preview-wrapper">

        <b-card no-body class="main-card shadow-sm border-0">

          <!-- FILTER AREA -->
          <div class=" filter-area">

            <b-row class="align-items-center">

              <b-col cols="12" xl="7" class="mb-1">

                <h4 class="d-md-none d-lg-none">Date Range - {{ rangeDate }}</h4>
                <div class="action-card">
                  <b-form-input v-model="search" class="d-inline-block modern-search mr-1 "
                    placeholder="🔍 Search ..." />
                </div>

                <div class="action-card  d-flex align-items-center">
                  <div class="mr-1">
                    <b-form-group class="">

                      <flat-pickr v-model="rangeDate" class="form-control date-picker mt-1" :config="dateConfig" />
                    </b-form-group>
                  </div>
                </div>
              </b-col>
              <b-col cols="12" xl="5" class="action-card mb-1">
                <div class="d-flex align-items-center justify-content-end">
                  <b-button class="ml-2 modern-btn mr-1 mt-md-0" variant="primary" @click="loadExpenses">
                    <feather-icon icon="RefreshCwIcon" size="16" class="mr-50" />

                    Refresh
                  </b-button>
                  <b-button class="ml-1 modern-btn single-line-text" @click="printInvoice">
                    <span class="align-middle">
                      Print
                    </span>
                  </b-button>

                </div>

              </b-col>

            </b-row>
          </div>
          <div class="invoice-card">


            <!-- COMPANY -->
            <b-card no-body class="loan-card border-0 shadow-sm mb-2">

              <!-- COLLAPSIBLE HEADER -->
              <div class="card-header-custom staff_header d-flex justify-content-between align-items-center"
                style="cursor:pointer;">
                <span>Expenses</span>

              </div>


              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="staffs_expenses" :fields="companyFields" responsive hover small sticky-header="500px"
                    head-variant="light" class="modern-table">

                    <!-- TYPE -->
                    <template #cell(expense_name)="data">

                      <div :class="[
                        data.item.expense_name === 'TOTAL'
                          ? 'total-text'
                          : 'normal-text'
                      ]">

                        {{ data.item.expense_name }}

                      </div>

                    </template>

                    <!-- CASH -->
                    <template #cell(cash)="data">

                      <div :class="[
                        data.item.expense_name === 'TOTAL'
                          ? 'total-amount'
                          : ''
                      ]">

                        {{ data.item.cash }}

                      </div>

                    </template>

                    <!-- CARD -->
                    <template #cell(bank)="data">

                      <div :class="[
                        data.item.expense_name === 'TOTAL'
                          ? 'total-amount'
                          : ''
                      ]">

                        {{ data.item.bank }}

                      </div>

                    </template>

                    <!-- AMOUNT -->
                    <template #cell(amount)="data">

                      <div :class="[
                        data.item.expense_name === 'TOTAL'
                          ? 'grand-total'
                          : 'expense-amount'
                      ]">

                        {{ data.item.amount }}

                      </div>

                    </template>

                    <!-- RECORDS -->
                    <template #cell(record)="data">

                      <div :class="[
                        data.item.expense_name === 'TOTAL'
                          ? 'total-records'
                          : ''
                      ]">

                        {{ data.item.record }}

                      </div>

                    </template>

                    <!-- ROW STYLE -->
                    <template #row-class="item">

                      {{ item.expense_name === 'TOTAL'
                        ? 'total-row'
                        : ''
                      }}

                    </template>

                  </b-table>

                </div>

              </b-overlay>

              <div v-if="staffs_expenses.length == 0" class="empty-state">
                No Staff Expenses
              </div>


            </b-card>
          </div>

        </b-card>
      </section>
    </div>
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
import staff from "@/apis/modules/staff";
import flatPickr from 'vue-flatpickr-component';
import admin from '@/apis/modules/admin'

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
    flatPickr,
  },
  directives: {
    Ripple,
  },
  setup() {

    return {
    }
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    let today = new Date();
    let last_date = new Date();
    today.setDate(today.getDate() - 1);
    last_date.setDate(today.getDate() - 6);
    return {
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      users: {},
      errorPhone: '',
      user_name: '',
      address: '',
      title: '',
      bring_date: '',
      req_type: '',
      phone_no: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      loading: false,
      active_status: '',
      current_status_code: '',
      avatar: require('@/assets/images/avatars/avatar.png'),

      userData: JSON.parse(localStorage.getItem('userData')),
      expense_id: '',
      expenses_groups: [],
      staff_groups: [],
      vehicle_groups: [],

      cashier_id: '',
      category_id: '',
      sub_category_id: '',
      note: '',

      staff_id: '',
      vehicle_id: '',
      expenses_type_id: '',
      cash: 0,
      bank: 0,
      amount: 0,

      tableLoading: false,

      search: '',

      rangeDate: new Date().toISOString().split('T')[0],

      staffs_expenses: [],
      companyFields: [
        { key: 'subcategory', label: 'subcategory' },
        { key: 'note', label: 'note' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Expense' },
        { key: 'date', label: 'date' },
        { key: 'time', label: 'time' },
      ],

      dateConfig: {
        mode: 'range',
        dateFormat: 'Y-m-d',
        allowInput: true,
        minDate: new Date(
          new Date().setDate(new Date().getDate() - 90)
        ).toISOString().split('T')[0],

        maxDate: new Date().toISOString().split('T')[0],

        onClose: function (selectedDates, dateStr, instance) {

          if (selectedDates.length === 1) {

            const sameDate = selectedDates[0]

            instance.setDate([sameDate, sameDate], true)
          }
        }
      },
    };
  },
    watch: {
        rangeDate(newVal) {
            if (!newVal || newVal.length === 0) return
            this.dateAdd()
        }
    },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    } else {
      const userId = this.$route.params.id;
      this.userDetails(userId)
      this.loadExpenses()
    }
  },
  methods: {
       printInvoice() {
            window.print();
        },



        async loadExpenses() {

            try {

                this.tableLoading = true

                let startDate, endDate

                if (this.rangeDate.includes(' to ')) {

                    [startDate, endDate] = this.rangeDate.split(' to ')

                } else {

                    startDate = endDate = this.rangeDate
                }

                const formattedStartDate = new Date(startDate)
                    .toISOString()
                    .split('T')[0]

                const formattedEndDate = new Date(endDate)
                    .toISOString()
                    .split('T')[0]

                const payload = {

                    user_id: this.$route.params.id,

                    start_date: formattedStartDate,

                    end_date: formattedEndDate,

                    search: this.search,
                }

                const response = await admin.getUserxpenses(payload)

                /*
                |--------------------------------------------------------------------------
                | Staff Expenses
                |--------------------------------------------------------------------------
                */

                this.staffs_expenses = response.data.staff_expenses.map(x => ({

                    id: x.id,

                    note: x.note,

                    subcategory: x.sub_category_name,

                    cash: `Rs ${Number(x.cash).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`,

                    bank: `Rs ${Number(x.bank).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`,

                    amount: `Rs ${Number(x.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`,

                    date: x.date,

                    time: x.time,
                }))

            } catch (error) {

                console.log(error)

            } finally {

                this.tableLoading = false
            }
        },



    async userDetails(id) {
      try {
        const response = await staff.getStaffDetails(id)
        this.users = response.data
      } catch (error) {

      }

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
<style scoped>
.modern-table {
    border-radius: 14px;
    overflow: hidden;
    font-size: 14px;
}

.modern-table thead th {
    background: linear-gradient(45deg, #0b6eca, #1f8fff) !important;
    color: white !important;
    border: none !important;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
}

.modern-table tbody tr {
    transition: all 0.2s ease;
}

.modern-table tbody tr:hover {
    background: #f4f8ff !important;
}

.expense-amount {
    font-weight: 600;
    color: #2d3748;
}

.normal-text {
    font-weight: 500;
}

/* TOTAL ROW */

.total-row {
    background: linear-gradient(45deg, #0b6eca, #1f8fff) !important;
}

.total-row td {
    color: white !important;
    font-weight: 700 !important;
    border-top: 2px solid #0a58ca !important;
    font-size: 15px;
}

.total-text {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 1px;
}

.total-amount {
    font-size: 15px;
    font-weight: 800;
}

.grand-total {
    font-size: 17px;
    font-weight: 900;
}

.total-records {
    font-size: 15px;
    font-weight: 800;
}

/* CARD */

.loan-card {
    border-radius: 18px !important;
    overflow: hidden;
}

.card-header-custom {
    background: linear-gradient(45deg, #0b6eca, #1f8fff);
    color: white;
    font-size: 18px;
    font-weight: 700;
    padding: 14px 20px;
}

.table-wrapper {
    padding: 10px;
}



.modern-btn {
    background: linear-gradient(135deg, #4e73df, #224abe);
    border: none;
    border-radius: 12px;
    font-weight: 600;
}

.modern-search {
    border-radius: 12px;
    padding: 8px;
    background: transparent !important;
    box-shadow: none !important;
    height: 36px;
    font-weight: 500;
}

.modern-search:focus {
    outline: none !important;
}


.invoice-page {
    background: #f4f7fb;
    min-height: 100vh;
    padding: 25px;
}

.invoice-card {
    border-radius: 18px;
    overflow: hidden;
    border: none;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.invoice-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    flex-wrap: wrap;
}


.modern-search {
    border-radius: 12px;
    padding: 8px;
    background: transparent !important;
    box-shadow: none !important;
    height: 36px;
    font-weight: 500;
}

.modern-search:focus {
    outline: none !important;
}

.loan-page {
    background: #f8f9fc;
    min-height: 100vh;
    padding: 10px;
}

.main-card {
    border-radius: 14px;
    overflow: hidden;
}

.filter-area {
    background: white;
    padding: 18px;
    border-bottom: 1px solid #ebeef5;
}

.per-page-selector {
    min-width: 90px;
}

.search-box {
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 11px;
    color: #999;
    z-index: 10;
}

.search-input {
    padding-left: 35px;
    border-radius: 8px;
    min-width: 220px;
}

.date-picker {
    min-width: 240px;
    border-radius: 8px;
}

.refresh-btn {
    border-radius: 8px;
    padding-left: 18px;
    padding-right: 18px;
    font-weight: 600;
}

.loan-card {
    border-radius: 14px;
    overflow: hidden;
    transition: 0.3s;
    background: white;
}

.loan-card:hover {
    transform: translateY(-2px);
}

.card-header-custom {
    padding: 14px 18px;
    font-weight: 700;
    font-size: 15px;
    color: white;
}

.staff_header {
    background: linear-gradient(45deg, #ff9f43, #ffbe76);
}


.table-wrapper {
    padding: 10px;
}

.modern-table th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #f8f8f8 !important;
    font-size: 13px;
}

.modern-table td {
    vertical-align: middle;
    font-size: 13px;
}

.empty-state {
    text-align: center;
    padding: 25px;
    color: #999;
    font-size: 14px;
    font-weight: 500;
}

@media (max-width: 768px) {

    .search-input,
    .date-picker {
        width: 100%;
        min-width: 100%;
    }

    .refresh-btn {
        width: 100%;
    }
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";


.swal2-popup {
    border-radius: 16px !important;
    padding: 22px !important;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    font-family: inherit;
}

/* Title */
.swal2-title {
    font-size: 18px !important;
    font-weight: 700 !important;
    color: #2c3e50;
}

/* Text */
.swal2-html-container {
    font-size: 14px !important;
    color: #6c757d;
}

/* Confirm (Delete) button */
.swal2-popup .btn-primary {
    background: linear-gradient(135deg, #4e73df, #224abe);
    border-radius: 10px !important;
    font-weight: 600;
    padding: 8px 16px;
    transition: 0.25s ease;
}

.swal2-popup .btn-primary:hover {
    background: #bb2d3b !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(220, 53, 69, 0.25);
}

/* Cancel button */
.swal2-popup .btn-outline-danger {
    border-radius: 10px !important;
    font-weight: 600;
    padding: 8px 16px;
    color: #dc3545 !important;
    border: 1px solid #dc3545 !important;
    background: transparent !important;
    transition: 0.25s ease;
}

.swal2-popup .btn-outline-danger:hover {
    background: #dc3545 !important;
    color: #fff !important;
    transform: translateY(-1px);
}

/* Optional icon animation */
.swal2-icon.swal2-warning {
    border-color: #ffc107 !important;
    color: #ffc107 !important;
}

.invoice-page {
    background: #f4f7fb;
    min-height: 100vh;
    padding: 25px;
}

.invoice-card {
    border-radius: 18px;
    overflow: hidden;
    border: none;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.invoice-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    flex-wrap: wrap;
}

.company-section {
    display: flex;
    align-items: center;
}

.company-logo {
    width: 90px;
    margin-right: 20px;
}

.company-sub {
    font-size: 18px;
    font-weight: 600;
    color: #444;
}

.company-sub-si {
    font-size: 16px;
    color: #666;
}

.invoice-meta {
    text-align: right;
}

.meta-box {
    margin-bottom: 12px;
}

.meta-label {
    display: block;
    font-size: 13px;
    color: #999;
    margin-bottom: 3px;
}

.meta-value {
    font-size: 16px;
    font-weight: 600;
    color: #111;
}

.top-line {
    height: 5px;
    background: linear-gradient(to right,
            #0b6eca,
            #1f8fff);
}

.table-wrapper {
    padding: 25px;
}

.invoice-table {
    width: 100%;
    border-collapse: collapse;
}

.invoice-table thead tr {
    background: #0b6eca;
}

.invoice-table thead th {
    color: white;
    padding: 16px;
    font-size: 15px;
    font-weight: 600;
}

.invoice-table tbody td {
    padding: 15px;
    border-bottom: 1px solid #e9edf3;
    font-size: 15px;
}

.invoice-table tbody tr:nth-child(even) {
    background: #f9fbff;
}

.item-name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #222;
}

.qty {
    font-weight: bold;
    color: #0b6eca;
}

.empty-text {
    text-align: center;
    padding: 40px !important;
    color: #999;
}

.invoice-footer {
    border-top: 1px solid #eee;
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #fafcff;
}

.software-text {
    color: #777;
    font-style: italic;
}

.action-card {
    border: none;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.action-title {
    font-weight: 700;
    margin-bottom: 25px;
    color: #0b6eca;
}

.action-btn {
    height: 45px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 12px;
}

.custom-v-select .vs__dropdown-toggle {
    min-height: 45px;
    border-radius: 10px;
}

@media(max-width: 768px) {

    .invoice-top {
        flex-direction: column;
        align-items: flex-start;
    }

    .invoice-meta {
        text-align: left;
        margin-top: 20px;
    }

}

@media print {

    body {
        background: white !important;
    }

    .action-card,
    nav,
    footer,
    .main-menu,
    .header-navbar,
    .customizer-toggle {
        display: none !important;
    }

    .invoice-page {
        padding: 0 !important;
        background: white !important;
    }

    .invoice-card {
        box-shadow: none !important;
    }

    .table-wrapper {
        padding: 0 20px 20px 20px;
    }

    .invoice-table thead tr {
        background: #0b6eca !important;
        -webkit-print-color-adjust: exact;
    }

}
</style>