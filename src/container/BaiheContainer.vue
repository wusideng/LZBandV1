<template>
  <div class="screen-container" ref="screenRef">
    <ParticleBackground />

    <header class="screen-header">
      <HeaderTitle title="百合生活网经营分析中心" subtitle="网金业务部" />
    </header>

    <main class="screen-body">
      <!-- 第一层：核心经营KPI能量带 -->
      <KpiEnergyBand />

      <!-- 第二层：三栏核心区域 -->
      <div class="core-layout">
        <aside class="left-panel">
          <ProductAnalysis />
        </aside>

        <section class="center-panel">
          <PlatformCenter />
        </section>

        <aside class="right-panel">
          <MerchantAnalysis />
        </aside>
      </div>

      <!-- 第三层：底部面板 -->
      <BottomPanel />
    </main>

    <!-- <button class="back-btn" @click="goBack">← 返回首页</button> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";
import KpiEnergyBand from "../components/baihe/KpiEnergyBand.vue";
import ProductAnalysis from "../components/baihe/ProductAnalysis.vue";
import PlatformCenter from "../components/baihe/PlatformCenter.vue";
import MerchantAnalysis from "../components/baihe/MerchantAnalysis.vue";
import BottomPanel from "../components/baihe/BottomPanel.vue";

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

// 三层固定比例分配
.core-layout {
  flex: 0 0 58%;
  display: flex;
  gap: 15px;
  padding: 10px 20px;
  min-height: 0;
}

.left-panel,
.right-panel {
  width: 320px;
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