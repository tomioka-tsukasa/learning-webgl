import * as THREE from 'three'

export type InitCtrl = (
  shmatParams: THREE.ShaderMaterial,
  shmatParamsOriginal?: THREE.ShaderMaterial
) => void
