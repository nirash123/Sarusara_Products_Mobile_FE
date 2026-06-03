<template>
  <div class="invoice-preview-wrapper" >
      <b-tabs  class="my-1">
        <b-tab lazy :active="activeTab === '1'">
          <template v-slot:title>
            <span class="invoice-actions"><strong>Paysheet</strong>
            </span>
          </template>
         <paysheet />
        </b-tab>
        <!-- <b-tab lazy :active="activeTab === '2'">
          <template v-slot:title>
            <span class="invoice-actions"><strong>Monthly Paysheets</strong>
            </span>
          </template>
          <monthly-paysheet />
        </b-tab> -->
      </b-tabs>
  </div>
</template>

<script>
import { BLink, BButton, BImg, BCard, BTab, BTabs, BRow, BCol, } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Paysheet from './all.vue';
import MonthlyPaysheet from './month.vue';

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
    Paysheet,
    MonthlyPaysheet,
  },

  data() {
    return {
      activeTab: 1,
      userData: JSON.parse(localStorage.getItem('userData')),
    }

  },

  async mounted() {
    const tab = this.$route.query.tab;
    this.activeTab = tab;
  },

  created() {

  },
  methods: {

  }
}
</script>
  <style lang="scss">
  @media print {
    
  
    // Global Styles
    body {
      background-color: transparent !important;
    }
    nav.header-navbar {
      display: none;
    }
    .main-menu {
      display: none;
    }
    .header-navbar-shadow {
      display: none !important;
    }
    .content.app-content {
      margin-left: 0;
      padding-top: 2rem !important;
    }
    footer.footer {
      display: none;
    }
    .card {
      background-color: transparent;
      box-shadow: none;
    }
    .customizer-toggle {
      display: none !important;
    }
  
    // Invoice Specific Styles
    .invoice-preview-wrapper {
      .row.invoice-preview {
        .col-md-8 {
          max-width: 100%;
          flex-grow: 1;
        }
  
        .invoice-preview-card {
          .card-body:nth-of-type(2) {
            .row {
                > .col-12 {
                max-width: 50% !important;
              }
  
              .col-12:nth-child(2) {
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;
                margin-top: 0 !important;
              }
            }
          }
        }
      }
  
      // Action Right Col
      .invoice-actions {
        display: none;
      }
    }
  }
  </style>