<template>
    <div>
    
    <b-card>
       
      <b-tabs class="my-1">
          <b-tab lazy :active="activeTab === '1'">
          <template v-slot:title>
              <span class="" ><strong>Today Return Orders</strong>
              </span>
          </template>
            <today-order/>
          </b-tab>
          <b-tab lazy :active="activeTab === '2'">
          <template v-slot:title>
              <span class="" ><strong>Past Return Orders</strong>
              </span>
          </template>
          <past-order/>
          </b-tab>
          <b-tab lazy :active="activeTab === '3'">
          <template v-slot:title>
              <span class="" ><strong>Payment Pending Return Orders</strong>
              </span>
          </template>
          <payment-order/>
          </b-tab>
          <b-tab lazy :active="activeTab === '4'">
          <template v-slot:title>
              <span class="" ><strong>Cancelled Return Orders</strong>
              </span>
          </template>
          <cancelled-order/>
          </b-tab>
      </b-tabs>
      </b-card>
      </div>
  </template>
  
  <script>
  import { BLink, BButton, BImg, BCard, BTab, BTabs, BRow, BCol,  } from 'bootstrap-vue'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import TodayOrder from './today/index.vue';
  import PastOrder from './other/index.vue';
  import PaymentOrder from './payment/index.vue';
  import CancelledOrder from './cancel/index.vue';

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
  TodayOrder,
  PastOrder,
  PaymentOrder,
  CancelledOrder,
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
  const tab = this.$route.query.tab;
  this.activeTab = tab ; 
  },
  
  created() {
    this.currentDate = this.getCurrentDate();
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
   methods: {
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

  }
  }
  </script>