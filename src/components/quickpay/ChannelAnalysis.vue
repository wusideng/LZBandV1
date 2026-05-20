<template>
  <div class="channel-analysis">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">渠道支付分析区</span>
    </div>

    <div class="channel-list">
      <div v-for="(channel, index) in channels" :key="index" class="channel-card" :class="channel.type">
        <div class="card-glow"></div>
        <div class="card-content">
          <div class="channel-header">
            <span class="channel-icon">{{ channel.icon }}</span>
            <span class="channel-name">{{ channel.name }}</span>
          </div>

          <div class="channel-metrics">
            <div class="metric-row">
              <span class="metric-label">交易金额</span>
              <span class="metric-value">{{ channel.amount }}亿</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">交易笔数</span>
              <span class="metric-value">{{ channel.transactions }}万</span>
            </div>
          </div>

          <div class="channel-ratio">
            <div class="ratio-label">
              <span>占比</span>
              <span class="ratio-value">{{ channel.ratio }}%</span>
            </div>
            <div class="ratio-bar">
              <div class="ratio-fill" :style="{ width: channel.ratio + '%' }"></div>
            </div>
          </div>

          <div class="channel-trend" :class="channel.trend">
            <span class="trend-icon">{{ channel.trend === 'up' ? '▲' : '▼' }}</span>
            <span class="trend-value">{{ channel.growth }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 渠道占比环形图 -->
    <div class="pie-section">
      <div class="section-header">渠道支付占比</div>
      <div ref="pieChartRef" class="pie-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { channelData } from '../../mockData/quickpayData'

const pieChartRef = ref(null)
let pieChart = null

const channels = channelData

const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 },
      formatter: '{b}: {d}%'
    },
    legend: {
      orient: 'vertical',
      right: 5,
      top: 'center',
      textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [{
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 4, borderColor: 'rgba(10,22,40,0.9)', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 11, color: '#fff' } },
      data: channelData.map((item, i) => ({
        name: item.name,
        value: item.amount,
        itemStyle: { color: ['#00D4FF', '#00FF88', '#A855F7', '#FFAA00'][i] }
      }))
    }],
    animationDuration: 1500
  })
}

onMounted(() => {
  initPieChart()
  window.addEventListener('resize', () => pieChart?.resize())
})

onUnmounted(() => {
  pieChart?.dispose()
})
</script>

<style lang="scss" scoped>
.channel-analysis {
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

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.channel-card {
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
    padding: 12px;
    background: rgba(10,22,40,0.85);
    border-radius: 7px;
  }

  .channel-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
    .channel-icon { font-size: 24px; }
    .channel-name { font-size: 14px; font-weight: 600; color: #fff; }
  }

  .channel-metrics {
    display: flex; gap: 15px; margin-bottom: 8px;
    .metric-row {
      flex: 1;
      .metric-label { display: block; font-size: 10px; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
      .metric-value { font-size: 16px; font-weight: 600; color: #fff; font-family: 'DIN Alternate', monospace; }
    }
  }

  .channel-ratio {
    margin-bottom: 8px;
    .ratio-label {
      display: flex; justify-content: space-between; margin-bottom: 4px;
      span { font-size: 10px; color: rgba(255,255,255,0.5); }
      .ratio-value { color: #00D4FF; font-weight: 600; }
    }
    .ratio-bar {
      height: 4px; background: rgba(0,212,255,0.1); border-radius: 2px;
      .ratio-fill { height: 100%; border-radius: 2px; transition: width 0.5s; }
    }
  }

  .channel-trend {
    position: absolute; top: 12px; right: 12px;
    padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
    &.up { background: rgba(0,255,136,0.12); color: #00FF88; }
    &.down { background: rgba(255,107,107,0.12); color: #FF6B6B; }
  }

  &.wechat {
    .card-glow { background: radial-gradient(circle at center, rgba(0,212,255,0.15), transparent 70%); }
    .ratio-fill { background: linear-gradient(90deg, #00D4FF, #00FF88); }
    &:hover .card-glow { opacity: 1; }
  }

  &.alipay {
    .card-glow { background: radial-gradient(circle at center, rgba(0,255,136,0.15), transparent 70%); }
    .ratio-fill { background: linear-gradient(90deg, #00FF88, #00D4FF); }
    &:hover .card-glow { opacity: 1; }
  }

  &.unionpay {
    .card-glow { background: radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 70%); }
    .ratio-fill { background: linear-gradient(90deg, #A855F7, #FF6B6B); }
    &:hover .card-glow { opacity: 1; }
  }

  &.other {
    .card-glow { background: radial-gradient(circle at center, rgba(255,170,0,0.15), transparent 70%); }
    .ratio-fill { background: linear-gradient(90deg, #FFAA00, #FF6B6B); }
    &:hover .card-glow { opacity: 1; }
  }
}

.pie-section {
  flex: 1;
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;

  .section-header {
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 10px;
    padding-bottom: 8px; border-bottom: 1px solid rgba(0,212,255,0.1);
  }

  .pie-chart { width: 100%; height: 180px; }
}
</style>