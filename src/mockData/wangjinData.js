/**
 * 网金业务概览 - Mock数据
 * 互联网金融业务运营大屏
 */

// 基础配置
export const config = {
  updateTime: "2026-05-15 14:32:18",
  title: "互联网金融业务运营大屏",
  subtitle: "网金业务概览",
};

// ==================== 左侧区域数据 ====================

// 手机银行累计开户数
export const mobileBankAccounts = {
  current: {
    value: 12856320,
    unit: "户",
    label: "手机银行累计开户总数",
    activationRate: "13.56%",
  },
  trend15Days: [
    { date: "05-01", value: 12680000 },
    { date: "05-02", value: 12692000 },
    { date: "05-03", value: 12705000 },
    { date: "05-04", value: 12718000 },
    { date: "05-05", value: 12732000 },
    { date: "05-06", value: 12745000 },
    { date: "05-07", value: 12758000 },
    { date: "05-08", value: 12772000 },
    { date: "05-09", value: 12785000 },
    { date: "05-10", value: 12798000 },
    { date: "05-11", value: 12812000 },
    { date: "05-12", value: 12825000 },
    { date: "05-13", value: 12838000 },
    { date: "05-14", value: 12852000 },
    { date: "05-15", value: 12856320 },
  ],
};

// 手机银行累计激活数
export const mobileBankActivations = {
  current: {
    value: 9856320,
    unit: "户",
    label: "手机银行累计激活总数",
    activationRate: "76.66%",
  },
  trend15Days: [
    { date: "05-01", value: 9680000 },
    { date: "05-02", value: 9705000 },
    { date: "05-03", value: 9728000 },
    { date: "05-04", value: 9742000 },
    { date: "05-05", value: 9756000 },
    { date: "05-06", value: 9770000 },
    { date: "05-07", value: 9785000 },
    { date: "05-08", value: 9798000 },
    { date: "05-09", value: 9812000 },
    { date: "05-10", value: 9825000 },
    { date: "05-11", value: 9836000 },
    { date: "05-12", value: 9845000 },
    { date: "05-13", value: 9850000 },
    { date: "05-14", value: 9854200 },
    { date: "05-15", value: 9856320 },
  ],
};

// 手机银行当月激活户数
export const monthlyActivations = {
  current: {
    value: 158620,
    unit: "户",
    label: "手机银行当月激活户数",
  },
  trend12Months: [
    { month: "2025-06", value: 125000 },
    { month: "2025-07", value: 132000 },
    { month: "2025-08", value: 128000 },
    { month: "2025-09", value: 145000 },
    { month: "2025-10", value: 138000 },
    { month: "2025-11", value: 152000 },
    { month: "2025-12", value: 168000 },
    { month: "2026-01", value: 142000 },
    { month: "2026-02", value: 135000 },
    { month: "2026-03", value: 156000 },
    { month: "2026-04", value: 162000 },
    { month: "2026-05", value: 158620 },
  ],
};

// 手机银行当月活跃户数
export const monthlyActiveUsers = {
  current: {
    value: 4286350,
    unit: "户",
    label: "手机银行当月活跃户数",
    activityRate: "43.48%",
  },
  trend12Months: [
    { month: "2025-06", value: 3850000 },
    { month: "2025-07", value: 3920000 },
    { month: "2025-08", value: 3780000 },
    { month: "2025-09", value: 4010000 },
    { month: "2025-10", value: 3950000 },
    { month: "2025-11", value: 4120000 },
    { month: "2025-12", value: 4250000 },
    { month: "2026-01", value: 4080000 },
    { month: "2026-02", value: 3890000 },
    { month: "2026-03", value: 4180000 },
    { month: "2026-04", value: 4250000 },
    { month: "2026-05", value: 4286350 },
  ],
};

// ==================== 中间区域数据 ====================

// 百合生活网累计会员数
export const lilyLifeMembers = {
  current: {
    value: 5682300,
    unit: "人",
    label: "百合生活网累计会员总数",
  },
  gisData: [
    { name: "北京", value: 568230, coords: [116.46, 39.92] },
    { name: "上海", value: 625850, coords: [121.48, 31.22] },
    { name: "广州", value: 486320, coords: [113.23, 23.16] },
    { name: "深圳", value: 452180, coords: [114.07, 22.62] },
    { name: "杭州", value: 358960, coords: [120.19, 30.26] },
    { name: "成都", value: 325640, coords: [104.06, 30.67] },
    { name: "重庆", value: 298520, coords: [106.55, 29.53] },
    { name: "武汉", value: 285430, coords: [114.31, 30.52] },
    { name: "西安", value: 256780, coords: [108.95, 34.27] },
    { name: "南京", value: 248960, coords: [118.78, 32.04] },
    { name: "苏州", value: 235680, coords: [120.62, 31.3] },
    { name: "天津", value: 228450, coords: [117.2, 39.13] },
    { name: "郑州", value: 198320, coords: [113.65, 34.76] },
    { name: "长沙", value: 186540, coords: [112.94, 28.24] },
    { name: "济南", value: 175680, coords: [116.99, 36.65] },
    { name: "青岛", value: 168920, coords: [120.38, 36.07] },
    { name: "沈阳", value: 156320, coords: [123.38, 41.8] },
    { name: "大连", value: 145680, coords: [121.62, 38.91] },
    { name: "厦门", value: 138560, coords: [118.1, 24.46] },
    { name: "昆明", value: 125430, coords: [102.73, 25.04] },
    { name: "哈尔滨", value: 118920, coords: [126.63, 45.75] },
    { name: "长春", value: 98650, coords: [125.35, 43.88] },
    { name: "石家庄", value: 92560, coords: [114.48, 38.03] },
    { name: "福州", value: 88540, coords: [119.3, 26.08] },
    { name: "南昌", value: 82650, coords: [115.89, 28.68] },
    { name: "贵阳", value: 78450, coords: [106.71, 26.57] },
    { name: "太原", value: 72890, coords: [112.53, 37.87] },
    { name: "南宁", value: 68920, coords: [108.33, 22.84] },
    { name: "兰州", value: 54230, coords: [103.73, 36.03] },
    { name: "乌鲁木齐", value: 48560, coords: [87.68, 43.77] },
  ],
};

// 特约商户累计户数
export const contractMerchants = {
  current: {
    value: 156820,
    unit: "户",
    label: "特约商户累计户总数",
  },
  gisData: [
    { name: "北京", value: 18560, coords: [116.46, 39.92] },
    { name: "上海", value: 22890, coords: [121.48, 31.22] },
    { name: "广州", value: 15230, coords: [113.23, 23.16] },
    { name: "深圳", value: 14650, coords: [114.07, 22.62] },
    { name: "杭州", value: 12380, coords: [120.19, 30.26] },
    { name: "成都", value: 9860, coords: [104.06, 30.67] },
    { name: "重庆", value: 8560, coords: [106.55, 29.53] },
    { name: "武汉", value: 7650, coords: [114.31, 30.52] },
    { name: "西安", value: 6580, coords: [108.95, 34.27] },
    { name: "南京", value: 5920, coords: [118.78, 32.04] },
    { name: "苏州", value: 5680, coords: [120.62, 31.3] },
    { name: "天津", value: 4890, coords: [117.2, 39.13] },
    { name: "郑州", value: 4560, coords: [113.65, 34.76] },
    { name: "长沙", value: 3980, coords: [112.94, 28.24] },
    { name: "济南", value: 3650, coords: [116.99, 36.65] },
    { name: "青岛", value: 3420, coords: [120.38, 36.07] },
    { name: "沈阳", value: 2890, coords: [123.38, 41.8] },
    { name: "大连", value: 2650, coords: [121.62, 38.91] },
    { name: "厦门", value: 2380, coords: [118.1, 24.46] },
    { name: "昆明", value: 1980, coords: [102.73, 25.04] },
    { name: "哈尔滨", value: 1650, coords: [126.63, 45.75] },
    { name: "长春", value: 1420, coords: [125.35, 43.88] },
    { name: "石家庄", value: 1280, coords: [114.48, 38.03] },
    { name: "福州", value: 1150, coords: [119.3, 26.08] },
    { name: "南昌", value: 980, coords: [115.89, 28.68] },
    { name: "贵阳", value: 850, coords: [106.71, 26.57] },
    { name: "太原", value: 720, coords: [112.53, 37.87] },
    { name: "南宁", value: 680, coords: [108.33, 22.84] },
    { name: "兰州", value: 520, coords: [103.73, 36.03] },
    { name: "乌鲁木齐", value: 450, coords: [87.68, 43.77] },
  ],
};

// 收单商户累计户数
export const acquiringMerchants = {
  current: {
    value: 89250,
    unit: "户",
    label: "收单商户累计户数",
  },
  gisData: [
    { name: "北京", value: 9850, coords: [116.46, 39.92] },
    { name: "上海", value: 11200, coords: [121.48, 31.22] },
    { name: "广州", value: 8650, coords: [113.23, 23.16] },
    { name: "深圳", value: 7850, coords: [114.07, 22.62] },
    { name: "杭州", value: 6580, coords: [120.19, 30.26] },
    { name: "成都", value: 5280, coords: [104.06, 30.67] },
    { name: "重庆", value: 4650, coords: [106.55, 29.53] },
    { name: "武汉", value: 3980, coords: [114.31, 30.52] },
    { name: "西安", value: 3450, coords: [108.95, 34.27] },
    { name: "南京", value: 3180, coords: [118.78, 32.04] },
    { name: "苏州", value: 2960, coords: [120.62, 31.3] },
    { name: "天津", value: 2650, coords: [117.2, 39.13] },
    { name: "郑州", value: 2380, coords: [113.65, 34.76] },
    { name: "长沙", value: 2050, coords: [112.94, 28.24] },
    { name: "济南", value: 1890, coords: [116.99, 36.65] },
    { name: "青岛", value: 1680, coords: [120.38, 36.07] },
    { name: "沈阳", value: 1450, coords: [123.38, 41.8] },
    { name: "大连", value: 1280, coords: [121.62, 38.91] },
    { name: "厦门", value: 1120, coords: [118.1, 24.46] },
    { name: "昆明", value: 960, coords: [102.73, 25.04] },
    { name: "哈尔滨", value: 820, coords: [126.63, 45.75] },
    { name: "长春", value: 680, coords: [125.35, 43.88] },
    { name: "石家庄", value: 580, coords: [114.48, 38.03] },
    { name: "福州", value: 520, coords: [119.3, 26.08] },
    { name: "南昌", value: 450, coords: [115.89, 28.68] },
    { name: "贵阳", value: 380, coords: [106.71, 26.57] },
    { name: "太原", value: 320, coords: [112.53, 37.87] },
    { name: "南宁", value: 280, coords: [108.33, 22.84] },
    { name: "兰州", value: 220, coords: [103.73, 36.03] },
    { name: "乌鲁木齐", value: 180, coords: [87.68, 43.77] },
  ],
};

// ==================== 右侧区域数据 ====================

// 手机银行年交易笔数
export const mobileBankYearlyTransactions = {
  current: {
    value: 568235600,
    unit: "笔",
    label: "手机银行年交易笔数",
    activationRate: "13.56%",
  },
  yearOnYear: {
    value: 23.56,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
  ringChart: [
    { name: "转账", value: 186500000 },
    { name: "缴费", value: 125600000 },
    { name: "购物", value: 98560000 },
    { name: "理财", value: 89200000 },
    { name: "其他", value: 68635600 },
  ],
};

// 手机银行年交易金额
export const mobileBankYearlyAmount = {
  current: {
    value: 2856320,
    unit: "万元",
    label: "手机银行年交易金额",
  },
  yearOnYear: {
    value: 18.92,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
  barChart: [
    { month: "2025-06", value: 198500 },
    { month: "2025-07", value: 215600 },
    { month: "2025-08", value: 202300 },
    { month: "2025-09", value: 235800 },
    { month: "2025-10", value: 218900 },
    { month: "2025-11", value: 248600 },
    { month: "2025-12", value: 268500 },
    { month: "2026-01", value: 226800 },
    { month: "2026-02", value: 215200 },
    { month: "2026-03", value: 258600 },
    { month: "2026-04", value: 265200 },
    { month: "2026-05", value: 263265 },
  ],
};

// 百合生活网年交易笔数
export const lilyLifeYearlyTransactions = {
  current: {
    value: 85632000,
    unit: "笔",
    label: "百合生活网年交易笔数",
  },
  yearOnYear: {
    value: 35.28,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// 百合生活网年交易金额
export const lilyLifeYearlyAmount = {
  current: {
    value: 1285630,
    unit: "万元",
    label: "百合生活网年交易金额",
  },
  yearOnYear: {
    value: 28.65,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// 特约商户年交易笔数
export const merchantYearlyTransactions = {
  current: {
    value: 35862000,
    unit: "笔",
    label: "特约商户年交易笔数",
  },
  yearOnYear: {
    value: 15.82,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// 特约商户年交易金额
export const merchantYearlyAmount = {
  current: {
    value: 568920,
    unit: "万元",
    label: "特约商户年交易金额",
  },
  yearOnYear: {
    value: 12.36,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// 快捷支付年交易笔数
export const quickPayYearlyTransactions = {
  current: {
    value: 156823000,
    unit: "笔",
    label: "快捷支付年交易笔数",
  },
  yearOnYear: {
    value: 42.58,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// 快捷支付年交易金额
export const quickPayYearlyAmount = {
  current: {
    value: 892560,
    unit: "万元",
    label: "快捷支付年交易金额",
  },
  yearOnYear: {
    value: 38.92,
    unit: "%",
    trend: "up",
    label: "较同期增降幅",
  },
};

// ==================== 中间区域 - 实时交易动态 ====================

// 实时交易滚动数据
export const realtimeTransactions = [
  { time: "14:32:18", city: "北京市", type: "手机银行转账", amount: "25,680.00" },
  { time: "14:32:15", city: "上海市", type: "快捷支付", amount: "156.00" },
  { time: "14:32:12", city: "广州市", type: "百合生活网购物", amount: "328.50" },
  { time: "14:32:08", city: "深圳市", type: "特约商户消费", amount: "1,280.00" },
  { time: "14:32:05", city: "杭州市", type: "手机银行缴费", amount: "856.00" },
  { time: "14:32:02", city: "成都市", type: "快捷支付", amount: "68.00" },
  { time: "14:31:58", city: "重庆市", type: "手机银行转账", amount: "15,600.00" },
  { time: "14:31:55", city: "武汉市", type: "百合生活网购物", amount: "428.00" },
  { time: "14:31:52", city: "西安市", type: "特约商户消费", amount: "2,180.00" },
  { time: "14:31:48", city: "南京市", type: "快捷支付", amount: "96.00" },
  { time: "14:31:45", city: "苏州市", type: "手机银行理财", amount: "50,000.00" },
  { time: "14:31:42", city: "天津市", type: "手机银行转账", amount: "8,920.00" },
  { time: "14:31:38", city: "郑州市", type: "快捷支付", amount: "128.00" },
  { time: "14:31:35", city: "长沙市", type: "百合生活网购物", amount: "568.00" },
  { time: "14:31:32", city: "济南市", type: "特约商户消费", amount: "3,250.00" },
  { time: "14:31:28", city: "青岛市", type: "手机银行缴费", amount: "1,680.00" },
  { time: "14:31:25", city: "沈阳市", type: "快捷支付", amount: "86.00" },
  { time: "14:31:22", city: "大连市", type: "手机银行转账", amount: "12,500.00" },
  { time: "14:31:18", city: "厦门市", type: "百合生活网购物", amount: "726.00" },
  { time: "14:31:15", city: "昆明市", type: "特约商户消费", amount: "1,860.00" },
  { time: "14:31:12", city: "哈尔滨市", type: "快捷支付", amount: "45.00" },
  { time: "14:31:08", city: "长春市", type: "手机银行理财", amount: "30,000.00" },
  { time: "14:31:05", city: "石家庄市", type: "手机银行转账", amount: "5,680.00" },
  { time: "14:31:02", city: "福州市", type: "快捷支付", amount: "156.00" },
  { time: "14:30:58", city: "南昌市", type: "百合生活网购物", amount: "398.00" },
  { time: "14:30:55", city: "贵阳市", type: "特约商户消费", amount: "920.00" },
  { time: "14:30:52", city: "太原市", type: "手机银行缴费", amount: "560.00" },
  { time: "14:30:48", city: "南宁市", type: "快捷支付", amount: "78.00" },
  { time: "14:30:45", city: "兰州市", type: "手机银行转账", amount: "3,200.00" },
  { time: "14:30:42", city: "乌鲁木齐市", type: "百合生活网购物", amount: "268.00" },
];

// ==================== 辅助数据 ====================

export const chinaMapConfig = {
  mapUrl: "/china.json",
  center: [105, 36],
  zoom: 1.2,
  selectedRegions: ["北京", "上海", "广东", "江苏", "浙江", "四川", "湖北", "山东"],
};

export const colorConfig = {
  primary: "#00D4FF",
  secondary: "#0066FF",
  accent: "#00FF88",
  warning: "#FF6B6B",
  background: "#0A1628",
  cardBg: "rgba(10, 22, 40, 0.8)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  border: "rgba(0, 212, 255, 0.3)",
  gradient: {
    primary: ["#00D4FF", "#0066FF"],
    secondary: ["#0A1628", "#1A2B4A"],
  },
};

export const animationConfig = {
  digitDuration: 1500,
  chartDuration: 1000,
  breatheDuration: 2000,
  particleCount: 50,
};

export default {
  config,
  mobileBankAccounts,
  mobileBankActivations,
  monthlyActivations,
  monthlyActiveUsers,
  lilyLifeMembers,
  contractMerchants,
  acquiringMerchants,
  mobileBankYearlyTransactions,
  mobileBankYearlyAmount,
  lilyLifeYearlyTransactions,
  lilyLifeYearlyAmount,
  merchantYearlyTransactions,
  merchantYearlyAmount,
  quickPayYearlyTransactions,
  quickPayYearlyAmount,
  realtimeTransactions,
  chinaMapConfig,
  colorConfig,
  animationConfig,
};
