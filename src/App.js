import React, { Suspense } from 'react'

import { Canvas } from 'react-three-fiber';
import { Loader } from '@react-three/drei';

import routes from './utils/routes';
import Camera from './utils/camera';
import Menu from './menu';

import './App.css';

const Router = () => {
  const pathName = window.location.pathname
  let component = null
  
  routes.forEach( r => {
    if(r.path === pathName)
      component = r.component
  })
  return component || routes[0].component
}

function App() {
  return (
    <>
      <Menu routes={routes}/>
      <Canvas concurrent colorManagement> 
        <Camera position ={[0, 0, 2]} fov={70} near={0.01} far={100}/>
        <Suspense fallback={null}>
          <Router/>
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={ (p) => `${(p * 100).toFixed(2)}%` }/>
    </>
  );
}

export default App;