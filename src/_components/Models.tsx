import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import { LoopPingPong } from "three";


/*
Loops props.data.models[] --> and calls CreateFiberGroupFrom_Model() for each model in props.data.models[]
returns array of {} with $$typeof: Symbol(react.element), one {} for each {} in props.data.models[]
these {} have a FiberNode{} inside them that holds the data for the model ( the group of meshes )
these {} are mounted to the scene graph when Models() is called by Scene()

Controls animations: counter changes --> animation at the current counter index is played.
*/
export default function Models( props: any ): JSX.Element  {  

    const placeholderArr: any[] = [];
    const [ animationActions, setAnimationActions ] = useState( placeholderArr ); // [ [ mainAnimation, scaleAnimation, nestedAnimation ], [ ], etc... ]

    useEffect( () => AnimationController( animationActions, props.counter ), [ animationActions, props.counter ] );

    // Updates animation mixers.
    useFrame( ( _, delta ) => {
        if( animationActions.length ) {

            // Main animation
            animationActions[ props.counter ][ 0 ]._mixer.update( delta );

            // Nested animation
            animationActions[ props.counter ][ 2 ]?._mixer.update( delta );
            

            if ( props.counter > 0 ) {

                // Scale In animation
                animationActions[ props.counter ][ 1 ]._mixer.update( delta );

                // Scale Out animation
                animationActions[ ( props.counter - 1 ) ][1]._mixer.update( delta );
            }
        };
    });

    const modelGroups = props.page.models.map( ( _model: any , i: number ) => {
        return (
            < CreateFiberGroupFrom_Model
                _model={ _model }
                key={ _model.id }
                setAnimationActions={ setAnimationActions }
                counter={ props.counter }
            />
        );
    }); // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]

    return (
        <>
            { modelGroups }
        </>
    );
};

/*
Grabs meshes and animationClips from props.data.models[ i ].meshes & props.data.models[ i ].animations --> 
returns a <group> of all the <mesh>es of the model. 

essentially converts a _model{} in data.ts into a < group >


<group> is an object of type Group with a prototype of Object3D.

[ <group> ] mounted to the scene graph when the parent fxn (Models) is called;

After returning, useEffect creates an array of AnimationActions from the AnimationClips in props.data.models[ i ].animations
and attaches them to the model (group).
*/
function CreateFiberGroupFrom_Model( props: any ): JSX.Element {

    // create a type for the <group> object that the ref is attached to
    const ref = useRef( new THREE.Group() );
    const nestedRef = useRef( new THREE.Mesh() ); 

    const animationClips = props._model.animation_clips;

    const mesh = props._model.loadedMeshes.map( ( loadedMesh: any ) => {

        const hasInstancedMeshes = loadedMesh.children.length;
        let instancedNestedMeshes = []; // Are these really instances? Or is Three making a seperate draw call for each sphere?

        if ( hasInstancedMeshes ) {
            instancedNestedMeshes = loadedMesh.children.map( ( child: any ) => {
                return <mesh 
                    geometry={ child.geometry } 
                    material={ child.material }  
                    key={ child.uuid } 
                    name={ child.name }
                    position={ child.position }
                    scale={ child.scale }
                />
            });
        }

        return (
            <mesh 
                geometry={ loadedMesh.geometry } 
                material={ loadedMesh.material }  


                ref={ ( loadedMesh.name === "nestedModel" ? nestedRef : undefined ) }
                key={ loadedMesh.uuid } 
                name={ loadedMesh.name }
                position={ loadedMesh.position }
                scale={ loadedMesh.scale }
            >
                { instancedNestedMeshes }
            </mesh>
        )
    });

    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ 
                ...animationAction, 
                [ 
                    CreateAnimationAction( ref.current, animationClips[ 0 ], { clamped: false , loop: true , repetitions: 5 } ), 
                    CreateAnimationAction( ref.current, animationClips[ 1 ], { clamped: true, loop: false, repetitions: 1 } ), 
                    CreateAnimationAction( nestedRef.current, animationClips[ 2 ], { clamped: true, loop: true, repetitions: 1 } )                      
                ] 
            ] 
        ), 
    []);
    

    return (
        <group 
            position={ props._model._positions } 
            scale={ props._model.scale } 
            visible={ props._model.visible }
            name={ props._model.modelNumber } 
            ref={ref} 
        >
            { mesh } 
        </group>
    );
};

// Move to components or set as a method on the data object?
function CreateAnimationAction( fiber_model: any, animationClip: THREE.AnimationClip, config: any ): THREE.AnimationAction | null {

    if ( !fiber_model || !animationClip ) return null;

    const mixer = new THREE.AnimationMixer( fiber_model );
    const animationAction = mixer.clipAction( animationClip );
    animationAction.clampWhenFinished = config.clamped;
    if( !config.loop ) animationAction.repetitions = config.repetitions;
    if ( config.loop ) animationAction.setLoop( THREE.LoopRepeat, Infinity );
    // if ( loop ) animationAction.setLoop( THREE.LoopPingPong, Infinity );
    return animationAction;

}; 

function AnimationController( animationActions: any, counter: number ): void {

    if( animationActions.length ) {
        animationActions.forEach( ( animationAction: any ) => {
            
            // stops every model's main animation
            animationAction[ 0 ].stop();

            // stops every model's nested animation
            animationAction[ 2 ]?.stop();
        });

        // scale up animation:
        animationActions[ counter ][1].startAt( 4 ).setEffectiveTimeScale( -1 ).play();

        // main animation
        if (counter === 0 ) animationActions[ counter ][ 0 ].play();
        else animationActions[ counter ][ 0 ].startAt( 5 ).play();
    };

    if( animationActions.length && counter > 0) {
        // scale down animation:
        animationActions[ (counter - 1) ][ 1 ].reset().setEffectiveTimeScale( 1.5 ).play();
    };

    if( animationActions.length && animationActions[ counter ][ 2 ] ) {
        // nested animation
        animationActions[ counter ][ 2 ].setLoop( LoopPingPong, Infinity )
        animationActions[ counter ][ 2 ].play();
    };
};


// New Animation Set Up: Sets the animations property on <group> to an array of AnimationActions instead of storing the AnimationActions in the state of Models()
/*
useEffect( () => {
    //@ts-ignore
    ref.current.animations = [ 
        CreateAnimationAction( ref.current, animationClips[ 0 ], { clamped: false , loop: true , repetitions: 5 } ), 
        CreateAnimationAction( ref.current, animationClips[ 1 ], { clamped: true, loop: false, repetitions: 1 } ), 
        CreateAnimationAction( nestedRef.current, animationClips[ 2 ], { clamped: true, loop: true, repetitions: 1 } )                      
    ]
    console.log( '<group>', ref.current );
}, [] );

OR 

return (
    <group 
        animations={ [
            // CreateAnimationAction( ref.current, animationClips[ 0 ], { clamped: false , loop: true , repetitions: 5 } ), 
            // CreateAnimationAction( ref.current, animationClips[ 1 ], { clamped: true, loop: false, repetitions: 1 } ), 
            // CreateAnimationAction( nestedRef.current, animationClips[ 2 ], { clamped: true, loop: true, repetitions: 1 } )  
        ] }
        position={ props._model._positions } 
        scale={ props._model.scale } 
        visible={ props._model.visible }
        name={ props._model.modelNumber } 
        ref={ref} 
    >
        { mesh } 
    </group>
);
*/

// Old CreateModel props
/*
modelNumber={ model.modelNumber }
modelData={ model }
position={ model._positions }
name={ model.name }
*/
