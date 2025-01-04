import * as THREE from 'three'
import { GUI } from 'lil-gui'

export type DatGui = (
  shmatParams: THREE.ShaderMaterial,
  shmatParamsOriginal?: THREE.ShaderMaterial
) => void

export type CreateFolder = (
  name: string,
  rootFolder: GUI,
  shmatParams: THREE.ShaderMaterial,
  shmatParamsOriginal?: THREE.ShaderMaterial
) => GUI
