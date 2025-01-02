export type LoadShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  shaderSource: string
) => WebGLShader | null
