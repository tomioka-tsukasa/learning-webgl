import * as THREE from 'three'
import { ThreeSetup } from './types'
import { shaderDebug } from '@/utility/shaderDebug'
import { textureLoader } from '@/utility/textureLoader'

export const threeSetup: ThreeSetup = async (
  vertexShader,
  fragmentShader,
) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex: {
        value: await textureLoader('@/assets/images/samples/output2.jpg')
      }
    },
    vertexShader,
    fragmentShader,
    wireframe: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  shaderDebug(renderer)

  function animate() {
    const tick = () => {
      requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()
  }
  animate()
}
