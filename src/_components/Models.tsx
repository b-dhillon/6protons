// @ts-nocheck
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'


// Where is _mixer? 
//
// _mixer is a property of THREE.AnimationAction

// Loops data.models[] --> returns array of fiber models to mount to scene graph. Controls animations: counter changes --> animation at the current counter index is played.
export default function Models( props: any ): JSX.Element  {  

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
                animationActions[ props.counter ][ 1 ]._mixer.update( delta );

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

// Grabs meshes and animations from data --> returns a group of all the meshes of the model. [ meshes ] mounted to the scene graph when Models();
function CreateModel( props: any ): JSX.Element {

    const ref = useRef();
    const nestedRef = useRef(); 
    const animationClips = props.model.animations;
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
    useEffect( () => props.setAnimationActions( ( animationAction: any ) => [ 
                ...animationAction, 
                [ 
                    CreateAnimationAction( ref.current, animationClips[ 0 ], { clamped: false , loop: true , repetitions: 5 } ), 
                    CreateAnimationAction( ref.current, animationClips[ 1 ], { clamped: true, loop: false, repetitions: 1 } ), 
                    CreateAnimationAction( nestedRef.current, animationClips[ 2 ], { clamped: true, loop: true, repetitions: 1 } )                      
                ] 
            ] 
        ), []);

    return (
        // <group position={ [ props.position.x, props.position.y, props.position.z  ] } scale={ props.model.scale } modelNumber={ props.modelNumber } visible={ props.model.visible } name={ modelName } ref={ref} >
        <group position={ props.position } scale={ props.model.scale } modelNumber={ props.modelNumber } visible={ props.model.visible } name={ modelName } ref={ref} >
            { fiber_model }
        </group>
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


// Moved to components or set as a method on the data object?
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
