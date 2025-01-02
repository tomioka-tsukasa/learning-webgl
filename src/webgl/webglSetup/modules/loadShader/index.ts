import { LoadShader } from './types'

/**
 * シェーダーコードをWebGLコンテキストにバインド
 */
export const loadShader: LoadShader = (
  gl,
  type,
  shaderSource
) => {
  // fragment、またはvertexのシェーダータイプを指定
  const shader = gl.createShader(type)

  if (!shader) return null

  // シェーダーコードを指定
  gl.shaderSource(shader, shaderSource)
  // シェーダーコードをバイナリコードにコンパイル
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('シェーダーの作成に失敗しました。' + gl.getShaderInfoLog(shader))
    console.error('シェーダーの作成に失敗しました。', gl.getShaderInfoLog(shader))
    // 問題のあるコードの場合は削除
    gl.deleteShader(shader)
    return null
  }

  return shader
}
