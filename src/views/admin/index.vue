<template>
    <b-tabs
      vertical
      content-class="col-12 col-md-9 mt-1 mt-md-0"
      pills
      nav-wrapper-class="col-md-3 col-12"
      nav-class="nav-left"
    >
  
        <b-tab lazy :active="activeTab === '1'">
  
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">General</span>
        </template>
  
        <account-setting/>
      </b-tab>


         <b-tab v-if="user_admin_role == 'TBSAccountant' || user_id == 1" lazy :active="activeTab === '2'">
      

      <template #title>
        <feather-icon
          icon="UsersIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Add Start Amount</span>
      </template>

      <starting-amount/>
    </b-tab>
  
      <!-- change password tab -->
      <b-tab lazy :active="activeTab === '3'">
  
        <!-- title -->
        <template #title>
          <feather-icon
            icon="LockIcon"
            size="18"
            class="mr-50"
          />
          <span class="font-weight-bold">change password</span>
        </template>
  
        <account-setting-password />
      </b-tab>
 
    </b-tabs>
  </template>
  
  <script>
  import { BTabs, BTab } from 'bootstrap-vue'
  import AccountSetting from './account-setting.vue'
  import AccountSettingPassword from './account-setting-password.vue'
   import StartingAmount from './starting_amount.vue'
  
  export default {
    components: {
      BTabs,
      BTab,
      AccountSetting,
      AccountSettingPassword,
      StartingAmount,
    },

    async mounted() {
      const tab = this.$route.query.tab;
      this.activeTab = tab ; 
      },

    data() {
      return {
        options: {},
        activeTab: null,
        user_admin_role : JSON.parse(localStorage.getItem('userData')).admin_role,
        user_id : JSON.parse(localStorage.getItem('userData')).id,
      }
    },
    beforeCreate() {
      this.$http.get('/account-setting/data').then(res => { this.options = res.data })
    },
  }
  </script>
  