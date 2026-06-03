<template>
  <div>
    <b-card class="p-0">
      <div class="my-1">
        <div class="d-flex justify-content-center mb-2">
          <h2><b>PENDING PAYMENTS</b></h2>
        </div>

        <!-- Per Page -->
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
            </div>
          </b-col>
        </b-row>
        <b-row>

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
            <b-table ref="table" :current-page="currentPage" :fields="fields" :items="payment_carts"
              :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection" :filter="filter" :filter-included-fields="filterOn"
              class="mobile_table_css" hover responsive style="min-height: 150px">

              <template #cell(users_user_name)="data">
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


              <template #cell(attendance)="data">

                <div class="d-flex flex-column">

                  <div>
                    IN :
                    <strong class="text-success">
                      {{ data.item.check_in_time }}
                    </strong>
                  </div>

                  <div>
                    OUT :
                    <strong class="text-danger">
                      {{ data.item.check_out_time }}
                    </strong>
                  </div>

                  <div>
                    DATE :
                    <strong>
                      {{ data.item.date }}
                    </strong>
                  </div>

                </div>

              </template>

              <template #cell(working)="data">

                <div class="d-flex flex-column">

                  <b-badge variant="light-primary" class="mb-50">
                    <h5><strong>
                        Total :
                        {{ data.item.work_time }} </strong>
                    </h5>
                  </b-badge>

                  <b-badge variant="light-warning" class="mb-50">
                    <h5><strong>
                        Free :
                        {{ data.item.total_time }} </strong></h5>
                  </b-badge>

                  <b-badge variant="light-success">
                    <h5><strong>
                        Final :
                        {{ data.item.final_time_period }} H </strong></h5>
                  </b-badge>

                </div>

              </template>

              <template #cell(payment_summary)="data">
                <div class="payment-card">

                  <div class="payment-item">
                    <span>Shift</span>
                    <strong class="text-primary">
                      Rs. {{ data.item.na_shift }}
                    </strong>
                  </div>

                  <div class="payment-item">
                    <span>OT</span>
                    <strong class="text-success">
                      Rs. {{ data.item.nb_shift }}
                    </strong>
                  </div>

                  <div class="payment-item">
                    <span>Free</span>
                    <strong class="text-danger">
                      Rs. {{ data.item.nc_shift }}
                    </strong>
                  </div>

                  <hr class="my-50">

                  <div class="payment-item total-payment">
                    <span>Total</span>

                    <strong>
                      Rs. {{ data.item.payment }}
                    </strong>
                  </div>

                </div>

              </template>

              <!-- Column: Actions -->
              <template #cell(actions)="data">
                <div v-if="data.item.status === 2">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-primary" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="CheckIcon" size="16"
                      @click="submitUser(data.item.id)" />
                  </b-button>
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger" class="btn-icon mr-50">
                    <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`" icon="EditIcon" size="16"
                      @click="editOrder(data.item.id)" />
                  </b-button>
                </div>
                <div v-else>

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
      payment_carts: [],
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
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString().split('T')[0],
      },

      fields: [
        {
          key: "users_user_name",
          label: "Employee",
          sortable: true,
        },
        {
          key: "attendance",
          label: "Attendance",
        },
        {
          key: "working",
          label: "Working Hours",
        },
        {
          key: "payment_summary",
          label: "Payment Summary",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],

      items: [],
    };
  },
  watch: {
    'filters.name_or_email': function () {
      this.currentPage = 1;
      this.getUsers();
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {

    changeDate() {
      this.currentPage = 1; // important for pagination reset

      this.getUsers();
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

      this.user_code = '';

      try {
        this.isLoading = true;

        const response = await attendence.attendenceCreate(ucode);
        this.staff_carts = response.data.data;

        // 🔊 SUCCESS BEEP HERE


        if (response.data.success === true) {
          this.playSuccessBeep();

          this.showSuccessMessage(response.data.message);
          this.message = response.data.message;

          await this.getUsers();

        } else {
          this.playErrorBeep();

          this.showErrorMessage('Something went wrong');

          await this.getUsers();
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

        const params = {
          page: this.currentPage,
          paginate: this.pagination.perPage,
          sort: this.sortDesc ? `-${this.sortBy}` : this.sortBy,
        };

        // ✅ add search properly
        if (this.filters.name_or_email) {
          params['filter[name_or_email]'] = this.filters.name_or_email;
        }

        const Response = await attendence.getPendingPayments(params);

        const dataArray = Response.data.data.map((x) => ({
          id: x.id,
          user_code: x.users_user_code,
          users_user_name: x.users_user_name,
          full_name: x.users_first_name + ' ' + x.users_last_name,
          check_in_time: x.check_in_time ? x.check_in_time : "00:00",
          check_out_time: x.check_out_time ? x.check_out_time : "00:00",
          time_period: x.time_period ? x.time_period : "00:00",
          free_time: x.free_time,
          extra_time: x.extra_time ?? 0,
          total_time: x.total_time ? this.formatMinutesToHHMM(x.total_time) : "00:00",
          work_time: x.work_time ? this.formatMinutesToHHMM(x.work_time) : "00:00",
          work_time_period: x.work_time_period ? this.formatMinutesToHHMM(x.work_time_period) : "00:00",
          final_time_period: x.final_time_period,
          image: x.users_user_image,
          admin_role: x.admin_role,
          status: x.status,
          date: x.date,
          a_shift: x.a_shift,
          b_shift: x.b_shift,
          c_shift: x.c_shift,
          na_shift: x.na_shift,
          nb_shift: x.nb_shift,
          nc_shift: x.nc_shift,
          payment: x.payment,
        }));

        this.payment_carts = dataArray;

        this.pagination.totalRows = Response.data.total;
        this.currentPage = Response.data.current_page;

      } catch (error) {
        this.convertAndNotifyError(error);
      } finally {
        this.tableLoading = false;
      }
    },

    async editOrder(id) {
      try {
        this.tableLoading = true
        this.$swal({
          title: 'Are you sure you want to re open this payment?',
          text: '',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Yes, re open',
          cancelButtonText: 'No, go back',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async result => {
          if (result.value) {
            await attendence.attendencePastEdit(id)
            this.showSuccessMessage('Payment has been re opened')
            await this.getUsers();
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
            await attendence.paymentPastSubmit(id)
            this.showSuccessMessage('Attendence has been submitted')
            await this.getUsers();
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


  },

  mounted() {

    if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
      this.$router.push('/')
    } else {
      this.getUsers()
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
</style>