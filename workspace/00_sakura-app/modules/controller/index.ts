import { GUI } from 'lil-gui'
import { InitCtrl } from './types'
import { selectImage, strengthGui, strengthRangeGui } from './setter'
import { ctrlMember } from './member'

export const initCtrl: InitCtrl = (
  shmatParams,
  shmatParamsOriginal,
) => {
  const gui = new GUI({
    title: '【Controller】 開く / 閉じる'
  })

  selectImage(
    ctrlMember.selectImage.name,
    gui,
    ctrlMember.selectImage,
    shmatParams,
    shmatParamsOriginal,
  )

  strengthGui(
    ctrlMember.sakuraFilter.name,
    gui,
    ctrlMember.sakuraFilter.values,
    shmatParams,
    ctrlMember.sakuraFilter.uniforms,
  )

  strengthRangeGui(
    ctrlMember.strengthPink.name,
    gui,
    ctrlMember.strengthPink.values,
    shmatParams,
    ctrlMember.strengthPink.uniforms,
  )

  strengthGui(
    ctrlMember.exposure.name,
    gui,
    ctrlMember.exposure.values,
    shmatParams,
    ctrlMember.exposure.uniforms,
  )

  strengthGui(
    ctrlMember.highlights.name,
    gui,
    ctrlMember.highlights.values,
    shmatParams,
    ctrlMember.highlights.uniforms,
  )

  strengthGui(
    ctrlMember.shadows.name,
    gui,
    ctrlMember.shadows.values,
    shmatParams,
    ctrlMember.shadows.uniforms,
  )

  strengthGui(
    ctrlMember.contrast.name,
    gui,
    ctrlMember.contrast.values,
    shmatParams,
    ctrlMember.contrast.uniforms,
  )

  strengthGui(
    ctrlMember.brilliance.name,
    gui,
    ctrlMember.brilliance.values,
    shmatParams,
    ctrlMember.brilliance.uniforms,
  )

  strengthGui(
    ctrlMember.rStrength.name,
    gui,
    ctrlMember.rStrength.values,
    shmatParams,
    ctrlMember.rStrength.uniforms,
  )

  strengthGui(
    ctrlMember.gStrength.name,
    gui,
    ctrlMember.gStrength.values,
    shmatParams,
    ctrlMember.gStrength.uniforms,
  )

  strengthGui(
    ctrlMember.bStrength.name,
    gui,
    ctrlMember.bStrength.values,
    shmatParams,
    ctrlMember.bStrength.uniforms,
  )
}
