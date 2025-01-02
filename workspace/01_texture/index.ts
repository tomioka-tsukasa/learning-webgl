import * as THREE from 'three'
import { shaderDebug } from '@/webgl/setup/three/shaderDebug'
import { textureLoader } from '@/webgl/setup/three/textureLoader'
import { Setup } from './types'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export const setup: Setup = async () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const geometry = new THREE.PlaneGeometry(4, 2)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTick: {
        value: 0
      },
      uTex: {
        value: await textureLoader('/images/output2.jpg')
      }
    },
    vertexShader,
    fragmentShader,
    wireframe: false,
    side: THREE.FrontSide,
    transparent: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  console.log(geometry)
  console.log(material)

  shaderDebug(renderer)

  function animate() {
    const tick = () => {
      requestAnimationFrame(tick)
      material.uniforms.uTick.value++
      // mesh.rotation.x += 0.005
      // mesh.rotation.z += 0.005
      renderer.render(scene, camera)
    }
    tick()
  }
  animate()
}
