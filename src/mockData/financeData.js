/**
 * 个人金融经营分析驾驶舱 - Mock数据
 */

export const config = {
  updateTime: "2026-05-20 15:30:00",
  title: "个人金融经营分析驾驶舱",
  subtitle: "个人金融部",
  systemStatus: "运行正常",
  syncStatus: "已同步",
};

// ==================== 核心经营KPI ====================
export const kpiData = [
  {
    icon: "👤",
    label: "个人客户总数",
    unit: "万户",
    value: 1256.8,
    trend: "up",
    trendValue: "+18.52%",
    sparkData: [1185, 1205, 1218, 1235, 1248, 1256.8],
    subLabel: "较去年增长18.52%",
  },
  {
    icon: "💰",
    label: "AUM总资产",
    unit: "亿元",
    value: 3865.2,
    trend: "up",
    trendValue: "+12.35%",
    sparkData: [3560, 3620, 3700, 3750, 3810, 3865.2],
    subLabel: "较去年增长12.35%",
  },
  {
    icon: "🏦",
    label: "个人存款余额",
    unit: "亿元",
    value: 2586.3,
    trend: "up",
    trendValue: "+8.56%",
    sparkData: [2450, 2480, 2510, 2535, 2560, 2586.3],
    subLabel: "较去年增长8.56%",
  },
  {
    icon: "📋",
    label: "个人贷款余额",
    unit: "亿元",
    value: 1865.9,
    trend: "up",
    trendValue: "+15.28%",
    sparkData: [1680, 1720, 1760, 1800, 1835, 1865.9],
    subLabel: "较去年增长15.28%",
  },
  {
    icon: "⭐",
    label: "财富客户数",
    unit: "万户",
    value: 125.6,
    trend: "up",
    trendValue: "+22.36%",
    sparkData: [105, 110, 115, 118, 122, 125.6],
    subLabel: "较去年增长22.36%",
  },
  {
    icon: "📈",
    label: "本年累计营收",
    unit: "亿元",
    value: 86.5,
    trend: "up",
    trendValue: "+10.25%",
    sparkData: [68, 72, 76, 80, 83, 86.5],
    subLabel: "较去年增长10.25%",
  },
  {
    icon: "📊",
    label: "较上月增长率",
    unit: "%",
    value: 2.56,
    trend: "up",
    trendValue: "+0.82%",
    sparkData: [1.5, 1.8, 2.0, 2.2, 2.4, 2.56],
    subLabel: "较上期增长0.82个百分点",
  },
  {
    icon: "🎯",
    label: "较年初增长率",
    unit: "%",
    value: 18.52,
    trend: "up",
    trendValue: "+3.26%",
    sparkData: [12.5, 14.0, 15.2, 16.8, 17.6, 18.52],
    subLabel: "较上期增长3.26个百分点",
  },
];

// ==================== 客户结构分析 ====================
export const customerStructure = {
  levelDistribution: [
    { name: "普通客户", value: 65 },
    { name: "潜力客户", value: 18 },
    { name: "优质客户", value: 10 },
    { name: "财富客户", value: 5 },
    { name: "私人银行", value: 2 },
  ],
  newCustomers: 56800,
  activeCustomers: 856000,
  mobileBankCustomers: 985000,
  privateBankCustomers: 12500,
  monthlyActiveRate: 78.5,
};

// ==================== 客户增长趋势 ====================
export const customerGrowthTrend = {
  dates: [
    "4月20日",
    "4月22日",
    "4月24日",
    "4月26日",
    "4月28日",
    "4月30日",
    "5月2日",
    "5月4日",
    "5月6日",
    "5月8日",
    "5月10日",
    "5月12日",
    "5月14日",
    "5月16日",
    "5月18日",
    "5月20日",
  ],
  growth: [1250, 1280, 1320, 1350, 1380, 1420, 1400, 1450, 1480, 1520, 1560, 1580, 1620, 1650, 1680, 1720],
  churn: [230, 215, 208, 195, 185, 178, 220, 200, 190, 175, 168, 160, 155, 148, 140, 135],
  netGrowth: [1020, 1065, 1112, 1155, 1195, 1242, 1180, 1250, 1290, 1345, 1392, 1420, 1465, 1502, 1540, 1585],
};

// ==================== 个人金融资产趋势 ====================
export const assetTrend = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  deposit: [2350, 2380, 2420, 2450, 2480, 2510, 2535, 2550, 2565, 2580, 2586, 2586.3],
  aum: [3450, 3520, 3580, 3620, 3680, 3720, 3760, 3800, 3820, 3840, 3855, 3865.2],
  loan: [1580, 1620, 1650, 1680, 1720, 1750, 1780, 1800, 1820, 1840, 1855, 1865.9],
  wealth: [450, 480, 510, 550, 600, 650, 710, 780, 830, 880, 920, 956.8],
  wealthBreakdown: [
    { name: "理财产品", data: [280, 300, 320, 350, 380, 410, 450, 490, 520, 550, 570, 590] },
    { name: "基金产品", data: [100, 110, 120, 130, 140, 160, 180, 200, 220, 240, 260, 275] },
    { name: "保险产品", data: [70, 70, 70, 70, 80, 80, 80, 90, 90, 90, 90, 91.8] },
  ],
};

// ==================== 区域经营热力数据 ====================
export const regionData = {
  branches: ["城关支行", "七里河支行", "西固支行", "安宁支行", "红古支行", "榆中支行", "皋兰支行", "永登支行", "新区支行", "东岗支行"],
  customerScale: [285, 220, 180, 165, 85, 95, 55, 68, 120, 145],
  depositScale: [520, 410, 350, 310, 160, 180, 95, 120, 230, 280],
  loanScale: [380, 300, 260, 230, 120, 130, 70, 85, 170, 200],
  wealthCustomers: [28, 22, 18, 16, 8, 9, 5, 6, 12, 15],
};

// 区域经营雷达图数据 - 前5分行多维度经营评分
export const branchRadarData = {
  indicators: [
    { name: "存款规模", max: 100 },
    { name: "AUM资产", max: 100 },
    { name: "客户增长", max: 100 },
    { name: "贷款增长", max: 100 },
    { name: "财富中收", max: 100 },
    { name: "风控评分", max: 100 },
  ],
  topBranches: [
    { name: "城关支行", value: [95, 92, 78, 88, 90, 85] },
    { name: "七里河支行", value: [82, 85, 72, 80, 78, 88] },
    { name: "西固支行", value: [75, 78, 65, 72, 70, 82] },
    { name: "安宁支行", value: [70, 72, 68, 65, 62, 80] },
    { name: "东岗支行", value: [65, 68, 82, 75, 72, 75] },
    { name: "新区支行", value: [60, 62, 88, 85, 68, 70] },
  ],
};

// ==================== 贷款经营 ====================
export const loanData = {
  totalBalance: 1865.9,
  consumerLoan: 568.3,
  businessLoan: 386.5,
  mortgageLoan: 785.6,
  otherLoan: 125.5,
  nonPerformingRate: 1.28,
  overdueRate: 0.86,
  loanStructure: [
    { name: "消费贷", value: 568.3 },
    { name: "经营贷", value: 386.5 },
    { name: "房贷", value: 785.6 },
    { name: "其他贷款", value: 125.5 },
  ],
  monthlyNewLoans: [125, 138, 145, 152, 158, 162],
  monthlyLabels: ["12月", "1月", "2月", "3月", "4月", "5月"],
};

// ==================== 财富管理 ====================
export const wealthData = {
  financialBalance: 590.2,
  fundSales: 86.5,
  insuranceSales: 45.8,
  preciousMetalSales: 12.6,
  wealthCustomerGrowth: [105, 108, 112, 115, 118, 122, 125.6],
  wealthProductStructure: [
    { name: "理财产品", value: 45 },
    { name: "基金", value: 25 },
    { name: "保险", value: 15 },
    { name: "贵金属", value: 8 },
    { name: "其他", value: 7 },
  ],
  fundSalesBreakdown: [
    { name: "12月", value: 62 },
    { name: "1月", value: 68 },
    { name: "2月", value: 72 },
    { name: "3月", value: 78 },
    { name: "4月", value: 82 },
    { name: "5月", value: 86.5 },
  ],
  insuranceSalesBreakdown: [
    { name: "12月", value: 32 },
    { name: "1月", value: 35 },
    { name: "2月", value: 38 },
    { name: "3月", value: 40 },
    { name: "4月", value: 43 },
    { name: "5月", value: 45.8 },
  ],
  preciousMetalSalesBreakdown: [
    { name: "12月", value: 8.2 },
    { name: "1月", value: 9.5 },
    { name: "2月", value: 10.2 },
    { name: "3月", value: 11.0 },
    { name: "4月", value: 11.8 },
    { name: "5月", value: 12.6 },
  ],
};

// ==================== 分行排名 ====================
export const branchRanking = {
  depositRanking: [
    { rank: 1, name: "城关支行", value: 52.8, growth: 12.5 },
    { rank: 2, name: "七里河支行", value: 41.6, growth: 10.8 },
    { rank: 3, name: "西固支行", value: 35.2, growth: 9.6 },
    { rank: 4, name: "安宁支行", value: 31.5, growth: 8.2 },
    { rank: 5, name: "东岗支行", value: 28.3, growth: 15.6 },
    { rank: 6, name: "新区支行", value: 23.8, growth: 18.2 },
    { rank: 7, name: "榆中支行", value: 18.6, growth: 7.5 },
    { rank: 8, name: "永登支行", value: 12.5, growth: 5.8 },
    { rank: 9, name: "红古支行", value: 8.6, growth: 4.2 },
    { rank: 10, name: "皋兰支行", value: 5.8, growth: 3.5 },
  ],
  aumRanking: [
    { rank: 1, name: "城关支行", value: 78.6, growth: 15.2 },
    { rank: 2, name: "七里河支行", value: 62.3, growth: 12.8 },
    { rank: 3, name: "西固支行", value: 52.8, growth: 11.5 },
    { rank: 4, name: "安宁支行", value: 45.6, growth: 10.2 },
    { rank: 5, name: "东岗支行", value: 38.5, growth: 16.8 },
    { rank: 6, name: "新区支行", value: 32.6, growth: 20.5 },
    { rank: 7, name: "榆中支行", value: 25.8, growth: 8.6 },
    { rank: 8, name: "永登支行", value: 18.2, growth: 6.5 },
    { rank: 9, name: "红古支行", value: 12.5, growth: 5.2 },
    { rank: 10, name: "皋兰支行", value: 8.6, growth: 4.5 },
  ],
  customerGrowthRanking: [
    { rank: 1, name: "新区支行", value: 15.8, growth: 25.6 },
    { rank: 2, name: "东岗支行", value: 12.6, growth: 22.3 },
    { rank: 3, name: "城关支行", value: 10.5, growth: 18.5 },
    { rank: 4, name: "安宁支行", value: 8.6, growth: 15.8 },
    { rank: 5, name: "七里河支行", value: 7.2, growth: 12.6 },
    { rank: 6, name: "西固支行", value: 6.5, growth: 10.5 },
    { rank: 7, name: "新区支行", value: 5.8, growth: 9.8 },
    { rank: 8, name: "榆中支行", value: 4.5, growth: 8.2 },
    { rank: 9, name: "皋兰支行", value: 3.2, growth: 6.5 },
    { rank: 10, name: "红古支行", value: 2.5, growth: 5.2 },
  ],
  loanGrowthRanking: [
    { rank: 1, name: "城关支行", value: 25.6, growth: 18.5 },
    { rank: 2, name: "七里河支行", value: 20.3, growth: 15.6 },
    { rank: 3, name: "新区支行", value: 18.5, growth: 28.5 },
    { rank: 4, name: "西固支行", value: 16.8, growth: 12.3 },
    { rank: 5, name: "东岗支行", value: 14.2, growth: 22.6 },
    { rank: 6, name: "安宁支行", value: 12.5, growth: 10.8 },
    { rank: 7, name: "榆中支行", value: 8.6, growth: 8.5 },
    { rank: 8, name: "永登支行", value: 6.5, growth: 6.2 },
    { rank: 9, name: "红古支行", value: 4.5, growth: 5.8 },
    { rank: 10, name: "皋兰支行", value: 3.2, growth: 4.5 },
  ],
  wealthIncomeRanking: [
    { rank: 1, name: "城关支行", value: 12.8, growth: 20.5 },
    { rank: 2, name: "七里河支行", value: 10.5, growth: 18.2 },
    { rank: 3, name: "西固支行", value: 8.6, growth: 15.6 },
    { rank: 4, name: "安宁支行", value: 7.2, growth: 12.8 },
    { rank: 5, name: "东岗支行", value: 6.5, growth: 25.6 },
    { rank: 6, name: "新区支行", value: 5.2, growth: 30.5 },
    { rank: 7, name: "榆中支行", value: 3.8, growth: 10.5 },
    { rank: 8, name: "永登支行", value: 2.5, growth: 8.6 },
    { rank: 9, name: "红古支行", value: 1.8, growth: 6.5 },
    { rank: 10, name: "皋兰支行", value: 1.2, growth: 5.2 },
  ],
};

// ==================== 风险预警 ====================
export const riskAlerts = [
  {
    id: 1,
    type: "customer_churn",
    level: "high",
    title: "客户流失预警",
    content: "城关支行近7日客户流失率上升12.5%",
    time: "2分钟前",
    status: "new",
  },
  {
    id: 2,
    type: "deposit_drop",
    level: "warning",
    title: "存款下降预警",
    content: "七里河支行存款余额较前日下降3.2%",
    time: "5分钟前",
    status: "new",
  },
  {
    id: 3,
    type: "loan_overdue",
    level: "critical",
    title: "贷款逾期预警",
    content: "西固支行个人贷款逾期率已达2.15%，超过警戒线",
    time: "8分钟前",
    status: "new",
  },
  {
    id: 4,
    type: "wealth_churn",
    level: "high",
    title: "高净值客户流失预警",
    content: "安宁支行3名高净值客户资产转移预警",
    time: "15分钟前",
    status: "processing",
  },
  {
    id: 5,
    type: "customer_churn",
    level: "warning",
    title: "客户流失预警",
    content: "榆中支行月活客户率下降5.8%",
    time: "20分钟前",
    status: "processing",
  },
  { id: 6, type: "deposit_drop", level: "high", title: "存款下降预警", content: "新区支行大额存款流出2.5亿元", time: "30分钟前", status: "done" },
  {
    id: 7,
    type: "loan_overdue",
    level: "warning",
    title: "贷款逾期预警",
    content: "个人经营性贷款逾期率上升至1.56%",
    time: "45分钟前",
    status: "done",
  },
  {
    id: 8,
    type: "wealth_churn",
    level: "high",
    title: "高净值客户流失预警",
    content: "本月共8名私行客户资产变动超过500万",
    time: "1小时前",
    status: "done",
  },
  {
    id: 9,
    type: "customer_churn",
    level: "warning",
    title: "客户流失预警",
    content: "手机银行月活增速放缓，环比下降2.3%",
    time: "1.5小时前",
    status: "done",
  },
  {
    id: 10,
    type: "deposit_drop",
    level: "high",
    title: "存款下降预警",
    content: "短期定期存款到期转出规模达8.6亿元",
    time: "2小时前",
    status: "done",
  },
];

export default {
  config,
  kpiData,
  customerStructure,
  customerGrowthTrend,
  assetTrend,
  regionData,
  branchRadarData,
  loanData,
  wealthData,
  branchRanking,
  riskAlerts,
};
