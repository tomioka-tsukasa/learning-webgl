import { Draw } from './types'

// 画面描写
export const draw: Draw = (
  gl,
  pInfo
) => {
  // WebGLのコンテキストが使用するプログラムを指定
  gl.useProgram(pInfo.program)

  // Uniformの定義
  const uColorLoc = gl.getUniformLocation(pInfo.program, 'uColor')
  const uTickLoc = gl.getUniformLocation(pInfo.program, 'uTick')

  let tick = 0

  animate()
  function animate() {
    tick++
    // 背景色を特定の色で指定（0~1のrgbaで指定）
    gl.clearColor(0, 0, 0, 1)
    // 上記で指定した背景色を描写
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniform2f(uColorLoc, 1, 1)
    gl.uniform1f(uTickLoc, tick)
    // ARRAY_BUFFERに格納されている頂点を元に画面描写
    gl.drawArrays(gl.TRIANGLES, 0, pInfo.verticeNum)

    window.requestAnimationFrame(animate)
  }
}
