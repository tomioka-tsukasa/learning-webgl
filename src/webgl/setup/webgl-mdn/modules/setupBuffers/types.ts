import { ProgramInfo } from '../../types'

export type SetupBuffers = (
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  key: string,
  vertices: Array<number>,
  verticeNum: number,
) => number
