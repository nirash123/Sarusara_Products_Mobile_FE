<template>
  <div>
    <b-card no-body class="card card-congratulations-profile">
      <!-- profile picture -->
      <div class="position-relative">
        <div class="profile-img-container d-flex align-items-center">
          <div class="profile-img">
            <b-button @click="$router.push('/suppliers')" v-ripple.400="'rgba(40, 199, 111, 0.15)'" variant='light-dark'
              class="btn-icon mb-5 mx-2">
              <feather-icon size="80" icon='ChevronsLeftIcon' />
            </b-button>



          </div>
          <!-- profile title -->
          <div class="profile-title ml-3">
            <h1 class="font-large-2 text-white">
              {{ supplier_name }}
            </h1>


          </div>


          <!--/ profile title -->
        </div>
      </div>
    </b-card>
    <b-card v-if="active_status !== 4">
      <b-row>
        <b-col lg="5" md="12" sm="12">

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
        <b-col lg="7" md="12" sm="12">
          <b-card no-body>

            <div class="m-2">

              <!-- Table Top -->
              <b-row>

                <!-- Per Page -->
                <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <label>Entries</label>
                  <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
                </b-col>

                <!-- Search -->
                <b-col cols="12" md="7">
                  <div class="d-flex align-items-center justify-content-end">
                    <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1"
                      placeholder="Search..." />
                    <b-button class="single-line-text" variant="primary" id="toggle-btn-price"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                      <span class="align-middle"> Add</span>
                    </b-button>
                    <b-modal size="md" id="modal-prevent-closing-price" centered ref="my-modal-price"
                      title="Add New Vehicle" ok-title="Submit" cancel-variant="outline-secondary"
                      @show="resetModalPrice" @hidden="resetModalPrice" @ok="handleOkPrice">
                      <form ref="form" @submit.stop.prevent="handleSubmitPrice">


                        <!-- Lorry Number -->
                        <b-form-group label="Lorry Number">
                          <b-form-input v-model="lorry_number" :state="lorry_number_status" required />
                        </b-form-group>
                      </form>
                    </b-modal>
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

                    <template #cell(lorry_number)="data">
                      <b-media vertical-align="center">
                        <b-row class="align-items-center">
                          <b-col cols="auto">
                            <feather-icon icon="TruckIcon" size="18" class="mr-50 text-danger" />
                          </b-col>
                          <b-col>
                            <b-link class="font-weight-bold d-block text-nowrap">
                              {{ data.item.lorry_number }}
                            </b-link>
                          </b-col>
                        </b-row>
                      </b-media>
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

                    <template #cell(actions)="data">
                      <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                        <template #button-content>
                          <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item :to="{ name: 'edit-supplier-lorry-details', params: { id: data.item.id } }">
                          <feather-icon icon="EditIcon" />
                          <span class="align-middle ml-50">Edit</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="deleteLorry(data.item.id)">
                          <feather-icon icon="TrashIcon" />
                          <span class="align-middle ml-50">Delete</span>
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
                      <p class="txt-grey mt-1">No Vehicles Found</p>
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
                <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{
                  pagination.to
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
        </b-col>
      </b-row>
    </b-card>

    <b-card v-else>
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
      <b-row>
        <b-col cols="12">
          <b-card no-body>

            <div class="m-2">

              <!-- Table Top -->
              <b-row>

                <!-- Per Page -->
                <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <label>Entries</label>
                  <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
                </b-col>

                <!-- Search -->
                <b-col cols="12" md="7">
                  <div class="d-flex align-items-center justify-content-end">
                    <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1"
                      placeholder="Search..." />
                    <b-button class="single-line-text" variant="primary" id="toggle-btn-price"
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                      <span class="align-middle"> Add</span>
                    </b-button>
                    <b-modal size="md" id="modal-prevent-closing-price" centered ref="my-modal-price"
                      title="Add New Vehicle" ok-title="Submit" cancel-variant="outline-secondary"
                      @show="resetModalPrice" @hidden="resetModalPrice" @ok="handleOkPrice">
                      <form ref="form" @submit.stop.prevent="handleSubmitPrice">


                        <!-- Lorry Number -->
                        <b-form-group label="Lorry Number">
                          <b-form-input v-model="lorry_number" :state="lorry_number_status" required />
                        </b-form-group>
                      </form>
                    </b-modal>
                  </div>
                </b-col>
              </b-row>

            </div>

            <b-row class="m-2">
              <b-col cols="12">
                <b-overlay :show="tableLoading" rounded="sm">
                  <b-table ref="table" :current-page="currentPage" :fields="ownfields" :items="getUsers"
                    :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
                    class="mobile_table_css" hover responsive style="min-height: 150px">

                    <template #cell(lorry_number)="data">
                      <b-media vertical-align="center">
                        <b-row class="align-items-center">
                          <b-col cols="auto">
                            <feather-icon icon="TruckIcon" size="18" class="mr-50 text-danger" />
                          </b-col>
                          <b-col>
                            <b-link class="font-weight-bold d-block text-nowrap">
                              {{ data.item.lorry_number }}
                            </b-link>
                          </b-col>
                        </b-row>
                      </b-media>
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

                    <template #cell(status)="data">
                      <b-badge v-if="data.item.status == '1'" class="ml-1" style="padding: 8px" variant="light-success">
                        <span style="font-size: 20px;">♻️🚛</span> Collection Vehicle
                      </b-badge>
                      <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px" variant="light-danger">
                        <span style="font-size: 20px;">📦🚚 </span> Delivery Vehicle

                      </b-badge>
                      <b-badge v-if="data.item.status == '3'" class="ml-1" style="padding: 8px" variant="light-primary">
                        <span style="font-size: 20px;">🔄🚛 </span> Dual-Operation Vehicle

                      </b-badge>
                      <b-badge v-if="data.item.status == '4'" class="ml-1" style="padding: 8px" variant="light-warning">
                        <span style="font-size: 20px;">🚜 </span> Support Equipment Vehicle

                      </b-badge>
                    </template>

                    <template #cell(sms)="data">
                      <span class="ml-1">
                        <b-form-checkbox disabled class="mt-50" :checked="data.item.insurance == 1"><b>Insurance </b>
                        </b-form-checkbox>
                        <b-form-checkbox disabled class="mt-50" :checked="data.item.licence == 1"><b>Revenue License
                          </b>
                        </b-form-checkbox>
                        <b-form-checkbox disabled class="mt-50" :checked="data.item.green == 1"><b> Emission Test
                            Certificate </b>
                        </b-form-checkbox>
                      </span>
                    </template>

                    <template #cell(actions)="data">
                      <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

                        <template #button-content>
                          <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item :to="{ name: 'edit-supplier-lorry-details', params: { id: data.item.id } }">
                          <feather-icon icon="EditIcon" />
                          <span class="align-middle ml-50">Edit</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="deleteLorry(data.item.id)">
                          <feather-icon icon="TrashIcon" />
                          <span class="align-middle ml-50">Delete</span>
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
                      <p class="txt-grey mt-1">No Vehicles Found</p>
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
                <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }} to {{
                  pagination.to
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
      supplier_name: '',
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
      supplier_id_status: null,



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
          label: "vehicle number",
        },
        {
          key: "sms",
          label: "sms",
        },
        {
          key: "status",
          label: "vehicle type",
          sortable: true,
        },
        {
          key: "active_status",
          label: "status",
          sortable: true,
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
      this.getUsers()
    }
    else {
      this.$router.push('/')
    }
  },
  methods: {
    async userDetails(id) {
      try {
        const response = await admin.getSupplierDetails(id)
        this.supplier_name = response.data.supplier_name
        this.address = response.data.address
        this.phone_no = response.data.phone_no
        this.active_status = response.data.active_status
        this.last_buy = response.data.last_buy ? 'Rs: ' + response.data.last_buy : 'Rs: 0.00'
        this.last_date = response.data.last_date ? response.data.last_date : 'N/A'
      } catch (error) {
        this.showErrorMessage('Customer not found.')
      }
    },


    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await driver.getSupplierLorrys(
          this.$route.params.id, this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          lorry_number: x.lorry_number,
          active_status: x.active_status,
          status: x.status,
          insurance: x.insurance,
          licence: x.licence,
          green: x.green,

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

    async deleteLorry(id) {

      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this?',
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
            await driver.lorryDelete(id)
            this.showSuccessMessage('Vehicle has been deleted')
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
          supplier_id: this.$route.params.id,
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
