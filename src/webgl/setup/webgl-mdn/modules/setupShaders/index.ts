import { loadShader } from '../loadShader'
import { SetupShaders } from './types'

export const setupShaders: SetupShaders = (
  gl,
  vertShaderSource,
  fragShaderSource
) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertShaderSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSource)
  const shaderProgram = gl.createProgram()

  if (!vertexShader || !fragmentShader || !shaderProgram) {
    console.error('`gl.createProgram` の処理中に問題が発生しました。')

    return null
  }

  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(
      `シェーダープログラムを初期化できません: ${gl.getProgramInfoLog(shaderProgram,)}`
    )

    return null
  }

  return shaderProgram
}
