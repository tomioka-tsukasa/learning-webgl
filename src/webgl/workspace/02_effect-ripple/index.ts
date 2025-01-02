import * as THREE from 'three'
import { shaderDebug } from '@/utility/shaderDebug'
import { textureLoader } from '@/utility/textureLoader'
import { Setup } from './types'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderFullCanvas } from '@/webgl/setup/three/setupShaderFullCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'
import { logThreeObjects } from '@/webgl/setup/three/logThreeObjects'
import { animation } from './animation'

export const setup: Setup = async () => {
  const { canvas, renderer } = setupRenderer(
    {
      antialias: true,
      logarithmicDepthBuffer: true,
    },
    'canvas'
  )

  if (!canvas || !renderer) return null

  const { scene, camera, geom, mat, mesh } = setupShaderFullCanvas(
    canvas,
    {
      uniforms: {
        uTick: {
          value: 0
        },
        uTex: {
          value: await textureLoader('public/images/output1_.jpg')
        }
      },
      vertexShader,
      fragmentShader,
      wireframe: false,
      side: THREE.FrontSide,
      transparent: true,
    }
  )

  const animate = () => {
    const tick = () => {
      requestAnimationFrame(tick)
      mat.uniforms.uTick.value++
      renderer.render(scene, camera)
    }
    tick()
  }
  animate()
  animation(canvas)

  logThreeObjects(scene, camera, geom, mat, mesh)
  shaderDebug(renderer)
}
