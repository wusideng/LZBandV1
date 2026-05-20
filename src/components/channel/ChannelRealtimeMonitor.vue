<template>
  <div class="realtime-monitor">
    <div class="rm-main">
      <div class="rm-metrics">
        <div class="rm-item" v-for="m in metrics" :key="m.label">
          <span class="rm-dot" :class="m.status"></span>
          <div class="rm-body">
            <span class="rm-label">{{ m.label }}</span>
            <span class="rm-value" :class="m.status">{{ animVals[m.idx] }}</span>
            <span class="rm-unit">{{ m.unit }}</span>
          </div>
        </div>
      </div>
      <div class="rm-charts">
        <div class="rm-gauge-item" ref="successGaugeRef"></div>
        <div class="rm-gauge-item" ref="responseGaugeRef"></div>
      </div>
    </div>
    <div class="rm-side">
      <div class="rm-alerts">
        <div class="alert-title">实时告警 <span class="alert-badge">{{ monitor.alertCount.value }}</span></div>
        <div class="alert-list scroll-list">
          <template v-for="i in 2" :key="i">
            <div v-for="a in monitor.alerts" :key="a.id" class="alert-item" :class="a.level">
              <span class="a-dot"></span>
              <span class="a-text">{{ a.content }}</span>
              <span class="a-time">{{ a.time }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="rm-flow">
        <div class="flow-title">渠道交易流</div>
        <div class="flow-list">
          <div v-for="f in monitor.tradeFlow" :key="f.channel" class="flow-item">
            <span class="f-dot" :class="f.status"></span>
            <span class="f-name">{{ f.channel }}</span>
            <span class="f-amt">{{ f.amount }}亿</span>
            <span class="f-cnt">{{ f.count }}笔</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { realtimeMonitor } from '../../mockData/channelData'

const monitor = ref(realtimeMonitor)
const successGaugeRef = ref(null); const responseGaugeRef = ref(null)
let sg, rg

const animVals = ref(monitor.value.metrics?.map(() => '0') || ['0','0','0','0','0','0'])

// Build metrics list
const metrics = [
  { label: '当前在线', value: monitor.value.onlineUsers.value, unit: monitor.value.onlineUsers.unit, status: 'normal', idx: 0 },
  { label: '交易笔数', value: monitor.value.currentTrades.value, unit: monitor.value.currentTrades.unit, status: 'normal', idx: 1 },
  { label: '交易金额', value: monitor.value.currentAmount.value, unit: monitor.value.currentAmount.unit, status: 'normal', idx: 2 },
  { label: '告警数', value: monitor.value.alertCount.value, unit: monitor.value.alertCount.unit, status: 'warning', idx: 3 },
]

// Animate values
const animate = (targets) => {
  targets.forEach((t, i) => {
    const dur = 1800, start = Date.now()
    const fn = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const val = t * (1 - Math.pow(1 - p, 3))
      animVals.value[i] = t >= 1000 ? val.toFixed(0) : val.toFixed(1)
      if (p < 1) requestAnimationFrame(fn)
    }
    fn()
  })
}

const initGauges = () => {
  if (!successGaugeRef.value) return
  sg = echarts.init(successGaugeRef.value)
  sg.setOption({
    series: [{
      type: 'gauge', center: ['50%', '55%'], radius: '75%',
      startAngle: 220, endAngle: -40, min: 99.5, max: 100,
      progress: { show: true, width: 5, roundCap: true, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#00FF88' }, { offset: 1, color: '#00D4FF' }] } } },
      axisLine: { lineStyle: { width: 5, color: [[1, 'rgba(0,212,255,0.1)']] } },
      axisTick: { show: false }, splitLine: { show: false },
      axisLabel: { show: false },
      detail: { valueAnimation: true, formatter: '{value}%', color: '#00FF88', fontSize: 14, fontFamily: 'DIN Alternate', offsetCenter: [0, '25%'] },
      title: { offsetCenter: [0, '58%'], fontSize: 7, color: 'rgba(255,255,255,0.4)' },
      pointer: { show: true, length: '45%', width: 2, itemStyle: { color: '#00FF88' } },
      data: [{ value: monitor.value.systemSuccessRate, name: '系统成功率' }]
    }]
  }, true)

  if (!responseGaugeRef.value) return
  rg = echarts.init(responseGaugeRef.value)
  rg.setOption({
    series: [{
      type: 'gauge', center: ['50%', '55%'], radius: '75%',
      startAngle: 220, endAngle: -40, min: 0, max: 100,
      progress: { show: true, width: 5, roundCap: true, itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#00D4FF' }, { offset: 0.5, color: '#FFD700' }, { offset: 1, color: '#FF6B6B' }] } } },
      axisLine: { lineStyle: { width: 5, color: [[1, 'rgba(0,212,255,0.1)']] } },
      axisTick: { show: false }, splitLine: { show: false },
      axisLabel: { show: false },
      detail: { valueAnimation: true, formatter: '{value}ms', color: '#00D4FF', fontSize: 14, fontFamily: 'DIN Alternate', offsetCenter: [0, '25%'] },
      title: { offsetCenter: [0, '58%'], fontSize: 7, color: 'rgba(255,255,255,0.4)' },
      pointer: { show: true, length: '45%', width: 2, itemStyle: { color: '#00D4FF' } },
      data: [{ value: monitor.value.apiResponseTime, name: '接口响应' }]
    }]
  }, true)
}

const all = () => [sg, rg]

onMounted(() => {
  animate(metrics.map(m => m.value))
  initGauges()
  nextTick(() => all().forEach(c => c?.resize()))
  window.addEventListener('resize', () => all().forEach(c => c?.resize()))
})

onUnmounted(() => all().forEach(c => c?.dispose()))
</script>

<style lang="scss" scoped>
.realtime-monitor { display: flex; gap: 8px; height: 100%; min-height: 0; }
.rm-main { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.rm-metrics { display: flex; gap: 6px; flex: 0 0 auto; }
.rm-item { flex: 1; display: flex; align-items: center; gap: 6px; background: rgba(10,22,40,0.75); border: 1px solid rgba(0,212,255,0.15); border-radius: 4px; padding: 5px 8px; }
.rm-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.rm-dot.normal { background: #00FF88; box-shadow: 0 0 6px rgba(0,255,136,0.5); animation: pulse 2s ease-in-out infinite; }
.rm-dot.warning { background: #FF6B6B; box-shadow: 0 0 6px rgba(255,107,107,0.5); animation: blink 1s ease-in-out infinite; }
.rm-body { display: flex; flex-direction: column; gap: 1px; }
.rm-label { font-size: 9px; color: rgba(255,255,255,0.5); }
.rm-value { font-size: 18px; font-weight: 700; font-family: 'DIN Alternate',monospace; }
.rm-value.normal { color: #00D4FF; }
.rm-value.warning { color: #FF6B6B; }
.rm-unit { font-size: 8px; color: rgba(255,255,255,0.25); }
.rm-charts { display: flex; gap: 6px; flex: 1; min-height: 0; }
.rm-gauge-item { flex: 1; background: rgba(10,22,40,0.75); border: 1px solid rgba(0,212,255,0.15); border-radius: 4px; }
.rm-side { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 6px; }
.rm-alerts { flex: 1; background: rgba(10,22,40,0.85); border: 1px solid rgba(0,212,255,0.18); border-radius: 4px; display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
.rm-alerts::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent); }
.alert-title { padding: 4px 8px; font-size: 10px; color: #00D4FF; font-weight: 600; border-bottom: 1px solid rgba(0,212,255,0.1); display: flex; align-items: center; gap: 6px; }
.alert-badge { background: rgba(255,107,107,0.2); color: #FF6B6B; padding: 0 5px; border-radius: 8px; font-size: 9px; font-weight: 700; }
.alert-list { flex: 1; overflow: hidden; padding: 2px 4px; }
.alert-item { display: flex; align-items: center; gap: 4px; padding: 3px 5px; font-size: 9px; border-radius: 2px; margin-bottom: 2px; }
.alert-item.critical { background: rgba(255,107,107,0.08); }
.alert-item.warning { background: rgba(255,170,0,0.05); }
.alert-item.info { background: rgba(0,212,255,0.04); }
.a-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }
.critical .a-dot { background: #FF6B6B; box-shadow: 0 0 4px rgba(255,107,107,0.5); }
.warning .a-dot { background: #FFAA00; }
.info .a-dot { background: #00D4FF; }
.a-text { flex: 1; color: rgba(255,255,255,0.6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.a-time { font-size: 8px; color: rgba(255,255,255,0.25); }
.rm-flow { flex: 0 0 auto; background: rgba(10,22,40,0.85); border: 1px solid rgba(0,212,255,0.18); border-radius: 4px; padding: 5px 8px; }
.flow-title { font-size: 10px; color: #00D4FF; font-weight: 600; margin-bottom: 4px; }
.flow-list { display: flex; flex-direction: column; gap: 3px; }
.flow-item { display: flex; align-items: center; gap: 4px; font-size: 9px; }
.f-dot { width: 4px; height: 4px; border-radius: 50%; }
.f-dot.normal { background: #00FF88; }
.f-dot.warning { background: #FFAA00; }
.f-name { color: rgba(255,255,255,0.6); width: 60px; }
.f-amt { color: #00D4FF; font-family: 'DIN Alternate',monospace; width: 50px; text-align: right; }
.f-cnt { color: rgba(255,255,255,0.4); text-align: right; }
.scroll-list { animation: scrollUp 40s linear infinite; }
.scroll-list:hover { animation-play-state: paused; }
@keyframes scrollUp { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
</style>