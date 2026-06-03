<template>
  <div class="invoice-page loan-page">
    <section class="invoice-preview-wrapper">

      <b-card no-body class="main-card shadow-sm border-0">

        <!-- FILTER AREA -->
        <div class="filter-area">
          <b-row class="align-items-center">

            <b-col cols="12" xl="7">
              <h5 class="d-md-none">Date Range - {{ rangeDate }}</h5>

              <div class="action-card d-flex align-items-center">
                <div class="mr-1">
                  <flat-pickr v-model="rangeDate" class="form-control date-picker mt-1" :config="dateConfig" />
                </div>

                <b-form-input v-model="search" class="modern-search mr-1" placeholder="🔍 Search ..." />
              </div>
            </b-col>

            <b-col class="action-card mb-1" cols="12" xl="5">
              <div class="d-flex justify-content-end">

                <b-button class="mr-1" variant="primary" @click="loadExchangeOrders">
                 <feather-icon icon="RefreshCwIcon" size="16" class="mr-50" />
                </b-button>

              </div>
            </b-col>

          </b-row>

          <!-- MODAL -->
          <b-modal id="modal-exchange" ref="exchangeModal" title="Add Exchange Item" ok-title="Submit"
            @ok="handleSubmitPrice" @hidden="resetModalPrice">

            <b-form-group label="Old Item">
              <v-select v-model="old_item_id" :options="Item_names" label="item_name" />
            </b-form-group>

            <b-form-group label="Quantity">
              <b-form-input v-model="quentity" type="number" />
            </b-form-group>

            <b-form-group label="New Item">
              <v-select v-model="new_item_id" :options="Item_names" label="item_name" />
            </b-form-group>

            <b-form-group label="New Quantity">
              <b-form-input v-model="new_quentity" type="number" />
            </b-form-group>

          </b-modal>

        </div>

        <!-- TABLE -->
        <b-card class="mt-2">
          <b-table :items="exchange_items" :fields="exchangeFields" striped hover>

            <template #cell(quentity)="data">
              {{ data.item.quentity }} {{ data.item.unit }}
            </template>
            <template #cell(exchange_quentity)="data">
              {{ data.item.exchange_quentity }} {{ data.item.exchange_unit }}
            </template>
            <template #cell(date)="data">
              {{ data.item.date }}
            </template>

            <template  #cell(actions)="data">
              <b-button class="action-card" size="sm" variant="danger" @click="deleteExchangeOrder(data.item.id)">
                Delete
              </b-button>
            </template>

          </b-table>

          <div v-if="exchange_items.length === 0">
            No Data Found
          </div>
        </b-card>

      </b-card>
    </section>
  </div>
</template>

<script>
import {
  BModal,
  BCard,
  BRow,
  BCol,
  BTable,
  BButton,
  BFormInput,
  BFormGroup
} from "bootstrap-vue";

import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";

import admin from "@/apis/modules/admin";
import product from "@/apis/modules/product";

export default {
  components: {
    BModal,
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BFormInput,
    BFormGroup,
    vSelect,
    flatPickr
  },

  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),

      search: "",
      rangeDate: new Date().toISOString().split("T")[0],

      exchange_items: [],
      Item_names: [],

      showOrder: true,
      tableLoading: false,

      // modal fields
      old_item_id: null,
      new_item_id: null,
      quentity: 0,
      new_quentity: 0,

      exchangeFields: [
        { key: "old_item_name", label: "Old Item" },
        { key: "quentity", label: "Qty" },
        { key: "new_item_name", label: "Exchange Item" }, // ✅ FIXED
        { key: "exchange_quentity", label: "Exchange Qty" },
        { key: "date", label: "Date" },
        { key: "actions", label: "Actions" }
      ],
      dateConfig: {
        mode: "range",
        dateFormat: "Y-m-d"
      }
    };
  },

  mounted() {
    this.itemData();
    this.loadExchangeOrders();
  },

  methods: {

    /* LOAD ITEMS */
    async itemData() {
      try {
        const res = await product.shopItemData();
        this.Item_names = res.data.data;
      } catch (e) {
        console.error(e);
      }
    },

    /* LOAD EXPENSES */
    async loadExchangeOrders() {
      try {
        this.tableLoading = true;

        let startDate = this.rangeDate;
        let endDate = this.rangeDate;

        if (this.rangeDate.includes(" to ")) {
          [startDate, endDate] = this.rangeDate.split(" to ");
        }

        const payload = {
          start_date: startDate,
          end_date: endDate,
          search: this.search
        };

        const res = await admin.getExchangeOrders(payload);

        this.exchange_items = res.data.exchange_items || [];
      } catch (e) {
        console.error(e);
      } finally {
        this.tableLoading = false;
      }
    },

    /* RESET MODAL */
    resetModalPrice() {
      this.old_item_id = null;
      this.new_item_id = null;
      this.quentity = 0;
      this.new_quentity = 0;
    },

    /* VALIDATION */
    validateForm() {
      return (
        this.old_item_id &&
        this.new_item_id &&
        this.quentity > 0 &&
        this.new_quentity > 0
      );
    },

    /* SUBMIT MODAL */
    async handleSubmitPrice(bvModalEvt) {
      bvModalEvt.preventDefault();

      // ✅ 1. Validate selections
      if (!this.old_item_id || !this.new_item_id) {
        this.showErrorMessage("Please select both items");
        return;
      }

      // ✅ 2. Validate quantities
      if (
        this.quentity === null ||
        this.quentity === '' ||
        this.new_quentity === null ||
        this.new_quentity === ''
      ) {
        this.showErrorMessage("Please enter quantities");
        return;
      }

      // Optional: prevent negative/zero values
      if (Number(this.quentity) <= 0 || Number(this.new_quentity) <= 0) {
        this.showErrorMessage("Quantity must be greater than 0");
        return;
      }

      try {
        this.isLoading = true;

        // ✅ 3. Build safe payload
        const payload = {
          old_item_id: this.old_item_id.id,
          new_item_id: this.new_item_id.id,
          quentity: Number(this.quentity),
          new_quentity: Number(this.new_quentity),
        };

        // ✅ 4. API call
        const response = await admin.submitExchangeItem(payload);

        // success message
        this.showSuccessMessage("Exchange Created Successfully");

        // ✅ 5. Close modal safely
        if (this.$refs.exchangeModal) {
          this.$refs.exchangeModal.hide();
        }

        // ✅ 6. Refresh table
        this.loadExchangeOrders();

        // ✅ 7. Reset form
        this.resetModalPrice();

      } catch (error) {
        console.error(error);

        this.showErrorMessage(
          error?.response?.data?.message || "Something went wrong"
        );

      } finally {
        this.isLoading = false;
      }
    },

    /* DELETE */
    async deleteExchangeOrder(id) {

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
            await admin.exchangeItemDelete(id)
            this.showErrorMessage('Item has been deleted')
            this.refreshTable();
            this.loadExchangeOrders()
          } else if (result.dismiss == 'cancel') {
            this.loadExchangeOrders()
            this.formLoading = false
            this.showSuccessMessage('Cancelled')
          }
        })

        await this.loadExchangeOrders()
        this.tableLoading = false

      } catch (error) {
        this.convertAndNotifyError(error)
        this.tableLoading = false
      }

      await this.loadExchangeOrders()
  
    },

    printInvoice() {
      window.print();
    }
  }
};
</script>


<style scoped>
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



.invoice-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 25px;
}

.invoice-card {
  border-radius: 18px;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.invoice-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
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

.loan-page {
  background: #f8f9fc;
  min-height: 100vh;
  padding: 10px;
}

.main-card {
  border-radius: 14px;
  overflow: hidden;
}

.filter-area {
  background: white;
  padding: 18px;
  border-bottom: 1px solid #ebeef5;
}

.per-page-selector {
  min-width: 90px;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 11px;
  color: #999;
  z-index: 10;
}

.search-input {
  padding-left: 35px;
  border-radius: 8px;
  min-width: 220px;
}

.date-picker {
  min-width: 240px;
  border-radius: 8px;
}

.refresh-btn {
  border-radius: 8px;
  padding-left: 18px;
  padding-right: 18px;
  font-weight: 600;
}

.loan-card {
  border-radius: 14px;
  overflow: hidden;
  transition: 0.3s;
  background: white;
}

.loan-card:hover {
  transform: translateY(-2px);
}

.card-header-custom {
  padding: 14px 18px;
  font-weight: 700;
  font-size: 15px;
  color: white;
}

.company-header {
  background: linear-gradient(45deg, #28c76f, #48da89);
}

.staff-header {
  background: linear-gradient(45deg, #ff9f43, #ffbe76);
}

.vehicle-header {
  background: linear-gradient(45deg, #7367f0, #9d94ff);
}

.other-header {
  background: linear-gradient(45deg, #436fff, #436fff);
}

.table-wrapper {
  padding: 10px;
}

.modern-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f8f8f8 !important;
  font-size: 13px;
}

.modern-table td {
  vertical-align: middle;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  padding: 25px;
  color: #999;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {

  .search-input,
  .date-picker {
    width: 100%;
    min-width: 100%;
  }

  .refresh-btn {
    width: 100%;
  }
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
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

.invoice-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 25px;
}

.invoice-card {
  border-radius: 18px;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.invoice-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
}

.company-section {
  display: flex;
  align-items: center;
}

.company-logo {
  width: 90px;
  margin-right: 20px;
}

.company-sub {
  font-size: 18px;
  font-weight: 600;
  color: #444;
}

.company-sub-si {
  font-size: 16px;
  color: #666;
}

.invoice-meta {
  text-align: right;
}

.meta-box {
  margin-bottom: 12px;
}

.meta-label {
  display: block;
  font-size: 13px;
  color: #999;
  margin-bottom: 3px;
}

.meta-value {
  font-size: 16px;
  font-weight: 600;
  color: #111;
}

.top-line {
  height: 5px;
  background: linear-gradient(to right,
      #0b6eca,
      #1f8fff);
}

.table-wrapper {
  padding: 25px;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table thead tr {
  background: #0b6eca;
}

.invoice-table thead th {
  color: white;
  padding: 16px;
  font-size: 15px;
  font-weight: 600;
}

.invoice-table tbody td {
  padding: 15px;
  border-bottom: 1px solid #e9edf3;
  font-size: 15px;
}

.invoice-table tbody tr:nth-child(even) {
  background: #f9fbff;
}

.item-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #222;
}

.qty {
  font-weight: bold;
  color: #0b6eca;
}

.empty-text {
  text-align: center;
  padding: 40px !important;
  color: #999;
}

.invoice-footer {
  border-top: 1px solid #eee;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fafcff;
}

.software-text {
  color: #777;
  font-style: italic;
}

.action-card {
  border: none;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.action-title {
  font-weight: 700;
  margin-bottom: 25px;
  color: #0b6eca;
}

.action-btn {
  height: 45px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 12px;
}

.custom-v-select .vs__dropdown-toggle {
  min-height: 45px;
  border-radius: 10px;
}

@media(max-width: 768px) {

  .invoice-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .invoice-meta {
    text-align: left;
    margin-top: 20px;
  }

}

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