import { LoadShader } from './types'

export const loadShader: LoadShader = (
  gl,
  type,
  shaderSource
) => {
  const shader = gl.createShader(type)

  if (!shader) {
    console.error('`gl.createShader` の処理中に問題が発生しました。')

    return null
  }

  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      `シェーダーのコンパイル時にエラーが発生しました: ${gl.getShaderInfoLog(shader,)}`
    )
    gl.deleteShader(shader)

    return null
  }

  return shader
}
