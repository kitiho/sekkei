<script setup lang="ts">
import * as THREE from 'three'
import { gsap } from 'gsap'
const sections = ['My Portfolio', 'My projects', 'Contact me']
const webgl = ref<HTMLCanvasElement>()
function init() {
  const scene = new THREE.Scene()
  const objectsDistance = 4
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const particlesCount = 200
  const positions = new Float32Array(particlesCount * 3)

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.03,
  })
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  const material = new THREE.MeshToonMaterial({ color: '#ffeded' })
  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material,
  )
  const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material,
  )
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material,
  )

  const sectionMeshes = [mesh1, mesh2, mesh3]

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  mesh1.scale.set(0.5, 0.5, 0.5)
  mesh3.scale.set(0.5, 0.5, 0.5)

  mesh1.position.y = -objectsDistance * 0
  mesh2.position.y = -objectsDistance * 1
  mesh3.position.y = -objectsDistance * 2
  mesh1.position.x = 2
  mesh2.position.x = -2
  mesh3.position.x = 2

  scene.add(mesh1, mesh2, mesh3)

  const cursor = { x: 0, y: 0 }

  window.addEventListener('mousemove', (event: MouseEvent) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
  })

  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  const camera = new THREE.PerspectiveCamera(35, sizes.width
    / sizes.height, 0.1, 100)
  camera.position.z = 6
  cameraGroup.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: webgl.value,
    antialias: true,
    alpha: true,
  })

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
  directionalLight.position.set(1, 1, 0)
  scene.add(directionalLight)

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

  let scrollY = window.scrollY
  let currentSection = 0
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)
    if (newSection !== currentSection) {
      currentSection = newSection
      gsap.to(sectionMeshes[currentSection].rotation, {
        duration: 1.5,
        ease: 'power2.inOut',
        x: '+=6',
        y: '+=3',
      })
    }
  })

  const clock = new THREE.Clock()
  let previousTime = 0
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    for (const mesh of sectionMeshes) {
      mesh.rotation.x += deltaTime * 0.1
      mesh.rotation.y += deltaTime * 0.12
    }
    camera.position.y = -scrollY / sizes.height * objectsDistance
    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

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
      v-for="(item, index) in sections"
      :key="item"
      flex="~"
      items-center
      :class="`${index === 1 ? 'justify-end' : ''}`"
      h-100vh
      relative
      font-mono
      uppercase
      text-7vmin
      class="px-10% text-#ffeded"
    >
      <h1>{{ item }}</h1>
    </section>
  </div>
</template>

<style>
html {
  background: #1e1a20;
}
</style>
