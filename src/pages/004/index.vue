<script setup lang="ts">
import * as THREE from 'three'

const sections = ['My Portfolio', 'My projects', 'Contact me']
const webgl = ref<HTMLCanvasElement>()
function init() {
  const scene = new THREE.Scene()
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' }),
  )
  scene.add(cube)
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const camera = new THREE.PerspectiveCamera(35, sizes.width
    / sizes.height, 0.1, 100)
  camera.position.z = 6
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: webgl.value,
    antialias: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  })
  const clock = new THREE.Clock()
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }
  tick()
}
onMounted(() => {
  init()
  console.log(webgl.value)
})

</script>
<template>
  <div w-full h-full>
    <canvas ref="webgl" fixed top-0 left-0 w-full h-full class="webgl" />
    <section
      v-for="(item,index) in sections"
      :key="item"
      flex="~"
      items-center
      :class="`${index === 1 ? 'justify-end':''}`"
      h-100vh
      relative
      font-mono
      uppercase
      text-7vmin
      class="px-10% text-#ffeded"
    >
      <h1>
        {{ item }}
      </h1>
    </section>
  </div>
</template>

<style scoped>
</style>
