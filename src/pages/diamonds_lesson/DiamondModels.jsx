import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';


useGLTF.preload('/lesson2_models/model0.glb');


function DiamondModels() {
  const counter = useSelector(state => state.counter);

  function Model({ ...props })
  {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(`/lesson2_models/model${counter}.glb`)
    const { actions } = useAnimations(animations, group);
    const positions = [1, -.4, -1];
    const scale = 0.40;

    

    const ref = useRef();

    function OscilateAnimation() {
        useFrame((state) => {
          ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 5
      })
    }

    function RotateAnimation() {
      useFrame((state) => {
        ref.current.rotation.y += 0.002
      })
    }

    useEffect(() =>
    {
      if(counter >= 0)
      {
        const _animations = Object.values(actions);
        _animations.forEach((a) => a.play())

      }
    })

    if(counter === 0)
    {
      return (
        <group ref={group} {...props} dispose={null} position={[0, -.5, -1]} scale={.5}>
          <group name="Scene">
             <group name="Empty001" position={[0, 1, 0]} scale={0.06}>
               <group name="Empty" position={[0, 0.06, 0]} scale={1.74}>
                 <group name="ZnS_Unit_Cell" rotation={[0, 0.15, 0]}>
                   <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Material} />
                   <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
                 </group>
               </group>
            </group>
          </group>





        {/* <group name="Scene">
            <group name="Empty001" position={[0, 1, 0]} scale={0.06}>
              <group name="Empty" position={[0, 0.06, 0]} scale={1.74}>
                <group name="ZnS_Unit_Cell" rotation={[0, 0.15, 0]}>
                  <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Material} />
                  <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
                </group>
              </group>
            </group>
          </group> */}
        </group>
      )
    }

    else if (counter === 1) 
    {
      OscilateAnimation();
      return (
      <>
        <group ref={ref} {...props} dispose={null} position={positions} scale={scale}>
          <group position={[0, 1, 0]} scale={0.06}>
            <group position={[0, 0.06, 0]} scale={17.42}>
              <group rotation={[0, 0.15, 0]}>
                <mesh geometry={nodes.Cube001.geometry} material={materials.Material} />
                <mesh geometry={nodes.Cube001_1.geometry} material={materials['S Material']} />
              </group>
            </group>
          </group>
          <mesh geometry={nodes.Text.geometry} material={materials['Material.003']} position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.5} />
        </group>
      </>
      )
    }

    else return <></>;
  }

  if (counter === 0 ) {
    return <Model />
  } else return null; 

}

export default DiamondModels