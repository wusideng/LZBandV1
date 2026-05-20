<template>
  <div class="finance-bottom">
    <!-- 机构经营排名 -->
    <div class="bottom-card ranking-card">
      <div class="card-title">
        机构经营排名 <span class="sub-title">TOP10</span>
        <div class="rank-tabs">
          <span v-for="tab in rankTabs" :key="tab.key" class="rank-tab"
            :class="{ active: activeRankTab === tab.key }"
            @click="activeRankTab = tab.key">{{ tab.label }}</span>
        </div>
      </div>
      <div class="rank-table-wrap">
        <table class="rank-table">
          <thead>
            <tr><th class="rank-col">排名</th><th class="name-col">机构名称</th><th class="value-col">{{ currentRankLabel }}</th><th class="growth-col">增长率</th></tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in currentRankData" :key="idx" class="rank-row"
                  :class="{ 'top1': item.rank === 1, 'top2': item.rank === 2, 'top3': item.rank === 3 }">
                <td class="rank-col"><span v-if="item.rank <= 3" class="medal">{{ medals[item.rank - 1] }}</span><span v-else class="rank-num">{{ item.rank }}</span></td>
                <td class="name-col">{{ item.name }}</td>
                <td class="value-col"><span class="rank-value">{{ item.value }}</span><span class="rank-unit">亿</span></td>
                <td class="growth-col"><span class="growth-tag" :class="item.growth >= 0 ? 'up' : 'down'">{{ item.growth >= 0 ? '+' : '' }}{{ item.growth }}%</span></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 风险预警区 -->
    <div class="bottom-card risk-card">
      <div class="card-title">
        经营风险预警中心
        <span class="risk-count"><span class="count-num">{{ newAlertCount }}</span> 条新预警</span>
      </div>
      <div class="risk-list-wrap">
        <div class="risk-list scroll-list">
          <template v-for="i in 2" :key="i">
            <div v-for="item in riskAlerts" :key="item.id" class="risk-item" :class="[`level-${item.level}`, `status-${item.status}`]">
              <div class="risk-left">
                <span class="risk-level-dot"></span>
                <span class="risk-type-tag" :class="item.type">{{ typeLabels[item.type] }}</span>
              </div>
              <div class="risk-content">{{ item.content }}</div>
              <div class="risk-right">
                <span class="risk-time">{{ item.time }}</span>
                <span class="risk-status-tag" :class="item.status">{{ item.status === 'new' ? '新' : item.status === 'processing' ? '处理中' : '已处置' }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { branchRanking, riskAlerts as riskData } from '../../mockData/financeData'

const medals = ['🥇', '🥈', '🥉']

const rankTabs = [
  { key: 'depositRanking', label: '存款排名' },
  { key: 'aumRanking', label: 'AUM排名' },
  { key: 'customerGrowthRanking', label: '客户增长' },
  { key: 'loanGrowthRanking', label: '贷款增长' },
  { key: 'wealthIncomeRanking', label: '财富中收' }
]

const activeRankTab = ref('depositRanking')

const rankLabels = {
  depositRanking: '存款余额(亿)', aumRanking: 'AUM资产(亿)',
  customerGrowthRanking: '新增客户(万)', loanGrowthRanking: '贷款增量(亿)',
  wealthIncomeRanking: '财富中收(亿)'
}

const currentRankLabel = computed(() => rankLabels[activeRankTab.value])
const currentRankData = computed(() => branchRanking[activeRankTab.value])

const riskAlerts = ref(riskData)
const newAlertCount = computed(() => riskAlerts.value.filter(r => r.status === 'new').length)

const typeLabels = { customer_churn: '客户流失', deposit_drop: '存款下降', loan_overdue: '贷款逾期', wealth_churn: '高净值流失' }
</script>

<style lang="scss" scoped>
.finance-bottom {
  display: flex; gap: 10px;
  height: 100%;
  min-height: 0;
}

.bottom-card {
  background: rgba(10,22,40,0.85);
  border: 1px solid rgba(0,212,255,0.18);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent);
  }
}

.ranking-card { flex: 1.2; }
.risk-card { flex: 0.8; }

.card-title {
  padding: 5px 10px;
  font-size: 12px;
  color: #00D4FF;
  font-weight: 600;
  border-bottom: 1px solid rgba(0,212,255,0.1);
  display: flex; align-items: center; gap: 6px;
  flex: 0 0 auto;
  &::before {
    content: ''; width: 3px; height: 11px; background: #00D4FF; border-radius: 2px; flex-shrink: 0;
  }
  .sub-title { font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 400; background: rgba(0,212,255,0.08); padding: 0 5px; border-radius: 5px; }
}

.rank-tabs { display: flex; gap: 2px; margin-left: auto; }
.rank-tab { padding: 1px 6px; font-size: 9px; color: rgba(255,255,255,0.35); cursor: pointer; border-radius: 5px; transition: all .3s; border: 1px solid transparent; white-space: nowrap; }
.rank-tab:hover { color: #00D4FF; }
.rank-tab.active { color: #00D4FF; background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.2); }

.rank-table-wrap { flex: 1; overflow: hidden; min-height: 0; }

.rank-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.rank-table thead th { font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 500; padding: 3px 8px; border-bottom: 1px solid rgba(0,212,255,0.06); text-align: center; }
.rank-row { transition: all .3s; }
.rank-row:hover { background: rgba(0,212,255,0.04); }
.rank-row.top1 .name-col { color: #FFD700; }
.rank-row.top2 .name-col { color: #00D4FF; }
.rank-row.top3 .name-col { color: #00FF88; }
.rank-table td { padding: 3px 8px; font-size: 10px; color: rgba(255,255,255,0.65); vertical-align: middle; text-align: center; }
.rank-col { width: 12%; text-align: center; }
.name-col { width: 44%; font-weight: 500; text-align: left; }
.value-col { width: 24%; text-align: right; }
.value-col .rank-value { color: #00D4FF; font-family: 'DIN Alternate', monospace; font-weight: 600; }
.value-col .rank-unit { font-size: 8px; color: rgba(255,255,255,0.25); margin-left: 2px; }
.growth-col { width: 20%; text-align: center; }
.medal { font-size: 12px; }
.rank-num { color: rgba(255,255,255,0.35); font-size: 10px; }
.growth-tag { padding: 0 5px; border-radius: 5px; font-size: 8px; }
.growth-tag.up { background: rgba(0,255,136,0.1); color: #00FF88; }
.growth-tag.down { background: rgba(255,107,107,0.1); color: #FF6B6B; }

.scroll-list { animation: scrollUp 40s linear infinite; }
.scroll-list:hover { animation-play-state: paused; }

@keyframes scrollUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

.risk-count { margin-left: auto; font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 400; }
.risk-count .count-num { color: #FF6B6B; font-size: 13px; font-weight: 700; font-family: 'DIN Alternate', monospace; text-shadow: 0 0 6px rgba(255,107,107,0.4); }

.risk-list-wrap { flex: 1; overflow: hidden; min-height: 0; padding: 2px 6px; }

.risk-item {
  display: flex; align-items: center; gap: 6px;
  padding: 3px 6px; margin-bottom: 2px;
  border-radius: 2px; transition: all .3s;
  border-left: 2px solid transparent;
}
.risk-item.level-critical { background: rgba(255,107,107,0.06); border-left-color: #FF6B6B; }
.risk-item.level-high { background: rgba(255,170,0,0.04); border-left-color: #FFAA00; }
.risk-item.level-warning { background: rgba(0,212,255,0.03); border-left-color: #00D4FF; }
.risk-item.status-new { animation: riskFlash 2s ease-in-out infinite; }
.risk-item.status-done { opacity: 0.45; }

.risk-left { display: flex; align-items: center; gap: 3px; width: 62px; flex-shrink: 0; }
.risk-level-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }
.level-critical .risk-level-dot { background: #FF6B6B; box-shadow: 0 0 4px rgba(255,107,107,0.5); }
.level-high .risk-level-dot { background: #FFAA00; }
.level-warning .risk-level-dot { background: #00D4FF; }

.risk-type-tag { font-size: 8px; padding: 0 4px; border-radius: 3px; white-space: nowrap; }
.risk-type-tag.customer_churn { background: rgba(255,107,107,0.12); color: #FF6B6B; }
.risk-type-tag.deposit_drop { background: rgba(255,170,0,0.12); color: #FFAA00; }
.risk-type-tag.loan_overdue { background: rgba(255,107,107,0.12); color: #FF6B6B; }
.risk-type-tag.wealth_churn { background: rgba(255,215,0,0.12); color: #FFD700; }

.risk-content { flex: 1; font-size: 10px; color: rgba(255,255,255,0.65); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.risk-right { display: flex; align-items: center; gap: 4px; width: 72px; flex-shrink: 0; justify-content: flex-end; }
.risk-time { font-size: 8px; color: rgba(255,255,255,0.25); }
.risk-status-tag { font-size: 7px; padding: 0 3px; border-radius: 3px; }
.risk-status-tag.new { background: rgba(255,107,107,0.12); color: #FF6B6B; }
.risk-status-tag.processing { background: rgba(255,170,0,0.12); color: #FFAA00; }
.risk-status-tag.done { background: rgba(0,255,136,0.12); color: #00FF88; }

.risk-item:hover { background: rgba(0,212,255,0.06); }

@keyframes riskFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>