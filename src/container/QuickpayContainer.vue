<template>
  <div class="screen-container" ref="screenRef">
    <ParticleBackground />

    <header class="screen-header">
      <HeaderTitle title="快捷支付业务概览" subtitle="网金业务部" />
    </header>

    <main class="screen-body">
      <!-- 三栏核心布局 -->
      <div class="core-layout">
        <aside class="left-panel">
          <DailyOperations />
        </aside>

        <section class="center-panel">
          <PaymentCore />
        </section>

        <aside class="right-panel">
          <ChannelAnalysis />
        </aside>
      </div>

      <!-- 底部分析 -->
      <BottomAnalysis />
    </main>

    <!-- <button class="back-btn" @click="goBack">← 返回首页</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";
import DailyOperations from "../components/quickpay/DailyOperations.vue";
import PaymentCore from "../components/quickpay/PaymentCore.vue";
import ChannelAnalysis from "../components/quickpay/ChannelAnalysis.vue";
import BottomAnalysis from "../components/quickpay/BottomAnalysis.vue";

const router = useRouter();
const screenRef = ref(null);

const goBack = () => {
  router.push("/");
};

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
  height: 100vh;
  width: 1920px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  &:hover { background: rgba(0, 212, 255, 0.4); }
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
  overflow: hidden;
  height: calc(100vh - 100px);
}

.core-layout {
  flex: 0 0 55%;
  display: flex;
  gap: 15px;
  padding: 0 20px;
  min-height: 0;
}

.left-panel,
.right-panel {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
}

.center-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
</style>