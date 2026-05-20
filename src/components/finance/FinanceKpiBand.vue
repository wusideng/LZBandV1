<template>
  <div class="kpi-energy-band">
    <div class="energy-bar">
      <span class="scan-line"></span>
      <span class="energy-label">核心经营KPI能量带</span>
      <div class="kpi-status">
        <span class="status-dot"></span>
        <span>系统运行正常 · 已同步</span>
      </div>
    </div>
    <div class="kpi-grid">
      <div v-for="(kpi, idx) in kpiList" :key="idx" class="kpi-card" :style="{ '--idx': idx }">
        <div class="card-content">
          <div class="card-header">
            <span class="kpi-icon">{{ kpi.icon }}</span>
            <span class="kpi-label">{{ kpi.label }}</span>
            <span class="trend-tag" :class="kpi.trend">
              <span class="trend-arrow">{{ kpi.trend === 'up' ? '↑' : '↓' }}</span>
              <span class="trend-value">{{ kpi.trendValue }}</span>
            </span>
          </div>
          <div class="card-value-row">
            <span class="card-number">{{ animatedValues[idx] }}</span>
            <span class="card-unit">{{ kpi.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { kpiData } from '../../mockData/financeData'

const kpiList = ref(kpiData)
const animatedValues = ref(kpiData.map(() => '0'))

const animateNumbers = () => {
  kpiList.value.forEach((kpi, i) => {
    const target = kpi.value
    const duration = 2000
    const start = Date.now()
    const animate = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const current = target * ease
      animatedValues.value[i] = target >= 100 ? current.toFixed(0) : current.toFixed(2)
      if (p < 1) requestAnimationFrame(animate)
    }
    animate()
  })
}

onMounted(() => {
  animateNumbers()
})
</script>

<style lang="scss" scoped>
.kpi-energy-band {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.energy-bar {
  display: flex; align-items: center; gap: 8px;
  flex: 0 0 22px;

  .scan-line {
    width: 3px; height: 14px;
    background: linear-gradient(180deg, #00D4FF, #0066FF);
    border-radius: 2px; flex-shrink: 0;
  }
  .energy-label {
    font-size: 13px; font-weight: 600; color: #fff; letter-spacing: 2px;
  }
  .kpi-status {
    margin-left: auto; display: flex; align-items: center; gap: 4px;
    padding: 1px 10px; background: rgba(0,255,136,0.1);
    border: 1px solid rgba(0,255,136,0.3); border-radius: 10px;
    font-size: 10px; color: #00FF88;
    .status-dot {
      width: 5px; height: 5px; background: #00FF88; border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
}

.kpi-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  min-height: 0;
}

.kpi-card {
  position: relative; border-radius: 4px; overflow: hidden;
  background: rgba(10,22,40,0.75);
  border: 1px solid rgba(0,212,255,0.15);
  animation: fadeInUp 0.4s ease-out forwards;
  animation-delay: calc(var(--idx) * 0.06s);
  opacity: 0;
  transition: border-color .3s;

  &:hover {
    border-color: rgba(0,212,255,0.5);
    box-shadow: 0 0 12px rgba(0,212,255,0.15);
  }

  .card-content {
    padding: 4px 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card-header {
    display: flex; align-items: center; gap: 4px;
    margin-bottom: 2px;
    .kpi-icon { font-size: 12px; flex-shrink: 0; }
    .kpi-label { font-size: 10px; color: rgba(255,255,255,0.6); flex: 1; }
    .trend-tag {
      display: flex; align-items: center; gap: 2px;
      padding: 0 5px; border-radius: 6px; font-size: 9px;
      &.up { background: rgba(0,255,136,0.1); color: #00FF88; }
      &.down { background: rgba(255,107,107,0.1); color: #FF6B6B; }
    }
  }

  .card-value-row {
    display: flex; align-items: baseline; gap: 4px;
    .card-number {
      font-size: 20px; font-weight: 700; color: #00D4FF;
      font-family: 'DIN Alternate', monospace;
      text-shadow: 0 0 10px rgba(0,212,255,0.3);
      letter-spacing: 1px;
    }
    .card-unit { font-size: 10px; color: rgba(255,255,255,0.4); }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.5); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>