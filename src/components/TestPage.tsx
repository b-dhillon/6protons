// @ts-nocheck
import { useState } from 'react';
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './redux/actions';
import { CameraHelper } from 'three';
import Universe from './Universe';
import * as THREE from 'three'
import UpdateCamera from './UpdateCamera.jsx';

/* 
To-do: 
    - Create smooth animation endings for camera.
    - Add test models to all proper locations of lesson -- need to figure out what these locations are first.
    - Add easing to animations.
    - Clean up and get a high level understanding of everything that you've re-factored.
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

    console.log( 'Scene() Called' );
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

// Creates camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ) {
    const ref: string = useRef();
    const [ translateAnimationActions, setTranslateAnimationActions ] = useState( [] );
    const [ rotateAnimationActions, setRotateAnimationActions ] = useState( [] );
    const [ mixers, setMixers ] = useState( [] );


    // Loops through camera animations[] --> creates an AnimationAction for each rotation and translation animation:
    function CreateAllAnimationActions( fiber_camera, allAnimationData: any ) {
        // let mixers = [];
        function CreateAnimationAction( animationData ) {
            const mixer = new THREE.AnimationMixer( fiber_camera );
            const animationAction = mixer.clipAction( animationData );
            animationAction.loop = THREE.LoopOnce;
            animationAction.clampWhenFinished = true;

            animationAction.startAt( 1 );
            return animationAction;
            // mixers.push( mixer );
        }

        const [ allTranslateAnimationActions, allRotateAnimationActions ] = allAnimationData.map( ( animationData: any ) => 
            [ CreateAnimationAction( animationData[0] ), allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[1] ) ) ] );

        // const allTranslateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[0] ) );
        // const allRotateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[1] ) );
        setTranslateAnimationActions( allTranslateAnimationActions );
        setRotateAnimationActions( allRotateAnimationActions );
        // setMixers( mixers );

    }; useEffect( () => CreateAllAnimationActions( ref.current, props.camera_data.animations ), [] );
                                                                    // ^  [ [ t, r ], [ t, r ] ]

    // Trigger proper camera animation based on counter:
    function AnimationController() {
        if( translateAnimationActions.length ) translateAnimationActions[ props.counter ].play()
        // if( translateAnimationActions.length ) translateAnimationActions[ props.counter ].warp( 1, .01, 5 ).play();

        // Do we achieve smooth ending by setting halt time to double duration? Idk, test this out next:
        // if( translateAnimationActions.length ) translateAnimationActions[ props.counter ].play().halt( 2 )
        // if( rotateAnimationActions.length ) rotateAnimationActions[ props.counter ].play();
        
    }; 
    useEffect( AnimationController, [ translateAnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( mixers.length ) mixers[ props.counter ].update( delta );

        // final position drop is .051, and then it is a sudden stop fixed at the value. Perhaps after this animation is done, we can 
        // blend another animation where it trends to another value? Because the other one doesn't stop suddenly, it keeps going and going. 
        // so we do one animation where we go from initial to final-1, and then another from final-1 to final. 

        // final position using TranslateZ = .039, final delta = .051
        // final position using Translate at 1s = 0, final delta = 0.5
        // final position using Translate at 3.37s  with smooth interpolation = 0, final delta = 0.0072
        
        // final position using Translate at 3.37s  with linear interpolation = 0, final delta = 0.0364

        // final posiition using UpdateCamera = 0.08, final delta = 0.00017


        // console.log(ref.current.position);
    });

    useHelper(ref, CameraHelper);
    console.log( CameraHelper );

    // const set = useThree((state) => state.set);

    // Makes the camera known to the system:
    // useEffect( () => set({ camera: ref.current }) );

    return (
        <>
            < PerspectiveCamera ref={ref} position={ [ 0,0,5 ] } fov={ 45 } near={.1} far={ 10 } />
            {/* < UpdateCamera _ref={ref} counter={ props.counter } camera_data={ props.camera_data } /> */}
        </>
    );
};


// Loops data.models[] --> returns array of fiber models to mount to scene graph. Controls animations: counter changes --> animation at the current counter index is played.
function Models( props: any )  {  

    const [ animationActions, setAnimationActions ] = useState( [] );

    useEffect( () => AnimationController( animationActions, props.counter ), [ animationActions, props.counter ] );

    useFrame( ( _, delta ) => {
        if( animationActions.length ) animationActions[ props.counter ]._mixer.update( delta );
    });

    const sceneModels = props.data.models.map( ( model: any , i: number ) => {
        return (
            <CreateModel 
                key={ model.id } 
                position={ model.positions[0] }
                name={ model.name }
                model={ model }
                setAnimationActions={ setAnimationActions }
                visible={ (props.counter === i ? true : false) }
            />
        );
    });

    return (
        <>
            { sceneModels }
        </>
    )
};


// Grabs meshes and animations from data --> returns a group of all the meshes of the model. [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ) {
    console.log('CreateModel() Called');

    const ref = useRef(), animationData = props.model.animations[0];
    let modelName;
    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        modelName = mesh.name;
        return <mesh 
            geometry={ mesh.geometry } 
            material={ mesh.material }  
            ref={ ref }
            scale={ props.model.scale } 
            key={ mesh.uuid } 
            name={ mesh.name }
        />
    });

    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ ...animationAction, CreateAnimationAction( ref.current, animationData ) ] ), []);
    return (
        <group visible={ props.visible } name={ modelName } ref={ref} position={ [ props.position.x, props.position.y, props.position.z ] } >
            { fiber_model }
        </group>
    );
};

function CreateAnimationAction( fiber_model, animationData ) {
    const mixer = new THREE.AnimationMixer( fiber_model );
    const animationAction = mixer.clipAction( animationData );
    return animationAction;
}; 

function AnimationController(animations: any, counter: number) {
    if( animations.length ) {
        // This is a side effect...change to setAnimations?
        animations.forEach( ( animation: any ) => {
            animation.stop();
            animation.reset();
        });
        animations[ counter ].play();
    }
}


// Renders UI + creates event handlers to handle user input.
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
            < PerspectiveCamera ref={ref} position={[40,0,0]} rotation={ [0, (Math.PI/2) , 0] } fov={45} aspect={1} />
            < CameraControls />
        </>
    );
};

// console.log( 'scene graph', useThree( (state) => state ) );
// const set = useThree( (state) => state.set ); 
// useEffect( () => set({ camera: ref.current }) );