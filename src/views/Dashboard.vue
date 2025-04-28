<template>
  <div class="dashboard-container">


    <!-- 顶部标题 -->
    <div class="header">
      <div class="placeholder"></div>
      <h1 class="title">生产实时监控平台</h1>
      <div class="time-container">
        <div class="time">{{ currentTime }}</div>
        <div class="date">{{ currentDate }}</div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <DataCard v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DataCard from '@/components/DataCard.vue'

// 当前时间和日期
const currentTime = ref(new Date().toLocaleTimeString())
const currentDate = ref(new Date().toLocaleDateString())
const timer = setInterval(() => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  currentDate.value = now.toLocaleDateString()
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/styles/_variables" as *;

.dashboard-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('../assets/images/big_bg1.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba($background-dark, 0.9);
  color: $text-primary;

  .header {
    height: 60px;
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    align-items: center;
    padding: 0;
    background-image: url('../assets/images/title2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-bottom: 1px solid rgba($primary-light, 0.2);
    
    .title {
      text-align: center;
      font-size: $font-size-xl;
      font-weight: bold;
      color: $text-primary;
      text-shadow: 0 0 20px rgba($primary-light, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0;
      padding-left: 120px;
    }
    
    .time-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      width: 200px;
      
      .time {
        font-size: $font-size-lg;
        color: $primary-light;
        font-family: 'Digital-7', monospace;
        text-shadow: 0 0 10px rgba($primary-light, $overlay-heavy);
        line-height: 1.2;
        width: 100%;
      }
      
      .date {
        font-size: $font-size-md;
        color: $text-secondary;
        margin-top: 2px;
        line-height: 1.2;
        width: 100%;
      }
    }
  }
 .main-content {
    height: calc(100% - 60px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: $spacing-md;
    padding: $spacing-md;
  }
}

// 动画
@keyframes scan {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(40px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($primary-color, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba($primary-color, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($primary-color, 0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: $overlay-solid;
    transform: translateY(-100px) scale(1.2);
  }
  100% {
    transform: translateY(-200px) scale(1);
    opacity: 0;
  }
}

@keyframes borderGlow {
  0% {
    opacity: $overlay-heavy;
  }
  50% {
    opacity: $overlay-solid;
  }
  100% {
    opacity: $overlay-heavy;
  }
}

@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style> 