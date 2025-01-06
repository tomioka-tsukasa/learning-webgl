varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uOverlay;
uniform float uTick;
uniform float uStPinkSt;
uniform float uStPinkRa;
uniform float uStPinkTo;
uniform float uSakuraSt;
uniform float uSakuraTo;
uniform float uExSt;
uniform float uExTo;
uniform float uHlSt;
uniform float uHlTo;
uniform float uShSt;
uniform float uShTo;
uniform float uCtSt;
uniform float uCtTo;
uniform float uBrSt;
uniform float uBrTo;
uniform float uRSt;
uniform float uRTo;
uniform float uGSt;
uniform float uGTo;
uniform float uBSt;
uniform float uBTo;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
#pragma glslify: rgb2hsl = require(../../src/glsl/pragma/rgb2hsl)

vec3 sakuraFilter(vec3 color, float strength) {
  float orSt = strength;
  float total = 0.847 + 0.718 + 0.806; // 2.371
  float rRate = 0.847 / total * 2.79929161749;
  float gRate = 0.718 / total * 2.79929161749;
  float bRate = 0.806 / total * 2.79929161749;

  strength = mix(1., 3., orSt);

  color = vec3(
    clamp(color.r * rRate * strength, 0., 1.),
    clamp(color.g * gRate * strength, 0., 1.),
    clamp(color.b * bRate * strength, 0., 1.)
  );

  return color;
}

vec3 stPink(vec3 hsl, float range, float strength) {
  strength = strength / 2. + .5;
  strength = mix(0., 2., strength);

  if (strength > 1.) {
    strength *= 1.5;
  }

  if (hsl.x > 0.85 || hsl.x < 0.1) {
    if (hsl.y < range) {
      hsl.y = min(hsl.y * strength, 1.0);
    }
  }

  return hsl;
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

vec3 exposure(vec3 color, float strength) {
  return color * (pow(2., strength));
}

vec3 highlights(vec3 color, float amount) {
  float highlight = smoothstep(0.3, 1.0, max(color.r, max(color.g, color.b)));
  return mix(color, color * (1.0 + amount), highlight);
}

vec3 shadows(vec3 color, float amount) {
  float amp = 2.;
  float shadow = smoothstep(0.0, 0.5, max(color.r, max(color.g, color.b)));
  return mix(color, color * (1.0 + amount * amp), 1.0 - shadow);
}

vec3 contrast(vec3 color, float amount) {
  color = mix(vec3(0.75), color, clamp(amount + 1.0, .5, 2.));
  return clamp(color, 0.0, 1.0);
}

vec3 brilliance(vec3 color, float amount) {
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 adjustment = mix(vec3(1.0), vec3(1.0 + amount), smoothstep(0.0, 0.5, luminance));
  return color * adjustment;
}

void main() {
  float tick = uTick * .01;
  const float blendStrength = .6;

  vec4 baseTex = texture2D(uTex, vUv);
  vec4 overlayTex = texture2D(uOverlay, vUv);

  vec3 hsl = rgb2hsl(baseTex.rgb);

  if (uStPinkTo == 1.0) {
    hsl = stPink(hsl, uStPinkRa, uStPinkSt);
  }

  vec3 color = hsl2rgb(hsl);

  if (uSakuraTo == 1.0) {
    color = sakuraFilter(color, uSakuraSt);
  }

  if (uRTo == 1.0) {
    float rSt = uRSt + 1.;
    color = vec3(clamp(color.r * rSt, 0., 1.), color.g, color.b);
  }

  if (uGTo == 1.0) {
    float gSt = uGSt + 1.;
    color = vec3(color.r, clamp(color.g * gSt, 0., 1.), color.b);
  }

  if (uBTo == 1.0) {
    float bSt = uBSt + 1.;
    color = vec3(color.r, color.g, clamp(color.b * bSt, 0., 1.));
  }

  if (uExTo == 1.0) {
    color = exposure(color, uExSt);
  }

  if (uHlTo == 1.0) {
    color = highlights(color, uHlSt);
  }

  if (uShTo == 1.0) {
    color = shadows(color, uShSt);
  }

  if (uCtTo == 1.0) {
    color = contrast(color, uCtSt);
  }

  if (uBrTo == 1.0) {
    color = brilliance(color, uBrSt);
  }

  gl_FragColor = vec4(color.rgb, baseTex.a);

  // sketchEffect(baseTex, uTex, vUv, color);

  // vec4 blendColor = overlay(baseTex, overlayTex, blendStrength);
  // gl_FragColor = blendColor;
}
