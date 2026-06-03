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
                            :options="pageOptions" :clearable="false"
                            class="per-page-selector d-inline-block ml-50 mr-1" />

                        <v-select v-model="filters['month']" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="months" :reduce="item => item.month" label="month" class="invoice-filter-select"
                            placeholder="Select Month">
                            {{ filters['month'] }}
                        </v-select>
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="7">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="filters['name_or_email']" class="d-inline-block modern-search mr-1"
                                placeholder="🔍 Search categories..." />
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

                            <template :to="{ name: 'view-staff-paysheet-details', params: { id: data.item.user_id } }" #cell(user_name)="data">
                                <b-media vertical-align="center">
                                    <b-row class="align-items-center">
                                        <b-col cols="auto">
                                            <b-avatar size="40" :src="imageUrl + data.item.image"
                                                :to="{ name: 'view-staff-paysheet-details', params: { id: data.item.user_id } }" />
                                        </b-col>
                                        <b-col>
                                            <b-link
                                                class="font-weight-bold d-block text-nowrap">
                                                {{ data.item.full_name }}
                                            </b-link>
                                            <small>{{ data.item.user_code }} @{{ data.item.user_name }}</small>
                                        </b-col>
                                    </b-row>
                                </b-media>
                            </template>
                            
                            <template :to="{ name: 'view-staff-paysheet-details', params: { id: data.item.user_id } }" #cell(address)="data">
                                <b-media vertical-align="center">
                                    <b-row class="align-items-center">
                                        <b-col>
                                                {{ data.item.address }}
                                                <div>
                                                    {{ data.item.phone_no }}
                                                </div>
                                        </b-col>
                                    </b-row>
                                </b-media>
                            </template>

                            <template :to="{ name: 'view-staff-paysheet-details', params: { id: data.item.user_id } }" #cell(admin_role)="data">
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

                            <template :to="{ name: 'view-staff-paysheet-details', params: { id: data.item.user_id } }" #cell(status)="data">
                                
                                <b-badge v-if="data.item.status == '0'" class="ml-1" style="padding: 8px"
                                    variant="light-secondary">
                                   Draft
                                </b-badge>
                                <b-badge v-if="data.item.status == '3'" class="ml-1" style="padding: 8px"
                                    variant="light-success">
                                    Paid
                                </b-badge>
                                <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px"
                                    variant="light-warning">
                                    Pending
                                </b-badge>
                                <b-badge v-if="data.item.status == '4'" class="ml-1" style="padding: 8px"
                                    variant="light-danger">
                                    Cancelled
                                </b-badge>
                                <b-badge v-if="data.item.status == '5'" class="ml-1" style="padding: 8px"
                                    variant="light-primary">
                                    Done
                                </b-badge>
                            </template>

                        </b-table>
                    </b-overlay>
                </b-col>

                <b-col cols="12">
                    <div v-if="pagination.totalRows == 0">
                        <div class="d-flex flex-column align-items-center justify-content-center h-100">
                            <div class="empty-state py-2">
                                <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt="" width="100">
                                <p class="txt-grey mt-1">No Records</p>
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
                    <b-pagination v-model="currentPage" :per-page="pagination.perPage"
                        :total-rows="pagination.totalRows" first-number last-number next-class="next-item"
                        prev-class="prev-item" class="pagination-primary">
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
import admin from "@/apis/modules/admin";
import attendence from "@/apis/modules/attendence";
import { avatarText } from '@core/utils/filter'

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
            months: [],
            imageUrl: process.env.VUE_APP_IMAGE_URL,
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
                    key: "admin_role",
                    label: "role",
                    sortable: true,
                },
                 {
                    key: "net_amount",
                    label: "net amount",
                },
                {
                    key: "status",
                    label: "status",
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
                const Response = await attendence.getSalaryPaysheets(
                    this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
                const dataArray = Response.data.data.map((x) => ({
                    id: x.paysheet_id,
                    paysheet_no: x.paysheet_no,
                    user_id: x.user_id,
                    user_code: x.user_code,
                    user_name: x.user_name,
                    full_name: x.first_name + ' ' + x.last_name,
                    address: x.address ? x.address : "N/A",
                    phone_no: x.phone_no ? x.phone_no : "N/A",
                    admin_role: x.admin_role,
                    status: x.status,
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

        async monthData() {
            try {
                const response = await admin.monthData()
                this.months = response.data.data
                this.year = this.years[this.years.length - 1].year;
            } catch (error) {
            }
        },


    },

    mounted() {

        if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
            this.$router.push('/')
        } else {
            this.monthData();
        }

    },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";


.swal2-popup {
    border-radius: 16px !important;
    padding: 22px !important;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    font-family: inherit;
}

/* Title */
.swal2-title {
    font-size: 18px !important;
    font-weight: 700 !important;
    color: #2c3e50;
}

/* Text */
.swal2-html-container {
    font-size: 14px !important;
    color: #6c757d;
}

/* Confirm (Delete) button */
.swal2-popup .btn-primary {
    background: linear-gradient(135deg, #4e73df, #224abe);
    border-radius: 10px !important;
    font-weight: 600;
    padding: 8px 16px;
    transition: 0.25s ease;
}

.swal2-popup .btn-primary:hover {
    background: #bb2d3b !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(220, 53, 69, 0.25);
}

/* Cancel button */
.swal2-popup .btn-outline-danger {
    border-radius: 10px !important;
    font-weight: 600;
    padding: 8px 16px;
    color: #dc3545 !important;
    border: 1px solid #dc3545 !important;
    background: transparent !important;
    transition: 0.25s ease;
}

.swal2-popup .btn-outline-danger:hover {
    background: #dc3545 !important;
    color: #fff !important;
    transform: translateY(-1px);
}

/* Optional icon animation */
.swal2-icon.swal2-warning {
    border-color: #ffc107 !important;
    color: #ffc107 !important;
}

/* Modal content polish */
.modal-content {
    border-radius: 14px;
    overflow: hidden;
}

.modal-header {
    background: linear-gradient(135deg, #ffffff, #7c8cff);
    color: white;
    font-weight: 600;
}

.modal-footer {
    border-top: 1px solid #f1f1f1;
}

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