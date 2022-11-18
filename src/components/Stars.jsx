import React, { useRef, memo, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as random from "maath/random";
import * as THREE from 'three'



const Stars = function Stars(props) {
    const ref = useRef()
    const never = 0; 

    const start = performance.now(); 
    const sphere = useMemo(() => random.inSphere(new Float32Array(50000), { radius: 5 }), [never] );
    const end = performance.now();
    console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);

    let firstLoad = true;

    setTimeout( () => {
        firstLoad = false;
    }, 5000 )

    useFrame((state, delta) =>
    {
        // Rotating Stars:
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15

        
        if(firstLoad) {
            state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, delta)  
        }
    })

    return (
        <>

            <group rotation={[0, 0, Math.PI / 4]}>
                <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                    <PointMaterial transparent color="#fff" size={0.0045} sizeAttenuation={true} depthWrite={false} />
                </Points>
            </group>
        </>
    )
}
// star size={0.0035}
const MemoizedStars = memo(Stars);

export default MemoizedStars;