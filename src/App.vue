<template>
  <div id="app">
    <div v-if="globalError" class="global-error">
      {{ globalError }}
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const globalError = ref('')
provide('globalError', globalError)
</script>

<style lang="scss">
@use "sass:math";
@use "@/assets/styles/_variables" as *;

.app-container {
  width: 100vw;
  height: 100vh;
  background: $background-dark;
  color: $text-primary;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app, .app-container {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: $background-dark;
  color: $text-primary;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

// 添加数字字体
@font-face {
  font-family: 'Digital-7';
  src: url('https://cdn.jsdelivr.net/npm/digital-7-font@1.0.0/Digital-7.ttf') format('truetype');
}

.global-error {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,0,0,0.85);
  color: #fff;
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 20px;
  z-index: 99999;
}
</style> 