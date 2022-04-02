<script setup lang="ts">

</script>
<template>
  <div w-full h-full p-40>
    <div w-full text="left" font-mono mb-2 mb-4 text-2xl font-bold>
      100 days
    </div>
    <div w-full flex="~" flex-wrap text-xl>
      <a v-for="item in 60" :key="item" block w-60 mr-4 font-400 class="hover:op100" cursor-pointer>
        <span mr-2 opacity-50 font-mono>001</span>
        <b text="gray-500/80">Mass</b>
      </a>
    </div>
  </div>
</template>
<style  scoped>

</style>
