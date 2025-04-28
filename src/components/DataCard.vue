<template>
  <div class="data-card cyber-box">
    <!-- 上半部分 -->
    <div class="card-section top">
      <ProductionTrend />
      <ProductionMachine />
      <ProductionStatus />
    </div>

    <!-- 下半部分 -->
    <div class="card-section bottom">
      <ProductionData />
      <DeviceStatus />
    </div>
  </div>
</template>

<script setup>
import ProductionStatus from './ProductionStatus.vue'
import ProductionTrend from './ProductionTrend.vue'
import ProductionData from './ProductionData.vue'
import DeviceStatus from './DeviceStatus.vue'
import ProductionMachine from './ProductionMachine.vue'
</script>

<style lang="scss" scoped>
.data-card {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba($background-dark, 0.3);
  backdrop-filter: blur(10px);
  padding: $spacing-md;
  border-radius: $border-radius-md;
  overflow: hidden;
  display: grid;
  grid-template-rows: 3fr 1fr;
  gap: $spacing-md;

  .card-section {
    margin-bottom: 0;
    height: 100%;
    display: grid;
    gap: $spacing-md;

    &.top {
      grid-template-columns: repeat(3, 1fr);
    }

    &.bottom {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style> 