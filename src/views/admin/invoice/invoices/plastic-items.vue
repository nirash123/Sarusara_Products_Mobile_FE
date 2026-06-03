<template>
  <div class="invoice-page">

    <section class="invoice-preview-wrapper">

      <b-row>

        <!-- LEFT SIDE -->
        <b-col cols="12" lg="9">

          <b-card no-body class="invoice-card">

            <!-- TOP HEADER -->
            <div class="invoice-top">

              <div class="company-section">

                <b-img
                  src="@/assets/images/logo/slogo.png"
                  class="company-logo"
                />

                <div class="company-details">

                  <div class="company-sub">
                    Plastic Items Details Report
                  </div>

                </div>

              </div>

              <div class="invoice-meta">

                <div class="meta-box">

                  <span class="meta-label">
                    Report Date
                  </span>

                  <span class="meta-value">
                    {{ formattedDate }}
                  </span>

                </div>

                <div class="meta-box">

                  <span class="meta-label">
                    Sort Type
                  </span>

                  <span class="meta-value">
                    {{ sortType === 'asc' ? 'Low → High' : 'High → Low' }}
                  </span>

                </div>

              </div>

            </div>

            <!-- BLUE LINE -->
            <div class="top-line"></div>

            <!-- TABLE -->
            <div class="table-wrapper">

              <table class="invoice-table">

                <thead>

                  <tr>

                    <th width="8%">
                      #
                    </th>

                    <th width="62%">
                      Item Name / භාණ්ඩයේ නම
                    </th>

                    <th width="15%" class="text-center">
                      Unit
                    </th>

                    <th width="15%" class="text-center">
                      Quantity
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr
                    v-for="(item, index) in items"
                    :key="index"
                  >

                    <td>
                      {{ index + 1 }}
                    </td>

                    <td class="item-name">
                      {{ item.item_name }}
                    </td>

                    <td class="text-center">
                      {{ item.unit || '-' }}
                    </td>

                    <td class="text-center qty">
                      {{ item.quentity }}
                    </td>

                  </tr>

                  <tr v-if="items.length === 0">

                    <td colspan="4" class="empty-text">
                      No Items Found
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            <!-- FOOTER -->
            <div class="invoice-footer">

              <div>
                Total Items :
                <strong>{{ items.length }}</strong>
              </div>

              <div class="software-text">
                Software By Easyones Soft 076 283 38 38
              </div>

            </div>

          </b-card>

        </b-col>

        <!-- RIGHT SIDE -->
        <b-col cols="12" lg="3">

          <b-card class="action-card">

            <h4 class="action-title">
              Report Filters
            </h4>

            <!-- SORT -->
            <b-form-group label="Sort Quantity">

              <v-select
                v-model="sortType"
                :options="sortOptions"
                :reduce="option => option.value"
                label="label"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                class="custom-v-select"
              />

            </b-form-group>

            <!-- BUTTONS -->
            <b-button
              variant="primary"
              block
              class="action-btn"
              @click="categoryAdd"
            >
              View Report
            </b-button>

            <b-button
              variant="success"
              block
              class="action-btn"
              @click="printInvoice"
            >
              Print Report
            </b-button>

            <b-button
              variant="danger"
              block
              class="action-btn"
              @click="$router.push('/invoice')"
            >
              Cancel
            </b-button>

          </b-card>

        </b-col>

      </b-row>

    </section>

  </div>
</template>

<script>

import {
  BRow,
  BCol,
  BCard,
  BButton,
  BFormGroup,
  BImg,
} from "bootstrap-vue";

import vSelect from "vue-select";

import { mapGetters } from "vuex";

import Ripple from "vue-ripple-directive";

import product from "@/apis/modules/product";
import invoice from "@/apis/modules/invoice";


export default {

   components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BFormGroup,
    BImg,
    vSelect,
  },

  directives: {
    Ripple,
  },


  data() {

    return {

      category: null,
      items: [],
      date: new Date(),

      sortType: "asc",

      sortOptions: [
        { label: "Quantity Low → High", value: "asc" },
        { label: "Quantity High → Low", value: "desc" },
      ],

    };

  },

  computed: {

    formattedDate() {

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      return this.date.toLocaleString("en-US", options);

    },

  },

  methods: {


    // 🔥 FIXED API CALL
    async categoryAdd() {

      try {

        const payload = {

          sort: this.sortType,

        };

        const response = await invoice.getPlasticItems(payload);

        this.items = response.data.item;

      } catch (error) {

        console.log(error);

      }

    },

    printInvoice() {
      window.print();
    },

  },

  watch: {

    // 🔥 AUTO REFRESH WHEN SORT CHANGES
    sortType() {
      this.categoryAdd();
    },

    // 🔥 AUTO REFRESH WHEN CATEGORY CHANGES
    category() {
      this.categoryAdd();
    },

  },

  async mounted() {

    const user = JSON.parse(localStorage.getItem("userData"));

    if (user.admin_role === "TBSAdmin") {
      await this.categoryAdd();

    } else {
      this.$router.push("/");
    }

  },

};

</script>

<style lang="scss">

@import "@core/scss/vue/libs/vue-select.scss";

.invoice-page {
  background: #f4f7fb;
  min-height: 100vh;
  padding: 25px;
}

.invoice-card {
  border-radius: 18px;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
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
  background: linear-gradient(
    to right,
    #0b6eca,
    #1f8fff
  );
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
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
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

@media(max-width: 768px){

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