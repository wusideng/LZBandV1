/**
 * 特约商户业务概览 - Mock数据
 */

export const config = {
  updateTime: "2026-05-19 14:32:18",
  title: "特约商户业务概览",
  subtitle: "网金业务部",
};

// 核心指标
export const dailyCoreMetrics = {
  merchantTransactions: {
    value: 285.63,
    unit: "万笔",
    label: "特约商户日交易笔数",
    trend: "up",
    trendValue: "12.35%",
  },
  merchantAmount: {
    value: 18.56,
    unit: "亿元",
    label: "特约商户日交易金额",
    trend: "up",
    trendValue: "8.72%",
  },
  lanYinTransactions: {
    value: 128.5,
    unit: "万笔",
    label: "兰银惠付日交易笔数",
    trend: "up",
    trendValue: "15.28%",
  },
  lanYinAmount: {
    value: 8.92,
    unit: "亿元",
    label: "兰银惠付日交易金额",
    trend: "up",
    trendValue: "10.15%",
  },
  posTransactions: {
    value: 86.3,
    unit: "万笔",
    label: "智能POS日交易笔数",
    trend: "up",
    trendValue: "5.63%",
  },
  posAmount: {
    value: 5.68,
    unit: "亿元",
    label: "智能POS日交易金额",
    trend: "down",
    trendValue: "2.18%",
  },
  onlineTransactions: {
    value: 70.83,
    unit: "万笔",
    label: "线上支付日交易笔数",
    trend: "up",
    trendValue: "22.45%",
  },
  onlineAmount: {
    value: 3.96,
    unit: "亿元",
    label: "线上支付日交易金额",
    trend: "up",
    trendValue: "18.92%",
  },
};

// 近7日趋势数据
export const weeklyTrend = {
  transactions: [
    { date: "05-13", value: 256.8 },
    { date: "05-14", value: 268.5 },
    { date: "05-15", value: 275.2 },
    { date: "05-16", value: 262.8 },
    { date: "05-17", value: 278.6 },
    { date: "05-18", value: 282.3 },
    { date: "05-19", value: 285.63 },
  ],
  amount: [
    { date: "05-13", value: 16.8 },
    { date: "05-14", value: 17.2 },
    { date: "05-15", value: 17.6 },
    { date: "05-16", value: 17.1 },
    { date: "05-17", value: 17.9 },
    { date: "05-18", value: 18.2 },
    { date: "05-19", value: 18.56 },
  ],
};

// 月度趋势数据
export const monthlyTrend = {
  transactions: [
    { month: "2025-12", value: 8562 },
    { month: "2026-01", value: 7895 },
    { month: "2026-02", value: 8236 },
    { month: "2026-03", value: 9125 },
    { month: "2026-04", value: 9568 },
    { month: "2026-05", value: 8568 },
  ],
  amount: [
    { month: "2025-12", value: 528 },
    { month: "2026-01", value: 486 },
    { month: "2026-02", value: 512 },
    { month: "2026-03", value: 568 },
    { month: "2026-04", value: 595 },
    { month: "2026-05", value: 556 },
  ],
};

// 年度趋势数据
export const yearlyTrend = {
  transactions: [
    { year: "2023年", value: 285630 },
    { year: "2024年", value: 325680 },
    { year: "2025年", value: 368520 },
  ],
  amount: [
    { year: "2023年", value: 1856 },
    { year: "2024年", value: 2156 },
    { year: "2025年", value: 2568 },
  ],
};

// 兰银惠付专题数据
export const lanYinData = {
  daily: { transactions: 128.5, amount: 8.92 },
  monthly: { transactions: 3856, amount: 268 },
  yearly: { transactions: 42856, amount: 3156 },
  channelRatio: [
    { name: "扫码支付", value: 45 },
    { name: "刷卡支付", value: 30 },
    { name: "NFC支付", value: 15 },
    { name: "其他", value: 10 },
  ],
};

// 智能POS专题数据
export const posData = {
  daily: { transactions: 86.3, amount: 5.68 },
  monthly: { transactions: 2586, amount: 168 },
  yearly: { transactions: 28656, amount: 2056 },
  deviceRatio: [
    { name: "传统POS", value: 40 },
    { name: "智能POS", value: 35 },
    { name: "收款码", value: 15 },
    { name: "其他", value: 10 },
  ],
};

// 线上支付专题数据
export const onlineData = {
  daily: { transactions: 70.83, amount: 3.96 },
  monthly: { transactions: 2125, amount: 118 },
  yearly: { transactions: 23568, amount: 1386 },
  typeRatio: [
    { name: "网关支付", value: 50 },
    { name: "快捷支付", value: 30 },
    { name: "APP支付", value: 15 },
    { name: "H5支付", value: 5 },
  ],
};

export default {
  config,
  dailyCoreMetrics,
  weeklyTrend,
  monthlyTrend,
  yearlyTrend,
  lanYinData,
  posData,
  onlineData,
};
