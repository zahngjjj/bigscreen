<template>
  <div class="section-item">
    <BoxHeader title="实时生产数据" />
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BoxHeader from '@/components/BoxHeader.vue'

const tableHeaders = ['时间', '产线', '产量', '状态']
const tableData = ref([
  ['10:22:33', 'MQ05', '2345', '正常'],
  ['10:22:34', 'MQ06', '2346', '正常'],
  ['10:22:35', 'MQ07', '2347', '警告'],
  ['10:22:36', 'MQ08', '2348', '正常'],
  ['10:22:37', 'MQ09', '2349', '正常']
])

let updateInterval

const startTableDataUpdate = () => {
  updateInterval = setInterval(() => {
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
  startTableDataUpdate()
})

onUnmounted(() => {
  clearInterval(updateInterval)
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

      th {
        padding: $spacing-sm;
        text-align: center;
        font-size: $font-size-md;
        color: $text-primary;
        background-color: #072876;
      }

      td {
        padding: $spacing-sm;
        text-align: center;
        font-size: $font-size-md;
        color: #86c9f2;
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