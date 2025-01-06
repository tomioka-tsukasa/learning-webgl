import * as THREE from 'three'
import { TextureLoader } from './types'

export const textureLoader: TextureLoader = async (
  url
) => {
  const texture = await new THREE.TextureLoader().loadAsync(
    url,
  )
  texture.generateMipmaps = false
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter

  return texture
}
