// @ts-nocheck

// React: 
import { useState } from 'react';
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';

// Redux:
import { useSelector, useDispatch } from 'react-redux';
import { reset, start, increment, decrement } from './redux/actions';

// Components:
import { CameraHelper, LoopPingPong } from 'three';
import Universe from './Universe';
import * as THREE from 'three'
import UpdateCamera from './UpdateCamera.jsx';
import data from '../data';

import '../overlay-styles.css'

/* 
To-do: 
 
    - Add speach.

        - Move load functions to App.tsx() 
        - Finish writing the setPage part

        - Use Three Audio System:
            - https://threejs.org/docs/#api/en/audio/Audio
            - Need: const listener = THREE.AudioListener()
            - Need: const sound = THREE.Audio( listener )
            - Need: 
                const loader = THREE.AudioLoader()
                loader.load( 'url', function ( buffer ) {
                    sound.setBuffer( buffer );
                    sound.setLoop( false );
                    sound.setVolume( 0.5 );
                    // sound.play();
                });

            - Loader will likely by Async and should be handled like the meshes in App.tsx
                - Once the Async function returns, you should have all the Audio files in the data object.
                    - This will likely come out as an array of Audio objects --> i.e. [ Audio, Audio, Audio, Audio, Audio ]

            - Then, write an AudioController() just like AnimationController(), call Audio.play() based on the counter. 
              You'll have to add a delay though to wait out the camera transition.

            - You'll also likely need to add some sort of post-processing effect to blend the background music with the speach audio
              however, this can easily be done with tuning the volumes. --> Likely achieved with .offset()
            
            
            


    - Juice up camera transitions?
        - Get models positioned properly to right middle half of screen

    - Any way to make updating mixers more efficient?
    - Get rid of all hard coded data, both in data.ts and here in TestPage.tsx.
    - Clean up and get a high level understanding of everything that you've re-factored.

*/



export default function Page( props ): JSX.Element {

    const [ page, setPage ] = useState( props.data );
    const counter = useSelector( ( state: any ) => state.counter );

    useEffect( () => {
        console.log( 'page _data', page );
        // const oldPositions = page.models.map( ( model: any ) => model.positions );
        // const newPositions = page.models.map( ( model: any ) => model.__positions );
        // console.log( 'old', oldPositions, 'new', newPositions );
    }, [] );

    return (
        < Suspense >

            < UI data={ page } setData={ setPage } counter={ counter }/>
            < Scene data={ page } counter={ counter }/>

        </ Suspense >
    );
};

// Mounts components to scene graph and renders 3D scene.
function Scene( props ): JSX.Element {

    // const counter = useSelector( ( state: any ) => state.counter );
    const counter = props.counter;


    const [ fadeDone, setFadeDone ] = useState( false );
    function handleFadeDoneAfter( seconds: number ) {
      setTimeout( () => setFadeDone( true ), seconds )
    }; handleFadeDoneAfter( 5500 );

    return (
        < Suspense >

            { !fadeDone ? <div className="blackFade"></div> : "" }

            {/* < Audio /> */}
            < Canvas >

                < Universe data={ props.data } />
                < Camera data={ props.data } counter={ counter }  />
                < Models data={ props.data } counter={ counter } />

                < ambientLight intensity={ .25 } />
                < spotLight position={ [ -10, 10, 10 ] } intensity={ 0.9 } />
                < DevelopmentCamera  />

            </ Canvas >
        </ Suspense >
    );
};




function UI( props ) {

    return (
        < div className='global-overlay-container' >

            < Header data={ props.data } setPage={ props.setPage } counter={ props.counter } />
            < Main data={ props.data } counter={ props.counter } />
            < Footer data={ props.data } counter={ props.counter } />

        </ div >
    )
} 

function Header( props ) {

    // can we move dispatch to the data object as a method?
    const dispatch = useDispatch();


    return (
        <div className='header-container'>

            < li 
                className="home-back-container" 
                onClick={ () => {
                        dispatch( reset() );
                        props.setPage(`home`); 
                    }
                }
            >
                <button className="homeBtn--icon">
                    <i className="fa-solid fa-arrow-left-long backBtn" style={ { color: 'white' } }></i>
                </button> 

            </ li >


            <div className='title-container'>
                { 
                    props.data.section === 0 
                    ?
                    <div>
                        <h1 className='title' style={{}} >{ props.data.title }</ h1 >
                    </div>
                    :
                    ""
                }
            </div> 

            < li className="home-back-container" 
                onClick={ () => {
                        dispatch( start() );
                        dispatch( reset() );
                        props.setPage(`home`); 
                    }
                }
            >
                < button href="#" className="homeBtn--icon">
                    < i className="fas fa-house homeIcon" style={ { color: 'white '} } ></i> 
                </ button >
            </ li >


        </div>
    )
}

function Main( props ) {

    // Decide between these two dispatch methods
    // const dispatch = props.data.dispatch(); // this dispatch 
    const dispatch = useDispatch();


    function LessonNavigationButton( props ): JSX.Element {

        return (
            < div className='lessonNav-container' >
                < button 
                    className={`lesson--${props.type}Btn`}
                    onClick={ () => props.type === 'next' ?  dispatch( increment() ) : dispatch( decrement() ) }
                >

                    
                    < i className={`fa-solid fa-angle-${ props.type === "next" ? "right" : "left" } lessonNav--icons`} style={ { color: 'white' } }></ i >
                
                </ button >
            </ div >
        )
    }


    function Text( props ): JSX.Element {

        if ( props.data.textType[ props.counter ] === 'centered' ) {
            return (
                <>
                    <div className='text--wrapper'>
                        <p> { props.data.text[ props.counter ] } </p>
                    </div>
                </>
            )
        }

        if ( props.data.textType[ props.counter ] === 'left' ) {
            return (
                <>
                    < div className='panel left' >
                        < div className='text--wrapper2' >
                            < p > { props.data.text[ props.counter ] } </ p >
                        </ div >
                    </ div >

                    < div className='panel right' >
                    </ div >
                    
                </>
            )
        }
    }

    return (
        <>
            {
                props.counter > 0 
                ?
                < div className='main-container' >

                    < LessonNavigationButton type={ 'back' } />

                    {/* < Text data={ props.data } counter={ props.counter }/> */}

                    < LessonNavigationButton type={ 'next' } />

                </ div > 
                :
                ""
            } 
        </>
    )
}

function Footer( props ) {
    const dispatch = useDispatch();

    return (
        <>
            {
                props.counter === 0 
                ?
                <div className='footer-container' >
                    <button className="startLessonBtn" onClick={ () => dispatch( increment() ) }>
                        Start Lesson
                    </button>  
                </div>
                : 
                ""
            } 
        </>
    )
}


function Audio() {
    return (
      < audio autoPlay >th
        {/* < source src="/music/fullerene2.mp3" type="audio/mp3" /> */}
        < source src={ props.data.musicTracks[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};

// Creates camera, handles its updates and renders the cameraHelper when called.
// Is wired to data.section_counter NOT redux counter!
function Camera( props: { counter: number, data: any } ): JSX.Element {

    // const section = props.data.section;
    const camera = props.data.camera;
    const ref: string = useRef();

    const [ AnimationActions, setAnimationActions ] = useState( [] );

    // Loops through camera.animation_clips[] --> creates AnimationAction for each rotation and translation animation:
    function CreateAnimationActions( fiberCameraRef, allAnimationClips: [][] ) {

        function CreateAnimationAction_Cam( clip: Three.AnimationClip ): THREE.AnimationAction {
            const mixer = new THREE.AnimationMixer( fiberCameraRef );
            const animationAction = mixer.clipAction( clip );
            animationAction.loop = THREE.LoopOnce;
            animationAction.clampWhenFinished = true;
            return animationAction;
        };

        const allAnimationActions = allAnimationClips.map( ( animationClip: [] ) => CreateAnimationAction_Cam( animationClip[0] ) );
        setAnimationActions( allAnimationActions );
    }; 

    useEffect( () => {
        CreateAnimationActions( ref.current, camera.animation_clips )
    }, [] );
                                                         
    function AnimationController() {
        if( AnimationActions.length ) AnimationActions[ props.counter ].play().warp( 1.3, 0.01, 4.5 );
    }; useEffect( AnimationController, [ AnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( AnimationActions.length ) AnimationActions[ props.counter ]._mixer.update( delta );
    });

    useHelper( ref, CameraHelper );

    const set = useThree((state) => state.set);
    useEffect( () => set( { camera: ref.current } ) );


    return (
        <>
            < PerspectiveCamera ref={ref} position={ camera.animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.2 } far={ 8 } />
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
    // [ [ mainAnimation, scaleAnimation, nestedAnimation ], [ ], etc... ]

    useEffect( () => ModelAnimationController( animationActions, props.counter ), [ animationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( animationActions.length ) {

            // Main animation
            animationActions[ props.counter ][ 0 ]._mixer.update( delta );

            // Nested animation
            animationActions[ props.counter ][ 2 ]?._mixer.update( delta );
            

            if ( props.counter > 0 ) {

                // Scale In animation
                animationActions[ props.counter ][1]._mixer.update( delta );

                // Scale Out animation
                animationActions[ ( props.counter - 1 ) ][1]._mixer.update( delta );
            }
        };
    });

    const sceneModels = props.data.models.map( ( model: any , i: number ) => {
        return (
            < CreateModel 
                key={ model.id }
                modelNumber={ model.modelNumber }
                position={ model._positions }
                name={ model.name }
                model={ model }
                setAnimationActions={ setAnimationActions }
                counter={ props.counter }
            />
        );
    });

    return (
        <>
            { sceneModels }
        </>
    );
};

function ModelAnimationController( animationActions: any, counter: number ): void {

    if( animationActions.length ) {
        animationActions.forEach( ( animationAction: any ) => {
            
            // stops every model's main animation
            animationAction[0].stop();

            // stops every model's nested animation
            animationAction[2]?.stop();
        });

        // scale up animation:
        animationActions[ counter ][1].startAt( 4 ).setEffectiveTimeScale( -1 ).play();

        // main animation
        if (counter === 0 ) animationActions[ counter ][0].play();
        else animationActions[ counter ][0].startAt( 5 ).play();
    };

    if( animationActions.length && counter > 0) {
        // scale down animation:
        animationActions[ (counter - 1) ][1].reset().setEffectiveTimeScale( 1.5 ).play();
    };

    if( animationActions.length && animationActions[ counter ][2] ) {
        // nested animation
        animationActions[ counter ][2].setLoop( LoopPingPong, Infinity )
        animationActions[ counter ][2].play();
    };
};


// Grabs meshes and animations from data --> returns a group of all the meshes of the model. [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ): JSX.Element {

    const ref = useRef();
    const nestedRef = useRef(); 
    const animationData = props.model.animations;
    let modelName = props.name;

    const fiber_model = props.model.meshes.map( ( mesh: any ) => {
        
        let instances = []; // Are these really instances? Or is Three making a seperate draw call for each sphere?

        if ( mesh.children.length ) {
            instances = mesh.children.map( ( child: any ) => {
                return <mesh 
                    geometry={ child.geometry } 
                    material={ child.material }  
                    key={ child.uuid } 
                    name={ child.name }
                    position={ child.position }
                    scale={ child.scale }
                    // ___ref={ (child.name === "dopeModel" ? nestedRef : ref) }
                />
            });
        }

        return (
            <mesh 
                geometry={ mesh.geometry } 
                material={ mesh.material }  
                ref={ ( mesh.name === "nestedModel" ? nestedRef : ref ) }
                key={ mesh.uuid } 
                name={ mesh.name }
                position={ mesh.position }
                scale={ mesh.scale }
            >
                { instances }
            </mesh>
        )
    });

    // Creates AnimationAction from _data, attaches it to the current model in the loop, and adds it to Model()'s state
    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ ...animationAction, [ CreateAnimationAction( ref.current, animationData[0], false, true, 5 ), CreateAnimationAction( ref.current, animationData[1], true, false, 1 ), CreateAnimationAction( nestedRef.current, animationData[2], true, true, 1 )  ] ] ), []);

    return (
        // <group position={ [ props.position.x, props.position.y, props.position.z  ] } scale={ props.model.scale } modelNumber={ props.modelNumber } visible={ props.model.visible } name={ modelName } ref={ref} >
        <group position={ props.position } scale={ props.model.scale } modelNumber={ props.modelNumber } visible={ props.model.visible } name={ modelName } ref={ref} >
            { fiber_model }
        </group>
    );
};


// This might be able to be moved to the data object as a method. You wont have access to the ref there, but perhaps you can just push it to the meshes animations[].
function CreateAnimationAction( fiber_model, animationData: THREE.AnimationClip, clamped: boolean, loop: boolean, repetitions: number ): THREE.AnimationAction {
    if ( !fiber_model || !animationData ) return null;

    const mixer = new THREE.AnimationMixer( fiber_model );
    const animationAction = mixer.clipAction( animationData );
    animationAction.clampWhenFinished = clamped;
    if( !loop ) animationAction.repetitions = repetitions;
    if ( loop ) animationAction.setLoop( THREE.LoopRepeat );
    // if ( loop ) animationAction.setLoop( THREE.LoopPingPong, Infinity );
    return animationAction;
}; 



// Creates zoomed out camera with orbit controls to make dev easier:
function DevelopmentCamera(): JSX.Element {
    const ref: any = useRef();
    const set = useThree(( state ) => state.set );

    // Makes the Dev Camera the default camera:
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
            < PerspectiveCamera ref={ref} position={ [ 20, 0, 0 ] } rotation={ [0, (Math.PI/2) , 0] } fov={45} aspect={1} />
            {/* < CameraControls /> */}
        </>
    );
};


/*
// Renders UI + creates event handlers to handle user input.
function UI( props ): JSX.Element {

    const dispatch = useDispatch();

    function nextSection() {
        props.setData( (oldData) => {
            return {
                ...oldData, 
                section: oldData.section + 1
            };
        });
    };

    return (
        <>
            <button 
                style={{
                    position: 'absolute', 
                    zIndex: '5', 
                    width: '100px', 
                    height: '33px'
                }} 
                onClick={ () => {
                    dispatch( increment() );
                    nextSection();
                }}
            >
            Next
            </button> 
        </>
    )
};
*/

/* 
<>
{
    props.counter === 1 || props.counter === props.data.max_section
    ?
    < div className='main-container' >

            < div className='lessonNav-container' >
                < button 
                    className='lesson--decrementBtn'
                    onClick={ () => dispatch( decrement() ) }
                >
                    < i className="fa-solid fa-angle-left lessonNav--icons" style={ {color: 'white'} }></ i >

                </ button >
            </ div >

            < Text />

            < div className='lessonNav-container'>
                < button className='lesson--incrementBtn'
                    onClick={ () => dispatch( increment() ) } 
                >
                    < i className="fa-solid fa-angle-right lessonNav--icons" style={ {color: 'white'} }></ i >
                </ button >
            </ div >

    </ div > 
    :
    ""
} 
</> 
*/

/*
console.log( 'scene graph', useThree( (state) => state ) );
const set = useThree( (state) => state.set ); 
props.type === 'next'
?
< i className="fa-solid fa-angle-right lessonNav--icons" style={ { color: 'white' } }></ i >
:
< i className="fa-solid fa-angle-left lessonNav--icons" style={ { color: 'white' } }></ i >
*/ 

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

/*
function getLerpValues( initial, final ) {
    const lerpValues = [];
    for( let i = 0; i < 70; i++ ) {
        lerpValues.push( initial - ( ( final - initial ) * .008 ) );
    }
    console.log( lerpValues );
}
*/

/*
 getLerpValues( 0, 5 );
 this.z = 5 --> z = 0 
 detlaZ = newZ - oldZ
 newZ = newZ + ( deltaZ * alpha )
 delta = 0.008

 i = i - ( ( f - i ) * .008 )
 01 --> 4.9600 = 5.0000 - ( ( 0 - 5.0000 ) * .008 );
 02 --> 4.9203 = 4.9600 - ( ( 0 - 4.9600 ) * .008 );
 03 --> 4.8809 = 4.9203 - ( ( 0 - 4.9203 ) * .008 );
 04 --> 4.8418 = 4.8809 - ( ( 0 - 4.8809 ) * .008 );
 05 --> 4.8030 = 4.8418 - ( ( 0 - 4.8418 ) * .008 );
 06 --> 4.7645 = 4.8030 - ( ( 0 - 4.8030 ) * .008 );
 07 --> 4.7263 = 4.7645 - ( ( 0 - 4.7645 ) * .008 );
 08 --> 4.6884 = 4.7263 - ( ( 0 - 4.7263 ) * .008 );
 09 --> 4.6508 = 4.6884 - ( ( 0 - 4.6884 ) * .008 );
 10 --> 4.6134 = 4.6508 - ( ( 0 - 4.6508 ) * .008 );
 11 --> 4.5763 = 4.6134 - ( ( 0 - 4.6134 ) * .008 );
 12 --> 4.5395 = 4.5763 - ( ( 0 - 4.5763 ) * .008 );
 13 --> 4.5029 = 4.5395 - ( ( 0 - 4.5395 ) * .008 );
 14 --> 4.4666 = 4.5029 - ( ( 0 - 4.5029 ) * .008 );
 15 --> 4.4305 = 4.4666 - ( ( 0 - 4.4666 ) * .008 );
 16 --> 4.3947 = 4.4305 - ( ( 0 - 4.4305 ) * .008 );
 17 --> 4.3591 = 4.3947 - ( ( 0 - 4.3947 ) * .008 );
 18 --> 4.3238 = 4.3591 - ( ( 0 - 4.3591 ) * .008 );
 19 --> 4.2887 = 4.3238 - ( ( 0 - 4.3238 ) * .008 );
 20 --> 4.2539 = 4.2887 - ( ( 0 - 4.2887 ) * .008 );
 21 --> 4.2193 = 4.2539 - ( ( 0 - 4.2539 ) * .008 );
 22 --> 4.1849 = 4.2193 - ( ( 0 - 4.2193 ) * .008 );
 23 --> 4.1508 = 4.1849 - ( ( 0 - 4.1849 ) * .008 );
 24 --> 4.1169 = 4.1508 - ( ( 0 - 4.1508 ) * .008 );
 25 --> 4.0832 = 4.1169 - ( ( 0 - 4.1169 ) * .008 );
 26 --> 4.0498 = 4.0832 - ( ( 0 - 4.0832 ) * .008 );
 27 --> 4.0166 = 4.0498 - ( ( 0 - 4.0498 ) * .008 );
 28 --> 3.9836 = 4.0166 - ( ( 0 - 4.0166 ) * .008 );
 29 --> 3.9509 = 3.9836 - ( ( 0 - 3.9836 ) * .008 );
 30 --> 3.9184 = 3.9509 - ( ( 0 - 3.9509 ) * .008 );
 31 --> 3.8861 = 3.9184 - ( ( 0 - 3.9184 ) * .008 );
 32 --> 3.8541 = 3.8861 - ( ( 0 - 3.8861 ) * .008 );
 33 --> 3.8223 = 3.8541 - ( ( 0 - 3.8541 ) * .008 );
 34 --> 3.7907 = 3.8223 - ( ( 0 - 3.8223 ) * .008 );
 35 --> 3.7593 = 3.7907 - ( ( 0 - 3.7907 ) * .008 );
 36 --> 3.7282 = 3.7593 - ( ( 0 - 3.7593 ) * .008 );
 37 --> 3.6973 = 3.7282 - ( ( 0 - 3.7282 ) * .008 );
 38 --> 3.6666 = 3.6973 - ( ( 0 - 3.6973 ) * .008 );
 39 --> 3.6362 = 3.6666 - ( ( 0 - 3.6666 ) * .008 );
 40 --> 3.6059 = 3.6362 - ( ( 0 - 3.6362 ) * .008 );
 41 --> 3.5759 = 3.6059 - ( ( 0 - 3.6059 ) * .008 );
 42 --> 3.5461 = 3.5759 - ( ( 0 - 3.5759 ) * .008 );
 43 --> 3.5165 = 3.5461 - ( ( 0 - 3.5461 ) * .008 );
 44 --> 3.4872 = 3.5165 - ( ( 0 - 3.5165 ) * .008 );
 45 --> 3.4581 = 3.4872 - ( ( 0 - 3.4872 ) * .008 );
 46 --> 3.4292 = 3.4581 - ( ( 0 - 3.4581 ) * .008 );
 47 --> 3.4005 = 3.4292 - ( ( 0 - 3.4292 ) * .008 );
 48 --> 3.3721 = 3.4005 - ( ( 0 - 3.4005 ) * .008 );
 49 --> 3.3439 = 3.3721 - ( ( 0 - 3.3721 ) * .008 );
 50 --> 3.3159 = 3.3439 - ( ( 0 - 3.3439 ) * .008 );
 51 --> 3.2881 = 3.3159 - ( ( 0 - 3.3159 ) * .008 );
 52 --> 3.2605 = 3.2881 - ( ( 0 - 3.2881 ) * .008 );
 53 --> 3.2332 = 3.2605 - ( ( 0 - 3.2605 ) * .008 );
 54 --> 3.2061 = 3.2332 - ( ( 0 - 3.2332 ) * .008 );
 55 --> 3.1792 = 3.2061 - ( ( 0 - 3.2061 ) * .008 );
 56 --> 3.1525 = 3.1792 - ( ( 0 - 3.1792 ) * .008 );
 57 --> 3.1260 = 3.1525 - ( ( 0 - 3.1525 ) * .008 );
 58 --> 3.0997 = 3.1260 - ( ( 0 - 3.1260 ) * .008 );
 59 --> 3.0737 = 3.0997 - ( ( 0 - 3.0997 ) * .008 );
 60 --> 3.0478 = 3.0737 - ( ( 0 - 3.0737 ) * .008 );
 61 --> 3.0222 = 3.0478 - ( ( 0 - 3.0478 ) * .008 );
 62 --> 2.9968 = 3.0222 - ( ( 0 - 3.0222 ) * .008 );
 63 --> 2.9716 = 2.9968 - ( ( 0 - 2.9968 ) * .008 );
 64 --> 2.9466 = 2.9716 - ( ( 0 - 2.9716 ) * .008 );
 65 --> 2.9218 = 2.9466 - ( ( 0 - 2.9466 ) * .008 );
 66 --> 2.8972 = 2.9218 - ( ( 0 - 2.9218 ) * .008 );
 67 --> 2.8728 = 2.8972 - ( ( 0 - 2.8972 ) * .008 );
 68 --> 2.8486 = 2.8728 - ( ( 0 - 2.8728 ) * .008 );
 69 --> 2.8246 = 2.8486 - ( ( 0 - 2.8486 ) * .008 );
 70 --> 2.8008 = 2.8246 - ( ( 0 - 2.8246 ) * .008 );
*/