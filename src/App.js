import React, { Suspense } from 'react'

import { Canvas } from 'react-three-fiber';
import { Loader } from '@react-three/drei';

import routes from './utils/routes';
import Menu from './menu';

import './App.css';

const Router = () => {
  const pathName = new URLSearchParams(document.location.search.substring(1));
  let component = null
  
  routes.forEach( r => {
    if(r.path === pathName.get("page"))
      component = r.component
  })
  return component || routes[0].component
}

function App() {
  return (
    <>
      <Menu routes={routes}/>
      <Canvas dpr={[window.devicePixelRatio, 2]} concurrent colorManagement camera={{ position: [0,0,2], fov: 70, near: 0.01, far: 100}}> 
        <Suspense fallback={null}>
          <Router/>
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={ (p) => `${(p * 100).toFixed(2)}%` }/>
    </>
  );
}

export default App;