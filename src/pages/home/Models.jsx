import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'

// Dont import entire library if youre just using one method 
import * as THREE from 'three'

function Models({flipped, ...props}) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/home_models/model0.glb')

    useFrame((state, delta) => {
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime) * 1.5) / 6
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, flipped ? (Math.PI * 1.5) : Math.PI / 2 , delta * 15)

    })
    
    return (
        <>
            <group position={[-.1, .5, -1]} {...props} dispose={null}>
                <group ref={ref} scale={0.055} rotation={[(Math.PI / 2), 0, 0]}>
                    <mesh geometry={nodes.SurfSphere.geometry} material={materials.Oxygen} />
                    <mesh geometry={nodes.SurfSphere_1.geometry} material={materials.Carbon} />
                    <mesh geometry={nodes.SurfSphere_2.geometry} material={materials.Hydrogen} />
                </group>
                
                {/* <mesh>
                    <Html scale={.33} position={[0, .66, 0]}  transform >
                        <div className="annotation">
                            Steroid Hormone 🧪
                        </div>
                    </Html> 
                </mesh> */}
            </group>
            
        </>
        
    )
}

// 0.25

// useGLTF.preload(`/home_models/model0.glb`);
export default Models;

// style={ flipped ? {display: 'flex'} : {display: 'none'} }