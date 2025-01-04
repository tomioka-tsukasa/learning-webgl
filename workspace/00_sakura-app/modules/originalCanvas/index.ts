import * as THREE from 'three'
import { textureLoader } from '@/webgl/setup/three/textureLoader'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderFullCanvas } from '@/webgl/setup/three/setupShaderFullCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'
import { datGuiParams } from '../datGui'
import { Setup } from './types'

export const originalCanvas: Setup = async () => {
  const { canvas, renderer } = setupRenderer(
    {
      antialias: true,
      logarithmicDepthBuffer: true,
    },
    '#originalCanvas'
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
          value: await textureLoader(datGuiParams['画像選択'].default)
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    }
  )

  return { canvas, renderer, scene, camera, geom, mat, mesh }
}
