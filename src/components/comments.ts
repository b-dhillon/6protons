//@ts-ignore
// const { scene: gltf_scene, nodes, materials } = await useGLTF( model_config.path);
// const gltf = useGLTF( model_config.path );
function Comments() {
        // Move this to a seperate init function. 
    // useGLTF to scrape the blender scene and add to your scene_data first.
    // This will create a universal store of data that CreateModel pulls from.
    // I think using a pipeline with a single store of data is best.
    // Build scene_data --> Scene( scene_data ) --> Three.scene 


    // Init to a central store of data: 



    // prev.models_config[props.i] = { ...prev.models_config, [props.i]: props.model_config } 



    // if(!props.i)console.log(props.model_config);



    // Adding the animation to model in scene:
    // const rotate = props.model_config.methods?.animations?.rotate;
    /*
    useFrame( (_, delta) => { if( rotate ) rotate(modelRefs[i], delta) } );
    */

    // Triggering the animation on the model by grabbing it from the Three Scene 
    // useEffect( () => { 
    //     if( rotate ) {
    //         modelRefs[props.i].current.animations[0]();
    //     }
    // });
    //  async function LoadModel( i, scene_config, model_configs, set_scene_config ) {
//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
//     loader.setDRACOLoader( dracoLoader );
    
//     // console.log(current_model);
//     // console.log( 'current_model', current_model.path);

//     function Promise_Model() {
//         return new Promise( (resolve, reject ) => {
//             const current_model = model_configs[i];
//             console.log( 'current_model', current_model.path);

//             loader.load(
//                 current_model.path,
//                 (gltf) => resolve( gltf ),
//             )
//         })

// console.log( 'model_config', current_model.id);

// loader.load( 
//     current_model.path, 
//     (gltf) => {
//         gltf_meshes[i] =  gltf.scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined );
//         // console.log( current_model.id, gltf);
//         // const current_model_meshes = gltf.scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined );
        
//         // const initialized_model_config = { ...model_config, gltf_meshes };
//         // console.log( 'initialized_model_config', initialized_model_config);


//         // const initialized_model_configs = scene_config.model_configs.map( 
//         //     (model_config: any)  => model_config.id === initialized_model_config.id ? initialized_model_config : model_config )

//         // // this shows that the only updated model_config in the array is the one that was just initialized.
//         // console.log(initialized_model_configs);

//         // const initialized_scene_config = { ...scene_config, model_configs: initialized_model_configs };
//         // set_scene_config( (prev: any) => initialized_scene_config );
//     },
//  );


//         // gltf.scene.traverse((child) => objects.push(child))

//         // const nodes = gltf.nodes;
//         // const materials = gltf.materials;
//         // const gltf_meshes = gltf.scene.children.filter( ( child: { isMesh: boolean, __removed: any } ) => child.isMesh && child.__removed === undefined );
        
//         // const initialized_model_config = { ...model_config, gltf_meshes, nodes, materials };
//         // const initialized_model_configs = scene_config.model_configs.map( (model_config: any)  => model_config.id === initialized_model_config.id ? initialized_model_config : model_config )
//         // const initialized_scene_config = { ...scene_config, model_configs: initialized_model_configs };
//         // set_scene_config( (prev: any) => initialized_scene_config );
//     }
//     const gltf: any = await Promise_Model(); // returns a promise that resolves to the gltf object
//     // console.log(gltf); // this is working properly



//     const meshes = await gltf.scene.children.filter( ( child: { isMesh: boolean, __removed: any } ) => child.isMesh && child.__removed === undefined );
//     console.log(gltf_meshes); // this is working properly




//     // Below is the problem 
//     // let new_scene = { ...scene, models: models.map( 
//     //     ( model, j ) => model.id === scene.models[j].id ? { ...model, meshes } : model
//     // )};


//     const new_scene_config = { ...scene_config, model_configs: [ ...scene_config.model_configs, model_configs[0] = { ...model_configs[0], gltf_meshes } ] };
    
//     console.log(new_scene_config);

//     set_scene_config( () => new_scene_config );






//     // const initialized_model_config = { ...scene_config.model_configs[0], gltf_meshes };




//     // scrapes the scene_config for all the model paths and initializes them
//     // by extracting the gltf's meshes and adding it to the state_object.
//     // for ( let i = 0; i < scene_config.model_configs.length; i++ ) {
//     //     Promise_Model( scene_config, set_scene_config, i );
//     // }

//     // let gltf_meshes = []; // an array of [meshes] from the gltf file


//     // async function Initialize_Models( scene_config: any, set_scene_config: Function ) {









//     //     const initialized_model_configs = await Promise.all( scene_config.model_configs.map( (model_config: any) => Initialize_Models( model_config ) ) );
//     //     const initialized_scene_config = { ...scene_config, model_configs: initialized_model_configs };
//     //     set_scene_config( (prev: any) => initialized_scene_config );
//     // }
// }

// { ...scene_config.model_configs, [i]: initialized_model_config }
       
    // function AnimateModel() {
    //     const ref = modelRefs[i];
    
    //     function Rotate() {
    //         useFrame((_, delta) => {
    //             ref.current.rotation.y += (delta / 6)
    //         })
    //     };
    
    //     return <div>{x.current}</div>;
    // }

        


    // console.log(model_config.path, animations);

    // const my_animations = model_config.methods.animations;


    // const blender_animations = gltf_scene.animations; // an array of AnimationClip objects

    
    // const { actions } = useAnimations(animations, modelRefs[i]);

    // console.log('animations', animations);
    // Action should only be played when the model is visible --> based on counter
    // actions[0].play();clear

    // const actions  = useAnimations(gltf_animations, modelRefs[i]); // useAnimation calls the AnimationAction() constructor 


    // if(!i)console.log('blender animation object', gltf_animations); // an array of AnimationClip objects
    // each AnimationClip object has a tracks property of type array that holds the animation data
        
    // if(!i) console.log('useAnimation actions object', actions);

    // if(!i) console.log('AnimationAction Values', Object.values(actions.actions));



    // Old Camera: 
    // const [ camera ] = useState( () => ConstructSceneCamera() );

    // function ConstructSceneCamera() {
    //     const cam = new THREE.PerspectiveCamera(45, 1, .1, 1);
    //     cam.position.set(0, 0, 5);
    //     return cam;
    // };



    // Calling CreateModel() for each model in the model_config object:
    // let models = [];
    // const modelCount = Object.keys(models_config).length; // do I need to do a hasOwnProperty check here for edge case?
    // for (let i = 0; i < modelCount; i++) {
    //     models[i] = (<CreateModel i={ i } key={ models_config[i].id } id={ models_config[i].id } on={ models_config[i].on }  model_config={ models_config[i] }/>);
    //     console.log(`mounted model${i}`);
    // };
//     /*
// let reactMeshes = [];
// for (let i = 0; i < blenderMeshes.length; i++) {
//     reactMeshes[i] = 
//         <mesh 
//             key={ blenderMeshes[i].uuid }
//             name={ blenderMeshes[i].name } 
//             geometry={ blenderMeshes[i].geometry } 
//             material={ blenderMeshes[i].material } 
//             position={ blenderMeshes[i].position }
//         />
//     console.log(`created model${i}`)
// };


//     // Need to get access to gltf --> whats the difference between the gltf object 
//     // and nodes and materials from useGLTF()?

//     gltfLoader.load( path, (gltf) => {
//         jsx = parse('model0.glb', gltf);
//         console.log('model parsed as string');
//     });
//     gltf.scene.traverse((child) => objects.push(child))

 
//     */
   
//     /*

//     const Models = scene_config.models.map(model => (<CreateModel key={model.id} id={model.id} on={model.on} />))

//     <group { ...props } dispose={ null } key={ `model${i}` } ref={ modelRefs[i] } position={ [ initialPosition.x, initialPosition.y, initialPosition.z ] }>
//         <group name="Scene">
//             ${sceneMeshes}
//         </group>
//     </group>


//     // I NEED A WAY TO PROGRAMATICALLY CREATE WHATS BELOW:
//     scene = 

//         <group name="Scene">
//             <mesh name="Carbon_Nanotube" geometry={nodes.Carbon_Nanotube.geometry} material={materials['Carbon Nanotube Material']} position={[0, -4, 0,]}   />
//         </group>


//     // Old default model:
//     return (
//         <group key={ `model${i}` } ref={ modelRefs[i] } position={ [ initialPosition.x, initialPosition.y, initialPosition.z ] }>
//             <mesh>
//                 <boxBufferGeometry />
//                 <meshStandardMaterial />
//             </mesh>
//         </group>
//     );

//     function AddModels() {
//         const model0 = Model0();
//         const model1 = Model1();
//         const model2 = Model2();
//         const model3 = Model3();
//         const model4 = Model4();


//         const { scene } = useThree();
//         scene.add(model0, model1, model2, model3, model4);
//     }

//     useGLTF.preload('/Poimandres.gltf')

//     function UpdateModel() {
        
//     // Grabbing new model values from global data object based on counter:
//     const new = scene.models[counter];

//     const [x, y, z] = [nC.position.x, nC.position.y, nC.position.z];
//     const [rX, rY, rZ] = [nC.rotation.x, nC.rotation.y, nC.rotation.z];

//     // Updating old camera values:
//     useFrame((_, delta) => {
//         model.position.set ( 
//             lerp(camera.position.x, x, delta), 
//             lerp(camera.position.y, y, delta), 
//             lerp(camera.position.z, z, delta) 
//         );

//         camera.rotation.set (
//             lerp(camera.rotation.x, rX, delta * 3),
//             lerp(camera.rotation.y, rY, delta * 3),
//             lerp(camera.rotation.z, rZ, delta * 3)
//         );

//         camera.updateMatrixWorld();
//     });
// }

//     */

// }

}