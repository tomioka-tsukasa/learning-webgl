import * as THREE from 'three'
import { SetupShaderFullCanvas } from './types'
import { setupFullScreen } from '@/webgl/setup/three/setupFullScreen'

/**
 * Canvasと同じサイズのPlaneGeometryを描画するセットアップ関数
 *
 * @returns {{
 *   scene: THREE.Scene,
 *   camera: THREE.PerspectiveCamera,
 *   geom: THREE.PlaneGeometry,
 *   mat: THREE.ShaderMaterial,
 *   mesh: THREE.Mesh
 * }}
 */
export const setupShaderFullCanvas: SetupShaderFullCanvas = (
  canvas,
  shaderMaterialParams,
) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  )

  const { planeGeom, cameraDistance } = setupFullScreen(
    camera,
    {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    }
  )

  camera.position.z = cameraDistance
  const geom = planeGeom
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    precision: 'highp',
    ...shaderMaterialParams,
  })
  const mesh = new THREE.Mesh(geom, mat)

  scene.add(mesh)

  return {
    scene,
    camera,
    geom,
    mat,
    mesh,
  }
}
