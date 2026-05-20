<template>
  <div class="bottom-analysis">
    <!-- 月度经营分析 -->
    <div class="analysis-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>月度经营分析</span>
      </div>
      <div ref="monthlyChartRef" class="chart"></div>
    </div>

    <!-- 年度经营分析 -->
    <div class="analysis-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>年度经营分析</span>
      </div>
      <div ref="yearlyChartRef" class="chart"></div>
    </div>

    <!-- 实时动态流 -->
    <div class="flow-section">
      <div class="section-header">
        <span class="header-icon"></span>
        <span>实时交易动态</span>
        <span class="flow-badge">
          <span class="pulse-dot"></span>
          实时
        </span>
      </div>
      <div class="flow-list">
        <div v-for="item in displayFlow" :key="item.time + item.channel" class="flow-item">
          <span class="flow-time">{{ item.time }}</span>
          <span class="flow-channel" :class="getChannelClass(item.channel)">{{ item.channel }}</span>
          <span class="flow-amount">{{ item.amount.toFixed(2) }}</span>
          <span class="flow-status" :class="item.status">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import { monthlyData, yearlyData, realtimeFlow } from '../../mockData/quickpayData'

const monthlyChartRef = ref(null)
const yearlyChartRef = ref(null)
let monthlyChart = null, yearlyChart = null

const flowList = ref([...realtimeFlow])
const displayFlow = computed(() => flowList.value.slice(0, 5))

let flowTimer = null

const getChannelClass = (channel) => {
  if (channel.includes('微信')) return 'wechat'
  if (channel.includes('支付')) return 'alipay'
  if (channel.includes('银联')) return 'unionpay'
  return 'other'
}

const addFlow = () => {
  const channels = ['微信支付', '支付宝', '银联支付']
  const newItem = {
    channel: channels[Math.floor(Math.random() * channels.length)],
    amount: Math.random() * 2000 + 50,
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
    status: 'success'
  }
  flowList.value.unshift(newItem)
  if (flowList.value.length > 8) flowList.value.pop()
}

const initMonthlyChart = () => {
  if (!monthlyChartRef.value) return
  monthlyChart = echarts.init(monthlyChartRef.value)
  monthlyChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 }
    },
    legend: {
      data: ['交易笔数', '交易金额'],
      textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
      top: 5
    },
    grid: { left: 40, right: 10, top: 30, bottom: 20 },
    xAxis: {
      type: 'category',
      data: monthlyData.months.map(m => m.slice(5)),
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }
    },
    yAxis: [
      { type: 'value', name: '万笔', nameTextStyle: { color: 'rgba(255,255,255,0.4)', fontSize: 9 }, axisLine: { show: false }, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } } },
      { type: 'value', name: '亿', nameTextStyle: { color: 'rgba(255,255,255,0.4)', fontSize: 9 }, axisLine: { show: false }, axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 }, splitLine: { show: false } }
    ],
    series: [
      { name: '交易笔数', type: 'bar', yAxisIndex: 0, data: monthlyData.transactions, barWidth: '40%', itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#00D4FF'},{offset:1,color:'rgba(0,212,255,0.2)'}]), borderRadius: [3,3,0,0] } },
      { name: '交易金额', type: 'line', yAxisIndex: 1, data: monthlyData.amount, smooth: true, lineStyle: { color: '#00FF88', width: 2 }, itemStyle: { color: '#00FF88' } }
    ],
    animationDuration: 1500
  })
}

const initYearlyChart = () => {
  if (!yearlyChartRef.value) return
  yearlyChart = echarts.init(yearlyChartRef.value)
  yearlyChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10,22,40,0.95)',
      borderColor: '#00D4FF',
      textStyle: { color: '#fff', fontSize: 11 }
    },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: 'category',
      data: yearlyData.years,
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: { color: 'rgba(255,255,255,0.4)', fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } }
    },
    series: [{
      type: 'bar',
      data: yearlyData.amount.map((v, i) => ({ value: v, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:i===2?'#00FFFF':'#00D4FF'},{offset:1,color:i===2?'rgba(0,255,255,0.3)':'rgba(0,212,255,0.2)'}]), borderRadius: [5,5,0,0] } })),
      barWidth: '50%',
      label: { show: true, position: 'top', formatter: '{c}亿', color: '#00D4FF', fontSize: 11 }
    }],
    animationDuration: 2000
  })
}

onMounted(() => {
  initMonthlyChart()
  initYearlyChart()
  flowTimer = setInterval(addFlow, 3000)
  window.addEventListener('resize', () => {
    monthlyChart?.resize()
    yearlyChart?.resize()
  })
})

onUnmounted(() => {
  if (flowTimer) clearInterval(flowTimer)
  monthlyChart?.dispose()
  yearlyChart?.dispose()
})
</script>

<style lang="scss" scoped>
.bottom-analysis {
  flex: 0 0 45%;
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr;
  gap: 12px;
  padding: 15px 20px;
  background: linear-gradient(0deg, rgba(0,212,255,0.05) 0%, transparent 100%);
  border-top: 1px solid rgba(0,212,255,0.15);
  min-height: 0;
}

.analysis-section {
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .section-header {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 10px;
    .header-icon { width: 3px; height: 14px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }
  }

  .chart { flex: 1; width: 100%; min-height: 120px; }
}

.flow-section {
  background: rgba(0,212,255,0.03);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .section-header {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 10px;
    .header-icon { width: 3px; height: 14px; background: linear-gradient(180deg,#00D4FF,#0088FF); border-radius: 2px; }

    .flow-badge {
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
}

.flow-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .flow-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.08);
    border-radius: 6px;
    font-size: 12px;
    animation: slideIn 0.4s ease;

    .flow-time { width: 60px; color: rgba(255,255,255,0.4); font-family: 'Roboto Mono', monospace; }

    .flow-channel {
      padding: 2px 8px; border-radius: 4px; font-size: 11px;
      &.wechat { background: rgba(0,212,255,0.15); color: #00D4FF; }
      &.alipay { background: rgba(0,255,136,0.15); color: #00FF88; }
      &.unionpay { background: rgba(168,85,247,0.15); color: #A855F7; }
      &.other { background: rgba(255,170,0,0.15); color: #FFAA00; }
    }

    .flow-amount { flex: 1; text-align: right; font-weight: 600; color: #00FF88; font-family: 'DIN Alternate', monospace; }

    .flow-status { width: 50px; text-align: center; font-size: 11px; &.success { color: #00FF88; } &.failed { color: #FF6B6B; } }
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