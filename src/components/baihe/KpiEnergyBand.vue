<template>
  <div class="kpi-energy">
    <div class="energy-header">
      <span class="scan-line"></span>
      <span class="energy-label">核心经营KPI能量带</span>
      <div class="kpi-status">
        <span class="status-dot"></span>
        <span>系统运行正常</span>
      </div>
    </div>
    <div class="energy-grid">
      <div v-for="(kpi, index) in kpiList" :key="index" class="energy-card">
        <div class="card-glow"></div>
        <div class="card-border"></div>
        <div class="card-body">
          <div class="card-row top">
            <div class="value-area">
              <span class="number">{{ animatedValues[index] }}</span>
              <span class="unit">{{ kpi.unit }}</span>
            </div>
            <div class="icon-area">{{ kpi.icon }}</div>
          </div>
          <div class="card-row bottom">
            <div class="label-area">{{ kpi.label }}</div>
            <div class="trend-area" :class="kpi.trend">
              <span class="arrow">{{ kpi.trend === 'up' ? '↑' : '↓' }}</span>
              <span class="rate">{{ kpi.trendValue }}</span>
            </div>
          </div>
          <div class="micro-chart">
            <div :ref="el => setChartRef(el, index)" class="sparkline"></div>
          </div>
          <div class="breathe-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { kpiData } from '../../mockData/baiheData'

const kpiList = ref([
  { icon: '💰', label: '月交易金额', unit: '亿元', value: kpiData.monthlyAmount.value, trend: 'up', trendValue: '+18.52%' },
  { icon: '👤', label: '当月新增会员', unit: '万人', value: kpiData.newMembers.value, trend: 'up', trendValue: '+12.35%' },
  { icon: '📊', label: '月交易笔数', unit: '万笔', value: kpiData.monthlyTransactions.value, trend: 'up', trendValue: '+15.68%' }
])

const animatedValues = ref(['0', '0', '0'])
const chartRefs = ref([])
const chartInstances = ref([])

const setChartRef = (el, index) => {
  if (el) chartRefs.value[index] = el
}

const animateNumbers = () => {
  kpiList.value.forEach((kpi, i) => {
    const target = kpi.value
    const duration = 2000
    const start = Date.now()
    const animate = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const current = target * ease
      animatedValues.value[i] = target >= 100 ? current.toFixed(0) : current.toFixed(2)
      if (p < 1) requestAnimationFrame(animate)
    }
    animate()
  })
}

const initSparklines = () => {
  const mockData = [
    [12.1, 11.8, 12.3, 12.0, 12.4, 12.5, 12.56],
    [25.2, 24.8, 26.1, 27.3, 28.0, 28.3, 28.56],
    [820, 835, 828, 840, 848, 852, 856.3]
  ]
  
  kpiList.value.forEach((_, i) => {
    const el = chartRefs.value[i]
    if (!el) return
    const chart = echarts.init(el)
    chartInstances.value.push(chart)
    chart.setOption({
      backgroundColor: 'transparent',
      grid: { left: 0, right: 0, top: 0, bottom: 0 },
      xAxis: { show: false, data: ['', '', '', '', '', '', ''] },
      yAxis: { show: false },
      series: [{
        type: 'line',
        data: mockData[i],
        smooth: true,
        showSymbol: false,
        lineStyle: { color: '#00D4FF', width: 1.5 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0,212,255,0.3)' },
          { offset: 1, color: 'rgba(0,212,255,0)' }
        ])}
      }]
    })
  })
}

onMounted(() => {
  animateNumbers()
  initSparklines()
  window.addEventListener('resize', () => chartInstances.value.forEach(c => c?.resize()))
})

onUnmounted(() => {
  chartInstances.value.forEach(c => c?.dispose())
})
</script>

<style lang="scss" scoped>
.kpi-energy {
  padding: 10px 20px;
  flex: 0 0 17%;
  background: linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 100%);
  border-bottom: 1px solid rgba(0,212,255,0.15);
  position: relative;
}

.energy-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;

  .scan-line {
    width: 4px; height: 20px;
    background: linear-gradient(180deg, #00D4FF, #0088FF);
    border-radius: 2px;
  }

  .energy-label {
    font-size: 16px; font-weight: 600; color: #fff; letter-spacing: 2px;
  }

  .kpi-status {
    display: flex; align-items: center; gap: 6px;
    margin-left: auto;
    padding: 3px 12px;
    background: rgba(0,255,136,0.1);
    border: 1px solid rgba(0,255,136,0.3);
    border-radius: 12px;
    font-size: 12px; color: #00FF88;

    .status-dot {
      width: 6px; height: 6px; background: #00FF88; border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
}

.energy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.energy-card {
  position: relative;
  padding: 1px;
  border-radius: 8px;
  overflow: hidden;

  .card-glow {
    position: absolute; inset: 0;
    background: radial-gradient(circle at center, rgba(0,212,255,0.15), transparent 70%);
    opacity: 0; transition: opacity .3s;
  }
  .card-border {
    position: absolute; inset: 0;
    border-radius: 8px;
    border: 1px solid rgba(0,212,255,0.25);
    transition: all .3s;
  }
  .card-body {
    position: relative;
    padding: 12px 16px;
    background: rgba(10,22,40,0.85);
    border-radius: 7px;
  }

  .card-row {
    display: flex; align-items: center; justify-content: space-between;
    &.top { margin-bottom: 4px; }
    &.bottom { margin-bottom: 6px; }
  }

  .value-area {
    display: flex; align-items: baseline; gap: 6px;
    .number {
      font-size: 28px; font-weight: 700; color: #00D4FF;
      font-family: 'DIN Alternate', monospace;
      text-shadow: 0 0 20px rgba(0,212,255,0.5);
    }
    .unit { font-size: 12px; color: rgba(255,255,255,0.6); }
  }

  .icon-area { font-size: 24px; filter: drop-shadow(0 0 8px rgba(0,212,255,0.5)); }
  .label-area { font-size: 12px; color: rgba(255,255,255,0.7); }

  .trend-area {
    display: flex; align-items: center; gap: 4px;
    padding: 2px 10px; border-radius: 10px; font-size: 11px;
    &.up { background: rgba(0,255,136,0.12); color: #00FF88; }
    &.down { background: rgba(255,107,107,0.12); color: #FF6B6B; }
    .arrow { font-size: 10px; }
  }

  .micro-chart {
    height: 30px;
    .sparkline { width: 100%; height: 100%; }
  }

  .breathe-dot {
    position: absolute; top: 8px; right: 8px;
    width: 5px; height: 5px; border-radius: 50%;
    background: #00FF88;
    animation: pulse 2s ease-in-out infinite;
  }

  &:hover {
    .card-glow { opacity: 1; }
    .card-border { border-color: rgba(0,212,255,0.7); box-shadow: 0 0 25px rgba(0,212,255,0.3); }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}
</style>