<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup>

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

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

// 添加数字字体
@font-face {
  font-family: 'Digital-7';
  src: url('https://cdn.jsdelivr.net/npm/digital-7-font@1.0.0/Digital-7.ttf') format('truetype');
}
</style> 