<template>
  <div class="dashboard-container">


    <!-- 顶部标题 -->
    <div class="header">
      <div class="logo-container">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo">
      </div>
      <h1 class="title">生产实时监控平台</h1>
      <div class="time-container">
        <div class="time">
          <span style="margin-right: 10px;">{{ currentDate }}</span>
          <span>{{ currentTime }}</span>
          </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <div class="vertical-line"></div>
      <div class="horizontal-line"></div>
      <DataCard v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DataCard from '@/views/components/DataCard.vue'

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
  background-image: url('@/assets/images/big_bg1.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba($background-dark, 0.9);
  color: $text-primary;

  .header {
    height: 54px;
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    align-items: center;
    padding: 0;
    background-image: url('@/assets/images/title3.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    border-bottom: 1px solid rgba($primary-light, 0.2);
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 20px 0 0px;
      perspective: 1000px;

      
      .logo {
        height: 40px;
        width: auto;
        object-fit: contain;
        animation: logoFadeIn 1.5s ease-out, logoRepeat 11s 1.5s infinite;
        opacity: 0;
        transform: scale(0.8) rotateY(90deg);
        transform-style: preserve-3d;
        backface-visibility: visible;
        position: absolute;
        left: 12px;
        top: 6px;
      }
    }
    
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
      // padding-left: 120px;
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
    height: calc(100% - 54px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
    padding: 6px;
    position: relative;
    
    // 垂直分隔线
    .vertical-line {
      content: '';
      position: absolute;
      left: 50%;
      top: 60px;
      height: calc(100% - 100px);
      width: 1px;
      transform: translateX(-50%);
      background: linear-gradient(to right, rgba(23, 154, 254, 0.3), rgba(23, 154, 254, 0.6), rgba(23, 154, 254, 0.3));
      box-shadow: 0 0 3px rgba(23, 154, 254, 0.5);
      overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 25%;
        background: linear-gradient(to bottom,
          rgba(23, 154, 254, 0) 0%,
          rgba(23, 154, 254, 1) 35%,
          rgba(23, 154, 254, 1) 65%,
          rgba(23, 154, 254, 0) 100%
        );
        box-shadow: 0 0 12px rgba(23, 154, 254, 1);
        left: 0;
        animation: moveVerticalDown 15s linear infinite;
      }
    }

    // 水平分隔线
    .horizontal-line {
      content: '';
      position: absolute;
      top: 50%;
      left: 12px;
      width: calc(100% - 24px);
      height: 1px;
      transform: translateY(-50%);
      background: linear-gradient(to right, rgba(23, 154, 254, 0.3), rgba(23, 154, 254, 0.6), rgba(23, 154, 254, 0.3));
      box-shadow: 0 0 3px rgba(23, 154, 254, 0.5);
      
      &::after {
        content: '';
        position: absolute;
        width: 25%;
        height: 100%;
        background: linear-gradient(to right,
          rgba(23, 154, 254, 0) 0%,
          rgba(23, 154, 254, 1) 35%,
          rgba(23, 154, 254, 1) 65%,
          rgba(23, 154, 254, 0) 100%
        );
        box-shadow: 0 0 12px rgba(23, 154, 254, 1);
        top: 0;
        animation: moveHorizontalRight 15s linear infinite;
      }
    }

    :deep(.data-card) {
      border: 1px solid rgba(23, 154, 254, 0.1);
      box-shadow: 0 0 15px rgba(23, 154, 254, 0.1);
      border-radius: 4px;
      transition: all 0.20s ease;
      
      &:hover {
        border-color: rgba(23, 154, 254, 0.3);
        box-shadow: 0 0 20px rgba(23, 154, 254, 0.2);
      }
    }
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

@keyframes moveVerticalDown {
    0% {
        top: -25%;
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    95% {
        opacity: 1;
    }
    100% {
        top: 100%;
        opacity: 0;
    }
}

@keyframes moveHorizontalRight {
    0% {
        left: -25%;
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    95% {
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 0;
    }
}

@keyframes logoFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) rotateY(90deg);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05) rotateY(0deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

@keyframes logoRepeat {
  0%, 90.9% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) rotateY(90deg);
  }
}
</style> 