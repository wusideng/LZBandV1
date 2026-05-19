<template>
  <div class="merchant-analysis">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">商户经营分析中心</span>
    </div>

    <!-- TOP10商户排行 -->
    <div class="section">
      <div class="section-header">TOP10商户交易排行</div>
      <div class="scroll-table" ref="tableRef">
        <div class="table-header">
          <span class="col-rank">排名</span>
          <span class="col-name">商户名称</span>
          <span class="col-count">交易笔数</span>
          <span class="col-amount">交易金额</span>
          <span class="col-ratio">占比</span>
        </div>
        <div class="table-body">
          <div v-for="(item, index) in displayMerchants" :key="item.name" class="table-row" :class="{ top3: index < 3 }">
            <span class="col-rank">
              <span class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
            </span>
            <span class="col-name">{{ item.name }}</span>
            <span class="col-count">{{ item.count }}万</span>
            <span class="col-amount">{{ item.amount.toLocaleString() }}万</span>
            <span class="col-ratio">
              <div class="ratio-bar">
                <div class="ratio-fill" :style="{ width: item.ratio + '%' }"></div>
              </div>
              <span>{{ item.ratio }}%</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 商户贡献分析（玫瑰图） -->
    <div class="section">
      <div class="section-header">商户贡献分析</div>
      <div ref="roseChartRef" class="chart"></div>
    </div>

    <!-- 商户活跃分析（仪表盘） -->
    <div class="section">
      <div class="section-header">商户活跃分析</div>
      <div class="gauge-wrapper">
        <div ref="gaugeChartRef" class="gauge-chart"></div>
        <div class="gauge-info">
          <span class="gauge-value">{{ activityData.activityIndex }}%</span>
          <span class="gauge-label">活跃指数</span>
          <div class="gauge-meta">
            <div>日活跃: {{ activityData.dailyActive }}万</div>
            <div>周活跃: {{ activityData.weeklyActive }}万</div>
            <div>月活跃: {{ activityData.monthlyActive }}万</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { merchantTop10, activityData } from '../../mockData/baiheData'

const roseChartRef = ref(null)
const gaugeChartRef = ref(null)
const tableRef = ref(null)
let roseChart = null, gaugeChart = null

const displayMerchants = computed(() => merchantTop10)

let scrollTimer = null
let scrollIndex = 0

const autoScroll = () => {
  if (!tableRef.value) return
  const rows = tableRef.value.querySelector('.table-body')
  if (!rows) return
  scrollIndex++
  if (scrollIndex >= merchantTop10.length - 4) scrollIndex = 0
  rows.scrollTop = scrollIndex * 42
}

// 南丁格尔玫瑰图
const initRoseChart = () => {
  if (!roseChartRef.value) return
  roseChart = echarts.init(roseChartRef.value)
  roseChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 },
      formatter: '{b}: {c}万 ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: ['20%', '80%'],
      center: ['50%', '50%'],
      roseType: 'area',
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 4, borderColor: 'rgba(10,22,40,0.9)', borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 9,
        color: 'rgba(255,255,255,0.6)'
      },
      emphasis: { label: { show: true, fontSize: 11, color: '#fff' } },
      data: merchantTop10.map((item, i) => ({
        name: item.name,
        value: item.amount,
        itemStyle: {
          color: ['#00D4FF','#00FF88','#A855F7','#FFAA00','#4C9AFF','#FF6B6B','#38BDF8','#34D399','#F472B6','#FBBF24'][i] || '#00D4FF'
        }
      }))
    }],
    animationDuration: 2000
  })
}

// 仪表盘
const initGaugeChart = () => {
  if (!gaugeChartRef.value) return
  gaugeChart = echarts.init(gaugeChartRef.value)
  gaugeChart.setOption({
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      center: ['50%', '55%'],
      radius: '85%',
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      splitNumber: 5,
      progress: {
        show: true,
        width: 10,
        itemStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#00D4FF' },
              { offset: 1, color: '#00FF88' }
            ]
          }
        }
      },
      axisLine: {
        lineStyle: { width: 10, color: [[1, 'rgba(0,212,255,0.15)']] }
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: { show: false },
      data: [{ value: activityData.activityIndex }],
      pointer: {
        width: 4,
        length: '60%',
        itemStyle: { color: '#00D4FF' }
      },
      title: { show: false }
    }],
    animationDuration: 2000
  })
}

onMounted(() => {
  initRoseChart()
  initGaugeChart()
  scrollTimer = setInterval(autoScroll, 3000)
  window.addEventListener('resize', () => {
    roseChart?.resize()
    gaugeChart?.resize()
  })
})

onUnmounted(() => {
  if (scrollTimer) clearInterval(scrollTimer)
  roseChart?.dispose()
  gaugeChart?.dispose()
})
</script>

<style lang="scss" scoped>
.merchant-analysis {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.panel-title {
  display: flex; align-items: center; gap: 10px;
  .title-line { width: 3px; height: 16px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }
  .title-text { font-size: 15px; font-weight: 600; color: #fff; }
}

.section {
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;

  .section-header {
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 10px;
    padding-bottom: 6px; border-bottom: 1px solid rgba(0,212,255,0.1);
  }

  .chart { width: 100%; height: 200px; }
}

// 滚动表格
.scroll-table {
  overflow: hidden;

  .table-header {
    display: flex; gap: 4px; padding: 8px 4px;
    font-size: 11px; color: rgba(255,255,255,0.5);
    border-bottom: 1px solid rgba(0,212,255,0.1);
  }

  .table-body {
    max-height: 200px; overflow-y: auto;
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
  }

  .table-row {
    display: flex; align-items: center; gap: 4px; padding: 8px 4px;
    border-bottom: 1px solid rgba(0,212,255,0.05);
    font-size: 11px; transition: all 0.3s;
    &:hover { background: rgba(0,212,255,0.08); }
    &.top3 { background: rgba(0,212,255,0.04); }
  }

  .col-rank { width: 30px; text-align: center; }
  .col-name { flex: 1; color: rgba(255,255,255,0.8); }
  .col-count { width: 60px; text-align: right; color: rgba(255,255,255,0.6); }
  .col-amount { width: 70px; text-align: right; color: #00D4FF; font-weight: 600; }
  .col-ratio { width: 70px; display: flex; align-items: center; gap: 4px; }

  .rank-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border-radius: 50%;
    font-size: 10px; font-weight: 700;
    &.rank-1 { background: linear-gradient(135deg, #FFAA00, #FF8800); color: #fff; }
    &.rank-2 { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); color: #fff; }
    &.rank-3 { background: linear-gradient(135deg, #CD7F32, #B8860B); color: #fff; }
    &:not(.rank-1):not(.rank-2):not(.rank-3) { background: rgba(0,212,255,0.15); color: rgba(255,255,255,0.6); }
  }

  .ratio-bar {
    flex: 1; height: 4px; background: rgba(0,212,255,0.1); border-radius: 2px;
    .ratio-fill { height: 100%; background: linear-gradient(90deg, #00D4FF, #00FF88); border-radius: 2px; transition: width 0.5s; }
  }
}

// 仪表盘
.gauge-wrapper {
  display: flex; align-items: center; gap: 15px;

  .gauge-chart { width: 140px; height: 140px; flex-shrink: 0; }

  .gauge-info {
    flex: 1;
    .gauge-value { font-size: 32px; font-weight: 700; color: #00D4FF; text-shadow: 0 0 20px rgba(0,212,255,0.5); display: block; }
    .gauge-label { font-size: 12px; color: rgba(255,255,255,0.5); display: block; margin-bottom: 10px; }
    .gauge-meta {
      display: flex; flex-direction: column; gap: 4px;
      font-size: 11px; color: rgba(255,255,255,0.6);
    }
  }
}
</style>