<script setup lang="ts">
const block = ref()
const speed = ref(0)
const position = ref(0)
const rounded = ref(0)
onMounted(() => {
  document.addEventListener('wheel', (e) => {
    speed.value += e.deltaY * 0.0003
  })
  function raf() {
    position.value += speed.value
    speed.value *= 0.8
    rounded.value = Math.round(position.value)
    const diff = rounded.value - position.value
    position.value += diff * 0.05
    console.log(rounded.value)
    block.value.style.transform = `translate(0,${position.value * 100}px)`
    requestAnimationFrame(raf)
  }
  raf()
})
</script>

<template>
  <div class="wrapper">
    <div ref="block" class="block" />
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .block {
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
</style>
