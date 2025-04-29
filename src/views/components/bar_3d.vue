<template>
    <div class="section-item">
      <div class="box-header">
        <div class="box-title">设备运行情况</div>
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
  
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - 9, shape.y - 6];
      const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 6];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        ?.lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + 9, xAxisPoint[1] - 6];
      const c4 = [shape.x + 9, shape.y - 6];
      ctx
        .moveTo(c1[0], c1[1])
        ?.lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + 9, shape.y - 6];
      const c3 = [shape.x, shape.y - 12];
      const c4 = [shape.x - 9, shape.y - 6];
      ctx
        .moveTo(c1[0], c1[1])
        ?.lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  
  // 注册三个面图形
  echarts.graphic.registerShape("CubeLeft", CubeLeft);
  echarts.graphic.registerShape("CubeRight", CubeRight);
  echarts.graphic.registerShape("CubeTop", CubeTop);
  
  const initChart = () => {
    if (chartRef.value) {
      chart = echarts.init(chartRef.value)
      const option = {
        backgroundColor: '#040C21',
        legend: {
          icon: "rect",
          itemWidth: 8,
          itemHeight: 8,
          bottom: 0,
          data: [
            {
              name: "转运量（吨）",
              itemStyle: { color: "#1FE8D1" },
            },
            {
              name: "交易额（万元）",
              itemStyle: { color: "#FFD15C" },
            },
          ],
          textStyle: {
            fontSize: "14px",
            color: "rgba(255,255,255,0.8)",
          },
        },
        color: ["#1FE8D1", "#FFD15C"],
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            return `${params[0].name}<br/>${params[0].marker} ${params[0].seriesName} ${params[0].value}<br/>${params[1].marker} ${params[1].seriesName} ${params[1].value}`;
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: 20,
          top: '10%',
          right: 8,
          bottom: '35%',
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["03-03", "03-04", "03-05", "03-06", "03-07"],
            axisPointer: {
              type: "shadow",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#297382",
              },
            },
            axisLabel: {
              show: true,
              color: "#FFFFFF",
              fontFamily: "DINPro-Medium",
              padding: [4, 0, 0, 0],
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "转运量（吨）",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              color: "rgba(255,255,255,0.5)",
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "交易额（万元）",
            max: 100,
            interval: 20,
            axisLabel: {
              color: "rgba(255,255,255,0.5)",
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "转运量（吨）",
            yAxisIndex: 0,
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgba(80, 176, 113, 1)",
                        },
                        {
                          offset: 0.8,
                          color: "rgba(19, 87, 39, 0.20)",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgba(120, 247, 186, 1)",
                        },
                        {
                          offset: 0.8,
                          color: "rgba(120, 247, 186, 0.10)",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "rgba(11, 132, 65, 1)",
                        },
                        {
                          offset: 1,
                          color: "rgba(11, 132, 65, 1)",
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: [90, 33, 40, 55, 55],
          },
          {
            name: "交易额（万元）",
            type: "line",
            yAxisIndex: 1,
            showSymbol: false,
            smooth: true,
            tooltip: {
              valueFormatter: function (value) {
                return value + "%";
              },
            },
            itemStyle: {
              color: "#FFC149",
            },
            data: [70, 53, 70, 85, 55],
          },
          {
            name: "background",
            type: "custom",
            yAxisIndex: 0,
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(83,191,124 ,0.15)",
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(162,232,188 ,0.15)",
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(132,225,170, 0.15)",
                    },
                  },
                ],
              };
            },
            data: [100, 100, 100, 100, 100],
          },
        ],
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
  
    // 添加边框背景
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: -20px;
    //   left: 0px;
    //   width: calc(100% - 10px);
    //   height: calc(100% + 45px);
    //   background: url('@/assets/images/kuang_right_bottom_1.png') no-repeat center center;
    //   background-size: contain;
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
      padding: 0 10px $spacing-sm 10px;
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
    }
  
    .box-content {
      position: relative;
      z-index: 2;
      height: calc(100% - 40px);
      padding: 0 10px;
      .chart-container {
        height: 100%;
        width: 100%;
      }
    }
  }
  </style> 