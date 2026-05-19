<template>
  <div class="tech-card index-card">
    <div class="card-title">手机银行交易笔数</div>
    <div class="card-content">
      <div class="index-value">
        <span class="value">{{ formatNumber(data.current.value) }}</span>
        <span class="unit">{{ data.current.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mobileBankAccounts } from '../../mockData/wangjinData'

const data = mobileBankAccounts

const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(0) + '万'
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
    font-size: 32px;
    font-weight: 700;
    color: var(--primary);
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
  
  .unit {
    font-size: 14px;
    color: var(--text-secondary);
    margin-left: 8px;
  }
}
</style>