import * as THREE from 'three'

export type SetupRenderer = (
  rendererParams: ConstructorParameters<typeof THREE.WebGLRenderer>[0],
  canvasId?: string,
) => {
  canvas: HTMLCanvasElement | null,
  renderer: THREE.WebGLRenderer,
}
