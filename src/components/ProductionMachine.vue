<template>
    <div class="Machine-content">
        <div class="Machine">

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
    .Machine{
        width: 50%;
        height: 60%;
        background: url('../assets/images/quan.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
  }

  </style> 