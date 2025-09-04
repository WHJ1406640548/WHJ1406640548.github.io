<template>
    <div class="fireworks-container" @click="launchFirework">
      <canvas ref="canvas"></canvas>
      
      <div class="controls">
        <button 
          v-for="type in fireworkTypes" 
          :key="type.value"
          @click="currentType = type.value"
          :class="{ active: currentType === type.value }"
        >
          {{ type.label }}
        </button>
        
        <button @click="autoLaunch = !autoLaunch">
          {{ autoLaunch ? '停止自动' : '自动发射' }}
        </button>
        
        <button @click="clearAll">
          清除所有
        </button>
      </div>
      
      <div class="color-controls">
        <button 
          v-for="mode in colorModes" 
          :key="mode.value"
          @click="colorMode = mode.value"
          :class="{ active: colorMode === mode.value }"
        >
          {{ mode.label }}
        </button>
      </div>
      
      <div class="particle-count">
        烟花: {{ fireworks.length }} | 粒子: {{ particles.length }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  
  // 画布引用
  const canvas = ref(null);
  let ctx = null;
  
  // 烟花和粒子数组
  const fireworks = ref([]);
  const particles = ref([]);
  const smoke = ref([]);
  
  // 控制参数
  const autoLaunch = ref(false);
  const currentType = ref('sphere');
  const colorMode = ref('random');
  let hue = 0;
  
  // 烟花类型选项
  const fireworkTypes = [
    { label: '球形', value: 'sphere' },
    { label: '柳絮形', value: 'willow' },
    { label: '心形', value: 'heart' }
  ];
  
  // 颜色模式选项
  const colorModes = [
    { label: '随机', value: 'random' },
    { label: '彩虹', value: 'rainbow' },
    { label: '暖色', value: 'warm' },
    { label: '冷色', value: 'cool' }
  ];
  
  // 音效
  const explosionSounds = [
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1684.mp3'),
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-very-short-explosion-1686.mp3'),
    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-short-explosion-1694.mp3')
  ];
  
  // 初始化音效
  explosionSounds.forEach(sound => {
    sound.volume = 0.3;
  });
  
  // 烟花类
  class Firework {
    constructor(x, y, targetX, targetY) {
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.speed = 2 + Math.random() * 2;
      this.angle = Math.atan2(targetY - y, targetX - x);
      this.velocity = {
        x: Math.cos(this.angle) * this.speed,
        y: Math.sin(this.angle) * this.speed
      };
      this.brightness = Math.random() * 50 + 50;
      this.particleCount = 100 + Math.floor(Math.random() * 150);
      this.trail = [];
      this.trailLength = 5 + Math.floor(Math.random() * 10);
      this.type = currentType.value;
      this.hue = this.getHue();
      this.size = 2 + Math.random() * 2;
    }
  
    getHue() {
      switch(colorMode.value) {
        case 'random': return Math.random() * 360;
        case 'rainbow': return hue;
        case 'warm': return Math.random() * 60;
        case 'cool': return 180 + Math.random() * 120;
        default: return Math.random() * 360;
      }
    }
  
    update() {
      // 添加尾迹点
      this.trail.push({
        x: this.x,
        y: this.y,
        size: this.size * 0.8,
        alpha: 0.7
      });
  
      // 限制尾迹长度
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }
  
      // 更新位置
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
      // 添加烟雾效果
      if (Math.random() < 0.3) {
        smoke.value.push({
          x: this.x,
          y: this.y,
          size: this.size * 2,
          hue: this.hue,
          alpha: 0.5,
          decay: 0.01 + Math.random() * 0.02,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          }
        });
      }
  
      // 检查是否到达目标位置
      const distance = Math.sqrt(
        Math.pow(this.x - this.targetX, 2) + 
        Math.pow(this.y - this.targetY, 2)
      );
      
      if (distance < this.speed * 2) {
        this.explode();
        return false;
      }
      return true;
    }
  
    explode() {
      createParticles(this.x, this.y, this.particleCount, this.brightness, this.hue, this.type);
      playExplosionSound();
    }
  
    draw() {
      // 绘制尾迹
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        const progress = i / this.trail.length;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, ${this.brightness}%, ${point.alpha})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, ${this.brightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
  
      // 绘制烟花头部
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      gradient.addColorStop(0, `hsl(${this.hue}, 100%, ${this.brightness}%)`);
      gradient.addColorStop(1, `hsl(${this.hue}, 100%, ${this.brightness - 20}%)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  // 粒子类
  class Particle {
    constructor(x, y, hue, brightness, type) {
      this.x = x;
      this.y = y;
      this.hue = hue;
      this.brightness = brightness;
      this.type = type;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.size = Math.random() * 4 + 1;
      
      // 根据类型设置不同的物理参数
      switch(type) {
        case 'sphere':
          this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
          };
          this.gravity = 0.05;
          this.resistance = 0.98;
          this.flicker = Math.random() > 0.8;
          break;
          
        case 'willow':
          this.velocity = {
            x: (Math.random() - 0.5) * 6,
            y: Math.random() * 3 + 2
          };
          this.gravity = 0.02;
          this.resistance = 0.99;
          this.flicker = false;
          break;
          
        case 'heart':
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          };
          this.gravity = 0.01;
          this.resistance = 0.97;
          this.flicker = Math.random() > 0.9;
          break;
      }
    }
  
    update() {
      this.velocity.x *= this.resistance;
      this.velocity.y *= this.resistance;
      this.velocity.y += this.gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= this.decay;
      
      // 闪烁效果
      if (this.flicker && Math.random() < 0.1) {
        this.alpha += 0.1;
      }
      
      return this.alpha > 0;
    }
  
    draw() {
      ctx.beginPath();
      
      // 根据类型绘制不同形状
      if (this.type === 'heart') {
        // 绘制心形粒子
        const size = this.size * this.alpha;
        ctx.moveTo(this.x, this.y - size/2);
        ctx.bezierCurveTo(
          this.x + size/2, this.y - size,
          this.x + size, this.y,
          this.x, this.y + size
        );
        ctx.bezierCurveTo(
          this.x - size, this.y,
          this.x - size/2, this.y - size,
          this.x, this.y - size/2
        );
      } else {
        // 绘制圆形粒子
        ctx.arc(this.x, this.y, this.size * this.alpha, 0, Math.PI * 2);
      }
      
      // 创建发光效果
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * this.alpha
      );
      gradient.addColorStop(0, `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`);
      gradient.addColorStop(1, `hsla(${this.hue}, 100%, ${this.brightness}%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // 添加烟雾效果
      if (Math.random() < 0.1) {
        smoke.value.push({
          x: this.x,
          y: this.y,
          size: this.size * 1.5,
          hue: this.hue,
          alpha: this.alpha * 0.7,
          decay: this.decay * 0.7,
          velocity: {
            x: this.velocity.x * 0.3,
            y: this.velocity.y * 0.3
          }
        });
      }
    }
  }
  
  // 创建烟花
  const launchFirework = (e) => {
    const x = Math.random() * canvas.value.width;
    const y = canvas.value.height;
    const targetX = e ? e.clientX : Math.random() * canvas.value.width;
    const targetY = e ? e.clientY : Math.random() * canvas.value.height * 0.6;
    
    fireworks.value.push(new Firework(x, y, targetX, targetY));
  };
  
  // 创建粒子
  const createParticles = (x, y, count, brightness, hue, type) => {
    for (let i = 0; i < count; i++) {
      particles.value.push(new Particle(x, y, hue, brightness, type));
    }
    
    // 添加爆炸烟雾
    for (let i = 0; i < 20; i++) {
      smoke.value.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        size: 5 + Math.random() * 10,
        hue: hue,
        alpha: 0.6,
        decay: 0.01 + Math.random() * 0.02,
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        }
      });
    }
  };
  
  // 播放爆炸声音
  const playExplosionSound = () => {
    try {
      const sound = explosionSounds[Math.floor(Math.random() * explosionSounds.length)];
      sound.currentTime = 0;
      sound.play();
    } catch (e) {
      console.log('声音播放失败:', e);
    }
  };
  
  // 清除所有
  const clearAll = () => {
    fireworks.value = [];
    particles.value = [];
    smoke.value = [];
  };
  
  // 动画循环
  let animationFrameId = null;
  const animate = () => {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    
    // 更新彩虹色调
    if (colorMode.value === 'rainbow') {
      hue += 0.5;
      if (hue >= 360) hue = 0;
    }
    
    // 随机自动发射烟花
    if (autoLaunch.value && Math.random() < 0.03) {
      launchFirework();
    }
    
    // 更新并绘制所有烟雾
    for (let i = smoke.value.length - 1; i >= 0; i--) {
      const s = smoke.value[i];
      s.x += s.velocity.x;
      s.y += s.velocity.y;
      s.alpha -= s.decay;
      s.size += 0.1;
      
      if (s.alpha <= 0) {
        smoke.value.splice(i, 1);
      } else {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          s.x, s.y, 0,
          s.x, s.y, s.size
        );
        gradient.addColorStop(0, `hsla(${s.hue}, 30%, 60%, ${s.alpha})`);
        gradient.addColorStop(1, `hsla(${s.hue}, 10%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // 更新并绘制所有烟花
    for (let i = fireworks.value.length - 1; i >= 0; i--) {
      if (!fireworks.value[i].update()) {
        fireworks.value.splice(i, 1);
      } else {
        fireworks.value[i].draw();
      }
    }
    
    // 更新并绘制所有粒子
    for (let i = particles.value.length - 1; i >= 0; i--) {
      if (!particles.value[i].update()) {
        particles.value.splice(i, 1);
      } else {
        particles.value[i].draw();
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // 初始化画布
  onMounted(() => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    ctx = canvas.value.getContext('2d');
    
    // 初始自动发射几朵烟花
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        launchFirework();
      }, i * 800);
    }
    
    animate();
  });
  
  // 清理
  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
  
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  });
  </script>
  
  <style scoped>
  .fireworks-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
    cursor: crosshair;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  .controls {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 100;
  }
  
  .color-controls {
    position: fixed;
    bottom: 70px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 100;
  }
  
  button {
    padding: 8px 16px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Arial', sans-serif;
    backdrop-filter: blur(5px);
  }
  
  button:hover {
    background-color: rgba(50, 50, 50, 0.7);
    transform: translateY(-2px);
  }
  
  button.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
  }
  
  .particle-count {
    position: fixed;
    top: 10px;
    right: 10px;
    color: white;
    font-family: Arial, sans-serif;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 15px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  </style>