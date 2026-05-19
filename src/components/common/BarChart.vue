<template>
  <div class="bar-chart" ref="chartRef" :style="{ height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  height: {
    type: Number,
    default: 200
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance) return
  
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    xAxis: {
      type: 'category',
      data: props.data.xAxis,
      axisLine: {
        lineStyle: { color: 'rgba(0, 212, 255, 0.3)' }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 10
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: { color: 'rgba(0, 212, 255, 0.1)' }
      },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 10 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: props.data.series[0].data,
      barWidth: '60%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#00D4FF' },
            { offset: 1, color: 'rgba(0, 102, 255, 0.6)' }
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 40, 0.9)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 12 }
    }
  }
  
  chartInstance.setOption(option)
}

watch(() => props.data, () => {
  updateChart()
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})
</script>

<style lang="scss" scoped>
.bar-chart {
  width: 100%;
}
</style>