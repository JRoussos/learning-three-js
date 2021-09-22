const vertex = `
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 resolution;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}`

const fragment = `
varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D disp;
uniform vec2 resolution;
uniform vec2 uMouse;
uniform vec2 lastUMouse;

float circle(vec2 _st, float _radius, float blurriness){
  vec2 dist = _st;
  return 1.0 - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), sqrt(dot(dist,dist) * 4.0));
}

void main()  {
  vec2 newUV = (vUv - vec2(0.5))*vec2(0.8) + vec2(0.5); // zoom in a little to avoid the stretch on the sides when the mouse passes over

  float dist = distance(vPosition.xy, uMouse);
  float intensity = distance(uMouse, lastUMouse) * 0.2;

  float circle = circle(vec2(intensity, dist), 0.15, 8.0) * intensity;
  
  vec2 zoomedUV = mix(newUV, uMouse + vec2(2.0), circle);
  
  float r = texture2D(disp, zoomedUV += (circle*1.01)).x;
  float g = texture2D(disp, zoomedUV += (circle*1.02)).y;
  float b = texture2D(disp, zoomedUV += (circle*1.03)).z;

  gl_FragColor = vec4(r, g, b, 1.);
}`

export { vertex, fragment }