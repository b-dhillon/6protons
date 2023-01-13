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
- Get models visibility toggling properly based on counter.
    - Two ways: 
        - 1. Mount only a single model based on the counter.
        - 2. Mount all the models and toggle their visibility based on counter.

    I need to figure out to proper toggle the model's visibility.


- After camera, add test models to all proper locations of lesson -- need to figure out what these locations are first.
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
    console.log( 'Scene() Called' );
    const counter = useSelector( ( state: any ) => state.counter );

    function StateCheck() {
        useThree( ( state ) => {
            console.log('state', state);
        });
    }




    return (
        <Suspense>
            <Canvas>

                < Universe universe_data={ props.data.universe } />
                < Camera counter={ counter } camera_data={ props.data.camera } />
                < Models data={ props.data } counter={ counter } />

                < ambientLight intensity={10} />
                < spotLight position={[-10, 10, 10] } intensity={.9} />
                < DevelopmentCamera  />
                < StateCheck />

            </Canvas>
        </Suspense>
    );
};

// Creates camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ) {
    const ref = useRef();
    const [ translateAnimationActions, setTranslateAnimationActions ] = useState( [] );
    const [ rotateAnimationActions, setRotateAnimationActions ] = useState( [] );
    const [ mixers, setMixers ] = useState( [] );


    // Loops through camera animations[] --> creates an AnimationAction for each rotation and translation animation:
    function CreateAllAnimationActions( fiber_camera, allAnimationData: any ) {
        let mixers = [];
        function CreateAnimationAction( animationData ) {
            const mixer = new THREE.AnimationMixer( fiber_camera );
            const animationAction = mixer.clipAction( animationData );
            animationAction.repetitions = 1;
            animationAction.clampWhenFinished = true;
            mixers.push( mixer );
            return animationAction
        }
        const allTranslateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[0] ) );
        const allRotateAnimationActions = allAnimationData.map( ( animationData: any ) => CreateAnimationAction( animationData[1] ) );
        setTranslateAnimationActions( allTranslateAnimationActions );
        setRotateAnimationActions( allRotateAnimationActions );
        setMixers( mixers );

    }; useEffect( () => CreateAllAnimationActions( ref.current, props.camera_data.animations ), [] );
                                                                    // ^  [ [ t, r ], [ t, r ] ]

    // Trigger proper camera animation based on counter:
    function AnimationController() {
        if( translateAnimationActions.length ) translateAnimationActions[ props.counter ].play();
        if( rotateAnimationActions.length ) rotateAnimationActions[ props.counter ].play();
        
    }; useEffect( AnimationController, [ translateAnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( mixers.length ) mixers[ props.counter ].update( delta );
    });
    useHelper(ref, CameraHelper);

    return (
        <>
            <PerspectiveCamera ref={ref} position={[0,0,5]} fov={45} near={.1} far={2}/>
            {/* <UpdateCamera _ref={ref} counter={ counter } camera_data={ camera_data } /> */}
        </>
    );
};


// Loops data.models[] --> returns array of fiber models to mount to scene graph
// Creates AnimationController: Counter changes --> animation at the current counter index is played.
function Models( props: any )  {  
    console.log('Models() Called');


    const [ refs, setRefs ] = useState( [] );
    const [ animations, setAnimations ] = useState( [] );
    const [ mixers, setMixers ] = useState( [] );

    // Adding animation to fiber model:
    function AddAnimationTo( fiber_model, i ) {
        const mixer = new THREE.AnimationMixer( fiber_model );


        const animation_data = props.data.models[i].animations[0];



        const animation = mixer.clipAction( animation_data );
        return [animation, mixer];

        // I want to set this once
        // setAnimations( ( animations: any ) => [...animations, animation ] );
        // setMixers( ( mixers: any ) => [...mixers, mixer ] );
    }; 



    // Need to update dependency array so that this is called after all refs are set.
    // Do I even need to do this. Lets walk through what I am even trying to accomplish here.
    useEffect(() => {
            const animationsAndMixers = refs.map( ( ref: any, i: number ) => AddAnimationTo( ref.current, i ));
            console.log('animationsAndMixers', animationsAndMixers);
            // [ [a0, m0] [a1, m1] [a2, m2] ]
            setAnimations( animationsAndMixers.map( ( animationAndMixer: any ) => animationAndMixer[0] ) );
            setMixers( animationsAndMixers.map( ( animationAndMixer: any ) => animationAndMixer[1] ) );
        
    }, [ refs ]);



    function AnimationController() {
        if( animations.length ) {
            // This is a side effect...change to setAnimations?
            animations.forEach( ( animation: any ) => {
                animation.stop();
                animation.reset();
            });
            animations[ props.counter ].play();
        }
    } useEffect( AnimationController, [ animations, props.counter ] );

    useFrame( ( _, delta ) => {
        if( mixers.length ) mixers[ props.counter ].update( delta );
    });


    useEffect( () => {
        console.log('animations', animations);
    }, [ animations ]);

    const sceneModels = props.data.models.map( ( model: any , i: number ) => 
        (<CreateModel 
            key={ model.id } 
            position={ model.positions[0] }
            name={ model.name }
            model={ model }
            setAnimations={ setAnimations }
            setMixers={ setMixers }
            setRefs={ setRefs }

            visible={ (props.counter === i ? true : false) }
        />)
    )

    return (
        <>
            { sceneModels }
        </>
    )
};


// Grabs meshes and animations from data --> creates a group of all the meshes per model:
// [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ) {
    console.log('CreateModel() Called');

    let modelName;

    // Creating fiber mesh:
    const ref = useRef();
    useEffect( () => {
        props.setRefs( (refs: any) => [...refs, ref] )
    }, []);

    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        modelName = mesh.name;
        return <mesh 
            geometry={ mesh.geometry } 
            material={ mesh.material }  
            ref={ ref }
            scale={ 1 } 
            key={ mesh.uuid } 
            name={ mesh.name }
        />
    });



    return (
        <group visible={ props.visible }isModel={true} name={ modelName } ref={ref} position={ [ props.position.x, props.position.y, props.position.z ] } >
            { fiber_model }
        </group>
    );
};



function ModelController() {
    const counter = useSelector( ( state: any ) => state.counter );
    const oldScene = useThree( ( state: any ) => state.scene );
    console.log('oldScene', oldScene);

    const sceneGraphChildren = useThree( ( state: any ) => state.scene.children );

    const newSceneGraphChildren = sceneGraphChildren.map( ( child: any ) => {
        return {
            ...child,
            visible: child.isModel ? false : true
        }
    });

    const newScene = {
        ...oldScene, 
        children: newSceneGraphChildren
    }





    const set = useThree( ( state: any ) => state.set );
    console.log('setter', set);
    console.log( useThree( ( state: any ) => state) );

    // .filter( ( child: any ) => child.name === 'Carbon_Nanotube' 


    useEffect( () => {
        console.log('newScene', newScene);
        set({ scene: newScene })
    }, []);

    return (
        <></>
    )
    // return (
    //     <Models counter={ counter } data={ data } />
    // )
}






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