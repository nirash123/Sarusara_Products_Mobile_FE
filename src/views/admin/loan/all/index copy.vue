<template>
  <div class="loan-page">

    <b-card no-body class="main-card shadow-sm border-0">

            <!-- FILTER AREA -->
      <div class="filter-area">

        <b-row class="align-items-center">

          <!-- LEFT -->
          <!-- RIGHT -->
          <b-col cols="12" md="12">

            <div class="d-flex justify-content-md-end flex-wrap align-items-center">

              <!-- SEARCH -->
              <div class="search-box mr-1 mb-1 mb-md-0">

                <feather-icon
                  icon="SearchIcon"
                  size="16"
                  class="search-icon"
                />

                <b-form-input
                  v-model="search"
                  class="d-inline-block modern-search mr-1"
                  placeholder="🔍 Search ..."
                  @input="loadLoans"
                />

              </div>

              <!-- DATE -->
              <b-form-group class="mb-0 mr-md-1">

                <flat-pickr
                  v-model="rangeDate"
                  class="form-control date-picker"
                  :config="dateConfig"
                />

              </b-form-group>

              <!-- BUTTON -->
              <b-button
                class="refresh-btn mt-1 mt-md-0"
                variant="primary"
                @click="loadLoans"
              >
                <feather-icon
                  icon="RefreshCwIcon"
                  size="16"
                  class="mr-50"
                />

                Refresh
              </b-button>

            </div>

          </b-col>

        </b-row>

      </div>

      <!-- SUPPLIER -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

        <!-- COLLAPSIBLE HEADER -->
        <div
          class="card-header-custom supplier-header d-flex justify-content-between align-items-center"
          @click="showSupplier = !showSupplier"
          style="cursor:pointer;"
        >
          <span>Supplier Loans</span>

          <feather-icon
            :icon="showSupplier ? 'ChevronDownIcon' : 'ChevronUpIcon' "
            size="18"
          />
        </div>

        <!-- COLLAPSE -->
        <b-collapse v-if="showSupplier">

          <b-overlay :show="tableLoading" rounded="sm">

            <div class="table-wrapper">

              <b-table
                :items="supplier_loans"
                :fields="supplierFields"
                responsive
                hover
                small
                sticky-header="400px"
                head-variant="light"
                class="modern-table"
              />

            </div>

          </b-overlay>

          <div
            v-if="supplier_loans.length == 0"
            class="empty-state"
          >
            No Supplier Loans
          </div>

        </b-collapse>

      </b-card>

      <!-- COMPANY -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

        <!-- COLLAPSIBLE HEADER -->
        <div
          class="card-header-custom company-header d-flex justify-content-between align-items-center"
          @click="showCompany = !showCompany"
          style="cursor:pointer;"
        >
          <span>Company Loans</span>

          <feather-icon
            :icon="showCompany ? 'ChevronDownIcon' : 'ChevronUpIcon' "
            size="18"
          />
        </div>

        <!-- COLLAPSE -->
        <b-collapse v-if="showCompany">

          <b-overlay :show="tableLoading" rounded="sm">

            <div class="table-wrapper">

              <b-table
                :items="company_loans"
                :fields="companyFields"
                responsive
                hover
                small
                sticky-header="400px"
                head-variant="light"
                class="modern-table"
              />

            </div>

          </b-overlay>

          <div
            v-if="company_loans.length == 0"
            class="empty-state"
          >
            No Company Loans
          </div>

        </b-collapse>

      </b-card>

      <!-- USER -->
      <b-card no-body class="loan-card border-0 shadow-sm mb-2">

        <!-- COLLAPSIBLE HEADER -->
        <div
          class="card-header-custom user-header d-flex justify-content-between align-items-center"
          @click="showUser = !showUser"
          style="cursor:pointer;"
        >
          <span>User Loans</span>

          <feather-icon
            :icon="showUser ? 'ChevronDownIcon' : 'ChevronUpIcon' "
            size="18"
          />
        </div>

        <!-- COLLAPSE -->
        <b-collapse v-if="showUser">

          <b-overlay :show="tableLoading" rounded="sm">

            <div class="table-wrapper">

              <b-table
                :items="user_loans"
                :fields="userFields"
                responsive
                hover
                small
                sticky-header="400px"
                head-variant="light"
                class="modern-table"
              />

            </div>

          </b-overlay>

          <div
            v-if="user_loans.length == 0"
            class="empty-state"
          >
            No User Loans
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
    BCol,
    BTable,
    BOverlay,
    BButton,
    BFormInput,
    vSelect,
    flatPickr,
  },

  data() {

    let today = new Date();
    let last_date = new Date();
    today.setDate(today.getDate() - 1);
    last_date.setDate(today.getDate() - 6);
    return {

      showSupplier: true,
      showCompany: true,
      showUser: true,

     tableLoading: false,

      search: '',

      rangeDate: new Date().toISOString().split('T')[0],

      supplier_loans: [],
      company_loans: [],
      user_loans: [],

      pagination: {
        perPage: 10,
      },

      pageOptions: [10, 25, 50, 100],

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

  },

  mounted() {
    this.loadLoans()
  },

}
</script>


<style scoped>



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