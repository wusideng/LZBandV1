<template>
  <div class="screen-container" ref="screenRef">
    <!-- 动态粒子背景 -->
    <ParticleBackground />

    <!-- 顶部区域 -->
    <header class="screen-header">
      <HeaderTitle title="百合生活网" subtitle="网金业务部" />
    </header>

    <!-- 主内容区域 -->
    <main class="screen-body">
      <div class="placeholder-content">
        <div class="placeholder-icon">🏗️</div>
        <div class="placeholder-text">百合生活网大屏开发中...</div>
        <button class="back-btn-large" @click="goBack">返回首页</button>
      </div>
    </main>
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

.screen-header {
  position: relative;
  z-index: 10;
}

.screen-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  position: relative;
  z-index: 10;
}

.placeholder-content {
  text-align: center;
  padding: 60px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 16px;

  .placeholder-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }

  .placeholder-text {
    font-size: 24px;
    color: var(--text-secondary);
    margin-bottom: 30px;
  }
}

.back-btn-large {
  padding: 15px 40px;
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 8px;
  color: #00d4ff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.4), rgba(0, 212, 255, 0.2));
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
}
</style>
