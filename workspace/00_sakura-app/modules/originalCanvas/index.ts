import { textureLoader } from '@/webgl/setup/three/textureLoader'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderFullCanvas } from '@/webgl/setup/three/setupShaderFullCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'
import { Setup } from './types'
import { ctrlMember } from '../controller/member'

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
          value: await textureLoader(ctrlMember.selectImage.values[ctrlMember.selectImage.default])
        },
      },
      vertexShader,
      fragmentShader,
    }
  )

  return { canvas, renderer, scene, camera, geom, mat, mesh }
}
