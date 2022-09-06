<script setup lang="ts">
import * as THREE from 'three'
const webgl = ref()
const smokeParticles: THREE.Mesh[] = []
function init() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const scene = new THREE.Scene()
  const plane = new THREE.PlaneBufferGeometry(0.1, 0.05)
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 'black',
    side: THREE.DoubleSide,
  })
  const planeMesh = new THREE.Mesh(plane, planeMaterial)
  scene.add(planeMesh)
  const camera = new THREE.PerspectiveCamera(75, sizes.width
    / sizes.height, 1, 10000)
  camera.position.z = 1200
  scene.add(camera)
  const renderer = new THREE.WebGLRenderer({
    canvas: webgl.value,
    antialias: true,
    alpha: true,
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
    renderer.render(scene, camera)
  })
  renderer.setClearColor('#074188', 1)
  renderer.render(scene, camera)
  const loader = new THREE.TextureLoader()

  loader.crossOrigin = ''

  loader.load(
    new URL('../assets/img/cloud10.png', import.meta.url).href,
    (texture) => {
      const smokeGeo = new THREE.PlaneBufferGeometry(300, 300)

      const smokeMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        emissive: '#fff',
        emissiveIntensity: 0.8,
      })

      for (let p = 0, l = 210; p < l; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial)

        particle.position.set(
          (Math.random() - 0.5) * sizes.width,
          (Math.random() - 0.5) * sizes.height,
          Math.random() * 1000 - 100,
        )

        particle.rotation.z = Math.random() * 360
        scene.add(particle)
        smokeParticles.push(particle)
      }
    },
  )

  const light = new THREE.DirectionalLight('#feb475', 0.3)
  light.position.set(1, 1, 1)
  scene.add(light)
  const light2 = new THREE.DirectionalLight('#806f93', 0.1)
  light2.position.set(2, 2, 0.5)
  scene.add(light2)

  // renderer.setSize(sizes.width, sizes.height)

  // animation
  const clock = new THREE.Clock()
  let previousTime = 0
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    // shaderMaterial.uniforms.time.value = elapsedTime
    previousTime = elapsedTime
    smokeParticles.forEach((sp, index) => {
      sp.rotation.z += deltaTime * 0.06
      if (index <= 100) {
        sp.position.x += deltaTime * 5
        sp.position.y -= deltaTime * 5
      }
      else {
        sp.position.x -= deltaTime * 5
        sp.position.y += deltaTime * 5
      }
    })
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }
  tick()
}
onMounted(() => {
  init()
})
</script>
<template>
  <canvas ref="webgl" absolute top-0 left-0 w-full h-full z-1 opacity="90" />
</template>

<style scoped>
</style>
