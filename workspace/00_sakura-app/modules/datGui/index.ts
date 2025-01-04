import { GUI } from 'lil-gui'
import { CreateFolder, DatGui } from './types'
import { textureLoader } from '@/webgl/setup/three/textureLoader'

export const datGuiParams = {
  '画像選択': {
    default: '/images/sakura-sample-001.jpg',
    selects: [
      '/images/sakura-sample-001.jpg',
      '/images/sakura-sample-002.jpg',
      '/images/sakura-sample-003.jpg',
    ],
  },
  '明るさ': {
    '範囲': {
      target: {
        value: 0.25
      },
      min: 0.0,
      max: 1.0,
    },
    '強さ': {
      target: {
        value: 0.432
      },
      min: 0.0,
      max: 1.0,
    },
    'オン/オフ': true,
  },
  'ピンク強度': {
    '範囲': {
      target: {
        value: 0.277
      },
      min: 0.0,
      max: 1.0,
    },
    '強さ': {
      target: {
        value: 0.44
      },
      min: 0.0,
      max: 1.0,
    },
    'オン/オフ': true,
  },
  '寒色フィルター': {
    '強さ': {
      target: {
        value: .186
      },
      min: 0.0,
      max: 1.0,
    },
    'オン/オフ': true,
  },
  '暖色フィルター': {
    '強さ': {
      target: {
        value: .18
      },
      min: 0.0,
      max: 1.0,
    },
    'オン/オフ': false,
  },
}

export const datGui: DatGui = (
  shmatParams,
  shmatParamsOriginal,
) => {
  const gui = new GUI()

  selectImage(
    '画像選択',
    gui,
    shmatParams,
    shmatParamsOriginal,
  )

  light(
    '明るさ',
    gui,
    shmatParams,
  )

  saPink(
    'ピンク強度',
    gui,
    shmatParams,
  )

  coldFilder(
    '寒色フィルター',
    gui,
    shmatParams,
  )

  warmFilder(
    '暖色フィルター',
    gui,
    shmatParams,
  )
}

const light: CreateFolder = (
  name,
  rootFolder,
  shmatParams,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    datGuiParams['明るさ']['強さ'].target,
    'value',
    datGuiParams['明るさ']['強さ'].min,
    datGuiParams['明るさ']['強さ'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uLiStrength.value = value
  }).name('強さ')

  folder.add(
    datGuiParams['明るさ']['範囲'].target,
    'value',
    datGuiParams['明るさ']['範囲'].min,
    datGuiParams['明るさ']['範囲'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uLiRange.value = value
  }).name('範囲')

  folder.add(
    datGuiParams['明るさ'],
    'オン/オフ',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    console.log(Number(value))
    shmatParams.uniforms.uLiToggle.value = Number(value)
  })

  return folder
}

const saPink: CreateFolder = (
  name,
  rootFolder,
  shmatParams,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    datGuiParams['ピンク強度']['強さ'].target,
    'value',
    datGuiParams['ピンク強度']['強さ'].min,
    datGuiParams['ピンク強度']['強さ'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    console.log(
      shmatParams.uniforms.uSaPinkStrength.value
    )
    shmatParams.uniforms.uSaPinkStrength.value = value
  }).name('強さ')

  folder.add(
    datGuiParams['ピンク強度']['範囲'].target,
    'value',
    datGuiParams['ピンク強度']['範囲'].min,
    datGuiParams['ピンク強度']['範囲'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uSaPinkRange.value = value
  }).name('範囲')

  folder.add(
    datGuiParams['ピンク強度'],
    'オン/オフ',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uSaPinkToggle.value = Number(value)
  })

  return folder
}

const selectImage: CreateFolder = (
  name,
  rootFolder,
  shmatParams,
  shmatParamsOriginal,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    datGuiParams['画像選択'],
    'default',
    datGuiParams['画像選択'].selects
  ).onChange( async (value: string) => {
    if (!shmatParams || !shmatParams.uniforms) return

    shmatParams.uniforms.uTex.value = await textureLoader(value)

    if (shmatParamsOriginal && shmatParamsOriginal.uniforms) shmatParamsOriginal.uniforms.uTex.value = await textureLoader(value)
  }).name('選択画像')

  return folder
}

const coldFilder: CreateFolder = (
  name,
  rootFolder,
  shmatParams,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    datGuiParams['寒色フィルター']['強さ'].target,
    'value',
    datGuiParams['寒色フィルター']['強さ'].min,
    datGuiParams['寒色フィルター']['強さ'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uColdStrength.value = value
  }).name('強さ')

  folder.add(
    datGuiParams['寒色フィルター'],
    'オン/オフ',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uColdToggle.value = Number(value)
  })

  return folder
}

const warmFilder: CreateFolder = (
  name,
  rootFolder,
  shmatParams,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    datGuiParams['暖色フィルター']['強さ'].target,
    'value',
    datGuiParams['暖色フィルター']['強さ'].min,
    datGuiParams['暖色フィルター']['強さ'].max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uWarmStrength.value = value
  }).name('強さ')

  folder.add(
    datGuiParams['暖色フィルター'],
    'オン/オフ',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms.uWarmToggle.value = Number(value)
  })

  return folder
}
