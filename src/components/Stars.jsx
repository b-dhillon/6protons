import React, { useState, useRef, memo, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from "maath/random";
import * as THREE from 'three'

const Stars = function Stars(props) {
    const ref = useRef()
    const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.25 }))

    useFrame((state, delta) =>
    {
        // Rotating Stars:
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15

        // Camera zoom-in animation on load: 
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, 0.14)
    })

    return (
        <>
            <group rotation={[0, 0, Math.PI / 4]}>
                <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                    <PointMaterial transparent color="#fff" size={0.003} sizeAttenuation={true} depthWrite={false} />
                </Points>
            </group>
        </>
    )
}

const MemoizedStars = memo(Stars)

export default MemoizedStars;