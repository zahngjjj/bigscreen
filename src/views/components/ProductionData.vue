<template>
  <div class="section-item">
    <BoxHeader title="当班生产明细" />
    <div class="box-content">
      <div class="scroll-board">
        <table>
          <thead>
            <tr>
              <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tableData.length === 0">
              <td :colspan="tableHeaders.length" class="no-data">暂无数据</td>
            </tr>
            <tr v-else v-for="(row, index) in tableData" :key="index" :class="{ warning: row[3] === '警告' }">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import BoxHeader from '@/components/BoxHeader.vue'
import { getProductionInfo } from '@/api'

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const tableHeaders = ['产品名称', '采集数量', '采集时间', '版号']
const tableData = ref([])

// 获取数据
const initData = async () => {
  try {
    if (!props.cardData.deviceId) return

    const res = await getProductionInfo({
      deviceIds: props.cardData.deviceId
    })


    if (res.data?.[0]) {
      // 假设接口返回的数据结构为数组，每个元素包含 skuName, collectionQty, collectDate, versionNo
      tableData.value = res.data.map(item => [
        item.skuName || '-',
        item.collectionQty?.toString() || '0',
        item.collectDate || '-',
        item.versionNo || '-'
      ]).slice(0, 5) // 只显示最新的5条数据
    }

  } catch (error) {
    console.error('获取生产明细失败:', error)
    tableData.value = []
  }
}

// 监听deviceId变化
watch(() => props.cardData.deviceId, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    initData()
  }
})

let timer = null

onMounted(() => {
  // 先获取初始数据
  initData()
  // 设置定时刷新
  timer = setInterval(initData, 30000)
})

onUnmounted(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
    timer = null
  }
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
    padding: 0 10px;
  }

  .scroll-board {
    height: 100%;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;

      th, td {
        padding: $spacing-sm;
        text-align: center;
        font-size: $font-size-md;

        // 产品名称列
        &:nth-child(1) {
          width: 130px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        // 其他列自适应
        &:nth-child(n+2) {
          width: auto;
        }
      }

      th {
        color: $text-primary;
        background-color: #072876;
      }

      td {
        color: #86c9f2;
      }

      .no-data {
        color: #86c9f2;
        text-align: center;
        padding: 20px 0;
        font-size: 14px;
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
</style> 