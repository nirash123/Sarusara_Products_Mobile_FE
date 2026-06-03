<template>
  <div>
    <b-card no-body>

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Entries</label>
            <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
            <v-select v-model="filters['admin_role']" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions" :reduce="(statusOptions) => statusOptions.value" class="invoice-filter-select"
              placeholder="Select Role">
              {{ filters['admin_role'] }}
            </v-select>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="7">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1" placeholder="Search..." />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-row class="m-2">
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive style="min-height: 150px">

              <template #cell(user_name)="data">
                <b-media vertical-align="center">
                  <b-row class="align-items-center">
                    <b-col cols="auto">
                      <b-avatar size="40" :src="'http://127.0.0.1:8000/' + data.item.image"
                        :to="{ name: 'view-staff-details', params: { id: data.item.id } }" />
                    </b-col>
                    <b-col>
                      <b-link :to="{ name: 'view-staff-details', params: { id: data.item.id } }"
                        class="font-weight-bold d-block text-nowrap">
                        {{ data.item.full_name }}
                      </b-link>
                      <small>{{ data.item.user_code }} @{{ data.item.user_name }}</small>
                    </b-col>
                  </b-row>
                </b-media>
              </template>

              <template #cell(admin_role)="data">
                <!-- Admin (ID = 1) -->
                <div v-if="data.item.admin_role == 'TBSAdmin' && data.item.id == 1" class="text-nowrap">
                  <feather-icon icon="ServerIcon" size="18" class="mr-50 text-green" />
                  <span class="align-text-top text-capitalize">Admin</span>
                </div>

                <!-- Manager -->
                <div v-if="data.item.admin_role == 'TBSAdmin' && data.item.id != 1" class="text-nowrap">
                  <feather-icon icon="ServerIcon" size="18" class="mr-50 text-primary" />
                  <span class="align-text-top text-capitalize">Manager</span>
                </div>

                <!-- Accountant -->
                <div v-if="data.item.admin_role == 'TBSAccountant'" class="text-nowrap">
                  <feather-icon icon="Edit3Icon" size="18" class="mr-50 text-success" />
                  <span class="align-text-top text-capitalize">Accountant</span>
                </div>

                <!-- Worker -->
                <div v-if="data.item.admin_role == 'TBSWorker'" class="text-nowrap">
                  <feather-icon icon="ToolIcon" size="18" class="mr-50 text-warning" />
                  <span class="align-text-top text-capitalize">Worker</span>
                </div>

                <!-- Supervisor -->
                <div v-if="data.item.admin_role == 'TBSSupervisor'" class="text-nowrap">
                  <feather-icon icon="UsersIcon" size="18" class="mr-50 text-info" />
                  <span class="align-text-top text-capitalize">Supervisor</span>
                </div>

                <!-- Driver -->
                <div v-if="data.item.admin_role == 'TBSDriver'" class="text-nowrap">
                  <feather-icon icon="TruckIcon" size="18" class="mr-50 text-danger" />
                  <span class="align-text-top text-capitalize">Driver</span>
                </div>
              </template>

              <template #cell(active_status)="data">
                <b-badge v-if="data.item.active_status == '1'" class="ml-1" style="padding: 8px"
                  variant="light-success">
                  Active
                </b-badge>
                <b-badge v-if="data.item.active_status == '2'" class="ml-1" style="padding: 8px"
                  variant="light-warning">
                  InActive
                </b-badge>
              </template>

              <!-- Column: Actions -->
              <template #cell(actions)="data">
                <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>
                  <b-dropdown-item :to="{ name: 'view-staff-details', params: { id: data.item.id } }">
                    <feather-icon icon="FileTextIcon" />
                    <span class="align-middle ml-50">Details</span>
                  </b-dropdown-item>

                  <b-dropdown-item :to="{ name: 'edit-staff-details', params: { id: data.item.id } }">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>


            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination.totalRows == 0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <div class="empty-state py-2">
                <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
                <p class="txt-grey mt-1">No Employees</p>
              </div>
            </div>
          </div>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
          <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{ pagination.to
          }} of
            {{ pagination.totalRows }} entries</span>
          <span v-else class="text-muted">Showing 0 to 0 of 0 entries</span>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-end" cols="12" sm="6">
          <b-pagination v-model="currentPage" :per-page="pagination.perPage" :total-rows="pagination.totalRows"
            first-number last-number next-class="next-item" prev-class="prev-item" class="pagination-primary">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" class="pagination-primary" />
            </template>

            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BAlert,
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
  BSidebar,
  BTable,
  VBModal,
  BLink,
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
import staff from "@/apis/modules/staff";
import { avatarText } from '@core/utils/filter'
import { DatabaseIcon } from "vue-feather-icons";

export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BLink,
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
    avatarText,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  setup() {
    const statusOptions = [
      { label: 'All', value: 0 },
      { label: 'Manager', value: 'TBSAdmin' },
      { label: 'Accountant', value: 'TBSAccountant' },
      { label: 'Supervisor', value: 'TBSSupervisor' },
      { label: 'Worker', value: 'TBSWorker' },
      { label: 'Driver', value: 'TBSDriver' },
    ]

    return {
      statusOptions,
    }
  },
  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      active_status: '',
      avatar: require('@/assets/images/avatars/shop.png'),
      managers: [],
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

      user_code: '',
      user_name: '',
      first_name: '',
      last_name: '',
      address: '',
      phone_no: '',


      submittedPriceNames: [],
      user_code_status: null,
      user_name_status: null,
      first_name_status: null,
      last_name_status: null,
      address_status: null,
      phone_no_status: null,


      fields: [
        {
          key: "user_name",
          label: "name",
          sortable: true,
        },
        {
          key: "a_shift",
          label: "Day Shift",
        },
        {
          key: "b_shift",
          label: "Day OT Shift",
        },
        {
          key: "c_shift",
          label: "Day Extra Shift",
        },
        // {
        //   key: "na_shift",
        //   label: "Night Shift",
        // },
        // {
        //   key: "nb_shift",
        //   label: "Night OT Shift",
        // },
        // {
        //   key: "nc_shift",
        //   label: "Night Extra Shift",
        // },
        {
          key: "admin_role",
          label: "role",
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
    filterQueryUpdate() {
      this.$refs.table.refresh();
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },
    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await staff.getStaffs(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          full_name: x.first_name + ' ' + x.last_name,
          a_shift: x.a_shift ? 'Rs:' + x.a_shift : "N/A",
          b_shift: x.b_shift ? 'Rs:' + x.b_shift : "N/A",
          c_shift: x.c_shift ? 'Rs:' + x.c_shift : "N/A",
          na_shift: x.na_shift ? 'Rs:' + x.na_shift : "N/A",
          nb_shift: x.nb_shift ? 'Rs:' + x.nb_shift : "N/A",
          nc_shift: x.nc_shift ? 'Rs:' + x.nc_shift : "N/A",
          admin_role: x.admin_role,
          active_status: x.active_status,
          image: x.image
        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        return dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    async deleteStaff(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this member?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await staff.staffDelete(id)
            this.showSuccessMessage('Staff Member has been deleted')
            this.refreshTable();
          } else if (result.dismiss == 'cancel') {
            this.formLoading = false
            this.showSuccessMessage('Cancelled')
          }
        })

        this.tableLoading = false

      } catch (error) {
        this.convertAndNotifyError(error)
        this.tableLoading = false
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
      this.user_code_status = valid
      this.user_name_status = valid
      this.first_name_status = valid
      this.last_name_status = valid
      this.address_status = valid
      this.phone_no_status = valid
      return valid
    },

    resetModalPrice() {
      this.user_code = ''
      this.user_name = ''
      this.first_name = ''
      this.last_name = ''
      this.address = ''
      this.phone_no = ''

      this.user_code_status = null
      this.user_name_status = null
      this.first_name_status = null
      this.last_name_status = null
      this.address_status = null
      this.phone_no_status = null
    },

    handleOkPrice(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitPrice()
    },

    handleSubmitPrice() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityPrice()) {
        return
      }
      this.submittedPriceNames.push(
        this.user_code,
        this.user_name,
        this.first_name,
        this.last_name,
        this.address,
        this.phone_no,
      )
      this.companyPrice(
        this.user_code,
        this.user_name,
        this.first_name,
        this.last_name,
        this.address,
        this.phone_no,
      )

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-price'].toggle('#toggle-btn-price')
      })
    },

    async companyPrice(user_code, user_name, first_name, last_name, address, phone_no) {
      try {
        this.payload = {
          user_code: user_code,
          user_name: user_name,
          first_name: first_name,
          last_name: last_name,
          address: address,
          phone_no: phone_no,
          active_status: 1,
        }
        this.isLoading = true
        const response = await staff.staffCreate(this.payload)
        this.showSuccessMessage('Create Employee Successfully')
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.code ? this.showErrorMessage('The User code has been already taken.') : ''
        this.isLoading = false
      }
    },

  },

  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    }

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
  min-width: 190px;
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