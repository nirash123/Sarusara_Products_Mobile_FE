<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div v-if="userData" class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
        {{ userData.user_name  }} 
        </p>
        <span v-if="userData.admin_role == 'TBSAdmin'" class="user-status">Admin</span>
        <span v-if="userData.admin_role == 'TBSAccountant'" class="user-status">Accountant</span>
      </div>
      <b-avatar
        size="40"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="primary"
      >
        <feather-icon
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

 
    <b-dropdown-item v-if="userData.admin_role == 'TBSAdmin' || userData.admin_role == 'TBSAccountant'"
      :to="{ name: 'admin-account-setting' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="SettingsIcon"
        class="mr-50"
      />
      <span>Settings</span>
    </b-dropdown-item>

    <b-dropdown-divider />
    <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="localLogout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import admin from "@/apis/modules/admin";

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  mounted() {
    this.userData= JSON.parse(localStorage.getItem('userData'));
   // this.userDetails(this.userData.role_code);
  },
  methods: {
    ...mapActions(['logout']),
    
    async localLogout() {
      localStorage.removeItem('userData')
      localStorage.removeItem('isLoggedIn')
        if (window.location.pathname !== '/') {
          window.location = '/TBS' // /TBS/admin
        }
    },


  },
}
</script>


