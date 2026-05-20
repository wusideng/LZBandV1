export const config = {
  updateTime: "2026-05-19 16:30:00",
  title: "快捷支付业务概览",
  subtitle: "网金业务部",
  systemStatus: "运行正常",
  syncStatus: "已同步"
};

export const dailyData = {
  transactions: 856.32,
  amount: 56.89,
  trend: "up",
  trendValue: "+12.35%"
};

export const weeklyTrend = {
  dates: ["05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19"],
  transactions: [728, 756, 782, 798, 812, 835, 856],
  amount: [48.5, 50.2, 52.8, 53.5, 54.2, 55.6, 56.89]
};

export const coreData = {
  totalAmount: 56.89,
  totalTransactions: 856.32,
  successRate: 99.52,
  activeIndex: 92.8,
  todayAmount: 3.28,
  todayTransactions: 52.3
};

export const channelData = [
  { name: "微信支付", icon: "💚", amount: 22.56, transactions: 325.6, ratio: 39.65, trend: "up", growth: 15.8 },
  { name: "支付宝", icon: "💙", amount: 19.23, transactions: 285.4, ratio: 33.79, trend: "up", growth: 12.5 },
  { name: "银联支付", icon: "💳", amount: 10.35, transactions: 168.2, ratio: 18.18, trend: "down", growth: -5.2 },
  { name: "其他支付", icon: "💛", amount: 4.75, transactions: 77.12, ratio: 8.38, trend: "up", growth: 8.6 }
];

export const monthlyData = {
  months: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"],
  transactions: [2680, 2856, 3125, 3568, 4280],
  amount: [168, 178, 195, 218, 285]
};

export const yearlyData = {
  years: ["2023年", "2024年", "2025年"],
  transactions: [28560, 35680, 42850],
  amount: [1856, 2356, 2895]
};

export const realtimeFlow = [
  { channel: "微信支付", amount: 286.50, time: "16:32:15", status: "success" },
  { channel: "支付宝", amount: 156.00, time: "16:32:08", status: "success" },
  { channel: "银联支付", amount: 520.00, time: "16:31:52", status: "success" },
  { channel: "微信支付", amount: 88.50, time: "16:31:35", status: "success" },
  { channel: "支付宝", amount: 320.00, time: "16:31:18", status: "success" },
  { channel: "微信支付", amount: 1560.00, time: "16:30:55", status: "success" }
];

export const successRateData = {
  total: 99.52,
  wechat: 99.68,
  alipay: 99.45,
  unionpay: 99.28,
  other: 98.95
};

export const activeIndexData = {
  total: 92.8,
  dailyActive: 125.6,
  weeklyActive: 568.3,
  monthlyActive: 856.2
};

export default {
  config,
  dailyData,
  weeklyTrend,
  coreData,
  channelData,
  monthlyData,
  yearlyData,
  realtimeFlow,
  successRateData,
  activeIndexData
};