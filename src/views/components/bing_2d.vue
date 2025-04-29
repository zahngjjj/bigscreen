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
    chart = echarts.init(chartRef.value)

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '3D饼图',
          type: 'pie',
          radius: ['30%', '60%'],
          center: ['50%', '50%'],
          startAngle: 180, // 起始角度
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            color: '#fff',
            fontSize: 14
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 30,
            lineStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#0b1c3c'
          },
          data: [
            { value: 35, name: '设备1' },
            { value: 5, name: '设备2' }
          ].map((item, index) => ({
            ...item,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: getColor(index, 0.8) },
                { offset: 1, color: getColor(index, 0.5) }
              ])
            }
          })),
          // 3D效果增强
          emphasis: {
            scale: true,
            scaleSize: 12,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          zlevel: 1
        },
        // 底部阴影
        {
          name: '阴影',
          type: 'pie',
          radius: ['30%', '60%'],
          center: ['50%', '50%'],
          startAngle: 180,
          label: { show: false },
          labelLine: { show: false },
          silent: true,
          data: [
            { value: 35, name: '设备1' },
            { value: 5, name: '设备2' }
          ].map(item => ({
            value: item.value,
            itemStyle: {
              color: 'rgba(0, 0, 0, 0.3)',
              borderWidth: 0
            }
          })),
          zlevel: 0,
          animation: false
        }
      ],
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationThreshold: 2000,
      animationDelay: function (idx) {
        return idx * 100;
      }
    }

    // 生成渐变色
    function getColor(index, alpha = 1) {
      const colors = [
        `rgba(73, 227, 255, ${alpha})`,
        `rgba(255, 198, 44, ${alpha})`,
        `rgba(255, 82, 132, ${alpha})`,
        `rgba(99, 255, 147, ${alpha})`,
        `rgba(255, 142, 44, ${alpha})`
      ]
      return colors[index % colors.length]
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
  position: relative;
  
  // 添加边框背景
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: -20px;  // 向上延伸一点
  //   left: 0px; // 向左延伸一点
  //   width: calc(100% - 10px);  // 宽度增加
  //   height: calc(100% + 45px); // 高度增加
  //   background: url('@/assets/images/kuang_right_top_2.png') no-repeat center center;
  //   background-size: contain;  // 改用contain确保完整显示
  //   pointer-events: none;
  //   z-index: 1;
  // }

  .box-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    padding: 0 10px $spacing-sm 10px;  // 增加左右内边距
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
    position: relative;
    z-index: 2;
    height: calc(100% - 40px);
    width: 100%;
    padding: 0 10px;  // 增加左右内边距
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