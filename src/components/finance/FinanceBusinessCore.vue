<template>
  <div class="business-core">
    <!-- 模块1：个人金融资产趋势（增强版） -->
    <div class="core-card trend-card">
      <div class="card-title">
        个人金融资产趋势
        <!-- <div class="legend-row">
          <span class="legend-item" v-for="item in legends" :key="item.name">
            <span class="legend-dot" :style="{ background: item.color }"></span>
            {{ item.name }}
          </span>
        </div> -->
      </div>
      <div class="trend-chart" ref="trendChartRef"></div>
    </div>

    <!-- 模块2：区域经营雷达图（视觉中心） -->
    <div class="core-card radar-card">
      <div class="card-title">
        区域经营雷达图
        <span class="radar-subtitle">多维经营评分</span>
        <div class="radar-branch-tags">
          <span
            v-for="(b, i) in radarBranches"
            :key="b.name"
            class="branch-tag"
            :class="{ active: activeRadarIdx === i }"
            @click="focusBranch(i)"
          >{{ b.name }}</span>
        </div>
      </div>
      <div class="radar-body">
        <div class="radar-chart-area" ref="radarChartRef"></div>
        <div class="radar-score-panel">
          <div class="score-header">{{ currentBranch.name }}</div>
          <div class="score-grid">
            <div class="score-item" v-for="(ind, idx) in radarData.indicators" :key="ind.name">
              <span class="score-label">{{ ind.name }}</span>
              <div class="score-bar-wrap">
                <div class="score-bar" :style="{ width: currentBranch.value[idx] + '%', background: scoreColor(currentBranch.value[idx]) }"></div>
              </div>
              <span class="score-val">{{ currentBranch.value[idx] }}</span>
            </div>
          </div>
          <div class="score-avg">
            综合评分：<span class="avg-num">{{ avgScore }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 装饰光效 -->
    <div class="core-glow"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { assetTrend, branchRadarData } from '../../mockData/financeData'

const legends = [
  { name: '存款余额', color: '#00D4FF' },
  { name: 'AUM总资产', color: '#00FF88' },
  { name: '贷款余额', color: '#FFD700' },
  { name: '财富资产', color: '#FF6B6B' }
]

const trendChartRef = ref(null)
const radarChartRef = ref(null)
let trendChart = null
let radarChart = null
let radarTimer = null
let tooltipTimer = null
let tooltipIndex = 0

const radarData = ref(branchRadarData)
const radarBranches = ref(branchRadarData.topBranches)
const activeRadarIdx = ref(0)

const currentBranch = computed(() => radarBranches.value[activeRadarIdx.value])
const avgScore = computed(() => {
  const vals = currentBranch.value.value
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
})

const scoreColor = (val) => {
  if (val >= 85) return 'linear-gradient(90deg, #00FF88, #00D4FF)'
  if (val >= 70) return 'linear-gradient(90deg, #00D4FF, #0099FF)'
  if (val >= 60) return 'linear-gradient(90deg, #FFD700, #FFAA00)'
  return 'linear-gradient(90deg, #FF6B6B, #FF4444)'
}

const focusBranch = (i) => {
  activeRadarIdx.value = i
  updateRadarHighlight()
}

// === 趋势图（增强版）===
const initTrendChart = () => {
  if (!trendChartRef.value) return
  trendChart = echarts.init(trendChartRef.value)

  // 计算最大值标记
  const maxDeposit = Math.max(...assetTrend.deposit)
  const maxDepositIdx = assetTrend.deposit.indexOf(maxDeposit)
  const maxAum = Math.max(...assetTrend.aum)
  const maxAumIdx = assetTrend.aum.indexOf(maxAum)

  trendChart.setOption({
    tooltip: {
      trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.92)',
      borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 11 },
      formatter: (params) => {
        let html = `<div style="font-size:11px;font-weight:600;margin-bottom:2px;">${params[0].axisValue}</div>`
        params.forEach(p => {
          html += `<div style="display:flex;align-items:center;gap:4px;margin:1px 0;font-size:11px;">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${p.color};"></span>
            ${p.seriesName}: <span style="color:${p.color};font-weight:700;">${p.value.toFixed(1)}</span>亿</div>`
        })
        return html
      }
    },
    legend: { show: false },
    grid: { left: 38, right: 16, top: 10, bottom: 18 },
    xAxis: {
      type: 'category', data: assetTrend.months, boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.15)' } },
      axisLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 9 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(0,212,255,0.05)', type: 'dashed' } },
      axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 9 },
      axisLine: { show: false }, axisTick: { show: false }
    },
    series: [
      {
        name: '存款余额', type: 'line', smooth: true, data: assetTrend.deposit,
        symbol: 'none',
        lineStyle: { color: '#00D4FF', width: 2, shadowColor: 'rgba(0,212,255,0.3)', shadowBlur: 6 },
        itemStyle: { color: '#00D4FF' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.25)' }, { offset: 1, color: 'rgba(0,212,255,0)' }]) },
        markPoint: {
          data: [{
            name: '最高', coord: [assetTrend.months[maxDepositIdx], maxDeposit], value: maxDeposit.toFixed(1),
            symbol: 'pin', symbolSize: 35, itemStyle: { color: '#00D4FF' },
            label: { show: true, formatter: '{c}', color: '#fff', fontSize: 8 }
          }]
        }
      },
      {
        name: 'AUM总资产', type: 'line', smooth: true, data: assetTrend.aum,
        symbol: 'none',
        lineStyle: { color: '#00FF88', width: 2, shadowColor: 'rgba(0,255,136,0.3)', shadowBlur: 6 },
        itemStyle: { color: '#00FF88' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,255,136,0.18)' }, { offset: 1, color: 'rgba(0,255,136,0)' }]) },
        markPoint: {
          data: [{
            name: '最高', coord: [assetTrend.months[maxAumIdx], maxAum], value: maxAum.toFixed(1),
            symbol: 'pin', symbolSize: 35, itemStyle: { color: '#00FF88' },
            label: { show: true, formatter: '{c}', color: '#fff', fontSize: 8 }
          }]
        }
      },
      {
        name: '贷款余额', type: 'line', smooth: true, data: assetTrend.loan,
        symbol: 'none',
        lineStyle: { color: '#FFD700', width: 2 },
        itemStyle: { color: '#FFD700' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,215,0,0.12)' }, { offset: 1, color: 'rgba(255,215,0,0)' }]) }
      },
      {
        name: '财富资产', type: 'line', smooth: true, data: assetTrend.wealth,
        symbol: 'none',
        lineStyle: { color: '#FF6B6B', width: 2, type: 'dashed' },
        itemStyle: { color: '#FF6B6B' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(255,107,107,0.12)' }, { offset: 1, color: 'rgba(255,107,107,0)' }]) }
      }
    ],
    animationDuration: 1200,
    animationEasing: 'elasticOut'
  }, true)
}

// === 雷达图 ===
const initRadarChart = () => {
  if (!radarChartRef.value) return
  radarChart = echarts.init(radarChartRef.value)
  updateRadarChart()
}

const updateRadarChart = () => {
  if (!radarChart) return
  const allBranches = radarData.value.topBranches
  const colors = ['#00D4FF', '#00FF88', '#FFD700', '#FF6B6B', '#0066FF', '#0099FF']

  const series = allBranches.map((b, i) => ({
    name: b.name,
    type: 'radar',
    data: [{ value: b.value }],
    symbol: 'circle', symbolSize: i === activeRadarIdx.value ? 8 : 4,
    lineStyle: {
      color: colors[i % colors.length],
      width: i === activeRadarIdx.value ? 3 : 1.5,
      opacity: i === activeRadarIdx.value ? 1 : 0.4
    },
    itemStyle: { color: colors[i % colors.length] },
    areaStyle: i === activeRadarIdx.value
      ? { color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: 'rgba(0,212,255,0.2)' }, { offset: 1, color: 'rgba(0,212,255,0.05)' }]) }
      : { color: 'transparent' }
  }))

  radarChart.setOption({
    tooltip: {
      trigger: 'item', backgroundColor: 'rgba(10,22,40,0.92)',
      borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 10 }
    },
    legend: {
      show: true, orient: 'horizontal', left: 'center', bottom: 0,
      textStyle: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
      itemWidth: 10, itemHeight: 6, icon: 'roundRect',
      inactiveColor: 'rgba(255,255,255,0.15)'
    },
    radar: {
      center: ['50%', '48%'], radius: '65%',
      startAngle: 90, splitNumber: 4,
      indicator: radarData.value.indicators.map(ind => ({
        name: ind.name, max: ind.max
      })),
      axisName: {
        color: 'rgba(255,255,255,0.6)', fontSize: 10
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.04)',
                   'rgba(0,212,255,0.02)', 'rgba(0,212,255,0.04)']
        }
      },
      splitLine: { lineStyle: { color: 'rgba(0,212,255,0.12)' } },
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.2)' } }
    },
    series: series
  }, true)
}

const updateRadarHighlight = () => {
  updateRadarChart()
}

// 自动轮播
const startRadarRotation = () => {
  radarTimer = setInterval(() => {
    activeRadarIdx.value = (activeRadarIdx.value + 1) % radarBranches.value.length
    updateRadarChart()
  }, 4000)
}

// 趋势图 tooltip 轮播
const startTooltipCarousel = () => {
  const total = assetTrend.months.length
  tooltipIndex = 0
  tooltipTimer = setInterval(() => {
    if (!trendChart) return
    // 清除上一个 tooltip
    trendChart.dispatchAction({ type: 'hideTip' })
    // 显示当前数据点的 tooltip
    trendChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: tooltipIndex
    })
    tooltipIndex = (tooltipIndex + 1) % total
  }, 2000)
}

const allCharts = () => [trendChart, radarChart]

onMounted(() => {
  initTrendChart()
  initRadarChart()
  startRadarRotation()
  startTooltipCarousel()
  // 确保 flex 布局完成后重新计算 chart 尺寸
  nextTick(() => allCharts().forEach(c => c?.resize()))
  window.addEventListener('resize', () => allCharts().forEach(c => c?.resize()))
})

onUnmounted(() => {
  if (radarTimer) clearInterval(radarTimer)
  if (tooltipTimer) clearInterval(tooltipTimer)
  allCharts().forEach(c => c?.dispose())
})
</script>

<style lang="scss" scoped>
.business-core {
  display: flex; flex-direction: column; gap: 8px;
  height: 100%; min-height: 0;
  position: relative;
}

.core-card {
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

// 顶部趋势图
.trend-card {
  flex: 1;
  min-height: 0;
  .trend-chart { width: 100%; height: calc(100% - 28px); }
}

// 雷达图区域
.radar-card {
  flex: 0 0 48%;
  min-height: 180px;
}

.radar-subtitle {
  font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 400;
  background: rgba(0,212,255,0.08); padding: 0 5px; border-radius: 5px;
}

.radar-branch-tags {
  display: flex; gap: 3px; margin-left: auto;
  .branch-tag {
    padding: 1px 6px; font-size: 9px; color: rgba(255,255,255,0.35);
    cursor: pointer; border-radius: 5px; transition: all .3s;
    border: 1px solid transparent; white-space: nowrap;
    &:hover { color: #00D4FF; }
    &.active {
      color: #00D4FF; background: rgba(0,212,255,0.1);
      border-color: rgba(0,212,255,0.25);
    }
  }
}

.radar-body {
  display: flex;
  height: calc(100% - 28px);
  min-height: 0;
}

.radar-chart-area {
  flex: 1;
  min-width: 0;
}

.radar-score-panel {
  width: 500px;
  flex-shrink: 0;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0,212,255,0.1);

  .score-header {
    font-size: 12px; font-weight: 600; color: #00D4FF;
    padding-bottom: 4px; margin-bottom: 6px;
    border-bottom: 1px solid rgba(0,212,255,0.1);
    text-shadow: 0 0 8px rgba(0,212,255,0.3);
  }

  .score-grid {
    flex: 1; display: flex; flex-direction: column; gap: 22px;
    .score-item {
      display: flex; align-items: center; gap: 4px;
      .score-label { font-size: 9px; color: rgba(255,255,255,0.5); width: 48px; flex-shrink: 0; }
      .score-bar-wrap { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
      .score-bar { height: 100%; border-radius: 4px; transition: width .5s ease; }
      .score-val { font-size: 9px; color: rgba(255,255,255,0.7); font-family: 'DIN Alternate', monospace; width: 22px; text-align: right; }
    }
  }

  .score-avg {
    margin-top: 6px; padding-top: 4px;
    border-top: 1px solid rgba(0,212,255,0.1);
    font-size: 10px; color: rgba(255,255,255,0.5); text-align: center;
    .avg-num { font-size: 16px; font-weight: 700; color: #00FF88; font-family: 'DIN Alternate', monospace; text-shadow: 0 0 8px rgba(0,255,136,0.4); }
  }
}

// 装饰光晕
.core-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 100px; height: 100px;
  pointer-events: none;
  opacity: 0.08;
  background: radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%);
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.06; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.12; transform: translate(-50%, -50%) scale(1.2); }
}
</style>