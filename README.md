# 兰州银行 数据可视化大屏展示系统

> 银行级 IOC 运营中心 · 经营分析驾驶舱 · 大屏数据可视化

---

## 项目概述

兰州银行互联网金融业务运营大屏展示系统，面向网金业务部、个人金融部、渠道运营部，提供 **6 个业务主题大屏** 覆盖银行核心互联网金融业务的经营数据分析与实时监控。

### 设计定位

- 银行级经营决策分析平台
- 高级经营驾驶舱/IOC运营中心
- **非** 后台管理系统、**非** 普通BI报表、**非** 图表拼接页面

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.4.21 | 前端框架（Composition API + setup 语法） |
| Vite | ^5.1.6 | 构建工具 |
| Vue Router | ^4.6.4 | 路由管理（history 模式） |
| ECharts 5 | ^5.5.0 | 核心图表库 |
| SCSS | ^1.71.1 | CSS 预处理 |

---

## 快速启动

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

项目默认运行在 `http://localhost:5173`，适配 **1920×1080** 大屏分辨率，通过缩放自适应任意屏幕。

---

## 页面列表

| 路由 | 页面名称 | 所属部门 | 布局结构 | 组件数 |
|------|----------|----------|----------|--------|
| `/` | 大屏展示索引 | — | 表格导航页 | 2 |
| `/wangjin` | 网金业务概览 | 网金业务部 | 三栏(左/中/右) | 10+ |
| `/merchant` | 特约商户业务概览 | 网金业务部 | 纵向排列 | 4 |
| `/baihe` | 百合生活网 | 网金业务部 | 四层(标题/KPI/三栏/底部) | 5 |
| `/quickpay` | 快捷支付业务概览 | 网金业务部 | 两层(三栏/底部) | 4 |
| `/finance` | 个人金融经营分析驾驶舱 | 个人金融部 | 四层(标题/KPI/三栏/底部) | 5 |
| `/channel` | 个人客户经营与渠道运营驾驶舱 | 渠道运营部 | 四层(标题/KPI/三栏/底部) | 5 |

---

## 目录结构

```
src/
├── container/          # 容器组件（每屏一个，定义布局骨架）
│   ├── OnlineContainer.vue      # 网金业务概览
│   ├── MerchantContainer.vue    # 特约商户
│   ├── BaiheContainer.vue       # 百合生活网
│   ├── QuickpayContainer.vue    # 快捷支付
│   ├── FinanceContainer.vue     # 个人金融经营分析
│   └── ChannelContainer.vue     # 渠道运营
│
├── components/         # 业务组件、共享组件、公共组件
│   ├── common/         # 通用图表组件（BarChart/LineChart/RingChart）
│   ├── baihe/          # 百合生活网业务组件
│   ├── channel/        # 渠道运营业务组件
│   ├── finance/        # 个人金融业务组件
│   ├── merchant/       # 特约商户业务组件
│   ├── quickpay/       # 快捷支付业务组件
│   ├── center/         # 网金页面中间区域组件
│   ├── left/           # 网金页面左侧指标卡
│   ├── right/          # 网金页面右侧统计图
│   ├── HeaderTitle.vue          # 顶部标题栏（含实时时钟）
│   └── ParticleBackground.vue   # Canvas 粒子背景动画
│
├── mockData/           # Mock 数据层（ES Module，按页面分文件）
│   ├── wangjinData.js
│   ├── merchantData.js
│   ├── baiheData.js
│   ├── quickpayData.js
│   ├── financeData.js
│   └── channelData.js
│
├── router/index.js     # 路由配置（7条路由，含路由守卫）
├── styles/global.scss  # 全局样式（深蓝科技风主题变量、通用类）
├── pages/IndexPage.vue # 首页索引（大屏列表导航）
├── App.vue             # 根组件
└── main.js             # 入口文件
```

---

## 各页面详细说明

### 网金业务概览 `/wangjin`

**布局**：三栏（左/中/右）

- **左栏**：6 个指标卡（手机银行开户数、激活数、月激活户数、百合会员、特约商户数、收单商户数）
- **中栏**：甘肃省地图（14 个市州，GeoJSON 加载）+ 各市业务数据柱状图，支持城市轮播高亮联动
- **右栏**：两列布局，含手机银行年交易笔数柱状图、月度金额趋势折线图

**特色**：ChinaMap 与 CityBarChart 通过 `provide/inject` 共享城市索引实现联动高亮。

---

### 特约商户业务概览 `/merchant`

**布局**：纵向单列

- 实时运营监控（8 项指标，3 秒数字滚动动画）
- 渠道业务分析（兰银惠付 / 智能POS / 线上支付，含环形图占比）
- 实时交易流（每 2 秒生成新交易记录）

---

### 百合生活网 `/baihe`

**布局**：四层（KPI → 三栏核心 → 底部）

- **KPI 层**：月交易金额 / 新增会员 / 月交易笔数，含迷你趋势折线图
- **三栏核心**：商品 Top10 排行 / 平台总览 + 品类分布环形图 + 热力图 / 商户 Top10 排行
- **底部**：会员增长趋势折线 + 活跃仪表盘 + 实时动态经营流

---

### 快捷支付业务概览 `/quickpay`

**布局**：两层（三栏核心 + 底部）

- **左栏**：本周交易趋势折线图
- **中栏**：支付核心中枢（CSS 能量环 + 核心数据 + 成功率/活跃度仪表盘）
- **右栏**：微信 / 支付宝 / 银联等渠道占比分析
- **底部**：月度交易量柱状图 + 年度趋势折线 + 实时交易流

---

### 个人金融经营分析驾驶舱 `/finance`

**布局**：四层（标题 → KPI → 三栏 → 底部）

- **KPI 层**（110px）：8 项核心经营指标（客户总数、AUM、存款、贷款、财富客户、营收、增长率等）
- **左栏**（390px）：客户结构分析（等级分布环形图 + 仪表盘 + 4 项数值）+ 客户增长趋势（折线/面积/柱状图）
- **中栏**（视觉中心）：个人金融资产趋势（4 条面积折线，含轮播 tooltip + 最高标记点）+ 区域经营雷达图（6 维度，自动轮播聚焦）
- **右栏**（390px）：贷款经营（余额数值 + 不良率/逾期率仪表盘）+ 财富管理（理财余额 + 基金/保险柱状图）
- **底部**（240px）：5 类机构排名 TOP10（存款/AUM/客户增长/贷款增长/财富中收）+ 风险预警滚动流

**数据规模**：mock 数据文件最大，含 10 个数据模块，约 400 行。

---

### 个人客户经营与渠道运营驾驶舱 `/channel`

**布局**：四层（标题 → KPI → 三栏 → 底部）

- **KPI 层**（140px）：8 项渠道运营 KPI（MAU/DAU/交易笔数/金额/线上开户/贷款申请/转化率/活跃率）
- **左栏**（420px）：客户活跃分析（登录趋势 + 访问时长 + 高频功能排名 + 留存漏斗 + 新老客户占比）+ 渠道分布分析（可切换占比/玫瑰图）
- **中栏**（视觉中心）：线上渠道趋势（4 条折线 + 轮播 tooltip）+ 交易行为分析（交易类型环形图 + 高频时段热力图）
- **右栏**（420px）：营销效果分析（活动参与/理财/信贷转化 + 仪表盘 + 漏斗图）+ 客户画像（年龄/性别/收入雷达图可切换 + 标签云）
- **底部**（200px）：实时监控（在线人数/交易笔数/金额/告警 + 成功率/响应时间仪表盘 + 告警滚动流 + 渠道交易流）

---

## 通用模式与约定

### 容器组件模式

每个页面遵循统一结构：

```
<template>
  <div class="screen-container" ref="screenRef">
    <ParticleBackground />         → Canvas 粒子动画背景
    <header><HeaderTitle /></header> → 顶部标题栏
    <main class="screen-body">     → 主体内容（固定比例分层）
      ...
    </main>
  </div>
</template>
```

### 大屏自适应方案

```javascript
const scaleScreen = () => {
  const baseWidth = 1920, baseHeight = 1080
  const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight)
  screenRef.value.style.transform = `scale(${scale})`
  screenRef.value.style.transformOrigin = "left top"
  screenRef.value.style.width = `${baseWidth}px`
  screenRef.value.style.height = `${baseHeight}px`
}
```

通过 `ResizeObserver` 监听 `document.body` 尺寸变化，自动触发缩放。

### 全局样式主题

`src/styles/global.scss` 定义深蓝科技风 CSS 变量：

| 变量 | 值 | 用途 |
|------|-----|------|
| `--primary` | `#00D4FF` | 主色 - 科技蓝 |
| `--accent` | `#00FF88` | 增长绿 |
| `--warning` | `#FF6B6B` | 红色警告 |
| `--bg-primary` | `#0A1628` | 深色背景 |
| `--glow-primary` | `0 0 20px rgba(0,212,255,0.5)` | 发光效果 |

提供通用 CSS 类：`.tech-card`（流光卡片）、`.card-title`（卡片标题）、`.digital-value`（发光数字）、`.scroll-list`（滚动列表动画）等。

### 动画实现

- **数字滚动**：`requestAnimationFrame` + easeOutCubic 缓动，组件挂载时从 0 滚动到目标值
- **粒子背景**：Canvas 绘制粒子 + 连线，`ParticleBackground.vue`
- **滚动列表**：CSS `@keyframes scrollUp`，`translateY(-50%)` 无限循环
- **呼吸灯**：CSS `@keyframes breathe`，`scale + opacity` 循环
- **图表 tooltip 轮播**：`setInterval` + `echarts.dispatchAction({ type: 'showTip' })`

### Mock 数据

所有数据通过 ES Module 导出，组件直接 `import` 使用，无 Axios/API 层。数据格式为 JSON 风格，模拟真实银行经营场景。

### 图表通用组件

`src/components/common/` 提供三个可复用 ECharts 封装：

- **BarChart.vue**：渐变蓝色柱状图，接收 `{ xAxis, series }` 格式数据
- **LineChart.vue**：平滑面积折线图，接收 `{ xAxis, series }` 格式数据
- **RingChart.vue**：环形饼图，接收 `[{ name, value }]` 格式数据

均支持 `resize` 自适应和 `watch` 响应式更新。

---

## 设计规范

### 色彩

| 类别 | 色值 | 应用场景 |
|------|------|----------|
| 科技蓝 | `#00D4FF` | 主色、标题、数值、边框发光 |
| 辅助蓝 | `#0066FF` | 辅助色、渐变色 |
| 增长绿 | `#00FF88` | 正增长、正常状态、活跃类 |
| 警告红 | `#FF6B6B` | 风险类、告警、负增长 |
| 金色 | `#FFD700` | 财富类、营销类、TOP1 高亮 |
| 深蓝背景 | `#0A1628` | 主背景色 |

### 图表配色

```javascript
// 通用图表色盘
['#00D4FF', '#0099FF', '#0066FF', '#FFD700', '#FF6B6B', '#00FF88']
```

---

## 数据文件

`public/dataModel/` 目录下存放 AI 生成的需求描述文档，作为每个大屏的设计依据和需求来源。

| 文件 | 对应页面 |
|------|----------|
| `AI网金业务概览.md` | 网金业务概览 |
| `AI特约商户.md` | 特约商户业务概览 |
| `AI百合生活网.md` | 百合生活网 |
| `AI快捷支付业务概览.md` | 快捷支付业务概览 |
| `AI个人金融总览.md` | 个人金融经营分析驾驶舱 |
| `AI个人客户经营与渠道运营.md` | 个人客户经营与渠道运营驾驶舱 |

---

## 构建部署

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到 Web 服务器。注意项目使用 `createWebHistory()`（HTML5 History 模式），服务器需要配置 fallback 到 `index.html`。

---

> 兰州银行 · 数据平台项目组