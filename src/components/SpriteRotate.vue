<template>
  <div class="container flex-row j_c">
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '苏苏_icon'
  }
});
</script>

<style scoped>
.container {
  width: 140px;
  height: calc(4620px / 35 / 2);
  background: url("@/assets/images/guang.png") no-repeat 0 0;
  background-size: 140px 2310px;
  position: relative;
  font-size: 15px;
  /* 添加动画 */
  animation: rotate 1s infinite steps(35, end);
    /* 添加矩形裁剪 */
  clip-path: inset(0 0 0 0); /* 或者使用具体的像素值 */
}
@keyframes rotate {
  0% {
    background-position-y: 0px;
  }
  100% {
    background-position-y: -2310px;
  }
}
.container::after {
  content: "";
  position: absolute;
  width: 156px;
  height: 91.5px;
  background: url("@/assets/images/light.png") no-repeat;
  background-size: 100% 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container span {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #3f567c,
    0 0 35px #3f567c, 0 0 40px #3f567c, 0 0 50px #3f567c, 0 0 75px #3f567c;
}
</style>