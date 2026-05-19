<template>
  <div class="transaction-flow">
    <div class="flow-header">
      <span class="header-icon"></span>
      <span class="header-title">实时动态交易流</span>
      <span class="flow-count">今日已处理 {{ totalCount }} 笔</span>
    </div>
    <div class="flow-container" ref="flowContainerRef">
      <div
        v-for="(item, index) in displayList"
        :key="item.id"
        class="flow-item"
        :class="[item.channelType, { 'new': index === 0 }]"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="flow-time">{{ item.time }}</div>
        <div class="flow-channel" :class="item.channelType">{{ item.channel }}</div>
        <div class="flow-merchant">{{ item.merchant }}</div>
        <div class="flow-amount">{{ item.amount }}</div>
        <div class="flow-status" :class="item.status">{{ item.statusText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const flowContainerRef = ref(null)
const transactionList = ref([])
const totalCount = ref(28563)

let timer = null
let idCounter = 0

const channels = [
  { name: '兰银惠付', type: 'lanyin' },
  { name: '智能POS', type: 'pos' },
  { name: '线上支付', type: 'online' }
]

const merchants = [
  '沃尔玛超市', '星巴克咖啡', '麦当劳', '肯德基', '海底捞',
  '永辉超市', '苏宁易购', '国美电器', '华为体验店', '苹果授权店'
]

const generateTransaction = () => {
  const channel = channels[Math.floor(Math.random() * channels.length)]
  const merchant = merchants[Math.floor(Math.random() * merchants.length)]
  const amount = (Math.random() * 5000 + 50).toFixed(2)
  const now = new Date()
  
  return {
    id: ++idCounter,
    time: now.toLocaleTimeString('zh-CN', { hour12: false }),
    channel: channel.name,
    channelType: channel.type,
    merchant,
    amount: `¥${amount}`,
    status: Math.random() > 0.95 ? 'failed' : 'success',
    statusText: Math.random() > 0.95 ? '失败' : '成功'
  }
}

const displayList = computed(() => transactionList.value.slice(0, 10))

onMounted(() => {
  // 初始化数据
  for (let i = 0; i < 10; i++) {
    transactionList.value.unshift(generateTransaction())
  }

  // 定时添加新交易
  timer = setInterval(() => {
    const newTransaction = generateTransaction()
    transactionList.value.unshift(newTransaction)
    if (transactionList.value.length > 20) {
      transactionList.value.pop()
    }
    totalCount.value++
  }, 2000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.transaction-flow {
  padding: 15px 20px;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%);
  border-top: 1px solid rgba(0, 212, 255, 0.15);
}

.flow-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  .header-icon {
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00D4FF, #0088FF);
    border-radius: 2px;
  }

  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
  }

  .flow-count {
    margin-left: auto;
    padding: 4px 12px;
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 12px;
    font-size: 12px;
    color: #00D4FF;
  }
}

.flow-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 6px;
  font-size: 13px;
  animation: slideIn 0.5s ease;

  &.new {
    animation: highlightNew 0.8s ease;
  }

  .flow-time {
    width: 70px;
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Roboto Mono', monospace;
  }

  .flow-channel {
    width: 80px;
    padding: 4px 10px;
    border-radius: 4px;
    text-align: center;
    font-size: 12px;

    &.lanyin {
      background: rgba(0, 212, 255, 0.15);
      color: #00D4FF;
    }

    &.pos {
      background: rgba(0, 255, 136, 0.15);
      color: #00FF88;
    }

    &.online {
      background: rgba(168, 85, 247, 0.15);
      color: #A855F7;
    }
  }

  .flow-merchant {
    flex: 1;
    color: rgba(255, 255, 255, 0.8);
  }

  .flow-amount {
    width: 100px;
    text-align: right;
    font-weight: 600;
    color: #00FF88;
    font-family: 'DIN Alternate', monospace;
  }

  .flow-status {
    width: 50px;
    text-align: center;
    font-size: 12px;

    &.success {
      color: #00FF88;
    }

    &.failed {
      color: #FF6B6B;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes highlightNew {
  0% {
    background: rgba(0, 212, 255, 0.3);
    border-color: rgba(0, 212, 255, 0.6);
  }
  100% {
    background: rgba(0, 212, 255, 0.05);
    border-color: rgba(0, 212, 255, 0.1);
  }
}
</style>
