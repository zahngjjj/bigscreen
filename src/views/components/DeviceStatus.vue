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
  productionCapacity: [],
  deviceCapacity: []
})

// 获取数据
const initData = async () => {
  try {
    if (!props.cardData.deviceId) return

    const res = await getProductionCapacityInfo({
      deviceIds: props.cardData.deviceId
    })

    if (res.data && res.data[0] && res.data[0].productionInfo) {
      // 处理数据
      const productionDate = []
      const dailyOutput = [] // 当日总产量
      const productionCapacity = [] // 当日产能
      const  deviceCapacity = [] // 额定产能

      res.data[0].productionInfo.forEach(item => {
        // 处理日期格式，只保留月-日
        const date = item.productionDate ? item.productionDate.split('-').slice(1).join('-') : '-'
        productionDate.push(date)
        dailyOutput.push(item.dailyOutput || 0)
        productionCapacity.push(item.productionCapacity || 0)
        deviceCapacity.push(res.data.deviceCapacity || 0)
      })

      chartData.value = {
        xAxis: productionDate,
        dailyOutput: dailyOutput,
        productionCapacity: productionCapacity,
        deviceCapacity:deviceCapacity
      }

      console.log(chartData.value,'chartData.value')

      // // 测试数据
      // chartData.value = {
      //   xAxis: ['05-01', '05-02', '05-03', '05-04', '05-05', '05-06'],
      //   dailyOutput: [0, 120, 60, 80, 0, 200],
      //   productionCapacity: [0, 100, 80, 120, 0, 180],
      //   deviceCapacity: [200, 200, 200, 200, 200, 200]
      // }

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

  const maxY = Math.max(
    ...chartData.value.dailyOutput,
    ...chartData.value.productionCapacity,
    ...chartData.value.deviceCapacity,
    0
  );

  // 让maxY向上取整到10的倍数
  let safeMax = Math.ceil(maxY / 10) * 10;
  // 让interval为maxY的1/5，且为整数
  let safeInterval = Math.max(1, Math.ceil(safeMax / 5));

  // 保证interval为整数
  safeInterval = Math.ceil(safeInterval);

  // 如果safeInterval太小，可以设置最小为1或5
  if (safeInterval < 1) safeInterval = 1;

  const option = {
    backgroundColor: 'transparent',
    legend: {
      show: true,
      top: 10,
      left: 'center',
      icon: 'roundRect',
      itemWidth: 18,
      itemHeight: 10,
      itemGap: 12,
      textStyle: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 60, // 给 legend 留空间
      left: '5%',
      right: '5%',
      bottom: '10%',
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
        fontSize: 12,
        rotate: 30 // 旋转30度，防止重叠
      }
    },
    series: [
      {
        name: '总产量',
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
        tooltip: { show: false },
        itemStyle: {
          borderRadius: 5,
          color: 'rgba(230, 247, 255, 0.3)'
        },
        z: -12,
        data: chartData.value.dailyOutput.map(() => Math.max(...chartData.value.dailyOutput, 0)),
        legendHoverLink: false,
      },
      {
        name: '产能',
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
        name: '额定产能',
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
        min: 0,
        max: safeMax,
        interval: safeInterval,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.08)',
            width: 1,
            type: 'solid'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          formatter: '{value}',
          show: true
        }
      },
      {
        type: 'value',
        splitLine: { show: false },
        axisLabel: { show: false }
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
  // 设置定时刷新，12小时刷新一次
  timer = setInterval(initData, 43200000)
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
      opacity: 0;
      min-height: 220px;
      animation: fadeIn 0.5s ease-out forwards;

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
      opacity: 0;
      animation: fadeIn 0.5s ease-out forwards;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 