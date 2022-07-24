<script setup lang="ts">
const cursorRef = ref()
const positonRef = ref({
  mouseX: 0,
  mouseY: 0,
  destinationX: 0,
  destinationY: 0,
  distanceX: 0,
  distanceY: 0,
  key: -1,
})
onMounted(() => {
  document.body.style.cursor = 'none'
  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event
    positonRef.value.mouseX = clientX - cursorRef.value.clientWidth / 2
    positonRef.value.mouseY = clientY - cursorRef.value.clientHeight / 2
  })
  const followMouse = () => {
    positonRef.value.key = requestAnimationFrame(followMouse)
    const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positonRef.value
    if (!destinationX || !destinationY) {
      positonRef.value.destinationX = mouseX
      positonRef.value.destinationY = mouseY
    }
    else {
      positonRef.value.distanceX = (mouseX - destinationX) * 0.15
      positonRef.value.distanceY = (mouseY - destinationY) * 0.15
      if (Math.abs(positonRef.value.distanceX) + Math.abs(positonRef.value.distanceY) < 0.1) {
        positonRef.value.destinationX = mouseX
        positonRef.value.destinationY = mouseY
      }
      else {
        positonRef.value.destinationX += distanceX
        positonRef.value.destinationY += distanceY
      }
    }
    cursorRef.value.style.transform = `translate3d(${positonRef.value.destinationX}px, ${positonRef.value.destinationY}px,0)`
  }
  followMouse()
})
</script>
<template>
  <div ref="cursorRef" class="cursor">
    <div class="cursorBg" />
  </div>
</template>

<style scoped lang="less">
.cursor {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  transform: translate3d(0, 0, 0);
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1);
  mix-blend-mode: difference;

  .cursorBg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    // mix-blend-mode: difference;
  }
}
</style>
