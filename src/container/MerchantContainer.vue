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
      <!-- 左侧区域 -->
      <aside class="left-panel">
        <div class="placeholder-card">
          <div class="card-title">日交易核心指标</div>
          <div class="card-content">数据加载中...</div>
        </div>
      </aside>

      <!-- 中间区域 -->
      <section class="center-panel">
        <div class="placeholder-card core">
          <div class="card-title">核心交易总览</div>
          <div class="card-content">数据加载中...</div>
        </div>
      </section>

      <!-- 右侧区域 -->
      <aside class="right-panel">
        <div class="placeholder-card">
          <div class="card-title">渠道业务分析</div>
          <div class="card-content">数据加载中...</div>
        </div>
      </aside>
    </main>

    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">← 返回首页</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";

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
}

.screen-body {
  display: flex;
  gap: 20px;
  padding: 20px;
  position: relative;
  z-index: 10;
}

.left-panel,
.right-panel {
  flex-shrink: 0;
  width: 380px;
}

.center-panel {
  flex: 1;
  min-width: 0;
}

.placeholder-card {
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  padding: 20px;

  &.core {
    background: rgba(0, 212, 255, 0.08);
    border-color: rgba(0, 212, 255, 0.3);
  }

  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  }

  .card-content {
    color: var(--text-secondary);
    font-size: 14px;
  }
}
</style>
