export type SetupGLContext = (
  init: (
    gl: WebGLRenderingContext,
    canvas: HTMLCanvasElement
  ) => void,
  canvas?: HTMLCanvasElement | null,
) => WebGLRenderingContext | null
