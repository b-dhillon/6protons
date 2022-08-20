import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFrame, } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei';

useGLTF.preload(`/lesson1_models/model1.glb`)
useGLTF.preload(`/lesson1_models/model2.glb`)
useGLTF.preload(`/lesson1_models/model3.glb`)
useGLTF.preload(`/lesson1_models/model4.glb`)
useGLTF.preload(`/lesson1_models/model5.glb`)


function LessonModels() {

  const counter = useSelector(state => state.counter);

  function Model({ ...props })
  {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(`/lesson1_models/model${counter}.glb`)
    const { actions } = useAnimations(animations, group)
    const positions = [.62, 0, -1];
    const scale = 0.10;

    useEffect(() =>
    {
      if(counter != 3)
      {
        const _animations = Object.values(actions);
        _animations.forEach((a) => a.play())

      }
    })

    const ref = useRef();

    function OscilateAnimation() {
        useFrame((state) => {
          ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 4.5
      })
    }
      
      if(counter === 0)
      {
        return (
          <group ref={group} {...props} dispose={null} scale={0.065}>
            <group name="Scene">
              <group name="animation-empty">
                <mesh name="carbon-atoms" geometry={nodes['carbon-atoms'].geometry} material={materials.Carbon} position={[1.02, 3.01, 1.45]} scale={0.23} />
                <mesh name="carbon-bonds" geometry={nodes['carbon-bonds'].geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
                <mesh name="soccer-pattern" geometry={nodes['soccer-pattern'].geometry} material={materials.Carbon} position={[0.18, 1.66, 3.07]} scale={0.23} />
              </group>
            </group>
          </group>
        )
      }

      else if(counter === 2){

        return (

          <group ref={group} {...props} dispose={null} position={positions} scale={scale}>
            <group name="Scene">
              <group name="animation-empty">
                <mesh name="carbon-atoms" geometry={nodes['carbon-atoms'].geometry} material={materials.Carbon} position={[1.02, 3.01, 1.45]} scale={0.23} />
                <mesh name="carbon-bonds" geometry={nodes['carbon-bonds'].geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
                <mesh name="soccer-pattern" geometry={nodes['soccer-pattern'].geometry} material={materials.Carbon} position={[0.18, 1.66, 3.07]} scale={0.23} />
              </group>
              <mesh name="Text" geometry={nodes.Text.geometry} material={materials['text-material']} position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
            </group>
          </group>
        )
      }

      else if(counter === 3) {
        
        OscilateAnimation();

        return (
          <group ref={ref} {...props} dispose={null} position={positions} scale={scale}>
            <mesh geometry={nodes.Text.geometry} material={materials['text-material']} position={[-0.93, -5, -1.06]} rotation={[Math.PI / 2, 0, 0.13]} scale={0.9} />
            <group position={[0.18, 1.66, 3.07]} scale={0.23} rotation={[0,-0.2,0]}>
              <mesh geometry={nodes.SurfSphere047.geometry} material={materials.Carbon} />
              <mesh geometry={nodes.SurfSphere047_1.geometry} material={materials['Material.001']} />
            </group>
          </group>
        )
      }

      else if(counter === 4) {
        return (
          <group ref={group} {...props} dispose={null} position={positions} scale={scale}>
            <group name="Scene">
              <group name="caffieneEmpty" rotation={[0, 0, -0.08]} scale={scale}>
                <group name="caffieneModel" position={[-1.87, 3.16, -1.95]} rotation={[1, 0, 0]} scale={0.16}>
                  <mesh name="SurfSphere003" geometry={nodes.SurfSphere003.geometry} material={materials.Hydrogen} />
                  <mesh name="SurfSphere003_1" geometry={nodes.SurfSphere003_1.geometry} material={materials.Oxygen} />
                  <mesh name="SurfSphere003_2" geometry={nodes.SurfSphere003_2.geometry} material={materials.Nitrogen} />
                  <mesh name="SurfSphere003_3" geometry={nodes.SurfSphere003_3.geometry} material={materials.Carbon} />
                </group>
              </group>
              <group name="fullereneEmpty" scale={scale}>
                <mesh name="buckyball_model" geometry={nodes.buckyball_model.geometry} material={materials['Carbon.001']} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
              </group>
              <mesh name="Text" geometry={nodes.Text.geometry} material={materials['text-material']} position={[-1, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
            </group>
        </group>
        )
      }

      else if(counter === 5){
        return (
          <group ref={group} {...props} dispose={null} position={positions}>
            <group name="Scene" scale={.023}>
              
              <group name="proteaseEmpty" rotation={[Math.PI, -1.17, Math.PI]} position={positions}>
                <mesh name="proteaseModel" geometry={nodes.proteaseModel.geometry} material={materials.Material_0} rotation={[0, -0.02, 0]} />
              </group>

              <group name="fullereneEmpty" position={[-1, -4.81, -0.77]} rotation={[0, 0.43, 0]}>
                <mesh name="fullereneModel" geometry={nodes.fullereneModel.geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
              </group>
              <mesh name="Text001" geometry={nodes.Text001.geometry} material={materials['text-material']} position={[-14, -20, 1]} rotation={[Math.PI / 2, 0, 0]} scale={3.03} />
            </group>
          </group>
        )
      }
    
    else return null;

  }

  if(counter === 0 || counter > 1 && counter < 6){
    return <Model />
  }

  else return null;
}

export default LessonModels;