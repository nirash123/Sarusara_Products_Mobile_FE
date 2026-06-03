<template>
      <b-tabs class="my-1">
          <b-tab lazy :active="activeTab === '1'" title="Connection Orders">
            <template v-slot:title>
          <span class="" ><strong>New Orders</strong>
          </span>
      </template>
            <new-order/>
          </b-tab>
          <b-tab lazy :active="activeTab === '2'" title="Connection Orders">
            <template v-slot:title>
          <span class="" ><strong>Pending Orders</strong>
          </span>
      </template>
            <payment-order/>
          </b-tab>

          <b-tab lazy :active="activeTab === '3'" title="Completed Orders">
            <template v-slot:title>
          <span class="" ><strong>Completed Orders</strong>
          </span>
      </template>
          <completed-order/>
          </b-tab>
      </b-tabs>
  </template>
  
  <script>
  import { BLink, BButton, BImg, BCard, BTab, BTabs, } from 'bootstrap-vue'
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import NewOrder from './new-orders/index.vue';
  import CompletedOrder from './completed-orders/index.vue';
  import PaymentOrder from './payment-orders/index.vue';

  export default {
  components: {
  VuexyLogo,
  BLink,
  BButton,
  BImg,
  BCard, 
  BTab,
  BTabs,
  NewOrder,
  CompletedOrder,
  PaymentOrder,
  },
  
  data() {
  return {
    activeTab: null,
  }
  
  },
  
  mounted() {
  const tab = this.$route.query.tab;
  this.activeTab = tab ; 
  if(JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin'){

      }
       else{
        this.$router.push('/')
       }
  },
  
  methods: {

  }
  }
  </script>
  
  
  
  
  