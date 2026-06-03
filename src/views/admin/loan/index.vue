<template>

      <b-tabs>
        <b-tab lazy :active="activeTab === '1'">

          <template v-slot:title>
            <span><strong>Supplier Loans</strong></span>
          </template>

          <supplier-loans class="invoice-card" />

        </b-tab>
        <b-tab lazy :active="activeTab === '2'">

          <template v-slot:title>
            <span><strong>Company Loans</strong></span>
          </template>

          <company-loans class="invoice-card" />

        </b-tab>

        <b-tab lazy :active="activeTab === '3'">

          <template v-slot:title>
            <span><strong>Staff Loans</strong></span>
          </template>

          <staff-loans class="invoice-card" />

        </b-tab>


      </b-tabs>
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

import SupplierLoans from './suppliers/index.vue'
import StaffLoans from './staff/index.vue'
import CompanyLoans from './companies/index.vue'

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
    SupplierLoans,
    StaffLoans,
    CompanyLoans,
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