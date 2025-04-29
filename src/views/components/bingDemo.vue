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
  import 'echarts-gl'
  
  const chartRef = ref(null)
  let chart = null
  
  // 颜色列表
  const colorList = ["#FF9900", "#FFCC33"]
  
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
  function getPie3D(pieData, internalDiameterRatio) {
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
        color: '#ffffff',
        opacity: 1,
        fontStyle: 'normal',
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        formatter: (params) => {
          const percentage = ((params.data.value / sumValue) * 100).toFixed(2)
          return `${params.data.name}\n${params.data.value}\n${percentage}%`
        }
      },
      labelLine: {
        length: 60,
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
      backgroundColor: "transparent",
      title: {
        show: false,
      },
      color: [
        'rgba(111,57,244,1)',
        'rgba(217,36,242,1)',
        'rgba(51,210,186,1)',
      ],
      tooltip: {
        formatter: (params) => {
          if (params.seriesName !== 'mouseoutSeries') {
            return `${params.marker}${params.seriesName}：${pieData[params.seriesIndex].value}`
          }
          return ''
        },
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
        top: '-10%',
        boxHeight: 1,
        viewControl: {
          alpha: 30,
          beta: 30,
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
  
  const initChart = () => {
    if (chartRef.value) {
      if (chart) {
        chart.dispose()
      }
      chart = echarts.init(chartRef.value)
      const option = getPie3D(seriesData, 0)
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