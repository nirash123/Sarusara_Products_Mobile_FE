<template>
  <div class="invoice-page">

    <b-card>

      <b-tabs class="my-1">

        <!-- ALL EXPENSES -->
        <b-tab lazy :active="activeTab === '1'">

          <template v-slot:title>
            <span><strong>All Expenses</strong></span>
          </template>

          <all-expenses class="invoice-card" />

        </b-tab>

        <!-- COMPANY EXPENSES -->
        <b-tab lazy :active="activeTab === '2'">

          <template v-slot:title>
            <span><strong>Company Expenses</strong></span>
          </template>

          <company-expenses class="invoice-card" />

        </b-tab>

        <!-- STAFF EXPENSES -->
        <b-tab lazy :active="activeTab === '3'">

          <template v-slot:title>
            <span><strong>Staff Expenses</strong></span>
          </template>

          <staff-expenses class="invoice-card" />

        </b-tab>

        <!-- VEHICLE EXPENSES -->
        <b-tab lazy :active="activeTab === '4'">

          <template v-slot:title>
            <span><strong>Vehicle Expenses</strong></span>
          </template>

          <vehicle-expenses class="invoice-card" />

        </b-tab>

        <!-- OTHER EXPENSES -->
        <b-tab lazy :active="activeTab === '5'">

          <template v-slot:title>
            <span><strong>Other Expenses</strong></span>
          </template>

          <other-expenses class="invoice-card" />

        </b-tab>

      </b-tabs>

    </b-card>

  </div>
</template>

<script>
import {
  BLink,
  BButton,
  BImg,
  BCard,
  BTab,
  BTabs,
  BRow,
  BCol,
} from 'bootstrap-vue'

import VuexyLogo from '@core/layouts/components/Logo.vue'

import CompanyExpenses from './company/index.vue'
import StaffExpenses from './staff/index.vue'
import VehicleExpenses from './vehicle/index.vue'
import OtherExpenses from './other/index.vue'
import AllExpenses from './all/index.vue'

export default {

  components: {
    VuexyLogo,
    BLink,
    BButton,
    BImg,
    BCol,
    BRow,
    BCard,
    BTab,
    BTabs,
    CompanyExpenses,
    StaffExpenses,
    VehicleExpenses,
    OtherExpenses,
    AllExpenses,
  },

  data() {

    return {

      currentTime: '',
      currentDate: '',

      userData: JSON.parse(localStorage.getItem('userData')),

      activeTab: null,
    }
  },

  async mounted() {

    const tab = this.$route.query.tab

    this.activeTab = tab
  },

  created() {

    this.currentDate = this.getCurrentDate()

    setInterval(() => {

      this.currentTime = this.getCurrentTime()

    }, 1000)
  },

  methods: {

    getCurrentTime() {

      const now = new Date()

      return now.toLocaleTimeString()
    },

    getCurrentDate() {

      const now = new Date()

      return now.toLocaleDateString()
    },
  },
}
</script>

<style>

@media print {

  body {
    background: white !important;
  }

  /* Hide only tab titles */
  .nav-tabs {
    display: none !important;
  }

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

  .card {
    border: none !important;
    box-shadow: none !important;
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
    print-color-adjust: exact;
  }

  .table th,
  .table td {
    color: black !important;
  }
}
</style>