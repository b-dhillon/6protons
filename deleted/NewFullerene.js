import React, { useRef, useMemo } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

export default function NewFullerene(props)
{
  console.log(props);

  const { nodes, materials } = useGLTF('/lesson1_models/newFullerene11-transformed.glb');

  // Setting carbon atom instances to all have the same material
  nodes.carbonInstanceSphere.material = materials['carbon-material'];

  nodes.soccerInstanceSphere.material = materials['carbon-material'];

  // This is mutated because it is an object and the original is being mutated due to it being a shallow copy!!!
  // const soccerColor = materials['soccer-material'].color;


  // console.log(materials['soccer-material'].color);

  const instances = useMemo(
    () => ({
      CarbonInstanceSphere: nodes.carbonInstanceSphere,
      SoccerInstanceSphere: nodes.soccerInstanceSphere
    }),
    [props.soccer]
  )




  // Initial Configs -- Setting materials because they are not set


  // let soccerColor;
  // Handling tricky soccer bonds
  if (!props.soccer)
  {
    // Saving old material color
    var soccerColor = materials['soccer-material'].color;


    // Overwriting material color
    materials['soccer-material'].color = materials['carbon-material'].color;
  }


  if (props.soccer)
  {
    // materials['soccer-material'].color = soccerColor;

    nodes.soccerInstanceSphere.material = materials['soccer-material'];
    materials['soccer-material'].color = soccerColor;


    console.log('i executed');
    // console.log(`changed soccerColor ${soccerColor}`);


    // return (
    //   <Merged meshes={instances} props={props}>
    //     {(instances) => <Model instances={instances} props={props} />}
    //   </Merged>
    // )
  }

  return (
    <Merged meshes={instances} props={props}>
      {(instances) => <Model instances={instances} props={props} />}
    </Merged>
  )
}

function Model({ instances, props })
{
  const group = useRef()
  const { nodes, materials } = useGLTF('/lesson1_models/newFullerene11-transformed.glb')





  return (
    <group ref={group} props={props} dispose={null} scale={.25}>

      {props.dope ? <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} /> : ''}

      <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']}>
        <instances.CarbonInstanceSphere position={[0, 0.94, 0.34]} rotation={[-1.19, 0, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0, 0.73, 0.69]} rotation={[-1.02, 0, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.33, 0.94, 0.11]} rotation={[-1.45, 0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.65, 0.73, 0.21]} rotation={[-1.3, 0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, 0.94, -0.28]} rotation={[-1.88, 0.22, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.4, 0.73, -0.56]} rotation={[-2.2, 0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.94, -0.28]} rotation={[-1.88, -0.22, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.4, 0.73, -0.56]} rotation={[-2.2, -0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.33, 0.94, 0.11]} rotation={[-1.45, -0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.65, 0.73, 0.21]} rotation={[-1.3, -0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.33, 0.51, 0.79]} rotation={[-0.65, Math.PI / 6, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.65, 0.51, 0.56]} rotation={[-0.73, 0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.85, 0.51, -0.07]} rotation={[-1.74, 1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.73, 0.51, -0.45]} rotation={[-2.26, 0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, 0.51, -0.83]} rotation={[-2.59, 0.18, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.51, -0.83]} rotation={[-2.59, -0.18, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.73, 0.51, -0.45]} rotation={[-2.26, -0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.85, 0.51, -0.07]} rotation={[-1.74, -1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.65, 0.51, 0.56]} rotation={[-1.02, -0.67, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.33, 0.51, 0.79]} rotation={[-1.02, -0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, 0.17, 0.96]} rotation={[0, Math.PI / 10, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.4, -0.17, 0.9]} rotation={[0.16, 0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.85, 0.17, 0.49]} rotation={[-0.29, 1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.73, -0.17, 0.66]} rotation={[0.23, 0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.98, 0.17, 0.11]} rotation={[-1.02, 1.39, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.98, -0.17, -0.11]} rotation={[2.12, 1.39, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.73, 0.17, -0.66]} rotation={[-2.92, 0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.85, -0.17, -0.49]} rotation={[2.85, 1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.4, 0.17, -0.9]} rotation={[-2.98, 0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, -0.17, -0.96]} rotation={[2.99, 0.22, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.4, 0.17, -0.9]} rotation={[-2.98, -0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.17, -0.96]} rotation={[2.99, -0.22, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.73, 0.17, -0.66]} rotation={[-2.92, -0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.85, -0.17, -0.49]} rotation={[2.85, -1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.98, 0.17, 0.11]} rotation={[-1.02, -1.39, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.98, -0.17, -0.11]} rotation={[2.12, -1.39, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.85, 0.17, 0.49]} rotation={[-0.37, -1.24, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.73, -0.17, 0.66]} rotation={[0.55, -0.9, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, 0.17, 0.96]} rotation={[0.19, 0, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.4, -0.17, 0.9]} rotation={[0.35, -0.27, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.73, -0.51, 0.45]} rotation={[0.88, 0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.85, -0.51, 0.07]} rotation={[1.4, 1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.65, -0.51, -0.56]} rotation={[2.41, 0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.33, -0.51, -0.79]} rotation={[2.56, 0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.33, -0.51, -0.79]} rotation={[2.56, -0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.65, -0.51, -0.56]} rotation={[2.41, -0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.85, -0.51, 0.07]} rotation={[1.4, -1.02, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.73, -0.51, 0.45]} rotation={[0.88, -0.84, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.51, 0.83]} rotation={[0.55, -0.18, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, -0.51, 0.83]} rotation={[0.55, 0.18, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.4, -0.73, 0.56]} rotation={[0.94, 0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.2, -0.94, 0.28]} rotation={[1.26, 0.22, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.65, -0.73, -0.21]} rotation={[1.84, 0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0.33, -0.94, -0.11]} rotation={[1.69, 0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0, -0.73, -0.69]} rotation={[2.3, 0, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[0, -0.94, -0.34]} rotation={[1.95, 0, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.65, -0.73, -0.21]} rotation={[1.84, -0.69, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.33, -0.94, -0.11]} rotation={[1.69, -0.36, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.4, -0.73, 0.56]} rotation={[0.94, -0.4, -Math.PI / 2]} scale={0.06} />
        <instances.CarbonInstanceSphere position={[-0.2, -0.94, 0.28]} rotation={[1.26, -0.22, -Math.PI / 2]} scale={0.06} />
      </mesh>

      <mesh geometry={nodes['bonds-soccer'].geometry} material={materials['soccer-material']}>
        <instances.SoccerInstanceSphere position={[0, 0.73, 0.69]} rotation={[-0.46, 0, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[0.33, 0.51, 0.79]} rotation={[-0.46, 0, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.65, 0.51, 0.56]} rotation={[-0.23, -0.62, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.33, 0.51, 0.79]} rotation={[-0.35, -0.33, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[0.2, 0.17, 0.96]} rotation={[-0.46, 0, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.85, 0.17, 0.49]} rotation={[-0.23, -0.62, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.73, -0.17, 0.66]} rotation={[-0.23, -0.62, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.2, 0.17, 0.96]} rotation={[-0.35, -0.33, -Math.PI / 2]} scale={0.071} />
        <instances.SoccerInstanceSphere position={[-0.4, -0.17, 0.9]} rotation={[-0.23, -0.62, -Math.PI / 2]} scale={0.071} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/lesson1_models/newFullerene11-transformed.glb')