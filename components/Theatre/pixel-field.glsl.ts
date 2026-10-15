/** Full-screen quad: no camera needed, the plane already covers clip space. */
export const vertexShader = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * 8-bit "pixel field": slow fbm noise + a glow that follows the pointer,
 * snapped to a coarse pixel grid and quantized to a 4-color palette with
 * 4x4 Bayer ordered dithering. Palette index 0 is transparent.
 */
export const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPixel;
uniform vec3 uPalette[4];

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPixel);
  vec2 uv = (cell + 0.5) * uPixel / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Drifting nebula
  float n = fbm(p * 2.5 + vec2(uTime * 0.04, uTime * 0.025));
  n = smoothstep(0.35, 0.85, n);
  // Keep the headline side (left) calm so text stays readable
  n *= mix(0.3, 1.0, smoothstep(0.2, 0.7, uv.x));

  // Glow under the pointer
  float d = length((uv - uPointer) * vec2(aspect, 1.0));
  float glow = smoothstep(0.45, 0.0, d);

  // Fade toward the edges so the section blends into the page
  float vignette = smoothstep(0.95, 0.25, length((uv - 0.5) * vec2(aspect * 0.8, 1.0)));

  float v = clamp((n * 0.65 + glow * 0.5) * vignette, 0.0, 1.0);

  // Quantize with ordered dithering: 0..3
  float level = v * 3.0 + (bayer4(cell) - 0.5);
  int idx = int(clamp(floor(level + 0.5), 0.0, 3.0));

  // Rare twinkling stars
  float star = hash(cell + floor(uTime * 1.5));
  if (star > 0.9985 && vignette > 0.2) idx = 3;

  if (idx == 0) discard;
  gl_FragColor = vec4(uPalette[idx], 1.0);
}
`;
