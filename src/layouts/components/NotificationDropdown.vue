<template>
  <b-nav-item-dropdown
         class="dropdown-notification"
         menu-class="dropdown-menu-media"
         right
         
  >
              <template #button-content >
                  <feather-icon
                      badge="5"
                      badge-classes="bg-danger"
                      class="text-body"
                      icon="BellIcon"
                      size="21"
                  />
              </template>

            <!-- Header -->

              <li class="dropdown-menu-header">
                    <div class="dropdown-header d-flex">
                          <h3 class="notification-title m-1 mr-auto font-weight-bolder dark">
                              Notifications
                          </h3>
                    </div>
              </li>

             <!-- Notifications -->

             <vue-perfect-scrollbar
                      v-if="notifications.length"
                      :settings="perfectScrollbarSettings"
                      class="scrollable-container media-list scroll-area"
                      style="height: 357px;border: 1px solid #E5E5E5;border-radius: 4px;"
                      tagname="li"
              >
                  <ul class="list-group">
                    <li>
                      <b-media v-for="notification in notifications" :key="notification.subtitle" >
                          <div>
                              <b-row class="mt-n1 ml-0 mr-0">

                                      <!-- Left Side -->

                                 <b-col cols="11"  class="pb-0 pt-1">
                                      <div class="row">

                                          <!-- 01  Seen Notification (Red Icon) -->

                                          <div class="d-flex align-items-center">
                                             <b-avatar :variant="notification.color" rounded size="10" >
                                                <feather-icon icon="CheckIcon" size="1" :class="notification.type" />
                                              </b-avatar>

                                          </div>

                                          <!--02  Avatar Name & Time -->

                                          <div class="d-flex align-items-center  ">
                                            <b-avatar v-if="notification.avatar" class="ml-1" size="32" :src="notification.avatar" />
                                            <b-avatar v-else class="ml-1" size="32"  :variant="notification.bg">
                                                  <feather-icon :icon="notification.icon" size="18"  />
                                            </b-avatar>
                                            <div class="ml-1">
                                                <p class="mb-0 font-weight-bolder text-dark" > {{ notification.title }}</p>
                                                <small class="text-secondary">{{ notification.subtitle }}</small>
                                            </div>
                                          </div>
                                      </div>
                                    </b-col>

                                         <!-- Right side Trash button -->

                                    <b-col cols="1"  class="pt-0  pt-xl-2 pb-xl-0 ml-n1 ">
                                        <b-row >
                                            <div class="d-flex justify-content-start  mt-2 mt-md-0 pl-0 pl-md-0 ml-auto">

                                              <b-button
                                                    size="23"
                                                    variant="outline-white"
                                                    class="btn-icon  text-primary" >

                                                    <feather-icon
                                                      class="cart-item-remove cursor-pointer"
                                                      size="18"
                                                      icon="TrashIcon"
                                                    />
                                                </b-button>
                                            </div>
                                          </b-row>
                                      </b-col>
                                </b-row>
                            </div>

                      </b-media>
                    </li>
                  </ul>

              </vue-perfect-scrollbar>

              <!-- No Notifications -->
              <div  v-if="!notifications.length"  class="text-center" >
                  <b-card class="d-flex align-items-center bg-light">
                      <div class="m-5">
                          <div class="mb-2">
                                 <b-avatar variant="primary" rounded size="100" >
                                      <feather-icon icon="BellIcon" size="600"  />
                                  </b-avatar>
                          </div>
                          <h5>  No Notifications  </h5>
                      </div>
                  </b-card>
               </div>

              <!-- Cart Footer -->
              <li class="dropdown-menu-footer m-1"><b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    block
              >Read all notifications</b-button>
              </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox, BRow, BCol, BCard,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

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
  },
  directives: {
    Ripple,
  },
  setup() {
    /* eslint-disable global-require */
    const notifications = [

      {
        title: 'Diana Jones applied to your shift',
        avatar: require('@/assets/images/avatars/9-small.png'),
        subtitle: 'Today, 12:35',
        icon: '',
        bg: '',
        color: 'danger'
      },
      {
        title: 'Marc Ford applied to your shift',
        avatar: require('@/assets/images/avatars/5-small.png'),
        subtitle: 'Mar 15, 11:00',
        icon:'',
        bg: '',
        color:'danger'
      },
      {
        title: 'Your monthly review is ready',
        avatar: '',
        subtitle: 'Mar 15, 09:00',
        icon: 'FileIcon',
        bg: 'light-success',
        color:'danger'
      },
      {
        title: 'New user successfully created',
        avatar: '',
        subtitle: 'Mar 14, 04:00',
        icon: 'UserCheckIcon',
        bg: 'light-info',
        color:'white'
      },
      {
        title: 'Steve Ross sent you a message',
        avatar: require('@/assets/images/avatars/10-small.png'),
        subtitle: 'Mar 14, 01:05',
        icon: '',
        bg: 'light-danger',
        color:'white'
      },

      {
        title: 'Jemis Antano sent you a message',
        avatar: require('@/assets/images/avatars/4-small.png'),
        subtitle: 'Mar 13, 09:00',
        icon: '',
        bg: 'light-danger',
        color:'white'
      },


      {
        title: 'Janita Rayes sent you a message',
        avatar: require('@/assets/images/avatars/7-small.png'),
        subtitle: 'Mar 13, 07:30',
        icon: '',
        bg: 'light-danger',
        color:'white'
      },

    ]

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }



    return {
      notifications,
      perfectScrollbarSettings,
    }
  },
}
</script>

<style>
  element.style {
    list-style: none;
  }
</style>
