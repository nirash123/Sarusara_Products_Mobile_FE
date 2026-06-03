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
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="7">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="filters['name_or_email']" class="d-inline-block modern-search mr-1"
                                placeholder="🔍 Search categories..." />
                            <b-button class="modern-btn single-line-text" variant="primary" id="toggle-btn-price"
                                v-b-modal.modal-prevent-closing-price>
                                <span class="align-middle"> Add</span>
                            </b-button>
                            <b-modal size="lg" id="modal-prevent-closing-price" centered ref="my-modal-price"
                                title="Add New Company Vehicle" ok-title="Submit" cancel-variant="outline-secondary"
                                @show="resetModalPrice" @hidden="resetModalPrice" @ok="handleOkPrice">
                                <form ref="form" @submit.stop.prevent="handleSubmitPrice">

                                    <!-- Lorry Number -->
                                    <b-form-group label="Vehicle Number">
                                        <b-form-input v-model="lorry_number" :state="lorry_number_status" required />
                                    </b-form-group>
                                    <b-form-group class="pb-5" label="Vehicle Type">
                                        <v-select v-model="status" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                            :options="statusOptions" :reduce="val => val.value" :clearable="false"
                                            input-id="user-status" :state="status_status" />
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


                            <template #cell(address)="data">
                                <b-media vertical-align="center">
                                    <b-row class="align-items-center">
                                        <b-col>
                                            <b-link class="font-weight-bold d-block text-nowrap">
                                                {{ data.item.full_name }}
                                            </b-link>
                                            <small>{{ data.item.address }}</small>
                                        </b-col>
                                    </b-row>
                                </b-media>
                            </template>
                            <template #cell(status)="data">
                                <b-badge v-if="data.item.status == '1'" class="ml-1" style="padding: 8px"
                                    variant="light-success">
                                    <span style="font-size: 20px;">♻️🚛</span> Collection Vehicle
                                </b-badge>
                                <b-badge v-if="data.item.status == '2'" class="ml-1" style="padding: 8px"
                                    variant="light-danger">
                                    <span style="font-size: 20px;">📦🚚 </span> Delivery Vehicle

                                </b-badge>
                                <b-badge v-if="data.item.status == '3'" class="ml-1" style="padding: 8px"
                                    variant="light-primary">
                                    <span style="font-size: 20px;">🔄🚛 </span> Dual-Operation Vehicle

                                </b-badge>
                                <b-badge v-if="data.item.status == '4'" class="ml-1" style="padding: 8px"
                                    variant="light-warning">
                                    <span style="font-size: 20px;">🚜 </span> Support Equipment Vehicle

                                </b-badge>
                            </template>

                            <template #cell(sms)="data">
                                <span class="ml-1">
                                    <b-form-checkbox disabled class="mt-50"
                                        :checked="data.item.insurance == 1"><b>Insurance </b>
                                    </b-form-checkbox>
                                    <b-form-checkbox disabled class="mt-50" :checked="data.item.licence == 1"><b>Revenue
                                            License </b>
                                    </b-form-checkbox>
                                    <b-form-checkbox disabled class="mt-50" :checked="data.item.green == 1"><b> Emission
                                            Test Certificate </b>
                                    </b-form-checkbox>
                                </span>
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
                                        <feather-icon icon="MoreVerticalIcon" size="16"
                                            class="align-middle text-body" />
                                    </template>
                                    <b-dropdown-item :to="{ name: 'view-lorry-details', params: { id: data.item.id } }">
                                        <feather-icon icon="FileTextIcon" />
                                        <span class="align-middle ml-50">Details</span>
                                    </b-dropdown-item>

                                    <b-dropdown-item :to="{ name: 'edit-lorry-details', params: { id: data.item.id } }">
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
import driver from "@/apis/modules/driver";
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
            status: '',



            submittedPriceNames: [],
            lorry_number_status: null,
            status_status: null,

            phoneError: '',



            fields: [
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
                {
                    key: "actions",
                    label: "actions",
                },


            ],
            items: [],
        };
    },
    setup() {
        const statusOptions = [
            { label: '♻️🚛 Collection Vehicle', value: 1 },
            { label: '📦🚚 Delivery Vehicle', value: 2 },
            { label: '🔄🚛 Dual-Operation Vehicle', value: 3 },
            { label: '🚜 Support Equipment Vehicle', value: 4 },
        ]


        return {
            statusOptions,
        }
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
        clearForm() {
            this.form = {
                first_name: '',
                last_name: '',
                address: '',
                phone_no: ''
            };
        },

        resetModalPrice() {
            this.owned = true;
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
                const Response = await driver.getCompanyLorrys(
                    this.filterQuery, this.currentPage, this.pagination.perPage, this.sortBy, this.sortDesc);
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
            this.status_status = !!this.status
            return valid
        },

        resetModalPrice() {
            this.lorry_number = ''
            this.status = ''

            this.lorry_number_status = null
            this.status_status = null
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
                    status: this.status,
                }

                await driver.lorryOwnCreate(payload)

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

    mounted() {

        if (JSON.parse(localStorage.getItem('userData')).admin_role !== 'TBSAdmin') {
            this.$router.push('/')
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