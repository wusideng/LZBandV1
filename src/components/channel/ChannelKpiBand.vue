<template>
  <div class="channel-kpi-band">
    <div class="kpi-bar">
      <span class="bar-line"></span>
      <span class="bar-label">核心渠道运营指标</span>
      <div class="bar-status">
        <span class="status-dot"></span>
        <span>渠道运行正常</span>
      </div>
    </div>
    <div class="kpi-grid">
      <div v-for="(kpi, idx) in kpiList" :key="idx" class="kpi-card" :style="{ '--idx': idx }">
        <div class="card-body">
          <div class="card-hdr">
            <span class="ci">{{ kpi.icon }}</span>
            <span class="cl">{{ kpi.label }}</span>
          </div>
          <div class="card-val">
            <span class="cn">{{ animatedVals[idx] }}</span>
            <span class="cu">{{ kpi.unit }}</span>
          </div>
          <span class="trend" :class="kpi.trend">{{ kpi.trend === 'up' ? '↑' : '↓' }} {{ kpi.trendValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { kpiData } from '../../mockData/channelData'

const kpiList = ref(kpiData)
const animatedVals = ref(kpiData.map(() => '0'))

onMounted(() => {
  kpiList.value.forEach((kpi, i) => {
    const target = kpi.value
    const dur = 1800
    const start = Date.now()
    const fn = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      animatedVals.value[i] = target >= 100 ? (target * e).toFixed(0) : (target * e).toFixed(1)
      if (p < 1) requestAnimationFrame(fn)
    }
    fn()
  })
})
</script>

<style lang="scss" scoped>
.channel-kpi-band { height: 100%; display: flex; flex-direction: column; padding: 4px 0; }
.kpi-bar { display: flex; align-items: center; gap: 8px; flex: 0 0 22px; }
.bar-line { width: 3px; height: 14px; background: linear-gradient(180deg,#00D4FF,#0066FF); border-radius: 2px; flex-shrink: 0; }
.bar-label { font-size: 13px; font-weight: 600; color: #fff; letter-spacing: 2px; }
.bar-status { margin-left: auto; display: flex; align-items: center; gap: 4px; padding: 1px 10px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.3); border-radius: 10px; font-size: 10px; color: #00FF88; }
.bar-status .status-dot { width: 5px; height: 5px; background: #00FF88; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
.kpi-grid { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; min-height: 0; }
.kpi-card { position: relative; border-radius: 4px; overflow: hidden; background: rgba(10,22,40,0.75); border: 1px solid rgba(0,212,255,0.15); animation: fadeInUp .4s ease-out forwards; animation-delay: calc(var(--idx)*0.05s); opacity: 0; transition: border-color .3s; }
.kpi-card:hover { border-color: rgba(0,212,255,0.5); box-shadow: 0 0 12px rgba(0,212,255,0.15); }
.card-body { padding: 3px 8px; height: 100%; display: flex; flex-direction: column; justify-content: center; }
.card-hdr { display: flex; align-items: center; gap: 4px; margin-bottom: 1px; }
.card-hdr .ci { font-size: 12px; flex-shrink: 0; }
.card-hdr .cl { font-size: 10px; color: rgba(255,255,255,0.55); }
.card-val { display: flex; align-items: baseline; gap: 4px; }
.card-val .cn { font-size: 20px; font-weight: 700; color: #00D4FF; font-family: 'DIN Alternate',monospace; text-shadow: 0 0 10px rgba(0,212,255,0.3); letter-spacing: 1px; }
.card-val .cu { font-size: 10px; color: rgba(255,255,255,0.35); }
.trend { font-size: 9px; padding: 0 5px; border-radius: 6px; display: inline-block; margin-top: 1px; }
.trend.up { background: rgba(0,255,136,0.1); color: #00FF88; }
.trend.down { background: rgba(255,107,107,0.1); color: #FF6B6B; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
</style>