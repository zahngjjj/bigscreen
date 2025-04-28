<template>
  <div class="section-item">
    <div class="box-header">
      <div class="box-title">生产线状态</div>
    </div>
    <div class="box-content">
      <div class="chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (chartRef.value) {
    // 如果已经存在实例，先销毁
    if (chart) {
      chart.dispose()
    }
    
    // 初始化图表
    chart = echarts.init(chartRef.value, null, {
      renderer: 'canvas',
      useDirtyRect: false
    })

    const option = {
      series: [{
        type: 'pie',
        radius: ['28%', '50%'],
        center: ['32%', '50%'],
        startAngle: 0,
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 120, name: 'B', itemStyle: { color: '#00FFFF' } },
          { value: 30, name: 'A', itemStyle: { color: '#FFA500' } },
        ],
        emphasis: { 
          scale: true,
          scaleSize: 10,
          focus: 'self'
        },
        // 添加动画效果
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
        animationDuration: 1500,
        // 添加更新动画
        animation: true,
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quarticInOut',
        backgroundStyle: {
          color: 'rgba(0,99,255,0.1)',
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.2)'
        }
      }]
    }

    chart.setOption(option)
  }
}

// 处理窗口大小变化
const handleResize = async () => {
  if (chart) {
    await nextTick()
    chart.resize()
  }
}

// 监听容器大小变化
let resizeObserver = null

onMounted(async () => {
  await nextTick()
  initChart()
  
  // 添加ResizeObserver监听容器大小变化
  resizeObserver = new ResizeObserver(async () => {
    await handleResize()
  })
  
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value)
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 清理监听器
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  // 销毁图表实例
  if (chart) {
    chart.dispose()
    chart = null
  }
})
</script>

<style lang="scss" scoped>
.section-item {
  background: rgba($background-dark, 0.2);
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
  height: 100%; // 确保容器占满高度
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;

  .box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid rgba($primary-color, $overlay-light);

    .box-title {
      font-size: $font-size-lg;
      color: #fff;
      position: relative;
      padding-left: $spacing-sm;
      animation: fadeIn 0.8s ease-out 0.3s forwards;
      opacity: 0;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 16px;
        background: $primary-color;
        border-radius: $border-radius-sm;
        animation: scaleIn 0.5s ease-out 0.6s forwards;
        transform-origin: center;
        opacity: 0;
      }
    }
  }

  .box-content {
    height: calc(100% - 40px);
    width: 100%;
    animation: fadeIn 1s ease-out 0.5s forwards;
    opacity: 0;
    
    .chart-container {
      height: 100%;
      width: 100%;
      position: relative;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: translateY(-50%) scaleY(0);
    opacity: 0;
  }
  to {
    transform: translateY(-50%) scaleY(1);
    opacity: 1;
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
</style> 