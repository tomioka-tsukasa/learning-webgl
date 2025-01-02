export type SetupWebGL = (
  vertexShaderSource: string,
  fragmentShaderSource: string
) => void

export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    [key: string]: number;
  };
  uniformLocations?: {
    [key: string]: WebGLUniformLocation | null;
  };
  buffers: Record<string, WebGLBuffer>;
  verticeNum: number;
}
