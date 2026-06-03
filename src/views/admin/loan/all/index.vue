<template>
  <div class="invoice-page loan-page">
    <section class="invoice-preview-wrapper">

      <b-card no-body class="main-card shadow-sm border-0">

        <!-- FILTER AREA -->
        <div class=" filter-area">

          <b-row class="align-items-center">

            <b-col cols="12" xl="7" class="mb-1">

              <h4 class="d-md-none d-lg-none">Date Range - {{ rangeDate }}</h4>

              <div class="action-card  d-flex align-items-center">
                <div class="mr-1">
                  <b-form-group class="">

                    <flat-pickr v-model="rangeDate" class="form-control date-picker mt-1" :config="dateConfig" />
                  </b-form-group>
                </div>
                <b-form-input v-model="search" class="d-inline-block modern-search mr-1 " placeholder="🔍 Search ..." />
              </div>
            </b-col>
            <b-col cols="12" xl="5" class="action-card mb-1">
              <div class="d-flex align-items-center justify-content-end">
                <b-button class="ml-2 modern-btn mr-1 mt-md-0" variant="primary" @click="loadLoans">
                  <feather-icon icon="RefreshCwIcon" size="16" class="mr-50" />

                  Refresh
                </b-button>
                <b-button class="modern-btn single-line-text" id="toggle-btn-price"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                  <span class="align-middle">
                    Add New Loan
                  </span>
                </b-button>
                <b-button class="ml-1 modern-btn single-line-text" @click="printInvoice">
                  <span class="align-middle">
                    Print
                  </span>
                </b-button>

              </div>

            </b-col>

          </b-row>

          <!-- ================= ADD LOAN MODAL ================= -->
          <b-modal size="lg" id="modal-prevent-closing-price" centered ref="my-modal-price" title="Add New Loan"
            ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
            @ok="handleOkPrice">

            <form ref="form" @submit.stop.prevent="handleSubmitPrice">

              <b-col sm="12" md="12">

                <b-form-group label="Select Category">

                  <v-select v-model="loan_id" label="label" :options="loansOptions" :reduce="item => item.value"
                    class="custom-v-select" required @input="addCategory" />

                </b-form-group>

              </b-col>

               <!-- SUPPLIERS -->
              <b-col v-if="loan_id === 1" sm="12" md="12">

                <b-form-group label="Select Supplier">

                  <v-select v-model="supplier_id" label="label" :options="supplier_groups" :reduce="item => item"
                    class="custom-v-select" required />

                </b-form-group>
                {{ supplier_id }}

              </b-col>

               <!-- COMPANY -->
              <b-col v-if="loan_id === 2" sm="12" md="12">

                <b-form-group label="Select Company">

                  <v-select v-model="company_id" label="label" :options="company_groups" :reduce="item => item"
                    class="custom-v-select" required />

                </b-form-group>

              </b-col>

              <!-- STAFF -->
              <b-col v-if="loan_id === 3" sm="12" md="12">

                <b-form-group label="Select Staff Member">

                  <v-select v-model="staff_id" label="label" :options="staff_groups" :reduce="item => item"
                    class="custom-v-select" required />

                </b-form-group>

              </b-col>

              <!-- Note -->
              <b-col sm="12" md="12">

                <b-form-group label="Note" label-for="note" invalid-feedback="Note is required">

                  <b-form-input id="note" v-model="note" :state="note_status" placeholder="Enter Note" />

                </b-form-group>

              </b-col>

              <!-- Cash -->
              <b-col sm="12" md="12">

                <b-form-group label="Cash" label-for="cash" invalid-feedback="Cash is required">

                  <b-form-input id="cash" v-model="cash" :state="cash_status" type="number" placeholder="Enter Amount"
                    @input="addAmountData" />

                </b-form-group>

              </b-col>

              <b-col sm="12" md="12">

                <b-form-group label="Card" label-for="bank" invalid-feedback="Amount is required">

                  <b-form-input id="bank" v-model="bank" :state="bank_status" type="number"
                    placeholder="Enter Card Amount" @input="addAmountData" />

                </b-form-group>

              </b-col>

              <b-col sm="12" md="12">

                <b-form-group label="Total Amount" label-for="amount">

                  <b-form-input disabled id="amount" v-model="amount" :state="amount_status" type="number"
                    placeholder="Enter Card Amount" />

                </b-form-group>

              </b-col>

            </form>

          </b-modal>
        </div>
        <div class="invoice-card">

          <!-- SUPPLIER -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom supplier-header d-flex justify-content-between align-items-center"
              @click="showSupplier = !showSupplier" style="cursor:pointer;">
              <span>Supplier Loans</span>

              <feather-icon :icon="showSupplier ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showSupplier">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="supplier_loans" :fields="supplierFields" responsive hover small sticky-header="400px"
                    head-variant="light" class="modern-table" />

                </div>

              </b-overlay>

              <div v-if="supplier_loans.length == 0" class="empty-state">
                No Supplier Loans
              </div>

            </b-collapse>

          </b-card>

          <!-- COMPANY -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom company-header d-flex justify-content-between align-items-center"
              @click="showCompany = !showCompany" style="cursor:pointer;">
              <span>Company Loans</span>

              <feather-icon :icon="showCompany ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showCompany">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="company_loans" :fields="companyFields" responsive hover small sticky-header="400px"
                    head-variant="light" class="modern-table" />

                </div>

              </b-overlay>

              <div v-if="company_loans.length == 0" class="empty-state">
                No Company Loans
              </div>

            </b-collapse>

          </b-card>

          <!-- USER -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom user-header d-flex justify-content-between align-items-center"
              @click="showUser = !showUser" style="cursor:pointer;">
              <span>User Loans</span>

              <feather-icon :icon="showUser ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showUser">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="user_loans" :fields="userFields" responsive hover small sticky-header="400px"
                    head-variant="light" class="modern-table" />

                </div>

              </b-overlay>

              <div v-if="user_loans.length == 0" class="empty-state">
                No User Loans
              </div>

            </b-collapse>

          </b-card>

        </div>

      </b-card>
    </section>
  </div>
</template>

<script>
import {
  BModal,
  BCard,
  BRow,
  BCol,
  BTable,
  BOverlay,
  BButton,
  BFormInput,
  BFormGroup,
} from 'bootstrap-vue'

import flatPickr from 'vue-flatpickr-component';
import vSelect from 'vue-select'
import admin from '@/apis/modules/admin'

export default {

  components: {
    BModal,
    BFormGroup,
    BCard,
    BRow,
    BCol,
    BTable,
    BOverlay,
    BButton,
    BFormInput,
    vSelect,
    flatPickr,
  },

  setup() {
    const loansOptions = [
      { label: 'Supplier Loan', value: 1 },
      { label: 'Company Loan', value: 2 },
      { label: 'Staff Loan', value: 3 },
    ]

    return {
      loansOptions,
    }
  },

  data() {

    let today = new Date();
    let last_date = new Date();
    today.setDate(today.getDate() - 1);
    last_date.setDate(today.getDate() - 6);
    return {

      userData: JSON.parse(localStorage.getItem('userData')),
      loan_id: '',
      expenses_groups: [],
      company_groups: [],
      staff_groups: [],
      supplier_groups: [],

      cashier_id: '',
      category_id: '',
      sub_category_id: '',
      note: '',

      company_id:'',
      supplier_id: '',
      staff_id: '',
      expenses_type_id: '',
      cash: 0,
      bank: 0,
      amount: 0,

      showUser: true,
      showCompany: true,
      showSupplier: true,

      tableLoading: false,

      search: '',

      rangeDate: new Date().toISOString().split('T')[0],

      supplier_loans: [],
      company_loans: [],
      user_loans: [],

       supplierFields: [
        { key: 'users_user_name', label: 'Name' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Loan' },
        { key: 'pay', label: 'Paid' },
        { key: 'date', label: 'Date' },
      ],

      companyFields: [
        { key: 'users_user_name', label: 'Name' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Loan' },
        { key: 'pay', label: 'Paid' },
        { key: 'date', label: 'Date' },
      ],

      userFields: [
        { key: 'users_user_name', label: 'Name' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Loan' },
        { key: 'pay', label: 'Paid' },
        { key: 'date', label: 'Date' },
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


    }
  },

  watch: {
    rangeDate(newVal) {
      if (!newVal || newVal.length === 0) return
      this.dateAdd()
    }
  },

  methods: {
    printInvoice() {
      window.print();
    },

    async addCategory(){
      this.company_id = ''
      this.supplier_id = ''
      this.staff_id = ''
    },

    async staffGroupData() {
      try {
        const response = await admin.staffData()
        this.staff_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    async supplierGroupData() {
      try {
        const response = await admin.allSupplierdata()
        this.supplier_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

        async companyGroupData() {
      try {
        const response = await admin.allCompanyData()
        this.company_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    async addAmountData() {
      try {

        this.amount =
          parseFloat(this.cash || 0) +
          parseFloat(this.bank || 0);

      } catch (error) {
        console.log(error);
      }

      this.$refs.table.refresh();
    },

      async loadLoans() {

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

          start_date: formattedStartDate,

          end_date: formattedEndDate,

          search: this.search,
        }

        const response = await admin.getTodayLoans(payload)

        /*
        |--------------------------------------------------------------------------
        | Supplier Loans
        |--------------------------------------------------------------------------
        */

        this.supplier_loans = response.data.supplier_loans.map(x => ({

          id: x.id,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',
          
          pay: x.status == 2
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank:  `Rs ${Number(x.bank).toFixed(2)}`,

          date: x.order_date,

        }))

        /*
        |--------------------------------------------------------------------------
        | Company Loans
        |--------------------------------------------------------------------------
        */

        this.company_loans = response.data.company_loans.map(x => ({

          id: x.id,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          pay: x.status == 2
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank:  `Rs ${Number(x.bank).toFixed(2)}`,

          date: x.order_date,

        }))

        /*
        |--------------------------------------------------------------------------
        | User Loans
        |--------------------------------------------------------------------------
        */

        this.user_loans = response.data.user_loans.map(x => ({

          id: x.id,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          pay: x.status == 2
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank:  `Rs ${Number(x.bank).toFixed(2)}`,

          date: x.order_date,

        }))

      } catch (error) {

        console.log(error)

      } finally {

        this.tableLoading = false
      }
    },


    checkFormValidityPrice() {

      const valid = this.$refs.form.checkValidity()

      this.note_status = valid
      this.cash_status = valid
      this.bank_status = valid
      this.amount_status = valid

      return valid
    },

    resetModalPrice() {

      this.loan_id = null
      this.expenses_type_id = null
      this.staff_id = null
      this.vehicle_id = null

      this.note = ''
      this.cash = 0
      this.bank = 0
      this.amount = 0

      this.note_status = null
      this.cash_status = null
      this.bank_status = null
      this.amount_status = null
    },


    handleOkPrice(bvModalEvt) {

      // Prevent modal auto close
      bvModalEvt.preventDefault()

      // Submit manually
      this.handleSubmitPrice()
    },


    handleSubmitPrice() {

      // Validate amount
      if (parseFloat(this.amount) <= 0) {

        this.showErrorMessage('Please enter valid amount')
        return
      }

      // Form validation
      if (!this.checkFormValidityPrice()) {
        return
      }

      this.addExpenses()

      // Close modal
      this.$nextTick(() => {
        this.$refs['my-modal-price'].hide()
      })
    },

    /*
    |--------------------------------------------------------------------------
    | Create Expenses
    |--------------------------------------------------------------------------
    */

    async addExpenses() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      try {

        this.isLoading = true

        const payload = {
          cashier_id: userData?.id || userData?.user?.id,
          category_id: this.loan_id,

          user_id:
           this.loan_id === 1
              ? this.supplier_id?.id
              : this.loan_id === 2
                ? this.company_id?.id
                : this.loan_id === 3
                  ? this.staff_id?.id
                  : null,

          note: this.note,
          user_status: this.loan_id,
          amount: parseFloat(this.cash || 0),
          bank: parseFloat(this.bank || 0),

          status: 1,
        }

        await admin.loanCreate(payload)

        this.showSuccessMessage('Expenses Added Successfully')

        this.$refs.table.refresh()
        this.loadLoans()
        this.resetModalPrice()

      } catch (error) {
        this.loadLoans()
      } finally {

        this.isLoading = false
      }
    },

    async deleteExpense(id) {

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
            await admin.expensesDelete(id)
            this.showErrorMessage('Item has been deleted')
            this.refreshTable();
            this.loadLoans()
          } else if (result.dismiss == 'cancel') {
            this.loadLoans()
            this.formLoading = false
            this.showSuccessMessage('Cancelled')
          }
        })

        await this.loadLoans()
        this.tableLoading = false

      } catch (error) {
        this.convertAndNotifyError(error)
        this.tableLoading = false
      }

      await this.loadLoans()
    },

  },

  mounted() {
    this.loadLoans()
    this.staffGroupData()
    this.supplierGroupData()
    this.companyGroupData()
  },

}
</script>


<style scoped>
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

.supplier-header {
  background: linear-gradient(45deg, #28c76f, #48da89);
}

.company-header {
  background: linear-gradient(45deg, #7367f0, #9d94ff);
}

.user-header {
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