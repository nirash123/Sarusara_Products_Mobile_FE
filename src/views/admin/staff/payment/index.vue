<template>
  <div>
      <b-tabs class="my-1">
        <b-tab lazy :active="activeTab === '1'">
          <template v-slot:title>
            <span class=""><strong>Today Payments</strong>
            </span>
          </template>
          <today />
        </b-tab>
        <b-tab lazy :active="activeTab === '2'">
          <template v-slot:title>
            <span class=""><strong>Pending Payments</strong>
            </span>
          </template>
          <pending />
        </b-tab>
        <b-tab lazy :active="activeTab === '3'">
          <template v-slot:title>
            <span class=""><strong>Past Payments</strong>
            </span>
          </template>
          <past />
        </b-tab>
        <b-tab lazy :active="activeTab === '4'">
          <template v-slot:title>
            <span class=""><strong>Completed Payments</strong>
            </span>
          </template>
          <completed />
        </b-tab>
      </b-tabs>
  </div>
</template>

<script>
import { BLink, BButton, BImg, BCard, BTab, BTabs, BRow, BCol, } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import Today from './today.vue';
import Past from './past.vue';
import Pending from './pending.vue';
import Completed from './completed.vue';

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
    Today,
    Past,
    Pending,
    Completed,
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