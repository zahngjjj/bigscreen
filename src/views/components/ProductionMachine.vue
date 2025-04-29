<template>
    <div class="Machine-content">
        <div class="Machine">
            <div class="text-content">东方闪电</div>
        </div>
        <!-- 左侧三个 -->
        <div class="left-sprites">
            <SpriteRotate class="sprite-item top" text="左上" number="1"/>
            <SpriteRotate class="sprite-item middle" text="左中" number="2"/>
            <SpriteRotate class="sprite-item bottom" text="左下" number="3"/>
        </div>
        <!-- 右侧三个 -->
        <div class="right-sprites">
            <SpriteRotate class="sprite-item top" text="右上" number="4"    />
            <SpriteRotate class="sprite-item middle" text="右中" number="5"/>
            <SpriteRotate class="sprite-item bottom" text="右下" number="6"/>
        </div>
    </div>
</template>

<script setup>
import SpriteRotate from '@/components/SpriteRotate.vue'
import { ref, onMounted } from 'vue'

onMounted(() => {})
</script>

<style lang="scss" scoped>
.Machine-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    .Machine {
        width: 57.6%;
        height: 0;
        padding-bottom: 32.4%;
        position: relative;
        background: url('@/assets/images/quan.png') no-repeat center center;
        background-size: contain;
        max-width: 460.8px;
        margin: 0 auto;
        z-index: 1;

        .text-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
            white-space: nowrap;
            letter-spacing: 2px;
        }
    }

    .left-sprites, .right-sprites {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
    }

    .left-sprites {
        left: 5%;
        .sprite-item {
            &.top {
                transform: translateX(12%);
            }
            &.middle {
                transform: translateX(-12%);
            }
            &.bottom {
                transform: translateX(12%);
            }
        }
    }

    .right-sprites {
        right: 5%;
        .sprite-item {
            &.top {
                transform: translateX(-12%);
            }
            &.middle {
                transform: translateX(12%);
            }
            &.bottom {
                transform: translateX(-12%);
            }
        }
    }

    .sprite-item {
        position: relative;
        transition: all 0.3s ease;
        
        &:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
        }
        
        &.top {
            align-self: flex-start;
        }
        
        &.middle {
            align-self: center;
        }
        
        &.bottom {
            align-self: flex-end;
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.2);
    }
    100% {
        filter: brightness(1);
    }
}
</style> 