<template>
  <div class="channel-analysis">
    <div class="layer-title">
      <span class="title-icon"></span>
      <span class="title-text">渠道业务分析</span>
    </div>
    <div class="channel-grid">
      <div v-for="(channel, index) in channels" :key="index" class="channel-card" :class="channel.type">
        <div class="card-glow"></div>
        <div class="card-border"></div>
        <div class="card-content">
          <div class="channel-header">
            <span class="channel-icon">{{ channel.icon }}</span>
            <span class="channel-name">{{ channel.name }}</span>
          </div>
          <div class="metrics-row">
            <div class="metric">
              <div class="metric-label">日交易笔数</div>
              <div class="metric-value">{{ channel.daily.transactions }}<span class="unit">万笔</span></div>
            </div>
            <div class="metric">
              <div class="metric-label">日交易金额</div>
              <div class="metric-value">{{ channel.daily.amount }}<span class="unit">亿元</span></div>
            </div>
          </div>
          <div class="metrics-row small">
            <div class="metric">
              <div class="metric-label">月交易笔数</div>
              <div class="metric-value">{{ channel.monthly.transactions }}<span class="unit">万笔</span></div>
            </div>
            <div class="metric">
              <div class="metric-label">月交易金额</div>
              <div class="metric-value">{{ channel.monthly.amount }}<span class="unit">亿元</span></div>
            </div>
          </div>
          <div class="chart-wrapper">
            <div :ref="el => setChartRef(el, index)" class="mini-chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { lanYinData, posData, onlineData } from '../../mockData/merchantData'

const channels = ref([
  {
    name: '兰银惠付',
    icon: '📱',
    type: 'lanyin',
    daily: lanYinData.daily,
    monthly: lanYinData.monthly,
    ratio: lanYinData.channelRatio
  },
  {
    name: '智能POS',
    icon: '📟',
    type: 'pos',
    daily: posData.daily,
    monthly: posData.monthly,
    ratio: posData.deviceRatio
  },
  {
    name: '线上支付',
    icon: '🌐',
    type: 'online',
    daily: onlineData.daily,
    monthly: onlineData.monthly,
    ratio: onlineData.typeRatio
  }
])

const chartRefs = ref([])
const chartInstances = ref([])

const setChartRef = (el, index) => {
  if (el) {
    chartRefs.value[index] = el
  }
}

const initMiniCharts = () => {
  channels.value.forEach((channel, index) => {
    const el = chartRefs.value[index]
    if (!el) return

    const chart = echarts.init(el)
    chartInstances.value.push(chart)

    const colors = {
      lanyin: ['#00D4FF', '#00FF88', '#FFAA00', '#FF6B6B'],
      pos: ['#00FF88', '#00D4FF', '#FFAA00', '#FF6B6B'],
      online: ['#A855F7', '#00D4FF', '#00FF88', '#FFAA00']
    }

    const option = {
      backgroundColor: 'transparent',
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 3,
            borderColor: 'rgba(10, 22, 40, 0.9)',
            borderWidth: 2
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 10,
              color: '#fff'
            }
          },
          data: channel.ratio,
          color: colors[channel.type]
        }
      ]
    }
    chart.setOption(option)
  })
}

onMounted(() => {
  initMiniCharts()
  window.addEventListener('resize', () => {
    chartInstances.value.forEach(chart => chart?.resize())
  })
})

onUnmounted(() => {
  chartInstances.value.forEach(chart => chart?.dispose())
})
</script>

<style lang="scss" scoped>
.channel-analysis {
  padding: 15px 20px;
  background: rgba(0, 212, 255, 0.03);
  border-top: 1px solid rgba(0, 212, 255, 0.1);
}

.layer-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  .title-icon {
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00D4FF, #0088FF);
    border-radius: 2px;
  }

  .title-text {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
  }
}

.channel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.channel-card {
  position: relative;
  padding: 2px;
  border-radius: 10px;
  overflow: hidden;

  .card-glow {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    border: 1px solid;
    transition: all 0.3s ease;
  }

  .card-content {
    position: relative;
    padding: 20px;
    background: rgba(10, 22, 40, 0.8);
    border-radius: 9px;
  }

  .channel-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.15);

    .channel-icon {
      font-size: 28px;
    }

    .channel-name {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }
  }

  .metrics-row {
    display: flex;
    gap: 15px;
    margin-bottom: 12px;

    &.small {
      margin-bottom: 15px;

      .metric {
        .metric-label {
          font-size: 11px;
        }

        .metric-value {
          font-size: 16px;
        }
      }
    }
  }

  .metric {
    flex: 1;
    text-align: center;
    padding: 10px;
    background: rgba(0, 212, 255, 0.05);
    border-radius: 6px;

    .metric-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 5px;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #fff;

      .unit {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 3px;
      }
    }
  }

  .chart-wrapper {
    height: 120px;

    .mini-chart {
      width: 100%;
      height: 100%;
    }
  }

  &.lanyin {
    .card-border { border-color: rgba(0, 212, 255, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(0, 212, 255, 0.2), transparent 70%); }
    .metric-value { color: #00D4FF; }

    &:hover {
      .card-border { border-color: rgba(0, 212, 255, 0.8); box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
      .card-glow { opacity: 1; }
    }
  }

  &.pos {
    .card-border { border-color: rgba(0, 255, 136, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(0, 255, 136, 0.2), transparent 70%); }
    .metric-value { color: #00FF88; }

    &:hover {
      .card-border { border-color: rgba(0, 255, 136, 0.8); box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
      .card-glow { opacity: 1; }
    }
  }

  &.online {
    .card-border { border-color: rgba(168, 85, 247, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(168, 85, 247, 0.2), transparent 70%); }
    .metric-value { color: #A855F7; }

    &:hover {
      .card-border { border-color: rgba(168, 85, 247, 0.8); box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
      .card-glow { opacity: 1; }
    }
  }
}
</style>
