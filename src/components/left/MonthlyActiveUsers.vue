<template>
  <div class="tech-card index-card">
    <div class="card-title">手机银行当月活跃户数</div>
    <div class="card-content">
      <div class="index-value">
        <span class="value">{{ formatNumber(data.current.value) }}</span>
        <span class="unit">{{ data.current.unit }}</span>
      </div>
      <div class="rate-tag">活跃率 {{ data.current.activityRate }}</div>
    </div>
  </div>
</template>

<script setup>
import { monthlyActiveUsers } from '../../mockData/wangjinData'

const data = monthlyActiveUsers

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  }
  return num.toLocaleString()
}
</script>

<style lang="scss" scoped>
.index-card {
  .card-content {
    padding: 16px;
  }
  
  .index-value {
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
    margin-left: 8px;
  }
  
  .rate-tag {
    display: inline-block;
    padding: 2px 8px;
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 2px;
    color: var(--accent);
    font-size: 12px;
    margin-bottom: 12px;
  }
}
</style>