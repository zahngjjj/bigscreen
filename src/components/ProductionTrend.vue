<template>
  <div class="section-item">
    <div class="box-header">
      <div class="box-title">生产趋势</div>
      <div class="chart-controls">
        <span class="control active">日</span>
        <span class="control">周</span>
        <span class="control">月</span>
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
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
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
      yAxis: {
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
      series: [{
        data: [820, 932, 901, 934, 1290, 1330],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#00B7EE',
          width: 3
        },
        itemStyle: {
          color: '#00B7EE',
          borderColor: '#fff',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0,183,238,0.4)'
          }, {
            offset: 1,
            color: 'rgba(0,183,238,0.1)'
          }])
        }
      }]
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

    .chart-controls {
      display: flex;
      gap: $spacing-sm;

      .control {
        padding: $spacing-xs $spacing-sm;
        border: 1px solid $text-secondary;
        border-radius: $border-radius-md;
        color: $text-secondary;
        cursor: pointer;
        transition: all $transition-normal;

        &.active {
          background: $primary-color;
          border-color: $primary-color;
          color: $text-primary;
        }
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
</style> 