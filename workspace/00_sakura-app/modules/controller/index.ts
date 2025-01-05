import { GUI } from 'lil-gui'
import { InitCtrl } from './types'
import { selectImage, strengthGui, strengthRangeGui } from './setter'
import { ctrlMember } from './member'

export const initCtrl: InitCtrl = (
  shmatParams,
  shmatParamsOriginal,
) => {
  const gui = new GUI()

  selectImage(
    ctrlMember.selectImage.name,
    gui,
    ctrlMember.selectImage,
    shmatParams,
    shmatParamsOriginal,
  )

  strengthRangeGui(
    ctrlMember.lightness.name,
    gui,
    ctrlMember.lightness.values,
    shmatParams,
    ctrlMember.lightness.uniforms,
  )

  strengthRangeGui(
    ctrlMember.strengthPink.name,
    gui,
    ctrlMember.strengthPink.values,
    shmatParams,
    ctrlMember.strengthPink.uniforms,
  )

  strengthGui(
    ctrlMember.coldFilter.name,
    gui,
    ctrlMember.coldFilter.values,
    shmatParams,
    ctrlMember.coldFilter.uniforms,
  )

  strengthGui(
    ctrlMember.warmFilter.name,
    gui,
    ctrlMember.warmFilter.values,
    shmatParams,
    ctrlMember.warmFilter.uniforms,
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
