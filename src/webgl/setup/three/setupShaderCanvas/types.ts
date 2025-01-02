import * as THREE from 'three'

export type SetupShaderCanvas = (
  canvas: HTMLCanvasElement,
  shaderMaterialParams: ConstructorParameters<typeof THREE.ShaderMaterial>[0],
) => {
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  geom: THREE.PlaneGeometry,
  mat: THREE.ShaderMaterial,
  mesh: THREE.Mesh
}
