import * as THREE from 'three'
import { SetupRenderer } from './types'

export const setupRenderer: SetupRenderer = (
  rendererParams,
  canvasId,
) => {
  let canvas: HTMLCanvasElement | null = null
  canvas = canvasId ? document.querySelector(canvasId) : null

  const renderer = new THREE.WebGLRenderer({
    ...rendererParams,
    canvas: canvas ? canvas : undefined,
  })
  renderer.setPixelRatio(window.devicePixelRatio)

  renderer.setSize(
    canvas ? canvas.clientWidth : window.innerWidth,
    canvas ? canvas.clientHeight : window.innerHeight,
  )

  if (!canvas) {
    document.body.appendChild(renderer.domElement)
    canvas = renderer.domElement
  }

  return {
    canvas,
    renderer,
  }
}
