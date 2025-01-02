varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv, 0.5, 1.0); // three.js 0.152.0 対応 透明度を1.0に変更
}
