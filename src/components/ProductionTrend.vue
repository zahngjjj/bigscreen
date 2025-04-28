<template>
  <div class="section-item">
    <div class="box-header">
      <div class="box-title">机组信息</div>
    </div>
    <div class="box-content">
      <div class="info-grid">
        <div class="info-row">
          <div class="info-column">
            <div class="info-cell label">日期</div>
            <div class="info-cell content">2024-03-14</div>
          </div>
          <div class="info-column">
            <div class="info-cell label">机组</div>
            <div class="info-cell content">A组</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-column full-width">
            <div class="info-cell label">机组人员</div>
            <div class="info-cell content">张三、李四、王五</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-column">
            <div class="info-cell label">工作单号</div>
            <div class="info-cell content">WO-20240314-001</div>
          </div>
          <div class="info-column">
            <div class="info-cell label">班次</div>
            <div class="info-cell content">早班</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-column full-width">
            <div class="info-cell label">产品名称</div>
            <div class="info-cell content">产品A</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    padding-bottom: 8px;
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

        .info-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;

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

            &.label {
              background: transparent;
              border: none;
              padding: 1px;
              min-height: 14px;
              font-size: 12px;
              color: #7bcff8;
            }

            &.content {
              flex: 1;
              background: linear-gradient(180deg, rgba(0, 0, 255, 0.2), rgba(0, 0, 255, 0.1));
              border: 1px solid rgba(0, 0, 255, 0.3);
              color: #86c9f2;
            }
          }
        }
      }
    }
  }
}
</style> 