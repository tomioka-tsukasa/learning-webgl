import { ProgramInfo } from '../../types'

export type SetupBuffers = (
  gl: WebGLRenderingContext,
  pInfo: ProgramInfo
) => number
