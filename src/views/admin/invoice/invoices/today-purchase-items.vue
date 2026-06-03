<template>
    <div>
        <section class="invoice-preview-wrapper">
            <b-row class="invoice-preview">
                <b-col cols="12" xl="9" md="8">
                    <b-card no-body class="invoice-actions">
                        <!-- Header -->
                        <b-card-body class="invoice-padding pb-0">
                            <b-row>
                                <b-col cols="6">

                                </b-col>
                                <b-col cols="6">
                                    <div class="d-flex justify-content-end mb-2 mr-1">
                                        <div class="invoice-date-wrapper">
                                            <div>
                                                <h4>
                                                    Date Issued:
                                                </h4>
                                            </div>
                                            <div>
                                                <h4 class="title text-truncate ml-1">
                                                    {{ formattedDate }}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card-body>

                        <b-row class="px-3">
                            <b-col class="newonegreen" cols="12">

                                <div v-for="product in dates" :key="product.id" class="px-2 mt-1">

                                    <div>
                                        <div class="d-flex justify-content-center">
                                            <b-img src="@/assets/images/logo/slogo.png" width="100" />
                                        </div>
                                        <h3 class="newonetext mb-25 d-flex justify-content-center">
                                            <div>Today Purchase Items Details Report</div>
                                        </h3>
                                        <h3 class="newonetext mb-25 d-flex justify-content-center">
                                            <div>අද දින ගැණුම් අයිතම විස්තර</div>
                                        </h3>

                                        <h4 class="newonetext mb-25 mt-50 d-flex justify-content-center">
                                            <div>( {{ product.date }} )</div>
                                        </h4>
                                    </div>
                                    <hr class="newonegreen" />
                                    <div>
                                        <b-row class="pt-25">
                                            <b-col cols="12" class="py-1 border-primary d-flex justify-content-center">
                                                <h4>මුළු එකතුව ( Rs: {{
                                                    (totalIncome).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                                        ",") }} )
                                                </h4>

                                            </b-col>
                                        </b-row>
                                    </div>
                                    <div class="pb-2 mt-2">
                                        <b-row class="border-primary rounded">
                                            <b-col cols="4" class="border-primary ">
                                                <h4 class="ml-2">අයිතමයෙ නම</h4>
                                            </b-col>
                                            <b-col cols="2" class="border-primary ">
                                                <h4>එකක මිල </h4>
                                            </b-col>
                                            <b-col cols="2" class="border-primary ">
                                                <h4> ප්‍රමාණය </h4>
                                            </b-col>
                                            <b-col cols="4" class="border-primary  d-flex justify-content-center">
                                                <h4> එකතුව </h4>
                                            </b-col>


                                        </b-row>
                                        <b-row>
                                            <b-col cols="12" class="pt-1 border-primary">
                                                <div v-for="income in incomes" :key="income.id">
                                                    <b-row v-if="income.date == product.date" class="px-2">
                                                        <b-col cols="4">
                                                            <h4>{{ income.items_item_name }} </h4>
                                                        </b-col>
                                                        <b-col cols="2" class="">
                                                            <h4 class="d-flex justify-content-center"> {{
                                                                (income.quentity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                                                    ",") }} </h4>
                                                        </b-col>
                                                        <b-col cols="2">
                                                            <h4 class="d-flex justify-content-center"> {{
                                                                income.old_quentity }} Kg </h4>
                                                        </b-col>
                                                        <b-col cols="4">
                                                            <div class="d-flex justify-content-end">
                                                                <h4> Rs: {{
                                                                    (income.income_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                                                        ",") }} </h4>
                                                            </div>
                                                        </b-col>
                                                    </b-row>
                                                    <hr class="newonegreen" />
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <!-- Right Col: Card -->
                <b-col cols="12" md="4" xl="3" class="invoice-actions">
                    <b-card>
                        <b-form-group>
                            <h4 class="my-2">Select Category :</h4>

                            <v-select id="group-input" v-model="category"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="category_name"
                                :options="groups" class="custom-v-select" required />
                        </b-form-group>
                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="primary" class="mb-75 mt-2" block
                            @click="categoryAdd">
                            View
                        </b-button>

                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="primary" class="mb-75 mt-2" block
                            @click="printInvoice">
                            Print
                        </b-button>
                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="danger" class="mb-75 mt-2" block
                            @click="$router.push('/invoice')">
                            Cancel
                        </b-button>
                    </b-card>
                </b-col>
            </b-row>
            <div class="d-md-none d-lg-none">
                <!-- <div class=""> -->

                <b-row>
                    <b-col class="newonegreen" cols="12">

                        <div v-for="product in dates" :key="product.id" class="px-2 mt-1">

                            <div>
                                <div class="d-flex justify-content-center">
                                    <b-img src="@/assets/images/logo/slogo.png" width="100" />
                                </div>
                                <h3 class="newonetext mb-25 d-flex justify-content-center">
                                    <div>Today Purchase Items Details Report</div>
                                </h3>
                                <h3 class="newonetext mb-25 d-flex justify-content-center">
                                    <div>අද දින ගැණුම් අයිතම විස්තර</div>
                                </h3>

                                <h4 class="newonetext mb-25 mt-50 d-flex justify-content-center">
                                    <div>( {{ product.date }} )</div>
                                </h4>
                            </div>
                            <hr class="newonegreen" />
                            <div>
                                <b-row class="pt-25">
                                    <b-col cols="12" class="py-1 border-primary d-flex justify-content-center">
                                        <h4>මුළු එකතුව ( Rs: {{
                                            (totalIncome).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                            ) </h4>

                                    </b-col>
                                </b-row>
                            </div>
                            <div class="pb-2 mt-2">
                                <b-row class="border-primary rounded">
                                    <b-col cols="4" class="border-primary ">
                                        <h4 class="ml-2">අයිතමයෙ නම</h4>
                                    </b-col>
                                    <b-col cols="2" class="border-primary ">
                                        <h4>එකක මිල </h4>
                                    </b-col>
                                    <b-col cols="2" class="border-primary ">
                                        <h4> ප්‍රමාණය </h4>
                                    </b-col>
                                    <b-col cols="4" class="border-primary  d-flex justify-content-center">
                                        <h4> එකතුව </h4>
                                    </b-col>


                                </b-row>
                                <b-row>
                                    <b-col cols="12" class="pt-1 border-primary">
                                        <div v-for="income in incomes" :key="income.id">
                                            <b-row v-if="income.date == product.date" class="px-2">
                                                <b-col cols="4">
                                                    <h4>{{ income.items_item_name }} </h4>
                                                </b-col>
                                                <b-col cols="2" class="">
                                                    <h4 class="d-flex justify-content-center"> {{
                                                        (income.quentity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                                            ",") }} </h4>
                                                </b-col>
                                                <b-col cols="2">
                                                    <h4 class="d-flex justify-content-center"> {{ income.old_quentity }}
                                                        Kg </h4>
                                                </b-col>
                                                <b-col cols="4">
                                                    <div class="d-flex justify-content-end">
                                                        <h4> Rs: {{
                                                            (income.income_total).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                                                ",") }} </h4>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <hr class="newonegreen" />
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-col>
                </b-row>

                <div class="d-flex justify-content-end mt-1 mb-1 mr-2">
                    <h4>
                        <i> Software By @ Easyones Soft - 076 283 38 38 </i>
                    </h4>
                </div>
            </div>
        </section>
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
    BCardBody,
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
    BCardText,
    BImg,
    BTableLite,
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
import product from "@/apis/modules/product";
import invoice from "@/apis/modules/invoice";
import flatPickr from 'vue-flatpickr-component'

export default {
    components: {
        BTableLite,
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
        BCardBody,
        BListGroupItem,
        vSelect,
        flatPickr,
        BCard,
        BModal,
        VBModal,
        BCardText,
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
        BImg,
    },
    directives: {
        Ripple,
    },

    mixins: [ErrorMessages, SuccessMessage, MomentMixin, Filter],
    data() {
        return {
            category: null,
            groups: [],
            dates: {},
            incomes: {},
            totalIncome: 0,
            totalOldIncome: 0,
            admin_setting: 0,
            rangeDate: null,
            start_date: null,
            end_date: null,
            userData: JSON.parse(localStorage.getItem('userData')),
            today: new Date().toISOString().slice(0, 10),
            date: new Date(),

            date_payments: [],
            date_payments_length: 0,

        };
    },
    watch: {
        filterQueryUpdate() {
            this.$refs.table.refresh();
        },
    },
    computed: {
        ...mapGetters(["currentUser"]),

        formattedDate() {
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            };
            return this.date.toLocaleString("en-US", options);
        },

    },
    methods: {

        async categoryeData() {
            try {
                const response = await product.shopCategoryData()
                this.groups = response.data.data

            } catch (error) {

            }
        },

        callparentfunction() {
            this.$parent.$parent.$parent.sendInvitation();
        },

        async userDetails() {
            try {
                const response = await admin.getCustomerRateDetails()
                this.admin_setting = response.data.data.admin_setting
            } catch (error) {
            }
        },


        async categoryAdd() {
            try {
                this.payload = {
                    category: this.category.id,
                }
                const status = await invoice.getTodayPurchaseItemsDetailInvoices(this.payload);
                this.dates = status.data.date
                this.incomes = status.data.income
                this.totalIncome = status.data.total_income
                this.totalOldIncome = status.data.total_old_income
            } catch (error) {
            }
        },

        async add() {
            try {
                const status = await invoice.getTodayPurchaseAllItemsDetailInvoices();
                this.dates = status.data.date
                this.incomes = status.data.income
                this.totalIncome = status.data.total_income
                this.totalOldIncome = status.data.total_old_income
            } catch (error) {
            }
        },




    },
    setup() {
        const printInvoice = () => {
            window.print()
        }
        return {
            printInvoice,
        }
    },
    async mounted() {
        if (JSON.parse(localStorage.getItem('userData')).admin_role == 'TBSAdmin') {
            this.add()
            this.categoryeData()
            this.userDetails()
        }
        else {
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

.image-container {
    position: relative;
}

.display-4-5 {
    font-size: 2.8rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-5-5 {
    font-size: 2.2rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-red {
    font-size: 1.3rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #ff0000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-name {
    font-size: 1.3 rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-1 {
    font-size: 1.1rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-2 {
    font-size: 1.2rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the margin as needed */
}

.display-new-3 {
    font-size: 1.1rem;
    color: #000000;
    /* Adjust the margin as needed */
}

.display-new-9 {
    font-size: 1.3rem;
    color: #000000;
    /* Adjust the margin as needed */
}

.display-new-4 {
    font-size: 0.84rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-5 {
    font-size: 2.0rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-6 {
    font-size: 2.0rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.display-new-7 {
    font-size: 1.5rem;
    /* Adjust the font size as needed */
    font-weight: bold;
    color: #000000;
    /* Adjust the color as needed */
    margin-bottom: 0.625rem;
    /* Adjust the margin as needed */
}

.custom-dashed-border {
    border: none;
    /* Remove the default border */
    border-top: 1px dashed;
    /* Create a dashed border at the top */
    color: black;
    /* Set the color of the dash (you can change this) */
    height: 1px;
    /* Set the height of the hr */
}

.custom-border {
    border: 1px solid #090909;
    /* Adjust color as needed */
}

.custom-border-5 {
    border: 1px solid #090909;
    /* Adjust color as needed */
}

.custom-image {
    width: 100%;
    height: 160px;
    border-radius: 10px;
}

.text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(251, 17, 17);
    /* Text color */
    font-size: 35px;
    /* Text font size */
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

.newonegreen {
    border: 1px solid #0b6eca;
    margin: 20px 0;
}
</style>

<style>
/* Define background colors for different columns */
.blue {
    background-color: #cadfff;
    /* Light gray */
}

.newred {
    background-color: #ffa4a0;
    /* Lighter blue */
}

.purple {
    background-color: #f5cbf7;
    /* Light purple */
}

.red {
    background-color: #f8cecc;
    /* Light red */
}

.yellow {
    background-color: #fff2cc;
    /* Light yellow */
}

.green {
    background-color: #95f371;
    /* Lighter gray */
}
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {


    // Global Styles
    body {
        background-color: transparent !important;
    }

    nav.header-navbar {
        display: none;
    }

    .main-menu {
        display: none;
    }

    .header-navbar-shadow {
        display: none !important;
    }

    .content.app-content {
        margin-left: 0;
        padding-top: 2rem !important;
    }

    footer.footer {
        display: none;
    }

    .card {
        background-color: transparent;
        box-shadow: none;
    }

    .customizer-toggle {
        display: none !important;
    }

    // Invoice Specific Styles
    .invoice-preview-wrapper {
        .row.invoice-preview {
            .col-md-8 {
                max-width: 100%;
                flex-grow: 1;
            }

            .invoice-preview-card {
                .card-body:nth-of-type(2) {
                    .row {
                        >.col-12 {
                            max-width: 50% !important;
                        }

                        .col-12:nth-child(2) {
                            display: flex;
                            align-items: flex-start;
                            justify-content: flex-end;
                            margin-top: 0 !important;
                        }
                    }
                }
            }
        }

        // Action Right Col
        .invoice-actions {
            display: none;
        }
    }
}
</style>

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

h4.newonetext {
    color: #0b6eca;
}

h5.newonetext {
    color: #0357a5;
}


.banner {
    background-color: #0b6eca;
}

h3.newonetext {
    color: #0b6eca;
}


.newonegreen {
    border: 1px solid #0b6eca;
    margin: 10px 0;
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
