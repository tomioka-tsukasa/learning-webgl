import { SelectImage, StrengthGui, StrengthRangeGui } from './types'
import { textureLoader } from '@/webgl/setup/three/textureLoader'

export const strengthGui: StrengthGui = (
  name,
  rootFolder,
  params,
  shmatParams,
  uName,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    params.st.target,
    'value',
    params.st.min,
    params.st.max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms[uName.st].value = value
  }).name('強さ')

  folder.add(
    params.to,
    'value',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms[uName.to].value = Number(value)
  })

  return folder
}

export const strengthRangeGui: StrengthRangeGui = (
  name,
  rootFolder,
  params,
  shmatParams,
  uName,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    params.st.target,
    'value',
    params.st.min,
    params.st.max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms[uName.st].value = value
  }).name('強さ')

  folder.add(
    params.ra.target,
    'value',
    params.ra.min,
    params.ra.max,
  ).onChange( (value: number) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms[uName.ra].value = value
  }).name('範囲')

  folder.add(
    params.to,
    'value',
  ).onChange( (value: boolean) => {
    if (!shmatParams || !shmatParams.uniforms) return
    shmatParams.uniforms[uName.to].value = Number(value)
  })

  return folder
}

export const selectImage: SelectImage = (
  name,
  rootFolder,
  params,
  shmatParams,
  shmatParamsOriginal,
) => {
  const folder = rootFolder.addFolder(name)
  folder.open()

  folder.add(
    params,
    'default',
    params.values
  ).onChange( async (value: string) => {
    if (!shmatParams || !shmatParams.uniforms) return

    shmatParams.uniforms.uTex.value = await textureLoader(value)

    if (shmatParamsOriginal && shmatParamsOriginal.uniforms) shmatParamsOriginal.uniforms.uTex.value = await textureLoader(value)
  }).name('選択画像')

  return folder
}
