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
                <b-button class="ml-2 modern-btn mr-1 mt-md-0" variant="primary" @click="loadExpenses">
                  <feather-icon icon="RefreshCwIcon" size="16" class="mr-50" />

                  Refresh 
                </b-button>
                <b-button class="modern-btn single-line-text" id="toggle-btn-price"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                  <span class="align-middle">
                    Add New Expenses
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
          <b-modal size="lg" id="modal-prevent-closing-price" centered ref="my-modal-price" title="Add New Expenses"
            ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
            @ok="handleOkPrice">

            <form ref="form" @submit.stop.prevent="handleSubmitPrice">

              <b-col sm="12" md="12">

                <b-form-group label="Select Category">

                  <v-select v-model="expense_id" label="label" :options="expensesOptions" :reduce="item => item.value"
                    class="custom-v-select" required @input="addSubItemData" />

                </b-form-group>

              </b-col>

              <b-col sm="12" md="12">

                <b-form-group label="Select Expenses Type">

                  <v-select v-model="expenses_type_id" label="label" :options="expenses_groups" :reduce="item => item"
                    class="custom-v-select" required />

                </b-form-group>

              </b-col>



              <!-- Staff -->
              <b-col v-if="expense_id === 2" sm="12" md="12">

                <b-form-group label="Select Staff Member">

                  <v-select v-model="staff_id" label="label" :options="staff_groups" :reduce="item => item"
                    class="custom-v-select" required />

                </b-form-group>

              </b-col>

              <b-col v-if="expense_id === 3" sm="12" md="12">

                <b-form-group label="Select Vehicle Number">

                  <v-select v-model="vehicle_id" label="label" :options="vehicle_groups" :reduce="item => item"
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


          <!-- COMPANY -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2" :class="showSupplier ? '' : 'action-card'">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom company-header d-flex justify-content-between align-items-center"
              @click="showSupplier = !showSupplier" style="cursor:pointer;">
              <span>Company Expenses</span>

              <feather-icon :icon="showSupplier ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showSupplier">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="companies_expenses" :fields="companyFields" responsive hover small
                    sticky-header="400px" head-variant="light" class="modern-table">

                    <template #cell(date)="data">

                      <div class="text-nowrap">
                        {{ data.item.date }} - {{ data.item.time }}
                        <b-button v-if="userData.id === 1"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger"
                          class="action-card ml-1 btn-icon mr-50" @click="deleteExpense(data.item.id)">
                          <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="TrashIcon" size="16" />
                        </b-button>


                      </div>
                    </template>

                  </b-table>

                </div>

              </b-overlay>

              <div v-if="companies_expenses.length == 0" class="empty-state">
                No Company Expenses
              </div>

            </b-collapse>

          </b-card>

          <!-- STAFF -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2" :class="showCompany ? '' : 'action-card'">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom staff-header d-flex justify-content-between align-items-center"
              @click="showCompany = !showCompany" style="cursor:pointer;">
              <span>Staff Expenses</span>

              <feather-icon :icon="showCompany ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showCompany">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="staff_expenses" :fields="staffFields" responsive hover small sticky-header="400px"
                    head-variant="light" class="modern-table">

                    <template #cell(date)="data">

                      <div class="text-nowrap">
                        {{ data.item.date }} - {{ data.item.time }}
                      </div>
                    </template>

                           <template #cell(action)="data">

                      <div class="text-nowrap">
                        <b-button v-if="userData.id === 1" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger"
                          @click="deleteExpense(data.item.id)" class="action-card ml-1 btn-icon mr-50">
                          <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="TrashIcon" size="16" />
                        </b-button>
                      </div>
                    </template>
                  </b-table>

                </div>

              </b-overlay>

              <div v-if="staff_expenses.length == 0" class="empty-state">
                No Staff Expenses
              </div>

            </b-collapse>

          </b-card>

          <!-- VEHICLE -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2" :class="showVehicle ? '' : 'action-card'">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom vehicle-header d-flex justify-content-between align-items-center"
              @click="showVehicle = !showVehicle" style="cursor:pointer;">
              <span>Vehicle Expenses</span>

              <feather-icon :icon="showVehicle ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showVehicle">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="vehicle_expenses" :fields="vehicleFields" responsive hover small
                    sticky-header="400px" head-variant="light" class="modern-table">

                    <template #cell(date)="data">

                      <div class="text-nowrap">
                        {{ data.item.date }} - {{ data.item.time }}
                      </div>
                    </template>

                     <template #cell(action)="data">

                      <div class="text-nowrap">
                        <b-button v-if="userData.id === 1"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger"
                          class="action-card ml-1 btn-icon mr-50" @click="deleteExpense(data.item.id)">
                          <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="TrashIcon" size="16" />
                        </b-button>
                      </div>
                    </template>

                  </b-table>

                </div>

              </b-overlay>

              <div v-if="vehicle_expenses.length == 0" class="empty-state">
                No Vehicle Expenses
              </div>

            </b-collapse>

          </b-card>

          <!-- OTHER -->
          <b-card no-body class="loan-card border-0 shadow-sm mb-2" :class="showOther ? '' : 'action-card'">

            <!-- COLLAPSIBLE HEADER -->
            <div class="card-header-custom other-header d-flex justify-content-between align-items-center"
              @click="showOther = !showOther" style="cursor:pointer;">
              <span>Other Expenses</span>

              <feather-icon :icon="showOther ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
            </div>

            <!-- COLLAPSE -->
            <b-collapse v-if="showOther">

              <b-overlay :show="tableLoading" rounded="sm">

                <div class="table-wrapper">

                  <b-table :items="other_expenses" :fields="otherFields" responsive hover small sticky-header="400px"
                    head-variant="light" class="modern-table">

                    <template #cell(date)="data">

                      <div class="text-nowrap">
                        {{ data.item.date }} - {{ data.item.time }}
                        <b-button v-if="userData.id === 1"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger"
                          class="action-card ml-1 btn-icon mr-50" @click="deleteExpense(data.item.id)">
                          <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="TrashIcon" size="16" />
                        </b-button>


                      </div>
                    </template>

                  </b-table>

                </div>

              </b-overlay>

              <div v-if="other_expenses.length == 0" class="empty-state">
                No Other Expenses
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
    const expensesOptions = [
      { label: 'Company Expenses', value: 1 },
      { label: 'Staff Expenses', value: 2 },
      { label: 'Vehicle Expenses', value: 3 },
      { label: 'Other Expenses', value: 4 },
    ]

    return {
      expensesOptions,
    }
  },

  data() {

    let today = new Date();
    let last_date = new Date();
    today.setDate(today.getDate() - 1);
    last_date.setDate(today.getDate() - 6);
    return {

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

      showSupplier: true,
      showCompany: true,
      showVehicle: true,
      showOther: true,

      tableLoading: false,

      search: '',

      rangeDate: new Date().toISOString().split('T')[0],

      companies_expenses: [],
      staff_expenses: [],
      vehicle_expenses: [],
      other_expenses: [],

      companyFields: [
        { key: 'expense_name', label: 'type' },
        { key: 'cashier_name', label: 'cashier' },
        { key: 'note', label: 'note' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Expense' },
        { key: 'date', label: 'Date' },
      ],

      staffFields: [
        { key: 'expense_name', label: 'type' },
        { key: 'cashier_name', label: 'cashier' },
        { key: 'users_user_name', label: 'Staff Member' },
        { key: 'note', label: 'note' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Expense' },
        { key: 'date', label: 'Date' },
        { key: 'action', label: 'Signature' },
      ],

      vehicleFields: [
        { key: 'expense_name', label: 'type' },
        { key: 'cashier_name', label: 'cashier' },
        { key: 'users_user_name', label: 'Vehicle Number' },
        { key: 'note', label: 'note' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Expense' },
        { key: 'date', label: 'Date' },
        { key: 'action', label: 'Signature' },
      ],

      otherFields: [
        { key: 'expense_name', label: 'type' },
        { key: 'cashier_name', label: 'cashier' },
        { key: 'note', label: 'note' },
        { key: 'cash', label: 'Cash' },
        { key: 'bank', label: 'Card' },
        { key: 'amount', label: 'Expense' },
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

    async staffGroupData() {
      try {
        const response = await admin.staffData()
        this.staff_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    async vehicleGroupData() {
      try {
        const response = await admin.companyVehicleData()
        this.vehicle_groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    async addSubItemData(value) {

      try {
        const response = await admin.getExpensesTypesDetails(value)
        this.expenses_groups = response.data.data


      } catch (error) {
      }
      this.$refs.table.refresh()
    },


    async addAmountData() {
      try {

        this.amount =
          parseFloat(this.cash || 0) +
          parseFloat(this.bank || 0);

      } catch (error) {
      }

      this.$refs.table.refresh();
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

          start_date: formattedStartDate,

          end_date: formattedEndDate,

          search: this.search,
        }

        const response = await admin.getTodayExpenses(payload)

        /*
        |--------------------------------------------------------------------------
        | Company Expenses
        |--------------------------------------------------------------------------
        */

        this.companies_expenses = response.data.company_expenses.map(x => ({

          id: x.id,

          expense_name: x.expense_name,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank: `Rs ${Number(x.bank).toFixed(2)}`,

          cashier_name: x.cashier_name,

          note: x.note,

          date: x.order_date,

          time: x.order_time,

        }))

        /*
        |--------------------------------------------------------------------------
        | Staff Expenses
        |--------------------------------------------------------------------------
        */

        this.staff_expenses = response.data.staff_expenses.map(x => ({

          id: x.id,

          expense_name: x.expense_name,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank: `Rs ${Number(x.bank).toFixed(2)}`,

          cashier_name: x.cashier_name,

          note: x.note,

          date: x.order_date,

          time: x.order_time,

        }))

        /*
        |--------------------------------------------------------------------------
        | Vehicle Expenses
        |--------------------------------------------------------------------------
        */

        this.vehicle_expenses = response.data.vehicle_expenses.map(x => ({

          id: x.id,

          expense_name: x.expense_name,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank: `Rs ${Number(x.bank).toFixed(2)}`,

          cashier_name: x.cashier_name,

          note: x.note,

          date: x.order_date,

          time: x.order_time,

        }))

        /*
        |--------------------------------------------------------------------------
        | Other Expenses
        |--------------------------------------------------------------------------
        */

        this.other_expenses = response.data.other_expenses.map(x => ({

          id: x.id,

          expense_name: x.expense_name,

          users_user_name: x.users_user_name,

          amount: x.status == 1
            ? `Rs ${Number(x.amount).toFixed(2)}`
            : '-',

          cash: `Rs ${Number(x.cash).toFixed(2)}`,

          bank: `Rs ${Number(x.bank).toFixed(2)}`,

          cashier_name: x.cashier_name,

          note: x.note,

          date: x.order_date,

          time: x.order_time,

        }))

      } catch (error) {

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

      this.expense_id = null
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
          category_id: this.expense_id,
          sub_category_id: this.expenses_type_id?.id || null,

          user_id:
            this.expense_id === 2
              ? this.staff_id?.id
              : this.expense_id === 3
                ? this.vehicle_id?.id
                : null,

          note: this.note,

          cash: parseFloat(this.cash || 0),
          bank: parseFloat(this.bank || 0),
          amount: parseFloat(this.amount || 0),

          status: 1,
        }

        await admin.expensesCreate(payload)

        this.showSuccessMessage('Expenses Added Successfully')

        this.$refs.table.refresh()
        this.loadExpenses()
        this.resetModalPrice()

      } catch (error) {
        this.loadExpenses()
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
            this.loadExpenses()
          } else if (result.dismiss == 'cancel') {
            this.loadExpenses()
            this.formLoading = false
            this.showSuccessMessage('Cancelled')
          }
        })

        await this.loadExpenses()
        this.tableLoading = false

      } catch (error) {
        this.convertAndNotifyError(error)
        this.tableLoading = false
      }

      await this.loadExpenses()
    },

  },

  mounted() {
    this.loadExpenses()
    this.staffGroupData()
    this.vehicleGroupData()
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

.company-header {
  background: linear-gradient(45deg, #28c76f, #48da89);
}

.staff-header {
  background: linear-gradient(45deg, #ff9f43, #ffbe76);
}

.vehicle-header {
  background: linear-gradient(45deg, #7367f0, #9d94ff);
}

.other-header {
  background: linear-gradient(45deg, #436fff, #436fff);
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