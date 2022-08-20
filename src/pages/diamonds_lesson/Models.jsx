import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';


useGLTF.preload('/lesson2_models/model0.glb');


function LessonModels() {
    const counter = useSelector(state => state.counter);




    function Model({ ...props })
    {
      const group = useRef()
      const { nodes, materials, animations } = useGLTF(`/lesson2_models/model${counter}.glb`)
      const { actions } = useAnimations(animations, group);

      const ref = useRef();

      function RotateAnimation() {
        useFrame((state) => {
          ref.current.rotation.y += 0.002
        })
      }

      useEffect(() =>
      {
        if(counter >= 0)
        {
          console.log(actions);
          const _animations = Object.values(actions);
          _animations.forEach((a) => a.play())
  
        }
      })

      if(counter === 0)
      {
        // RotateAnimation();
        return (
          <group ref={group} {...props} dispose={null} position={[0, -0.5, -1]} scale={0.5}>
            <group name="Scene">
              <group name="Empty" scale={0.1}>
                <group name="ZnS_Unit_Cell" rotation={[0, -0.83, 0]}>
                  <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Material} />
                  <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
                </group>
              </group>
            </group>
          </group>
        )
      } 

      else return null;
    }

  return <Model />

}

export default LessonModels