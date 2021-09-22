import React, { useRef } from 'react'
import { gsap } from 'gsap';

import { useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader, Vector2 } from 'three';
import { Html } from '@react-three/drei';

import image from '../imgs/stone.jpg';

import './shiftMaterial';

const ColorSwift = () => {
    const scn = useLoader(TextureLoader, image)
    const uMouse = new Vector2()
    const lastUMouse = new Vector2()
    const mesh = useRef()

    const handlePointerPositions = e => {
      let xPos = e.clientX ?? e.targetTouches[0].clientX
      let yPos = e.clientY ?? e.targetTouches[0].clientY

      gsap.to(uMouse, { duration: 0.8, x: ( xPos / window.innerWidth ) * 2 - 1, y: -( yPos / window.innerHeight) * 2 + 1, ease: "sine.out" })
      gsap.to(lastUMouse, { x:( xPos / window.innerWidth ) * 2 - 1,  y: -( yPos / window.innerHeight) * 2 + 1 })
      
      if(mesh.current) gsap.to(mesh.current.rotation, { duration: 0.5, x: -uMouse.y * 0.05, y: uMouse.x * 0.05 })
    }
    
    window.addEventListener('pointermove', e => handlePointerPositions(e))
    window.addEventListener('touchmove', e => handlePointerPositions(e))
  
    useFrame( () => {
      mesh.current.material.uniforms.uMouse.value = uMouse
      mesh.current.material.uniforms.lastUMouse.value = lastUMouse
    })
  
    return(
      <>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1.4, 1.6]}/>
        <shiftMaterial pr={window.devicePixelRatio.toFixed(1)} attach="material" map={scn}/>
      </mesh>
      <Html zIndexRange={[1, 0]} fullscreen position={[0, 0, 0.2]}>
        <p className="page_title">rgb shift effect on mouse over.</p>
      </Html>
      </>
    )
}

export default ColorSwift;