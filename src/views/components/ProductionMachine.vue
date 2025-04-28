<template>
    <div class="Machine-content">
        <div class="Machine">
            <div class="text-content">东方闪电</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,  } from 'vue'



onMounted(() => {

})


</script>

<style lang="scss" scoped>
.Machine-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .Machine {
        width: 72%;
        height: 0;
        padding-bottom: 40.5%;
        position: relative;
        background: url('@/assets/images/quan.png') no-repeat center center;
        background-size: contain;
        max-width: 576px;
        margin: 0 auto;

        .text-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            white-space: nowrap;
        }
    }
}

</style> 