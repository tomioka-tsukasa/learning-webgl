varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uOverlay;
uniform float uTick;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
#pragma glslify: rgb2hsl = require(../../src/glsl/pragma/rgb2hsl)

void main() {
  float tick = uTick * .01;
  const float blendStrength = .3;

  vec4 texColor = texture2D(uTex, vUv);
  vec4 overlayColor = texture2D(uOverlay, vUv);

  // RGBからHSVへ
  vec3 hsl = rgb2hsl(texColor.rgb);

  // ピンクの色相範囲 (大まかに調整)
  if (hsl.x > 0.85 || hsl.x < 0.1) {
    if (hsl.y < .3) {
      hsl.y = min(hsl.y * 1.2, 1.0);  // 彩度を強調
    }
  }

  if (hsl.z < .4) {
    hsl.z *= 1.3;
  }

  hsl.z *= 1.1;

  // HSVからRGBへ戻す
  vec3 baseColor = hsl2rgb(hsl);

  // baseColor = vec3(baseColor.r * 1.25, baseColor.g * 1.13, baseColor.b * 1.15);
  baseColor = vec3(baseColor.r * 1.15, baseColor.g * 1.15, baseColor.b * 1.25);

  // スクリーンブレンドモードの例
  vec3 blendedColor = 1.0 - (1.0 - baseColor.rgb) * (1.0 - overlayColor.rgb);
  blendedColor = mix(baseColor.rgb, blendedColor, blendStrength);  // 強さを調整

  gl_FragColor = vec4(blendedColor, texColor.a);

  gl_FragColor = vec4(baseColor.rgb, texColor.a);
  // gl_FragColor = vec4(texColor.rgb, texColor.a);
}
