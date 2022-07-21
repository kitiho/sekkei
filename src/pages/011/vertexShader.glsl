uniform float time;
varying vec2 vUv;
varying float vWave;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
void main() {
  vUv = uv;
  vec3 pos = position;
  float noiseFreq = 1.5;
  float noiseScale = 0.55;
  vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
  pos.z += snoise3(noisePos) * noiseScale;
  vWave = pos.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
