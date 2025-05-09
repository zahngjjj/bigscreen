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
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '30%',
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
          data: [390, 334, 301, 302, 320],
          itemStyle: {
            borderRadius: 5,
            color: '#00D8FF'
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
            color: 'rgba(230, 247, 255, 0.3)'
          },
          z: -12,
          data: [400, 400, 400, 400, 400],
        },
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
      ]
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
      position: relative;
    }
  }
}
</style> 