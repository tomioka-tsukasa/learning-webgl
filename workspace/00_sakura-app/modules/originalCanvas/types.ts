import * as THREE from 'three'

export type Setup = (
) => Promise<{
  canvas: HTMLCanvasElement,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  geom: THREE.PlaneGeometry,
  mat: THREE.ShaderMaterial,
  mesh: THREE.Mesh
} | null>
