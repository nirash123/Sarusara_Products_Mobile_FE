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
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="7">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1" placeholder="Search..." />
              <b-button class="single-line-text" variant="primary" id="toggle-btn-price"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                <span class="align-middle"> Add Supplier</span>
              </b-button>
              <b-modal id="modal-prevent-closing-price" centered ref="my-modal-price" title="Add New Supplier"
                ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
                @ok="handleOkPrice">
                <form ref="form" @submit.stop.prevent="handleSubmitPrice">

                  <b-col sm="12" md="12">
                    <b-form-group label="Supplier Name" label-for="supplier_name" invalid-feedback="User name required">
                      <b-form-input ref="codeInput" id="supplier_name" v-model="supplier_name"
                        :state="supplier_name_status" placeholder="Enter supplier name" required />
                    </b-form-group>
                  </b-col>


                  <b-col sm="12" md="12">
                    <b-form-group label="Address" label-for="address" invalid-feedback="Address is required">
                      <b-form-input id="address" v-model="address" :state="address_status"
                        placeholder="Enter Address" />
                    </b-form-group>
                  </b-col>

                  <b-col sm="12" md="12">
                    <b-form-group label="Mobile Number" label-for="phone" invalid-feedback="Mobile Number is required">
                      <b-form-input id="phone" v-model="phone_no" :state="phone_no_status"
                        placeholder="Enter mobile number" />
                    </b-form-group>
                  </b-col>


                  <b-col sm="12" md="12">
                    <b-form-group label="Vehicle Number" label-for="vehicle"
                      invalid-feedback="Vehicle Number is required">
                      <b-form-input id="vehicle" v-model="vehicle_number" :state="vehicle_number_status"
                        placeholder="Enter vehicle number" />
                    </b-form-group>
                  </b-col>
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
              class="mobile_table_css" hover responsive>

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

              <template #cell(buy)="data">
                <span class="text-primary"> {{ data.item.buy }}</span>
                </template>

                <template #cell(loan)="data">
                <span class="text-danger"> {{ data.item.loan }}</span>
                </template>



              <!-- Column: Actions -->
              <template #cell(actions)="data">

                <div class="text-nowrap">

                  <b-dropdown v-if="userData.id == 1" variant="link" toggle-class="p-0" no-caret
                    :right="$store.state.appConfig.isRTL">

                    <template #button-content>
                      <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary"
                        class="btn-icon mr-50">
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                      </b-button>
                    </template>
                    <b-dropdown-item :to="{ name: 'view-supplier-details', params: { id: data.item.id } }">
                      <feather-icon icon="EyeIcon" />
                      <span class="align-middle ml-50">view</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="data.item.active_status != '4'" :to="{ name: 'edit-supplier-details', params: { id: data.item.id } }">
                      <feather-icon icon="EditIcon" />
                      <span class="align-middle ml-50">Edit</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="data.item.active_status != '4'" @click="deleteSupplier(data.item.id)">
                      <feather-icon icon="TrashIcon" />
                      <span class="align-middle ml-50">Delete</span>
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown v-else variant="link" toggle-class="p-0" no-caret :right="$store.state.appConfig.isRTL">

                    <template #button-content>
                      <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary"
                        class="btn-icon mr-50">
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                      </b-button>
                    </template>
                    <b-dropdown-item :to="{ name: 'view-supplier-details', params: { id: data.item.id } }">
                      <feather-icon icon="EyeIcon" />
                      <span class="align-middle ml-50">view</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="data.item.active_status != '4'" :to="{ name: 'edit-supplier-details', params: { id: data.item.id } }">
                      <feather-icon icon="EditIcon" />
                      <span class="align-middle ml-50">Edit</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>

            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination.totalRows == 0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <div class="empty-state py-2">
                <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
                <p class="txt-grey mt-1">No Suppliers</p>
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
  BFormRating,
  BImg,
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

export default {
  components: {
    BFormRating,
    BImg,
    BTable,
    BAvatar,
    BBadge,
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

  mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      active_status: '',
      avatar: require('@/assets/images/avatars/avatar.png'),
      managers: [],
      filters: {},
      jobRoleOption: [],
      tableLoading: false,
      noDataTable: "",
      pageOptions: [5, 10, 25],
      currentPage: 1,
      image: '',
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
      supplier_name: '',
      address: '',
      phone_no: '',
      vehicle_number: '',

      submittedPriceNames: [],

      supplier_name_status: null,
      address_status: null,
      phone_no_status: null,
      vehicle_number_status: null,


      fields: [
        {
          key: "supplier_name",
          label: "supplier name",
        },
        {
          key: "address",
          label: "address",
        },
        {
          key: "phone_no",
          label: "mobile number",
        },
        {
          key: "buy",
          label: "Credit Amount",
        },
        {
          key: "loan",
          label: "Outstanding Loan",
        },
        {
          key: "active_status",
          label: "status",
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
        const Response = await admin.getSuppliers(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          supplier_name: x.supplier_name,
          address: x.address ? x.address : "N/A",
          phone_no: x.phone_no ? x.phone_no : "N/A",
          active_status: x.active_status,
          loan: x.loan && Number(x.loan) > 0
            ? `Rs ${Number(x.loan).toFixed(2)}`
            : "N/A",
          buy: x.buy && Number(x.buy) > 0
            ? `Rs ${Number(x.buy).toFixed(2)}`
            : "N/A",
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

    async deleteSupplier(id) {
      this.$swal({
        title: 'Are you sure you want to delete this supplier?',
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
          try {
            this.tableLoading = true

            await admin.supplierDelete(id)

            this.showSuccessMessage('Supplier has been deleted')
            this.refreshTable()

          } catch (error) {
            // ✅ SHOW BACKEND ERROR MESSAGE
            let msg = error.response?.data?.error || 'Something went wrong'

            this.$swal({
              icon: 'error',
              title: 'Delete Failed',
              text: msg
            })
          } finally {
            this.tableLoading = false
          }

        } else if (result.dismiss === 'cancel') {
          this.showSuccessMessage('Cancelled')
        }
      })
    },

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },

    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.supplier_name_status = valid
      this.address_status = valid
      this.phone_no_status = valid
      this.vehicle_number_status = valid
      return valid
    },

    resetModalPrice() {
      this.supplier_name = ''
      this.address = ''
      this.phone_no = ''
      this.vehicle_number = ''

      this.supplier_name_status = null
      this.address_status = null
      this.phone_no_status = null
      this.vehicle_number_status = null
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
        this.supplier_name,
        this.address,
        this.phone_no,
        this.vehicle_number,
      )
      this.companySupplier(
        this.supplier_name,
        this.address,
        this.phone_no,
        this.vehicle_number,
      )

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal-price'].toggle('#toggle-btn-price')
      })
    },

    async companySupplier(supplier_name, address, phone_no, vehicle_number) {
      try {
        this.payload = {
          supplier_name: supplier_name,
          address: address,
          phone_no: phone_no,
          vehicle_number: vehicle_number,
        }
        this.isLoading = true
        const response = await admin.supplierCreate(this.payload)
        this.showSuccessMessage('Create Supplier Successfully')
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.supplier_name ? this.showErrorMessage('The Supplier name has been already taken.') : ''
        error.response.data.data.phone_no ? this.showErrorMessage('The Mobile number has been already taken.') : ''
        error.response.data.data.vehicle_number ? this.showErrorMessage('The Vehicle number has been already taken.') : ''

        this.isLoading = false
      }
      this.getUsers()
      this.$refs.table.refresh();
    },

  },

  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {

    } else {
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
