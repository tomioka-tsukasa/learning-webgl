import { drawScene } from './modules/draw'
import { initBuffers } from './modules/setupBuffers'
import { setupGLContext } from './modules/setupGLContext'
import { setupShaders } from './modules/setupShaders'
import { ProgramInfo, SetupWebGL } from './types'

export const setupWebGL: SetupWebGL = (
  vertexShaderSource,
  fragmentShaderSource
) => {
  const gl = setupGLContext(
    (gl, canvas) => {
      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height,
      )
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  )

  if (!gl) return null

  const shaderProgram = setupShaders(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  )

  if (!shaderProgram) return null

  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    buffers: {},
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
    verticeNum: 3,
  }
  const buffers = initBuffers(gl)

  // シーンを描画
  drawScene(gl, programInfo, buffers)
}
