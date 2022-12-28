import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';


// useGLTF.preload('/lesson3_models/model0.glb');

export default function NanotubeModels() {
  const counter = useSelector((state: any) => state.counter);

  const ref: any = useRef();



  function Model({ ...props }) {
    const { nodes, materials  } = useGLTF(`/lesson3_models/model${counter}.glb`)

    if(counter === 0)
    {
      // Animation();
      return (
        <group ref={ref} {...props} dispose={null} position={[0, .25, 0]} scale={0.5}>
          <group name="Scene" position={[0, -1, 0]}>
            {/*@ts-ignore*/}
            <mesh name="Carbon_Nanotube" geometry={nodes.Carbon_Nanotube.geometry} material={materials['Carbon Nanotube Material']} position={[0, -4, 0]} />
          </group>
        </group>
      )
    }

    else return <></>;
  }


  if (counter === 0 ) {
    return <Model />
  } else return null; 

}


        
// 


// function Animation() {
//   useFrame((state, delta) => {
//     ref.current.rotation.y += delta/15
//     ref.current.position.y += delta/20
//     // ref.current.rotation.y += 0.001
//     // ref.current.position.y += 0.0005
// })
// }