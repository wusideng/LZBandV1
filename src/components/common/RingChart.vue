<template>
  <div class="ring-chart" ref="chartRef" :style="{ height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
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
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 22, 40, 0.9)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 8
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: {
        label: { show: false }
      },
      labelLine: { show: false },
      data: props.data,
      itemStyle: {
        borderColor: '#0A1628',
        borderWidth: 2
      },
      color: ['#00D4FF', '#00FF88', '#0066FF', '#FFD700', '#FF6B6B'],
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    }]
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
.ring-chart {
  width: 100%;
}
</style>