<template>
    <div>
        <b-card no-body>

            <div class="m-2">
                <b-row>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Select Vehicle">
                            <v-select v-model="filters['lorry_number']" label="label" :options="groups"
                                :reduce="item => item.id" class="custom-v-select" required @input="addSubItemData" />
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Lorry Number">
                            <b-form-input v-model="form.lorry_number" :state="lorry_number_status" required />
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Reciver Name">
                            <b-form-input v-model="form.user_name" :state="user_name_status" />
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <!-- Phone -->
                        <b-form-group label="Mobile Number" :invalid-feedback="phoneError">
                            <b-form-input v-model="form.phone_no" :state="phone_no_status" placeholder="94701234567"
                                @input="validatePhone" />
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Category" :invalid-feedback="phoneError">
                            <v-select v-model="form.category" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="statusOptions" :reduce="(statusOptions) => statusOptions.value"
                                class="invoice-filter-select" placeholder="Select category">
                            </v-select>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Expired Date">
                            <validation-provider #default="{ errors }" name="expired_date" rules="required">
                                <flat-pickr v-model="form.expired_date" class="form-control mb-2" :config="{
                                    minDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
                                }" />
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" lg="4">
                        <b-form-group label="Reminder Date" :invalid-feedback="reminderError">
                            <v-select v-model="form.reminder_date" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="datesOptions" :reduce="(datesOptions) => datesOptions.value"
                                class="invoice-filter-select" placeholder="Select category">
                            </v-select>
                        </b-form-group>
                    </b-col>
                    <b-col sm="8">
                        <div class="d-flex justify-content-end mt-2">
                            <b-button class="modern-btn" id="toggle-btn-price" 
                                @click="addSMS">
                                <span class="align-middle"> Add New SMS</span>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <!-- Table Top -->
                        <b-row>

                            <!-- Per Page -->
                            <b-col cols="12" md="5"
                                class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                                <label>Entries</label>
                                <v-select v-model="pagination.perPage"
                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="pageOptions"
                                    :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
                            </b-col>

                            <!-- Search -->
                            <b-col cols="12" md="7">
                                <div class="d-flex align-items-center justify-content-end">
                                    <b-form-input v-model="filters['name_or_email']" class="d-inline-block mr-1"
                                        placeholder="Search..." />

                                </div>
                            </b-col>
                        </b-row>

                        <b-row class="m-2">
                            <b-col cols="12">
                                <b-overlay :show="tableLoading" rounded="sm">
                                    <b-table ref="table" :current-page="currentPage" :fields="fields" :items="getUsers"
                                        :per-page="pagination.perPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                        :sort-direction="sortDirection" :filter="filter" :tbody-tr-class="rowClass"
                                        :filter-included-fields="filterOn" class="mobile_table_css" hover responsive
                                        style="min-height: 150px">
                                        <template #cell(lorry_number)="data">
                                            <b-media vertical-align="center">
                                                <b-row class="align-items-center">
                                                    <b-col cols="auto">
                                                        <feather-icon icon="TruckIcon" size="18"
                                                            class="mr-50 text-danger" />
                                                    </b-col>
                                                    <b-col>
                                                        <b-link class="font-weight-bold d-block text-nowrap">
                                                            {{ data.item.lorry_number }}
                                                        </b-link>
                                                    </b-col>
                                                </b-row>
                                            </b-media>
                                        </template>


                                        <template #cell(address)="data">
                                            <b-media vertical-align="center">
                                                <b-row class="align-items-center">
                                                    <b-col>
                                                        {{ data.item.full_name }}
                                                    </b-col>
                                                </b-row>
                                            </b-media>
                                        </template>

                                        <!-- Column: Actions -->
                                        <template #cell(actions)="data">
                                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                                variant="outline-danger" class="btn-icon mr-50">
                                                <feather-icon :id="`invoice-row-${data.item.id}-preview-icon`"
                                                    icon="TrashIcon" size="16" @click="deleteSms(data.item.id)" />
                                            </b-button>
                                        </template>


                                    </b-table>
                                </b-overlay>
                            </b-col>

                            <b-col cols="12">
                                <div v-if="pagination.totalRows == 0">
                                    <div class="d-flex flex-column align-items-center justify-content-center h-100">
                                        <div class="empty-state py-2">
                                            <img class="img-fluid " src="@/assets/images/pages/user-icon.png" alt=""
                                                width="100">
                                            <p class="txt-grey mt-1">No Sms Found</p>
                                        </div>
                                    </div>
                                </div>
                            </b-col>

                            <b-col class="
          d-flex
          align-items-center
          justify-content-center justify-content-sm-start
        " cols="12" sm="6">
                                <span v-if="pagination.totalRows !== 0" class="text-muted">Showing {{ pagination.from }}
                                    to {{
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
                    </b-col>
                </b-row>
            </div>
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
import driver from "@/apis/modules/driver";
import { avatarText } from '@core/utils/filter'
import flatPickr from 'vue-flatpickr-component'

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
        flatPickr,
    },
    directives: {
        Ripple,
    },
    setup() {
        const statusOptions = [
            { label: 'Insurance', value: 1 },
            { label: 'Revenue License', value: 2 },
            { label: 'Emission Test Certificate', value: 3 },
        ]

        const datesOptions = [
            { label: 'That day', value: 0 },
            { label: '1 day ago', value: 1 },
            { label: '3 days ago', value: 3 },
            { label: '7 days ago', value: 7 },
            { label: '15 days ago', value: 15 },
            { label: '30 days ago', value: 30 },
        ]

        return {
            statusOptions,
            datesOptions,
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

            owned: false,
            lorry_number: '',

            form: {
                lorry_number: '',
                user_name: '',
                phone_no: '',
                category: '',
                expired_date: '',
                reminder_date: '',
            },


            groups: [],

            submittedPriceNames: [],
            lorry_number_status: null,
            user_name_status: null,
            last_name_status: null,
            address_status: null,
            phone_no_status: null,

            phoneError: '',



            fields: [
                {
                    key: "lorry_number",
                    label: "number",
                    sortable: true,
                },
                {
                    key: "user_name",
                    label: "Reciver Name",
                    sortable: true,
                },
                {
                    key: "phone_no",
                    label: "mobile number",
                },
                {
                    key: "category",
                    label: "category",
                    sortable: true,
                },
                {
                    key: "expired_date",
                    label: "expired date",
                    sortable: true,
                },
                {
                    key: "schedule_time",
                    label: "remind date",
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
        filterQuery() {
            return Object.keys(this.filters)
                .filter(key => this.filters[key])
                .map(key => `${key}=${this.filters[key]}`)
                .join('&')
        },
        ...mapGetters(["currentUser"]),
    },
    methods: {
        rowClass(item) {
            if (!item?.schedule_time || !item?.expired_date) return '';

            const today = new Date().toISOString().split('T')[0];

            const schedule = item.schedule_time.split(' ')[0];
            const expired = item.expired_date.split(' ')[0];

            if (expired <= today) return 'row-green';
            if (schedule <= today) return 'row-orange';

            return '';
        },

        async groupData() {
            try {
                const response = await driver.lorrySmsData()
                this.groups = response.data.data

                // ✅ Add "Other" option
                this.groups.unshift({
                    id: 'other',
                    label: 'Other'
                })

            } catch (error) {
                console.error(error)
            }
        },

        async addSubItemData(value) {

            if (value === 'other' || value?.id === 'other') {
                this.isOtherSelected = true
                this.form.lorry_number = ''
                this.form.category = ''
                this.form.user_name = ''
                this.form.phone_no = ''
                this.form.expired_date = ''
                this.form.reminder_date = ''


                // clear filter
                this.filters['filter[name_or_email]'] = ""
            } else {
                this.form.lorry_number = ''
                this.form.category = ''
                this.form.user_name = ''
                this.form.phone_no = ''
                this.form.expired_date = ''
                this.form.reminder_date = ''

                try {
                    const response = await driver.getLorryDetails(value)

                    let phone = response.data.supplier.phone_no
                    if (phone && phone.startsWith('0')) {
                        phone = '94' + phone.substring(1)
                    }

                    this.form.lorry_number = response.data.lorry_number
                    this.form.user_name = response.data.supplier.supplier_name
                    this.form.phone_no = phone
                    this.form.expired_date = ''
                    this.form.reminder_date = ''

                } catch (error) {
                }

            }

            this.getUsers()
            // ✅ refresh table
            this.$refs.table.refresh()
        },

        clearForm() {
            this.form = {
                first_name: '',
                last_name: '',
                address: '',
                phone_no: '',
                category: '',
            };
        },

        resetModalPrice() {
            this.form = {};
        },

        validatePhone() {
            const phone = this.form.phone_no

            if (!/^94\d{9}$/.test(phone)) {
                this.phone_no_status = false
                this.phoneError = 'Enter valid number (947XXXXXXXX)'
            } else {
                this.phone_no_status = true
                this.phoneError = ''
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
                const Response = await driver.getSmss(
                    this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
                const dataArray = Response.data.data.map((x) => ({
                    id: x.id,
                    lorry_number: x.lorry_number,
                    user_name: x.user_name,
                    category: x.category,
                    expired_date: x.expired_date,
                    schedule_time: x.schedule_time?.split(' ')[0],
                    phone_no: x.phone_no ? x.phone_no : "N/A",
                    active_status: x.active_status,
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
                return dataArray
            } catch (error) {
                this.convertAndNotifyError(error);
                this.tableLoading = false;
            }
        },

        async deleteSms(id) {

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
                        await driver.smsDelete(id)
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


        async addSMS() {
            try {
                this.isLoading = true

                const payload = {
                    lorry_number: this.form.lorry_number,
                    user_name: this.form.user_name,
                    phone_no: this.form.phone_no,
                    category: this.form.category,
                    expired_date: this.form.expired_date,
                    reminder_date: this.form.reminder_date
                }

                await driver.smsCreate(payload)

                this.showSuccessMessage('Create SMS Successfully')
                this.form.lorry_number = ''
                this.form.user_name = ''
                this.form.phone_no = ''
                this.form.category = ''
                this.form.expired_date = ''
                this.form.reminder_date = ''
                this.filters['lorry_number'] = ' '
                this.$refs.table.refresh()

            } catch (error) {
                if (error.response?.data?.data?.code) {
                    this.showErrorMessage('The SMS has been already taken.')
                } else {
                    const errors = error.response?.data?.data;

                    if (errors && Object.keys(errors).length > 0) {
                        const firstError = Object.values(errors)[0][0];
                        this.showErrorMessage(firstError);
                    }
                }
            } finally {
                this.isLoading = false
            }
        },

    },

    mounted() {

        if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
            this.$router.push('/')
        }

        this.groupData()

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

.row-orange {
    background-color: #ffa50033 !important;
    /* light orange */
}

.row-green {
    background-color: #39ff2733 !important;
    /* light green */
}


@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>