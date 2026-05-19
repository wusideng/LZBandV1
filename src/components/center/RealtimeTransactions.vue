<template>
  <div class="tech-card transactions-card">
    <div class="card-title">实时交易动态</div>
    <div class="transactions-wrapper">
      <div class="transactions-header">
        <span>时间</span>
        <span>城市</span>
        <span>交易类型</span>
        <span>金额(元)</span>
      </div>
      <div class="transactions-list" ref="listRef">
        <div 
          v-for="(item, index) in displayData" 
          :key="index"
          class="transaction-item"
        >
          <span class="time">{{ item.time }}</span>
          <span class="city">{{ item.city }}</span>
          <span class="type">{{ item.type }}</span>
          <span class="amount">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { realtimeTransactions } from '../../mockData/wangjinData'

const listRef = ref(null)
let scrollTimer = null

// 复制数据用于无缝滚动
const displayData = computed(() => [...realtimeTransactions, ...realtimeTransactions])

onMounted(() => {
  // 滚动动画
  const scroll = () => {
    if (!listRef.value) return
    const scrollTop = listRef.value.scrollTop
    const itemHeight = 36
    
    if (scrollTop >= realtimeTransactions.length * itemHeight) {
      listRef.value.scrollTop = 0
    } else {
      listRef.value.scrollTop = scrollTop + 1
    }
  }
  
  scrollTimer = setInterval(scroll, 50)
})

onUnmounted(() => {
  if (scrollTimer) clearInterval(scrollTimer)
})
</script>

<style lang="scss" scoped>
.transactions-card {
  height: 280px;
  
  .transactions-wrapper {
    padding: 12px 16px;
    height: calc(100% - 48px);
    overflow: hidden;
  }
  
  .transactions-header {
    display: grid;
    grid-template-columns: 80px 80px 1fr 100px;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-secondary);
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 600;
  }
  
  .transactions-list {
    height: calc(100% - 40px);
    overflow: hidden;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .transaction-item {
    display: grid;
    grid-template-columns: 80px 80px 1fr 100px;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    font-size: 12px;
    animation: fadeIn 0.3s ease;
    
    &:hover {
      background: rgba(0, 212, 255, 0.05);
    }
    
    .time {
      color: var(--text-dim);
    }
    
    .city {
      color: var(--primary);
      font-weight: 500;
    }
    
    .type {
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .amount {
      color: var(--accent);
      font-weight: 600;
      text-align: right;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>