// Based on https://tympanus.net/codrops/2020/12/17/recreating-a-dave-whyte-animation-in-react-three-fiber/
import React, { useRef, useMemo }  from 'react'

import { useFrame } from 'react-three-fiber';
import { Matrix4, Vector3 } from 'three';
import { Html } from '@react-three/drei';

const number_of_dots = 800

const Dots = () => {
    const mesh = useRef()

    const { vec, transform, positions, distances } = useMemo(() => {
        const vec = new Vector3()
        const transform = new Matrix4()
        const positions = [ ...Array(number_of_dots)].map( ( _, index ) => {
            const position = new Vector3()

            position.y = ((index % 20) - 10) * 0.05
            position.x = (Math.floor(index / 20) - 20) * 0.05

            return position
        })

        const distances = positions.map( pos => pos.length() * 2 )

        return { vec, transform, positions, distances }
    }, [])

    useFrame( state => {

        for(let i=0; i<number_of_dots; i++){
            const time = state.clock.getElapsedTime() - distances[i] / 2

            // const squareWave = roundedSquareWave(time, 0.4, 0.3, 0.6)
            // const squareWave = roundedSquareWave(time, 0.15 + (0.2 * distances[i]) / 72, 0.4, 1 / 3.8)
            // const scale = 1 + squareWave * 0.4
            const scale = 1 + Math.sin(2 * time * Math.PI) * 0.1
        
            vec.copy(positions[i]).multiplyScalar( scale )
            transform.setPosition(vec)
            mesh.current.setMatrixAt(i, transform)
        }

        mesh.current.instanceMatrix.needsUpdate = true
      })

    return (<>
            <instancedMesh ref={mesh} args={[null, null, number_of_dots]} position={[0, 0, 0]}>
                <circleBufferGeometry attach="geometry" args={[0.01, 20]}/>
                <meshBasicMaterial attach="material" color="grey"/>
            </instancedMesh>       
            <Html zIndexRange={[1, 0]} fullscreen position={[0, 0, 0.2]}>
                <p className="page_title">Matrix of dots moving in space with a sine wave function .</p>
            </Html>
        </>
    )
}

export default Dots
