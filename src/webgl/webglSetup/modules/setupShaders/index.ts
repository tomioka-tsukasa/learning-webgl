import { loadShader } from '../loadShader'
import { SetupShaders } from './types'

/**
 * シェーダーコードをWebGLコンテキストにバインド
 */
export const setupShaders: SetupShaders = (
  gl,
  vertShaderSource,
  fragShaderSource
) => {
  const vertexShaderSource = vertShaderSource
  const fragmentShaderSource = fragShaderSource

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  const shaderProgram = gl.createProgram()

  if (!vertexShader || !fragmentShader || !shaderProgram) return null

  // プログラムにシェーダーをバインド
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  // vertexシェーダーとfragmentシェーダーをリンク
  gl.linkProgram(shaderProgram)
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('シェーダーのセットアップに失敗しました。')
  }

  return shaderProgram
}
