/**
 * 个人客户经营与渠道运营驾驶舱 - Mock数据
 */

export const config = {
  updateTime: "2026-05-20 15:30:00",
  title: "个人客户经营与渠道运营驾驶舱",
  subtitle: "渠道运营部",
  systemStatus: "运行正常",
  channelStatus: "全部在线",
};

// ==================== 核心运营KPI ====================
export const kpiData = [
  { icon: "📱", label: "手机银行MAU", unit: "万户", value: 856.3, trend: "up", trendValue: "+12.35%" },
  { icon: "👥", label: "日活客户DAU", unit: "万户", value: 285.6, trend: "up", trendValue: "+8.56%" },
  { icon: "📊", label: "月交易笔数", unit: "万笔", value: 3865.2, trend: "up", trendValue: "+15.28%" },
  { icon: "💰", label: "月交易金额", unit: "亿元", value: 128.5, trend: "up", trendValue: "+10.25%" },
  { icon: "📋", label: "线上开户数", unit: "万户", value: 25.6, trend: "up", trendValue: "+22.36%" },
  { icon: "🏦", label: "线上贷款申请", unit: "万笔", value: 8.6, trend: "up", trendValue: "+18.52%" },
  { icon: "🎯", label: "客户转化率", unit: "%", value: 68.5, trend: "up", trendValue: "+3.26%" },
  { icon: "📈", label: "客户活跃率", unit: "%", value: 78.2, trend: "up", trendValue: "+2.58%" }
];

// ==================== 客户活跃分析 ====================
export const userActivity = {
  loginTrend: {
    dates: ["4/20","4/22","4/24","4/26","4/28","4/30","5/2","5/4","5/6","5/8","5/10","5/12","5/14","5/16","5/18","5/20"],
    values: [12.5, 13.2, 14.8, 15.6, 16.2, 18.5, 15.8, 17.2, 18.6, 20.1, 21.5, 22.8, 24.2, 25.6, 27.1, 28.5]
  },
  visitDuration: {
    dates: ["4/20","4/22","4/24","4/26","4/28","4/30","5/2","5/4","5/6","5/8","5/10","5/12","5/14","5/16","5/18","5/20"],
    values: [3.2, 3.5, 3.8, 4.1, 4.3, 4.8, 4.0, 4.5, 4.9, 5.2, 5.6, 5.8, 6.1, 6.3, 6.5, 6.8]
  },
  topFunctions: [
    { name: "转账汇款", value: 35.2 },
    { name: "账户查询", value: 22.8 },
    { name: "生活缴费", value: 15.6 },
    { name: "理财购买", value: 12.5 },
    { name: "信用卡", value: 8.6 },
    { name: "贷款申请", value: 5.3 }
  ],
  retentionData: [
    { name: "访问首页", value: 100 },
    { name: "查看产品", value: 72 },
    { name: "详情页", value: 55 },
    { name: "填写信息", value: 38 },
    { name: "提交申请", value: 22 },
    { name: "完成交易", value: 15 }
  ],
  customerRatio: [
    { name: "老客户(活跃)", value: 52 },
    { name: "新客户", value: 28 },
    { name: "老客户(沉默)", value: 20 }
  ]
};

// ==================== 交易行为分析 ====================
export const tradeBehavior = {
  tradeTypeRatio: [
    { name: "转账交易", value: 42 },
    { name: "理财交易", value: 25 },
    { name: "缴费交易", value: 18 },
    { name: "信贷申请", value: 15 }
  ],
  hotTimeData: [
    [8, 0, 0, 0, 0, 0, 0, 5, 25, 35, 28, 18, 12, 10, 8, 12, 20, 35, 42, 55, 45, 30, 20, 10],
    [8, 0, 0, 0, 0, 0, 0, 3, 18, 28, 22, 15, 10, 8, 6, 10, 18, 30, 38, 48, 40, 25, 15, 8],
    [8, 0, 0, 0, 0, 0, 0, 2, 15, 22, 18, 12, 8, 6, 5, 8, 15, 25, 32, 42, 35, 22, 12, 6],
    [8, 0, 0, 0, 0, 0, 0, 4, 20, 30, 25, 16, 10, 8, 6, 10, 16, 28, 35, 45, 38, 25, 14, 8],
    [8, 0, 0, 0, 0, 0, 0, 3, 16, 25, 20, 13, 8, 6, 5, 8, 14, 24, 30, 40, 32, 20, 10, 5]
  ],
  weekDays: ["周一","周二","周三","周四","周五"],
  hours: ["0时","2时","4时","6时","8时","10时","12时","14时","16时","18时","20时","22时"]
};

// ==================== 渠道趋势 ====================
export const channelTrend = {
  months: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  activeUsers: [520, 560, 580, 620, 650, 680, 710, 740, 770, 800, 830, 856.3],
  tradeAmount: [85, 90, 95, 100, 106, 110, 115, 118, 120, 124, 127, 128.5],
  tradeCount: [2850, 2980, 3100, 3250, 3380, 3500, 3580, 3650, 3720, 3780, 3830, 3865.2],
  conversionRate: [52, 54, 55, 58, 60, 62, 63, 65, 66, 67, 68, 68.5]
};

// ==================== 渠道分布 ====================
export const channelDistribution = {
  channelRatio: [
    { name: "手机银行", value: 65 },
    { name: "微信银行", value: 18 },
    { name: "柜面", value: 10 },
    { name: "ATM", value: 7 }
  ],
  onlineOfflineRatio: [
    { name: "线上渠道", value: 78 },
    { name: "线下渠道", value: 22 }
  ]
};

// ==================== 营销效果分析 ====================
export const marketingData = {
  campaignParticipants: 126.8,
  marketingConversionRate: 23.5,
  wealthConversion: 28.6,
  creditConversion: 12.5,
  clickRate: 45.2,
  purchaseRate: 18.6,
  clickToPurchaseFunnel: [
    { name: "曝光用户", value: 100 },
    { name: "点击用户", value: 45.2 },
    { name: "浏览详情", value: 32.8 },
    { name: "加入对比", value: 25.6 },
    { name: "完成购买", value: 18.6 }
  ]
};

// ==================== 客户画像 ====================
export const customerProfile = {
  ageDistribution: [
    { name: "18-25岁", value: 15 },
    { name: "26-35岁", value: 35 },
    { name: "36-45岁", value: 28 },
    { name: "46-55岁", value: 15 },
    { name: "55岁以上", value: 7 }
  ],
  genderDistribution: [
    { name: "男性", value: 55 },
    { name: "女性", value: 45 }
  ],
  incomeLevels: {
    indicators: [
      { name: "储蓄存款", max: 100 },
      { name: "理财投资", max: 100 },
      { name: "消费支出", max: 100 },
      { name: "信贷使用", max: 100 },
      { name: "保险需求", max: 100 }
    ],
    data: [
      { name: "高收入", value: [95, 85, 75, 65, 55] },
      { name: "中收入", value: [75, 65, 85, 70, 60] },
      { name: "低收入", value: [55, 35, 60, 45, 40] }
    ]
  },
  cityDistribution: [
    { name: "兰州市", value: 42 },
    { name: "天水市", value: 15 },
    { name: "白银市", value: 12 },
    { name: "嘉峪关", value: 10 },
    { name: "金昌市", value: 8 },
    { name: "其他城市", value: 13 }
  ],
  preferenceTags: [
    { name: "理财达人", value: 85 },
    { name: "稳健投资", value: 78 },
    { name: "高频转账", value: 72 },
    { name: "生活缴费", value: 68 },
    { name: "信用卡", value: 62 },
    { name: "贷款需求", value: 55 },
    { name: "保险关注", value: 48 },
    { name: "贵金属", value: 35 }
  ]
};

// ==================== 实时运营监控 ====================
export const realtimeMonitor = {
  onlineUsers: { value: 12568, unit: "人" },
  currentTrades: { value: 386, unit: "笔/分" },
  currentAmount: { value: 125.6, unit: "万元" },
  alertCount: { value: 3, unit: "条" },
  systemSuccessRate: 99.86,
  apiResponseTime: 28.5,
  alerts: [
    { id: 1, level: "critical", content: "柜面系统响应超时(>5s)", time: "30秒前" },
    { id: 2, level: "warning", content: "微信银行交易失败率上升", time: "1分钟前" },
    { id: 3, level: "info", content: "手机银行登录量达到日峰值", time: "3分钟前" }
  ],
  tradeFlow: [
    { channel: "手机银行", amount: 168.5, count: 256, status: "normal" },
    { channel: "微信银行", amount: 45.2, count: 86, status: "normal" },
    { channel: "柜面", amount: 32.8, count: 28, status: "warning" },
    { channel: "ATM", amount: 12.5, count: 16, status: "normal" }
  ]
};

export default {
  config, kpiData, userActivity, tradeBehavior,
  channelTrend, channelDistribution, marketingData,
  customerProfile, realtimeMonitor
};