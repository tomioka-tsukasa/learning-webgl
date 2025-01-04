varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

void main() {
  vec4 baseTex = texture2D(uTex, vUv);
  gl_FragColor = baseTex;
}
