<template>
  <div class="realtime-metrics">
    <div class="layer-title">
      <span class="title-icon"></span>
      <span class="title-text">实时运营监控</span>
      <span class="realtime-badge">
        <span class="pulse-dot"></span>
        实时
      </span>
    </div>
    <div class="metrics-grid">
      <div v-for="(item, index) in metricsList" :key="index" class="metric-card" :class="item.type">
        <div class="card-glow"></div>
        <div class="card-border"></div>
        <div class="card-content">
          <div class="metric-icon">{{ item.icon }}</div>
          <div class="metric-main">
            <div class="metric-value">
              <span class="number" ref="numberRefs">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
            <div class="metric-label">{{ item.label }}</div>
          </div>
          <div class="metric-trend" :class="item.trend">
            <span class="trend-icon">{{ item.trend === 'up' ? '▲' : '▼' }}</span>
            <span class="trend-value">{{ item.trendValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dailyCoreMetrics } from '../../mockData/merchantData'

const metricsList = ref([
  {
    icon: '💳',
    label: '特约商户日交易笔数',
    value: dailyCoreMetrics.merchantTransactions.value,
    unit: '万笔',
    trend: 'up',
    trendValue: '+12.35%',
    type: 'primary'
  },
  {
    icon: '💰',
    label: '特约商户日交易金额',
    value: dailyCoreMetrics.merchantAmount.value,
    unit: '亿元',
    trend: 'up',
    trendValue: '+8.72%',
    type: 'primary'
  },
  {
    icon: '📱',
    label: '兰银惠付日交易笔数',
    value: dailyCoreMetrics.lanYinTransactions.value,
    unit: '万笔',
    trend: 'up',
    trendValue: '+15.28%',
    type: 'accent'
  },
  {
    icon: '💵',
    label: '兰银惠付日交易金额',
    value: dailyCoreMetrics.lanYinAmount.value,
    unit: '亿元',
    trend: 'up',
    trendValue: '+10.15%',
    type: 'accent'
  },
  {
    icon: '📟',
    label: '智能POS日交易笔数',
    value: dailyCoreMetrics.posTransactions.value,
    unit: '万笔',
    trend: 'down',
    trendValue: '-2.18%',
    type: 'warning'
  },
  {
    icon: '💎',
    label: '智能POS日交易金额',
    value: dailyCoreMetrics.posAmount.value,
    unit: '亿元',
    trend: 'up',
    trendValue: '+5.63%',
    type: 'warning'
  },
  {
    icon: '🌐',
    label: '线上支付日交易笔数',
    value: dailyCoreMetrics.onlineTransactions.value,
    unit: '万笔',
    trend: 'up',
    trendValue: '+22.45%',
    type: 'info'
  },
  {
    icon: '⚡',
    label: '线上支付日交易金额',
    value: dailyCoreMetrics.onlineAmount.value,
    unit: '亿元',
    trend: 'up',
    trendValue: '+18.92%',
    type: 'info'
  }
])

const numberRefs = ref([])

onMounted(() => {
  numberRefs.value.forEach((el, index) => {
    if (!el) return
    const target = metricsList.value[index].value
    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = target * easeProgress
      
      if (target >= 100) {
        el.textContent = current.toFixed(0)
      } else {
        el.textContent = current.toFixed(2)
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  })
})
</script>

<style lang="scss" scoped>
.realtime-metrics {
  padding: 15px 20px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.08) 0%, transparent 100%);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
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

  .realtime-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
    padding: 4px 12px;
    background: rgba(0, 212, 255, 0.15);
    border: 1px solid rgba(0, 212, 255, 0.4);
    border-radius: 20px;
    font-size: 12px;
    color: #00D4FF;

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #00FF88;
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.metric-card {
  position: relative;
  padding: 2px;
  border-radius: 8px;
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
    border-radius: 8px;
    border: 1px solid;
    transition: all 0.3s ease;
  }

  .card-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: rgba(10, 22, 40, 0.8);
    border-radius: 7px;
  }

  .metric-icon {
    font-size: 32px;
    filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
  }

  .metric-main {
    flex: 1;
  }

  .metric-value {
    display: flex;
    align-items: baseline;
    gap: 4px;

    .number {
      font-size: 28px;
      font-weight: 700;
      font-family: 'DIN Alternate', 'Roboto Mono', monospace;
    }

    .unit {
      font-size: 12px;
      opacity: 0.7;
    }
  }

  .metric-label {
    font-size: 12px;
    opacity: 0.6;
    margin-top: 4px;
  }

  .metric-trend {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 11px;

    &.up {
      background: rgba(0, 255, 136, 0.1);
      color: #00FF88;
    }

    &.down {
      background: rgba(255, 107, 107, 0.1);
      color: #FF6B6B;
    }

    .trend-icon {
      font-size: 10px;
    }
  }

  &.primary {
    .card-border { border-color: rgba(0, 212, 255, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(0, 212, 255, 0.2), transparent 70%); }
    .number { color: #00D4FF; text-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
    
    &:hover {
      .card-border { border-color: rgba(0, 212, 255, 0.8); box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
      .card-glow { opacity: 1; }
    }
  }

  &.accent {
    .card-border { border-color: rgba(0, 255, 136, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(0, 255, 136, 0.2), transparent 70%); }
    .number { color: #00FF88; text-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
    
    &:hover {
      .card-border { border-color: rgba(0, 255, 136, 0.8); box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
      .card-glow { opacity: 1; }
    }
  }

  &.warning {
    .card-border { border-color: rgba(255, 170, 0, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(255, 170, 0, 0.2), transparent 70%); }
    .number { color: #FFAA00; text-shadow: 0 0 20px rgba(255, 170, 0, 0.5); }
    
    &:hover {
      .card-border { border-color: rgba(255, 170, 0, 0.8); box-shadow: 0 0 20px rgba(255, 170, 0, 0.3); }
      .card-glow { opacity: 1; }
    }
  }

  &.info {
    .card-border { border-color: rgba(138, 43, 226, 0.3); }
    .card-glow { background: radial-gradient(circle at center, rgba(138, 43, 226, 0.2), transparent 70%); }
    .number { color: #A855F7; text-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
    
    &:hover {
      .card-border { border-color: rgba(168, 85, 247, 0.8); box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
      .card-glow { opacity: 1; }
    }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
</style>
