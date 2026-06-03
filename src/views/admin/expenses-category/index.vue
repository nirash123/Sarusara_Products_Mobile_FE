<template>
  <div class="loan-page">

    <b-card no-body class="main-card shadow-sm border-0">
      <b-col cols="12" md="12" class="py-2">

        <div class="d-flex align-items-center justify-content-end">

          <b-form-input v-model="search" class="d-inline-block modern-search mr-1" placeholder="🔍 Search ..."
            @input="loadExpensesCategories" />

          <!-- Add Loan Button -->
          <b-button class="modern-btn single-line-text" variant="primary" id="toggle-btn-price"
             v-b-modal.modal-prevent-closing-price>
            <span class="align-middle">
              Add New Category
            </span>
          </b-button>
        </div>
      </b-col>

      <!-- ================= ADD EXPENSES CATEGORY MODAL ================= -->
      <b-modal size="lg" id="modal-prevent-closing-price" centered ref="my-modal-price"
        title="Add New Expenses Category" ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice"
        @hidden="resetModalPrice" @ok="handleOkPrice">

        <form ref="form" @submit.stop.prevent="handleSubmitPrice">

          <b-col sm="12" md="12">

            <b-form-group label="Select Category">

              <v-select v-model="expense_id" label="label" :options="expensesOptions" :reduce="item => item.value"
                class="custom-v-select" required />

            </b-form-group>

          </b-col>

          <!-- Note -->
          <b-col sm="12" md="12">

            <b-form-group label="Expenses Name" label-for="expenses_name" invalid-feedback="Name is required">

              <b-form-input id="expenses_name" v-model="expenses_name" :state="expenses_name_status"
                placeholder="Enter Expenses Name" />

            </b-form-group>
          </b-col>
        </form>

      </b-modal>

      <!-- ================= EDIT EXPENSES CATEGORY MODAL ================= -->
      <b-modal size="lg" id="modal-prevent-closing-edit" centered ref="my-modal-edit" title="Edit Expenses Category"
        ok-title="Submit" cancel-variant="outline-secondary"  @hidden="resetModalEdit"
        @ok="handleOkEdit">

        <form ref="form" @submit.stop.prevent="handleSubmitEdit">



          <!-- Note -->
          <b-col sm="12" md="12">

            <b-form-group label="Expenses Name" label-for="expenses_name" invalid-feedback="Name is required">

              <b-form-input id="expenses_name" v-model="edit_expenses_name"
                placeholder="Enter Expenses Name" />

            </b-form-group>
          </b-col>

          <!-- Status -->
          <b-col sm="12" md="12">

            <b-form-group label="Select Status">

              <v-select v-model="edit_status" label="label" :options="statusOptions" :reduce="item => item.value"
                class="custom-v-select" required />

            </b-form-group>

          </b-col>
        </form>

      </b-modal>

      <!-- COMPANY -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

        <!-- COLLAPSIBLE HEADER -->
        <div class="card-header-custom company-header d-flex justify-content-between align-items-center"
          @click="showCompany = !showCompany" style="cursor:pointer;">
          <span>Company Expenses</span>

          <feather-icon :icon="showCompany ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
        </div>

        <!-- COLLAPSE -->
        <b-collapse v-if="showCompany">

          <b-overlay :show="tableLoading" rounded="sm">

            <div class="table-wrapper">

              <b-table :items="company_loans" :fields="dataFields" responsive hover small sticky-header="400px"
                head-variant="light" class="modern-table">

                <template #cell(status)="data">
                  <b-badge v-if="data.item.status == '1' || data.item.status == '3'" class="ml-1" style="padding: 8px"
                    variant="light-success">
                    Active
                  </b-badge>
                  <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px" variant="light-warning">
                    InActive
                  </b-badge>
                </template>

                <template #cell(edit)="data">

                  <b-button size="sm" variant="primary" class="edit-btn" @click="editExpense(data.item)">
                    <feather-icon icon="EditIcon" size="14" class="mr-50" />

                    Edit
                  </b-button>
                </template>
              </b-table>

            </div>

          </b-overlay>

          <div v-if="company_loans.length == 0" class="empty-state">
            No Company Expenses
          </div>

        </b-collapse>

      </b-card>

      <!-- STAFF -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

        <!-- COLLAPSIBLE HEADER -->
        <div class="card-header-custom staff-header d-flex justify-content-between align-items-center"
          @click="showStaff = !showStaff" style="cursor:pointer;">
          <span>Staff Expenses</span>

          <feather-icon :icon="showStaff ? 'ChevronDownIcon' : 'ChevronUpIcon'" size="18" />
        </div>

        <!-- COLLAPSE -->
        <b-collapse v-if="showStaff">

          <b-overlay :show="tableLoading" rounded="sm">

            <div class="table-wrapper">

              <b-table :items="staff_loans" :fields="dataFields" responsive hover small sticky-header="400px"
                head-variant="light" class="modern-table">

                <template #cell(status)="data">
                  <b-badge v-if="data.item.status == '1' || data.item.status == '3'" class="ml-1" style="padding: 8px"
                    variant="light-success">
                    Active
                  </b-badge>
                  <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px" variant="light-warning">
                    InActive
                  </b-badge>
                </template>

                <template #cell(edit)="data">

                  <b-button size="sm" variant="primary" class="edit-btn" @click="editExpense(data.item)">
                    <feather-icon icon="EditIcon" size="14" class="mr-50" />

                    Edit
                  </b-button>
                </template>
              </b-table>

            </div>

          </b-overlay>

          <div v-if="staff_loans.length == 0" class="empty-state">
            No Staff Expenses
          </div>

        </b-collapse>

      </b-card>

      <!-- VEHICLE -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

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

              <b-table :items="vehicle_loans" :fields="dataFields" responsive hover small sticky-header="400px"
                head-variant="light" class="modern-table">

                <template #cell(status)="data">
                  <b-badge v-if="data.item.status == '1' || data.item.status == '3'" class="ml-1" style="padding: 8px"
                    variant="light-success">
                    Active
                  </b-badge>
                  <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px" variant="light-warning">
                    InActive
                  </b-badge>
                </template>

                <template #cell(edit)="data">

                  <b-button size="sm" variant="primary" class="edit-btn" @click="editExpense(data.item)">
                    <feather-icon icon="EditIcon" size="14" class="mr-50" />

                    Edit
                  </b-button>
                </template>
              </b-table>

            </div>

          </b-overlay>

          <div v-if="vehicle_loans.length == 0" class="empty-state">
            No Vehicle Expenses
          </div>

        </b-collapse>

      </b-card>

      <!-- OTHER -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

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

              <b-table :items="other_loans" :fields="dataFields" responsive hover small sticky-header="400px"
                head-variant="light" class="modern-table">

                <template #cell(status)="data">
                  <b-badge v-if="data.item.status == '1' || data.item.status == '3'" class="ml-1" style="padding: 8px"
                    variant="light-success">
                    Active
                  </b-badge>
                  <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px" variant="light-warning">
                    InActive
                  </b-badge>
                </template>

                <template #cell(edit)="data">

                  <b-button size="sm" variant="primary" class="edit-btn" @click="editExpense(data.item)">
                    <feather-icon icon="EditIcon" size="14" class="mr-50" />

                    Edit
                  </b-button>
                </template>
              </b-table>
            </div>

          </b-overlay>
          <div v-if="other_loans.length == 0" class="empty-state">
            No Other Expenses
          </div>

        </b-collapse>

      </b-card>


    </b-card>

  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BOverlay,
  BBadge,
  BForm,
  BFormGroup,
  BButton,
  BFormInput,
} from 'bootstrap-vue'

import flatPickr from 'vue-flatpickr-component';
import vSelect from 'vue-select'
import admin from '@/apis/modules/admin'

export default {

  components: {
    BCard,
    BRow,
    BBadge,
    BCol,
    BForm,
    BFormGroup,
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
    const statusOptions = [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 2 },
    ]

    return {
      expensesOptions,
      statusOptions,
    }
  },

  data() {

    return {

      // ================= FORM =================
      expense_id: '',
      expenses_name: '',

      // ================= VALIDATION =================
      expense_id_status: null,
      expenses_name_status: null,

      // ================= LOADING =================
      isLoading: false,
      tableLoading: false,

      // ================= COLLAPSE =================
      showCompany: true,
      showStaff: true,
      showVehicle: true,
      showOther: true,

      // ================= SEARCH =================
      search: '',

      // ================= TABLE DATA =================
      company_loans: [],
      staff_loans: [],
      vehicle_loans: [],
      other_loans: [],

      edit_expense_id: '',
      edit_expenses_name: '',
      edit_status: '',

      // ================= TABLE FIELDS =================
      dataFields: [
        { key: 'users_user_name', label: 'Expense Name' },
        { key: 'status', label: 'Status' },
        { key: 'edit', label: 'Actions' },
      ],

    }
  },



  mounted() {

    this.loadExpensesCategories()
  },

  watch: {
    rangeDate(newVal) {
      if (!newVal || newVal.length === 0) return
      this.dateAdd()
    }
  },

  methods: {

    editExpense(item) {

      // SET VALUES TO MODAL
      this.edit_expense_id = item.id
      this.edit_expenses_name = item.users_user_name
      this.edit_status = item.status

      // OPEN MODAL
      this.$bvModal.show('modal-prevent-closing-edit')
    },

    async loadExpensesCategories() {

      try {

        this.tableLoading = true

        const payload = {
          search: this.search,
        }

        const response = await admin.getExpensesCategories(payload)


        this.company_loans = response.data.company_expenses.map(x => ({

          id: x.id,

          users_user_name: x.expense_name,

          status: x.status,
          date: x.created_at
            ? x.created_at.split('T')[0]
            : '-',

        }))



        this.staff_loans = response.data.staff_expenses.map(x => ({

          id: x.id,

          users_user_name: x.expense_name,

          status: x.status,

          date: x.created_at
            ? x.created_at.split('T')[0]
            : '-',

        }))



        this.vehicle_loans = response.data.vehicle_expenses.map(x => ({

          id: x.id,

          users_user_name: x.expense_name,

          status: x.status,
          date: x.created_at
            ? x.created_at.split('T')[0]
            : '-',

        }))



        this.other_loans = response.data.other_expenses.map(x => ({

          id: x.id,

          users_user_name: x.expense_name,

          status: x.status,
          date: x.created_at
            ? x.created_at.split('T')[0]
            : '-',

        }))

      } catch (error) {

        console.log(error)

      } finally {

        this.tableLoading = false
      }
    },

    checkFormValidityPrice() {

      const valid = this.$refs.form.checkValidity()

      this.expense_id_status = !!this.expense_id

      this.expenses_name_status =
        this.expenses_name !== ''

      return valid
    },

    resetModalPrice() {

      this.expense_id = ''
      this.expenses_name = ''

      this.expense_id_status = null
      this.expenses_name_status = null
    },

    handleOkPrice(bvModalEvt) {

      // Prevent close
      bvModalEvt.preventDefault()

      // Submit
      this.handleSubmitPrice()
    },

    handleSubmitPrice() {

      // Validation
      if (!this.checkFormValidityPrice()) {
        return
      }

      // Create
      this.createExpensesCategory()
    },

    async createExpensesCategory() {

      try {

        this.isLoading = true

        const payload = {

          expense_id: this.expense_id,

          expense_name: this.expenses_name,
        }

        await admin.expensesCategoryCreate(payload)

        this.showSuccessMessage(
          'Expenses Category Created Successfully'
        )

        // Reload table
        this.loadExpensesCategories()

        // Close modal
        this.$refs['my-modal-price'].hide()

        // Reset form
        this.resetModalPrice()

      } catch (error) {

        if (
          error.response &&
          error.response.data &&
          error.response.data.data
        ) {

          if (error.response.data.data.expense_id) {

            this.showErrorMessage(
              'Expense Category already exists.'
            )
          }

          if (error.response.data.data.expense_name) {

            this.showErrorMessage(
              'Expense Name is required.'
            )
          }
        }

      } finally {

        this.isLoading = false
      }
    },

    checkFormValidityEdit() {

      const valid = this.$refs.form.checkValidity()
        this.edit_expenses_name !== ''

      return valid
    },

    resetModalEdit() {

      this.edit_expense_id = ''
      this.edit_expenses_name = ''
      this.edit_status = null
    },

    handleOkEdit(bvModalEvt) {

      // Prevent modal close
      bvModalEvt.preventDefault()

      // Submit form
      this.handleSubmitEdit()
    },

    handleSubmitEdit() {

      // Validation
      if (!this.checkFormValidityEdit()) {
        return
      }

      // Update
      this.updateExpensesCategory()
    },

    async updateExpensesCategory() {

      try {

        this.isLoading = true

        const payload = {

          id: this.edit_expense_id,

          expense_name: this.edit_expenses_name,

          status: this.edit_status,
        }

        await admin.expensesCategoryUpdate(this.edit_expense_id, payload)

        this.showSuccessMessage(
          'Expenses Category Updated Successfully'
        )

        // Reload table
        this.loadExpensesCategories()

        // Close modal
        this.$refs['my-modal-edit'].hide()

        // Reset form
        this.resetModalEdit()

      } catch (error) {

        if (
          error.response &&
          error.response.data &&
          error.response.data.data
        ) {

          if (error.response.data.data.expense_name) {

            this.showErrorMessage(
              'Expense Name is required.'
            )
          }
        }

      } finally {

        this.isLoading = false
      }
    },

  },

  mounted() {
    this.loadExpensesCategories()
  },

}
</script>


<style scoped>
.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe) !important;
  border: none !important;
  border-radius: 12px !important;

  min-width: 220px !important;
  height: 45px;

  font-weight: 600;
  color: #fff !important;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
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

.edit-btn {
  border-radius: 8px;
  font-weight: 600;
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

.vehicle-header {
  background: linear-gradient(45deg, #28c76f, #48da89);
}

.company-header {
  background: linear-gradient(45deg, #7367f0, #9d94ff);
}

.staff-header {
  background: linear-gradient(45deg, #ff9f43, #ffbe76);
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
