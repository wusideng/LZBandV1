<template>
  <div class="product-analysis">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">商品经营分析中心</span>
    </div>

    <!-- TOP10排行 -->
    <div class="section">
      <div class="section-header">TOP10商品交易排行</div>
      <div class="ranking-chart">
        <div ref="rankChartRef" class="chart"></div>
      </div>
    </div>

    <!-- 商品交易表 -->
    <div class="section">
      <div class="section-header">商品交易明细</div>
      <div class="scroll-table" ref="tableRef">
        <div class="table-header">
          <span class="col-rank">排名</span>
          <span class="col-name">商品名称</span>
          <span class="col-amount">交易金额</span>
          <span class="col-ratio">占比</span>
          <span class="col-growth">增长率</span>
        </div>
        <div class="table-body">
          <div v-for="(item, index) in displayProducts" :key="item.name" class="table-row" :class="{ top3: index < 3 }">
            <span class="col-rank">
              <span class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
            </span>
            <span class="col-name">{{ item.name }}</span>
            <span class="col-amount">{{ item.amount.toLocaleString() }}万</span>
            <span class="col-ratio">
              <div class="ratio-bar">
                <div class="ratio-fill" :style="{ width: item.ratio + '%' }"></div>
              </div>
              <span>{{ item.ratio }}%</span>
            </span>
            <span class="col-growth" :class="item.growth > 0 ? 'up' : 'down'">
              {{ item.growth > 0 ? '+' : '' }}{{ item.growth }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 品类占比 -->
    <div class="section">
      <div class="section-header">商品品类占比</div>
      <div ref="pieChartRef" class="pie-chart"></div>
    </div>

    <!-- 热门商品气泡 -->
    <div class="section">
      <div class="section-header">商品热力分析</div>
      <div ref="bubbleChartRef" class="bubble-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { productTop10, categoryRatio } from '../../mockData/baiheData'

const rankChartRef = ref(null)
const pieChartRef = ref(null)
const bubbleChartRef = ref(null)
const tableRef = ref(null)
let rankChart = null, pieChart = null, bubbleChart = null

const displayProducts = computed(() => productTop10)

// 滚动表格
let scrollTimer = null
let scrollIndex = 0

const autoScroll = () => {
  if (!tableRef.value) return
  const rows = tableRef.value.querySelector('.table-body')
  if (!rows) return
  scrollIndex++
  if (scrollIndex >= productTop10.length - 4) scrollIndex = 0
  rows.scrollTop = scrollIndex * 42
}

// TOP10排行柱状图
const initRankChart = () => {
  if (!rankChartRef.value) return
  rankChart = echarts.init(rankChartRef.value)
  const names = productTop10.map(i => i.name).reverse()
  const values = productTop10.map(i => i.amount).reverse()

  rankChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 },
      formatter: (p) => `${p[0].name}<br/>交易金额: ${p[0].value}万元`
    },
    grid: { left: 5, right: 60, top: 5, bottom: 5, containLabel: true },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: values.map((v, i) => ({
        value: v,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: i >= values.length - 3 ? 'rgba(0,255,136,0.4)' : 'rgba(0,212,255,0.4)' },
            { offset: 1, color: i >= values.length - 3 ? '#00FF88' : '#00D4FF' }
          ])
        }
      })),
      barWidth: '55%',
      label: {
        show: true, position: 'right',
        formatter: '{c}万',
        color: 'rgba(255,255,255,0.6)', fontSize: 10
      }
    }],
    animationDuration: 1500
  })
}

// 品类占比环形图
const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: '{b}: {d}%'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 4, borderColor: 'rgba(10,22,40,0.9)', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 12, color: '#fff' } },
      data: categoryRatio.map((item, i) => ({
        ...item,
        itemStyle: {
          color: ['#00D4FF', '#00FF88', '#A855F7', '#FFAA00', '#FF6B6B', '#4C9AFF'][i] || '#00D4FF'
        }
      }))
    }],
    animationDuration: 1500
  })
}

// 气泡图（热力分析）
const initBubbleChart = () => {
  if (!bubbleChartRef.value) return
  bubbleChart = echarts.init(bubbleChartRef.value)
  const data = productTop10.map((item, i) => ({
    name: item.name,
    value: [item.growth, item.ratio, item.amount / 100, i]
  }))

  bubbleChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 },
      formatter: (p) => `${p.data.name}<br/>增长率: ${p.data.value[0]}%<br/>占比: ${p.data.value[1]}%<br/>金额: ${(p.data.value[2] * 100).toFixed(0)}万`
    },
    grid: { left: 5, right: 5, top: 5, bottom: 5 },
    xAxis: { show: false, scale: true },
    yAxis: { show: false, scale: true },
    series: [{
      type: 'scatter',
      data: data.map(d => ({ ...d, itemStyle: { color: ['#00D4FF','#00FF88','#A855F7','#FFAA00','#4C9AFF','#FF6B6B','#38BDF8','#34D399','#F472B6','#FBBF24'][d.value[3]] || '#00D4FF' } })),
      symbolSize: (d) => Math.max(d[2] * 3, 15),
      label: { show: true, formatter: (p) => p.data.name, fontSize: 8, color: 'rgba(255,255,255,0.6)', position: 'top' }
    }]
  })
}

onMounted(() => {
  initRankChart()
  initPieChart()
  initBubbleChart()
  scrollTimer = setInterval(autoScroll, 3000)
  window.addEventListener('resize', () => {
    rankChart?.resize()
    pieChart?.resize()
    bubbleChart?.resize()
  })
})

onUnmounted(() => {
  if (scrollTimer) clearInterval(scrollTimer)
  rankChart?.dispose()
  pieChart?.dispose()
  bubbleChart?.dispose()
})
</script>

<style lang="scss" scoped>
.product-analysis {
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

  .ranking-chart { height: 220px; .chart { width: 100%; height: 100%; } }
  .pie-chart { height: 180px; }
  .bubble-chart { height: 180px; }
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
    max-height: 260px; overflow-y: auto; transition: scroll-top 0.5s;
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
  }

  .table-row {
    display: flex; align-items: center; gap: 4px; padding: 8px 4px;
    border-bottom: 1px solid rgba(0,212,255,0.05);
    font-size: 12px; transition: all 0.3s;
    &:hover { background: rgba(0,212,255,0.08); }
    &.top3 { background: rgba(0,212,255,0.04); }
  }

  .col-rank { width: 40px; text-align: center; }
  .col-name { flex: 1; color: rgba(255,255,255,0.8); }
  .col-amount { width: 80px; text-align: right; color: #00D4FF; font-weight: 600; }
  .col-ratio { width: 90px; display: flex; align-items: center; gap: 4px; }
  .col-growth { width: 60px; text-align: right; font-weight: 600; &.up { color: #00FF88; } &.down { color: #FF6B6B; } }

  .rank-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
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
</style>