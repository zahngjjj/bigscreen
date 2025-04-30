<template>
  <div class="section-item">
    <BoxHeader title="机组信息" />
    <div class="box-content">
      <div class="info-grid">
        <div class="info-row" v-for="(row, index) in 4" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="info-column" :class="{ 'full-width': index === 1 || index === 3 }">
            <div class="info-cell label">{{ labels[index][0] }}</div>
            <div class="info-cell content">{{ contents[index][0] }}</div>
          </div>
          <div class="info-column" v-if="index !== 1 && index !== 3">
            <div class="info-cell label">{{ labels[index][1] }}</div>
            <div class="info-cell content">{{ contents[index][1] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BoxHeader from '@/components/BoxHeader.vue'

const labels = [
  ['日期', '机组'],
  ['机组人员'],
  ['工作单号', '班次'],
  ['产品名称']
]

const contents = [
  ['2024-03-14', 'A组'],
  ['张三、李四、王五'],
  ['WO-20240314-001', '早班'],
  ['产品A']
]
</script>

<style lang="scss" scoped>
.section-item {
  background: rgba($background-dark, 0.2);
  border-radius: $border-radius-sm;
  padding: $spacing-sm;
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

            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                rgba(255, 255, 255, 0) 100%
              );
              animation: shine 4s ease-in-out infinite;
            }

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
              background: linear-gradient(180deg, rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.1));
              border: 1px solid rgba(0, 0, 255, 0.3);
              color: #86c9f2;
              position: relative;
              transition: all 0.5s ease;

              &:hover {
                background: linear-gradient(180deg, rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.2));
                border-color: rgba(0, 183, 238, 0.5);
                box-shadow: 0 0 10px rgba(0, 183, 238, 0.2);
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
                  rgba(0, 183, 238, 0.1) 0%,
                  rgba(0, 183, 238, 0) 70%
                );
                opacity: 0;
                transition: opacity 0.5s ease;
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
</style> 