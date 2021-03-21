import { ShaderMaterial, Vector2} from 'three';
import { extend } from 'react-three-fiber';

import { vertex, fragment } from './shaders';

class KineticMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,  
      uniforms: {
        pr: { value: window.devicePixelRatio.toFixed(1) },
        resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        time: { value: 1.0 },
        disp: { value: null }
      }
    })
  }

  set time(v){
    return (this.uniforms.time.value = v)
  }
  get time() {
    return this.uniforms.time.value
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

extend({ KineticMaterial })
