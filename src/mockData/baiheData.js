/**
 * 百合生活网经营分析中心 - Mock数据
 */

export const config = {
  updateTime: "2026-05-19 15:30:00",
  title: "百合生活网经营分析中心",
  subtitle: "网金业务部",
  systemStatus: "运行正常",
  syncStatus: "已同步",
};

// 核心经营KPI
export const kpiData = {
  monthlyAmount: {
    value: 12.56,
    unit: "亿元",
    label: "月交易金额",
    trend: "up",
    trendValue: "18.52%",
  },
  newMembers: {
    value: 28.56,
    unit: "万人",
    label: "当月新增会员",
    trend: "up",
    trendValue: "12.35%",
  },
  monthlyTransactions: {
    value: 856.3,
    unit: "万笔",
    label: "月交易笔数",
    trend: "up",
    trendValue: "15.68%",
  },
};

// 平台经营核心数据
export const platformData = {
  totalAmount: 12.56,
  totalTransactions: 856.3,
  totalMembers: 1256.8,
  memberGrowth: 18.6,
  tradeStructure: [
    { name: "实物商品", value: 45 },
    { name: "虚拟商品", value: 25 },
    { name: "生活服务", value: 20 },
    { name: "金融产品", value: 10 },
  ],
  merchantContribution: [
    { name: "品牌商户", value: 40 },
    { name: "中小商户", value: 35 },
    { name: "个人商户", value: 25 },
  ],
  memberActivity: [
    { name: "活跃会员", value: 55 },
    { name: "沉默会员", value: 25 },
    { name: "新注册", value: 20 },
  ],
};

// 商品TOP10
export const productTop10 = [
  { name: "生鲜礼包", amount: 1256, count: 12.5, ratio: 12.5, growth: 25.6 },
  { name: "粮油米面", amount: 1089, count: 10.8, ratio: 10.8, growth: 18.2 },
  { name: "数码配件", amount: 956, count: 9.5, ratio: 9.5, growth: 35.8 },
  { name: "家居用品", amount: 856, count: 8.5, ratio: 8.5, growth: 12.5 },
  { name: "母婴用品", amount: 756, count: 7.5, ratio: 7.5, growth: 22.3 },
  { name: "美妆护肤", amount: 686, count: 6.8, ratio: 6.8, growth: -5.2 },
  { name: "服装鞋帽", amount: 586, count: 5.8, ratio: 5.8, growth: 8.6 },
  { name: "图书文具", amount: 486, count: 4.8, ratio: 4.8, growth: 15.9 },
  { name: "运动户外", amount: 386, count: 3.8, ratio: 3.8, growth: 28.5 },
  { name: "宠物用品", amount: 286, count: 2.8, ratio: 2.8, growth: 45.6 },
];

// 商户TOP10
export const merchantTop10 = [
  { name: "沃尔玛超市", count: 28.5, amount: 2680, ratio: 12.8 },
  { name: "永辉超市", count: 22.3, amount: 2156, ratio: 10.3 },
  { name: "苏宁易购", count: 18.6, amount: 1856, ratio: 8.9 },
  { name: "国美电器", count: 15.2, amount: 1580, ratio: 7.6 },
  { name: "华为体验店", count: 12.8, amount: 1289, ratio: 6.2 },
  { name: "海底捞", count: 10.5, amount: 1056, ratio: 5.1 },
  { name: "星巴克咖啡", count: 8.6, amount: 856, ratio: 4.1 },
  { name: "肯德基", count: 7.2, amount: 726, ratio: 3.5 },
  { name: "麦当劳", count: 6.5, amount: 658, ratio: 3.2 },
  { name: "瑞幸咖啡", count: 5.8, amount: 586, ratio: 2.8 },
];

// 会员增长数据
export const memberGrowthData = {
  total: 1256.8,
  unit: "万人",
  growth: 18.6,
  monthlyIncrease: 28.56,
  monthlyTrend: [
    { month: "12月", value: 1185 },
    { month: "1月", value: 1205 },
    { month: "2月", value: 1218 },
    { month: "3月", value: 1235 },
    { month: "4月", value: 1248 },
    { month: "5月", value: 1256.8 },
  ],
};

// 平台活跃数据
export const activityData = {
  activityIndex: 85.6,
  dailyActive: 125.6,
  weeklyActive: 568.3,
  monthlyActive: 856.2,
};

// 商品品类占比
export const categoryRatio = [
  { name: "生鲜食品", value: 28 },
  { name: "日用百货", value: 22 },
  { name: "数码电子", value: 18 },
  { name: "服装鞋帽", value: 15 },
  { name: "美妆个护", value: 12 },
  { name: "其他", value: 5 },
];

// 实时动态流数据
export const realtimeEvents = [
  { type: "buy", icon: "🛒", desc: "用户购买 生鲜礼包", amount: "¥299", status: "success" },
  { type: "trade", icon: "💼", desc: "商户成交 商超订单", amount: "¥1,221", status: "success" },
  { type: "recharge", icon: "💰", desc: "会员充值 账户余额", amount: "¥500", status: "success" },
  { type: "hot", icon: "🔥", desc: "热门商品 数码配件", amount: "¥899", status: "hot" },
  { type: "buy", icon: "🛒", desc: "用户购买 粮油米面", amount: "¥158", status: "success" },
  { type: "trade", icon: "💼", desc: "商户成交 餐饮订单", amount: "¥3,560", status: "success" },
  { type: "recharge", icon: "💰", desc: "会员充值 礼品卡", amount: "¥1,000", status: "success" },
  { type: "hot", icon: "🔥", desc: "热门商品 美妆护肤", amount: "¥699", status: "hot" },
];

export default {
  config,
  kpiData,
  platformData,
  productTop10,
  merchantTop10,
  memberGrowthData,
  activityData,
  categoryRatio,
  realtimeEvents,
};
