import * as THREE from 'three'

export type TextureLoader = (
  url: string
) => Promise<THREE.Texture>
