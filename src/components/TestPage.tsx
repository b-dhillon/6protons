import { Plane, OrbitControls, PerspectiveCamera, useGLTF, useAnimations, useHelper } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect, Key } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import Universe from './Universe';
import scene_configs from './scene_configs';
import UpdateCamera from './UpdateCamera.jsx';
import { CameraHelper } from 'three';
import * as THREE from 'three';

/* 
To do 
- Turn your custom animations into AnimationAction instead of using useFrame(); 
    - This should enhance performance as the computations should be done ahead of time.
    - It will also increase animation control with .start(), .stop(), .clampWhenFinished() etc... methods on the AnimtionAction object. 
        - https://threejs.org/docs/#api/en/animation/AnimationAction
    - This will allow you to have central stores of data and a proper pipeline.
    - Implement this with the UpdateCamera animation as well. 


- Develop all scene camera animations 
- Add test models to all locations  
- Figure out why Models() is being called twice.
- Clean up and get a high level understanding of everything that you've re-factored.
*/



export default function Page( props: { page: string; } ) {
    // console.log('Page() called');

    const scene_config = scene_configs.find( (scene) => scene.id === props.page );  // if you make this global scope go remove all props that pass this object down 

    return (
        <Suspense>
            <UI />
            <Scene scene_config={ scene_config } />
        </Suspense>
    );
};

// Renders the 3D scene.
function Scene( props: { scene_config: any } ) {
    const counter = useSelector( ( state: any ) => state.counter );
    return (
        <Suspense>

            <Canvas>

                <Universe universe_config={ props.scene_config.universe_config }/>
                <Camera counter={ counter } camera_config={ props.scene_config.camera_config } />
                <Models models_config={ props.scene_config.models_config } />
                <ambientLight intensity={10}/>
                <spotLight position={[-10, 10, 10] } intensity={.9}/>
                <Plane position={[0,0,0]} scale={[.4, .4, 1]} />
                <DevelopmentCamera  />


            </Canvas>


        </Suspense>
    );
};

// Creates the camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_config: any } ) {
    const ref = useRef();
    useHelper(ref, CameraHelper);
    console.log( useThree( (state) => state ) );
    // const set = useThree( (state) => state.set ); 
    // useEffect( () => set({ camera: ref.current }) );

    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,5]} fov={45} near={.1} far={2}/>
            {/* <UpdateCamera _ref={ref} counter={counter} camera_config={camera_config} /> */}
            {/* ^ this fn should only be called when the camera is moving? */}            
        </>
    );
};



// Calls CreateModel() for each model in models_config and returns an array of models
function Models( props: { models_config: any } ) {
    const models = props.models_config.map( (model_config: { id: Key | null | undefined; }, i: number) => <CreateModel i={i} key={ model_config.id } model_config={ model_config }/>)
    // const scene = useThree( (state) => state.scene )
    // models.forEach( model => scene.add(model) );
    return (
        <>
            {models}
        </>
    )
};


// Grabs a GLTF file and creates a <group> of <mesh>es for each mesh in scene.children of the GLTF file. These will be mounted to the Three.state.scene.children array when you call Models();
let modelRefs: any[];
function CreateModel( props: { model_config: any, i: number } ) {

    modelRefs[props.i] = useRef();


    // Move this to a seperate init function. 
    // useGLTF to scrape the blender scene and add to your scene_data first.
    // This will create a universal store of data that CreateModel pulls from.
    // I think using a pipeline with a single store of data is best.
    // Build scene_data --> Scene( scene_data ) --> Three.scene 

    //@ts-ignore
    const { scene: gltf_scene, nodes, materials } = useGLTF( props.model_config.path );


    // Configuring animation to model:
    const rotate = props.model_config.methods?.animations?.rotate;
    /*
    useFrame( (_, delta) => { if( rotate ) rotate(modelRefs[i], delta) } );
    */

    
        useEffect( () => { 
            if( rotate ) {
                modelRefs[props.i].current.animations[0]();
            }
        });
    

    // Grabbing meshes from gltf scene object and creating a new react mesh for each one:
    const gltfMeshes = gltf_scene.children.filter( ( child: { isMesh: boolean, __removed: any } ) => child.isMesh && child.__removed === undefined );

    const reactMeshes = gltfMeshes.map( ( gltfMesh: any ) => {
            if( !props.i ) console.log(`model ${props.i}`, gltfMesh);
            return <mesh  key={ gltfMesh.uuid } name={ gltfMesh.name }  geometry={ gltfMesh.geometry }  material={ gltfMesh.material }  position={ gltfMesh.position } />
        }
    );


    const initial_position = props.model_config.positions[0];
    return (
        <group 
            scale={1} { ...props }
            animations={ [ rotate ] } 
            dispose={ null } 
            name={`test_page model${ props.i }` } 
            key={ `model${ props.i }` } 
            ref={ modelRefs[ props.i ] } 
            position={ [ initial_position.x, initial_position.y, initial_position.z ]
        }>
            { reactMeshes }
        </group>
    )
};

/* 
function AnimateModel() {
    const ref = modelRefs[i];
  
    function Rotate() {
        useFrame((_, delta) => {
            ref.current.rotation.y += (delta / 6)
        })
    };
  
    return <div>{x.current}</div>;
}

*/



// Renders the UI and creates event handlers to handle user input.
function UI() {
    // console.log('UI() called');

    const dispatch = useDispatch();
    return (
        <button 
            style={{
                position: 'absolute', 
                zIndex: '5', 
                width: '100px', 
                height: '33px'
            }} 
            onClick={ () => dispatch( increment() ) } 
        >
        Next
        </button> 
    )
}


// Creates a zoomed out camera with 360 orbit controls to make dev easier:
function DevelopmentCamera() {
    const ref: any = useRef();
    const set = useThree((state) => state.set);

    // Makes the camera known to the system:
    useEffect( () => set({ camera: ref.current }) );

    // Updates camera every frame:
    useFrame( () => { ref.current.updateMatrixWorld() } );

    // Adds 3D OrbitControls:
    function CameraControls() {
        const { camera, gl } = useThree();
        const ref: any = useRef();
        useFrame( (_, delta) => ref.current.update(delta) );
        return <OrbitControls ref={ref} args={[camera, gl.domElement]} />;
    };

    // Need to disable controls when camera is moving
    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,40]} fov={45} aspect={1}/>
            <CameraControls />
        </>
    );
};





// function Comments() {


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






























































/*
Is this necessary to hold in state? No because it doesn't need to be preserved between renders.
const [newCamera, setNewCamera] = useState(lesson.cameraSettings[0]);
useEffect( () => {
    setNewCamera( lesson.cameraSettings[counter] );
}, [counter]); 
*/