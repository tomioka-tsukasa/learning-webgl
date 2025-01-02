import * as THREE from 'three'

export type SetupFullScreen = (
  camera: THREE.PerspectiveCamera,
  size: {
    width: number,
    height: number
  }
) => {
  planeGeom: THREE.PlaneGeometry,
  cameraDistance: number
}
