<template>
  <div class="particle-bg">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []

const initParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width = window.innerWidth
  const height = canvas.height = window.innerHeight
  
  particles = []
  const count = 60
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3
    })
  }
}

const animate = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
  ctx.clearRect(0, 0, width, height)
  
  particles.forEach((p, i) => {
    p.x += p.vx
    p.y += p.vy
    
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1
    
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
    ctx.fill()
    
    // 连线
    particles.forEach((p2, j) => {
      if (i === j) return
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 150) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 150)})`
        ctx.stroke()
      }
    })
  })
  
  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  initParticles()
}

onMounted(() => {
  initParticles()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.particle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>