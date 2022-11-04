import React, { useRef, useMemo } from 'react';
import { useGLTF, Merged } from '@react-three/drei';
import { useSelector } from 'react-redux';
import * as THREE from 'three'


// nodes['bonds-soccer'].material = THREE.MathUtils.lerp(nodes['bonds-soccer'].material, nodes['bonds-carbon'].material, 0.12)




function Model({ instances, ...props })
{
  const group = useRef();
  const { nodes, materials } = useGLTF('/lesson1_models/newFullerene12-transformed.glb');
  console.log(nodes);


  // Isolating colors of soccer bonds
  const {r, g, b} = nodes["bonds-soccer"].material.color;
  console.log(r, g, b);


  const counter = useSelector(state => state.counter);

  console.log(materials);

  const centerPosition = [0, 0, 0]
  const leftPosition = [.3, 0, 0];

  return (
    <group ref={group} {...props} dispose={null} scale={counter === 0 ? 0.25 : 0.15} position={counter === 0 ? centerPosition : leftPosition}>
      {counter === 4 ? <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} /> : ""}

      <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']}>
        <instances.CarbonInstanceSphere position={[0, 0.94, 0.34]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0, 0.73, 0.69]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.33, 0.94, 0.11]} rotation={[-1.45, 0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.65, 0.73, 0.21]} rotation={[-1.3, 0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, 0.94, -0.28]} rotation={[-1.88, 0.22, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.4, 0.73, -0.56]} rotation={[-2.2, 0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.94, -0.28]} rotation={[-1.88, -0.22, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.4, 0.73, -0.56]} rotation={[-2.2, -0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.33, 0.94, 0.11]} rotation={[-1.45, -0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.65, 0.73, 0.21]} rotation={[-1.3, -0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.33, 0.51, 0.79]} rotation={[-0.65, Math.PI / 6, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.65, 0.51, 0.56]} rotation={[-0.73, 0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.85, 0.51, -0.07]} rotation={[-1.74, 1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.73, 0.51, -0.45]} rotation={[-2.26, 0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, 0.51, -0.83]} rotation={[-2.59, 0.18, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.51, -0.83]} rotation={[-2.59, -0.18, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.73, 0.51, -0.45]} rotation={[-2.26, -0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.85, 0.51, -0.07]} rotation={[-1.74, -1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.65, 0.51, 0.56]} rotation={[-1.02, -0.67, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.33, 0.51, 0.79]} rotation={[-1.02, -0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, 0.17, 0.96]} rotation={[0, Math.PI / 10, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.4, -0.17, 0.9]} rotation={[0.16, 0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.85, 0.17, 0.49]} rotation={[-0.29, 1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.73, -0.17, 0.66]} rotation={[0.23, 0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.98, 0.17, 0.11]} rotation={[-1.02, 1.39, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.98, -0.17, -0.11]} rotation={[2.12, 1.39, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.73, 0.17, -0.66]} rotation={[-2.92, 0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.85, -0.17, -0.49]} rotation={[2.85, 1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.4, 0.17, -0.9]} rotation={[-2.98, 0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, -0.17, -0.96]} rotation={[2.99, 0.22, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.4, 0.17, -0.9]} rotation={[-2.98, -0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.17, -0.96]} rotation={[2.99, -0.22, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.73, 0.17, -0.66]} rotation={[-2.92, -0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.85, -0.17, -0.49]} rotation={[2.85, -1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.98, 0.17, 0.11]} rotation={[-1.02, -1.39, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.98, -0.17, -0.11]} rotation={[2.12, -1.39, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.85, 0.17, 0.49]} rotation={[-0.37, -1.24, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.73, -0.17, 0.66]} rotation={[0.55, -0.9, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.17, 0.96]} rotation={[0.19, 0, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.4, -0.17, 0.9]} rotation={[0.35, -0.27, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.73, -0.51, 0.45]} rotation={[0.88, 0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.85, -0.51, 0.07]} rotation={[1.4, 1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.65, -0.51, -0.56]} rotation={[2.41, 0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.33, -0.51, -0.79]} rotation={[2.56, 0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.33, -0.51, -0.79]} rotation={[2.56, -0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.65, -0.51, -0.56]} rotation={[2.41, -0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.85, -0.51, 0.07]} rotation={[1.4, -1.02, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.73, -0.51, 0.45]} rotation={[0.88, -0.84, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.51, 0.83]} rotation={[0.55, -0.18, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, -0.51, 0.83]} rotation={[0.55, 0.18, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.4, -0.73, 0.56]} rotation={[0.94, 0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.2, -0.94, 0.28]} rotation={[1.26, 0.22, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.65, -0.73, -0.21]} rotation={[1.84, 0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0.33, -0.94, -0.11]} rotation={[1.69, 0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0, -0.73, -0.69]} rotation={[2.3, 0, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[0, -0.94, -0.34]} rotation={[1.95, 0, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.65, -0.73, -0.21]} rotation={[1.84, -0.69, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.33, -0.94, -0.11]} rotation={[1.69, -0.36, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.4, -0.73, 0.56]} rotation={[0.94, -0.4, -Math.PI / 2]} scale={0.07} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.94, 0.28]} rotation={[1.26, -0.22, -Math.PI / 2]} scale={0.07} />
      </mesh>

      <mesh 
        geometry={nodes['bonds-soccer'].geometry} 
        material={counter === 3 ? materials['soccer-material'] : materials['carbon-material']} 
        >


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

    </group>
  )
}


export default function FullereneModels2(props){

  const counter = useSelector(state => state.counter);

  const { nodes, materials } = useGLTF('/lesson1_models/newFullerene12-transformed.glb')



  const instances = useMemo(
    () => ({
      CarbonInstanceSphere: nodes.carbonInstanceSphere,
      SoccerInstanceSphere: nodes.soccerInstanceSphere,

    }),
    [nodes]
  )

  if (counter === 0 || counter === 2)
  {
    // Fixing bug of soccer instance atoms having the wrong material on them. This line should execute only once.
    nodes.soccerInstanceSphere.material = materials['carbon-material'];
    return (
      <Merged meshes={instances} {...props}>
        {(instances) => <Model instances={instances} />}
      </Merged>
    )
  }

  if (counter === 3)
  {
    // Try to lerp this: 
    // nodes.soccerInstanceSphere.material = materials['soccer-material'];



    nodes.soccerInstanceSphere.material.color.lerp( {r: 1, g: 0.5972016453742981, b: 0.06301017850637436 }, .1 )

    console.log(nodes.soccerInstanceSphere.material);

    // nodes.soccerInstanceSphere.material.color = THREE.MathUtils.lerp(nodes.soccerInstanceSphere.material.color, nodes.carbonInstanceSphere.material.color, .02)

    return (
      <Merged meshes={instances} {...props}>
        {(instances) => <Model instances={instances} />}
      </Merged>
    )
  }

  if (counter === 4)
  {
    nodes.soccerInstanceSphere.material = materials['carbon-material'];

    return (
      <Merged meshes={instances} {...props}>
        {(instances) => <Model instances={instances} />}
      </Merged>
    )
  }

  else return null;
}



// useGLTF.preload('/newFullerene12-transformed.glb')