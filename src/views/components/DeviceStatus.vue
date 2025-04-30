<template>
  <div class="section-item">
    <BoxHeader title="设备运行情况" />
    <div class="box-content">
      <div class="chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import BoxHeader from '@/components/BoxHeader.vue'

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '35%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['设备1', '设备2', '设备3', '设备4', '设备5'],
        axisLine: {
          lineStyle: {
            color: '#0B3E5E'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 12
        }
      },
      series: [
        {
          name: '运行时间',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            color: '#fff',
            position: 'top',
            distance: 10,
            fontSize: 12,
            formatter: '{c}'
          },
          emphasis: {
            focus: 'series'
          },
          data: [390, 334, 301, 302, 320],
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: '#072876' },
              { offset: 1, color: '#00D8FF' }
            ])
          },
          barWidth: '20%'
        },
        {
          name: "背景",
          type: "bar",
          barGap: "-100%",
         barWidth: '20%',
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(230, 247, 255 ,.3)" },
              { offset: 1, color: "rgba(230, 247, 255 ,.3)" },
            ]),
          },
          z: -12,
          data: [400, 400, 400, 400, 400],
        },
        // {
        //   name: '运行效率',
        //   type: 'line',
        //   smooth: true,
        //   symbol: 'circle',
        //   symbolSize: 8,
        //   data: [85, 92, 78, 88, 95],
        //   itemStyle: {
        //     color: '#1890FF'
        //   },
        //   lineStyle: {
        //     width: 3,
        //     color: '#1890FF',
        //     shadowColor: 'rgba(24,144,255,0.3)',
        //     shadowBlur: 10
        //   },
        //   yAxisIndex: 1
        // },
        {
          name: '运行效率',
          type: "line",
          smooth: true,
          showAllSymbol: true,
          symbol: "emptyCircle",
          symbolSize: 8,
          yAxisIndex: 1,
          itemStyle: {
            color: '#1890FF',
          },
          data: [85, 92, 78, 88, 95],
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '运行时间',
          min: 0,
          max: 400,
          interval: 100,
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(11, 62, 94, 0.3)',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        },
        {
          type: 'value',
          name: '效率(%)',
          nameLocation: 'end',
          nameGap: 15,
          nameTextStyle: {
            color: '#fff',
            fontSize: 12,
            padding: [0, 0, 0, 0]
          },
          min: 0,
          max: 100,
          interval: 20,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12,
            formatter: '{value}%'
          }
        }
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationThreshold: 2000,
      animationDelay: function (idx) {
        return idx * 100;
      }
    }
    chart.setOption(option)
    window.addEventListener('resize', handleResize)
  }
}

const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style lang="scss" scoped>
.section-item {
  background: rgba($background-dark, 0.2);
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
  position: relative;
  height: 100%;

  .box-content {
    position: relative;
    z-index: 2;
    height: calc(100% - 40px);
    
    .chart-container {
      width: 100%;
      height: 100%;
    }
  }
}

// 动画
@keyframes headerShow {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style> 