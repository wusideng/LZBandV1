<template>
  <div class="screen-container" ref="screenRef">
    <ParticleBackground />

    <header class="screen-header-wrap">
      <HeaderTitle title="个人金融经营分析" subtitle="个人金融部" />
    </header>

    <main class="screen-body">
      <!-- 第一层：核心经营KPI能量带 -->
      <div class="kpi-layer">
        <FinanceKpiBand />
      </div>

      <!-- 第二层：三栏核心区域 -->
      <div class="core-layer">
        <aside class="left-panel">
          <FinanceCustomerAnalysis />
        </aside>

        <section class="center-panel">
          <FinanceBusinessCore />
        </section>

        <aside class="right-panel">
          <FinanceLoanWealth />
        </aside>
      </div>

      <!-- 第三层：底部区域 -->
      <div class="bottom-layer">
        <FinanceBottom />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";
import FinanceKpiBand from "../components/finance/FinanceKpiBand.vue";
import FinanceCustomerAnalysis from "../components/finance/FinanceCustomerAnalysis.vue";
import FinanceBusinessCore from "../components/finance/FinanceBusinessCore.vue";
import FinanceLoanWealth from "../components/finance/FinanceLoanWealth.vue";
import FinanceBottom from "../components/finance/FinanceBottom.vue";

const screenRef = ref(null);

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
  /* Use explicit width/height set by scaleScreen */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.screen-header-wrap {
  position: relative;
  z-index: 10;
  flex: 0 0 64px;
  padding: 15px 24px 0;
}

// 仅在 Finance 页面覆盖 HeaderTitle 样式使其居中
.screen-header-wrap :deep(.header-title) {
  justify-content: center;
}

.screen-header-wrap :deep(.header-info) {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.screen-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  overflow: hidden;
  min-height: 0;
}

// 三层固定比例 — 基于1080总高度 - 64px header = 1016px可用
.kpi-layer {
  flex: 0 0 110px;
  padding: 0 16px;
  min-height: 0;
}

.core-layer {
  flex: 1;
  display: flex;
  gap: 12px;
  padding: 0 16px;
  min-height: 0;
}

.left-panel,
.right-panel {
  width: 390px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.center-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bottom-layer {
  flex: 0 0 240px;
  padding: 6px 16px 16px;
  min-height: 0;
}
</style>