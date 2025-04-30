<template>
  <div class="box-header">
    <div class="box-title">
      <slot>{{ title }}</slot>
    </div>
    <div class="extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.box-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-sm;
    padding: 4px 12px;
    border: none;
    animation: headerShow 0.8s ease-out forwards;
    transition: all 0.3s ease-out 0.8s;
    background: linear-gradient(90deg, 
      rgba(23, 154, 254, 0.05) 0%,
      rgba(23, 154, 254, 0.15) 50%,
      rgba(23, 154, 254, 0.05) 100%
    );

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg,
        rgba(23, 154, 254, 0) 0%,
        rgba(23, 154, 254, 0.3) 50%,
        rgba(23, 154, 254, 0) 100%
      );
      transition: opacity 0.3s ease-out 0.8s;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 30%;
      height: 2px;
      background: linear-gradient(90deg,
        rgba(23, 154, 254, 0) 0%,
        rgba(23, 154, 254, 1) 50%,
        rgba(23, 154, 254, 0) 100%
      );
      animation: headerLight 3s ease-in-out forwards;
    }

    .box-title {
      font-size: 14px;
      color: #fff;
      position: relative;
      padding-left: $spacing-xs;
      text-shadow: 0 0 10px rgba(23, 154, 254, 0.3);
      letter-spacing: 1px;
      animation: titleShow 0.5s ease-out forwards;
      transition: all 0.3s ease-out 0.8s;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 12px;
        background: rgba(23, 154, 254, 0.6);
        box-shadow: 0 0 8px rgba(23, 154, 254, 0.3);
        border-radius: $border-radius-sm;
        animation: titleBarShow 0.8s ease-out forwards;
        transition: all 0.3s ease-out 0.8s;
      }

      &::after {
        content: '';
        position: absolute;
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 1px;
        background: linear-gradient(90deg,
          rgba(23, 154, 254, 0) 0%,
          rgba(23, 154, 254, 0.8) 50%,
          rgba(23, 154, 254, 0) 100%
        );
        opacity: 0;
        animation: lightLineShow 1.5s ease-out forwards;
        box-shadow: 0 0 4px rgba(23, 154, 254, 0.4);
      }
    }

    .extra {
      display: flex;
      align-items: center;
    }
}

@keyframes headerShow {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes titleShow {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes titleBarShow {
    from {
        height: 0;
        opacity: 0;
    }
    to {
        height: 12px;
        opacity: 0.6;
    }
}

@keyframes lightLineShow {
    0% {
        opacity: 0;
        transform: translate(-8px, -50%) scaleX(0.5);
    }
    50% {
        opacity: 0.8;
        transform: translate(0, -50%) scaleX(1);
    }
    100% {
        opacity: 0.6;
        transform: translate(0, -50%) scaleX(1);
    }
}

@keyframes headerLight {
    0% {
        left: 0;
        width: 0;
    }
    50% {
        left: 0;
        width: 100%;
    }
    100% {
        left: 0;
        width: 30%;
    }
}
</style> 