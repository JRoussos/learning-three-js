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

    const handlePointerPositions = e => {
      let xPos = e.clientX ?? e.targetTouches[0].clientX
      let yPos = e.clientY ?? e.targetTouches[0].clientY

      gsap.to(uMouse, { duration: 0.8, x: ( xPos / window.innerWidth ) * 2 - 1, y: -( yPos / window.innerHeight) * 2 + 1, ease: "sine.out" })
      
      if(mesh.current) gsap.to(mesh.current.rotation, { duration: 0.5, x: -uMouse.y * 0.05, y: uMouse.x * 0.05 })
    }

    window.addEventListener('pointermove', e => handlePointerPositions(e))
    window.addEventListener('touchmove', e => handlePointerPositions(e))
  
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