<!-- 网金业务概览 -->
<template>
  <div class="screen-container" ref="screenRef">
    <!-- 动态粒子背景 -->
    <ParticleBackground />

    <!-- 顶部区域 -->
    <header class="screen-header">
      <HeaderTitle />
    </header>

    <!-- 主内容区域 -->
    <main class="screen-body">
      <!-- 左侧区域 -->
      <aside class="left-panel">
        <BlockValue1 :data="mobileBankYearlyTransactions" />
        <BlockValue1 :data="mobileBankAccounts" />
        <BlockValue1 :data="mobileBankActivations" />

        <BlockValue1 :data="lilyLifeMembers" />
        <BlockValue1 :data="contractMerchants" />
        <BlockValue1 :data="acquiringMerchants" />
      </aside>

      <!-- 中间区域 -->
      <section class="center-panel">
        <ChinaMap />
        <CityBarChart />
      </section>

      <!-- 右侧区域 - 两列布局 -->
      <aside class="right-panel">
        <div class="right-col">
          <BlockValue1 :data="acquiringMerchants" />
          <BlockValue1 :data="acquiringMerchants" />
          <MobileBankYearlyTransactions />
          <MobileBankYearlyAmount />
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, provide } from "vue";
  import ParticleBackground from "../components/ParticleBackground.vue";
  import HeaderTitle from "../components/HeaderTitle.vue";
  import BlockValue1 from "../components/left/BlockValue1.vue";
  import ChinaMap from "../components/center/ChinaMap.vue";
  import CityBarChart from "../components/center/CityBarChart.vue";
  import MobileBankYearlyTransactions from "../components/right/MobileBankYearlyTransactions.vue";
  import MobileBankYearlyAmount from "../components/right/MobileBankYearlyAmount.vue";
  import LilyLifeYearlyTransactions from "../components/right/LilyLifeYearlyTransactions.vue";
  import LilyLifeYearlyAmount from "../components/right/LilyLifeYearlyAmount.vue";
  import MerchantYearlyTransactions from "../components/right/MerchantYearlyTransactions.vue";
  import MerchantYearlyAmount from "../components/right/MerchantYearlyAmount.vue";
  import QuickPayYearlyTransactions from "../components/right/QuickPayYearlyTransactions.vue";
  import QuickPayYearlyAmount from "../components/right/QuickPayYearlyAmount.vue";
  import {
    mobileBankActivations,
    mobileBankAccounts,
    mobileBankYearlyTransactions,
    lilyLifeMembers,
    contractMerchants,
    acquiringMerchants,
  } from "../mockData/wangjinData";

  const screenRef = ref(null);

  // 共享当前城市索引
  const currentCityIndex = ref(0);
  provide("currentCityIndex", currentCityIndex);
  provide("setCityIndex", (idx) => {
    currentCityIndex.value = idx;
  });

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
  }

  .screen-header {
    position: relative;
    z-index: 10;
  }

  .screen-body {
    position: relative;
    z-index: 10;
  }

  .left-panel,
  .right-panel {
    flex-shrink: 0;
  }

  .center-panel {
    flex: 1;
    min-width: 0;
  }

  .right-panel {
    display: flex;
    gap: 10px;

    .right-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
