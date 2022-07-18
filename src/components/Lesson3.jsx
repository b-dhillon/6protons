import { useState, Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './Stars'


export default function Lesson3() {
    return (
        <>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={.4} />
                    <Stars />
                </Suspense>
            </Canvas>
        </>
    );
}
