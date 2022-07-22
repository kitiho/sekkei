<script setup lang="ts">
import * as THREE from 'three'
import vertexShader from './vertexShader.glsl'

const webgl = ref()
const uTime = 0
function init() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const scene = new THREE.Scene()
  const plane = new THREE.PlaneBufferGeometry(0.4, 0.6, 16, 16)
  const loader = new THREE.TextureLoader()
  const texture = loader.load('https://images.unsplash.com/photo-1655906541920-09ccb02adf51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80')
  const shaderMaterial = {
    uniforms: {
      time: { value: uTime },
      uTexture: { value: texture },
    },
    // vertexShader
    vertexShader,
    // fragmentShader
    fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        varying float vWave;
        void main() {
          float wave = vWave * 0.2;
          vec3 texture = texture2D(uTexture, vUv + wave).rgb;
          gl_FragColor = vec4(texture, 1.0);
        }
      `,
  }
  const planeMaterial = new THREE.ShaderMaterial(shaderMaterial)
  const planeMesh = new THREE.Mesh(plane, planeMaterial)
  scene.add(planeMesh)
  const camera = new THREE.PerspectiveCamera(10, sizes.width
    / sizes.height, 0.1, 100)
  camera.position.z = 5
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
  renderer.render(scene, camera)

  const clock = new THREE.Clock()
  let previousTime = 0
  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    shaderMaterial.uniforms.time.value = elapsedTime
    previousTime = elapsedTime
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
  <div w-full h-full bg-dark>
    <canvas id="webgl" ref="webgl" w-full h-full />
  </div>
</template>

<style scoped>
</style>
