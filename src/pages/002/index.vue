<script setup lang="ts">
import Scene from '~/features/002/scene'
const canvas = $ref<HTMLCanvasElement>()
let scene

onMounted(() => {
  scene = new Scene(canvas)
})

</script>
<template>
  <div w-full h-full flex="~" flex-col items-center justify-center>
    <div text-gray-700 font-mono text-xl text-center mb-4>
      Risograph Grain Light Effect
    </div>
    <div w-full h-700px>
      <canvas ref="canvas" bg-white w-full h-full />
    </div>
    <div font-mono>
      Tutorial -> <a href="https://tympanus.net/codrops/2022/03/07/creating-a-risograph-grain-light-effect-in-three-js/">Risograph Grain Light Effect</a>
    </div>
  </div>
</template>

<style scoped>
</style>
