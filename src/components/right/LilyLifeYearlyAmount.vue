<template>
  <div class="tech-card stat-card">
    <div class="card-title">百合生活网年交易金额（万元）</div>
    <div class="card-content">
      <div class="stat-value">
        <span class="value">{{ formatNumber(data.current.value) }}</span>
        <span class="unit">{{ data.current.unit }}</span>
      </div>
      <div class="trend" :class="data.yearOnYear.trend">
        <span class="trend-icon">{{ data.yearOnYear.trend === 'up' ? '↑' : '↓' }}</span>
        <span class="trend-value">{{ data.yearOnYear.value }}{{ data.yearOnYear.unit }}</span>
        <span class="trend-label">{{ data.yearOnYear.label }}</span>
      </div>
      <div class="chart-wrapper">
        <BarChart :data="chartData" :height="120" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { lilyLifeYearlyAmount } from '../../mockData/wangjinData'
import BarChart from '../common/BarChart.vue'

const data = lilyLifeYearlyAmount

const chartData = computed(() => ({
  xAxis: ['25-06', '25-07', '25-08', '25-09', '25-10', '25-11', '25-12', '26-01', '26-02', '26-03', '26-04', '26-05'],
  series: [{
    name: '交易金额',
    data: [98000, 105000, 112000, 108000, 115000, 120000, 118000, 122000, 125000, 126000, 127000, 128563]
  }]
}))

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(0) + '万'
  }
  return num.toLocaleString()
}
</script>

<style lang="scss" scoped>
.stat-card {
  .card-content {
    padding: 12px 16px;
  }

  .stat-value {
    margin-bottom: 8px;
  }

  .value {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary);
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }

  .unit {
    font-size: 14px;
    color: var(--text-secondary);
    margin-left: 4px;
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    font-size: 13px;

    &.up {
      .trend-icon, .trend-value { color: var(--accent); }
    }

    &.down {
      .trend-icon, .trend-value { color: var(--warning); }
    }

    .trend-label {
      color: var(--text-dim);
    }
  }

  .chart-wrapper {
    width: 100%;
  }
}
</style>