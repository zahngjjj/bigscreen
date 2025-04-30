<template>
    <div class="Machine-content">
        <div class="Machine">
            <div class="center-circle"></div>
            <div class="rotate-circle"></div>
            <div class="text-content">{{ props.cardData.deviceNumber }}</div>
            <div class="scan-line"></div>
        </div>
        <!-- 左侧三个 -->
        <div class="left-sprites">
            <SpriteRotate 
                v-for="(item, index) in leftSprites" 
                :key="item.id"
                class="sprite-item"
                :class="item.position"
                :text="item.text"
                :number="data[item.dataKey] || 0"
            />
        </div>
        <!-- 右侧三个 -->
        <div class="right-sprites">
            <SpriteRotate 
                v-for="(item, index) in rightSprites" 
                :key="item.id"
                class="sprite-item"
                :class="item.position"
                :text="item.text"
                :number="data[item.dataKey] || 0"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SpriteRotate from '@/components/SpriteRotate.vue'
import { getCurrentVersionInfo } from '@/api'

const props = defineProps({
    cardData: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const data = ref({})

// 定义左侧精灵配置
const leftSprites = [
    { id: 'left-1', position: 'top', text: '版号', dataKey: 'versionNo' },
    { id: 'left-2', position: 'middle', text: '速度', dataKey: 'currentSpeed' },
    { id: 'left-3', position: 'bottom', text: '当班总产量', dataKey: 'sumQty' }
]

// 定义右侧精灵配置
const rightSprites = [
    { id: 'right-1', position: 'top', text: '当板产量', dataKey: 'collectionQty' },
    { id: 'right-2', position: 'middle', text: '平均速度', dataKey: 'avgSpeed' },
    { id: 'right-3', position: 'bottom', text: '运行时间', dataKey: 'runTime' }
]

// 获取数据
const initData = async () => {
    try {
        if (!props.cardData.deviceId) return

        const res = await getCurrentVersionInfo({
            deviceIds: props.cardData.deviceId
        })

        if (res.data?.[0]) {
            data.value = res.data[0]
        }
    } catch (error) {
        console.error('获取版本信息失败:', error)
        data.value = {}
    }
}

let timer = null

onMounted(() => {
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
.Machine-content {
    --primary-color: rgba(0, 149, 211, 1);
    --primary-color-light: rgba(0, 149, 211, 0.3);
    --primary-color-fade: rgba(0, 149, 211, 0);
    --text-color: rgba(230, 247, 255, 0.9);
    --text-shadow-color: rgba(0, 149, 211, 0.6);
    
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
            background: radial-gradient(circle, var(--primary-color-light) 0%, var(--primary-color-fade) 70%);
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
            background: radial-gradient(circle, var(--primary-color-light) 0%, var(--primary-color-fade) 70%);
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
                border: 2px solid var(--primary-color-light);
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
            border-top-color: var(--primary-color);
            border-right-color: var(--primary-color-light);
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
                border-bottom-color: var(--primary-color-light);
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
            color: var(--text-color);
            font-size: 24px;
            font-weight: 500;
            text-shadow: 
                0 0 10px var(--text-shadow-color),
                0 0 20px rgba(0, 149, 211, 0.4);
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
                var(--primary-color-fade) 0%,
                var(--primary-color) 50%,
                var(--primary-color-fade) 100%
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
                    var(--primary-color-fade) 0%,
                    var(--primary-color-light) 50%,
                    var(--primary-color-fade) 100%
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
        
        span {
            color: var(--text-color);
            text-shadow: 
                0 0 5px rgba(63, 86, 124, 0.6),
                0 0 10px rgba(63, 86, 124, 0.4);
            font-weight: normal;
        }

        .number {
            font-size: 16px;
            font-weight: 500;
        }

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-color-light) 0%, var(--primary-color-fade) 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        &:hover {
            filter: brightness(1.2);
            &::after {
                opacity: 1;
            }
            
            span {
                text-shadow: 
                    0 0 8px rgba(63, 86, 124, 0.7),
                    0 0 15px rgba(63, 86, 124, 0.5);
            }
        }
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
    0% { 
        text-shadow: 
            0 0 10px rgba(0, 149, 211, 0.4),
            0 0 20px rgba(0, 149, 211, 0.2);
    }
    50% { 
        text-shadow: 
            0 0 15px rgba(0, 149, 211, 0.6),
            0 0 25px rgba(0, 149, 211, 0.3);
    }
    100% { 
        text-shadow: 
            0 0 10px rgba(0, 149, 211, 0.4),
            0 0 20px rgba(0, 149, 211, 0.2);
    }
}
</style> 