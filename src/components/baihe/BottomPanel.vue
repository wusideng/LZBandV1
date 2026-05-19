<template>
  <div class="bottom-panel">
    <!-- 会员增长 -->
    <div class="bottom-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>会员增长分析</span>
      </div>
      <div class="member-content">
        <div class="member-main">
          <div class="member-total">
            <span class="number">{{ animatedTotal }}</span>
            <span class="unit">{{ memberGrowthData.unit }}</span>
          </div>
          <div class="member-growth">
            <span class="label">当月新增</span>
            <span class="value">{{ memberGrowthData.monthlyIncrease }}万</span>
            <span class="rate up">↑ {{ memberGrowthData.growth }}%</span>
          </div>
        </div>
        <div ref="memberTrendRef" class="trend-chart"></div>
      </div>
    </div>

    <!-- 平台活跃 -->
    <div class="bottom-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>平台活跃分析</span>
      </div>
      <div class="active-content">
        <div ref="activeGaugeRef" class="gauge-chart"></div>
        <div class="active-meta">
          <div class="meta-item">
            <span class="meta-label">日活跃</span>
            <span class="meta-value">{{ activityData.dailyActive }}万</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">周活跃</span>
            <span class="meta-value">{{ activityData.weeklyActive }}万</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">月活跃</span>
            <span class="meta-value">{{ activityData.monthlyActive }}万</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时经营动态流 -->
    <div class="bottom-section flow-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>实时经营动态流</span>
        <span class="flow-badge">
          <span class="pulse-dot"></span>
          实时
        </span>
      </div>
      <div class="flow-list" ref="flowRef">
        <div v-for="item in displayEvents" :key="item.id" class="flow-item" :class="item.type">
          <span class="flow-icon">{{ item.icon }}</span>
          <span class="flow-desc">{{ item.desc }}</span>
          <span class="flow-amount">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { memberGrowthData, activityData, realtimeEvents } from '../../mockData/baiheData'

const memberTrendRef = ref(null)
const activeGaugeRef = ref(null)
const flowRef = ref(null)
let memberChart = null, activeChart = null

const animatedTotal = ref('0')
const animatedAmount = ref('0')

// 会员趋势图
const initMemberChart = () => {
  if (!memberTrendRef.value) return
  memberChart = echarts.init(memberTrendRef.value)
  memberChart.setOption({
    backgroundColor: 'transparent',
    grid: { left: 5, right: 5, top: 5, bottom: 10 },
    xAxis: { type: 'category', data: memberGrowthData.monthlyTrend.map(i => i.month), axisLine: { show: false }, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 } },
    yAxis: { type: 'value', show: false },
    series: [{
      type: 'line',
      data: memberGrowthData.monthlyTrend.map(i => i.value),
      smooth: true,
      showSymbol: true,
      symbolSize: 4,
      lineStyle: { color: '#00D4FF', width: 2 },
      areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [
        { offset: 0, color: 'rgba(0,212,255,0.3)' },
        { offset: 1, color: 'rgba(0,212,255,0)' }
      ])}
    }],
    animationDuration: 1500
  })
}

// 活跃仪表盘
const initActiveGauge = () => {
  if (!activeGaugeRef.value) return
  activeChart = echarts.init(activeGaugeRef.value)
  activeChart.setOption({
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      center: ['50%', '60%'],
      radius: '90%',
      startAngle: 220,
      endAngle: -40,
      min: 0, max: 100,
      splitNumber: 5,
      progress: {
        show: true,
        width: 8,
        itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [
          { offset: 0, color: '#A855F7' },
          { offset: 1, color: '#00D4FF' }
        ]}}
      },
      axisLine: { lineStyle: { width: 8, color: [[1, 'rgba(0,212,255,0.12)']] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: { show: false },
      pointer: { width: 3, length: '55%', itemStyle: { color: '#A855F7' } },
      data: [{ value: activityData.activityIndex }],
      title: { show: false }
    }],
    animationDuration: 2000
  })
}

// 数字动画
const animateNumber = (target, refVar, duration = 2000) => {
  const start = Date.now()
  const cb = () => {
    const p = Math.min((Date.now() - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    refVar.value = (target * ease).toFixed(1)
    if (p < 1) requestAnimationFrame(cb)
  }
  requestAnimationFrame(cb)
}

// 实时交易流
let eventId = 0
const eventList = ref(realtimeEvents.map(e => ({ ...e, id: ++eventId })))
const displayEvents = computed(() => eventList.value.slice(0, 6))

let flowTimer = null
const eventTemplates = [
  { type: 'buy', icon: '🛒', desc: '用户购买 ', amount: '' },
  { type: 'trade', icon: '💼', desc: '商户成交 ', amount: '' },
  { type: 'recharge', icon: '💰', desc: '会员充值 ', amount: '' },
  { type: 'hot', icon: '🔥', desc: '热门商品 ', amount: '' }
]
const items = ['生鲜礼包', '粮油米面', '数码配件', '家居用品', '美妆护肤', '品牌商户', '中小商户']
const genPrice = () => `¥${(Math.random() * 3000 + 100).toFixed(0)}`

const addEvent = () => {
  const tmpl = eventTemplates[Math.floor(Math.random() * eventTemplates.length)]
  const item = items[Math.floor(Math.random() * items.length)]
  const newEvent = {
    id: ++eventId,
    type: tmpl.type,
    icon: tmpl.icon,
    desc: tmpl.desc + (tmpl.type === 'recharge' ? '余额' : item),
    amount: genPrice()
  }
  eventList.value.unshift(newEvent)
  if (eventList.value.length > 10) eventList.value.pop()
}

onMounted(() => {
  animateNumber(memberGrowthData.total, animatedTotal)
  initMemberChart()
  initActiveGauge()
  flowTimer = setInterval(addEvent, 2500)
  window.addEventListener('resize', () => {
    memberChart?.resize()
    activeChart?.resize()
  })
})

onUnmounted(() => {
  if (flowTimer) clearInterval(flowTimer)
  memberChart?.dispose()
  activeChart?.dispose()
})
</script>

<style lang="scss" scoped>
.bottom-panel {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 12px;
  padding: 10px 20px;
  flex: 0 0 25%;
  min-height: 0;
  background: linear-gradient(0deg, rgba(0,212,255,0.05) 0%, transparent 100%);
  border-top: 1px solid rgba(0,212,255,0.15);
}

.bottom-section {
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .section-header {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 8px;
    .header-icon { width: 3px; height: 14px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }
  }
}

// 会员增长
.member-content {
  display: flex; flex-direction: column; gap: 6px;
  flex: 1;
  min-height: 0;

  .member-main {
    display: flex; align-items: baseline; justify-content: space-between;
    .member-total {
      .number { font-size: 24px; font-weight: 700; color: #00D4FF; text-shadow: 0 0 20px rgba(0,212,255,0.5); font-family: 'DIN Alternate', monospace; }
      .unit { font-size: 12px; color: rgba(255,255,255,0.5); }
    }
    .member-growth {
      text-align: right;
      .label { display: block; font-size: 10px; color: rgba(255,255,255,0.5); }
      .value { font-size: 14px; font-weight: 600; color: #fff; }
      .rate { font-size: 11px; font-weight: 600; &.up { color: #00FF88; } }
    }
  }

  .trend-chart { flex: 1; width: 100%; min-height: 40px; }
}

// 平台活跃
.active-content {
  display: flex; align-items: center; gap: 10px;
  flex: 1;

  .gauge-chart { width: 80px; height: 80px; flex-shrink: 0; }

  .active-meta {
    flex: 1;
    .meta-item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(0,212,255,0.06); }
    .meta-label { font-size: 10px; color: rgba(255,255,255,0.5); }
    .meta-value { font-size: 12px; font-weight: 600; color: #A855F7; }
  }
}

// 实时流
.flow-section {
  .section-header .flow-badge {
    margin-left: auto;
    display: flex; align-items: center; gap: 4px;
    padding: 2px 8px;
    background: rgba(0,212,255,0.1);
    border: 1px solid rgba(0,212,255,0.3);
    border-radius: 10px;
    font-size: 10px; color: #00D4FF;

    .pulse-dot { width: 5px; height: 5px; background: #00FF88; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
  }
}

.flow-list {
  display: flex; flex-direction: column; gap: 4px;
  flex: 1;
  overflow: hidden;

  .flow-item {
    display: flex; align-items: center; gap: 8px;
    padding: 5px 10px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.08);
    border-radius: 5px;
    font-size: 11px;
    animation: slideIn 0.4s ease;

    .flow-icon { font-size: 14px; }
    .flow-desc { flex: 1; color: rgba(255,255,255,0.7); }
    .flow-amount { font-weight: 600; color: #00FF88; font-family: 'DIN Alternate', monospace; }

    &.hot .flow-amount { color: #FFAA00; }
    &.recharge .flow-amount { color: #A855F7; }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>