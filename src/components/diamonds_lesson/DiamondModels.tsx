// @ts-nocheck
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGLTF, MeshRefractionMaterial } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib';
// import { useControls } from 'leva';
import { MeshBasicMaterial } from 'three';


// useGLTF.preload('/lesson2_models/model0.glb');

function DiamondModels() {
  const ref = useRef();
  const counter = useSelector((state: any) => state.counter);
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')



  function Model({ ...props })
  {
    const group = useRef();
    let section = 0;
    const { nodes } = useGLTF(`/diamond_models/model${section}.glb`);

    // const { nodes, materials, animations } = useGLTF(`/lesson2_models/model${counter}.glb`)
    // const { actions } = useAnimations(animations, group);

    // useEffect(() =>
    // {
    //   const _animations = Object.values(actions);
    //   _animations.forEach((a) => a.play())
    // })

    if (section === 0){
      
      return (
      <>
        <group scale={.35}>
          <mesh geometry={nodes.Diamond_1_0.geometry} {...props} position={[0,-.25,0]}>
            <MeshRefractionMaterial envMap={texture} bounces={4} ior={2.4} color={'white'} aberrationStrength={.03} fresnel={.0002} fastChrom={true} toneMapped={false} />
          </mesh>
        </group>


        {/* <Tetrahedron  castShadow ref={ref} {...props} position={[0, 0, 0]} scale={.25}>
            <MeshRefractionMaterial envMap={texture} bounces={8} ior={2.4} abberationStrength={.01} fresnel={.00001} color={'white'} fastChrom={false} toneMapped={false} />
        </Tetrahedron>  */}
      </>
    )}

    if (section === 1) {
      return(
        <group ref={group} {...props} dispose={null} position={[0, 0, 0]} scale={10}>
          <group name="Scene">
              <group name="Empty001" position={[0, 1, 0]} scale={0.06}>
                <group name="Empty" position={[0, 0.06, 0]} scale={1.74}>
                  <group name="ZnS_Unit_Cell" rotation={[0, 0.15, 0]}>
                    <mesh name="Cube001" geometry={nodes.Cube001.geometry} ref={ref} material={MeshBasicMaterial}>
                    </mesh>

                    <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry}  material={MeshBasicMaterial}>
                      
                    </mesh>

                  </group>
                </group>
            </group>
          </group>
        </group>
      )
    }
  }


  if (counter === 0 ) {
    return <Model />
  } else return null; 

}

export default DiamondModels



// material={materials.Material}
// material={materials['S Material']}