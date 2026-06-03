<template>
  <b-card no-body>
    <b-card-body>

      <chartjs-component-horizontal-bar-chart
        :height="440"
        :data="chartData"
        :options="chartOptions"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import ChartjsComponentHorizontalBarChart from './ChartjsComponentHorizontalBarChart.vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
    ChartjsComponentHorizontalBarChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          data: [],
        }]
      },
      chartOptions: {
        // Your options here
      },
    }
  },
  async mounted() {

}
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
