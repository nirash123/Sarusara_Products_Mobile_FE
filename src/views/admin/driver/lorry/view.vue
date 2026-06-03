<template>
  <div>
    <b-card no-body class="card card-congratulations-profile">
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-button @click="$router.push('/lorry')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-white'
              class="btn-icon mb-5 mx-2">
              <feather-icon size="80" icon='ChevronsLeftIcon' />
            </b-button>

            <b-media-aside>
              <span v-if="users.status == '1'" style="font-size: 60px;">🚛</span>
              <span v-if="users.status == '2'" style="font-size: 60px;">🚜 </span>
            </b-media-aside>

          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h1 class="font-large-1 text-white">
              {{ users.lorry_number }} - {{ users.supplier.supplier_name }}
            </h1>
            <b-badge v-if="users.active_status == '1'" style="padding: 10px" variant="success">
              Active
            </b-badge>
            <b-badge v-if="users.active_status == '2'" style="padding: 10px" variant="warning">
              InActive
            </b-badge>
          </div>


          <!--/ profile title -->
        </div>
      </div>
    </b-card>
    <b-card>
      <b-row>
        <b-col lg="6" md="12" sm="12">
          <b-row>
            <b-col lg="6" md="6" sm="12">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2">
                  About
                </h4>
                <b-card-text>
                  I am {{ users.supplier.supplier_name }} and owner in this lorry.
                </b-card-text>
              </div>
            </b-col>
            <b-col lg="6" md="6" sm="12">
              <div class="ml-2">
                <h4 class="text-capitalize mt-2">
                  Adrress
                </h4>
                <b-card-text>
                  <div v-if="users.supplier.address">
                    {{ users.supplier.address }}
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
                  <div v-if="users.supplier.phone_no">
                    {{ users.supplier.phone_no }}
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
                  Vehicle Type
                </h4>
                <b-card-text>
                  <b-badge v-if="users.status == '1'"  style="padding: 8px" variant="light-success">
                    <span style="font-size: 20px;">♻️🚛</span> Collection Vehicle
                  </b-badge>
                  <b-badge v-if="users.status == '2'"  style="padding: 8px" variant="light-danger">
                    <span style="font-size: 20px;">📦🚚 </span> Delivery Vehicle

                  </b-badge>
                  <b-badge v-if="users.status == '3'"  style="padding: 8px" variant="light-primary">
                    <span style="font-size: 20px;">🔄🚛 </span> Dual-Operation Vehicle

                  </b-badge>
                  <b-badge v-if="users.status == '4'"  style="padding: 8px" variant="light-warning">
                    <span style="font-size: 20px;">🚜 </span> Support Equipment Vehicle

                  </b-badge>
                </b-card-text>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="6" md="12" sm="12">

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
import driver from "@/apis/modules/driver";

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
      errorPhone: '',
      user_name: '',
      address: '',
      title: '',
      bring_date: '',
      req_type: '',
      phone_no: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      loading: false,
      active_status: '',
      current_status_code: '',
      avatar: require('@/assets/images/avatars/avatar.png'),
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    } else {
      const userId = this.$route.params.id;
      this.userDetails(userId)
    }
  },
  methods: {
    async userDetails(id) {
      try {
        const response = await driver.getLorryDetails(id)
        this.users = response.data
      } catch (error) {
        this.$router.push('/lorry')
        this.showErrorMessage('Vehicle not found.')

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