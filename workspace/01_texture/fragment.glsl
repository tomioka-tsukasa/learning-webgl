varying vec2 vUv;
varying vec3 vPos;
uniform sampler2D uTex;
uniform float uTick;

#pragma glslify: hsl = require(glsl-hsl2rgb)
// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
// #pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
// #pragma glslify: cnoise2 = require(glsl-noise/classic/2d)
// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
// #pragma glslify: cnoise4 = require(glsl-noise/classic/4d)
// #pragma glslify: pnoise2 = require(glsl-noise/periodic/2d)
// #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)
// #pragma glslify: pnoise4 = require(glsl-noise/periodic/4d)

void main() {
  float tick = uTick * 0.01;
  float time = sin(tick);

  // vec2 -> vec3 に変換し、周期 vec3(1.0, 1.0, 1.0) を指定
  vec3 period = vec3(time, 1.0, 1.0);

  // pnoise3 を正しい引数で呼び出す
  float noise = snoise3(vec3(vUv * vec2(1., 5.), time));
  // noise: -1.0 ～ 1.0 を 0.0 ～ 1.0 にリマップ
  noise = noise * 2.;

  // timeに基づいてノイズを減少させる（timeが進むにつれて1.0に近づく）
  // float fadeAmount = min(tick * 0.5, 1.0);  // 時間が経過するにつれて1.0に近づく
  // noise = mix(noise, 1., fadeAmount);  // noise を 1.0 に近づける

  // vec4 texColor = texture(uTex, vec2(vUv.x * (noise + 1.), vUv.y * (noise + 1.)));
  vec4 texColor = texture(uTex, vUv * noise * noise * noise);

  // 結果をカラーに反映
  // gl_FragColor = vec4(vec3(texColor.rgb + noise), 1.);
  gl_FragColor = vec4(texColor.rgb, 1.);

  // time = tick * 0.5;

  // vec4 texColor = texture(uTex, vUv);

  // vec4 color = vec4(0., 0., 0., 1.);
  // vec3 hlsColor = hsl(fract(vUv.x * (time / 2. + .5)), 1., 0.7);
  // color = vec4(hlsColor, 1.);
  // gl_FragColor = color;

  // texColor = texture(uTex, fract(vUv * 4. * max(0.25, (time / 2.) + 0.5)));
  // texColor = texture(uTex, fract(vUv * 12.));
  // gl_FragColor = texColor;

  // vec4 color = vec4(0., 0., 0., 1.);
  // color.r = texture(uTex, vUv + vec2(time, 0)).r;
  // color.g = texture(uTex, vUv + vec2(0, time)).g;
  // color.b = texture(uTex, vUv + vec2(0, 0)).b;
  // gl_FragColor = color;

  // float len = smoothstep(0.99, 1.0, length(vPos));
  // float circle = 1. - len;
  // gl_FragColor = vec4(texColor.rgb * circle, 1.0);
}
