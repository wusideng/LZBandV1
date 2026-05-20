<template>
  <div class="payment-core">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">支付核心中枢</span>
    </div>

    <div class="core-area">
      <!-- 能量环 -->
      <div class="energy-rings">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="ring ring-4"></div>
        <div class="radar-scan"></div>
        <div class="radar-scan delay"></div>
      </div>

      <!-- 中心数据 -->
      <div class="core-data">
        <div class="core-label">快捷支付总金额</div>
        <div class="core-value">
          <span class="number">{{ animatedAmount }}</span>
          <span class="unit">亿元</span>
        </div>
        <div class="core-sub">
          <div class="sub-item">
            <span class="sub-label">交易笔数</span>
            <span class="sub-value">{{ animatedTransactions }}万</span>
          </div>
          <div class="sub-item success">
            <span class="sub-label">成功率</span>
            <span class="sub-value">{{ coreData.successRate }}%</span>
          </div>
          <div class="sub-item active">
            <span class="sub-label">活跃指数</span>
            <span class="sub-value">{{ coreData.activeIndex }}</span>
          </div>
        </div>
      </div>

      <!-- 实时交易 -->
      <div class="realtime-badge">
        <span class="pulse-dot"></span>
        实时交易: <span class="today-amount">{{ coreData.todayAmount }}</span> 亿/日
      </div>
    </div>

    <!-- 支付成功率和活跃指数 -->
    <div class="indicators">
      <div class="indicator-card">
        <div class="indicator-header">
          <span class="indicator-icon">🎯</span>
          <span class="indicator-title">支付成功率</span>
        </div>
        <div ref="successGaugeRef" class="gauge-chart"></div>
        <div class="indicator-detail">
          <div class="detail-item">
            <span class="detail-label">微信</span>
            <span class="detail-value">{{ successRateData.wechat }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">支付宝</span>
            <span class="detail-value">{{ successRateData.alipay }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">银联</span>
            <span class="detail-value">{{ successRateData.unionpay }}%</span>
          </div>
        </div>
      </div>

      <div class="indicator-card">
        <div class="indicator-header">
          <span class="indicator-icon">📡</span>
          <span class="indicator-title">活跃指数</span>
        </div>
        <div ref="activeGaugeRef" class="gauge-chart"></div>
        <div class="indicator-detail">
          <div class="detail-item">
            <span class="detail-label">日活跃</span>
            <span class="detail-value">{{ activeIndexData.dailyActive }}万</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">周活跃</span>
            <span class="detail-value">{{ activeIndexData.weeklyActive }}万</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">月活跃</span>
            <span class="detail-value">{{ activeIndexData.monthlyActive }}万</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { coreData, successRateData, activeIndexData } from '../../mockData/quickpayData'

const successGaugeRef = ref(null)
const activeGaugeRef = ref(null)
let successGauge = null, activeGauge = null

const animatedAmount = ref('0.00')
const animatedTransactions = ref('0')

const animateNumber = (target, refVar, isFloat = true, duration = 2500) => {
  const start = Date.now()
  const cb = () => {
    const p = Math.min((Date.now() - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    const cur = target * ease
    refVar.value = isFloat ? cur.toFixed(2) : Math.floor(cur).toLocaleString()
    if (p < 1) requestAnimationFrame(cb)
  }
  requestAnimationFrame(cb)
}

const initGauges = () => {
  if (successGaugeRef.value) {
    successGauge = echarts.init(successGaugeRef.value)
    successGauge.setOption({
      backgroundColor: 'transparent',
      series: [{
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '80%',
        startAngle: 220,
        endAngle: -40,
        min: 95, max: 100,
        splitNumber: 5,
        progress: {
          show: true, width: 10,
          itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00D4FF' },
            { offset: 1, color: '#00FF88' }
          ])}
        },
        axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(0,212,255,0.1)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: { show: false },
        pointer: { width: 4, length: '60%', itemStyle: { color: '#00D4FF' } },
        data: [{ value: coreData.successRate }],
        title: { show: false }
      }],
      animationDuration: 2000
    })
  }

  if (activeGaugeRef.value) {
    activeGauge = echarts.init(activeGaugeRef.value)
    activeGauge.setOption({
      backgroundColor: 'transparent',
      series: [{
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '80%',
        startAngle: 220,
        endAngle: -40,
        min: 0, max: 100,
        splitNumber: 5,
        progress: {
          show: true, width: 10,
          itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#A855F7' },
            { offset: 1, color: '#00D4FF' }
          ])}
        },
        axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(168,85,247,0.1)']] } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: { show: false },
        pointer: { width: 4, length: '60%', itemStyle: { color: '#A855F7' } },
        data: [{ value: coreData.activeIndex }],
        title: { show: false }
      }],
      animationDuration: 2000
    })
  }
}

onMounted(() => {
  animateNumber(coreData.totalAmount, animatedAmount, true)
  animateNumber(coreData.totalTransactions, animatedTransactions, false)
  initGauges()
  window.addEventListener('resize', () => {
    successGauge?.resize()
    activeGauge?.resize()
  })
})

onUnmounted(() => {
  successGauge?.dispose()
  activeGauge?.dispose()
})
</script>

<style lang="scss" scoped>
.payment-core {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 15px;
}

.panel-title {
  display: flex; align-items: center; gap: 10px;
  .title-line { width: 3px; height: 16px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }
  .title-text { font-size: 15px; font-weight: 600; color: #fff; }
}

// 核心区域
.core-area {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.12);
  border-radius: 10px;
  overflow: hidden;
}

// 能量环
.energy-rings {
  position: absolute;
  width: 220px; height: 220px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);

  .ring {
    position: absolute; border-radius: 50%;
    border: 1px solid;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: ringPulse 3s ease-in-out infinite;

    &.ring-1 { width: 80px; height: 80px; border-color: rgba(0,212,255,0.4); animation-delay: 0s; }
    &.ring-2 { width: 130px; height: 130px; border-color: rgba(0,212,255,0.25); animation-delay: 0.5s; }
    &.ring-3 { width: 180px; height: 180px; border-color: rgba(0,212,255,0.15); animation-delay: 1s; }
    &.ring-4 { width: 230px; height: 230px; border-color: rgba(0,212,255,0.08); animation-delay: 1.5s; }
  }

  .radar-scan {
    position: absolute;
    width: 230px; height: 230px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, rgba(0,212,255,0.06), transparent);
    animation: radar 4s linear infinite;

    &.delay { animation-delay: 2s; }
  }
}

// 中心数据
.core-data {
  position: relative; z-index: 10;
  text-align: center;

  .core-label { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 10px; }

  .core-value {
    .number {
      font-size: 48px; font-weight: 700; color: #00D4FF;
      text-shadow: 0 0 30px rgba(0,212,255,0.8);
      font-family: 'DIN Alternate', monospace;
    }
    .unit { font-size: 18px; color: rgba(255,255,255,0.5); margin-left: 5px; }
  }

  .core-sub {
    display: flex; gap: 20px; margin-top: 15px;
    padding: 12px 20px;
    background: rgba(0,212,255,0.05);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 8px;

    .sub-item {
      text-align: center;
      .sub-label { display: block; font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
      .sub-value { font-size: 16px; font-weight: 600; color: #fff; font-family: 'DIN Alternate', monospace; }
      &.success .sub-value { color: #00FF88; }
      &.active .sub-value { color: #A855F7; }
    }
  }
}

// 实时交易徽章
.realtime-badge {
  position: absolute;
  bottom: 15px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 6px;
  padding: 6px 16px;
  background: rgba(0,212,255,0.1);
  border: 1px solid rgba(0,212,255,0.3);
  border-radius: 20px;
  font-size: 12px; color: rgba(255,255,255,0.7);

  .pulse-dot { width: 6px; height: 6px; background: #00FF88; border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
  .today-amount { font-weight: 600; color: #00D4FF; }
}

// 指标卡片
.indicators {
  display: flex;
  gap: 15px;
}

.indicator-card {
  flex: 1;
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;

  .indicator-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
    .indicator-icon { font-size: 16px; }
    .indicator-title { font-size: 12px; color: rgba(255,255,255,0.7); }
  }

  .gauge-chart { width: 100%; height: 80px; }

  .indicator-detail {
    display: flex;
    justify-content: space-around;
    padding-top: 8px;
    border-top: 1px solid rgba(0,212,255,0.1);

    .detail-item {
      text-align: center;
      .detail-label { display: block; font-size: 10px; color: rgba(255,255,255,0.5); }
      .detail-value { font-size: 12px; font-weight: 600; color: #00D4FF; }
    }
  }
}

@keyframes ringPulse {
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%,-50%) scale(1.05); opacity: 0.6; }
}

@keyframes radar {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to { transform: translate(-50%,-50%) rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}
</style>