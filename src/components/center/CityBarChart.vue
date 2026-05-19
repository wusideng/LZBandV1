<template>
  <div class="tech-card bar-chart-card">
    <div class="card-title">
      <span>各市业务数据对比</span>
    </div>
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, inject } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

// 使用共享的城市索引
const currentCityIndex = inject('currentCityIndex', ref(0))

// 各市数据
const cityData = [
  { name: '兰州市', lilyCount: 850, mobileCount: 920, merchantCount: 156 },
  { name: '嘉峪关市', lilyCount: 120, mobileCount: 130, merchantCount: 45 },
  { name: '金昌市', lilyCount: 95, mobileCount: 102, merchantCount: 38 },
  { name: '白银市', lilyCount: 180, mobileCount: 195, merchantCount: 68 },
  { name: '天水市', lilyCount: 320, mobileCount: 345, merchantCount: 112 },
  { name: '武威市', lilyCount: 165, mobileCount: 178, merchantCount: 62 },
  { name: '张掖市', lilyCount: 195, mobileCount: 210, merchantCount: 78 },
  { name: '平凉市', lilyCount: 215, mobileCount: 230, merchantCount: 85 },
  { name: '酒泉市', lilyCount: 111, mobileCount: 111, merchantCount: 111 },
  { name: '庆阳市', lilyCount: 280, mobileCount: 300, merchantCount: 98 },
  { name: '定西市', lilyCount: 195, mobileCount: 210, merchantCount: 72 },
  { name: '陇南市', lilyCount: 230, mobileCount: 248, merchantCount: 88 },
  { name: '临夏州', lilyCount: 165, mobileCount: 178, merchantCount: 58 },
  { name: '甘南州', lilyCount: 85, mobileCount: 92, merchantCount: 32 }
]

// 高亮指定城市
const highlightCity = (index) => {
  if (!chartInstance) return
  chartInstance.dispatchAction({
    type: 'downplay',
    seriesIndex: 0
  })
  chartInstance.dispatchAction({
    type: 'downplay',
    seriesIndex: 1
  })
  chartInstance.dispatchAction({
    type: 'downplay',
    seriesIndex: 2
  })
  chartInstance.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: index
  })
  chartInstance.dispatchAction({
    type: 'highlight',
    seriesIndex: 1,
    dataIndex: index
  })
  chartInstance.dispatchAction({
    type: 'highlight',
    seriesIndex: 2,
    dataIndex: index
  })
}

const initChart = () => {
  if (!chartRef.value) return
  
  // 等待DOM渲染完成
  nextTick(() => {
    if (!chartRef.value) return
    
    chartInstance = echarts.init(chartRef.value)
    
    const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: '#00D4FF',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    legend: {
      data: ['百合生活会员', '手机银行开户', '收单商户数'],
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      top: 5,
      itemGap: 20
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '8%',
      top: '50px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: cityData.map(d => d.name),
      axisLabel: {
        color: '#fff',
        fontSize: 11,
        interval: 0,
        rotate: 45,
        margin: 8
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：户',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 11
      },
      axisLabel: {
        color: '#fff',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 212, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '百合生活会员',
        type: 'bar',
        data: cityData.map(d => d.lilyCount),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00FF88' },
            { offset: 1, color: 'rgba(0, 255, 136, 0.4)' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#00FF88',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 255, 136, 0.5)'
          }
        },
        barWidth: '22%',
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 80
        }
      },
      {
        name: '手机银行开户',
        type: 'bar',
        data: cityData.map(d => d.mobileCount),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00D4FF' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.4)' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#00D4FF',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 212, 255, 0.5)'
          }
        },
        barWidth: '22%',
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 80 + 100
        }
      },
      {
        name: '收单商户数',
        type: 'bar',
        data: cityData.map(d => d.merchantCount),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: 'rgba(255, 215, 0, 0.4)' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#FFD700',
            shadowBlur: 10,
            shadowColor: 'rgba(255, 215, 0, 0.5)'
          }
        },
        barWidth: '22%',
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 80 + 200
        }
      }
    ]
  }
  
  chartInstance.setOption(option)
  })
}

onMounted(() => {
  initChart()
  // 延迟再次resize确保完全渲染
  setTimeout(() => {
    chartInstance?.resize()
    // 初始化高亮第一个城市
    highlightCity(currentCityIndex.value)
  }, 100)
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

// 监听城市索引变化，同步高亮
watch(currentCityIndex, (newIndex) => {
  highlightCity(newIndex)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style lang="scss" scoped>
.bar-chart-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  
  .chart-container {
    flex: 1;
    min-height: 0;
    width: 100%;
    height: 100%;
  }
}
</style>