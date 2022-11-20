import React, { useRef, memo, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import * as random from "maath/random";



const Stars = function Stars(props) {
    const ref = useRef()
    const never = 0; 

    
    // const sphere = random.inSphere(new Float32Array(50000), { radius: 5 });
    
    // const start = performance.now(); 
    // const sphere2 = useMemo(() => random.inSphere(new Float32Array(50000), { radius: 5 }), [never] );
    // const end = performance.now();
    // console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);



    // create a function that returns an array of 3000 random positions inside a sphere of radius 10 centered at 0,0,0 
    function randomSpherePoints(radius, count) {
        const points =  new Float32Array(count);
        for (let i = 0; i < count; i++) {
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(2 * Math.random() - 1);
          const s = Math.sin(phi);
          const x = radius * s * Math.cos(theta);
          const y = radius * s * Math.sin(theta);
          const z = radius * Math.cos(phi);
          points[i] = x;
          points[i + 1] = y;
          points[i + 2] = z;
        }
        return points;
    }

    // const start = performance.now(); 
    const sphere2 = useMemo(() => randomSpherePoints(5, 50000), [never] );

    // const end = performance.now();
    // console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);


    
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
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere2} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#fff" size={0.0045} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}
// star size={0.0035}
const MemoizedStars = memo(Stars);

export default MemoizedStars;