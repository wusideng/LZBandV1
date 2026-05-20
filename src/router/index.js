import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import OnlineContainer from "../container/OnlineContainer.vue";
import MerchantContainer from "../container/MerchantContainer.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: IndexPage,
    meta: { title: "大屏展示索引" },
  },
  {
    path: "/wangjin",
    name: "Wangjin",
    component: OnlineContainer,
    meta: { title: "网金业务概览" },
  },
  {
    path: "/merchant",
    name: "Merchant",
    component: MerchantContainer,
    meta: { title: "特约商户业务概览" },
  },
  {
    path: "/baihe",
    name: "Baihe",
    component: () => import("../container/BaiheContainer.vue"),
    meta: { title: "百合生活网" },
  },
  {
    path: "/quickpay",
    name: "Quickpay",
    component: () => import("../container/QuickpayContainer.vue"),
    meta: { title: "快捷支付业务概览" },
  },
  {
    path: "/finance",
    name: "Finance",
    component: () => import("../container/FinanceContainer.vue"),
    meta: { title: "个人金融经营分析驾驶舱" },
  },
  {
    path: "/channel",
    name: "Channel",
    component: () => import("../container/ChannelContainer.vue"),
    meta: { title: "个人客户经营与渠道运营驾驶舱" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
