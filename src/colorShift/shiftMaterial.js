import { ShaderMaterial, Vector2 } from 'three';
import { extend } from 'react-three-fiber';

import { vertex, fragment } from './shaders';

class ShiftMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        pr: {value: window.devicePixelRatio.toFixed(1)},
        resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new Vector2() },
        lastUMouse: {value: new Vector2() },
        disp: { value: null },
      }
    })
  }

  get uMouse(){
    return this.uniforms.uMouse.value
  }

  set uMouse(value) {
    this.uniforms.uMouse.value = value
  }
  
  get lastUMouse(){
    return this.uniforms.lastUMouse.value
  }

  set lastUMouse(value) {
    this.uniforms.lastUMouse.value = value
  }

  get resolution(){
    return this.uniforms.resolution.value
  }

  set resolution(value) {
    this.uniforms.resolution.value = value
  }

  set map(value) {
    this.uniforms.disp.value = value
  }

  get map() {
    return this.uniforms.disp.value
  }
}

extend({ ShiftMaterial })
