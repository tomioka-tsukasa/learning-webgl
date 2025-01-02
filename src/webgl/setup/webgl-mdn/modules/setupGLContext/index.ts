import { SetupGLContext } from './types'

export const setupGLContext: SetupGLContext = (
  init,
  canvas
) => {
  if (canvas && canvas.tagName !== 'CANVAS') {
    console.error('canvas要素を指定してください。')

    return null
  } else if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    document.body.appendChild(canvas)
  }
  canvas.id = 'setupCanvas'
  const gl = canvas.getContext('webgl')

  if (gl) init(
    gl,
    canvas
  )
  else {
    console.error('WebGLのコンテキストを生成できません。')

    return null
  }

  return gl
}
