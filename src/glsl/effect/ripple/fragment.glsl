varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

/**
setup
*/
const float SPEED = .03;
const float WAVE_NUM = 10.0;
const float WAVE_WIDTH = 1.25; // > 1.
const float WAVE_DEPTH = .5; // max = 1.
const float DECREASE_POWER = .2;
const float TOGGLE_DECREASE = 1.; // true = 1. || false = 0.
const vec2 EPICENTER = vec2(-.5, -.5);

/**
program
*/
#pragma glslify: ease = require(glsl-easings/cubic-in-out)

void main() {
  float tick = uTick * SPEED;

  float dist = length(vUv + EPICENTER);
  float decrease = ease(-1. * clamp(tick * .08, 0., 1.) + 1.);
  if (TOGGLE_DECREASE == 0.) decrease = 1.;
  float interval = sin(dist * WAVE_NUM - tick);
  float wave = smoothstep(
    1. / WAVE_WIDTH,
    1. / WAVE_DEPTH + (1. - decrease),
    abs(interval)
  );
  float ripple = 1. + (wave * decrease);

  vec4 texColor = texture2D(uTex, vUv * ripple);
  gl_FragColor = vec4(texColor.rgb, 1.);
}
