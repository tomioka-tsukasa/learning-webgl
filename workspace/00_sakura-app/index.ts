import './styles/index.scss'
import { shaderDebug } from '@/webgl/setup/three/shaderDebug'
import { textureLoader } from '@/webgl/setup/three/textureLoader'
import { Setup } from './types'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderFullCanvas } from '@/webgl/setup/three/setupShaderFullCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'
import { logThreeObjects } from '@/webgl/setup/three/logThreeObjects'
import { initCtrl } from './modules/controller'
import { originalCanvas } from './modules/originalCanvas'
import { ctrlMember, setUniforms } from './modules/controller/member'

export const setup: Setup = async () => {
  const { canvas, renderer } = setupRenderer(
    {
      antialias: true,
      logarithmicDepthBuffer: true,
    },
    '#canvas'
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
        uOverlay: {
          value: await textureLoader('/images/overlay-9.jpg')
        },
        ...setUniforms
      },
      vertexShader,
      fragmentShader,
    }
  )

  const original = await originalCanvas()

  if (!original) return null

  const animate = () => {
    const tick = () => {
      requestAnimationFrame(tick)
      mat.uniforms.uTick.value++
      renderer.render(scene, camera)
      original.renderer.render(original.scene, original.camera)
    }
    tick()
  }
  animate()
  shaderDebug(renderer)
  logThreeObjects(scene, camera, geom, mat, mesh)
  initCtrl(mat, original.mat)
}

document.addEventListener('DOMContentLoaded', () => {
  setup()
})
