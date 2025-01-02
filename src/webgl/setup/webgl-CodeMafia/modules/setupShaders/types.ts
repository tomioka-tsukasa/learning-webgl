export type SetupShaders = (
  gl: WebGLRenderingContext,
  vertShaderSource: string,
  fragShaderSource: string,
) => WebGLProgram | null
