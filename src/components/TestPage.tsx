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
To-do: 
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


export default function Page( props ): any {
    const [ page ] = useState( props.data );

    return (
        <Suspense>
            <UI />
            <Scene data={ page } />
        </Suspense>
    );
};

// Mounts components to scene graph and renders 3D scene.
function Scene( props ): any {
    const counter = useSelector( ( state: any ) => state.counter );

    return (
        <Suspense>
            <Canvas>

                < Universe universe_data={ props.data.universe } />
                < Camera counter={ counter } camera_data={ props.data.camera } />
                < Models data={ props.data } counter={ counter } />

                < ambientLight intensity={10} />
                < spotLight position={[-10, 10, 10] } intensity={.9} />
                < DevelopmentCamera  />

            </Canvas>
        </Suspense>
    );
};





// Loops data.models[] --> returns array of fiber models to mount to scene graph
// Creates AnimationController: Counter changes --> animation at the current counter index is played.
function Models( props: any )  {  
    const [ animations, setAnimations ] = useState( [] );
    const [ mixers, setMixers ] = useState( [] );

    const sceneModels = props.data.models.map( ( model: any , i: number ) => 
        (<CreateModel 
            key={ model.id } 
            position={ model.positions[0] }
            name={ model.name }
            model={ model }
            setAnimations={ setAnimations }
            setMixers={ setMixers }
        />)
    )

    function AnimationController() {
        if( animations.length ) {
            // This is a side effect...change to setAnimations?
            animations.forEach( ( animation: any ) => {
                animation.stop();
                animation.reset();
            });
            animations[ props.counter ].play();
        }
    }

    useEffect( AnimationController, [ animations, props.counter ] );

    useFrame( ( _, delta ) => {
        if( mixers.length ) mixers[ props.counter ].update( delta );
    });

    return (
        <>
            { sceneModels }
        </>
    )
};


// Grabs meshes and animations from data --> creates a group of all the meshes per model:
// [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ) {

    // Creating fiber mesh:
    const ref = useRef();    
    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        return <mesh 
            geometry={ mesh.geometry } 
            material={ mesh.material }  
            ref={ ref }
            scale={ 1 } 
            key={ mesh.uuid } 
            name={ mesh.name }  
        />
    });

    // Adding animation to fiber model:
    function AddAnimationTo( fiber_model ) {
        const mixer = new THREE.AnimationMixer( fiber_model );
        const animation_data = props.model.animations[0];
        const animation = mixer.clipAction( animation_data )
        props.setAnimations( ( animations: any ) => [...animations, animation ] );
        props.setMixers( ( mixers: any ) => [...mixers, mixer ] );
    };

    useEffect(() => {
        AddAnimationTo( ref.current );
    }, []);

    return (
        <group ref={ref} position={ [ props.position.x, props.position.y, props.position.z ] } >
            { fiber_model }
        </group>
    );
};



// Creates camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ) {
    const ref = useRef();
    useHelper(ref, CameraHelper);

    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,5]} fov={45} near={.1} far={2}/>
            {/* <UpdateCamera _ref={ref} counter={ counter } camera_data={ camera_data } /> */}
        </>
    );
};


// Renders the UI and creates event handlers to handle user input.
function UI(): JSX.Element {
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
};


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

// console.log( 'scene graph', useThree( (state) => state ) );
// const set = useThree( (state) => state.set ); 
// useEffect( () => set({ camera: ref.current }) );