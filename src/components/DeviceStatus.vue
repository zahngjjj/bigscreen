<template>
  <div class="section-item">
    <div class="box-header">
      <div class="box-title">设备运行情况</div>
      <div class="refresh-indicator">
        <div class="refresh-circle"></div>
        <span>实时刷新中</span>
      </div>
    </div>
    <div class="box-content">
      <div class="chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

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
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
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
      yAxis: {
        type: 'category',
        data: ['设备5', '设备4', '设备3', '设备2', '设备1'],
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
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#00B7EE' },
              { offset: 1, color: '#00D8FF' }
            ])
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
      }
    }

    .refresh-indicator {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      color: $text-secondary;
      font-size: $font-size-md;

      .refresh-circle {
        width: $spacing-md;
        height: $spacing-md;
        border: 2px solid $text-secondary;
        border-top-color: $primary-color;
        border-radius: 50%;
        animation: spin 1s infinite linear;
      }
    }
  }

  .box-content {
    height: calc(100% - 40px);
    
    .chart-container {
      height: 100%;
      width: 100%;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 