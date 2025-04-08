<script setup>
import { ref } from 'vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(true)

const handleSplashLoaded = () => {
  showSplash.value = false
}
</script>

<template>
  <div class="app-container">
    <SplashScreen v-if="showSplash" @loaded="handleSplashLoaded" />
    <template v-else>
      <header class="header">
        <h1>LedgerX</h1>
        <div class="memory-curve">
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
          <div class="memory-curve-bar"></div>
        </div>
      </header>
      
      <div class="views-container">
        <router-view />
      </div>
      
      <nav class="nav-bar">
        <router-link to="/dashboard" class="nav-item" active-class="active">
          <i class="fas fa-chart-pie"></i>
          <span>仪表盘</span>
        </router-link>
        <router-link to="/ledger" class="nav-item" active-class="active">
          <i class="fas fa-list"></i>
          <span>记账</span>
        </router-link>
        <router-link to="/analysis" class="nav-item" active-class="active">
          <i class="fas fa-chart-line"></i>
          <span>分析</span>
        </router-link>
        <router-link to="/categories" class="nav-item" active-class="active">
          <i class="fas fa-tags"></i>
          <span>分类</span>
        </router-link>
        <router-link to="/account" class="nav-item" active-class="active">
          <i class="fas fa-user"></i>
          <span>我的</span>
        </router-link>
      </nav>
    </template>
  </div>
</template>

<style>
/* 基础样式已在全局 CSS 文件中定义 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.nav-bar .nav-item {
  text-decoration: none;
  cursor: pointer;
}
/* 确保激活状态也没有下划线 */
.nav-bar .nav-item.active {
  text-decoration: none;
}
/* 确保固定导航栏不会超出app-container的范围 */
.app-container {
  position: relative;
  /* 隐藏Firefox滚动条 */
  scrollbar-width: none;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
/* 隐藏webkit滚动条 */
.app-container::-webkit-scrollbar {
  width: 0;
  background: transparent;
  display: none;
}
.app-container .nav-bar {
  left: 0;
  right: 0;
  margin: 0;
  width: 100%;
}
/* 确保页面内容足够高，可以滚动 */
.views-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 56px;
  width: 100%;
}
</style>
