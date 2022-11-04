// import React, { useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useFrame, } from '@react-three/fiber'
// import { useGLTF, useAnimations } from '@react-three/drei';
// import NewFullerene from './NewFullerene'
// import NewFullerene12 from './NewFullerene12'

// function FullereneModels() {
  // const counter = useSelector(state => state.counter);

  // if (counter === 2) {
  //   return <NewFullerene/>
  // }

  // if (counter === 3) {
  //   return <NewFullerene soccer={true}/>
  // }





  

  

  // function Model2({...props})
  // {
  //   console.log('Model re-executed');

  //   // const group = useRef();
  //   // const ref = useRef();
  //   // const { nodes, materials, animations } = useGLTF(`/lesson1_models/model${(counter === 3 ? counter - 1 : counter)}.glb`);
  //   // const actions = useAnimations(animations, group);
  //   // console.log(actions);
  //   const positions = [.3, 0,0];
  //   const positions2 = [.25, 0,0];
  //   const scale = 0.05;

  //   // useEffect(() =>
  //   // {
  //   //   if( counter === 4 )
  //   //   {
  //   //     console.log('hello');
  //   //     const _animations = Object.values(actions);
  //   //     _animations.forEach((a) => a.play())
  //   //   }
  //   // })


  //   // function OscilateAnimation() {
      //   useFrame((state) => {
      //     ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 4.5
      // })
  //   // }

  //   // Store the current rotation in an object (like in bananas project) and then use that rotation for the next one too.
  //   function RotateAnimation() {
  //     useFrame((_, delta) => {
  //       ref.current.rotation.y += (delta / 6)
  //     })
  //   }  


  //   const ref = useRef();

  //   if(counter === 0) {
  //     console.log(counter);
  //     return (
  //       <FullereneModel dope={false} soccer={false}/>
  //     )
  //   }

  //   if(counter === 3) {
  //     console.log('counter = 3')
  //     return (
  //       <FullereneModel soccer={true} />
  //     )
  //   }

  //   if(counter === 4){
  //     return (
  //       <FullereneModel dope={true} soccer={true}/>
  //     )
  //   }

  //   if(counter === 5){
  //     return (
  //       <FullereneModel dope={true} soccer={true}/>
  //     )
  //   }
  //   else return null;

    




  //   // Best looking but INSTANCES NOT SHOWING
  //   // const { nodes, materials } = useGLTF('/lesson1_models/newFullerene6-transformed.glb');

  //   // if(counter === 0) {
  //   //   return (
  //   //     <group ref={ref} {...props} dispose={null} scale={0.25}>
  //   //       <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} />
  //   //       <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']} />
  //   //       <mesh geometry={nodes['bonds-soccer'].geometry} material={materials['soccer-material']} />
  //   //     </group>
  //   //   )
  //   // }
    

  //   // NEW BUT TWISTED BONDS
  //   // const { nodes, materials } = useGLTF('/lesson1_models/newFullerene4-transformed.glb')
  //   // if(counter === 0) {
  //   //   RotateAnimation();
  //   //   return (
  //   //     <group ref={ref} {...props} dispose={null} scale={0.25} rotation={[0, Math.PI, 0]}>
  //   //       {/* <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} /> */}
  //   //       <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']} />
  //   //       <mesh geometry={nodes['bonds-soccer'].geometry} material={materials['carbon-material']} />
  //   //       <mesh geometry={nodes['atoms-rest'].geometry} material={materials['carbon-material']} position={[0, 0.94, 0.34]} rotation={[-1.19, 0, -Math.PI / 2]} scale={0.08} />
  //   //       <mesh geometry={nodes['atoms-soccer'].geometry} material={materials['carbon-material']} position={[-0.65, 0.51, 0.56]} rotation={[-1.02, -0.67, -Math.PI / 2]} scale={0.08} />
  //   //     </group>
  //   //   )
  //   // }


  //   // NEW BUT TRIANGULAR BONDS
  //   // const { nodes, materials } = useGLTF('/lesson1_models/newFullerene5-transformed.glb')
  //   // if(counter === 0) {
  //   //     RotateAnimation();
  //   //     return (
  //   //       <group ref={ref} {...props} dispose={null} scale={.25} rotation={[0, Math.PI, 0]}>
  //   //         {/* <mesh geometry={nodes['atom-dope'].geometry} material={materials['dope-material']} scale={0.62} /> */}
  //   //         <mesh geometry={nodes['bonds-rest'].geometry} material={materials['carbon-material']} />
  //   //         <mesh geometry={nodes['bonds-soccer'].geometry} material={materials['carbon-material']} />
  //   //         <mesh geometry={nodes['atoms-rest'].geometry} material={materials['carbon-material']} position={[0, 0.94, 0.34]} rotation={[-1.19, 0, -Math.PI / 2]} scale={0.08} />
  //   //         <mesh geometry={nodes['atoms-soccer'].geometry} material={materials['carbon-material']} position={[-0.65, 0.51, 0.56]} rotation={[-1.02, -0.67, -Math.PI / 2]} scale={0.08} />
  //   //       </group>
  //   //       )
  //   //     }



        
        
    
  //   // const { nodes, materials } = useGLTF('/lesson1_models/model0.glb')
  //   // if(counter === 0)
  //   // {
  //   //   RotateAnimation();
  //   //   return ( 
  //   //     <group ref={ref} {...props} dispose={null} scale={.07}>
  //   //       <mesh geometry={nodes.fullerene.geometry} material={materials['Material.001']} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
  //   //     </group>
  //   //   )
  //   // }

  //   // if(counter === 2) {
  //   //   // RotateAnimation();
  //   //   // counter === 2 ? RotateAnimation() : OscilateAnimation();
  //   //   return (
  //   //     <group ref={ref} {...props} dispose={null} position={positions2} scale={scale}>
  //   //       { counter === 3 ? <mesh geometry={nodes.Text.geometry} material={materials['text-material']} position={[-0.93, -5, -1.06]} rotation={[Math.PI / 2, 0, 0.13]} scale={0.9} /> : ''}

  //   //       <group position={[0.18, 1.66, 3.07]} scale={0.23} rotation={[0,-0.2,0]}>
  //   //         <mesh geometry={nodes.SurfSphere047.geometry}  material={materials['Material.001']}  /> 
  //   //         <mesh geometry={nodes.SurfSphere047_1.geometry} material={materials['Material.001']} /> 
  //   //       </group>
  //   //     </group>

        
  //   //   )
  //   // }

  //   // if (counter === 3) {
  //   //   return (
  //   //     <group ref={ref} {...props} dispose={null} position={positions2} scale={scale}>
  //   //       { counter === 3 ? <mesh geometry={nodes.Text.geometry} material={materials['text-material']} position={[-0.93, -5, -1.06]} rotation={[Math.PI / 2, 0, 0.13]} scale={0.9} /> : ''}

  //   //       <group position={[0.18, 1.66, 3.07]} scale={0.23} rotation={[0,-0.2,0]}>
  //   //         <mesh geometry={nodes.SurfSphere047.geometry}  material={materials['Material.001']} material-color={ counter === 3 ? "hotpink" : ""} /> 
  //   //         <mesh geometry={nodes.SurfSphere047_1.geometry} material={materials['Material.001']} /> 
  //   //       </group>
  //   //     </group>

        
  //   //   )

  //   // }

  //   // if(counter === 4) {
  //   //   return (
  //   //     <group ref={group} {...props} dispose={null} position={positions} scale={scale}>
  //   //       <group name="Scene">
  //   //         <group name="caffieneEmpty" rotation={[0, 0, -0.08]} scale={scale}>
  //   //           <group name="caffieneModel" position={[-1.87, 3.16, -1.95]} rotation={[1, 0, 0]} scale={0.16}>
  //   //             <mesh name="SurfSphere003" geometry={nodes.SurfSphere003.geometry} material={materials.Hydrogen} />
  //   //             <mesh name="SurfSphere003_1" geometry={nodes.SurfSphere003_1.geometry} material={materials.Oxygen} />
  //   //             <mesh name="SurfSphere003_2" geometry={nodes.SurfSphere003_2.geometry} material={materials.Nitrogen} />
  //   //             <mesh name="SurfSphere003_3" geometry={nodes.SurfSphere003_3.geometry} material={materials.Carbon} />
  //   //           </group>
  //   //         </group>
  //   //         <group name="fullereneEmpty" scale={scale}>
  //   //           <mesh name="buckyball_model" geometry={nodes.buckyball_model.geometry} material={materials['Carbon.001']} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
  //   //         </group>
  //   //         <mesh name="Text" geometry={nodes.Text.geometry} material={materials['text-material']} position={[-1, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
  //   //       </group>
  //   //     </group>
  //   //   )
  //   // }

  //   // if(counter === 5){
  //   //   return (
  //   //     <group ref={group} {...props} dispose={null} position={positions} scale={0.009}>
  //   //       <group name="Scene">
            
  //   //         <group name="proteaseEmpty" rotation={[Math.PI, -1.17, Math.PI]} position={positions}>
  //   //           <mesh name="proteaseModel" geometry={nodes.proteaseModel.geometry} material={materials.Material_0} rotation={[0, -0.02, 0]} />
  //   //         </group>

  //   //         <group name="fullereneEmpty" position={[-1, -4.81, -0.77]} rotation={[0, 0.43, 0]}>
  //   //           <mesh name="fullereneModel" geometry={nodes.fullereneModel.geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
  //   //         </group>
  //   //         <mesh name="Text001" geometry={nodes.Text001.geometry} material={materials['text-material']} position={[-14, -20, 1]} rotation={[Math.PI / 2, 0, 0]} scale={3.03} />
  //   //       </group>
  //   //     </group>
  //   //   )
  //   // } else return null;
  // }

  // if(Model2){
  //   return <Model2 />
  // }

  // return <NewFullerene12 />;
// }

// export default FullereneModels;
