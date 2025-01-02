import { SetupBuffers } from './types'

/**
 * シェーダーコードをWebGLコンテキストにバインド
 */
export const setupBuffers: SetupBuffers = (
  gl,
  pInfo
) => {
  // 頂点の数
  const verticeNum = 3

  // 位置を管理する頂点の入れ物（バッファ）を作成
  const vertexPositionBuffer = gl.createBuffer()
  // 頂点の位置を指定（-1 ~ 1）
  const triangleVertices = [1, 0, -1, -1, -1, 1]

  // ARRAY_BUFFERに頂点データを格納するバッファを紐づける
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer)
  // ARRAY_BUFFERバッファに頂点データをロードする
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVertices),
    gl.STATIC_DRAW
  )

  // シェーダーコード内から抽出された属性（attribute）と上記でアップした頂点データを紐づける
  gl.vertexAttribPointer(
    pInfo.attribLocations.position,
    triangleVertices.length / verticeNum,
    gl.FLOAT,
    false,
    0,
    0
  )

  // 属性を有効化する
  gl.enableVertexAttribArray(pInfo.attribLocations.position)

  /**
   * 色を設定
   */
  // 頂点の色
  const colorVertices = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]

  // 位置を管理する頂点の入れ物（バッファ）を作成
  const vertexColorBuffer = gl.createBuffer()

  // ARRAY_BUFFERに頂点データを格納するバッファを紐づける
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
  // ARRAY_BUFFERバッファに頂点データをロードする
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(colorVertices),
    gl.STATIC_DRAW
  )

  // シェーダーコード内から抽出された属性（attribute）と上記でアップした頂点データを紐づける
  gl.vertexAttribPointer(
    pInfo.attribLocations.color,
    colorVertices.length / verticeNum,
    gl.FLOAT,
    false,
    0,
    0
  )

  // 属性を有効化する
  gl.enableVertexAttribArray(pInfo.attribLocations.color)

  return verticeNum
}
