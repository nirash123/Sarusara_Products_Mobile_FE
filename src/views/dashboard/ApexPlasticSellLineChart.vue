<template>
  <b-card no-body>
    <b-row>
      <b-col cols="12" md="6" class="d-flex justify-content-start">
        <div>
          <b-card-title class="mb-1">
            විශ්ලේෂණය - ( අද දින ප්ලාස්ටික් විකුණුම් ප්‍රමාණය )
          </b-card-title>
        </div>
      </b-col>
    </b-row>

    <b-card-body>
      <vue-apex-charts type="bar" height="400" :options="chartOptions" :series="series" />
    </b-card-body>
  </b-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import invoice from "@/apis/modules/invoice";
import vSelect from "vue-select";
import {
  BCard,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BRow,
  BCol,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    VueApexCharts,
    BCard,
    vSelect,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
  },

  data() {
    return {
      category_name: [],
      quantities: [],
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          zoom: { enabled: false },
          toolbar: { show: false },
        },

        colors: ["#2faf16"],
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "left",
          fontSize: "14px",
        },
        dataLabels: { enabled: false },
        grid: {
          xaxis: { lines: { show: true } },
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} Pcs`,
          },
        },
        xaxis: {
          categories: [], // Will be filled dynamically
          labels: {
            rotate: -45,
            style: {
              fontSize: "13px",
            },
          },
        },
        yaxis: {
        },
      },
    };
  },

  async mounted() {
    await this.categoryAdd();
  },

  methods: {
    async categoryAdd() {
      try {

        const response = await invoice.getTodayPlasticItemSaleDetails();

        // The real data is inside response.data
        const data = response.data;

        this.category_name = data.category_name || [];
        this.quantities = data.quentity || [];
        // ✅ Update chart options dynamically
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: this.category_name,
          },
        };

        this.series = [
          {
            name: "විකුණුම් ප්‍රමාණය",
            data: this.quantities,
          },
        ];
      } catch (error) {
      }
    },
  },
};
</script>

<style scoped>
/* Optional styling for cleaner visuals */
</style>
