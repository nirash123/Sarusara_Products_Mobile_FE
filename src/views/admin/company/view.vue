<template>
  <div>
    <b-card no-body class="card card-congratulations-profile">
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-button @click="$router.push('/companies')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-dark'
              class="btn-icon mb-5 mx-2">
              <feather-icon size="80" icon='ChevronsLeftIcon' />
            </b-button>



          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h1 class="font-large-2 text-white">
              {{ company_name }}
            </h1>


          </div>


          <!--/ profile title -->
        </div>
      </div>
    </b-card>

    <b-card >
      <b-row>
        <b-col lg="6" md="12" sm="12">

          <div class="ml-2">
            <h4 class="text-capitalize mt-2">
              Registered Address
            </h4>
            <b-card-text>
              <div>
                {{ address }}
              </div>

            </b-card-text>
          </div>
          <div class="ml-2">
            <h4 class="text-capitalize mt-2 mb-75">
              Mobile Number
            </h4>
            <b-card-text>
              <div>
                {{ phone_no }}
              </div>

            </b-card-text>
          </div>

          <div class="ml-2">
            <h4 class="text-capitalize mt-2 mb-75">
              Account State
            </h4>
            <b-card-text>
              <b-badge v-if="active_status == '1' || active_status == '4'" style="padding: 10px"
                variant="light-success">
                Active
              </b-badge>
              <b-badge v-if="active_status == '2'" style="padding: 10px" variant="light-warning">
                InActive
              </b-badge>
            </b-card-text>
          </div>

        </b-col>
        <b-col lg="6" md="12" sm="12">
          <div class="ml-2">
            <h4 class="text-capitalize mt-2 mb-75">
              Latest Order Value
            </h4>
            <b-card-text>
              <div>
                {{ last_buy }}
              </div>

            </b-card-text>
          </div>
          <div class="ml-2">
            <h4 class="text-capitalize mt-2 mb-75">
              Last Order Date
            </h4>
            <b-card-text>
              <div>
                {{ last_date }}
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
import admin from "@/apis/modules/admin";
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
      company_name: '',
      address: '',
      phone_no: '',
      level: '',
      image: '',
      identity_code: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      loading: false,
      active_status: '',
      avatar: require('@/assets/images/avatars/avatar.png'),
      last_buy: '',
      last_date: '',

      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25],
      currentPage: 1,
      pagination: {
        perPage: "",
        pageOptions: "",
        totalRows: "",
        from: "",
        to: "",
      },
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      owned: false,

      lorry_number: '',

      form: {
        first_name: '',
        last_name: '',
        address: '',
        phone_no: ''
      },


      submittedPriceNames: [],
      lorry_number_status: null,
      company_id_status: null,



      fields: [
        {
          key: "lorry_number",
          label: "lorry number",
        },
        {
          key: "active_status",
          label: "status",
          sortable: true,
        },
        {
          key: "actions",
          label: "actions",
        },


      ],

      ownfields: [
        {
          key: "lorry_number",
          label: "lorry number",
        },
        {
          key: "sms",
          label: "sms",
        },
        {
          key: "active_status",
          label: "status",
          sortable: true,
        },
        {
          key: "actions",
          label: "actions",
        },


      ],


      items: [],
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
      const userId = this.$route.params.id;
      this.userDetails(userId)
    }
    else {
      this.$router.push('/')
    }
  },
  methods: {
    async userDetails(id) {
      try {
        const response = await admin.getCompanyDetails(id)
        this.company_name = response.data.company_name
        this.address = response.data.address
        this.phone_no = response.data.phone_no
        this.active_status = response.data.active_status
        this.last_buy = response.data.last_buy ? 'Rs: ' + response.data.last_buy : 'Rs: 0.00'
        this.last_date = response.data.last_date ? response.data.last_date : 'N/A'
      } catch (error) {
        this.showErrorMessage('Customer not found.')
      }
    },


    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },



    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.lorry_number_status = !!this.lorry_number
      return valid
    },

    resetModalPrice() {
      this.lorry_number = ''

      this.lorry_number_status = null
    },

    handleOkPrice(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmitPrice()
    },

    handleSubmitPrice() {
      if (!this.checkFormValidityPrice()) return

      this.companyPrice()
    },

    async companyPrice() {
      try {
        this.isLoading = true

        const payload = {
          lorry_number: this.lorry_number,
          company_id: this.$route.params.id,
        }

        await driver.lorryCreate(payload)

        this.showSuccessMessage('Create Lorry Successfully')
        this.$refs.table.refresh()
        // close modal
        this.$nextTick(() => {
          this.$refs['my-modal-price'].hide()
        })

      } catch (error) {
        this.showErrorMessage('The Lorry Number has been already taken.')
      } finally {
        this.isLoading = false
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
