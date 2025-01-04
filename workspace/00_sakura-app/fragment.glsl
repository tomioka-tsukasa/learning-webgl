varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uOverlay;
uniform float uTick;
uniform float uSaPinkStrength;
uniform float uSaPinkRange;
uniform float uSaPinkToggle;
uniform float uLiStrength;
uniform float uLiToggle;
uniform float uLiRange;
uniform float uColdStrength;
uniform float uColdToggle;
uniform float uWarmStrength;
uniform float uWarmToggle;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
#pragma glslify: rgb2hsl = require(../../src/glsl/pragma/rgb2hsl)

vec3 saPink(vec3 hsl, float range, float strength) {
  strength = mix(0., 3., strength);

  if (hsl.x > 0.85 || hsl.x < 0.1) {
    if (hsl.y < range) {
      hsl.y = min(hsl.y * strength, 1.0);
    }
  }

  return hsl;
}

vec3 lightFix(vec3 hsl, float range, float strength) {
  strength = mix(.75, 1.75, strength);

  if (hsl.z < range) {
    hsl.z *= (strength + .2);
  }

  hsl.z *= strength;

  return hsl;
}

vec3 coldColor(vec3 color, float strength) {
  strength = mix(1., 1.5, strength);

  float rRate = 0.96;
  float gRate = 0.96;
  float bRate = 1.0;

  color = vec3(color.r * strength * rRate, color.g * strength * gRate, color.b * (strength + (strength - 1.)) * bRate);

  return color;
}

vec3 warmColor(vec3 color, float strength) {
  strength = mix(1., 3., strength);

  float rRate = 1.;
  float gRate = .904;
  float bRate = .92;

  color = vec3(color.r * strength * rRate, color.g * strength * gRate, color.b * strength * bRate);

  return color;
}

vec4 overlay(vec4 base, vec4 overlay, float strength) {
  vec3 blend = 1.0 - (1.0 - base.rgb) * (1.0 - overlay.rgb);
  blend = mix(base.rgb, blend, strength);

  return vec4(blend, 1.);
}

void main() {
  float tick = uTick * .01;
  float saPinkSt = uSaPinkStrength;
  float saPinkRa = uSaPinkRange;
  float saPinkToggle = uSaPinkToggle;
  float liStrength = uLiStrength;
  float liRange = uLiRange;
  float liToggle = uLiToggle;
  float coldStrength = uColdStrength;
  float coldToggle = uColdToggle;
  float warmStrength = uWarmStrength;
  float warmToggle = uWarmToggle;
  const float blendStrength = .6;

  vec4 baseTex = texture2D(uTex, vUv);
  vec4 overlayTex = texture2D(uOverlay, vUv);

  vec3 hsl = rgb2hsl(baseTex.rgb);

  if (saPinkToggle == 1.0) {
    hsl = saPink(hsl, saPinkRa, saPinkSt);
  }

  if (liToggle == 1.0) {
    hsl = lightFix(hsl, liRange, liStrength);
  }

  vec3 color = hsl2rgb(hsl);

  if (coldToggle == 1.0) {
    color = coldColor(color, uColdStrength);
  }

  if (warmToggle == 1.0) {
    color = warmColor(color, uWarmStrength);
  }

  vec4 blendColor = overlay(baseTex, overlayTex, blendStrength);

  gl_FragColor = vec4(color.rgb, baseTex.a);
  // gl_FragColor = blendColor;
}
