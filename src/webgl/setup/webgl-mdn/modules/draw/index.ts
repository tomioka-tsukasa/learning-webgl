import { mat4 } from 'gl-matrix'

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // 黒でクリア、完全に不透明
  gl.clearDepth(1.0) // 全てをクリア
  gl.enable(gl.DEPTH_TEST) // 深度テストを有効化
  gl.depthFunc(gl.LEQUAL) // 奥にあるものは隠れるようにする

  // 描写を行う前にキャンバスをクリアする

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // カメラで遠近感を再現するために使用される特殊な行列、
  // 視点マトリクスを作成する。
  // 視野角は 45 度、幅と高さの比率はキャンバスの
  // 表示サイズに合わせる。
  // カメラから 0.1 単位から 100 単位までのオブジェクトのみを
  // 表示するようにする。

  const fieldOfView = (45 * Math.PI) / 180 // ラジアンにする
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix = mat4.create()

  // メモ: glmatrix.js は常に第一引数として結果の
  // 受け取り先を取る
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

  // 描写位置をシーンの中央である "identity" ポイントにセットする
  const modelViewMatrix = mat4.create()

  // そして描写位置を正方形を描写し始めたい位置に少しだけ動かす
  mat4.translate(
    modelViewMatrix, // 変換結果の格納先
    modelViewMatrix, // 変換する行列
    [-0.0, 0.0, -6.0],
  ) // 変換量

  // WebGL にどのように座標バッファーから座標を
  // vertexPosition 属性に引き出すか伝える。
  setPositionAttribute(gl, buffers, programInfo)

  // WebGL に、描画にこのプログラムを使用するよう伝える
  gl.useProgram(programInfo.program)

  // シェーダーユニフォームを設定
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  )
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  )

  {
    const offset = 0
    const vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}

// WebGL に、位置バッファーから位置を
// vertexPosition 属性に引き出す方法を指示する。
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 2 // 反復処理ごとに 2 つの値を取り出す
  const type = gl.FLOAT // バッファ内のデータは 32 ビット浮動小数点数
  const normalize = false // 正規化なし
  const stride = 0 // 一組の値から次の値まで何バイトで移動するか
  // 0 = 上記の type と numComponents を使用
  const offset = 0 // バッファー内の何バイト目から開始するか
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset,
  )
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
}

export { drawScene }
