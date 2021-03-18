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

            position.y = ( (index % 20) * 0.05) - 0.45
            position.x = ( Math.floor(index / 20) * 0.05) - 0.95

            return position
        })

        const distances = positions.map( pos => pos.length() * 2 )

        return { vec, transform, positions, distances }
    }, [])

    useFrame( state => {

        for(let i=0; i<number_of_dots; i++){
            const time = state.clock.getElapsedTime() - distances[i] / 2

            // const squareWave = roundedSquareWave(time, 0.1, 1, 0.2)
            // const squareWave = roundedSquareWave(time, 0.5, 0.4, 0.6)
            // const scale = 1 + squareWave * 0.3

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
