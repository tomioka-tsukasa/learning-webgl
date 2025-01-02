import * as THREE from 'three'
import { TextureLoader } from './types'

export const textureLoader: TextureLoader = async (
  url
) => {
  const texture = new THREE.TextureLoader().loadAsync(
    url,
  )
  return texture
}
