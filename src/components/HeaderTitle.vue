<template>
  <div class="header-title">
    <div class="title-main">{{ displayTitle }}</div>
    <div v-if="displaySubtitle" class="title-sub">{{ displaySubtitle }}</div>
    <div class="header-info">
      <span class="current-time">{{ currentTime }}</span>
      <span class="update-time">数据更新: {{ updateTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { config } from '../mockData/wangjinData'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const displayTitle = computed(() => props.title || '网金业务概览')
const displaySubtitle = computed(() => props.subtitle)

const currentTime = ref('')
const updateTime = ref(config.updateTime)

const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-')
}

let timer = null

onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }
  
  &::before { left: 80px; }
  &::after { right: 80px; }
}

.title-main {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  letter-spacing: 4px;
}

.title-sub {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 4px 12px;
  border: 1px solid var(--border-primary);
  border-radius: 2px;
}

.header-info {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
  
  .current-time {
    font-size: 16px;
    color: var(--primary);
    font-weight: 600;
  }
  
  .update-time {
    color: var(--text-dim);
  }
}
</style>