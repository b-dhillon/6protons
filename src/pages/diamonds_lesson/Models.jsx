import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei';

useGLTF.preload('/lesson2_models/model0.glb');


function LessonModels() {
    const counter = useSelector(state => state.counter);




    function Model({ ...props })
    {
      const group = useRef()
      const { nodes, materials, animations } = useGLTF(`/lesson2_models/model${counter}.glb`)
      const { actions } = useAnimations(animations, group);

      const ref = useRef();
      function ScaleRotateAnimation() {
        useFrame((state) => {
          ref.current.rotation.y += 0.002
        })
      }

      if(counter === 0)
      {
        ScaleRotateAnimation();
        return (
          <group ref={ref} {...props} dispose={null} position={[0, -0.5, -1]} scale={0.5}>
            <mesh geometry={nodes.Cube001.geometry} material={materials.Material} />
            <mesh geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
          </group>
        )
      } 

      else return null;
    }

  return <Model />

}

export default LessonModels