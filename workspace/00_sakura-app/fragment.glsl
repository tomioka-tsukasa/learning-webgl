varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uOverlay;
uniform float uTick;
uniform float uLiSt;
uniform float uLiRa;
uniform float uLiTo;
uniform float uStPinkSt;
uniform float uStPinkRa;
uniform float uStPinkTo;
uniform float uColdSt;
uniform float uColdTo;
uniform float uWarmSt;
uniform float uWarmTo;
uniform float uRSt;
uniform float uRTo;
uniform float uGSt;
uniform float uGTo;
uniform float uBSt;
uniform float uBTo;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
#pragma glslify: rgb2hsl = require(../../src/glsl/pragma/rgb2hsl)

vec3 stPink(vec3 hsl, float range, float strength) {
  strength = mix(0., 3., strength);

  if (hsl.x > 0.85 || hsl.x < 0.1) {
    if (hsl.y < range) {
      hsl.y = min(hsl.y * strength, 1.0);
    }
  }

  return hsl;
}

vec3 lightFix(vec3 hsl, float range, float strength) {
  strength = mix(1., 2., strength);

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
  float gRate = .84;
  float bRate = .904;

  color = vec3(color.r * strength * rRate, color.g * strength * gRate, color.b * strength * bRate);

  return color;
}

vec4 overlay(vec4 base, vec4 overlay, float strength) {
  vec3 blend = 1.0 - (1.0 - base.rgb) * (1.0 - overlay.rgb);
  blend = mix(base.rgb, blend, strength);

  return vec4(blend, 1.);
}

float edgeDetection(sampler2D uTex, vec2 uv, vec2 textureSize) {
  vec2 texel = vec2(1.0 / textureSize.x, 1.0 / textureSize.y);
  mat3 sobelX = mat3(
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
  );
  mat3 sobelY = mat3(
    -1, -2, -1,
     0,  0,  0,
     1,  2,  1
  );

  float gx = 0.0;
  float gy = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec4 color = texture2D(uTex, uv + texel * vec2(x, y));
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      gx += sobelX[y + 1][x + 1] * gray;
      gy += sobelY[y + 1][x + 1] * gray;
    }
  }

  return sqrt(gx * gx + gy * gy);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float sketch(sampler2D uTex, vec2 uv, vec2 textureSize) {
  vec2 texel = vec2(1.0 / textureSize.x, 1.0 / textureSize.y);
  float edge = edgeDetection(uTex, uv, textureSize);

  // ノイズを使って線の太さをランダムに変更
  float noiseFactor = random(uv * textureSize * 30.); // UV座標に基づくノイズ
  float lineThickness = smoothstep(0.0, 1.0, noiseFactor); // 太さの変化を調整

  // ハッチングパターンの生成
  float angle1 = sin(uv.x * textureSize.x + uv.y * textureSize.y + noiseFactor);  // 斜めの細かい線
  float angle2 = sin(uv.y);  // 横方向の線
  float hatching = smoothstep(.1, .3, edge) * (angle1 + angle2) * lineThickness * 3.;

  // コントラストの調整
  return clamp(hatching, 0.0, 1.0);
}

void sketchEffect(vec4 baseTex, sampler2D uTex, vec2 vUv, vec3 color) {
  float sketch = sketch(uTex, vUv, vec2(800.0, 600.0));
  gl_FragColor = vec4(vec3(color + sketch * .46), baseTex.a);
}

void main() {
  float tick = uTick * .01;
  float liSt = uLiSt;
  float liRa = uLiRa;
  float liTo = uLiTo;
  float stPinkSt = uStPinkSt;
  float stPinkRa = uStPinkRa;
  float stPinkTo = uStPinkTo;
  float coldSt = uColdSt;
  float coldTo = uColdTo;
  float warmSt = uWarmSt;
  float warmTo = uWarmTo;
  float rSt = uRSt;
  float rTo = uRTo;
  float gSt = uGSt;
  float gTo = uGTo;
  float bSt = uBSt;
  float bTo = uBTo;
  const float blendStrength = .6;

  vec4 baseTex = texture2D(uTex, vUv);
  vec4 overlayTex = texture2D(uOverlay, vUv);

  vec3 hsl = rgb2hsl(baseTex.rgb);

  if (stPinkTo == 1.0) {
    hsl = stPink(hsl, stPinkRa, stPinkSt);
  }

  if (liTo == 1.0) {
    hsl = lightFix(hsl, liRa, liSt);
  }

  vec3 color = hsl2rgb(hsl);

  if (coldTo == 1.0) {
    color = coldColor(color, uColdSt);
  }

  if (warmTo == 1.0) {
    color = warmColor(color, uWarmSt);
  }

  if (rTo == 1.0) {
    color = vec3(clamp(color.r * 2. * rSt, 0., 1.), color.g, color.b);
  }

  if (gTo == 1.0) {
    color = vec3(color.r, clamp(color.g * 2. * gSt, 0., 1.), color.b);
  }

  if (bTo == 1.0) {
    color = vec3(color.r, color.g, clamp(color.b * 2. * bSt, 0., 1.));
  }

  vec4 blendColor = overlay(baseTex, overlayTex, blendStrength);

  gl_FragColor = vec4(color.rgb, baseTex.a);

  // sketchEffect(baseTex, uTex, vUv, color);
  // gl_FragColor = blendColor;
}
