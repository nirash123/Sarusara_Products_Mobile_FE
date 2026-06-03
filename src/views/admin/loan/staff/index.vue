<template>
  <div>

    <b-card no-body>

      <div class="m-2">

        <!-- ================= TOP SECTION ================= -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Entries</label>

            <v-select v-model="pagination.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          </b-col>

          <!-- Search & Button -->
          <b-col cols="12" md="7">

            <div class="d-flex align-items-center justify-content-end">

              <b-form-input v-model="filters['name_or_email']" class="d-inline-block modern-search mr-1"
                placeholder="🔍 Search suppliers..." />

              <!-- Add Loan Button -->
              <b-button class="modern-btn single-line-text" variant="primary" id="toggle-btn-price"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-prevent-closing-price>
                <span class="align-middle">
                  Get New Loan
                </span>
              </b-button>

            </div>

          </b-col>

        </b-row>

      </div>

      <!-- ================= ADD LOAN MODAL ================= -->
      <b-modal size="lg" id="modal-prevent-closing-price" centered ref="my-modal-price" title="Add New Loan"
        ok-title="Submit" cancel-variant="outline-secondary" @show="resetModalPrice" @hidden="resetModalPrice"
        @ok="handleOkPrice">

        <form ref="form" @submit.stop.prevent="handleSubmitPrice">

          <!-- Staff -->
          <b-col sm="12" md="12">

            <b-form-group label="Select Staff Member">

              <v-select v-model="user_id" label="label" :options="groups" :reduce="item => item" class="custom-v-select"
                required />

            </b-form-group>

          </b-col>

          <!-- Note -->
          <b-col sm="12" md="12">

            <b-form-group label="Note" label-for="note" invalid-feedback="Note is required">

              <b-form-input id="note" v-model="note" :state="note_status" placeholder="Enter Note" />

            </b-form-group>

          </b-col>

          <!-- Amount -->
          <b-col sm="12" md="12">

            <b-form-group label="Amount" label-for="amount" invalid-feedback="Amount is required">

              <b-form-input id="amount" v-model="amount" :state="amount_status" type="number"
                placeholder="Enter Amount" />

            </b-form-group>

          </b-col>

          <b-col sm="12" md="12">

            <b-form-group label="Card Amount" label-for="bank" invalid-feedback="Amount is required">

              <b-form-input id="amount" v-model="bank" :state="bank_status" type="number"
                placeholder="Enter Card Amount" />

            </b-form-group>

          </b-col>

        </form>

      </b-modal>

      <!-- ================= PAY LOAN MODAL ================= -->
      <b-modal size="lg" id="modal-prevent-closing-pay" centered ref="my-modal-pay" title="Pay Loan" ok-title="Submit"
        cancel-variant="outline-secondary" @show="resetModalPay" @hidden="resetModalPay" @ok="handleOkPay">

        <form ref="formPay" @submit.stop.prevent="handleSubmitPay">

          <!-- Staff Member -->
          <b-col sm="12" md="12">

            <b-form-group label="Staff Member">

              <b-form-input disabled v-model="user_name" :state="user_name_status" class="modern-input"
                placeholder="Staff Member name" />

            </b-form-group>

          </b-col>

          <!-- Note -->
          <b-col sm="12" md="12">

            <b-form-group label="Note" label-for="pay_note" invalid-feedback="Note is required">

              <b-form-input id="pay_note" v-model="pay_note" :state="pay_note_status" placeholder="Enter Note" />

            </b-form-group>

          </b-col>

          <!-- Amount -->
          <b-col sm="12" md="12">

            <b-form-group label="Amount" label-for="pay_amount" invalid-feedback="Amount is required">

              <b-form-input id="pay_amount" v-model="pay_amount" :state="pay_amount_status" type="number"
                placeholder="Enter Amount" />

            </b-form-group>

          </b-col>
          <b-col sm="12" md="12">

            <b-form-group label="Card Amount" label-for="pay_bank" invalid-feedback="Amount is required">

              <b-form-input id="pay_bank" v-model="pay_bank" :state="pay_bank_status" type="number"
                placeholder="Enter Amount" />

            </b-form-group>

          </b-col>

        </form>

      </b-modal>

      <!-- ================= TABLE ================= -->
      <b-row class="m-2">

        <b-col cols="12">

          <b-overlay :show="tableLoading" rounded="sm">

            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive>

              <!-- User Name -->
              <template #cell(user_name)="data">
                <b-media vertical-align="center" v-b-modal.modal-prevent-closing-pay @click="addNewPay(data.item)">
                  <b-row class="align-items-center">
                    <b-col cols="auto">
                      <b-avatar size="40" :src="imageUrl + data.item.image"
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

              <!-- Phone -->
              <template #cell(phone_no)="data">

                <span class="text-primary cursor-pointer" v-b-modal.modal-prevent-closing-pay
                  @click="addNewPay(data.item)">
                  {{ data.item.phone_no }}
                </span>

              </template>

              <!-- Address -->
              <template #cell(address)="data">

                <span class="text-primary cursor-pointer" v-b-modal.modal-prevent-closing-pay
                  @click="addNewPay(data.item)">
                  {{ data.item.address }}
                </span>

              </template>

              <!-- Loan -->
              <template #cell(loan)="data">

                <span class="text-danger cursor-pointer" v-b-modal.modal-prevent-closing-pay
                  @click="addNewPay(data.item)">
                  {{ data.item.loan }}
                </span>

              </template>

              <!-- Actions -->
              <template #cell(actions)="data">

                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary" :to="{
                  name: 'view-staff-details',
                  params: { id: data.item.id }
                }" class="btn-icon mr-50">

                  <feather-icon icon="EyeIcon" size="16" class="align-middle text-body" />

                </b-button>

              </template>

            </b-table>

          </b-overlay>

        </b-col>

        <!-- ================= EMPTY STATE ================= -->
        <b-col cols="12">

          <div v-if="pagination.totalRows == 0">

            <div class="d-flex flex-column align-items-center justify-content-center h-100">

              <div class="empty-state py-2">

                <img class="img-fluid" src="@/assets/images/pages/user-icon.png" alt="" width="100">

                <p class="txt-grey mt-1">
                  No Staffs
                </p>

              </div>

            </div>

          </div>

        </b-col>

        <!-- ================= PAGINATION INFO ================= -->
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">

          <span v-if="pagination.totalRows !== 0" class="text-muted">

            Showing
            {{ pagination.from }}
            to
            {{ pagination.to }}
            of
            {{ pagination.totalRows }}
            entries

          </span>

          <span v-else class="text-muted">
            Showing 0 to 0 of 0 entries
          </span>

        </b-col>

        <!-- ================= PAGINATION ================= -->
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

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
import staff from "@/apis/modules/staff";

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
      groups: [],
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
      user_id: '',
      note: '',
      amount: '',
      bank: '',
      user_status: '',
      status: '',


      user_name: '',
      selected_user_id: '',
      pay_note: '',
      pay_amount: '',
      pay_bank: '',
      pay_user_status: '',
      pay_status: '',

      submittedPriceNames: [],
      submittedPayNames: [],

      user_id_status: null,
      note_status: null,
      amount_status: null,
      bank_status: null,

      pay_note_status: null,
      pay_amount_status: null,
      pay_bank_status: null,


      fields: [
        {
          key: "user_name",
          label: "name",
          sortable: true,
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
          key: "admin_role",
          label: "role",
          sortable: true,
        },
        {
          key: "loan",
          label: "Outstanding Loan",
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

    addNewPay(item) {
      this.user_name = item.full_name
      this.selected_user_id = item.id
    },

    async groupData() {
      try {
        const response = await admin.staffData()
        this.groups = response.data.data

      } catch (error) {
        console.error(error)
      }
    },

    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },
    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await staff.getStaffLoans(
          this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          full_name: x.first_name + ' ' + x.last_name,
          address: x.address ? x.address : "N/A",
          phone_no: x.phone_no ? x.phone_no : "N/A",
          admin_role: x.admin_role,
          loan: x.loan && Number(x.loan) > 0
            ? `Rs ${Number(x.loan).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            : "N/A",
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

    refreshTable() {
      this.$refs.table.refresh()
    },

    filterQueryUpdate() {
      this.$refs.table.refresh();
    },



    checkFormValidityPrice() {
      const valid = this.$refs.form.checkValidity()
      this.user_id_status = valid
      this.note_status = valid
      this.amount_status = valid
      this.bank_status = valid
      return valid
    },

    resetModalPrice() {
      this.user_id = ''
      this.note = ''
      this.amount = ''
      this.bank = ''

      this.user_id_status = null
      this.note_status = null
      this.amount_status = null
      this.bank_status = null
    },

    handleOkPrice(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitPrice()
    },

    handleSubmitPrice() {

      if (this.amount + this.bank > 0) {
        // Exit when the form isn't valid
        if (!this.checkFormValidityPrice()) {
          return
        }
        this.submittedPriceNames.push(
          this.user_id,
          this.note,
          this.amount,
          this.bank,
        )
        this.loanStaff(
          this.user_id,
          this.note,
          this.amount,
          this.bank,
        )

        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs['my-modal-price'].toggle('#toggle-btn-price')
        })
      }
    },

    async loanStaff(user_id, note, amount, bank) {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.payload = {
          cashier_id: userData?.id || userData?.user?.id,
          user_id: user_id.id,
          note: note,
          amount: amount,
          bank: bank,
          user_status: 3,
          status: 1,
        }
        this.isLoading = true
        const response = await admin.loanCreate(this.payload)
        this.showSuccessMessage('Create Loan Successfully')
        this.$refs.table.refresh();
        this.isLoading = false
      } catch (error) {
        error.response.data.data.user_id ? this.showErrorMessage('The Staff Member name required.') : ''

        this.isLoading = false
      }
      this.getUsers()
      this.$refs.table.refresh();
    },





    checkFormValidityPay() {

      const valid = this.$refs.formPay.checkValidity()

      this.pay_note_status = valid
      this.pay_amount_status = valid
      this.pay_bank_status = valid

      return valid

    },

    resetModalPay() {

      this.pay_note = ''
      this.pay_amount = ''
      this.pay_bank = ''

      this.pay_note_status = null
      this.pay_amount_status = null
      this.pay_bank_status = null

    },

    handleOkPay(bvModalEvt) {

      bvModalEvt.preventDefault()

      this.handleSubmitPay()

    },

    handleSubmitPay() {

      if (this.pay_bank + this.pay_amount > 0) {
        if (!this.checkFormValidityPay()) {
          return
        }

        this.loanPayStaff()
      }
    },

    async loanPayStaff() {

      try {

        this.isLoading = true
        const userData = JSON.parse(localStorage.getItem('userData'))
        const payload = {
          cashier_id: userData?.id || userData?.user?.id,
          user_id: this.selected_user_id,
          note: this.pay_note,
          amount: this.pay_amount,
          bank: this.pay_bank,
          user_status: 3,
          status: 2,

        }

        await admin.loanCreate(payload)

        this.showSuccessMessage('Pay Loan Successfully')

        this.$refs.table.refresh()

        this.$nextTick(() => {
          this.$refs['my-modal-pay'].hide()
        })

      } catch (error) {

        this.convertAndNotifyError(error)

      } finally {

        this.isLoading = false

      }

    },

  },

  mounted() {
    if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin' || JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAccountant') {
      this.groupData()
    } else {
      this.$router.push('/')
    }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
}

.modern-search {
  border-radius: 12px;
  padding: 8px;
  background: transparent !important;
  box-shadow: none !important;
  height: 36px;
  font-weight: 500;
}

.modern-search:focus {
  outline: none !important;
}

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
