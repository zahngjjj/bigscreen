<template>
  <div class="section-item" style="background-color: #000912;">
    <BoxHeader title="生产线状态" />
    <div class="box-content" style="background-color: #000912;">
      <div class="content-wrapper">
        <div class="chart-container" ref="chartRef" style="background-color: #000912;"></div>
        <div class="text-info">
          <div class="percentage">
            <CountTo
              :startVal="0"
              :endVal="79.23"
              :duration="2000"
              :decimals="2"
              :suffix="'%'"
            />
          </div>
          <div class="label">生产耗时</div>
          <div class="value">
            <CountTo
              :startVal="0"
              :endVal="412"
              :duration="2000"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import BoxHeader from '@/components/BoxHeader.vue'
import { CountTo } from 'vue3-count-to'  // 修改导入方式

const chartRef = ref(null)
let chart = null

// 颜色列表
const colorList = [  //  label 标注的字体颜色
  "rgba(0, 255, 255, 1)",  // 青色
  "rgba(255, 128, 0, 1)",  // 橙色
]

// 图表数据
const echartData = [
  {
    value: 48,
    name: "未上报行程单",
  },
  {
    value: 32,
    name: "途径购物店",
  },
]

// 处理数据格式
const seriesData = echartData.map((item, index) => {
  return {
    ...item,
    actValue: item.value,
    label: {
      show: true,
      position: "outside",
      borderRadius: 5,
      padding: [0, 5, 3, -3],
      color: colorList[index],
      textStyle: {
        fontSize: 14,
      },
      formatter: "{b}\n\n{c}\n\n{d}%",
    },
  }
})

// 生成扇形的曲面参数方程
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2
  
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }
  k = typeof k !== 'undefined' ? k : 1 / 3
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  const hoverRate = isHovered ? 1.05 : 1

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u)
      }
      return Math.sin(v) > 0 ? 60 : -1
    },
  }
}

// 生成3D饼图配置
const getPie3D = (pieData, internalDiameterRatio) => {
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const legendData = []
  const k = typeof internalDiameterRatio !== 'undefined'
    ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
    : 1 / 3

  // 处理数据
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value
    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    }
    if (typeof pieData[i].itemStyle !== 'undefined') {
      const { itemStyle } = pieData[i]
      typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
      typeof pieData[i].itemStyle.opacity !== 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null
      seriesItem.itemStyle = itemStyle
    }
    series.push(seriesItem)
  }

  // 计算每个扇形的起始角度和结束角度
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      true,
      false,
      k,
      10
    )
    startValue = endValue
    legendData.push(series[i].name)
  }

  // 添加2D饼图层
  series.push({
    name: 'pie2d',
    type: 'pie',
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    startAngle: -30,
    clockwise: false,
    radius: ['40%', '60%'],
    center: ['50%', '50%'],
    data: pieData,
    itemStyle: {
      opacity: 0,
    },
  })

  // 添加底部透明圆环
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 1,
      color: '#000912',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 3.75
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 3.75
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -5 : -7
      },
    },
  })

  return {
    backgroundColor: '#000912',
    title: {
      show: false,
    },
    color: [
      'rgba(130, 184, 105,1)',
      'rgba(226, 155, 61,1)',
    ],
    tooltip: {
      show: false
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      left: '-1%',  // 向左偏移
      top: '0%',
      boxHeight: 1,
      viewControl: {
        alpha: 35,  // 调整上下倾斜角度（0-90度）
        beta: 30,   // 调整左右旋转角度（0-360度）
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
        distance: 300,
      },
    },
    series,
  }
}

const initChart = async () => {
  if (chartRef.value) {
    try {
      if (chart) {
        chart.dispose()
      }

      // 在初始化前设置容器背景色
      chartRef.value.style.backgroundColor = '#000912'
      
      await nextTick()
      
      // 初始化时就设置背景色
      chart = echarts.init(chartRef.value, null, {
        renderer: 'canvas',
        backgroundColor: '#000912'
      })
      
      await nextTick()
      
      const option = getPie3D(seriesData, 0)
      chart.setOption(option)
      
      // 确保图表完全渲染后再处理动画
      await nextTick()
      chart.setOption({
        backgroundColor: '#000912'
      })
    } catch (error) {
      console.error('Chart initialization error:', error)
    }
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
  // 立即设置背景色
  if (chartRef.value) {
    chartRef.value.style.backgroundColor = '#000912'
  }
  
  await nextTick()
  
  // 延迟初始化图表
  setTimeout(async () => {
    await initChart()
    
    // 添加ResizeObserver监听容器大小变化
    resizeObserver = new ResizeObserver(async () => {
      await handleResize()
    })
    
    if (chartRef.value) {
      resizeObserver.observe(chartRef.value)
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
  }, 200)  // 增加延时确保DOM完全准备好
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
  background: #000912;
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
  height: 100%;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  position: relative;
  
  .box-content {
    position: relative;
    z-index: 2;
    height: calc(100% - 40px);
    width: 100%;
    padding: 0 4px;
    animation: fadeIn 1s ease-out 0.5s forwards;
    opacity: 0;
    background: #000912;
    
    .content-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;

      .chart-container {
        flex: 1;
        height: 100%;
        position: relative;
        background: #000912;
        transition: background-color 0.3s ease;
      }

      .text-info {
        width: 80px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-left: 2px;

        .percentage {
          font-size: 20px;
          color: #00ffff;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
          position: relative;
          padding-bottom: 8px;  // 为分隔线留出空间

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg,
              rgba(0, 255, 255, 0.1) 0%,
              rgba(0, 255, 255, 0.3) 50%,
              rgba(0, 255, 255, 0.1) 100%
            );
          }
        }

        .label {
          font-size: 14px;
          color: #ffffff;
          opacity: 0.8;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .value {
          font-size: 18px;
          color: #00ffff;
          font-weight: bold;
        }
      }
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