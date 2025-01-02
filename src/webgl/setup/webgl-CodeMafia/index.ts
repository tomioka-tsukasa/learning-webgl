import { createGLContext } from './modules/createGLContext'
import { draw } from './modules/draw'
import { setupBuffers } from './modules/setupBuffers'
import { setupShaders } from './modules/setupShaders'
import { ProgramInfo, WebglSetup } from './types'

export const webglSetup: WebglSetup = (
  vertexShaderSource,
  fragmentShaderSource
) => {
  let gl: WebGLRenderingContext | null = null
  const canvasElm = document.createElement('canvas')
  canvasElm.id = 'canvas'
  document.body.appendChild(canvasElm)
  const canvas: HTMLCanvasElement | null = document.querySelector('#canvas')

  if (!canvas) return

  gl = createGLContext(canvas)

  if (!gl) return

  const shaderProgram = setupShaders(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  )

  if (!shaderProgram) return

  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      position: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      color: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    verticeNum: 0,
  }
  programInfo.verticeNum = setupBuffers(
    gl,
    programInfo
  )

  draw(
    gl,
    programInfo
  )
}
