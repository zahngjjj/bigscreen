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
            font-size: 19.2px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            white-space: nowrap;
        }
    }

    .left-sprites, .right-sprites {
        position: absolute;
        top: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px 0;
    }

    .left-sprites {
        left: 0;
        .sprite-item {
            &.top, &.bottom {
                margin-left: 12px;
            }
        }
    }

    .right-sprites {
        right: 0;
        .sprite-item {
            &.top, &.bottom {
                margin-right: 12px;
            }
        }
    }

    .sprite-item {
        position: relative;
        
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
</style> 
</style> 