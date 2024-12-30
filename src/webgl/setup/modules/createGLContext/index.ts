import { CreateGLContext } from './types'

/**
 * WebGLコンテキストの作成
 */
export const createGLContext: CreateGLContext = (
  canvas
) => {
  const ctx: WebGLRenderingContext | null = canvas.getContext('webgl')
  if (ctx) {
    ctx.viewport(
      0,
      0,
      canvas.width,
      canvas.height,
    )
  } else {
    console.error('WebGLのコンテキストを生成できません。')
  }
  return ctx
}
