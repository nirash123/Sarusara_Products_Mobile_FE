<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="UserIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>




    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 ">

      <h3 class=" ml-1 mb-0">{{$route.meta.title}}</h3>
<!--      <dark-Toggler class="d-none d-lg-block" />-->
    </div>



          <!-- Staff Bank Leaves -->

<!--
        <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex ">

          <b-alert
              :show="true"
              class="mb-0  rounded"
              variant="primary"
          >
            <div class="alert-body text-dark">
                          <feather-icon
                                class=" text-primary"
                                icon="CheckCircleIcon"
                                size="18"
                            />
             <span class="ml-1">Leave on Mar 13 - 14, 2021 was approved! </span>
             <span class="ml-5"/> <span class="ml-5">
               <feather-icon
            class="ml-5 cursor-pointer"
            icon="XIcon"
            size="16"
        />
             </span>
            </div>
          </b-alert>

    </div> -->


<!--    Go to Super admin dashboard -->


    <div class="demo-inline-spacing  bg-transparent mt-n2 " v-if="currentUser.user && currentUser.user.is_super_admin">

    </div>

<!--    Invitations-->
    <div class="demo-inline-spacing  bg-transparent mt-n2 ">
    <b-button
        badge="4"
        badge-classes="badge-info"
        size="sm"
        variant="primary"
        @click="showInvitations()"
    >Invitations <span class="text-white">({{this.$store.state.invitationCount}})</span></b-button>
<!--      <b-badge pill variant="success">Success</b-badge>-->
<!--      <feather-icon-->
<!--          icon="BellIcon"-->
<!--          size="21"-->
<!--          class="text-info"-->
<!--          badge="4"-->
<!--          badge-classes="badge-info"-->
<!--      />-->
    </div>

    <!-- Message Icon -->

<!--    <div class="demo-inline-spacing  bg-transparent mt-n2 ">-->
<!--      <feather-icon-->
<!--        icon="MessageSquareIcon"-->
<!--        size="18"-->
<!--        class="text-dark"-->
<!--        @click="$router.push('/chat')"-->
<!--      />-->
<!--    </div>-->

    <!-- BellIcon -->

<!--    <div class="demo-inline-spacing  bg-transparent mt-n1 ">-->
<!--     <NotificationIcon/>-->
<!--    </div>-->



    <b-navbar-nav class="nav align-items-center ml-auto">
      <!--      <attendance-dropdown />-->
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
<!--            <p
              v-if="currentUser"
              class="user-name font-weight-bolder mb-0"
            >
              {{ currentUser.user.name }}

            </p>-->
            <p
                class="user-name  mb-0 font-weight-700"
            >
             <span v-if="currentUser !==null">{{currentUser.user.user_name}}</span>

            </p>
            <span class="user-status">Online</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="getUserImage(currentUser.user.id, true)"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>
<!--        <b-dropdown-item link-class="d-flex align-items-center"  @click="$router.push('/profile').catch(() => {})">-->
<!--          <feather-icon-->
<!--            size="16"-->
<!--            icon="UserIcon"-->
<!--            class="mr-50"-->
<!--          />-->
<!--          <span>Profile</span>-->
<!--        </b-dropdown-item>-->

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
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BAlert,
  BRow,
  BCol,
  BInputGroup,
  BButton,
  BBadge
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import { mapActions, mapGetters } from 'vuex'
import NotificationIcon from './NotificationDropdown'
import invitations from "@/apis/modules/invitations";


export default {
  components: {
    BBadge,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    NotificationIcon,
    BAlert,
    BRow,
    BCol,
    BInputGroup,
    BButton,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data(){
    return{
      invitations:'',
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  mounted() {
    this.getInvitations()
  },
  methods: {

    async getInvitations() {
      try {
        const response = await invitations.getInvitationsCount()
        this.$store.state.invitationCount = response.data.data.count
      } catch (error) {
        this.convertAndNotifyError(error)
      }
    },
    ...mapActions(['logout']),
    async localLogout() {
      await this.logout()
      this.$router.push({ name: 'login' })
    },
    showInvitations(){
      this.$router.push('/invitations')
    }
  },
}
</script>
