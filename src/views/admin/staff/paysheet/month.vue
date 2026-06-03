<template>
    <div>
        <section class="invoice-preview-wrapper">
            <b-row class="invoice-preview">
                <b-col cols="12" xl="9" md="8">
                    <b-card no-body class="invoice-actions">
                        <div class="">
                            <div class="payslip-container">

                                <!-- Employee Details -->
                                <div class="details-section mt-2">
                                    <div class="left-details">
                                        <h4 class="display-new-9">Employee :</h4>
                                        <h5 class="display-new-9 font-weight-bolder">Nirashra Aththanayaka</h5>
                                        <h5 class="display-new-9 font-weight-bolder">No 24, Rathmalikadura, Siripura,
                                            Dehiattakandiya</h5>
                                        <h5 class="display-new-9 font-weight-bolder">072 37 12 485</h5>
                                    </div>

                                    <div class="right-details">
                                        <h4 class="display-new-9">Invoice :</h4>
                                        <h5 class="display-new-9 font-weight-bolder"><strong>Month:</strong> May 2026
                                        </h5>
                                        <h5 class="display-new-9 font-weight-bolder"><strong>Work Days:</strong> 26</h5>
                                    </div>
                                </div>

                                <!-- Earnings Table -->
                                <table class="salary-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <h5 class="display-new-9 font-weight-bolder">Earnings</h5>
                                            </th>
                                            <th>
                                                <h5 class="display-new-9 font-weight-bolder">Amount</h5>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Basic Salary</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">32,000.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Incentive Pay</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">0.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Overtime</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">0.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Allowance</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">3,000.00</h5>
                                            </td>
                                        </tr>

                                        <tr class="total-row">
                                            <td>
                                                <h5 class="display-new-91 font-weight-bolder">Total Gross Salary</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91 font-weight-bolder">35,000.00</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <!-- Deductions Table -->
                                <table class="salary-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <h5 class="display-new-9 font-weight-bolder">Deductions</h5>
                                            </th>
                                            <th>
                                                <h5 class="display-new-9 font-weight-bolder">Amount</h5>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">EPF Contribution</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">3,500.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">PAYE</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">0.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Salary Advance</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">2,800.00</h5>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <h5 class="display-new-91">Loan Deduction</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91">1,000.00</h5>
                                            </td>
                                        </tr>

                                        <tr class="total-row">
                                            <td>
                                                <h5 class="display-new-91 font-weight-bolder">Total Deductions</h5>
                                            </td>
                                            <td>
                                                <h5 class="display-new-91 font-weight-bolder">6,500.00</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <!-- Net Salary -->
                                <div class="net-pay">
                                    <span>Net Pay</span>
                                    <span>28,500.00</span>
                                </div>
                            </div>
                        </div>
                    </b-card>
                </b-col>

                <!-- Right Col: Card -->
                <b-col cols="12" md="4" xl="3" class="invoice-actions">
                    <b-card>
                        <b-form-group>
                            <h5 class="my-2">Select Staff Member :</h5>
                            <v-select id="group-input" v-model="user_id"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="user_name" :options="groups"
                                class="custom-v-select" required />
                        </b-form-group>
                        <b-form-group>
                            <h5 class="my-2">Select Date Range :</h5>
                            <flat-pickr v-model="rangeDate" class="form-control mb-2" :config="{
                                mode: 'range',
                                maxDate: new Date().toISOString().split('T')[0]
                            }" />
                        </b-form-group>

                        <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="primary" class="mb-75 mt-2" block
                            @click="dateAdd">
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
            <!-- <div class="d-md-none d-lg-none"> -->
            <div class="">
                <div class="payslip-container">
                    <!-- Header -->
                    <b-row>
                        <b-col cols="7">
                            <h1 class="mt-50 d-flex">
                                <b-img class="mt-2" src="@/assets/images/logo/logo2.png" height="100" />

                                <span class="company-details mt-1 ml-2">
                                    <h2 class="display-new-9 font-weight-bolde">T B S Sarusara Products</h2>
                                    <div>
                                        <h5 class="mt-50 display-new-9  font-weight-bolder ">
                                            <!-- <b-img class="mr-50" src="@/assets/images/logo/loca.png" width="30" height="30" /> <span> -->
                                            <i> No 123, Nagaswewa, Dehiattakandiya </i>
                                        </h5>
                                        <h5 class="display-new-9  font-weight-bolder my-50">
                                            <i> 071 30 63 925 / 071 730 53 55 </i>
                                        </h5>
                                    </div>
                                </span>
                            </h1>
                        </b-col>
                        <b-col cols="5">

                            <vue-barcode class="mt-1 d-flex justify-content-end barcode" :value="PS - 202605000001"
                                :format="format" :height="55" :display-value="false" />
                            <div>
                                <!-- <h6 class="d-flex justify-content-end display-new-81">Invoice Note
                                </h6> -->
                            </div>
                        </b-col>
                    </b-row>

                    <!-- Employee Details -->
                    <div class="details-section mt-2">
                        <div class="left-details">
                            <h4 class="display-new-9">Employee :</h4>
                            <h5 class="display-new-9 font-weight-bolder">Nirashra Aththanayaka</h5>
                            <h5 class="display-new-9 font-weight-bolder">No 24, Rathmalikadura, Siripura,
                                Dehiattakandiya</h5>
                            <h5 class="display-new-9 font-weight-bolder">072 37 12 485</h5>
                        </div>

                        <div class="right-details">
                            <h4 class="display-new-9">Invoice :</h4>
                            <h5 class="display-new-9 font-weight-bolder"><strong>Month:</strong> May 2026</h5>
                            <h5 class="display-new-9 font-weight-bolder"><strong>Work Days:</strong> 26</h5>
                        </div>
                    </div>

                    <!-- Earnings Table -->
                    <table class="salary-table">
                        <thead>
                            <tr>
                                <th>
                                    <h5 class="display-new-9 font-weight-bolder">Earnings</h5>
                                </th>
                                <th>
                                    <h5 class="display-new-9 font-weight-bolder">Amount</h5>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <h5 class="display-new-91">Basic Salary</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">32,000.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">Incentive Pay</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">0.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">Overtime</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">0.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">Allowance</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">3,000.00</h5>
                                </td>
                            </tr>

                            <tr class="total-row">
                                <td>
                                    <h5 class="display-new-91 font-weight-bolder">Total Gross Salary</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91 font-weight-bolder">35,000.00</h5>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Deductions Table -->
                    <table class="salary-table">
                        <thead>
                            <tr>
                                <th>
                                    <h5 class="display-new-9 font-weight-bolder">Deductions</h5>
                                </th>
                                <th>
                                    <h5 class="display-new-9 font-weight-bolder">Amount</h5>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <h5 class="display-new-91">EPF Contribution</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">3,500.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">PAYE</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">0.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">Salary Advance</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">2,800.00</h5>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h5 class="display-new-91">Loan Deduction</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91">1,000.00</h5>
                                </td>
                            </tr>

                            <tr class="total-row">
                                <td>
                                    <h5 class="display-new-91 font-weight-bolder">Total Deductions</h5>
                                </td>
                                <td>
                                    <h5 class="display-new-91 font-weight-bolder">6,500.00</h5>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Net Salary -->
                    <div class="net-pay">
                        <span>Net Pay</span>
                        <span>28,500.00</span>
                    </div>

                    <!-- Signatures -->
                    <div class="signature-section">
                        <div class="signature-box">
                            <div class="line"></div>
                            <h5 class="display-new-91 font-weight-bolder">Manager Signature</h5>
                        </div>

                        <div class="signature-box">
                            <div class="line"></div>
                            <h5 class="display-new-91 font-weight-bolder">Employee Signature</h5>
                        </div>
                    </div>

                    <!-- Thank You Footer -->
                    <div class="thank-you-section">
                        <div class="line"></div>

                        <p class="thank-you-text">
                            Thank you for your dedication and hard work!
                        </p>

                        <div class="line"></div>
                    </div>
                    <!-- System Footer -->
                    <div class="system-footer">
                        <p class="generated-text">
                            This is a computer generated salary slip
                        </p>

                        <p class="software-text">
                            Software By
                            <span class="brand-name">@ Easyones Soft</span>
                            |
                            www.easyonessoft.com
                            |
                            Call / Whatsapp : 076 283 38 38
                        </p>
                    </div>
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
import invoice from "@/apis/modules/invoice";
import flatPickr from 'vue-flatpickr-component'
import VueBarcode from 'vue-barcode';

export default {
    components: {
        VueBarcode,
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
            user_id: '',
            groups: [],
            users: {},
            dates: {},
            staff_dates: {},
            incomes: {},
            expenditure: {},
            totalIncome: 0,
            totalExpenditure: 0,
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

        async userNameData() {
            try {
                const response = await admin.userData()
                this.groups = response.data.data

            } catch (error) {
                this.showErrorMessage('Please run server first.')
            }
        },

        callparentfunction() {
            this.$parent.$parent.$parent.sendInvitation();
        },


        async dateAdd() {
            const [startDate, endDate] = this.rangeDate.split(' to ');
            let startDateObj = new Date(startDate);
            let endDateObj = new Date(endDate);
            let formattedStartDate = startDateObj.toISOString().split('T')[0];
            let formattedEndDate = endDateObj.toISOString().split('T')[0];
            try {
                this.payload = {
                    user_id: this.user_id,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }
                const status = await invoice.getStaffDetailInvoices(this.payload);
                this.users = status.data.user
                this.dates = status.data.date
                this.staff_dates = status.data.staff_date
                this.incomes = status.data.income
                this.expenditures = status.data.expenditure,
                    this.getTotalPrice()
                this.getTotalOutPrice()
            } catch (error) {
            }
        },

        async getTotalPrice() {
            try {
                this.totalIncome = this.staff_dates
                    .map(income => parseFloat(income.income))
                    .reduce((total, income) => total + income, 0);
            } catch (error) {
                console.error("Error calculating total income:", error);
            }
        },

        async getTotalOutPrice() {
            try {
                this.totalExpenditure = this.staff_dates
                    .map(expenditure => parseFloat(expenditure.expenditure))
                    .reduce((total, expenditure) => total + expenditure, 0);
            } catch (error) {
                console.error("Error calculating total expenditure:", error);
            }
        }


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
            this.userNameData()
        }
        else {
            this.$router.push('/')
        }
    },
};
</script>

<style scoped>
.payslip-container {
    margin: auto;
    padding: 30px;
    font-family: Arial, sans-serif;
    color: #000;
}

.header {
    text-align: center;
    margin-bottom: 25px;
}

.logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.company-logo {
    object-fit: contain;
}

.company-details h2 {
    margin: 0;
    font-size: 28px;
    font-weight: bold;
}

.company-details h4 {
    margin: 5px 0;
    font-size: 18px;
}

.company-details p {
    margin: 2px 0;
    font-size: 14px;
}

.details-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.details-section h5 {
    margin-bottom: 10px;
    font-size: 16px;
}

.details-section p {
    margin: 3px 0;
}

.salary-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 25px;
}

.salary-table th,
.salary-table td {
    border: 1px solid #000;
    padding: 12px;
    font-size: 14px;
}

.salary-table th {
    background: #f5f5f5;
    text-align: left;
}

.salary-table td:last-child {
    text-align: right;
}

.total-row {
    font-weight: bold;
    background: #fafafa;
}

.net-pay {
    display: flex;
    justify-content: space-between;
    border: 2px solid #000;
    padding: 15px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 60px;
}

.signature-section {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;
}

.signature-box {
    width: 250px;
    text-align: center;
}

.line {
    border-top: 1px dashed #000;
    margin-bottom: 8px;
}
</style>
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

.thank-you-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 15px;
}

.line {
    flex: 1;
    height: 1px;
    background: #000000;
}

.thank-you-text {
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    font-style: italic;
    white-space: nowrap;
}

.thank-you-text {
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    font-style: italic;
    letter-spacing: 0.5px;
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
    font-size: 1.5rem;
    color: #000000;
    /* Adjust the margin as needed */
}

.display-new-91 {
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


.display-new-81 {
    font-size: 1.8rem;
    font-weight: 900;
    color: #000000;
    margin-bottom: 0.625rem;
    -webkit-text-stroke: 1px black;
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

.system-footer {
    margin-top: 10px;
    text-align: center;
    padding-top: 15px;
    border-top: 1px dashed #bdbdbd;
}

.generated-text {
    font-size: 13px;
    color: #414141;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
}

.software-text {
    font-size: 14px;
    color: #1e293b;
    font-weight: 500;
    margin: 0;
}

.brand-name {
    color: #000000;
    font-weight: bold;
}

.software-text:hover .brand-name {
    color: #002d8f;
    transition: 0.3s;
}

.system-footer {
    margin-top: 10px;
    text-align: center;
    padding: 15px 10px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
}

.generated-text {
    font-size: 12px;
    color: #000000;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.software-text {
    font-size: 16px;
    color: #000000;
    font-weight: 600;
}

.brand-name {
    color: #000000;
    font-weight: 700;
}
</style>