<template>
  <div class="loan-wealth">
    <!-- 模块1：贷款经营 -->
    <div class="lw-card loan-card">
      <div class="card-title">贷款经营</div>
      <div class="loan-grid">
        <div class="loan-value-item">
          <span class="lv-label">个人贷款余额</span>
          <span class="lv-value">{{ animatedLoanBalance }}</span>
          <span class="lv-unit">亿元</span>
        </div>
        <div class="loan-value-item">
          <span class="lv-label">消费贷余额</span>
          <span class="lv-value">{{ animatedConsumerLoan }}</span>
          <span class="lv-unit">亿元</span>
        </div>
        <div class="loan-value-item">
          <span class="lv-label">经营贷余额</span>
          <span class="lv-value">{{ animatedBusinessLoan }}</span>
          <span class="lv-unit">亿元</span>
        </div>
        <div class="loan-value-item">
          <span class="lv-label">房贷余额</span>
          <span class="lv-value">{{ animatedMortgageLoan }}</span>
          <span class="lv-unit">亿元</span>
        </div>
      </div>
      <div class="loan-gauge-row">
        <div class="gauge-item" ref="nplGaugeRef"></div>
        <div class="gauge-item" ref="overdueGaugeRef"></div>
      </div>
      <div class="loan-struct" ref="loanStructRef"></div>
    </div>

    <!-- 模块2：财富管理 -->
    <div class="lw-card wealth-card">
      <div class="card-title">财富管理</div>
      <div class="wealth-top-row">
        <div class="wealth-value-item">
          <span class="wv-label">理财余额</span>
          <span class="wv-value">{{ animatedFinancialBalance }}</span>
          <span class="wv-unit">亿元</span>
        </div>
        <div class="wealth-struct" ref="wealthStructRef"></div>
      </div>
      <div class="wealth-sales-row">
        <div class="sale-item" ref="fundChartRef"></div>
        <div class="sale-item" ref="insuranceChartRef"></div>
      </div>
      <div class="wealth-growth-row">
        <div class="growth-label">财富客户增长</div>
        <div class="growth-chart" ref="wealthGrowthRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { loanData, wealthData } from '../../mockData/financeData'

const animatedLoanBalance = ref('0')
const animatedConsumerLoan = ref('0')
const animatedBusinessLoan = ref('0')
const animatedMortgageLoan = ref('0')
const animatedFinancialBalance = ref('0')

const nplGaugeRef = ref(null)
const overdueGaugeRef = ref(null)
const loanStructRef = ref(null)
const wealthStructRef = ref(null)
const fundChartRef = ref(null)
const insuranceChartRef = ref(null)
const wealthGrowthRef = ref(null)

let nplGauge = null, overdueGauge = null, loanStruct = null
let wealthStruct = null, fundChart = null, insuranceChart = null, wealthGrowth = null

const animateVal = (target, setter) => {
  const duration = 1600
  const start = Date.now()
  const animate = () => {
    const p = Math.min((Date.now() - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    setter((target * ease).toFixed(1))
    if (p < 1) requestAnimationFrame(animate)
  }
  animate()
}

const initGauge = (ref, val, name, max, colors) => {
  if (!ref) return null
  const chart = echarts.init(ref)
  chart.setOption({
    series: [{
      type: 'gauge', center: ['50%', '55%'], radius: '85%',
      startAngle: 220, endAngle: -40, min: 0, max,
      progress: { show: true, width: 5, roundCap: true, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: colors } } },
      axisLine: { lineStyle: { width: 5, color: [[1, 'rgba(0,212,255,0.1)']] } },
      axisTick: { show: false }, splitLine: { length: 3, lineStyle: { width: 1, color: 'rgba(0,212,255,0.15)' } },
      axisLabel: { distance: 4, color: 'rgba(255,255,255,0.25)', fontSize: 6 },
      detail: { valueAnimation: true, formatter: '{value}%', color: '#00D4FF', fontSize: 12, fontFamily: 'DIN Alternate', offsetCenter: [0, '25%'] },
      title: { offsetCenter: [0, '58%'], fontSize: 7, color: 'rgba(255,255,255,0.4)' },
      pointer: { show: true, length: '45%', width: 2, itemStyle: { color: '#00D4FF' } },
      data: [{ value: val, name }]
    }]
  }, true)
  return chart
}

const initLoanStructChart = () => {
  if (!loanStructRef.value) return
  loanStruct = echarts.init(loanStructRef.value)
  loanStruct.setOption({
    series: [{
      type: 'pie', radius: ['40%', '72%'], center: ['50%', '50%'],
      label: { show: true, color: 'rgba(255,255,255,0.5)', fontSize: 7, formatter: '{d}%' },
      labelLine: { length: 3, length2: 2, lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      emphasis: { scale: false }, data: loanData.loanStructure,
      itemStyle: { borderColor: '#0A1628', borderWidth: 1 },
      color: ['#00D4FF', '#0099FF', '#FFD700', '#0066FF']
    }]
  }, true)
}

const initWealthStructChart = () => {
  if (!wealthStructRef.value) return
  wealthStruct = echarts.init(wealthStructRef.value)
  wealthStruct.setOption({
    series: [{
      type: 'pie', radius: ['45%', '68%'], center: ['50%', '50%'],
      label: { show: true, color: 'rgba(255,255,255,0.4)', fontSize: 6, formatter: '{d}%' },
      labelLine: { length: 3, length2: 2, lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      emphasis: { scale: false }, data: wealthData.wealthProductStructure,
      itemStyle: { borderColor: '#0A1628', borderWidth: 1 },
      color: ['#FFD700', '#00D4FF', '#00FF88', '#FF6B6B', '#0066FF']
    }]
  }, true)
}

const initFundChart = () => {
  if (!fundChartRef.value) return
  fundChart = echarts.init(fundChartRef.value)
  fundChart.setOption({
    grid: { left: 22, right: 4, top: 10, bottom: 12 },
    xAxis: { type: 'category', data: wealthData.fundSalesBreakdown.map(d => d.name), axisLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.25)', fontSize: 6 }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'bar', data: wealthData.fundSalesBreakdown.map(d => d.value), barWidth: '50%',
      itemStyle: { borderRadius: [1, 1, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00D4FF' }, { offset: 1, color: 'rgba(0,212,255,0.2)' }]) }
    }]
  }, true)
}

const initInsuranceChart = () => {
  if (!insuranceChartRef.value) return
  insuranceChart = echarts.init(insuranceChartRef.value)
  insuranceChart.setOption({
    grid: { left: 22, right: 4, top: 10, bottom: 12 },
    xAxis: { type: 'category', data: wealthData.insuranceSalesBreakdown.map(d => d.name), axisLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.25)', fontSize: 6 }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'bar', data: wealthData.insuranceSalesBreakdown.map(d => d.value), barWidth: '50%',
      itemStyle: { borderRadius: [1, 1, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#FFD700' }, { offset: 1, color: 'rgba(255,215,0,0.2)' }]) }
    }]
  }, true)
}

const initWealthGrowthChart = () => {
  if (!wealthGrowthRef.value) return
  wealthGrowth = echarts.init(wealthGrowthRef.value)
  wealthGrowth.setOption({
    grid: { left: 24, right: 4, top: 6, bottom: 10 },
    xAxis: { type: 'category', data: ['12月','1月','2月','3月','4月','5月','6月'], axisLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.03)' } }, axisLabel: { color: 'rgba(255,255,255,0.25)', fontSize: 6 }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'line', data: wealthData.wealthCustomerGrowth, smooth: true, symbol: 'none',
      lineStyle: { color: '#00FF88', width: 1.5 }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,255,136,0.2)' }, { offset: 1, color: 'rgba(0,255,136,0)' }]) }
    }]
  }, true)
}

const allCharts = () => [nplGauge, overdueGauge, loanStruct, wealthStruct, fundChart, insuranceChart, wealthGrowth]

onMounted(() => {
  animateVal(loanData.totalBalance, v => animatedLoanBalance.value = v)
  animateVal(loanData.consumerLoan, v => animatedConsumerLoan.value = v)
  animateVal(loanData.businessLoan, v => animatedBusinessLoan.value = v)
  animateVal(loanData.mortgageLoan, v => animatedMortgageLoan.value = v)
  animateVal(wealthData.financialBalance, v => animatedFinancialBalance.value = v)

  nplGauge = initGauge(nplGaugeRef.value, loanData.nonPerformingRate, '不良率', 5, [{ offset: 0, color: '#00FF88' }, { offset: 0.5, color: '#FFD700' }, { offset: 1, color: '#FF6B6B' }])
  overdueGauge = initGauge(overdueGaugeRef.value, loanData.overdueRate, '逾期率', 3, [{ offset: 0, color: '#00D4FF' }, { offset: 0.5, color: '#FFD700' }, { offset: 1, color: '#FF6B6B' }])
  initLoanStructChart()
  initWealthStructChart()
  initFundChart()
  initInsuranceChart()
  initWealthGrowthChart()

  nextTick(() => allCharts().forEach(c => c?.resize()))
  window.addEventListener('resize', () => allCharts().forEach(c => c?.resize()))
})

onUnmounted(() => {
  allCharts().forEach(c => c?.dispose())
})
</script>

<style lang="scss" scoped>
.loan-wealth {
  display: flex; flex-direction: column; gap: 8px;
  height: 100%;
  min-height: 0;
}

.lw-card {
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

.loan-card {
  flex: 0 0 54%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.wealth-card {
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
}

// 贷款经营
.loan-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 3px; padding: 4px;
  .loan-value-item {
    background: rgba(0,212,255,0.04); padding: 3px 6px;
    border-radius: 2px; border: 1px solid rgba(0,212,255,0.06);
    display: flex; flex-direction: column;
    .lv-label { font-size: 8px; color: rgba(255,255,255,0.5); line-height: 1.2; }
    .lv-value { font-size: 15px; font-weight: 700; color: #00D4FF; font-family: 'DIN Alternate', monospace; }
    .lv-unit { font-size: 7px; color: rgba(255,255,255,0.25); }
  }
}

.loan-gauge-row {
  display: flex; gap: 3px; padding: 0 4px;
  flex: 1;
  min-height: 0;
  .gauge-item { flex: 1; height: 100%; }
}

.loan-struct { flex: 0 0 90px; padding: 0 4px 2px; }

// 财富管理
.wealth-top-row {
  display: flex; gap: 4px; padding: 4px; align-items: center;
  .wealth-value-item {
    width: 70px; flex-shrink: 0;
    background: rgba(255,215,0,0.06); padding: 4px 6px;
    border-radius: 2px; border: 1px solid rgba(255,215,0,0.12);
    .wv-label { font-size: 8px; color: rgba(255,255,255,0.5); }
    .wv-value { font-size: 16px; font-weight: 700; color: #FFD700; font-family: 'DIN Alternate', monospace; text-shadow: 0 0 8px rgba(255,215,0,0.2); }
    .wv-unit { font-size: 7px; color: rgba(255,255,255,0.25); }
  }
  .wealth-struct { flex: 1; height: 60px; }
}

.wealth-sales-row {
  display: flex; gap: 4px; padding: 0 4px 4px;
  .sale-item {
    flex: 1; height: 50px;
    background: rgba(0,212,255,0.02); border-radius: 2px;
    border: 1px solid rgba(0,212,255,0.06);
  }
}

.wealth-growth-row {
  padding: 0 4px 4px;
  flex: 1;
  min-height: 0;
  .growth-label { font-size: 9px; color: rgba(255,255,255,0.4); margin-bottom: 1px; flex: 0 0 auto; }
  .growth-chart { height: calc(100% - 14px); min-height: 35px; }
}
</style>