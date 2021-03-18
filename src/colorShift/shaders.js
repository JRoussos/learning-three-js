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

uniform float pr;

float circle(vec2 _st, float _radius, float blurriness){
  vec2 dist = _st;
  return 1.0 - smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), sqrt(dot(dist,dist) * 4.0));
}

float map(float value, float min1, float max1, float min2, float max2){
  return min2 + (value - min1) * (max2 - min2)/(max1 - min1);
}

void main()  {
  vec2 newUV = vUv;

  // vec2 res = resolution * pr;
  // vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
  // st.y *= resolution.y / resolution.x;

  vec2 mouse = uMouse;
  mouse.y *= resolution.y / resolution.x;
  mouse *= -1.;

  // vec2 circlePos = st + mouse;

  float dist = length(vPosition.xy - uMouse);
  float c = circle(vec2(dist), 0.2, 10.0);
  
  float speed = distance(uMouse, lastUMouse);
  
  speed = smoothstep(0.0, 0.5, speed);
  // speed = clamp(speed, 0.0, 0.06);
  
  vec2 zoomedUV = mix(vUv, mouse + vec2(1.0), c * speed);
  
  float r = texture2D(disp, zoomedUV -= c * speed).x;
  float g = texture2D(disp, zoomedUV -= c * speed).y;
  float b = texture2D(disp, zoomedUV -= c * speed).z;
  vec4 final = vec4(r, g, b, 1.);

  gl_FragColor = final;
}`

export { vertex, fragment }