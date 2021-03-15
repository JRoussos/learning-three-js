import React, { useRef, Suspense, useEffect, useState } from 'react'

import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import { Loader } from '@react-three/drei';

import ColorShift from './colorShift/ColorShift';
import Fake3D from './fake3d/Fake3D';

import './App.css';

const Camera = props => {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  const newPosition = new Vector3()

  useEffect(() => {
    void setDefaultCamera(ref.current)
  }, [])
  
  useFrame(() => {
    ref.current.position.lerp( newPosition.set(props.page*5, 0, 2), 0.06 )
    ref.current.updateMatrixWorld()
  }) 

  return <perspectiveCamera ref={ref} {...props} />
}

function App() {
  const [ page, setPage] = useState(0)
  const numberOfPages = 1

  return (
    <>
      <Canvas concurrent colorManagement> 
        <Camera position ={[0, 0, 2]} fov={70} near={0.01} far={100} page={page}/>
        <Suspense fallback={null}>
            <Fake3D setPage={setPage} page={page} numberOfPages={numberOfPages}/>
            <ColorShift setPage={setPage} page={page} numberOfPages={numberOfPages}/>
        </Suspense>
      </Canvas>
      <Loader/>
    </>
  );
}

export default App;
