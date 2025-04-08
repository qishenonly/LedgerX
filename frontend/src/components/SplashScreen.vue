<template>
  <div class="splash-screen">
    <div class="particles">
      <div v-for="i in 100" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    <div class="stars">
      <div v-for="i in 50" :key="'star-'+i" class="star" :style="getStarStyle(i)"></div>
    </div>
    <div class="lightning">
      <div v-for="i in 3" :key="'lightning-'+i" class="lightning-bolt" :style="getLightningStyle(i)"></div>
    </div>
    <div class="content-container">
      <div class="logo-container">
        <div class="logo">
          <div class="logo-inner"></div>
          <div class="logo-glow"></div>
          <div class="logo-rings">
            <div v-for="i in 5" :key="'ring-'+i" class="ring" :style="getRingStyle(i)"></div>
          </div>
          <div class="logo-sparkles">
            <div v-for="i in 8" :key="'sparkle-'+i" class="sparkle" :style="getSparkleStyle(i)"></div>
          </div>
        </div>
        <div class="app-name">
          <span class="text-glow">闪电记</span>
          <div class="slogan">让记账如闪电般简单</div>
        </div>
      </div>
      
      <div class="features">
        <div class="feature-item" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
            <div class="icon-glow"></div>
          </div>
          <span>{{ feature.text }}</span>
        </div>
      </div>

      <div class="version-info">
        <div class="version">v{{ version }}</div>
        <div class="copyright">© 2024 闪电记团队</div>
      </div>
    </div>

    <div class="loading-bar">
      <div class="loading-progress"></div>
      <div class="loading-dots">
        <div v-for="i in 3" :key="'dot-'+i" class="dot" :style="getDotStyle(i)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_CONFIG } from '../config/app.config'

export default {
  name: 'SplashScreen',
  data() {
    return {
      version: APP_CONFIG.version,
      features: [
        { icon: 'fas fa-bolt', text: '闪电记账' },
        { icon: 'fas fa-chart-pie', text: '智能分析' },
        { icon: 'fas fa-shield-alt', text: '数据安全' }
      ]
    }
  },
  mounted() {
    localStorage.setItem(APP_CONFIG.versionKey, this.version)
    setTimeout(() => {
      this.$emit('loaded')
    }, APP_CONFIG.splashDuration)
  },
  methods: {
    getParticleStyle(index) {
      const size = Math.random() * 8 + 2
      const delay = Math.random() * 2
      const duration = Math.random() * 3 + 2
      const x = Math.random() * 100
      const y = Math.random() * 100
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: `linear-gradient(45deg, 
          ${this.getRandomColor()}, 
          ${this.getRandomColor()})`,
        boxShadow: `0 0 ${size * 2}px currentColor`
      }
    },
    getStarStyle(index) {
      const size = Math.random() * 3 + 1
      const delay = Math.random() * 2
      const duration = Math.random() * 2 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: `0 0 ${size * 2}px #fff`
      }
    },
    getLightningStyle(index) {
      const delay = index * 0.5
      const x = Math.random() * 100
      return {
        left: `${x}%`,
        animationDelay: `${delay}s`
      }
    },
    getRingStyle(index) {
      const size = 120 + index * 30
      const delay = index * 0.2
      return {
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`
      }
    },
    getSparkleStyle(index) {
      const angle = (index * 45) + Math.random() * 10
      const distance = 60 + Math.random() * 20
      const x = Math.cos(angle * Math.PI / 180) * distance
      const y = Math.sin(angle * Math.PI / 180) * distance
      return {
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${index * 0.1}s`
      }
    },
    getDotStyle(index) {
      const delay = index * 0.2
      return {
        animationDelay: `${delay}s`
      }
    },
    getRandomColor() {
      const colors = [
        '#00ff88', '#00ccff', '#ff00ff', 
        '#ffcc00', '#ff3366', '#33ccff',
        '#ff00cc', '#00ffff', '#ffff00'
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: linear-gradient(45deg, #00ff88, #00ccff);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
  filter: blur(1px);
  box-shadow: 0 0 20px currentColor;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(20px, -20px) scale(1.2);
    opacity: 0.3;
  }
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.logo {
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 1.5rem;
}

.logo-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #00ff88;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
}

.logo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
  animation: pulse 2s ease-in-out infinite;
}

.logo-inner::before,
.logo-inner::after {
  content: '';
  position: absolute;
  border: 4px solid transparent;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 204, 255, 0.3);
}

.logo-inner::before {
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-top-color: #00ccff;
  animation: spin 2s linear infinite;
}

.logo-inner::after {
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-top-color: #ff00ff;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
}

.loading-text {
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-align: center;
}

.text-glow {
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5),
               0 0 20px rgba(0, 204, 255, 0.3),
               0 0 30px rgba(255, 0, 255, 0.2);
  animation: textPulse 2s ease-in-out infinite;
}

.version {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

.loading-bar {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.loading-progress {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #00ff88, #00ccff, #ff00ff);
  animation: loading 1s ease-in-out forwards;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.7);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes textPulse {
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 136, 0.5),
                      0 0 20px rgba(0, 204, 255, 0.3),
                      0 0 30px rgba(255, 0, 255, 0.2); }
  50% { text-shadow: 0 0 15px rgba(0, 255, 136, 0.7),
                    0 0 25px rgba(0, 204, 255, 0.5),
                    0 0 35px rgba(255, 0, 255, 0.4); }
}

@keyframes loading {
  0% { width: 0%; }
  100% { width: 100%; }
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

.app-name {
  text-align: center;
  margin-top: 1rem;
}

.app-name .text-glow {
  font-size: 3.5rem;
  font-weight: bold;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.7),
               0 0 40px rgba(0, 204, 255, 0.5),
               0 0 60px rgba(255, 0, 255, 0.3);
}

.slogan {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  letter-spacing: 2px;
  animation: fadeIn 1s ease-out;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  animation: slideUp 1s ease-out;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.feature-item span {
  font-size: 0.9rem;
  opacity: 0.8;
}

.version-info {
  text-align: center;
  margin-top: 1rem;
  animation: fadeIn 1s ease-out;
}

.version {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.3rem;
}

.copyright {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.lightning {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.lightning-bolt {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0.8),
    rgba(0, 255, 255, 0.4),
    transparent);
  transform: rotate(45deg);
  animation: lightning 1s ease-in-out infinite;
  filter: blur(1px);
}

@keyframes lightning {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.logo-sparkles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  animation: sparkle 1s ease-in-out infinite;
  box-shadow: 0 0 10px #fff;
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

.feature-icon {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, 
    rgba(0, 255, 136, 0.3) 0%, 
    transparent 70%);
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}
</style> 