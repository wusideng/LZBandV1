<template>
  <div class="screen-container" ref="screenRef">
    <ParticleBackground />
    <header class="screen-header-wrap">
      <HeaderTitle title="个人客户经营与渠道运营驾驶舱" subtitle="渠道运营部" />
    </header>
    <main class="screen-body">
      <div class="kpi-layer"><ChannelKpiBand /></div>
      <div class="core-layer">
        <aside class="left-panel"><ChannelUserBehavior /></aside>
        <section class="center-panel"><ChannelTrendCore /></section>
        <aside class="right-panel"><ChannelMarketing /></aside>
      </div>
      <div class="bottom-layer"><ChannelRealtimeMonitor /></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ParticleBackground from "../components/ParticleBackground.vue";
import HeaderTitle from "../components/HeaderTitle.vue";
import ChannelKpiBand from "../components/channel/ChannelKpiBand.vue";
import ChannelUserBehavior from "../components/channel/ChannelUserBehavior.vue";
import ChannelTrendCore from "../components/channel/ChannelTrendCore.vue";
import ChannelMarketing from "../components/channel/ChannelMarketing.vue";
import ChannelRealtimeMonitor from "../components/channel/ChannelRealtimeMonitor.vue";

const screenRef = ref(null);
const scaleScreen = () => {
  if (!screenRef.value) return;
  const baseWidth = 1920, baseHeight = 1080;
  const w = window.innerWidth, h = window.innerHeight;
  const s = Math.min(w / baseWidth, h / baseHeight);
  screenRef.value.style.transform = `scale(${s})`;
  screenRef.value.style.transformOrigin = "left top";
  screenRef.value.style.width = `${baseWidth}px`;
  screenRef.value.style.height = `${baseHeight}px`;
};
let ro = null;
onMounted(() => { scaleScreen(); ro = new ResizeObserver(() => scaleScreen()); ro.observe(document.body); });
onUnmounted(() => { if (ro) ro.disconnect(); });
</script>

<style lang="scss" scoped>
.screen-container { margin: auto 5%; position: relative; background: var(--bg-primary); overflow: hidden; display: flex; flex-direction: column; }
.screen-header-wrap { position: relative; z-index: 10; flex: 0 0 64px; padding: 15px 24px 0; }
.screen-body { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 10; overflow: hidden; min-height: 0; }
.kpi-layer { flex: 0 0 140px; padding: 0 16px; min-height: 0; }
.core-layer { flex: 1; display: flex; gap: 12px; padding: 0 16px; min-height: 0; }
.left-panel, .right-panel { width: 420px; flex-shrink: 0; display: flex; flex-direction: column; overflow: hidden; }
.center-panel { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; }
.bottom-layer { flex: 0 0 200px; padding: 6px 16px 12px; min-height: 0; }
</style>