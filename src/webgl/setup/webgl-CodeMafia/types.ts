export type WebglSetup = (
  vertexShaderSource: string,
  fragmentShaderSource: string
) => void

export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    position: GLint;
    color: GLint;
  };
  verticeNum: number;
}
