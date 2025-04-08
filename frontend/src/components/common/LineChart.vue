<template>
  <div class="line-chart-container" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer
])

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  activeSeries: {
    type: String,
    default: 'expense'
  }
})

const chartContainer = ref(null)
let chartInstance = null

// 更新图表
const updateChart = () => {
  if (!chartInstance) return
  
  const xAxisData = props.data.map(item => item.month)
  let seriesData = []
  
  if (props.activeSeries === 'expense') {
    seriesData = [
      {
        name: '支出',
        type: 'line',
        data: props.data.map(item => item.expense),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#ef4444'
        },
        itemStyle: {
          color: '#ef4444'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
            { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
          ])
        }
      }
    ]
  } else if (props.activeSeries === 'income') {
    seriesData = [
      {
        name: '收入',
        type: 'line',
        data: props.data.map(item => item.income),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#10b981'
        },
        itemStyle: {
          color: '#10b981'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
          ])
        }
      }
    ]
  } else if (props.activeSeries === 'net') {
    seriesData = [
      {
        name: '净收入',
        type: 'line',
        data: props.data.map(item => item.net),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#6366f1'
        },
        itemStyle: {
          color: '#6366f1'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
            { offset: 1, color: 'rgba(99, 102, 241, 0.1)' }
          ])
        }
      }
    ]
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: ¥{c}',
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      borderWidth: 0,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#64748b'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#e2e8f0',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#64748b',
        formatter: '¥{value}'
      }
    },
    series: seriesData
  }
  
  chartInstance.setOption(option)
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 初始化图表
onMounted(() => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value)
    updateChart()
    
    // 监听窗口大小变化，动态调整图表大小
    window.addEventListener('resize', handleResize)
  }
})

// 监听数据变化
watch(() => props.data, updateChart, { deep: true })
watch(() => props.activeSeries, updateChart)

// 组件卸载时清理事件监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.line-chart-container {
  width: 100%;
  height: 100%;
}
</style>