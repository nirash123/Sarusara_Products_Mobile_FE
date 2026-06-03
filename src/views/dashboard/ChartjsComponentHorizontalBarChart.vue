<script>
import { HorizontalBar } from 'vue-chartjs'
import { $themeColors } from '@themeConfig'
import admin from "@/apis/modules/admin"

function getLastSevenDays() {
  const labels = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    labels.push(dateString);
  }
  return labels;
}

async function fetchTodayData() {
  const data = (await admin.TodayDatas()).data.data;
  return data;
}

const chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
};

export default {
  extends: HorizontalBar,
  props: {
    height: {
      type: Number,
      default: 400
    }
  },
  async mounted() {
    const data = {
      labels: getLastSevenDays(),
      datasets: [
        {
          data: await fetchTodayData(),
          backgroundColor: $themeColors.info,
          borderColor: 'transparent',
          barThickness: 25,
        },
      ],
    };

    const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'top',
        },
      },
      tooltips: {
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: chartColors.tooltipShadow,
        backgroundColor: $themeColors.light,
        titleFontColor: $themeColors.dark,
        bodyFontColor: $themeColors.dark,
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              zeroLineColor: chartColors.grid_line_color,
              borderColor: 'transparent',
              color: chartColors.grid_line_color,
              drawTicks: false,
            },
            scaleLabel: {
              display: true,
            },
            ticks: {
              min: 0,
              fontColor: chartColors.labelColor,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
            },
            ticks: {
              fontColor: chartColors.labelColor,
            },
          },
        ],
      },
    };

    this.renderChart(data, options);
  },
}
</script>