<template>
  <div class="user-behavior">
    <!-- 客户活跃分析 -->
    <div class="ub-card act-card">
      <div class="title">客户活跃分析</div>
      <div class="act-content">
        <div class="act-left">
          <div class="chart-box" ref="loginChartRef"></div>
          <div class="chart-box" ref="durationChartRef"></div>
        </div>
        <div class="act-right">
          <div class="top-funcs">
            <div class="func-title">高频功能</div>
            <div class="func-list">
              <div v-for="(f, i) in userActivity.topFunctions" :key="f.name" class="func-item">
                <span class="func-rank">{{ i + 1 }}</span>
                <span class="func-name">{{ f.name }}</span>
                <span class="func-val">{{ f.value }}%</span>
                <div class="func-bar"><div class="func-bar-inner" :style="{ width: f.value + '%' }"></div></div>
              </div>
            </div>
          </div>
          <div class="bottom-charts">
            <div class="mini-chart" ref="retentionChartRef"></div>
            <div class="mini-chart" ref="ratioChartRef"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 渠道分布分析（从中间移过来的） -->
    <div class="ub-card dist-card">
      <div class="title">渠道分布分析
        <span class="dtabs" @click="activeDist='channel'" :class="{on:activeDist==='channel'}">渠道占比</span>
        <span class="dtabs" @click="activeDist='online'" :class="{on:activeDist==='online'}">线上vs线下</span>
      </div>
      <div class="dist-body">
        <div class="dist-chart" ref="distChartRef"></div>
        <div class="dist-stats">
          <div class="d-item" v-for="d in distStats" :key="d.label">
            <span class="dl">{{ d.label }}</span><span class="dv">{{ d.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { userActivity, channelDistribution } from '../../mockData/channelData'

const loginChartRef = ref(null); const durationChartRef = ref(null)
const retentionChartRef = ref(null); const ratioChartRef = ref(null)
const distChartRef = ref(null)

let lc, dc, rc, rac, distChart
const activeDist = ref('channel')

const distStats = computed(() => {
  if (activeDist.value === 'channel') return channelDistribution.channelRatio.map(d => ({ label: d.name, value: d.value + '%' }))
  return channelDistribution.onlineOfflineRatio.map(d => ({ label: d.name, value: d.value + '%' }))
})

const initLogin = () => { if (!loginChartRef.value) return; lc = echarts.init(loginChartRef.value); lc.setOption({ grid: { left: 28, right: 4, top: 6, bottom: 14 }, xAxis: { type: 'category', data: userActivity.loginTrend.dates, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.12)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 2 }, axisTick: { show: false } }, yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 7 }, axisLine: { show: false }, axisTick: { show: false } }, series: [{ type: 'line', data: userActivity.loginTrend.values, smooth: true, symbol: 'none', lineStyle: { color: '#00D4FF', width: 1.5 }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,212,255,0.25)' }, { offset: 1, color: 'rgba(0,212,255,0)' }]) } }], tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 }, formatter: (p) => `${p[0].axisValue}<br/>登录次数: ${p[0].value}万次` } }, true) }
const initDuration = () => { if (!durationChartRef.value) return; dc = echarts.init(durationChartRef.value); dc.setOption({ grid: { left: 28, right: 4, top: 6, bottom: 14 }, xAxis: { type: 'category', data: userActivity.visitDuration.dates, axisLine: { lineStyle: { color: 'rgba(0,255,136,0.12)' } }, axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 7, interval: 2 }, axisTick: { show: false } }, yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } }, axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 7 }, axisLine: { show: false }, axisTick: { show: false } }, series: [{ type: 'bar', data: userActivity.visitDuration.values, barWidth: '50%', itemStyle: { borderRadius: [1, 1, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00FF88' }, { offset: 1, color: 'rgba(0,255,136,0.2)' }]) } }], tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00FF88', textStyle: { color: '#fff', fontSize: 9 }, formatter: (p) => `${p[0].axisValue}<br/>访问时长: ${p[0].value}分钟` } }, true) }
const initRetention = () => { if (!retentionChartRef.value) return; rc = echarts.init(retentionChartRef.value); rc.setOption({ tooltip: { trigger: 'item', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 }, formatter: (p) => `${p.name}: ${p.value}%` }, series: [{ type: 'funnel', left: 10, right: 30, top: 8, bottom: 8, minSize: 20, maxSize: 100, label: { show: true, position: 'left', color: 'rgba(255,255,255,0.5)', fontSize: 7, formatter: (p) => p.name }, labelLine: { show: false }, itemStyle: { borderColor: '#0A1628', borderWidth: 1 }, data: userActivity.retentionData, color: ['#00D4FF', '#0099FF', '#0066FF', '#0033CC', '#001166', '#000033'] }] }, true) }
const initRatio = () => { if (!ratioChartRef.value) return; rac = echarts.init(ratioChartRef.value); rac.setOption({ series: [{ type: 'pie', radius: ['50%', '72%'], center: ['50%', '50%'], label: { show: true, color: 'rgba(255,255,255,0.5)', fontSize: 7, formatter: '{d}%' }, labelLine: { length: 3, length2: 2, lineStyle: { color: 'rgba(255,255,255,0.1)' } }, emphasis: { scale: false }, data: userActivity.customerRatio, itemStyle: { borderColor: '#0A1628', borderWidth: 1 }, color: ['#00D4FF', '#00FF88', '#0066FF'] }] }, true) }

const initDist = () => { if (!distChartRef.value) return; distChart = echarts.init(distChartRef.value); updateDist() }
const updateDist = () => {
  if (!distChart) return
  const isChannel = activeDist.value === 'channel'
  const data = isChannel ? channelDistribution.channelRatio : channelDistribution.onlineOfflineRatio
  distChart.setOption({
    tooltip: { trigger: 'item', backgroundColor: 'rgba(10,22,40,0.9)', borderColor: '#00D4FF', textStyle: { color: '#fff', fontSize: 9 }, formatter: '{b}: {c}%' },
    series: [{ type: 'pie', radius: isChannel ? ['40%', '70%'] : ['30%', '70%'], roseType: isChannel ? false : 'area', center: ['50%', '50%'], label: { show: true, color: 'rgba(255,255,255,0.5)', fontSize: 7, formatter: '{b}\n{d}%' }, labelLine: { length: 3, length2: 2, lineStyle: { color: 'rgba(255,255,255,0.1)' } }, emphasis: { scale: false }, data, itemStyle: { borderColor: '#0A1628', borderWidth: 1 }, color: ['#00D4FF', '#00FF88', '#FFD700', '#FF6B6B'] }]
  }, true)
}

const all = () => [lc, dc, rc, rac, distChart]
onMounted(() => { initLogin(); initDuration(); initRetention(); initRatio(); initDist(); nextTick(() => all().forEach(c => c?.resize())); window.addEventListener('resize', () => all().forEach(c => c?.resize())) })
onUnmounted(() => { all().forEach(c => c?.dispose()) })
</script>

<style lang="scss" scoped>
.user-behavior { display: flex; flex-direction: column; gap: 8px; flex: 1; height: 100%; min-height: 0; }
.ub-card { background: rgba(10,22,40,0.85); border: 1px solid rgba(0,212,255,0.18); border-radius: 4px; position: relative; overflow: hidden; display: flex; flex-direction: column; }
.ub-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent); }
.title { padding: 5px 8px; font-size: 11px; color: #00D4FF; font-weight: 600; border-bottom: 1px solid rgba(0,212,255,0.1); flex: 0 0 auto; display: flex; align-items: center; gap: 6px; }
.title::before { content: ''; width: 3px; height: 10px; background: #00D4FF; border-radius: 2px; flex-shrink: 0; }
.act-card { flex: 0 0 55%; min-height: 0; }
.dist-card { flex: 1; min-height: 0; }
.act-content { display: flex; flex: 1; min-height: 0; }
.act-left { width: 40%; display: flex; flex-direction: column; gap: 3px; padding: 3px; }
.act-left .chart-box { flex: 1; min-height: 0; }
.act-right { flex: 1; display: flex; flex-direction: column; padding: 3px 3px 3px 0; }
.top-funcs { flex: 0 0 auto; }
.func-title { font-size: 9px; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
.func-list { display: flex; flex-direction: column; gap: 2px; }
.func-item { display: flex; align-items: center; gap: 3px; font-size: 9px; }
.func-rank { color: #FFD700; font-weight: 600; width: 12px; text-align: center; }
.func-name { color: rgba(255,255,255,0.6); width: 52px; }
.func-val { color: #00D4FF; width: 30px; text-align: right; font-family: 'DIN Alternate',monospace; }
.func-bar { flex: 1; height: 5px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
.func-bar-inner { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #00D4FF, #0066FF); }
.bottom-charts { flex: 1; display: flex; gap: 3px; min-height: 0; }
.mini-chart { flex: 1; min-width: 0; }
.dtabs { font-size: 8px; color: rgba(255,255,255,0.3); cursor: pointer; padding: 1px 5px; border-radius: 4px; border: 1px solid transparent; margin-left: 0; }
.dtabs.on { color: #00D4FF; background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.2); }
.dist-body { display: flex; flex: 1; min-height: 0; }
.dist-chart { flex: 1; min-width: 0; }
.dist-stats { width: 100px; flex-shrink: 0; display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 4px; border-left: 1px solid rgba(0,212,255,0.08); }
.d-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.dl { font-size: 9px; color: rgba(255,255,255,0.5); }
.dv { font-size: 16px; font-weight: 700; color: #00D4FF; font-family: 'DIN Alternate',monospace; }
</style>