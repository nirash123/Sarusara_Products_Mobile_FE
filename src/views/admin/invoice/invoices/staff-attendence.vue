<template>
  <div class="invoice-page">
    <section class="invoice-preview-wrapper">
    <b-card class="p-0">
      <b-row class="align-items-end g-2">

        <!-- INPUT SECTION -->
        <b-col cols="8">
          <div class="input-card">

            <label class="input-label">
              Selected Date
            </label>

            <flat-pickr v-model="selectedDate" @input="changeDate" class="form-control modern-input mt-1"
              :config="dateConfig" />

          </div>
        </b-col>

        <!-- DATE SECTION -->
        <b-col cols="4">
          <b-button class="ml-1 action-card single-line-text" @click="printInvoice">
            <span class="align-middle">
              Print
            </span>
          </b-button>
        </b-col>

      </b-row>


      <div class="my-1">
        <div class="d-flex justify-content-center">
          <h2><b>{{ selectedDate }} - PRESENT STAFF</b></h2>
        </div>
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
              <b-modal id="loading-modal" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc
                modal-class="loading-modal" content-class="loading-content">

                <div class="loading-wrapper">

                  <div class="loading-circle">
                    <b-spinner variant="primary"></b-spinner>
                  </div>

                  <h4 class="loading-title">
                    Updating Attendance
                  </h4>

                  <p class="loading-text">
                    Please wait while we process your request...
                  </p>

                </div>

              </b-modal>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-row class="m-2">
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="attendence_carts"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive style="min-height: 150px">

              <template #cell(users_user_name)="data">
                <b-media vertical-align="center">
                  <b-row class="align-items-center">
                    <b-col cols="auto">
                      
                    </b-col>
                    <b-col>
                        {{ data.item.full_name }}
                      <small> @{{ data.item.user_name }}</small>

                    </b-col>
                  </b-row>
                </b-media>
              </template>

              <template #cell(job_role)="data">
                <b-media vertical-align="center">
                  <b-row class="align-items-center">
                    <b-col>
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
                    </b-col>
                  </b-row>
                </b-media>
              </template>

              <!-- Column: check_in_time -->
              <template #cell(check_in_time)="data">
                <b-form-input v-if="data.item.status == 1" id="shift_start_time" type="time"
                  v-model="data.item.check_in_time" :state="shift_start_time_status"
                  placeholder="Select shift start time"
                  @change="changeTime(data.item.id, 1, data.item.check_in_time)" />
                <div v-else>{{ data.item.check_in_time }}</div>
              </template>

              <!-- Column: check_out_time -->
              <template #cell(check_out_time)="data">

                <b-form-input v-if="data.item.status == 1" v-model="data.item.check_out_time"
                  @change="changeTime(data.item.id, 2, data.item.check_out_time)" type="time" :value="data.item.check_out_time === '00:00'
                    ? ''
                    : data.item.check_out_time.slice(0, 5)
                    " :class="{
                      'red-input': data.item.check_out_time === '00:00'
                    }" placeholder="Select shift start time" />
                <div v-else>{{ data.item.check_out_time }}</div>
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

    <b-card class="invoice-card p-0">
      <div class="d-flex justify-content-center">
        <h2><b>{{ selectedDate }} - ABSENT STAFF</b></h2>
      </div>
      <div class="mt-2">
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Entries</label>
            <v-select v-model="pagination2.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="pageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          </b-col>
        </b-row>

      </div>

      <b-row class="m-2">
        <b-col cols="12">
          <b-overlay :show="tableLoading" rounded="sm">
            <b-table ref="table" :current-page="currentPage2" :fields="fields2" :items="attendence_pending_carts"
              :per-page="pagination2.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive style="min-height: 150px">

              <template #cell(users_user_name)="data">
                <b-media vertical-align="center">
                  <b-row class="align-items-center">
                    <b-col cols="auto">
                    </b-col>
                    <b-col>
                        {{ data.item.full_name }}
                      <small> @{{ data.item.user_name }}</small>

                    </b-col>
                  </b-row>
                </b-media>
              </template>

              <template #cell(job_role)="data">
                <b-media vertical-align="center">
                  <b-row class="align-items-center">
                    <b-col>
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
                    </b-col>
                  </b-row>
                </b-media>
              </template>
            </b-table>
          </b-overlay>
        </b-col>

        <b-col cols="12">
          <div v-if="pagination2.totalRows == 0">
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
          <span v-if="pagination2.totalRows !== 0" class="text-muted">Showing {{ pagination2.from }} to {{
            pagination2.to
          }} of
            {{ pagination2.totalRows }} entries</span>
          <span v-else class="text-muted">Showing 0 to 0 of 0 entries</span>
        </b-col>

        <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-end" cols="12" sm="6">
          <b-pagination v-model="currentPage2" :per-page="pagination2.perPage" :total-rows="pagination2.totalRows"
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
    </section>
  </div>
</template>

<script>
import {
  BMedia,
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
  BSpinner,
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
import { avatarText } from '@core/utils/filter'
import attendence from "@/apis/modules/attendence";
import flatPickr from 'vue-flatpickr-component';

export default {
  components: {
    BSpinner,
    BMedia,
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
    flatPickr,
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
      selectedDate: new Date().toISOString().split('T')[0],
      attendence_carts: [],
      attendence_pending_carts: [],
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
      currentPage2: 1,
      pagination2: {
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

      start_time: null,
      end_time: null,
      free_in_time: null,
      free_out_time: null,

      n_start_time: null,
      n_end_time: null,
      free_n_in_time: null,
      free_n_out_time: null,

      a_shift: null,
      b_shift: null,
      c_shift: null,

      submittedPriceNames: [],
      shift_start_time_status: null,
      shift_end_time_status: null,
      break_start_time_status: null,
      break_end_time_status: null,
      standard_work_hours_status: null,
      overtime_hours_status: null,
      additional_hours_status: null,
      shift_free_n_in_time_status: null,
      shift_free_n_out_time_status: null,
      shift_n_start_time_status: null,
      shift_n_end_time_status: null,

      dateConfig: {
        mode: 'single',
        dateFormat: 'Y-m-d',
        allowInput: true,

        minDate: new Date(
          new Date().setMonth(new Date().getMonth() - 4)
        ).toISOString().split('T')[0],

        maxDate: new Date(
          new Date().setDate(new Date().getDate())
        ).toISOString().split('T')[0],
      },

      fields: [
        {
          key: "user_code",
          label: "code",
          sortable: true,
        },
        {
          key: "users_user_name",
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
          key: "job_role",
          label: "role",
        },
        {
          key: "check_in_time",
          label: "Check-In",
          sortable: true,
        },
        {
          key: "check_out_time",
          label: "Check-Out",
          sortable: true,
        },
      ],

      fields2: [
        {
          key: "user_code",
          label: "code",
          sortable: true,
        },
        {
          key: "users_user_name",
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
          key: "job_role",
          label: "role",
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
    printInvoice() {
      window.print();
    },


    changeDate() {
      this.currentPage = 1; // important for pagination reset

      this.getUsers();
      this.getOldUsers();
    },


    async changeTime(id, time, changeTime) {

      try {

        this.$bvModal.show('loading-modal')

        const payload = {
          time: time,
          changeTime: changeTime,
        }

        await attendence.attendencePastUpdate(id, payload)

        this.$refs.table.refresh()

        await this.getUsers()

        await this.getOldUsers()

      } catch (error) {

        this.showErrorMessage(
          'Failed To Update Attendance Time'
        )

      } finally {

        this.$bvModal.hide('loading-modal')
      }
    },

    playSuccessBeep() {
      const audio = new Audio('/sounds/success.mp3')
      audio.play().catch(() => { })
    },

    playErrorBeep() {
      const audio = new Audio('/sounds/error.mp3')
      audio.play().catch(() => { })
    },

    handleQRCode() {
      const code = this.user_code
      this.$refs.nameInput.value = ''
      this.user_code = ''

      this.attendenceCreate(code)
    },


    async attendenceCreate(ucode) {
      if (!ucode) return;

      if (this.selectedDate) {

        this.user_code = '';

        try {
          this.isLoading = true;
          const payload = {
            selectedDate: this.selectedDate,
            check_in_time: "00:00:00",
            check_out_time: "00:00:00"
          }


          const response = await attendence.attendencePastCreate(ucode, payload);
          this.staff_carts = response.data.data;

          // 🔊 SUCCESS BEEP HERE


          if (response.data.success === true) {
            this.playSuccessBeep();

            this.showSuccessMessage(response.data.message);
            this.message = response.data.message;

            await this.getUsers();
            await this.getOldUsers();

          } else {
            this.playErrorBeep();

            this.showErrorMessage('Something went wrong');

            await this.getUsers();
            await this.getOldUsers();
          }

        } catch (error) {

        } finally {
          this.isLoading = false;

          this.$nextTick(() => {
            if (this.$refs.nameInput) {
              this.$refs.nameInput.focus();
            }
          });
        }
      } else {


        this.showErrorMessage('Please Select Date');
      }
    },



    callparentfunction() {
      this.$parent.$parent.$parent.sendInvitation();
    },

    formatMinutesToHHMM(minutes) {
      if (minutes === null || minutes === undefined || minutes === "") return "N/A";

      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;

      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    },

    async getUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await attendence.getPastAttendences(
          this.selectedDate, this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          full_name: x.users_first_name + ' ' + x.users_last_name,
          address: x.users_address,
          phone_no: x.users_phone_no,
          check_in_time: x.check_in_time ? x.check_in_time : "00:00",
          check_out_time: x.check_out_time ? x.check_out_time : "00:00",
          time_period: x.time_period ? x.time_period : "00:00",
          free_time: x.free_time,
          extra_time: x.extra_time ? x.extra_time : 0,
          total_time: x.total_time ? this.formatMinutesToHHMM(x.total_time) : "00:00",
          work_time: x.work_time ? this.formatMinutesToHHMM(x.work_time) : "00:00",
          work_time_period: x.work_time_period ? this.formatMinutesToHHMM(x.work_time_period) : "00:00",
          final_time_period: x.final_time_period,
          active_status: x.active_status,
          image: x.users_user_image,
          admin_role: x.admin_role,
          status: x.status,
        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination.totalRows = paginationResponse.total;
        this.pagination.perPage = paginationResponse.per_page;
        this.pagination.from = paginationResponse.from;
        this.pagination.to = paginationResponse.to;
        this.tableLoading = false;
        return this.attendence_carts = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },

    async getOldUsers() {
      try {
        this.tableLoading = true;
        if (this.sortBy == "") {
          this.sortDesc = true;
        }
        const Response = await attendence.getPastPendingAttendences(
          this.selectedDate, this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.user_code,
          user_name: x.user_name,
          full_name: x.first_name + ' ' + x.last_name,
          active_status: x.active_status,
          address: x.address,
          phone_no: x.phone_no,
          image: x.image,
          admin_role: x.admin_role
        }));
        this.noDataTable = Response.data.data.length;
        const paginationResponse = Response.data;
        this.currentPage = paginationResponse.current_page;
        this.pagination2.totalRows = paginationResponse.total;
        this.pagination2.perPage = paginationResponse.per_page;
        this.pagination2.from = paginationResponse.from;
        this.pagination2.to = paginationResponse.to;
        this.tableLoading = false;
        return this.attendence_pending_carts = dataArray
      } catch (error) {
        this.convertAndNotifyError(error);
        this.tableLoading = false;
      }
    },



    async deleteUser(id) {
      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to delete this attendence?',
          text: '',
          icon: 'error',
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
            await attendence.attendencePastDelete(id)
            this.showSuccessMessage('Attendence has been deleted')
            await this.getUsers();
            await this.getOldUsers();
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

    async submitUser(id) {
      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure?',
          text: '',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes, submit',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await attendence.attendencePastSubmit(id)
            this.showSuccessMessage('Attendence has been submitted')
            await this.getUsers();
            await this.getOldUsers();
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



    async handleChange(id, status) {

      try {

        this.$bvModal.show('loading-modal')

        const payload = {
          free_time: status == 1 ? 1 : 0,
        }

        await attendence.updatePastAttendencesStatus(id, payload)

        await this.getUsers()

        this.$refs.table.refresh()

      } catch (error) {

        this.showErrorMessage(
          'Failed To Update Attendance'
        )

      } finally {

        this.$bvModal.hide('loading-modal')
      }
    },
  },

  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      this.selectedDate = yesterday.toISOString().split('T')[0]
      this.getUsers()
      this.getOldUsers();
    }
  }
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";

.attendance-setting-content {
  border: none !important;
  border-radius: 20px !important;
  overflow: hidden;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #eee;
  background: #f8faff;
}

.settings-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #222;
}

.settings-subtitle {
  color: #777;
  margin: 0;
}

.total-hour-card {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  padding: 15px 25px;
  border-radius: 15px;
  text-align: center;
  min-width: 170px;
}

.total-hour-label {
  font-size: 13px;
  opacity: 0.9;
}

.total-hour-value {
  font-size: 30px;
  font-weight: 700;
}

.setting-section {
  padding: 25px;
  margin: 20px;
  border-radius: 18px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.date-picker {
  min-width: 240px;
  border-radius: 8px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

.modern-input {
  height: 48px !important;
  border-radius: 12px !important;
  border: 1px solid #ddd !important;
  font-size: 15px;
}

.modern-input:focus {
  box-shadow: 0 0 0 0.15rem rgba(79, 70, 229, 0.15) !important;
  border-color: #6366f1 !important;
}

.settings-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 25px;
  border-top: 1px solid #eee;
  background: #fff;
}

.cancel-btn,
.save-btn {
  min-width: 140px;
  height: 45px;
  border-radius: 12px !important;
  font-weight: 600;
}

.loading-modal .modal-dialog {
  max-width: 350px;
}

.loading-content {
  border: none !important;
  border-radius: 20px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.loading-wrapper {
  padding: 40px 25px;
  text-align: center;
  background: #ffffff;
}

.loading-circle {
  width: 80px;
  height: 80px;
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f7ff;
  margin-bottom: 20px;
}

.loading-circle .spinner-border {
  width: 3rem;
  height: 3rem;
}

.loading-title {
  font-weight: 700;
  margin-bottom: 10px;
  color: #222;
}

.loading-text {
  color: #777;
  font-size: 14px;
  margin-bottom: 0;
}

.modern-btn {
  background: linear-gradient(135deg, #4e73df, #224abe);
  border: none;
  border-radius: 12px;
  font-weight: 600;
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

.red-input {
  background-color: rgb(255, 145, 145) !important;
  color: rgb(0, 0, 0) !important;
}

.input-card {
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 15px;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  display: block;
}

.modern-input {
  height: 46px !important;
  border-radius: 10px !important;
  border: 1px solid #ddd !important;
}

.modern-input:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 0.15rem rgba(99, 102, 241, 0.15) !important;
}

.input-hint {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 6px;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

@media print {

  body {
    background: white !important;
  }

  .action-card,
  nav,
  footer,
  .main-menu,
  .header-navbar,
  .customizer-toggle {
    display: none !important;
  }

  .invoice-page {
    padding: 0 !important;
    background: white !important;
  }

  .invoice-card {
    box-shadow: none !important;
  }

  .table-wrapper {
    padding: 0 20px 20px 20px;
  }

  .invoice-table thead tr {
    background: #0b6eca !important;
    -webkit-print-color-adjust: exact;
  }

}
</style>