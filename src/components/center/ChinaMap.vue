<template>
  <div class="tech-card map-card">
    <div class="card-title">
      <span>甘肃业务分布</span>
      <!-- <div class="map-stats">
        <div class="stat-item">
          <span class="stat-label">百合生活会员</span>
          <span class="stat-value">{{ formatNumber(totalData.lilyCount) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">手机银行开户数</span>
          <span class="stat-value">{{ formatNumber(totalData.mobileCount) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">收单商户数</span>
          <span class="stat-value">{{ formatNumber(totalData.merchantCount) }}</span>
        </div>
      </div> -->
    </div>
    <div class="map-container">
      <div class="map-chart" ref="mapChartRef">
        <div v-if="!mapLoaded" class="map-loading">
          <div class="loading-spinner"></div>
          <span>地图加载中...</span>
        </div>
      </div>
      <!-- 轮播数据展示 -->
      <div class="map-legend">
        <div class="legend-items">
          <div class="legend-item">
            <span class="dot mobile"></span>
            <span class="label">手机银行开户数</span>
            <span class="value">4,034,813</span>
          </div>
          <div class="legend-item">
            <span class="dot lily"></span>
            <span class="label">百合生活会员数</span>
            <span class="value">2,024,016</span>
          </div>
          <div class="legend-item">
            <span class="dot merchant"></span>
            <span class="label">特约商户数</span>
            <span class="value">149,914</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import * as echarts from 'echarts'

const mapChartRef = ref(null)
const mapLoaded = ref(false)
let chartInstance = null
let carouselTimer = null

// 使用共享的城市索引
const currentCityIndex = inject('currentCityIndex', ref(0))
const setCityIndex = inject('setCityIndex', () => {})

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
  { name: '临夏回族自治州', lilyCount: 165, mobileCount: 178, merchantCount: 58 },
  { name: '甘南藏族自治州', lilyCount: 85, mobileCount: 92, merchantCount: 32 }
]

// 当前展示的城市数据
const currentCity = computed(() => cityData[currentCityIndex.value] || cityData[0])

// 总计数据
const totalData = {
  lilyCount: cityData.reduce((sum, d) => sum + d.lilyCount, 0),
  mobileCount: cityData.reduce((sum, d) => sum + d.mobileCount, 0),
  merchantCount: cityData.reduce((sum, d) => sum + d.merchantCount, 0)
}

const formatNumber = (num) => {
  return num.toLocaleString()
}

// 高亮指定城市
const highlightCity = (index) => {
  if (!chartInstance) return
  chartInstance.dispatchAction({
    type: 'downplay',
    seriesIndex: 0
  })
  chartInstance.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: index
  })
}

// 开始轮播
const startCarousel = () => {
  carouselTimer = setInterval(() => {
    const nextIndex = (currentCityIndex.value + 1) % cityData.length
    currentCityIndex.value = nextIndex
    setCityIndex(nextIndex)
    highlightCity(nextIndex)
  }, 3000)
}

// 停止轮播
const stopCarousel = () => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}

const initChart = async () => {
  if (!mapChartRef.value) return
  
  try {
    const response = await fetch('/gansu.json')
    const gansuJson = await response.json()
    
    echarts.registerMap('gansu', gansuJson)
    
    chartInstance = echarts.init(mapChartRef.value)
    
    const option = {
      backgroundColor: 'transparent',
      // tooltip: {
      //   trigger: 'item',
      //   backgroundColor: 'rgba(10, 22, 40, 0.95)',
      //   borderColor: '#00D4FF',
      //   borderWidth: 1,
      //   textStyle: {
      //     color: '#fff',
      //     fontSize: 12
      //   },
      //   formatter: function(params) {
      //     if (params.seriesType === 'map') {
      //       const city = cityData.find(d => d.name === params.name)
      //       if (city) {
      //         return `<div style="padding: 8px; min-width: 160px; border:1px solid;">
      //           <div style="font-weight: 600; margin-bottom: 8px; color: #00D4FF;">${params.name}</div>
      //           <div style="display: flex; justify-content: space-between; margin: 4px 0;">
      //             <span>百合生活会员（户）</span>
      //             <span style="color: #00FF88;">${city.lilyCount}</span>
      //           </div>
      //           <div style="display: flex; justify-content: space-between; margin: 4px 0;">
      //             <span>手机银行开户数（户）</span>
      //             <span style="color: #00D4FF;">${city.mobileCount}</span>
      //           </div>
      //           <div style="display: flex; justify-content: space-between; margin: 4px 0;">
      //             <span>收单商户数（户）</span>
      //             <span style="color: #FFD700;">${city.merchantCount}</span>
      //           </div>
      //         </div>`
      //       }
      //     }
      //     return ''
      //   }
      // },
      visualMap: {
        show: false
      },
      geo: {
        map: 'gansu',
        roam: false,
        zoom: 1.2,
        center: [100.5, 37.5],
        itemStyle: {
          areaColor: 'rgba(0, 60, 100, 0.6)',
          borderColor: 'rgba(0, 180, 220, 0.6)',
          borderWidth: 1.5,
          shadowColor: 'rgba(0, 100, 150, 0.8)',
          shadowBlur: 15
        },
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(0, 150, 220, 0.8)',
            borderColor: '#00D4FF',
            borderWidth: 3
          },
          label: {
            show: true,
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: 'rgba(10, 30, 60, 0.92)',
            borderColor: '#00D4FF',
            borderWidth: 1,
            borderRadius: 6,
            padding: [8, 12, 8, 12],
            position: 'top',
            distance : 55,
            lineHeight: 22,
            formatter: function(params) {
              const city = cityData.find(d => d.name === params.name)
              if (city) {
                return `{name|${params.name}}\n{lily|百合生活会员（户）：${city.lilyCount}}\n{mobile|手机银行开户（户）：${city.mobileCount}}\n{merchant|收单商户数（户）：${city.merchantCount}}`
              }
              return params.name
            },
            rich: {
              name: {
                fontSize: 15,
                fontWeight: 'bold',
                color: '#00D4FF',
                lineHeight: 24
              },
              lily: {
                fontSize: 14,
                color: '#00FF88'
              },
              mobile: {
                fontSize: 14,
                color: '#00D4FF'
              },
              merchant: {
                fontSize: 14,
                color: '#FFD700'
              }
            }
          }
        }
      },
      series: [
        {
          type: 'map',
          map: 'gansu',
          geoIndex: 0,
          data: cityData.map(d => ({
            name: d.name,
            value: d.lilyCount
          }))
        }
      ]
    }
    
    chartInstance.setOption(option)
    mapLoaded.value = true
    
    // 开始轮播
    startCarousel()
    
    // 鼠标悬浮暂停轮播
    chartInstance.on('mouseover', function() {
      stopCarousel()
    })
    
    chartInstance.on('mouseout', function() {
      startCarousel()
    })
    
  } catch (error) {
    console.error('地图加载失败:', error)
    mapLoaded.value = false
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    chartInstance?.resize()
  })
})

onUnmounted(() => {
  stopCarousel()
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style lang="scss" scoped>
.map-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .card-title {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .map-container {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
  }
  
  .map-stats {
    display: flex;
    gap: 16px;
    
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 16px;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 4px;
      
      .stat-label {
        font-size: 11px;
        color: var(--text-secondary);
      }
      
      .stat-value {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary);
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
      }
    }
  }
  
  .map-chart {
    flex: 1;
    min-height: 0;
    background: rgba(0, 40, 70, 0.3);
    border-radius: 8px;
    border: 1px solid rgba(0, 180, 220, 0.3);
    position: relative;
    
    .map-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: var(--text-secondary);
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--border-primary);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }
  
  .map-legend {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    background: rgba(10, 22, 40, 0.95);
    border: 1px solid var(--primary);
    border-radius: 6px;
    min-width: 200px;
    
    .legend-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 212, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .carousel-indicator {
        font-size: 11px;
        font-weight: normal;
        color: var(--text-secondary);
        background: rgba(0, 212, 255, 0.15);
        padding: 2px 6px;
        border-radius: 3px;
      }
    }
    
    .legend-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        
        &.lily { background: #00FF88; }
        &.mobile { background: #00D4FF; }
        &.merchant { background: #FFD700; }
      }
      
      .label {
        color: var(--text-secondary);
        flex: 1;
      }
      
      .value {
        font-weight: 600;
        color: var(--text-primary);
      }
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>