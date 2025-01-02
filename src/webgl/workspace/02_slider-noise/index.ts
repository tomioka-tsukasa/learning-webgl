import * as THREE from 'three'
import { shaderDebug } from '@/utility/shaderDebug'
import { textureLoader } from '@/utility/textureLoader'
import { Setup } from './types'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderCanvas } from '@/webgl/setup/three/setupShaderCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'

export const setup: Setup = async () => {
  const { canvas, renderer } = setupRenderer(
    {
      antialias: true,
      logarithmicDepthBuffer: true,
    },
  )

  if (!canvas || !renderer) return null

  const { scene, camera, geom, mat, mesh } = setupShaderCanvas(
    canvas,
    {
      uniforms: {
        uTick: {
          value: 0
        },
        uTex: {
          value: await textureLoader('public/images/output2.jpg')
        }
      },
      vertexShader,
      fragmentShader,
      wireframe: false,
      side: THREE.FrontSide,
      transparent: true,
    }
  )

  console.group('Three Objects Log.')
  console.log('scene', scene); console.log('camera', camera); console.log('geom', geom); console.log('mat', mat); console.log('mesh', mesh)
  console.groupEnd()

  shaderDebug(renderer)

  function animate() {
    const tick = () => {
      requestAnimationFrame(tick)
      mat.uniforms.uTick.value++
      renderer.render(scene, camera)
    }
    tick()
  }
  animate()
}
