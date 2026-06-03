<template>
  <b-card no-body>
    <b-row>
      <b-col cols="12" md="6" class="d-flex justify-content-start">
        <div>
          <b-card-title class="mb-1">
            විශ්ලේෂණය - ( වසරක මුළු විකුණුම් ප්‍රමාණය )
          </b-card-title>
          <b-card-sub-title></b-card-sub-title>
        </div>
      </b-col>
      <b-col cols="12" md="2" class="d-flex justify-content-end ">
        <h5 class="mt-2 mb-2">වසර තෝරන්න : </h5>
      </b-col>
      <b-col cols="12" md="4" class="align-items-start mt-1">
        <v-select v-model="year" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="years" label="year"
          :reduce="(years) => years.year" class="invoice-filter-select" placeholder="Select Year">
        </v-select>
      </b-col>
    </b-row>
    <b-card-body>
      <vue-apex-charts type="bar" height="400" :options="chartOptions" :series="series" />
    </b-card-body>
  </b-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import admin from "@/apis/modules/admin";
import vSelect from "vue-select";

function getMonthsFromJanuaryToDecember() {
  const labels = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, i, 1);
    const monthString = date.toLocaleDateString('en-US', { month: 'long' });
    labels.push(monthString);
  }

  return labels;
}

import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle, BBadge, BRow, BCol,
} from 'bootstrap-vue'


export default {
  components: {
    BRow,
    BCol,
    VueApexCharts,
    BCardHeader,
    BCard,
    BBadge,
    vSelect,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
  },
  data() {
    return {
      years: [],
      year: new Date().getFullYear(),
      series: [],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '14px',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' Kg'; // ✅ Tooltip also shows with Kg
            },
          },
        },
          xaxis: {
            categories: getMonthsFromJanuaryToDecember(),
          },
          yaxis: {},
        },
      };
    },
      async mounted() {
      await this.yearData();
      await this.fetchData();
    },
    watch: {
      year: {
        handler: 'fetchData',
          immediate: true, 
    },
    },
    methods: {

    async yearData(){
        try {
          const response = await admin.yearData()
          this.years = response.data.data
          this.year = this.years[this.years.length - 1].year;
        } catch (error) {
        }
      },


    async fetchData() {
        try {
          const todayData = await admin.TodayItems(this.year);
          const ordersData = todayData.data.order;

          this.series = [
            {
              name: 'විකුණුම් ප්‍රමාණය ',
              data: ordersData,
            },
          ];
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  };
</script>