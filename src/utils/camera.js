import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';

const Camera = props => {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    const newPosition = new Vector3()
    
    useEffect(() => {
      void setDefaultCamera(ref.current)
    }, [setDefaultCamera])
    
    useFrame(() => {
      ref.current.position.lerp( newPosition.set(0, 0, 2), 0.06 )
      ref.current.updateMatrixWorld()
    }) 
    return <perspectiveCamera ref={ref} aspect={window.innerWidth/window.innerHeight} {...props} />
}

export default Camera;