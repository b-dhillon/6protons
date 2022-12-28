import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei';

// useGLTF.preload('/lesson4_models/model0.glb');


function DiamondModels() {
  const counter = useSelector((state: any) => state.counter);

  function Model({ ...props }) {
    const group: any = useRef()
    const { nodes, materials, animations } = useGLTF(`/lesson4_models/model${counter}.glb`)
    const { actions } = useAnimations(animations, group);
    // const positions = [1, -.4, -1];
    // const scale = 0.40;

    

    const ref: any = useRef();

    function OscilateAnimation() {
        useFrame((state) => {
          ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 5
      })
    }

    // function RotateAnimation() {
    //   useFrame((state) => {
    //     ref.current.rotation.y += 0.002
    //   })
    // }

    useEffect(() =>
    {
      if(counter >= 0)
      {
        const _animations = Object.values(actions);
        _animations.forEach((a: any ) => a.play())
      }
    })

    if(counter === 0)
    {
      OscilateAnimation();
      return (
        <group ref={ref} {...props} dispose={null} scale={.15}>
            {/* @ts-ignore */}
            <mesh geometry={nodes.Nondestructive_Graphene.geometry} material={materials['Atom Material']} rotation={[Math.PI / 2, 0, 0]} scale={1.18} />
        </group>
      )
    }

    else return <></>;
  }

  if (counter === 0 ) {
    return <Model />
  } else return null; 

}

export default DiamondModels