import * as THREE from 'three'
import { GUI } from 'lil-gui'

export type StrengthGui = (
  name: string,
  rootFolder: GUI,
  params: StrengthParams,
  shmatParams: THREE.ShaderMaterial,
  uniforms: {
    st: string,
    to: string,
  },
) => GUI

export type StrengthParams = {
  st: {
    name: string,
    target: {
      value: number
    },
    min: number,
    max: number,
  },
  to: {
    name: string,
    value: boolean,
  }
}

export type StrengthRangeGui = (
  name: string,
  rootFolder: GUI,
  params: StrengthRangeParams,
  shmatParams: THREE.ShaderMaterial,
  uniforms: {
    st: string,
    ra: string,
    to: string,
  },
) => GUI

export type StrengthRangeParams = {
  st: {
    name: string,
    target: {
      value: number
    },
    min: number,
    max: number,
  },
  ra: {
    name: string,
    target: {
      value: number
    },
    min: number,
    max: number,
  },
  to: {
    name: string,
    value: boolean,
  }
}

export type SelectImage = (
  name: string,
  rootFolder: GUI,
  params: SelectImageParams,
  shmatParams: THREE.ShaderMaterial,
  shmatParamsOriginal?: THREE.ShaderMaterial
) => GUI

export type SelectImageParams = {
  name: string,
  default: string,
  values: {
    [key: string]: string
  },
}
