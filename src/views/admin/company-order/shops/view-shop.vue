<template>
    <div>
        <b-card no-body
              class="card card-congratulations-profile">
    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-button
          @click="$router.push('/')"
      v-ripple.400="'rgba(40, 199, 111, 0.15)'"
      variant='light-dark'
      class="btn-icon mb-5 mx-2"
    >
    <feather-icon
                size="80"
                icon='ChevronsLeftIcon'
              />
    </b-button>
  
    <b-media-aside>
        <b-link >
          <b-img
            class="p-2"
            ref="previewEl"
            rounded
            :src="avatar"
            height="150"
          />
        </b-link>
      </b-media-aside>
  
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h1 class="font-large-2 text-white">
           {{ users.shop_name }} 
          </h1>
          <h4 class="text-white">
            <span class="user-status">{{ users.owner_name }} </span>
          </h4>
          <b-badge v-if="users.active_status == '1'"  style="padding: 10px" variant="light-success">
                  Active
              </b-badge>
              <b-badge v-if="users.active_status == '2'"  style="padding: 10px" variant="light-warning">
                 InActive
              </b-badge>
        </div>
        
        
        <!--/ profile title -->
      </div>
    </div>
    </b-card>
    <b-card>
    <b-row>
        <b-col lg="6" md="6" sm="12">
            <div class="ml-2">
            <h4 class="text-capitalize mt-2">
            About
            </h4>
            <b-card-text>
            I am {{ users.owner_name }} . I am Owner in {{ users.shop_name }}. 
            </b-card-text>
            </div>
        </b-col>
        <b-col lg="6" md="6" sm="12">
            <div class="ml-2">
            <h4 class="text-capitalize mt-2">
                Lives
            </h4>
            <b-card-text>
                <div v-if="users.address">
                    {{ users.address }}
                </div>
            <div v-else>
                N/A
            </div>
            </b-card-text>
            </div>
        </b-col>
        <b-col lg="6" md="6" sm="12">
            <div class="ml-2">
            <h4 class="text-capitalize mt-2 mb-75">
                Mobile Number
            </h4>
            <b-card-text>
                <div v-if="users.phone_no">
                    {{ users.phone_no }}
                </div>
            <div v-else>
                N/A
            </div>
            </b-card-text>
            </div>
        </b-col>
        <b-col lg="6" md="6" sm="12">
            <div class="ml-2">
                <h4 class="text-capitalize mt-2 mb-75">
                    Note
                </h4>
                <b-card-text>
                    <div v-if="users.note">
                        {{ users.note }}
                    </div>
                <div v-else>
                    N/A
                </div>
                </b-card-text>
                </div>
        </b-col>
    </b-row>
   </b-card>
    </div>
  </template>
  
  <script>
  import {
    BImg,
    BAlert,
    BLink,
    BAvatar,
    BBadge,
    BButton,
    BCol,
    BContainer,
    BDropdown,
    BDropdownItem,
    BForm,
    BCard,
    BFormCheckbox,
    BFormDatepicker,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormSelect,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BListGroup,
    BListGroupItem,
    BModal,
    BOverlay,
    BPagination,
    BRow,
    BCardText,
    BSidebar,
    BTable,
    VBModal,
  } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  import ErrorMessages from "@/mixins/ErrorMessages";
  import SuccessMessage from "@/mixins/SuccessMessage";
  import MomentMixin from "@/mixins/MomentMixin";
  import vSelect from "vue-select";
  import VuePerfectScrollbar from "vue-perfect-scrollbar";
  import draggable from "vuedraggable";
  import { ValidationObserver, ValidationProvider } from "vee-validate";
  import Filter from "@/mixins/FilterMixin";
  import { mapGetters } from "vuex";
  import shop from "@/apis/modules/shop";
  
  export default {
    components: {
      BImg,
      BTable,
      BAvatar,
      BBadge,
      BLink,
      BCardText,
      BRow,
      BCol,
      BFormGroup,
      BFormSelect,
      BPagination,
      BInputGroup,
      BFormInput,
      BInputGroupAppend,
      BButton,
      BDropdown,
      BDropdownItem,
      BOverlay,
      BInputGroupPrepend,
      BListGroup,
      BListGroupItem,
      vSelect,
      BCard,
      BModal,
      VBModal,
      BContainer,
      BAlert,
      BSidebar,
      BForm,
      BFormInvalidFeedback,
      BFormDatepicker,
      BFormCheckbox,
      VuePerfectScrollbar,
      draggable,
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      Ripple,
    },
    setup() {

      return {
      }
    },
    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
    data() {
      return {
        users: {},
        errorPhone:'',
        user_name:'',
        address:'',
        title:'',
        bring_date:'',
        req_type:'',
        phone_no:'',
        avatar: require('@/assets/images/avatars/shop.png'),
        userData: JSON.parse(localStorage.getItem('userData')),
        loading: false,
        active_status:'',
        current_status_code:'',
        avatar: require('@/assets/images/avatars/shop.png'),
      };
    },
    watch: {
    },
    computed: {
      ...mapGetters(["currentUser"]),
    },
    mounted() {
      if(JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin'){
        this.$router.push('/')
       }
      const userId = this.$route.params.id;
      this.userDetails(userId)
    },
    methods: {
      async userDetails(id){
        try {
          const response = await shop.getShopDetails(id)
          
          this.users = response.data
          } catch (error) {
            
          }
        
      },
    },
  };
  </script>
  <style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
  
  div#dropdown-1 .btn-outline-danger {
    border: none !important;
  }
  
  .per-page-selector {
  width: 90px;
  }
  
  .single-line-text {
    width: 180px;
  }
  
  .invoice-filter-select {
  min-width: 250px;
  }
  
  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }
  
  ::v-deep .vs__selected {
    width: 100px;
  }
  
  button {
    height: 38px;
  }
  </style>
  