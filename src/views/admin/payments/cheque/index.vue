<template>
    <b-tabs class="my-1">
        <b-tab lazy :active="activeTab === '1'" title="Today Income">
          <card-income/>
        </b-tab>

        <b-tab lazy :active="activeTab === '2'" title="Payment Pending Income">
        <payment-income/>
        </b-tab>

        <b-tab lazy :active="activeTab === '3'" title="Past Income">
          <past-income/>
        </b-tab>

        <b-tab lazy :active="activeTab === '4'" title="Today Expenditure">
        <card-expenditure/>
        </b-tab>
        
        <b-tab lazy :active="activeTab === '5'" title="Payment Pending Expenditure">
        <payment-expenditure/>
        </b-tab>


        <b-tab lazy :active="activeTab === '6'" title="Past Expenditure">
        <past-expenditure/>
        </b-tab>
    </b-tabs>
</template>

<script>
import { BLink, BButton, BImg, BCard, BTab, BTabs, } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import CardIncome from './income/index.vue';
import CardExpenditure from './expenditure/index.vue';
import PaymentIncome from './payment-income/index.vue';
import PastIncome from './past-income/index.vue';
import PaymentExpenditure from './payment-pending-expenditure/index.vue';
import PastExpenditure from './past-expenditure/index.vue';


export default {
components: {
VuexyLogo,
BLink,
BButton,
BImg,
BCard, 
BTab,
BTabs,
CardIncome,
CardExpenditure,
PastIncome,
PaymentIncome,
PaymentExpenditure,
PastExpenditure,
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




