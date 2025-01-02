import { ProgramInfo } from '../../types'

export type Draw = (
  gl: WebGLRenderingContext,
  pInfo: ProgramInfo
) => void
