import * as THREE from 'three'
import { SetupShaderCanvas } from './types'
import { setupFullScreen } from '@/utility/setupFullScreen'

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
export const setupShaderCanvas: SetupShaderCanvas = (
  canvas,
  shaderMaterialParams,
) => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
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
  const mat = new THREE.ShaderMaterial(shaderMaterialParams)
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
