<template>
  <div class="index-page">
    <!-- 粒子背景 -->
    <ParticleBackground />

    <!-- 头部 -->
    <header class="index-header">
      <div class="header-title">
        <h1>数据可视化大屏展示系统</h1>
        <p class="subtitle">兰州银行 · 数据平台项目组</p>
      </div>
      <div class="header-time">
        <span class="time">{{ currentTime }}</span>
        <span class="date">{{ currentDate }}</span>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="index-main">
      <div class="table-container">
        <div class="table-header">
          <span class="header-icon"></span>
          <span class="header-text">大屏展示索引</span>
        </div>

        <table class="index-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>统计图名称</th>
              <th>业务种类</th>
              <th>绘制状态</th>
              <th>调整链接</th>
              <th>日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in screenList" :key="index"
                :class="{ 'highlight': item.status === '已完成' }"
                @click="goToScreen(item.path)">
              <td class="index-col">{{ index + 1 }}</td>
              <td class="name-col">
                <span class="screen-name">{{ item.name }}</span>
              </td>
              <td class="module-col">{{ item.module }}</td>
              <td class="status-col">
                <span class="status-badge" :class="item.statusClass">
                  {{ item.status }}
                </span>
              </td>
              <td class="link-col">
                <button class="enter-btn">进入大屏 →</button>
              </td>
              <td class="date-col">{{ item.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="index-footer">
      <p>兰州银行 · 数据可视化大屏展示系统 · {{ currentYear }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ParticleBackground from '../components/ParticleBackground.vue'

const router = useRouter()

const screenList = ref([
  {
    name: '网金业务概览',
    module: '网金业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/wangjin',
    date: '2025-05-18'
  },
  {
    name: '特约商户业务概览',
    module: '网金业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/merchant',
    date: '2025-05-19'
  },
  {
    name: '百合生活网',
    module: '网金业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/baihe',
    date: '2025-05-19'
  },
  {
    name: '快捷支付业务概览',
    module: '网金业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/quickpay',
    date: '2025-05-20'
  },
  {
    name: '个人金融经营分析驾驶舱',
    module: '个人金融业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/finance',
    date: '2025-05-20'
  },
  {
    name: '个人客户经营与渠道运营驾驶舱',
    module: '个人金融业务',
    status: '已完成',
    statusClass: 'completed',
    path: '/channel',
    date: '2025-05-20'
  }
])

const currentTime = ref('')
const currentDate = ref('')
const currentYear = ref(new Date().getFullYear())

let timer = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour12: false })
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}

const goToScreen = (path) => {
  router.push(path)
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.index-page {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  position: relative;
}

// 头部
.index-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);

  .header-title {
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 4px;
      text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
      margin-bottom: 5px;
    }

    .subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      letter-spacing: 2px;
    }
  }

  .header-time {
    text-align: right;

    .time {
      display: block;
      font-size: 24px;
      font-weight: 600;
      color: var(--primary);
      font-family: 'DIN Alternate', monospace;
    }

    .date {
      font-size: 13px;
      color: var(--text-secondary);
    }
  }
}

// 主内容
.index-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.table-container {
  width: 100%;
  max-width: 1200px;
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.table-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 30px;
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.15), transparent);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);

  .header-icon {
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #00D4FF, #0088FF);
    border-radius: 2px;
  }

  .header-text {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
  }
}

.index-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 18px 20px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  }

  thead {
    background: rgba(0, 212, 255, 0.08);

    th {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary);
      letter-spacing: 1px;
    }
  }

  tbody {
    tr {
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 212, 255, 0.1);
      }

      &.highlight {
        background: rgba(0, 255, 136, 0.05);
      }

      &:last-child td {
        border-bottom: none;
      }
    }

    td {
      font-size: 14px;
      color: var(--text-primary);
    }
  }

  .index-col {
    width: 60px;
    text-align: center;
    color: var(--text-secondary);
    font-weight: 600;
  }

  .name-col {
    .screen-name {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
    }
  }

  .module-col {
    color: var(--text-secondary);
  }

  .status-col {
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;

      &.completed {
        background: rgba(0, 255, 136, 0.15);
        color: #00FF88;
        border: 1px solid rgba(0, 255, 136, 0.3);
      }

      &.developing {
        background: rgba(255, 170, 0, 0.15);
        color: #FFAA00;
        border: 1px solid rgba(255, 170, 0, 0.3);
      }

      &.todo {
        background: rgba(255, 170, 0, 0.15);
        color: #f61839;
        border: 1px solid rgba(255, 170, 0, 0.3);
      }
    }
  }

  .link-col {
    .enter-btn {
      padding: 6px 16px;
      background: linear-gradient(90deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.1));
      border: 1px solid rgba(0, 212, 255, 0.4);
      border-radius: 4px;
      color: #00D4FF;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(90deg, rgba(0, 212, 255, 0.4), rgba(0, 212, 255, 0.2));
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
      }
    }
  }

  .date-col {
    color: var(--text-dim);
    font-size: 13px;
  }
}

// 底部
.index-footer {
  padding: 20px;
  text-align: center;
  border-top: 1px solid rgba(0, 212, 255, 0.1);

  p {
    font-size: 13px;
    color: var(--text-dim);
  }
}
</style>
