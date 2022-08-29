import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations, MeshWobbleMaterial, mesh } from '@react-three/drei';
import * as THREE from 'three';


useGLTF.preload('/lesson3_models/model0.glb');


function NanotubeModels() {
  const counter = useSelector(state => state.counter);

  const ref = useRef();

  function Animation() {
      useFrame((state) => {
        ref.current.rotation.y += 0.001
        ref.current.position.y += 0.0005
    })
  }

  function Model({ ...props })
  {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(`/lesson3_models/model${counter}.glb`)
    const { actions } = useAnimations(animations, group);
    const positions = [1, -.4, -1];
    const scale = 0.40;

    // useEffect(() =>
    // {
    //   if(counter >= 0)
    //   {
    //     const _animations = Object.values(actions);
    //     console.log(_animations);
    //     _animations.forEach((a) => {
    //       a.timeScale = 1/2; 
    //       a.play();
    //     })

    //   }
    // })

    if(counter === 0)
    {
      Animation();
      return (

        <group ref={ref} {...props} dispose={null} position={[0, .33, 0]} scale={0.5}>
          <group name="Scene" position={[0, -1, 0]}>
            <mesh name="Carbon_Nanotube" geometry={nodes.Carbon_Nanotube.geometry} material={materials['Carbon Nanotube Material']} position={[0, -4, 0]} />
          </group>
        </group>

        // <group ref={ref} {...props} dispose={null} scale={0.5} position={[0,-1.5,0]}>
        //     <mesh geometry={nodes.Carbon_Nanotube.geometry} material={materials['Carbon Nanotube Material']} />
        // </group>
      )
    }

    else return <></>;
  }


  if (counter === 0 ) {
    return <Model />
  } else return null; 

}

export default NanotubeModels