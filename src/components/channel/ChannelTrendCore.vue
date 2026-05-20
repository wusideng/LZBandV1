<template>
  <div class="trend-core">
    <div class="tc-card trend-card">
      <div class="title">线上渠道趋势
        <div class="legend">
          <span v-for="l in legends" :key="l.name" class="l-item">
            <span class="l-dot" :style="{ background: l.color }"></span>{{ l.name }}
          </span>
        </div>
      </div>
      <div class="tc-chart" ref="trendChartRef"></div>
    </div>
    <!-- 交易行为分析（从左面板移过来的） -->
    <div class="tc-card trade-card">
      <div class="title">交易行为分析</div>
      <div class="trade-body">
        <div class="trade-ring" ref="tradeRingRef"></div>
        <div class="trade-heat" ref="heatChartRef"></div>
      </div>
    </div>
    <div class="core-glow"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { channelTrend, tradeBehavior } from '../../mockData/channelData'

const legends = [
  { name: '活跃用户(万)', color: '#00D4FF' },
  { name: '交易金额(亿)', color: '#00FF88' },
  { name: '交易笔数(十万)', color: '#FFD700' },
  { name: '转化率(%)', color: '#FF6B6B' }
]

const trendChartRef = ref(null); const tradeRingRef = ref(null); const heatChartRef = ref(null)
let tc, tr, ht
let tooltipTimer = null
let tooltipIndex = 0

const initTrend = () => {
  if (!trendChartRef.value) return; tc = echarts.init(trendChartRef.value)
  tc.setOption({
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.92)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 10 }, formatter: (p) => { let h = `<div style="font-size:10px;font-weight:600;margin-bottom:2px;">${p[0].axisValue}</div>`; p.forEach(v => { h += `<div style="display:flex;align-items:center;gap:3px;font-size:10px;"><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:${v.color};"></span>${v.seriesName}: <b>${v.value}</b></div>` }); return h } },
    legend: { show: false }, grid: { left: 38, right: 12, top: 8, bottom: 16 },
    xAxis: { type: 'category', data: channelTrend.months, boundaryGap: false, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.12)' } }, axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 8 }, axisTick: { show: false } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)', type: 'dashed' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 8 }, axisLine: { show: false }, axisTick: { show: false } },
    series: [
      { name: '活跃用户(万)', type: 'line', smooth: true, data: channelTrend.activeUsers, symbol: 'none', lineStyle: { color: '#00D4FF', width: 2 }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,212,255,0.2)'},{offset:1,color:'rgba(0,212,255,0)'}]) } },
      { name: '交易金额(亿)', type: 'line', smooth: true, data: channelTrend.tradeAmount, symbol: 'none', lineStyle: { color: '#00FF88', width: 2 }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,255,136,0.15)'},{offset:1,color:'rgba(0,255,136,0)'}]) } },
      { name: '交易笔数(十万)', type: 'line', smooth: true, data: channelTrend.tradeCount.map(v => v/10), symbol: 'none', lineStyle: { color: '#FFD700', width: 2 }, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,215,0,0.1)'},{offset:1,color:'rgba(255,215,0,0)'}]) } },
      { name: '转化率(%)', type: 'line', smooth: true, data: channelTrend.conversionRate, symbol: 'none', lineStyle: { color: '#FF6B6B', width: 2, type: 'dashed' } }
    ],
    animationDuration: 1000, animationEasing: 'elasticOut'
  }, true)
}

const initTradeRing = () => { if (!tradeRingRef.value) return; tr = echarts.init(tradeRingRef.value); tr.setOption({ tooltip: { trigger: 'item', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 }, formatter: '{b}: {c}%' }, series: [{ type: 'pie', radius: ['45%', '72%'], center: ['50%', '50%'], label: { show: true, color: 'rgba(255,255,255,0.5)', fontSize: 7, formatter: '{b}\n{d}%' }, labelLine: { length: 4, length2: 3, lineStyle: { color: 'rgba(255,255,255,0.12)' } }, emphasis: { scale: false }, data: tradeBehavior.tradeTypeRatio, itemStyle: { borderColor: '#0A1628', borderWidth: 1 }, color: ['#00D4FF', '#FFD700', '#00FF88', '#FF6B6B'] }] }, true) }

const initHeat = () => { if (!heatChartRef.value) return; ht = echarts.init(heatChartRef.value); ht.setOption({ tooltip: { position: 'top', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 } }, grid: { left: 40, right: 8, top: 8, bottom: 16 }, xAxis: { type: 'category', data: tradeBehavior.hours, splitArea: { show: true, areaStyle: { color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.05)'] } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 1 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.1)' } } }, yAxis: { type: 'category', data: tradeBehavior.weekDays, splitArea: { show: true, areaStyle: { color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.05)'] } }, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 8 }, axisLine: { show: false } }, visualMap: { min: 0, max: 60, calculable: false, orient: 'horizontal', left: 'center', bottom: 0, inRange: { color: ['#0A1628', '#003366', '#0066FF', '#00D4FF', '#00FF88', '#FFD700', '#FF6B6B'] } }, series: [{ type: 'heatmap', data: tradeBehavior.hotTimeData.flatMap((row, yi) => tradeBehavior.hours.map((_, xi) => [xi, yi, row[xi * 2] || 0])), label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } } }] }, true) }

const all = () => [tc, tr, ht]

const startTooltipCarousel = () => {
  const total = channelTrend.months.length
  tooltipIndex = 0
  tooltipTimer = setInterval(() => {
    if (!tc) return
    tc.dispatchAction({ type: 'hideTip' })
    tc.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: tooltipIndex })
    tooltipIndex = (tooltipIndex + 1) % total
  }, 2000)
}

onMounted(() => { initTrend(); initTradeRing(); initHeat(); startTooltipCarousel(); nextTick(() => all().forEach(c => c?.resize())); window.addEventListener('resize', () => all().forEach(c => c?.resize())) })
onUnmounted(() => { if (tooltipTimer) clearInterval(tooltipTimer); all().forEach(c => c?.dispose()) })
</script>

<style lang="scss" scoped>
.trend-core { display: flex; flex-direction: column; gap: 8px; height: 100%; min-height: 0; position: relative; }
.tc-card { background: rgba(10,22,40,0.85); border: 1px solid rgba(0,212,255,0.18); border-radius: 4px; position: relative; overflow: hidden; }
.tc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent); }
.title { padding: 5px 8px; font-size: 11px; color: #00D4FF; font-weight: 600; border-bottom: 1px solid rgba(0,212,255,0.1); display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.title::before { content: ''; width: 3px; height: 10px; background: #00D4FF; border-radius: 2px; flex-shrink: 0; }
.legend { display: flex; gap: 6px; margin-left: auto; }
.l-item { display: flex; align-items: center; gap: 2px; font-size: 8px; color: rgba(255,255,255,0.4); }
.l-dot { width: 5px; height: 5px; border-radius: 50%; }
.trend-card { flex: 1; min-height: 0; }
.trend-card .tc-chart { width: 100%; height: calc(100% - 28px); }
.trade-card { flex: 0 0 38%; min-height: 0; }
.trade-body { display: flex; height: calc(100% - 28px); min-height: 0; }
.trade-ring { width: 35%; flex-shrink: 0; }
.trade-heat { flex: 1; min-width: 0; }
.core-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 80px; height: 80px; pointer-events: none; opacity: 0.06; background: radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%); animation: gp 4s ease-in-out infinite; }
@keyframes gp { 0%,100%{opacity:.04;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.1;transform:translate(-50%,-50%) scale(1.3)} }
</style>