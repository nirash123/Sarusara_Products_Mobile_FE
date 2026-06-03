<template>
  <b-nav-item-dropdown
    class="dropdown-notification"
    menu-class="dropdown-menu-media"
    style="list-style-type:none"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="un_read_notification.length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title ml-1 mb-0 mr-auto">
          Notifications
        </h4>
        <b-badge
        v-if="un_read_notification.length > 0"
          pill
          variant="light-primary"
        >
          {{ un_read_notification.length }} New
        </b-badge>
      </div>
    </li>

    <!-- Notifications -->

<!--    meka un-comment krnn-->

<!-- v-if="un_read_notification.length > 0" -->
   <vue-perfect-scrollbar
     v-if="un_read_notification.length > 0"
     :show="formLoading"
     class="scrollable-container media-list scroll-area"
     style="height: 357px;border: 1px solid #E5E5E5;border-radius: 4px;"
     tagname="li"
   >
     <ul class="list-group">
       <li>
         <b-media
           v-for="notification in un_read_notification"
           :key="notification.id"
         >
         <template #aside>
            <b-avatar
            size="45"
            :src="notification.avatar"
            variant="light-primary"
          >
            <feather-icon
              v-if="!notification.avatar"
              icon="UserIcon"
              size="22"
            />
          </b-avatar>
              </template>
              <div @click="ReadNotification(notification.id)">
              <p class="media-heading">
                <span class="font-weight-bolder">
                  {{ notification.title }}
                </span>
              </p>
              <small class="notification-text">{{ notification.subtitle }}</small>
              <p  class="mb-0 d-flex justify-content-end font-weight text-primary">
                            {{
                              momentFormat(notification.created_at, 'MMM  Do,  h:mm a')
                            }}
          </p>
          </div>
         </b-media>
       </li>
     </ul>
   </vue-perfect-scrollbar>



    <!-- No Notifications -->

    <div v-else class="text-center">
      <b-card class="d-flex align-items-center">
        <div class="m-5">
          <div class="mb-2">
             <b-img
              :src="require('@/assets/images/pages/bell.png')"
              alt="browser img"
              class="mr-1"
              size="70"
              />
          </div>
          <h5>No Notifications</h5>
        </div>
      </b-card>
    </div>

    <!-- Cart Footer -->

    <!--    mekat un comment krnn-->
   <li class="dropdown-menu-footer " >
    <div v-if="un_read_notification.length > 0">
     <b-button
       v-ripple.400="'rgba(255, 255, 255, 0.15)'"
       block
       variant="primary"
       @click="readAll()">
       Read all notifications
     </b-button>
    </div>
    <div v-else>
     <b-button
       :disabled = true
       v-ripple.400="'rgba(255, 255, 255, 0.15)'"
       block
       variant="primary"
       >Read all notifications
     </b-button>
    </div>
   </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown,
  BBadge,
  BMedia,
  BLink,
  BAvatar,
  BButton,
  BFormCheckbox,
  BRow,
  BImg,
  BCol,
  BCard,
  VBTooltip,
} from 'bootstrap-vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Ripple from 'vue-ripple-directive';
import MomentMixin from '@/mixins/MomentMixin';
import notification from "@/apis/modules/notification";

export default {
  components: {
    BRow,
    BCol,
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
    BCard,
    BImg,
    VBTooltip,

  },
  mixins: [MomentMixin],

  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      formLoading:false,
      hiddenNotoificationBar:false,
      un_read_notification:[],
      userNotifications: [],
      beforeLength: 0,
    };
  },

  methods: {

      async ReadNotification(id){
          const Response = await notification.ReadNotification(id);
          this.showSuccessMessage('Read Notification Successfully')
          await this.getNotifications();
        },

      async readAll() {
        try {
          await notification.ReadAllNotifications(JSON.parse(localStorage.getItem('userData')).id);
          this.showSuccessMessage('Read All Notifications Successfully')
          await this.getNotifications()
        }catch (error){
          this.showSuccessMessage('Read All Notifications Successfully')
          await this.getNotifications()
        }
      },


      async getNotifications() {
      try {
        this.formLoading = true
        const Response = await notification.getNotificationsDetails(JSON.parse(localStorage.getItem('userData')).id);
        this.customer_notification = Response.data.customer_orders.map((x) => ({
              id: x.id,
              avatar: '',
              title: x.title,
              subtitle: x.consultant_first_name + ' ' + x.consultant_last_name+ ' ' + x.description,
              created_at: x.created_at,
            }));
        
            this.profile_notification = Response.data.profile_orders.map((x) => ({
              id: x.id,
              avatar: x.consultant_profile_image,
              title: x.title,
              subtitle: x.consultant_first_name + ' ' + x.consultant_last_name+ ' ' + x.description,
              created_at: x.created_at,
            }));
            this.un_read_notification = this.customer_notification.concat(this.profile_notification);

     }catch(error){

        this.convertAndNotifyError(error)
     }
    }
  },

  mounted() {
    // window.setInterval(() => {
    //   this.getNotifications()
    // }, 72000)
    // this.getNotifications()
  },
};
</script>

<style>
element.style {
  list-style: none !important;
}

.notificationBar{
  cursor: pointer;
  color: brown
}

.textColor1{
  color: brown;
}

.textColor2{
  color: rgb(0, 0, 0);
}
</style>
