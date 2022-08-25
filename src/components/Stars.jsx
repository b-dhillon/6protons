import React, { useState, useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from "maath/random";
import * as THREE from 'three'

const Stars = React.memo( function Stars(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) =>
    {
        // Rotating Stars:
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15

        // Camera zoom-in animation on load: 
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, 0.12)
    })

    return (
        <>
            <group rotation={[0, 0, Math.PI / 4]}>
                <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                    <PointMaterial transparent color="#fff" size={0.0025} sizeAttenuation={true} depthWrite={false} />
                </Points>
            </group>
        </>
    )
})

const MemoizedStars = memo(Stars);
export default MemoizedStars;