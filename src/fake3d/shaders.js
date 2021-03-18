const vertex = 
`varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}`

const fragment = 
`varying vec2 vUv;
varying vec3 vPosition;

uniform vec2 resolution;
uniform vec2 uMouse;
uniform vec2 threshold;
uniform float pixelRatio;

uniform float time;
uniform sampler2D src;
uniform sampler2D map;

vec2 mirrored(vec2 v) {
    vec2 m = mod(v, 2.0);
    return mix(m, 2.0 - m, step(1.0 ,m));
}

void main()  {
    vec4 text = texture2D(map, mirrored(vUv));
    vec2 fake3d = vec2(vUv.x + (text.r - 0.5) * uMouse.x / threshold.x, vUv.y + (text.r - 0.5) * uMouse.y / threshold.y);
    gl_FragColor = texture2D(src, mirrored( fake3d ));

    // vec4 depth = texture2D(map, vUv);
    // gl_FragColor = texture2D(src, vUv + uMouse*depth.r);  
}`

export { vertex, fragment }