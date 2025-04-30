<template>
  <div class="container flex-row j_c">
    <span class="number">
      <CountTo
        v-if="isNumber"
        :startVal="0"
        :endVal="Number(number)"
        :duration="2000"
        :autoplay="true"
        :decimals="0"
      />
      <template v-else>{{ number }}</template>
    </span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CountTo } from 'vue3-count-to'

const props = defineProps({
  text: {
    type: String,
    default: '苏苏_icon'
  },
  number: {
    type: [Number, String],
    default: 0
  }
})

// 判断是否为数字类型
const isNumber = computed(() => {
  if (typeof props.number === 'number') return true
  if (typeof props.number === 'string') {
    // 检查字符串是否可以转换为有效数字
    const num = Number(props.number)
    return !isNaN(num) && isFinite(num)
  }
  return false
})
</script>

<style scoped>
.container {
  --text-color: rgba(230, 247, 255, 0.9);
  --glow-color-primary: rgba(63, 86, 124, 0.8);
  --glow-color-secondary: rgba(63, 86, 124, 0.4);
  
  width: 140px;
  height: calc(4620px / 35 / 2);
  background: url("@/assets/images/guang.png") no-repeat 0 0;
  background-size: 140px 2310px;
  position: relative;
  font-size: 14px;
  animation: rotate 1s infinite steps(35, end);
  clip-path: inset(0 0 0 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
  opacity: 0.8;
}

.container span {
  position: relative;
  z-index: 2;
  color: var(--text-color);
  line-height: 1.2;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.4),
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 15px var(--glow-color-secondary),
    0 0 20px var(--glow-color-secondary),
    0 0 25px var(--glow-color-primary);
  letter-spacing: 1px;
}

.container .number {
  font-size: 15px;
  font-weight: 500;
  color: #e6f7ff;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.3),
    0 0 10px rgba(63, 86, 124, 0.5),
    0 0 15px rgba(63, 86, 124, 0.3);
  min-width: 2em;
  text-align: center;
}
</style>