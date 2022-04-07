import glslify from 'glslify'
import * as THREE from 'three'
import type { PerspectiveCamera, Scene as ThreeScene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import vertexShader from '~/features/002/vertexShader.glsl?raw'
import fragmentShader from '~/features/002/fragmentShader.glsl?raw'
import 'glsl-noise/simplex/2d.glsl?raw'

export default class Scene {
  canvas?: HTMLElement
  renderer?: WebGLRenderer
  scene?: ThreeScene
  camera?: PerspectiveCamera
  controls?: OrbitControls
  width?: number
  height?: number
  raf?: number

  constructor(el: HTMLCanvasElement) {
    this.canvas = el
    this.setScene()
    this.setRender()
    this.setCamera()
    this.setControls()
    this.setMeshes()
    this.handleResize()
    this.events()

    // render our scene
    this.renderer!.render(this.scene!, this.camera!)
  }

  /**
   * This is our scene, we'll add any object
   * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
   */
  setScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#fff')
  }

  /**
   * Our Webgl renderer, an object that will draw everything in our canvas
   * https://threejs.org/docs/?q=rend#api/en/renderers/WebGLRenderer
   */
  setRender() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
  }

  /**
   * Our Perspective camera, this is the point of view that we'll have
   * of our scene.
   * A perscpective camera is mimicing the human eyes so something far we'll
   * look smaller than something close
   * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
   */
  setCamera() {
    const aspectRatio = this.width! / this.height!
    const fieldOfView = 50
    const nearPlane = 0.1
    const farPlane = 10000

    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
    )
    this.camera.position.set(2.5, 2, 2)

    this.scene!.add(this.camera)
  }

  /**
   * Threejs controls to have controls on our scene
   * https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
   */
  setControls() {
    this.controls = new OrbitControls(this.camera!, this.renderer!.domElement)
    this.controls.autoRotate = true
  }

  /**
   * Let's add our mesh with his sphere geometry and basic material
   * https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
   */
  /**
   * Let's add our mesh with his sphere geometry and basic material
   * https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry
   */
  setMeshes() {
    const geometry = new THREE.SphereGeometry(1, 32, 32)

    const spotLight = new THREE.SpotLight(0xFFFFFF)
    spotLight.position.set(0, 5, 4)
    spotLight.intensity = 1.85
    this.scene!.add(spotLight)

    const uniforms = THREE.UniformsUtils.merge([
      THREE.ShaderLib.lambert.uniforms,
      {
        uColor: {
          value: new THREE.Color(0x51B1F5),
        },
        uNoiseCoef: {
          value: 3.5,
        },
        uNoiseScale: {
          value: 0.8,
        },
      },
    ])

    const material = new THREE.ShaderMaterial({
      vertexShader: THREE.ShaderLib.lambert.vertexShader,
      fragmentShader: glslify(fragmentShader),
      uniforms,
      lights: true,
      transparent: true,
    })

    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(0, 0.5, 0)
    this.scene!.add(sphere)

    const cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 4, 32),
      material,
    )
    cylinder.position.set(-4, 1.5, 0)
    this.scene!.add(cylinder)

    const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2, 32), material)
    box.position.set(4, 0.5, 0)
    this.scene!.add(box)

    const cylinder2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3, 32),
      material,
    )
    cylinder2.position.set(0, 1, -3)
    this.scene!.add(cylinder2)
  }

  /**
   * List of events
   */
  events() {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.draw(0)
  }

  // EVENTS

  /**
   * Request animation frame function
   * This function is called 60/time per seconds with no performance issue
   * Everything that happens in the scene is drawed here
   * @param {Number} _now
   */
  draw = (_now: number) => {
    // now: time in ms
    this.renderer!.render(this.scene!, this.camera!)

    this.raf = window.requestAnimationFrame(this.draw)
  }

  // EVENTS

  /**
   * On resize, we need to adapt our camera based
   * on the new window width and height and the renderer
   */
  handleResize = () => {
    this.width = this.canvas!.parentElement!.offsetWidth
    this.height = this.canvas!.parentElement!.offsetHeight

    // Update camera
    this.camera!.aspect = this.width! / this.height!
    this.camera!.updateProjectionMatrix()

    this.renderer!.setPixelRatio(window.devicePixelRatio)
    this.renderer!.setSize(this.width!, this.height!)
  }
}
