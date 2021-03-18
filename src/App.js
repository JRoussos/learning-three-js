import React, { Suspense } from 'react'

import { Canvas } from 'react-three-fiber';
import { Loader } from '@react-three/drei';

import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import routes from './utils/routes';
import Camera from './utils/camera';
import Menu from './menu';

import './App.css';

const hist = createBrowserHistory()

function App() {
  return (
    <>
      <Menu routes={routes}/>
      <Canvas concurrent colorManagement> 
        <Camera position ={[0, 0, 2]} fov={70} near={0.01} far={100}/>
        <Suspense fallback={null}>
          <Router history={hist}>
          <Switch>
            {routes.map( (r, index) => <Route path={r.path} component={r.component} key={index} />)}
          </Switch>
          </Router>
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={ (p) => `${(p * 100).toFixed(2)}%` }/>
    </>
  );
}

export default App;