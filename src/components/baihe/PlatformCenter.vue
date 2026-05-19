<template>
  <div class="platform-center">
    <div class="panel-title">
      <span class="title-line"></span>
      <span class="title-text">平台经营核心区</span>
    </div>

    <div class="core-area">
      <!-- 能量环 -->
      <div class="energy-rings">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
        <div class="ring ring-4"></div>
        <div class="radar-scan"></div>
      </div>

      <!-- 中心数据 -->
      <div class="core-data">
        <div class="core-label">本月总交易金额</div>
        <div class="core-value">
          <span class="number">{{ animatedAmount }}</span>
          <span class="unit">亿元</span>
        </div>
        <div class="core-sub">
          <div class="sub-item">
            <span class="sub-label">交易笔数</span>
            <span class="sub-value">{{ animatedTransactions }}万笔</span>
          </div>
          <div class="sub-item">
            <span class="sub-label">新增会员</span>
            <span class="sub-value">{{ animatedMembers }}万人</span>
          </div>
          <div class="sub-item">
            <span class="sub-label">环比增长</span>
            <span class="sub-value up">+18.6%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部图表区 -->
    <div class="charts-area">
      <div class="chart-box">
        <div class="box-title">交易结构</div>
        <div ref="structureChartRef" class="chart"></div>
      </div>
      <div class="chart-box">
        <div class="box-title">商户贡献占比</div>
        <div ref="merchantChartRef" class="chart"></div>
      </div>
      <div class="chart-box">
        <div class="box-title">会员活跃占比</div>
        <div ref="memberChartRef" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { platformData } from '../../mockData/baiheData'

const structureChartRef = ref(null)
const merchantChartRef = ref(null)
const memberChartRef = ref(null)
let structureChart = null, merchantChart = null, memberChart = null

const animatedAmount = ref('0.00')
const animatedTransactions = ref('0')
const animatedMembers = ref('0')

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

const initPieChart = (el, data, colors) => {
  if (!el) return null
  const chart = echarts.init(el)
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 },
      formatter: '{b}: {d}%'
    },
    series: [{
      type: 'pie',
      radius: ['45%', '68%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 3, borderColor: 'rgba(10,22,40,0.9)', borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 9,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 14
      },
      emphasis: { label: { show: true, fontSize: 11, color: '#fff' } },
      data: data.map((item, i) => ({
        ...item,
        itemStyle: { color: colors[i % colors.length] }
      }))
    }],
    animationDuration: 1500
  })
  return chart
}

onMounted(() => {
  animateNumber(platformData.totalAmount, animatedAmount, true)
  animateNumber(platformData.totalTransactions, animatedTransactions, false)
  animateNumber(platformData.totalMembers, animatedMembers, false)

  structureChart = initPieChart(structureChartRef.value, platformData.tradeStructure, ['#00D4FF', '#00FF88', '#A855F7', '#FFAA00'])
  merchantChart = initPieChart(merchantChartRef.value, platformData.merchantContribution, ['#00FF88', '#00D4FF', '#A855F7'])
  memberChart = initPieChart(memberChartRef.value, platformData.memberActivity, ['#00D4FF', '#FFAA00', '#4C9AFF'])

  window.addEventListener('resize', () => {
    structureChart?.resize()
    merchantChart?.resize()
    memberChart?.resize()
  })
})

onUnmounted(() => {
  structureChart?.dispose()
  merchantChart?.dispose()
  memberChart?.dispose()
})
</script>

<style lang="scss" scoped>
.platform-center {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
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

    &.ring-1 {
      width: 80px; height: 80px;
      border-color: rgba(0,212,255,0.4);
      animation-delay: 0s;
    }
    &.ring-2 {
      width: 130px; height: 130px;
      border-color: rgba(0,212,255,0.25);
      animation-delay: 0.5s;
    }
    &.ring-3 {
      width: 180px; height: 180px;
      border-color: rgba(0,212,255,0.15);
      animation-delay: 1s;
    }
    &.ring-4 {
      width: 230px; height: 230px;
      border-color: rgba(0,212,255,0.08);
      animation-delay: 1.5s;
    }
  }

  .radar-scan {
    position: absolute;
    width: 230px; height: 230px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent, rgba(0,212,255,0.06), transparent);
    animation: radar 4s linear infinite;
  }
}

// 中心数据
.core-data {
  position: relative; z-index: 10;
  text-align: center;

  .core-label {
    font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 10px;
  }

  .core-value {
    .number {
      font-size: 52px; font-weight: 700; color: #00D4FF;
      text-shadow: 0 0 30px rgba(0,212,255,0.8);
      font-family: 'DIN Alternate', monospace;
    }
    .unit { font-size: 18px; color: rgba(255,255,255,0.5); margin-left: 5px; }
  }

  .core-sub {
    display: flex; gap: 25px; margin-top: 15px;
    padding: 15px 25px;
    background: rgba(0,212,255,0.05);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 8px;

    .sub-item {
      text-align: center;
      .sub-label { display: block; font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 5px; }
      .sub-value { font-size: 18px; font-weight: 600; color: #fff; font-family: 'DIN Alternate', monospace; }
      .sub-value.up { color: #00FF88; }
    }
  }
}

// 底部图表
.charts-area {
  display: flex; gap: 12px;
}

.chart-box {
  flex: 1;
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;

  .box-title {
    font-size: 12px; color: rgba(255,255,255,0.6);
    margin-bottom: 8px; text-align: center;
  }

  .chart { height: 140px; width: 100%; }
}

@keyframes ringPulse {
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%,-50%) scale(1.05); opacity: 0.6; }
}

@keyframes radar {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to { transform: translate(-50%,-50%) rotate(360deg); }
}
</style>