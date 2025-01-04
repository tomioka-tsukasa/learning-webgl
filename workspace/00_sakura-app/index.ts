import './styles/index.scss'
import { shaderDebug } from '@/webgl/setup/three/shaderDebug'
import { textureLoader } from '@/webgl/setup/three/textureLoader'
import { Setup } from './types'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { setupShaderFullCanvas } from '@/webgl/setup/three/setupShaderFullCanvas'
import { setupRenderer } from '@/webgl/setup/three/setupRenderer'
import { logThreeObjects } from '@/webgl/setup/three/logThreeObjects'
import { datGui, datGuiParams } from './modules/datGui'
import { originalCanvas } from './modules/originalCanvas'

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
          value: await textureLoader(datGuiParams['画像選択'].default)
        },
        uOverlay: {
          value: await textureLoader('/images/overlay-1.jpg')
        },
        uLiStrength: {
          value: datGuiParams['明るさ']['強さ'].target.value
        },
        uLiRange: {
          value: datGuiParams['明るさ']['範囲'].target.value
        },
        uLiToggle: {
          value: datGuiParams['明るさ']['オン/オフ']
        },
        uSaPinkStrength: {
          value: datGuiParams['ピンク強度']['強さ'].target.value
        },
        uSaPinkRange: {
          value: datGuiParams['ピンク強度']['範囲'].target.value
        },
        uSaPinkToggle: {
          value: datGuiParams['ピンク強度']['オン/オフ']
        },
        uColdStrength: {
          value: datGuiParams['寒色フィルター']['強さ'].target.value
        },
        uColdToggle: {
          value: datGuiParams['寒色フィルター']['オン/オフ']
        },
        uWarmStrength: {
          value: datGuiParams['暖色フィルター']['強さ'].target.value
        },
        uWarmToggle: {
          value: datGuiParams['暖色フィルター']['オン/オフ']
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
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
  datGui(mat, original.mat)
}

document.addEventListener('DOMContentLoaded', () => {
  setup()
})
