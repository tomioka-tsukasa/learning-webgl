import * as THREE from 'three'
import { SetupFullScreen } from './types'

export const setupFullScreen: SetupFullScreen = (
  camera,
  size
) => {
  /**
   * PlaneGeometryをcanvasいっぱいに表示する関数
   * ※ 隣辺: as(adjacent side), 対辺: os(opposite side), 斜辺: ht(hypotenuse)
   */

  const os = size.height / 2
  const radian = ( (camera.fov / 2) / 180 ) * Math.PI
  const theta = Math.tan(radian)
  const distance = os / theta

  /**
   * setup
   */
  return {
    planeGeom: new THREE.PlaneGeometry(
      size.width,
      size.height
    ),
    cameraDistance: distance
  }
}

/**
 * 【公式】
 * tan(視野角/2) = 対辺(windowの半分の長さ) / 隣辺(カメラの距離)
 * 隣辺(カメラの距離) = 対辺(windowの半分の長さ) / tan(視野角/2)
 *
 * 【補足】
 * [ windowの中心角、cameraの頂点、windowの端 ] これらで結ばれた直角三角形で計算。
 * 対辺と隣辺が使えるので tan で計算。
 *
 * 【実数に割り当て】
 * distance = 隣辺(カメラの距離)
 * window.innerHeight / 2 = 対辺(windowの半分の長さ)
 * 視野角/2(θ) = camera.fov / 2 [度]
 * θ[rad] = ( (camera.fov / 2) / 180 ) * PI
 */

/**
 * ラジアン
 * - - - -
 *
 * 1rad = l(孤の長さ) / r(半径)
 * 1rad = 孤の長さが半径と同じ時の中心角 = 約57.29578度
 *
 * 【孤の長さが円周の半分の時】
 * l = PI * r
 * 1rad = (PI * r) / r
 * 1rad = PI
 *
 * 【度数法に対応させる】
 * 180度 = PI[rad]
 * 360度 = 2PI[rad]
 *
 * 【公式】
 * θ[rad] = (角度 / 180) * PI
 */
