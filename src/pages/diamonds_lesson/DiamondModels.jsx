import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGLTF, useAnimations } from '@react-three/drei';
useGLTF.preload('/lesson2_models/model0.glb');

function DiamondModels() {
  const counter = useSelector(state => state.counter);

  function Model({ ...props })
  {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(`/lesson2_models/model${counter}.glb`)
    const { actions } = useAnimations(animations, group);

    useEffect(() =>
    {
      const _animations = Object.values(actions);
      _animations.forEach((a) => a.play())
    })

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
      </group>
    ) 
  }

  if (counter === 0 ) {
    return <Model />
  } else return null; 

}

export default DiamondModels