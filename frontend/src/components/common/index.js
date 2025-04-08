import LineChart from './LineChart.vue'
import PieChart from './PieChart.vue'

export default {
  install(app) {
    app.component('el-line-chart', LineChart)
    app.component('el-pie-chart', PieChart)
  }
} 