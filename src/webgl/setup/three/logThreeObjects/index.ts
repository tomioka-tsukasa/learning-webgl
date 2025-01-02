import * as THREE from 'three'

export const logThreeObjects = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  geom: THREE.PlaneGeometry,
  mat: THREE.ShaderMaterial,
  mesh: THREE.Mesh,
) => {
  console.group('Three Objects Log.')
  console.log('scene', scene); console.log('camera', camera); console.log('geom', geom); console.log('mat', mat); console.log('mesh', mesh)
  console.groupEnd()
}
