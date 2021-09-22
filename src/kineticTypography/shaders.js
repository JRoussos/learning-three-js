const vertex = 
`varying vec2 vUv;
varying vec3 vPosition;
uniform float time;

void main() {
    vUv = uv;
    vPosition = position;
    vec3 transformed = position;

    // transformed.z += sin(transformed.y + transformed.x + time) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0 );
}`

const fragment = 
`varying vec2 vUv;
varying vec3 vPosition;

uniform float time;
uniform vec2 resolution;
uniform sampler2D disp;

#define PI 3.14159265359

// GlSL Noise function
// https://github.com/hughsk/glsl-noise/blob/master/classic/2d.glsl
// I should have import it with glslify but I got lazy and just copy paste it...

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}


void main()  {
  vec2 newUV = vUv; 
  float time = time * 0.25;
  vec2 repeat = vec2(3.0);
  
  // float cTime = clamp( sin(time), -0.2, 0.2 );
  // newUV.y += sin(newUV.x + time ) * strength;
  
  // float noise = cnoise( vPosition.xy + vec2(2.0) );
  // float strength = 0.3;
  
  // newUV.x -= (newUV.y + noise - time) * strength;
  // newUV.y -= (newUV.x + noise + time) * strength;
  
  float noise = cnoise( vPosition.xy + time );
  newUV = fract( vec2(newUV.x + 0.5*time, newUV.y +newUV.x *0.4) * repeat - vec2(noise, 0.5) );

  vec4 texture = texture2D(disp, newUV);
  gl_FragColor = texture;
}`

export { vertex, fragment }