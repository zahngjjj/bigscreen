<template>
  <div class="section-item">
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 