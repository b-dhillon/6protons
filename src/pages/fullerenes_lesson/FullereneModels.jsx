import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGLTF, Merged } from '@react-three/drei';
import { useFrame, } from '@react-three/fiber'


export default function FullereneModels(props)
{
  const { nodes } = useGLTF('lesson1_models/model0.glb');
  const counter = useSelector(state => state.counter);

  const centerPosition = [0, 0, 0];
  const leftPosition = [.3, 0, 0];

  let scale;
  if (counter === 0) scale = 0.24;
  else if (counter === 5) scale = 0.06;
  else scale = .15;
  console.log(scale);

  const instances = useMemo(
  () => ({
    CarbonInstanceSphere: nodes.carbonInstanceSphere,
    SoccerInstanceSphere: nodes.soccerInstanceSphere
  }),
  [nodes]);
  nodes.soccerInstanceSphere.material = nodes.carbonBonds.material;

  /*
  In this parent function we are conditionally controlling the color of the soccer instances as well as the positioning of the model (center or left), and scale
  because these cant be conditionally set in the child Model() function with all the other conditions without causing problems.
  Both if statements below are to prevent the model from rendering in the centerPosition for a split seconds.
  */
  if (counter === 0) {
    return (
      <Merged meshes={instances} {...props}>
        { (instances) => <Model instances={instances} position={centerPosition} scale={scale}/> }
      </Merged>
    ) 
  };

  if (counter >= 2) {
    if (counter >= 3) nodes.soccerInstanceSphere.material = nodes.soccerBonds.material;
    else nodes.soccerInstanceSphere.material = nodes.carbonBonds.material;

    return (
      <Merged meshes={instances} {...props}>
        { (instances) => <Model instances={instances} position={leftPosition} scale={scale}/> }
      </Merged>
    ) 
  }
  else return null;
}


function Model({ instances, ...props })
{
  const { nodes, materials } = useGLTF('lesson1_models/model0.glb');
  const counter = useSelector(state => state.counter);
  /* In this child fn we conditionally render the meshes and change the material of the soccer bonds when counter = 3. */
  const ref = useRef();



  function Rotate() {
    useFrame((_, delta) => {
      ref.current.rotation.y += (delta / 6)
    })
  };

  function Levitate() {
    useFrame( (state, delta ) => {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = (0.75 + Math.sin(t / 1.5 )) / 4
      // ref.current.rotation.z = -0.2 - (1 + Math.sin( t / 1.5 )) / 20
      ref.current.rotation.y += (delta / 12)

        ref.current.rotation.x = Math.cos( t / 4 ) / 2

        // ref.current.position.x = (1 - Math.sin(t / 1.5 )) / 8
        // ref.current.rotation.y = Math.sin(t / 4) / 8
      


    })
  };

  function Oscilate() {
    useFrame( (state) => {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = -(1 + Math.sin(t / 1.5 )) / 2
    })
  };

  // function Scale() {
  //   useFrame(() => {

  //   })
  // }

  if(counter < 5) {
    Levitate(); 
  } else {
    ref.current.rotation.x = 0;
    ref.current.rotation.y = 0;
    ref.current.rotation.z = 0;
    ref.current.position.y = -.05; 
    Oscilate(); 
  }
  

  
  return (
    counter !== 1
    ? 
    <>
     <group position={props.position} {...props} dispose={null} scale={counter === 6 ? 0 : props.scale} >

        <group ref={ref} >

          <mesh geometry={nodes.carbonBonds.geometry} material={materials.carbonMaterial}>
            <instances.CarbonInstanceSphere position={[0, 0.94, 0.34]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0, 0.73, 0.69]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.33, 0.94, 0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.65, 0.73, 0.21]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, 0.94, -0.28]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.4, 0.73, -0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, 0.94, -0.28]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.4, 0.73, -0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.33, 0.94, 0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.65, 0.73, 0.21]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.33, 0.51, 0.79]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.65, 0.51, 0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.85, 0.51, -0.07]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.73, 0.51, -0.45]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, 0.51, -0.83]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, 0.51, -0.83]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.73, 0.51, -0.45]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.85, 0.51, -0.07]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.65, 0.51, 0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.33, 0.51, 0.79]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, 0.17, 0.96]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.4, -0.17, 0.9]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.85, 0.17, 0.49]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.73, -0.17, 0.66]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.98, 0.17, 0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.98, -0.17, -0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.73, 0.17, -0.66]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.85, -0.17, -0.49]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.4, 0.17, -0.9]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, -0.17, -0.96]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.4, 0.17, -0.9]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, -0.17, -0.96]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.73, 0.17, -0.66]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.85, -0.17, -0.49]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.98, 0.17, 0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.98, -0.17, -0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.85, 0.17, 0.49]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.73, -0.17, 0.66]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, 0.17, 0.96]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.4, -0.17, 0.9]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.73, -0.51, 0.45]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.85, -0.51, 0.07]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.65, -0.51, -0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.33, -0.51, -0.79]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.33, -0.51, -0.79]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.65, -0.51, -0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.85, -0.51, 0.07]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.73, -0.51, 0.45]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, -0.51, 0.83]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, -0.51, 0.83]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.4, -0.73, 0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.2, -0.94, 0.28]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.65, -0.73, -0.21]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0.33, -0.94, -0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0, -0.73, -0.69]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[0, -0.94, -0.34]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.65, -0.73, -0.21]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.33, -0.94, -0.11]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.4, -0.73, 0.56]} scale={0.07} />
            <instances.CarbonInstanceSphere position={[-0.2, -0.94, 0.28]} scale={0.07} />
          </mesh>

          <mesh geometry={nodes.soccerBonds.geometry} material={ counter >= 3 ? materials.soccerMaterial : materials.carbonMaterial}>
            <instances.SoccerInstanceSphere position={[0, 0.73, 0.69]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[0.33, 0.51, 0.79]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.65, 0.51, 0.56]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.33, 0.51, 0.79]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[0.2, 0.17, 0.96]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.85, 0.17, 0.49]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.73, -0.17, 0.66]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.2, 0.17, 0.96]} scale={0.071} />
            <instances.SoccerInstanceSphere position={[-0.4, -0.17, 0.9]} scale={0.071} />
          </mesh>

          { counter >= 4 ? <mesh geometry={nodes.dopeModel.geometry} material={materials.dopeMaterial} scale={0.62} /> : null }


          { counter === 5 ? <mesh geometry={nodes.proteaseModel.geometry} material={materials.proteaseMaterial} position={[0, 0.83, 0]} rotation={[0, -Math.PI / 1.66, 0]} scale={0.17} /> : null}
        </group>

      
        <mesh geometry={nodes.text.geometry} material={materials.textMaterial} position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={counter === 5 ? .5 : 0} />
      </group> 

    </>
    : 
    ""
  )
};

// useGLTF.preload('/newFullerene15-transformed.glb')