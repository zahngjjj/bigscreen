<template>
  <div class="section-item">
    <BoxHeader title="近十日生产数据" />
    <div class="box-content">
      <div class="chart-container" ref="chartRef">
      </div>
      <div v-if="!chartData.xAxis.length" class="no-data">
          暂无数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import BoxHeader from '@/components/BoxHeader.vue'
import { getProductionCapacityInfo } from '@/api'

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const chartRef = ref(null)
let chart = null

// 图表数据
const chartData = ref({
  xAxis: [],
  dailyOutput: [],
  productionCapacity: []
})

// 获取数据
const initData = async () => {
  try {
    if (!props.cardData.deviceId) return

    const res = await getProductionCapacityInfo({
      deviceIds: props.cardData.deviceId
    })

    if (res.data && res.data.productionInfo) {
      // 处理数据
      const productionDate = []
      const dailyOutput = [] // 当日总产量
      const productionCapacity = [] // 当日产能
      const  deviceCapacity = [] // 额定产能

      console.log(res.data,'dddddddddddddddddd')

      res.data.productionInfo.forEach(item => {
        productionDate.push(item.productionDate || '-')
        dailyOutput.push(item.productionQty || 0)
        productionCapacity.push(item.productionQty || 0)
        deviceCapacity.push(res.data.deviceCapacity || 0)

      })

      chartData.value = {
        xAxis: productionDate,
        dailyOutput: dailyOutput,
        productionCapacity: productionCapacity,
        deviceCapacity:deviceCapacity
      }

      // 更新图表
      updateChart()
    }
  } catch (error) {
    console.error('获取生产数据失败:', error)
    chartData.value = {
      xAxis: [],
      dailyOutput: [],
      productionCapacity: [],
      deviceCapacity:[]
    }
  }
}

// 更新图表
const updateChart = () => {
  if (!chart) return

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
      data: chartData.value.xAxis,
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
        name: props.cardData.deviceNumber + '总产量',
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
        data: chartData.value.dailyOutput,
        itemStyle: {
          borderRadius: 5,
          color: '#00D8FF'
        },
        barWidth: '20%'
      },
      {
        name: '',
        type: "bar",
        barGap: "-100%",
        barWidth: '20%',
        itemStyle: {
          borderRadius: 5,
          color: 'rgba(230, 247, 255, 0.3)'
        },
        z: -12,
        data: chartData.value.dailyOutput.map(() => 400),
      },
      {
        name: props.cardData.deviceNumber + '产能',
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          color: '#1890FF',
        },
        data: chartData.value.productionCapacity,
      },
      {
        name: props.cardData.deviceNumber + '额定产能',
        type: "line",
        smooth: true,
        showAllSymbol: false,
        yAxisIndex: 1,
        itemStyle: {
          color: '#bbab10',
        },
        data: chartData.value.productionCapacity,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '运行时间',
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
}

const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    updateChart()
    window.addEventListener('resize', handleResize)
  }
}

const handleResize = () => {
  chart?.resize()
}

let timer = null

// 监听deviceId变化
watch(() => props.cardData.deviceId, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    initData()
  }
})

onMounted(() => {
  // 先获取初始数据
  initData()
  // 设置定时刷新
  timer = setInterval(initData, 30000)
  // 初始化图表
  initChart()
})

onUnmounted(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
    timer = null
  }
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

    .no-data {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #86c9f2;
      font-size: 14px;
      text-align: center;
      z-index: 99;
      pointer-events: none;
    }
  }
}
</style> 