// @ts-nocheck
import { useState } from 'react';
import { OrbitControls, PerspectiveCamera, useHelper, useAnimations } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import { CameraHelper } from 'three';
import Universe from './Universe';
import * as THREE from 'three'
// import scene_config_data from './scene_configs';
// import UpdateCamera from './UpdateCamera.jsx';




/* 
To do: 
 - Get the test animation to play.


- Develop all camera animations 
- After camera, add test models to all proper locations of lesson -- need to figure out what these locations are first.
- Get models visibility and animation toggling properly based on counter.
- Figure out why Models() is being called twice.
- Clean up and get a high level understanding of everything that you've re-factored.



- Reasonging for switching from useFrame() to AnimationActions
    - This should enhance performance as the computations should be done ahead of time.
    - It will also increase animation control with .start(), .stop(), .clampWhenFinished() etc... methods on the AnimtionAction object. 
        - https://threejs.org/docs/#api/en/animation/AnimationAction
    - This will allow you to have central stores of data and a proper pipeline.
    - Implement this with the UpdateCamera animation as well. 
*/


// Either the animation is bunk or you are not connecting the animation to the proper model object.
// You could perhaps be connecting it to the data object and not the scene obj






export default function Page( props ): any {

    const [ data, setData ] = useState( props.data );



    return (
        <Suspense>
            <UI />
            <Scene data={ data } />
        </Suspense>
    );
};

// Renders the 3D scene.
function Scene( props ): any {

    const counter = useSelector( ( state: any ) => state.counter );




    return (
        <Suspense>

            <Canvas>

                <Universe universe_data={ props.data.universe } />
                <Camera counter={ counter } camera_data={ props.data.camera } />
                <Models data={ props.data } />

                <ambientLight intensity={10}/>
                <spotLight position={[-10, 10, 10] } intensity={.9}/>
                <DevelopmentCamera  />


            </Canvas>


        </Suspense>
    );
};

// Creates the camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ) {
    const ref = useRef();
    useHelper(ref, CameraHelper);
    // console.log( 'scene graph', useThree( (state) => state ) );

    // const set = useThree( (state) => state.set ); 
    // useEffect( () => set({ camera: ref.current }) );

    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,5]} fov={45} near={.1} far={2}/>
            {/* <UpdateCamera _ref={ref} counter={ counter } camera_data={ camera_data } /> */}
            {/* ^ this fn should only be called when the camera is moving? */}            
        </>
    );
};


// Calls CreateModel() for each model in _models[] and returns an array of models to mount to scene graph
function Models( props: any ) {  

    const models = props.data.models.map( ( _model: any , i: number ) => 
        <CreateModel _i={i} key={ _model.id } models={ props.data.models } data={ props.data }/>
    )

    return (
        <>
            { models }
        </>
    )
};


// Grabs meshes from data and creates a react-mesh for each one: 
// [ meshes ] are mounted to the scene graph when you call Models();
function CreateModel( props: any ) {

    const initial_position = props.data.models[ props._i ].positions[0];
    const meshesOfModel = props.models[ props._i ].meshes.map( ( _mesh: any ) => {
        return <mesh 
            ref={ ref }
            scale={1} 
            key={ _mesh.uuid } 
            name={ _mesh.name }  
            geometry={ _mesh.geometry } 
            material={ _mesh.material }  
            position={ [ initial_position.x, initial_position.y, initial_position.z ]}
            // position={ _mesh.position } 
        />
    });


    // Animation System --> Need to create controller and get rid of hard coded data
    const ref = useRef();
    let mixer; 
    const animationData  = props.data.models[0].animations[0]
    const animationData2  = props.data.models[1].animations[0]
    function StartAnimation() {
        if (props._i === 1) {
            mixer = new THREE.AnimationMixer( ref.current ); // will we ever have more than 1 mesh per model? In other words, does it need to be an array of meshes 
            const clips = animationData;
            const clip = animationData;
            const action = mixer.clipAction( clip )
            action.play();
        } else {
            mixer = new THREE.AnimationMixer( ref.current ); // will we ever have more than 1 mesh per model? In other words, does it need to be an array of meshes 
            const clips = animationData;
            const clip = animationData2;
            const action = mixer.clipAction( clip )
            action.play();
        }
    }

    useEffect(() => {
        StartAnimation();
    }, [mixer])

    useFrame( ( _, delta ) => {
        if( mixer ) mixer.update( delta );
    } ) 


    return (
        <>
            { meshesOfModel }
        </>
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