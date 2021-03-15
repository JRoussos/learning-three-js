import { ShaderMaterial, Vector2 } from 'three';
import { extend } from 'react-three-fiber';

import { vertex, fragment } from './shaders';

class DepthMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        pixelRatio: { value: window.devicePixelRatio.toFixed(1) },
        resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new Vector2() },
        threshold: { value: new Vector2(45, 35) },
        src: { value: null },
        map: { value: null }
      }
    })
  }

  get uMouse(){
    return this.uniforms.uMouse.value
  }

  set uMouse(value) {
    this.uniforms.uMouse.value = value
  }

  get resolution(){
    return this.uniforms.resolution.value
  }

  set resolution(value) {
    this.uniforms.resolution.value = value
  }

  set map(value) {
    this.uniforms.src.value = value
  }

  get map() {
    return this.uniforms.src.value
  }

  set depth(value) {
    this.uniforms.map.value = value
  }

  get depth() {
    return this.uniforms.map.value
  }
}

extend({ DepthMaterial })
