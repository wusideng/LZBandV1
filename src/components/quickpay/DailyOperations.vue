<template>
  <div class="daily-operations">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">日交易运营区</span>
    </div>

    <!-- 核心指标 -->
    <div class="metrics-section">
      <div class="metric-card primary">
        <div class="card-glow"></div>
        <div class="card-content">
          <div class="metric-icon">💰</div>
          <div class="metric-body">
            <div class="metric-label">日交易金额</div>
            <div class="metric-value">
              <span class="number">{{ animatedAmount }}</span>
              <span class="unit">亿元</span>
            </div>
          </div>
          <div class="metric-trend up">
            <span>↑ {{ dailyData.trendValue }}</span>
          </div>
        </div>
      </div>

      <div class="metric-card accent">
        <div class="card-glow"></div>
        <div class="card-content">
          <div class="metric-icon">📊</div>
          <div class="metric-body">
            <div class="metric-label">日交易笔数</div>
            <div class="metric-value">
              <span class="number">{{ animatedTransactions }}</span>
              <span class="unit">万笔</span>
            </div>
          </div>
          <div class="metric-trend up">
            <span>↑ {{ dailyData.trendValue }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 7日趋势图 -->
    <div class="trend-section">
      <div class="section-header">近7日趋势分析</div>
      <div ref="trendChartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { dailyData, weeklyTrend } from '../../mockData/quickpayData'

const trendChartRef = ref(null)
let trendChart = null

const animatedAmount = ref('0.00')
const animatedTransactions = ref('0')

const animateNumber = (target, refVar, isFloat = true, duration = 2000) => {
  const start = Date.now()
  const cb = () => {
    const p = Math.min((Date.now() - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    const cur = target * ease
    refVar.value = isFloat ? cur.toFixed(2) : Math.floor(cur).toLocaleString()
    if (p < 1) requestAnimationFrame(cb)
  }
  requestAnimationFrame(cb)
}

const initTrendChart = () => {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 }
    },
    legend: {
      data: ['交易笔数', '交易金额'],
      textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
      top: 5
    },
    grid: { left: 40, right: 15, top: 30, bottom: 25 },
    xAxis: {
      type: 'category',
      data: weeklyTrend.dates,
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 }
    },
    yAxis: [
      {
        type: 'value',
        name: '万笔',
        nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
        splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } }
      },
      {
        type: 'value',
        name: '亿',
        nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '交易笔数',
        type: 'line',
        yAxisIndex: 0,
        data: weeklyTrend.transactions,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00D4FF', width: 2 },
        itemStyle: { color: '#00D4FF' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,212,255,0.3)' },
            { offset: 1, color: 'rgba(0,212,255,0.02)' }
          ])
        }
      },
      {
        name: '交易金额',
        type: 'bar',
        yAxisIndex: 1,
        data: weeklyTrend.amount,
        barWidth: '35%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00FF88' },
            { offset: 1, color: 'rgba(0,255,136,0.2)' }
          ]),
          borderRadius: [3, 3, 0, 0]
        }
      }
    ],
    animationDuration: 1500
  })
}

onMounted(() => {
  animateNumber(dailyData.amount, animatedAmount, true)
  animateNumber(dailyData.transactions, animatedTransactions, false)
  initTrendChart()
  window.addEventListener('resize', () => trendChart?.resize())
})

onUnmounted(() => {
  trendChart?.dispose()
})
</script>

<style lang="scss" scoped>
.daily-operations {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
}

.panel-title {
  display: flex; align-items: center; gap: 10px;
  .title-line { width: 3px; height: 16px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }
  .title-text { font-size: 15px; font-weight: 600; color: #fff; }
}

.metrics-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-card {
  position: relative;
  padding: 1px;
  border-radius: 8px;
  overflow: hidden;

  .card-glow {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity .3s;
  }

  .card-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: rgba(10,22,40,0.85);
    border-radius: 7px;
  }

  .metric-icon { font-size: 28px; }

  .metric-body { flex: 1; }

  .metric-label { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 4px; }

  .metric-value {
    display: flex; align-items: baseline; gap: 4px;
    .number { font-size: 28px; font-weight: 700; font-family: 'DIN Alternate', monospace; }
    .unit { font-size: 12px; color: rgba(255,255,255,0.5); }
  }

  .metric-trend {
    padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: 600;
    &.up { background: rgba(0,255,136,0.12); color: #00FF88; }
    &.down { background: rgba(255,107,107,0.12); color: #FF6B6B; }
  }

  &.primary {
    .card-glow { background: radial-gradient(circle at center, rgba(0,212,255,0.15), transparent 70%); }
    .number { color: #00D4FF; text-shadow: 0 0 20px rgba(0,212,255,0.5); }
    .card-border { border-color: rgba(0,212,255,0.3); }
    &:hover .card-glow { opacity: 1; }
  }

  &.accent {
    .card-glow { background: radial-gradient(circle at center, rgba(0,255,136,0.15), transparent 70%); }
    .number { color: #00FF88; text-shadow: 0 0 20px rgba(0,255,136,0.5); }
    .card-border { border-color: rgba(0,255,136,0.3); }
    &:hover .card-glow { opacity: 1; }
  }
}

.trend-section {
  flex: 1;
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;

  .section-header {
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 10px;
    padding-bottom: 8px; border-bottom: 1px solid rgba(0,212,255,0.1);
  }

  .chart { width: 100%; height: 100%; min-height: 200px; }
}
</style>