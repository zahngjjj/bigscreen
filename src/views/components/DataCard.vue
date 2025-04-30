<template>
  <div class="data-card cyber-box">
    <!-- 上半部分 -->
    <div class="card-section top">
      <ProductionTrend :cardData="cardData" />
      <ProductionMachine :cardData="cardData" />
      <ProductionStatus :cardData="cardData" />
    </div>

    <!-- 下半部分 -->
    <div class="card-section bottom">
      <ProductionData :cardData="cardData" />
      <DeviceStatus :cardData="cardData" />
    </div>
  </div>
</template>

<script setup>
import ProductionStatus from './ProductionStatus.vue'
import ProductionTrend from './ProductionTrend.vue'
import ProductionData from './ProductionData.vue'
import DeviceStatus from './DeviceStatus.vue'
import ProductionMachine from './ProductionMachine.vue'

// 定义 props
const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.data-card {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba($background-dark, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: $border-radius-md;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 3fr 1fr;
  gap: 8px;

  .card-section {
    margin-bottom: 0;
    height: 100%;
    display: grid;
    gap: 8px;

    &.top {
      display: grid;
      grid-template-columns: 30% 40% 30%;
      gap: 8px;
    }

    &.bottom {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style> 