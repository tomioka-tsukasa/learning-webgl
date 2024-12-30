import { webglSetup } from './setup'
import vertShaderSource from './glsl/test/vertex.glsl'
import fragShaderSource from './glsl/test/fragment.glsl'

document.addEventListener('DOMContentLoaded', () => {
  webglSetup(
    vertShaderSource,
    fragShaderSource
  )
})
