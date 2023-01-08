// @ts-nocheck
import { useState } from 'react';
import { Plane, OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import { CameraHelper } from 'three';
import Universe from './Universe';
import reactThreeFiber from '../react-three/fiber/dist/react-three-fiber.cjs';
// import scene_config_data from './scene_configs';
// import UpdateCamera from './UpdateCamera.jsx';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';



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



export default function Page( props ): any {

    const [ _scene, setScene ] = useState( props.data )

    return (
        <Suspense>
            <UI />
            <Scene _scene={ _scene } />
        </Suspense>
    );
};

// Renders the 3D scene.
function Scene( props ): any {

    const counter = useSelector( ( state: any ) => state.counter );
    return (
        <Suspense>

            <Canvas>

                <Universe _universe={ props._scene[0].universe } />
                <Camera counter={ counter } _camera={ props._scene[0].camera } />
                <Models _scene={ props._scene[0] } />

                <ambientLight intensity={10}/>
                <spotLight position={[-10, 10, 10] } intensity={.9}/>
                <Plane position={[0,0,0]} scale={[.4, .4, 1]} />
                <DevelopmentCamera  />


            </Canvas>


        </Suspense>
    );
};

// Creates the camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, _camera: any } ) {
    const ref = useRef();
    useHelper(ref, CameraHelper);
    // console.log( useThree( (state) => state ) );
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


// Calls CreateModel() for each model in _models[] and returns an array of models to mount to scene graph
function Models( props: any ) {    
    const models = props._scene.models.map( ( _model: any , i: number ) => <CreateModel _i={i} key={ _model.id } _models={ props._scene.models } _scene={ props._scene }/>)
    return (
        <>
            { models }
        </>
    )
};


// Grabs meshes from scene_config_data and creates a new react mesh for each one: 
// These will be mounted to the Three.state.scene.children array when you call Models();
let modelRefs: any[] = [];
function CreateModel( props: any ) {
    modelRefs[props._i] = useRef();

    console.log('CreateModel() called');




    const meshes = props._models[props._i].meshes.map( ( _mesh: any ) => {
        return <mesh  key={ _mesh.uuid } name={ _mesh.name }  geometry={ _mesh.geometry }  material={ _mesh.material }  position={ _mesh.position } />
    });


    const initial_position = props._scene.models[props._i].positions[0];
    return (
        <group 
            scale={1} { ...props }
            animations={ null } 
            dispose={ null } 
            name={`model${ props.i }` } 
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