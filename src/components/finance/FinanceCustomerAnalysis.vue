<template>
  <div class="customer-analysis">
    <!-- 模块1：客户结构分析 -->
    <div class="analysis-card structure-card">
      <div class="card-title">客户结构分析</div>
      <div class="structure-content">
        <div class="ring-area" ref="ringChartRef"></div>
        <div class="value-grid">
          <div class="value-item">
            <span class="item-label">新增客户数</span>
            <span class="item-value">{{ formatNum(structure.newCustomers) }}</span>
          </div>
          <div class="value-item">
            <span class="item-label">活跃客户数</span>
            <span class="item-value">{{ formatNum(structure.activeCustomers) }}</span>
          </div>
          <div class="value-item">
            <span class="item-label">手机银行</span>
            <span class="item-value">{{ formatNum(structure.mobileBankCustomers) }}</span>
          </div>
          <div class="value-item">
            <span class="item-label">私行客户</span>
            <span class="item-value">{{ formatNum(structure.privateBankCustomers) }}</span>
          </div>
        </div>
        <div class="gauge-area" ref="gaugeChartRef"></div>
      </div>
    </div>

    <!-- 模块2：客户增长趋势 -->
    <div class="analysis-card trend-card">
      <div class="card-title">客户增长趋势 <span class="sub-title">近30日</span></div>
      <div class="trend-charts">
        <div class="trend-row">
          <div class="trend-item">
            <div class="trend-label">客户增长</div>
            <div class="chart-box" ref="growthChartRef"></div>
          </div>
          <div class="trend-item">
            <div class="trend-label">客户流失</div>
            <div class="chart-box" ref="churnChartRef"></div>
          </div>
        </div>
        <div class="trend-row">
          <div class="trend-item full">
            <div class="trend-label">客户净增长</div>
            <div class="chart-box" ref="netGrowthChartRef"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { customerStructure, customerGrowthTrend } from '../../mockData/financeData'

const structure = ref(customerStructure)

const ringChartRef = ref(null)
const gaugeChartRef = ref(null)
const growthChartRef = ref(null)
const churnChartRef = ref(null)
const netGrowthChartRef = ref(null)

let ringChart = null, gaugeChart = null
let growthChart = null, churnChart = null, netGrowthChart = null

const formatNum = (v) => {
  if (v >= 10000) return (v / 10000).toFixed(1) + '万'
  return v.toLocaleString()
}

const initRingChart = () => {
  if (!ringChartRef.value) return
  ringChart = echarts.init(ringChartRef.value)
  ringChart.setOption({
    tooltip: { trigger: 'item', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 10 }, formatter: '{b}: {c}%' },
    series: [{
      type: 'pie', radius: ['45%', '72%'], center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: { scale: false, label: { show: false } },
      labelLine: { show: false },
      data: structure.value.levelDistribution,
      itemStyle: { borderColor: '#0A1628', borderWidth: 1.5 },
      color: ['#00D4FF', '#0099FF', '#0066FF', '#FFD700', '#FF6B6B'],
      animationDuration: 1200,
      animationEasing: 'cubicOut'
    }]
  }, true)
}

const initGaugeChart = () => {
  if (!gaugeChartRef.value) return
  gaugeChart = echarts.init(gaugeChartRef.value)
  gaugeChart.setOption({
    series: [{
      type: 'gauge', center: ['50%', '55%'], radius: '75%',
      startAngle: 220, endAngle: -40, min: 0, max: 100, splitNumber: 5,
      progress: { show: true, width: 6, roundCap: true,
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [{ offset: 0, color: '#0066FF' }, { offset: 0.5, color: '#00D4FF' }, { offset: 1, color: '#00FF88' }] }
        }
      },
      axisLine: { lineStyle: { width: 6, color: [[1, 'rgba(0,212,255,0.12)']] } },
      axisTick: { show: false }, splitLine: { length: 4, lineStyle: { width: 1.5, color: 'rgba(0,212,255,0.2)' } },
      axisLabel: { distance: 6, color: 'rgba(255,255,255,0.3)', fontSize: 7 },
      detail: { valueAnimation: true, formatter: '{value}%', color: '#00D4FF', fontSize: 14, fontFamily: 'DIN Alternate', offsetCenter: [0, '28%'] },
      title: { offsetCenter: [0, '60%'], fontSize: 8, color: 'rgba(255,255,255,0.4)' },
      pointer: { show: true, length: '50%', width: 2, itemStyle: { color: '#00D4FF' } },
      data: [{ value: structure.value.monthlyActiveRate, name: '月活率' }]
    }]
  }, true)
}

const initGrowthLineChart = () => {
  if (!growthChartRef.value) return
  growthChart = echarts.init(growthChartRef.value)
  growthChart.setOption({
    grid: { left: 28, right: 4, top: 6, bottom: 14 },
    xAxis: { type: 'category', data: customerGrowthTrend.dates, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.15)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 3 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 7 }, axisLine: { show: false }, axisTick: { show: false } },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 } },
    series: [{
      type: 'line', data: customerGrowthTrend.growth, smooth: true, symbol: 'none',
      lineStyle: { color: '#00D4FF', width: 1.5 },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.25)' }, { offset: 1, color: 'rgba(0,212,255,0)' }]) }
    }]
  }, true)
}

const initChurnAreaChart = () => {
  if (!churnChartRef.value) return
  churnChart = echarts.init(churnChartRef.value)
  churnChart.setOption({
    grid: { left: 28, right: 4, top: 6, bottom: 14 },
    xAxis: { type: 'category', data: customerGrowthTrend.dates, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.15)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 3 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 7 }, axisLine: { show: false }, axisTick: { show: false } },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#FF6B6B', textStyle: { color: '#fff', fontSize: 9 } },
    series: [{
      type: 'line', data: customerGrowthTrend.churn, smooth: true, symbol: 'none',
      lineStyle: { color: '#FF6B6B', width: 1.5 },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,107,107,0.25)' }, { offset: 1, color: 'rgba(255,107,107,0)' }]) }
    }]
  }, true)
}

const initNetGrowthBarChart = () => {
  if (!netGrowthChartRef.value) return
  netGrowthChart = echarts.init(netGrowthChartRef.value)
  netGrowthChart.setOption({
    grid: { left: 28, right: 4, top: 6, bottom: 14 },
    xAxis: { type: 'category', data: customerGrowthTrend.dates, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.15)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 3 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 7 }, axisLine: { show: false }, axisTick: { show: false } },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00FF88', textStyle: { color: '#fff', fontSize: 9 } },
    series: [{
      type: 'bar', data: customerGrowthTrend.netGrowth, barWidth: '40%',
      itemStyle: { borderRadius: [1, 1, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00FF88' }, { offset: 1, color: 'rgba(0,255,136,0.2)' }]) }
    }]
  }, true)
}

const allCharts = () => [ringChart, gaugeChart, growthChart, churnChart, netGrowthChart]

onMounted(() => {
  initRingChart()
  initGaugeChart()
  initGrowthLineChart()
  initChurnAreaChart()
  initNetGrowthBarChart()
  nextTick(() => allCharts().forEach(c => c?.resize()))
  window.addEventListener('resize', () => allCharts().forEach(c => c?.resize()))
})

onUnmounted(() => {
  allCharts().forEach(c => c?.dispose())
})
</script>

<style lang="scss" scoped>
.customer-analysis {
  display: flex; flex-direction: column; gap: 8px;
  flex: 1;
  height: 100%;
  min-height: 0;
}

.analysis-card {
  background: rgba(10,22,40,0.85);
  border: 1px solid rgba(0,212,255,0.18);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent);
  }
}

// Structure card: fixed proportion
.structure-card {
  flex: 0 0 auto;
  min-height: 0;
}

.trend-card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.card-title {
  padding: 6px 10px;
  font-size: 12px;
  color: #00D4FF;
  font-weight: 600;
  border-bottom: 1px solid rgba(0,212,255,0.1);
  display: flex; align-items: center; gap: 6px;
  flex: 0 0 auto;
  &::before {
    content: ''; width: 3px; height: 11px; background: #00D4FF; border-radius: 2px; flex-shrink: 0;
  }
  .sub-title { font-size: 10px; color: rgba(255,255,255,0.35); font-weight: 400; }
}

.structure-content {
  display: flex; padding: 4px; gap: 4px;
  flex: 1;
  min-height: 0;
  height: 100%;

  .ring-area { width: 130px; flex-shrink: 0; }

  .value-grid {
    flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 3px;
    .value-item {
      background: rgba(0,212,255,0.04); padding: 4px 6px;
      border-radius: 2px; border: 1px solid rgba(0,212,255,0.06);
      display: flex; flex-direction: column; justify-content: center;
      .item-label { font-size: 9px; color: rgba(255,255,255,0.5); }
      .item-value { font-size: 14px; font-weight: 700; color: #00D4FF; font-family: 'DIN Alternate', monospace; }
    }
  }

  .gauge-area { width: 110px; flex-shrink: 0; }
}

.trend-charts {
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
  height: 100%;

  .trend-row {
    display: flex; gap: 4px;
    &:last-child { flex: 1; min-height: 0; }
    .trend-item {
      flex: 1; min-width: 0;
      display: flex; flex-direction: column;
      .trend-label { font-size: 9px; color: rgba(255,255,255,0.4); margin-bottom: 1px; padding-left: 2px; flex: 0 0 auto; }
      .chart-box { flex: 1; min-height: 0; }
      &.full .chart-box { min-height: 0; }
    }
  }
}
</style>