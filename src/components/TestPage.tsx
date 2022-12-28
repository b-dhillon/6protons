// @ts-nocheck
import { Plane, OrbitControls, PerspectiveCamera, useGLTF, useAnimations, useHelper } from '@react-three/drei';
import { Suspense, useState, useRef, useEffect, Key } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import Universe from './Universe';
import scene_config_data from './scene_configs';
import UpdateCamera from './UpdateCamera.jsx';
import { CameraHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import Test from './unused_components/ModelLoader';



/* 
To do 
- RE DO PROPS
- Turn your custom animations into AnimationAction instead of using useFrame(); 
    - This should enhance performance as the computations should be done ahead of time.
    - It will also increase animation control with .start(), .stop(), .clampWhenFinished() etc... methods on the AnimtionAction object. 
        - https://threejs.org/docs/#api/en/animation/AnimationAction
    - This will allow you to have central stores of data and a proper pipeline.
    - Implement this with the UpdateCamera animation as well. 
- Develop all camera animations 
- After camera, add test models to all locations.
- Get models visibility and animation toggling properly.
- Figure out why Models() is being called twice.
- Clean up and get a high level understanding of everything that you've re-factored.
*/

const _page: string = 'test_page';
const _scene: object = scene_config_data.find( ( scene: { id: string; } ) => scene.id === page );
const _models: object[] = _scene.models; 
const _camera: object = _scene.camera;

export default function Page( props: { page: string; } ) {

    return (
        <Suspense>
            <UI />
            <Scene  />
        </Suspense>
    );
};

// Renders the 3D scene.
function Scene( ) {
    const counter = useSelector( ( state: any ) => state.counter );
    return (
        <Suspense>

            <Canvas>

                <Universe universe_config={ props.scene_config.universe_config }/>
                <Camera counter={ counter } camera_config={ props.scene_config.camera_config } />
                <Models scene_config={props.scene_config} models_config={ props.scene_config.models_config } set_scene_config={props.set_scene_config}/>
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
function Models() {
    
    const models = _models.map( ( model_config: any , i: number ) => <CreateModel i={i} key={ model_config.id } model_config={ model_config }/>)

    return (
        <>
            {models}
        </>
    )
};


// Grabs meshes from scene_config_data and creates a new react mesh for each one: 
// These will be mounted to the Three.state.scene.children array when you call Models();
let modelRefs: any[] = [];
function CreateModel( props: { model_config: any, i: number } ) {

    modelRefs[props.i] = useRef();

    const meshes = scene.models[i].meshes.map( ( mesh: any ) => {
            return <mesh  key={ mesh.uuid } name={ mesh.name }  geometry={ mesh.geometry }  material={ mesh.material }  position={ mesh.position } />
        }
    );

    const initial_position = scene.models[i].positions[0];
    return (
        <group 
            scale={1} { ...props }
            animations={ [ rotate ] } 
            dispose={ null } 
            name={`${page} model${ props.i }` } 
            key={ `model${ props.i }` } 
            ref={ modelRefs[ props.i ] } 
            position={ [ initial_position.x, initial_position.y, initial_position.z ]
        }>
            { meshes }
        </group>
    )
};



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