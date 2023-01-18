// @ts-nocheck
import { ReactElement, useState } from 'react';
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
    
    - Make visible to invisible transition smoother.
        - Make the model scale to near zero right after counter is incremented.
        - Make the next model scale backwards from zero to its original scale, after the camera approaches. 

    - Add test models to all proper locations of lesson -- need to figure out what these locations are first.
    - Create all move and rotate camera functions.
    - Run TestPage with AllFullereneModelsCombined.
    

    - Clean up and get a high level understanding of everything that you've re-factored.

*/

export default function Page( props ): JSX.Element {

    const [ page ] = useState( props.data );

    return (
        < Suspense >
            < UI />
            < Scene data={ page } />
        </ Suspense >
    );
};

// Mounts components to scene graph and renders 3D scene.
function Scene( props ): JSX.Element {

    const counter = useSelector( ( state: any ) => state.counter );



    return (
        < Suspense >
            < Canvas >

                < Universe universe_data={ props.data.universe } />
                < Camera counter={ counter } camera_data={ props.data.camera } />
                < Models data={ props.data } counter={ counter } />

                < ambientLight intensity={ .25 } />
                < spotLight position={ [ -10, 10, 10 ] } intensity={ 0.9 } />
                < DevelopmentCamera  />

            </ Canvas >
        </ Suspense >
    );
};

// Creates camera, handles its updates and renders the cameraHelper when called.
function Camera( props: { counter: number, camera_data: any } ): JSX.Element {

    const ref: string = useRef();
    const [ translateAnimationActions, setTranslateAnimationActions ] = useState( [] );
    const [ rotateAnimationActions, setRotateAnimationActions ] = useState( [] );

    // Loops through camera animations[] --> creates an AnimationAction for each rotation and translation animation:
    function CreateAllAnimationActions( fiberCameraRef, allAnimationData: [][] ) {

        function CreateCameraAnimationAction( animationData ): THREE.AnimationAction {
            const mixer = new THREE.AnimationMixer( fiberCameraRef );
            const animationAction = mixer.clipAction( animationData );
            animationAction.loop = THREE.LoopOnce;
            animationAction.clampWhenFinished = true;
            return animationAction;
        };

        const allTranslateAnimationActions = allAnimationData.map( ( animationData: [] ) => CreateCameraAnimationAction( animationData[0] ) );
        const allRotateAnimationActions = allAnimationData.map( ( animationData: [] ) => CreateCameraAnimationAction( animationData[1] ) );
        setRotateAnimationActions( allRotateAnimationActions );
        setTranslateAnimationActions( allTranslateAnimationActions );
        /*
        const [ allTranslateAnimationActions, allRotateAnimactionActions ] = allAnimationData.map( ( animationData: any ) => {
            console.log( 'animationData', animationData );
            return [ CreateAnimationAction( animationData[ 0 ] ), CreateAnimationAction( animationData[ 1 ] ) ]
        });
        */
    }; 

    useEffect( () => {
        CreateAllAnimationActions( ref.current, props.camera_data.animations ) 
        // console.log('allAnimationData' ,props.camera_data.animations); // [ [ t, r ], [ t, r ] ]
    }, [] );
                                                         

    // Trigger proper camera animation based on counter:
    function AnimationController() {
        if( translateAnimationActions.length ) {
            translateAnimationActions[ props.counter ].play().warp( 1.3, 0.01, 4.5 )
            rotateAnimationActions[ props.counter ].play().warp( 1.3, 0.01, 4.5 )
            // translateAnimationActions[ props.counter ].play().halt( 5 )

        }
        // if( rotateAnimationActions.length ) rotateAnimationActions[ props.counter ].play();
    }; 
    useEffect( AnimationController, [ translateAnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( translateAnimationActions.length ) {
            translateAnimationActions[ props.counter ]._mixer.update( delta );
            rotateAnimationActions[ props.counter ]._mixer.update( delta )
        };
    });

    useHelper( ref, CameraHelper );

    // useEffect( () => SetCamera( ref.current ) ); 
    const set = useThree((state) => state.set);
    useEffect( () => set({ camera: ref.current }) );

    return (
        <>
            < PerspectiveCamera ref={ref} position={ props.camera_data.initialPosition } fov={ 45 } near={.1} far={ 10 } />
            {/* < UpdateCamera _ref={ref} counter={ props.counter } camera_data={ props.camera_data } /> */}
        </>
    );
};

function SetCamera( _camera ): void {
    const set = useThree((state) => state.set);
    set( { camera: _camera } );
}


// Loops data.models[] --> returns array of fiber models to mount to scene graph. Controls animations: counter changes --> animation at the current counter index is played.
function Models( props: any ): JSX.Element  {  

    const [ animationActions, setAnimationActions ] = useState( [] );
    // [ [ mainModelAnimation, scaleAnimation ], [], [] ]

    useEffect( () => AnimationController( animationActions, props.counter ), [ animationActions, props.counter ] );

    useFrame( ( _, delta ) => {
        if( animationActions.length ) animationActions[ props.counter ][0]._mixer.update( delta );
        if( animationActions.length && props.counter > 0 ) animationActions[ (props.counter - 1) ][1]._mixer.update( delta );
    });

    const sceneModels = props.data.models.map( ( model: any , i: number ) => {
        return (
            <CreateModel 
                key={ model.id } 
                modelNumber={ model.modelNumber }
                position={ model.positions[0] }
                name={ model.name }
                model={ model }
                setAnimationActions={ setAnimationActions }
                // visible={ ( props.counter === i ? true : false ) }
            />
        );
    });

    const sceneGraphModels = useThree( (state) => state.scene.children );

    useEffect( () => {
        console.log(
            'sceneGraphModels',
            sceneGraphModels
        );
    }, [sceneGraphModels] );


    return (
        <>
            { sceneModels }
        </>
    );
};

function AnimationController( animationActions: any, counter: number ): void {
    if( animationActions.length ) {
        // This is a side effect...change to setAnimations?
        // animationActions.forEach( ( animationAction: any ) => {
        //     animationAction.stop();
        //     animationAction.reset();
        // });
        // console.log( 'animationActions', animationActions);
        // animationActions[ counter ][0].play();

        // animationActions[ counter ][1].startAt( 1 );
        // animationActions[ counter ][1].play()


        // animationActions[ counter ][1]._mixer._root.modelNumber === (counter - 1) ? animationActions[ counter-1 ][1].play() : animationActions[ counter-1 ][1].stop();
    }

    if( animationActions.length && counter > 0) {
        animationActions[ (counter - 1) ][1].play();
    }

}


// Grabs meshes and animations from data --> returns a group of all the meshes of the model. [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ): JSX.Element {

    const ref = useRef(), animationData = props.model.animations;
    let modelName = props.name;
    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        // modelName = mesh.name;
        
        // Are these really instances? Or is Three making a seperate draw call for each sphere?
        let instances = [];
        if ( mesh.children.length ) {
            instances = mesh.children.map( ( child: any ) => {
                return <mesh 
                    geometry={ child.geometry } 
                    material={ child.material }  
                    ref={ ref }
                    key={ child.uuid } 
                    name={ child.name }
                    position={ child.position }
                    scale={ child.scale }
                />
            });
        }


        return (
            <mesh 
                geometry={ mesh.geometry } 
                material={ mesh.material }  
                ref={ ref }
                key={ mesh.uuid } 
                name={ mesh.name }
                position={ mesh.position }
                scale={ mesh.scale }
            >
                { instances }
            </mesh>
        )
    });

    // Creates AnimationAction from _data, attaches it to this model, and pushes it to Model()'s state
    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ ...animationAction, [ CreateAnimationAction( ref.current, animationData[0] ), CreateAnimationAction( ref.current, animationData[1], true, true ) ] ] ), []);

    return (
        <group modelNumber={ props.modelNumber } visible={ props.model.visible } name={ modelName } ref={ref} position={ [ props.position.x, props.position.y, props.position.z ] } >
            { fiber_model }
        </group>
    );
};


function CreateAnimationAction( fiber_model, animationData, clamped, noLoop ): THREE.AnimationAction {

    const mixer = new THREE.AnimationMixer( fiber_model );
    const animationAction = mixer.clipAction( animationData );
    animationAction.clampWhenFinished = clamped;
    if ( noLoop ) animationAction.setLoop( THREE.LoopOnce );
    return animationAction;
}; 



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
function DevelopmentCamera(): JSX.Element {
    const ref: any = useRef();
    const set = useThree(( state ) => state.set );

    // // Makes the camera known to the system:
    // useEffect( () => set( { camera: ref.current } ) );
    // useFrame( () => { ref.current.updateMatrixWorld() } );

    // Adds 3D OrbitControls:
    function CameraControls() {
        const { camera, gl } = useThree();
        const ref: any = useRef();
        useFrame( ( _, delta ) => ref.current.update( delta ) );
        return <OrbitControls ref={ ref } args={ [ camera, gl.domElement ] } />;
    };

    // Need to disable controls when camera is moving
    return (
        <>
            < PerspectiveCamera ref={ref} position={[40,0,0]} rotation={ [0, (Math.PI/2) , 0] } fov={45} aspect={1} />
            {/* < CameraControls /> */}
        </>
    );
};

// console.log( 'scene graph', useThree( (state) => state ) );
// const set = useThree( (state) => state.set ); 



/*
delta = .008, 8ms.


final position drop is .051, and then it is a sudden stop fixed at the value. Perhaps after this animation is done, we can 
blend another animation where it trends to another value? Because the other one doesn't stop suddenly, it keeps going and going. 
so we do one animation where we go from initial to final-1, and then another from final-1 to final. 

final position using TranslateZ = .039, final delta = .051
final position using Translate at 1s = 0, final delta = 0.5
final position using Translate at 3.37s  with smooth interpolation = 0, final delta = 0.0072
final position using Translate at 3.37s  with linear interpolation = 0, final delta = 0.0364
final posiition using UpdateCamera = 0.08, final delta = 0.00017


function getLerpValues( final, initial ) {
    let _initial = initial;
    const lerpValues = [ 5 ];
    for( let i = 0; i < 70; i++ ) {
        lerpValues.push( _initial + ( ( final - _initial ) * .008 ) );
        _initial += ( ( final - initial ) * .008 );
    };

    // console.log( lerpValues );
};
    
    getLerpValues( 0, 5 );
*/



// console.log(ref.current.position);
        

// function getLerpValues( initial, final ) {
//     const lerpValues = [];
//     for( let i = 0; i < 70; i++ ) {
//         lerpValues.push( initial - ( ( final - initial ) * .008 ) );
//     }
//     console.log( lerpValues );
// }

// getLerpValues( 0, 5 );

// this.z = 5 --> z = 0 


// detlaZ = newZ - oldZ
// newZ = newZ + ( deltaZ * alpha )

// i = i - ( ( f - i ) * .008 )
// 1 --> 4.96 = 5 - ( ( 0 - 5 ) * .008 )
// 2 --> 4.9203 = 4.96 - ( ( 0 - 4.96 ) * .008 )
// 3 --> 4.8809 = 4.9203 - ( ( 0 - 4.9203 ) * .008 )
// 4 --> 4.8418 = 4.8809 - ( ( 0 - 4.8809 ) * .008 )
// 5 --> 4.803 = 4.8418 - ( ( 0 - 4.8418 ) * .008 )
// 6 --> 4.7645 = 4.803 - ( ( 0 - 4.803 ) * .008 )
// 7 --> 4.7263 = 4.7645 - ( ( 0 - 4.7645 ) * .008 )
// 8 --> 4.6884 = 4.7263 - ( ( 0 - 4.7263 ) * .008 )
// 9 --> 4.6508 = 4.6884 - ( ( 0 - 4.6884 ) * .008 )
// 10 --> 4.6134 = 4.6508 - ( ( 0 - 4.6508 ) * .008 )
// 11 --> 4.5763 = 4.6134 - ( ( 0 - 4.6134 ) * .008 )
// 12 --> 4.5395 = 4.5763 - ( ( 0 - 4.5763 ) * .008 )
// 13 --> 4.5029 = 4.5395 - ( ( 0 - 4.5395 ) * .008 )
// 14 --> 4.4666 = 4.5029 - ( ( 0 - 4.5029 ) * .008 )
// 15 --> 4.4305 = 4.4666 - ( ( 0 - 4.4666 ) * .008 )
// 16 --> 4.3947 = 4.4305 - ( ( 0 - 4.4305 ) * .008 )
// 17 --> 4.3591 = 4.3947 - ( ( 0 - 4.3947 ) * .008 )
// 18 --> 4.3238 = 4.3591 - ( ( 0 - 4.3591 ) * .008 )
// 19 --> 4.2887 = 4.3238 - ( ( 0 - 4.3238 ) * .008 )
// 20 --> 4.2539 = 4.2887 - ( ( 0 - 4.2887 ) * .008 )
// 21 --> 4.2193 = 4.2539 - ( ( 0 - 4.2539 ) * .008 )
// 22 --> 4.1849 = 4.2193 - ( ( 0 - 4.2193 ) * .008 )
// 23 --> 4.1508 = 4.1849 - ( ( 0 - 4.1849 ) * .008 )
// 24 --> 4.1169 = 4.1508 - ( ( 0 - 4.1508 ) * .008 )
// 25 --> 4.0832 = 4.1169 - ( ( 0 - 4.1169 ) * .008 )
// 26 --> 4.0498 = 4.0832 - ( ( 0 - 4.0832 ) * .008 )
// 27 --> 4.0166 = 4.0498 - ( ( 0 - 4.0498 ) * .008 )
// 28 --> 3.9836 = 4.0166 - ( ( 0 - 4.0166 ) * .008 )
// 29 --> 3.9509 = 3.9836 - ( ( 0 - 3.9836 ) * .008 )
// 30 --> 3.9184 = 3.9509 - ( ( 0 - 3.9509 ) * .008 )
// 31 --> 3.8861 = 3.9184 - ( ( 0 - 3.9184 ) * .008 )
// 32 --> 3.8541 = 3.8861 - ( ( 0 - 3.8861 ) * .008 )
// 33 --> 3.8223 = 3.8541 - ( ( 0 - 3.8541 ) * .008 )
// 34 --> 3.7907 = 3.8223 - ( ( 0 - 3.8223 ) * .008 )
// 35 --> 3.7593 = 3.7907 - ( ( 0 - 3.7907 ) * .008 )
// 36 --> 3.7282 = 3.7593 - ( ( 0 - 3.7593 ) * .008 )
// 37 --> 3.6973 = 3.7282 - ( ( 0 - 3.7282 ) * .008 )
// 38 --> 3.6666 = 3.6973 - ( ( 0 - 3.6973 ) * .008 )
// 39 --> 3.6362 = 3.6666 - ( ( 0 - 3.6666 ) * .008 )
// 40 --> 3.6059 = 3.6362 - ( ( 0 - 3.6362 ) * .008 )
// 41 --> 3.5759 = 3.6059 - ( ( 0 - 3.6059 ) * .008 )
// 42 --> 3.5461 = 3.5759 - ( ( 0 - 3.5759 ) * .008 )
// 43 --> 3.5165 = 3.5461 - ( ( 0 - 3.5461 ) * .008 )
// 44 --> 3.4872 = 3.5165 - ( ( 0 - 3.5165 ) * .008 )
// 45 --> 3.4581 = 3.4872 - ( ( 0 - 3.4872 ) * .008 )
// 46 --> 3.4292 = 3.4581 - ( ( 0 - 3.4581 ) * .008 )
// 47 --> 3.4005 = 3.4292 - ( ( 0 - 3.4292 ) * .008 )
// 48 --> 3.3721 = 3.4005 - ( ( 0 - 3.4005 ) * .008 )
// 49 --> 3.3439 = 3.3721 - ( ( 0 - 3.3721 ) * .008 )
// 50 --> 3.3159 = 3.3439 - ( ( 0 - 3.3439 ) * .008 )
// 51 --> 3.2881 = 3.3159 - ( ( 0 - 3.3159 ) * .008 )
// 52 --> 3.2605 = 3.2881 - ( ( 0 - 3.2881 ) * .008 )
// 53 --> 3.2332 = 3.2605 - ( ( 0 - 3.2605 ) * .008 )
// 54 --> 3.2061 = 3.2332 - ( ( 0 - 3.2332 ) * .008 )
// 55 --> 3.1792 = 3.2061 - ( ( 0 - 3.2061 ) * .008 )
// 56 --> 3.1525 = 3.1792 - ( ( 0 - 3.1792 ) * .008 )
// 57 --> 3.126 = 3.1525 - ( ( 0 - 3.1525 ) * .008 )
// 58 --> 3.0997 = 3.126 - ( ( 0 - 3.126 ) * .008 )
// 59 --> 3.0737 = 3.0997 - ( ( 0 - 3.0997 ) * .008 )
// 60 --> 3.0478 = 3.0737 - ( ( 0 - 3.0737 ) * .008 )
// 61 --> 3.0222 = 3.0478 - ( ( 0 - 3.0478 ) * .008 )
// 62 --> 2.9968 = 3.0222 - ( ( 0 - 3.0222 ) * .008 )
// 63 --> 2.9716 = 2.9968 - ( ( 0 - 2.9968 ) * .008 )
// 64 --> 2.9466 = 2.9716 - ( ( 0 - 2.9716 ) * .008 )
// 65 --> 2.9218 = 2.9466 - ( ( 0 - 2.9466 ) * .008 )
// 66 --> 2.8972 = 2.9218 - ( ( 0 - 2.9218 ) * .008 )
// 67 --> 2.8728 = 2.8972 - ( ( 0 - 2.8972 ) * .008 )
// 68 --> 2.8486 = 2.8728 - ( ( 0 - 2.8728 ) * .008 )
// 69 --> 2.8246 = 2.8486 - ( ( 0 - 2.8486 ) * .008 )
// 70 --> 2.8008 = 2.8246 - ( ( 0 - 2.8246 ) * .008 )