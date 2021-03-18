import React, { useRef } from 'react'
import { gsap } from 'gsap';

import { useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader, Vector2 } from 'three';
import { Html } from '@react-three/drei';

import canyon from '../imgs/mountains.jpg';
import depth from '../imgs/mountains-map.jpg';

import './depthMaterial';

const Fake3D = () => {
    const scn = useLoader(TextureLoader, canyon)
    const map = useLoader(TextureLoader, depth)
    const mesh = useRef()
    const uMouse = new Vector2()
    
    window.addEventListener('pointermove', e => {
      gsap.to(uMouse, { duration: 0.6, x: ( e.clientX / window.innerWidth ) * 2 - 1, y: -( e.clientY / window.innerHeight) * 2 + 1 })
      if(mesh.current){
        gsap.to(mesh.current.rotation, { duration: 0.5, x: -uMouse.y * 0.05, y: uMouse.x * 0.05 })
      }
    })
  
    useFrame( () => {
      mesh.current.material.uniforms.uMouse.value = uMouse
    })
  
    return(<>
      <mesh ref={mesh} position={[0, 0, 0]} >
        <planeBufferGeometry attach="geometry" args={[3, 1.5]}/>
        <depthMaterial attach="material" map={scn} depth={map}/>
      </mesh>       
      <Html zIndexRange={[1, 0]} fullscreen position={[0, 0, 0.2]}>
        <p className="page_title">Fake 3D effect with the use of a depth map.</p>
      </Html>
      </>
    )
}

export default Fake3D;