<template>
  <div class="dashboard-container">


    <!-- 顶部标题 -->
    <div class="header">
      <div class="placeholder"></div>
      <h1 class="title">生产实时监控平台</h1>
      <div class="time-container">
        <div class="time">{{ currentTime }}</div>
        <div class="date">{{ currentDate }}</div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 模块1: 生产线状态 -->
      <div class="module cyber-box">
        <div class="box-header">
          <div class="box-title">生产线状态</div>
          <div class="status-indicator active"></div>
        </div>
        <div class="box-content">
          <div class="chart-container" :ref="el => { if (el) chartRefs['chart1'] = el }"></div>
        </div>
      </div>

      <!-- 模块2: 生产趋势 -->
      <div class="module cyber-box">
        <div class="box-header">
          <div class="box-title">生产趋势</div>
          <div class="chart-controls">
            <span class="control active">日</span>
            <span class="control">周</span>
            <span class="control">月</span>
          </div>
        </div>
        <div class="box-content">
          <div class="chart-container" :ref="el => { if (el) chartRefs['chart2'] = el }"></div>
        </div>
      </div>

      <!-- 模块3: 设备运行情况 -->
      <div class="module cyber-box">
        <div class="box-header">
          <div class="box-title">设备运行情况</div>
          <div class="refresh-indicator">
            <div class="refresh-circle"></div>
            <span>实时刷新中</span>
          </div>
        </div>
        <div class="box-content">
          <div class="chart-container" :ref="el => { if (el) chartRefs['chart3'] = el }"></div>
        </div>
      </div>

      <!-- 模块4: 生产数据表格 -->
      <div class="module cyber-box">
        <div class="box-header">
          <div class="box-title">实时生产数据</div>
          <div class="refresh-indicator">
            <div class="refresh-circle"></div>
            <span>实时刷新中</span>
          </div>
        </div>
        <div class="box-content">
          <div class="scroll-board">
            <table>
              <thead>
                <tr>
                  <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index" :class="{ warning: row[3] === '警告' }">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { CountUp } from 'countup.js'

// 当前时间和日期
const currentTime = ref(new Date().toLocaleTimeString())
const currentDate = ref(new Date().toLocaleDateString())
const timer = setInterval(() => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  currentDate.value = now.toLocaleDateString()
}, 1000)

// 图表引用
const chartRefs = reactive({
  chart1: null,
  chart2: null,
  chart3: null
})

// 表格数据
const tableHeaders = ['时间', '产线', '产量', '状态']
const tableData = ref([
  ['10:22:33', 'MQ05', '2345', '正常'],
  ['10:22:34', 'MQ06', '2346', '正常'],
  ['10:22:35', 'MQ07', '2347', '警告'],
  ['10:22:36', 'MQ08', '2348', '正常'],
  ['10:22:37', 'MQ09', '2349', '正常']
])

// 初始化图表
const initCharts = () => {
  // 生产线状态图表 - 饼图
  if (chartRefs.chart1) {
    const chart1 = echarts.init(chartRefs.chart1)
    const option1 = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#000f1d',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '生产中', itemStyle: { color: '#00B7EE' } },
            { value: 735, name: '停机', itemStyle: { color: '#FF5722' } },
            { value: 580, name: '待机', itemStyle: { color: '#FFEB3B' } },
            { value: 484, name: '维修', itemStyle: { color: '#4CAF50' } }
          ]
        }
      ]
    }
    chart1.setOption(option1)
    window.addEventListener('resize', () => chart1.resize())
  }

  // 生产趋势图表 - 折线图
  if (chartRefs.chart2) {
    const chart2 = echarts.init(chartRefs.chart2)
    const option2 = {
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
    chart2.setOption(option2)
    window.addEventListener('resize', () => chart2.resize())
  }

  // 设备运行情况 - 条形图
  if (chartRefs.chart3) {
    const chart3 = echarts.init(chartRefs.chart3)
    const option3 = {
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
    chart3.setOption(option3)
    window.addEventListener('resize', () => chart3.resize())
  }
}

// 自动滚动表格数据
const startTableDataUpdate = () => {
  setInterval(() => {
    const newRow = [
      new Date().toLocaleTimeString(),
      'MQ0' + Math.floor(Math.random() * 5 + 5),
      Math.floor(Math.random() * 1000 + 2000).toString(),
      Math.random() > 0.8 ? '警告' : '正常'
    ]
    tableData.value.push(newRow)
    if (tableData.value.length > 5) {
      tableData.value.shift()
    }
  }, 3000)
}

onMounted(() => {
  // 初始化所有图表
  initCharts()
  
  // 启动表格数据更新
  startTableDataUpdate()
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('resize', () => {})
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/styles/_variables" as *;

.dashboard-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  

.header {
  height: 60px;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  align-items: center;
  padding: 0;
  background: url('../assets/images/title2.png') no-repeat;
  background-size: 100% 100%;
  .title {
    text-align: center;
    font-size: $font-size-xl;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-left: 120px;
  }
  
  .time-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 200px;
    
    .time {
      font-size: $font-size-lg;
      color: $primary-color;
      font-family: 'Digital-7', monospace;
      text-shadow: 0 0 10px rgba($primary-color, $overlay-heavy);
      line-height: 1.2;
      width: 100%;
    }
    
    .date {
      font-size: $font-size-md;
      color: $primary-color;
      margin-top: 2px;
      line-height: 1.2;
      width: 100%;
    }
  }
}
 .main-content {
    height: calc(100% - 60px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: $spacing-md;
    padding: $spacing-md;

    .module {
      width: 100%;
      height: 100%;
      position: relative;
      background: rgba($background-dark, 0.3);
      backdrop-filter: blur(10px);
      padding: $spacing-md;
      border-radius: $border-radius-md;
      overflow: hidden;

      &:nth-child(1) {
        background: rgba($primary-color, 0.1);
      }

      &:nth-child(2) {
        background: rgba($success-color, 0.1);
      }

      &:nth-child(3) {
        background: rgba($waiting-color, 0.1);
      }

      &:nth-child(4) {
        background: rgba($warning-color, 0.1);
      }
      
      .box-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $spacing-md;
        padding-bottom: $spacing-sm;
        border-bottom: 1px solid rgba($primary-color, $overlay-light);

        .box-title {
          font-size: $font-size-xl;
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

        .status-indicator {
          width: $spacing-sm;
          height: $spacing-sm;
          border-radius: 50%;
          background: $text-secondary;
          position: relative;

          &.active {
            background: $primary-color;
            box-shadow: 0 0 10px rgba($primary-color, $overlay-heavy);
            animation: pulse 2s infinite;
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
        height: 100%;
        
        .chart-container {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .scroll-board {
    height: 100%;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: $spacing-sm;
        text-align: center;
        font-size: $font-size-md;
        color: $text-primary;
      }

      tr {
        transition: all $transition-normal;

        &:nth-child(even) {
          background: rgba($primary-color, 0.1);
        }

        &.warning {
          background: rgba($warning-color, 0.1);
          
          td {
            color: $warning-color;
          }
        }

        &:hover {
          background: rgba($primary-color, 0.2);
        }
      }
    }
  }
}

// 动画
@keyframes scan {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(40px);
  }
  100% {
    transform: translateY(0);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: $overlay-solid;
    transform: translateY(-100px) scale(1.2);
  }
  100% {
    transform: translateY(-200px) scale(1);
    opacity: 0;
  }
}

@keyframes borderGlow {
  0% {
    opacity: $overlay-heavy;
  }
  50% {
    opacity: $overlay-solid;
  }
  100% {
    opacity: $overlay-heavy;
  }
}

@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style> 