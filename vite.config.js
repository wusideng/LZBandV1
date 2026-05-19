import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  // 确保JSON文件能被正确加载
  assetsInclude: ["**/*.json"],
});
