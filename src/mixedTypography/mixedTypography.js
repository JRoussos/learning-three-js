import React, { useRef, useMemo } from 'react';

import { useFrame, createPortal } from 'react-three-fiber';
import { Color, Scene, WebGLRenderTarget } from 'three';
import { Html, Text } from '@react-three/drei';

import fonts from "./fonts";

import './kineticMaterial';

const text = "JR";

const MixedTypo = () => {
    const mesh = useRef()
    const cam = useRef()

    const [ scene, target ] = useMemo( () => {
      const scene = new Scene()
      scene.background = new Color('#0d1117')
  
      const target = new WebGLRenderTarget( window.innerWidth, window.innerHeight )
      return [ scene, target ]
    }, [])

    useFrame( state => {
      state.gl.setRenderTarget(target)
      state.gl.render(scene, cam.current)
      state.gl.setRenderTarget(null)
      state.gl.setPixelRatio(2)

      mesh.current.material.uniforms.time.value = state.clock.getElapsedTime()
    })
  
    return(
      <>
      <perspectiveCamera ref={cam} fov={Math.atan((window.innerHeight/2)/50 *2 *(180/Math.PI))} aspect={1} near={0.01} far={1000} position={[0, 0, 50]}/>
      {createPortal(
        <Text 
          color="white"
          fontSize={37}
          scale={[0.3, 1, 1]}
          text={text}
          ref={mesh}
          font={fonts['Raleway']}
          anchorX="center"
          anchorY="middle"
          outlineBlur={"5%"}
          outlineOpacity={0.5}
          outlineColor="white"></Text>, scene )}
      <mesh ref={mesh} >
        <planeBufferGeometry attach="geometry" args={[3, 1]}/>
        <kineticMaterial attach="material" map={target.texture}/>
      </mesh>
      <Html zIndexRange={[1, 0]} fullscreen position={[0, 0, 0.2]}>
        <p className="page_title">Based on the previous kinetic animation.</p>
      </Html>
      </>
    )
}

export default MixedTypo;