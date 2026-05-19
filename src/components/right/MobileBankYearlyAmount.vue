<template>
  <div class="tech-card stat-card" style="height: 435px;">
    <div class="card-title">手机银行月度统计</div>
    <div class="card-content">
      <div class="stat-summary">
        <div class="stat-item">
          <span class="stat-label">当月激活</span>
          <span class="stat-value primary">{{ formatNumber(data.activations.current.value) }}</span>
          <span class="stat-unit">{{ data.activations.current.unit }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">当月活跃</span>
          <span class="stat-value accent">{{ formatNumber(data.activeUsers.current.value) }}</span>
          <span class="stat-unit">{{ data.activeUsers.current.unit }}</span>
        </div>
      </div>
      <div class="chart-wrapper">
        <LineChart :data="chartData" :height="140" />
      </div>
      <div class="rate-info">
        <span class="rate-label">活跃率</span>
        <span class="rate-value">{{ data.activeUsers.current.activityRate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { monthlyActivations, monthlyActiveUsers } from '../../mockData/wangjinData'
import LineChart from '../common/LineChart.vue'

const data = {
  activations: monthlyActivations,
  activeUsers: monthlyActiveUsers
}

const chartData = computed(() => {
  const months = data.activations.trend12Months.map(item => item.month.slice(5))
  return {
    xAxis: months,
    series: [
      {
        name: '激活户数',
        data: data.activations.trend12Months.map(item => item.value),
        color: '#00D4FF'
      },
      {
        name: '活跃户数',
        data: data.activeUsers.trend12Months.map(item => item.value),
        color: '#00FF88'
      }
    ]
  }
})

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

  .stat-summary {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 16px;
  }

  .stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-dim);
    margin-bottom: 4px;
  }

  .stat-value {
    font-size: 22px;
    font-weight: 700;

    &.primary {
      color: var(--primary);
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }

    &.accent {
      color: var(--accent);
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }
  }

  .stat-unit {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .chart-wrapper {
    width: 100%;
    height: 140px;
    margin-bottom: 8px;
  }

  .rate-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 13px;

    .rate-label {
      color: var(--text-dim);
    }

    .rate-value {
      color: var(--accent);
      font-weight: 600;
    }
  }
}
</style>