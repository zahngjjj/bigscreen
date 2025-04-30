<template>
  <div class="section-item">
    <BoxHeader title="机组信息" />
    <div class="box-content">
      <div class="info-grid">
        <div class="info-row" v-for="(row, index) in 4" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="info-column" :class="{ 
            'full-width': index === 1 || index === 3,
            'work-no': index === 2
          }">
            <div class="info-cell label">{{ labels[index][0] }}</div>
            <div class="info-cell content" :title="displayContents[index][0]">{{ displayContents[index][0] }}</div>
          </div>
          <div class="info-column" v-if="index !== 1 && index !== 3" :class="{ 'shift': index === 2 }">
            <div class="info-cell label">{{ labels[index][1] }}</div>
            <div class="info-cell content" :title="displayContents[index][1]">{{ displayContents[index][1] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import BoxHeader from '@/components/BoxHeader.vue'
import { getProductionEmpInfo } from '@/api'

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 存储员工信息
const empInfo = ref({
  empName: '-',
  classTypeName: '-'
})

const labels = [
  ['日期', '机组'],
  ['机组人员'],
  ['工作单号', '班次'],
  ['产品名称']
]

// 使用计算属性动态生成显示内容
const displayContents = computed(() => [
  [new Date().toLocaleDateString(), props.cardData.wcName || '-'],
  [empInfo.value.empName],
  [props.cardData.workNo || '-', empInfo.value.classTypeName],
  [props.cardData.skuName || '-']
])

const initData = async () => {
  try {
    const res = await getProductionEmpInfo({
      deviceIds: props.cardData.deviceId
    })
    if (res.data && res.data.length > 0) {
      // 更新员工信息
      empInfo.value = {
        empName: res.data.map(item => item.empName).join('、') || '-_',
        classTypeName: res.data[0].classTypeName || '-_'
      }
    }
  } catch (error) {
    console.error('获取员工信息失败:', error)
  }
}

// 监听 deviceId 的变化
watch(
  () => props.cardData.deviceId,
  (newDeviceId) => {
    if (newDeviceId) {
      initData()
    }
  }
)

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.section-item {
  background: rgba($background-dark, 0.2);
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
  padding-right: 0!important;
  position: relative;
  overflow: hidden;



  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(0, 183, 238, 0) 0%,
      rgba(0, 183, 238, 0.3) 50%,
      rgba(0, 183, 238, 0) 100%
    );
    animation: borderFlow 4s ease-in-out infinite;
  }

  .box-content {
    height: calc(100% - 32px);
    
    .info-grid {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .info-row {
        display: flex;
        gap: 2px;
        min-height: 40px;
        opacity: 0;
        transform: translateX(-10px);
        animation: slideIn 0.8s ease-out forwards;
        animation-delay: calc(var(--index, 0) * 0.2s);

        .info-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
          position: relative;

          &.full-width {
            flex: 2;
          }

          &.work-no {
            flex: 2.3;
          }

          &.shift {
            flex: 1;
          }

          .info-cell {
            background: linear-gradient(180deg, rgba(0, 183, 238, 0.1), rgba(0, 183, 238, 0.05));
            border: 1px solid rgba(0, 183, 238, 0.2);
            border-radius: 2px;
            padding: 2px;
            color: #86c9f2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            min-height: 16px;
            position: relative;
            overflow: hidden;

            &.label {
              background: transparent;
              border: none;
              padding: 1px;
              min-height: 14px;
              font-size: 12px;
              color: #7bcff8;
              text-shadow: 0 0 8px rgba(123, 207, 248, 0.5);
            }

            &.content {
              flex: 1;
              background: linear-gradient(180deg, 
                rgba(0, 122, 255, 0.15),
                rgba(0, 122, 255, 0.05)
              );
              border: 1px solid rgba(0, 183, 238, 0.4);
              color: #00d8ff;
              font-weight: 500;
              text-shadow: 0 0 10px rgba(0, 183, 238, 0.5);
              letter-spacing: 0.5px;
              padding: 3px 4px;
              font-size: 13px;
              transition: all 0.3s ease;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;

              &:hover {
                background: linear-gradient(180deg,
                  rgba(0, 122, 255, 0.25),
                  rgba(0, 122, 255, 0.15)
                );
                border-color: rgba(0, 183, 238, 0.6);
                box-shadow: 
                  0 0 15px rgba(0, 183, 238, 0.3),
                  inset 0 0 8px rgba(0, 183, 238, 0.2);
                transform: translateY(-1px);
              }

              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: inherit;
                background: radial-gradient(circle at center,
                  rgba(0, 183, 238, 0.15) 0%,
                  rgba(0, 183, 238, 0) 70%
                );
                opacity: 0;
                transition: opacity 0.3s ease;
              }

              &:hover::before {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  15% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes borderFlow {
  0% {
    transform: translateX(-100%);
  }
  40% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.info-row {
  &:nth-child(2),
  &:nth-child(4) {
    .info-column {
      .info-cell.content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style> 