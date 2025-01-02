import * as THREE from 'three'

export const shaderDebug = (
  renderer: THREE.WebGLRenderer
) => {
  renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
    const vertexShaderSource = gl.getShaderSource( vertexShader )
    const fragmentShaderSource = gl.getShaderSource( fragmentShader )

    // 頂点シェーダーのエラーチェック
    const vertexShaderError = gl.getShaderInfoLog(vertexShader)
    if (vertexShaderError) {
      console.error(vertexShaderError) // エラーメッセージを表示
      console.groupCollapsed('vertexShader')
      console.log(vertexShaderSource) // ソースコードを表示
      console.groupEnd()
    } else {
      console.groupCollapsed('vertexShader')
      console.log(vertexShaderSource) // ソースコードを表示
      console.groupEnd()
    }

    // フラグメントシェーダーのエラーチェック
    const fragmentShaderError = gl.getShaderInfoLog(fragmentShader)
    if (fragmentShaderError) {
      console.error(fragmentShaderError) // エラーメッセージを表示
      console.groupCollapsed('fragmentShader')
      console.log(fragmentShaderSource) // ソースコードを表示
      console.groupEnd()
    } else {
      console.groupCollapsed('fragmentShader')
      console.log(fragmentShaderSource) // ソースコードを表示
      console.groupEnd()
    }
  }
}
