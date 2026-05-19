<template>
  <div class="trend-analysis">
    <!-- 左侧：近7日趋势 -->
    <div class="trend-section weekly">
      <div class="section-header">
        <span class="header-line"></span>
        <span class="header-title">近7日趋势分析</span>
      </div>
      <div class="chart-container">
        <div ref="weeklyChartRef" class="chart"></div>
      </div>
    </div>

    <!-- 中间：近6月经营趋势（核心区域） -->
    <div class="trend-section monthly core">
      <div class="section-header">
        <span class="header-line"></span>
        <span class="header-title">近6月经营趋势</span>
        <span class="core-badge">核心指标</span>
      </div>
      <div class="chart-container large">
        <div ref="monthlyChartRef" class="chart"></div>
      </div>
      <div class="growth-indicator">
        <div class="growth-item">
          <span class="label">月交易笔数增长</span>
          <span class="value up">+18.6%</span>
        </div>
        <div class="growth-item">
          <span class="label">月交易金额增长</span>
          <span class="value up">+24.3%</span>
        </div>
      </div>
    </div>

    <!-- 右侧：近3年战略趋势 -->
    <div class="trend-section yearly">
      <div class="section-header">
        <span class="header-line"></span>
        <span class="header-title">近3年战略趋势</span>
      </div>
      <div class="chart-container">
        <div ref="yearlyChartRef" class="chart"></div>
      </div>
      <div class="strategy-summary">
        <div class="summary-item">
          <div class="summary-value">35.2%</div>
          <div class="summary-label">3年复合增长率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { weeklyTrend, monthlyTrend, yearlyTrend } from '../../mockData/merchantData'

const weeklyChartRef = ref(null)
const monthlyChartRef = ref(null)
const yearlyChartRef = ref(null)

let weeklyChart = null
let monthlyChart = null
let yearlyChart = null

const initWeeklyChart = () => {
  if (!weeklyChartRef.value) return
  weeklyChart = echarts.init(weeklyChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: '#00D4FF',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 12 }
    },
    legend: {
      data: ['交易笔数', '交易金额'],
      textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
      top: 5,
      itemWidth: 15,
      itemHeight: 10
    },
    grid: {
      left: 45,
      right: 15,
      top: 35,
      bottom: 25
    },
    xAxis: {
      type: 'category',
      data: weeklyTrend.transactions.map(item => item.date),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 }
    },
    yAxis: [
      {
        type: 'value',
        name: '万笔',
        nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10, padding: [0, 0, 0, -25] },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } }
      },
      {
        type: 'value',
        name: '亿元',
        nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '交易笔数',
        type: 'line',
        yAxisIndex: 0,
        data: weeklyTrend.transactions.map(item => item.value),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00D4FF', width: 2 },
        itemStyle: { color: '#00D4FF' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
          ])
        }
      },
      {
        name: '交易金额',
        type: 'bar',
        yAxisIndex: 1,
        data: weeklyTrend.amount.map(item => item.value),
        barWidth: '40%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00FF88' },
            { offset: 1, color: 'rgba(0, 255, 136, 0.2)' }
          ]),
          borderRadius: [3, 3, 0, 0]
        }
      }
    ],
    animationDuration: 1500
  }
  weeklyChart.setOption(option)
}

const initMonthlyChart = () => {
  if (!monthlyChartRef.value) return
  monthlyChart = echarts.init(monthlyChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: '#00D4FF',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 12 }
    },
    legend: {
      data: ['交易笔数(万笔)', '交易金额(万元)'],
      textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
      top: 10
    },
    grid: {
      left: 60,
      right: 60,
      top: 50,
      bottom: 40
    },
    xAxis: {
      type: 'category',
      data: monthlyTrend.transactions.map(item => item.month),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '交易笔数(万笔)',
        nameTextStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } }
      },
      {
        type: 'value',
        name: '交易金额(万元)',
        nameTextStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '交易笔数(万笔)',
        type: 'bar',
        yAxisIndex: 0,
        data: monthlyTrend.transactions.map(item => item.value),
        barWidth: '35%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00D4FF' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.2)' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '交易金额(万元)',
        type: 'line',
        yAxisIndex: 1,
        data: monthlyTrend.amount.map(item => item.value),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#00FF88', width: 3 },
        itemStyle: { 
          color: '#00FF88',
          borderWidth: 2,
          borderColor: '#0A1628'
        }
      }
    ],
    animationDuration: 2000
  }
  monthlyChart.setOption(option)
}

const initYearlyChart = () => {
  if (!yearlyChartRef.value) return
  yearlyChart = echarts.init(yearlyChartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 40, 0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 12 }
    },
    grid: {
      left: 50,
      right: 20,
      top: 30,
      bottom: 50
    },
    xAxis: {
      type: 'category',
      data: yearlyTrend.transactions.map(item => item.year),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } }
    },
    series: [
      {
        type: 'bar',
        data: yearlyTrend.amount.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: index === 2 ? '#00FFFF' : '#00D4FF' },
              { offset: 1, color: index === 2 ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 212, 255, 0.2)' }
            ]),
            borderRadius: [6, 6, 0, 0]
          }
        })),
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          formatter: '{c}亿',
          color: '#00D4FF',
          fontSize: 11
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'elasticOut'
  }
  yearlyChart.setOption(option)
}

onMounted(() => {
  initWeeklyChart()
  initMonthlyChart()
  initYearlyChart()

  const handleResize = () => {
    weeklyChart?.resize()
    monthlyChart?.resize()
    yearlyChart?.resize()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  weeklyChart?.dispose()
  monthlyChart?.dispose()
  yearlyChart?.dispose()
})
</script>

<style lang="scss" scoped>
.trend-analysis {
  display: flex;
  gap: 15px;
  padding: 15px 20px;
  flex: 1;
  min-height: 0;
}

.trend-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 212, 255, 0.03);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 8px;
  padding: 15px;

  &.core {
    flex: 1.5;
    background: linear-gradient(180deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 212, 255, 0.02) 100%);
    border-color: rgba(0, 212, 255, 0.25);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  .header-line {
    width: 3px;
    height: 16px;
    background: linear-gradient(180deg, #00D4FF, #0088FF);
    border-radius: 2px;
  }

  .header-title {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }

  .core-badge {
    margin-left: auto;
    padding: 2px 10px;
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.2), rgba(0, 255, 136, 0.2));
    border: 1px solid rgba(0, 212, 255, 0.4);
    border-radius: 12px;
    font-size: 11px;
    color: #00D4FF;
  }
}

.chart-container {
  flex: 1;
  min-height: 0;

  &.large {
    min-height: 280px;
  }

  .chart {
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
}

.growth-indicator {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-top: 15px;
  margin-top: 10px;
  border-top: 1px solid rgba(0, 212, 255, 0.1);

  .growth-item {
    text-align: center;

    .label {
      display: block;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 5px;
    }

    .value {
      font-size: 20px;
      font-weight: 700;

      &.up {
        color: #00FF88;
      }
    }
  }
}

.strategy-summary {
  padding-top: 15px;
  margin-top: 10px;
  border-top: 1px solid rgba(0, 212, 255, 0.1);

  .summary-item {
    text-align: center;

    .summary-value {
      font-size: 28px;
      font-weight: 700;
      color: #00D4FF;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }

    .summary-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 5px;
    }
  }
}
</style>
