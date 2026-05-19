<template>
  <div class="screen-container" ref="screenRef">
    <!-- 动态粒子背景 -->
    <ParticleBackground />

    <!-- 顶部区域 -->
    <header class="screen-header">
      <HeaderTitle title="特约商户业务概览" subtitle="网金业务部" />
    </header>

    <!-- 主内容区域 -->
    <main class="screen-body">
      <!-- 第一层：实时运营监控 -->
      <RealtimeMetrics />

      <!-- 第二层：经营趋势分析 -->
      <!-- <TrendAnalysis /> -->

      <!-- 第三层：渠道业务分析 -->
      <ChannelAnalysis />

      <!-- 第四层：实时动态交易流 -->
      <TransactionFlow />
    </main>

    <!-- 返回按钮 -->
    <!-- <button class="back-btn" @click="goBack">← 返回首页</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";
import RealtimeMetrics from "../components/merchant/RealtimeMetrics.vue";
import TrendAnalysis from "../components/merchant/TrendAnalysis.vue";
import ChannelAnalysis from "../components/merchant/ChannelAnalysis.vue";
import TransactionFlow from "../components/merchant/TransactionFlow.vue";

const router = useRouter();
const screenRef = ref(null);

const goBack = () => {
  router.push("/");
};

// 大屏自适应
const scaleScreen = () => {
  if (!screenRef.value) return;

  const baseWidth = 1920;
  const baseHeight = 1080;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scaleX = width / baseWidth;
  const scaleY = height / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  screenRef.value.style.transform = `scale(${scale})`;
  screenRef.value.style.transformOrigin = "left top";
  screenRef.value.style.width = `${baseWidth}px`;
  screenRef.value.style.height = `${baseHeight}px`;
};

let resizeObserver = null;

onMounted(() => {
  scaleScreen();
  resizeObserver = new ResizeObserver(() => scaleScreen());
  resizeObserver.observe(document.body);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style lang="scss" scoped>
.screen-container {
  margin: auto 5%;
  position: relative;
  background: var(--bg-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  padding: 10px 20px;
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 6px;
  color: #00d4ff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.4);
  }
}

.screen-header {
  position: relative;
  z-index: 10;
  padding: 20px;
}

.screen-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 212, 255, 0.3);
    border-radius: 2px;
  }
}
</style>
