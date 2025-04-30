<template>
    <div class="Machine-content">
        <div class="Machine">
            <div class="center-circle"></div>
            <div class="rotate-circle"></div>
            <div class="text-content">东方闪电</div>
            <div class="scan-line"></div>
        </div>
        <!-- 左侧三个 -->
        <div class="left-sprites">
            <SpriteRotate class="sprite-item top" text="左上" number="1"/>
            <SpriteRotate class="sprite-item middle" text="左中" number="2"/>
            <SpriteRotate class="sprite-item bottom" text="左下" number="3"/>
        </div>
        <!-- 右侧三个 -->
        <div class="right-sprites">
            <SpriteRotate class="sprite-item top" text="右上" number="4"/>
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

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, rgba(0, 149, 211, 0.15) 0%, rgba(0, 149, 211, 0) 70%);
            animation: pulse 3s ease-in-out infinite;
        }

        .center-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 149, 211, 0.3) 0%, rgba(0, 149, 211, 0) 70%);
            animation: breathe 4s ease-in-out infinite;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                height: 80%;
                border-radius: 50%;
                border: 2px solid rgba(0, 149, 211, 0.2);
                animation: rotate 12s linear infinite;
            }
        }

        .rotate-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            border: 2px solid transparent;
            border-top-color: rgba(0, 149, 211, 0.4);
            border-right-color: rgba(0, 149, 211, 0.2);
            border-radius: 50%;
            animation: rotate 8s linear infinite;
            &::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                border: 2px solid transparent;
                border-bottom-color: rgba(0, 149, 211, 0.2);
                border-left-color: rgba(0, 149, 211, 0.1);
                border-radius: 50%;
                animation: rotate 6s linear infinite reverse;
            }
        }

        .text-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 0 15px rgba(0, 149, 211, 0.8);
            white-space: nowrap;
            letter-spacing: 2px;
            z-index: 2;
            animation: glow 2s ease-in-out infinite;
        }

        .scan-line {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom,
                rgba(0, 149, 211, 0) 0%,
                rgba(0, 149, 211, 0.7) 50%,
                rgba(0, 149, 211, 0) 100%
            );
            animation: scan 4s ease-in-out infinite;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: -1px;
                width: 4px;
                height: 100%;
                background: linear-gradient(to bottom,
                    rgba(0, 149, 211, 0) 0%,
                    rgba(0, 149, 211, 0.3) 50%,
                    rgba(0, 149, 211, 0) 100%
                );
                filter: blur(2px);
            }
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
            &.top { transform: translateX(12%); }
            &.middle { transform: translateX(-12%); }
            &.bottom { transform: translateX(12%); }
        }
    }

    .right-sprites {
        right: 5%;
        .sprite-item {
            &.top { transform: translateX(-12%); }
            &.middle { transform: translateX(12%); }
            &.bottom { transform: translateX(-12%); }
        }
    }

    .sprite-item {
        position: relative;
        transition: all 0.3s ease;
        cursor: pointer;
        
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 149, 211, 0.2) 0%, rgba(0, 149, 211, 0) 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        &:hover {
            filter: brightness(1.3);
            &::after {
                opacity: 1;
            }
        }
        
        &.top { align-self: flex-start; }
        &.middle { align-self: center; }
        &.bottom { align-self: flex-end; }
    }
}

@keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes pulse {
    0% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.98);
    }
    50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.02);
    }
    100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.98);
    }
}

@keyframes breathe {
    0% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0.95);
    }
    50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.05);
    }
    100% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0.95);
    }
}

@keyframes scan {
    0% {
        transform: translateX(-50%) rotate(0deg);
        opacity: 0.5;
    }
    50% {
        transform: translateX(-50%) rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: translateX(-50%) rotate(360deg);
        opacity: 0.5;
    }
}

@keyframes glow {
    0% { text-shadow: 0 0 15px rgba(0, 149, 211, 0.6); }
    50% { text-shadow: 0 0 20px rgba(0, 149, 211, 1); }
    100% { text-shadow: 0 0 15px rgba(0, 149, 211, 0.6); }
}
</style> 