import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { LoopPingPong } from 'three'; // you already imported all of THREE on line 1

/** Fn Description 
 * 
 * This Fn is responsible for creating React Three objects out of my glTF model data 
 * And creating/playing/updating the model's animations.
 * 
 * 
 * 
 * Loops initializedPage.models[] --> calls CreateReactModel() for each model in lesson.
 * Returns array of {}'s with $$typeof: Symbol(react.element), one {} for each {} in initializedPage.models[]
 * These {}'s have a FiberNode{} inside them that holds the data for the model ( the group of meshes )
 * This array of {}'s are mounted to the scene graph when Models() is called by Scene()
 * 
 * 
 * 
 * Creates all AnimationActions for the models.
 * Controls animations: counter changes --> animation at the current counter index is played.
 * Updates animation mixers
 * 
*/
export function Models(props: any): JSX.Element {

  const [ animationActions, setAnimationActions ] = useState<any[]>([]); // [ [ mainAnimation, scaleAnimation, nestedAnimation ], [ ], etc... ]

  // AnimationController --> Plays the AnimationAction based on counter
  useEffect(() => {
    AnimationController(animationActions, props.counter);

    function AnimationController(animationActions: any, counter: number): void {
      if (animationActions.length) {
        // animationActions.forEach( ( animationAction: any ) => {
        //     // stops every model's main animation
        //     // animationAction[ 0 ].stop();
    
        //     // stops every model's nested animation
        //     // animationAction[ 2 ]?.stop();
        // });
    
        // SCALE UP ANIMATION:
        animationActions[counter][1].startAt(8).setEffectiveTimeScale(-1).play();
        /* animationActions[ counter ][ 1 ].startAt( 4 ).setEffectiveTimeScale( -1 ).play(); */
    
        // MAIN ANIMATION:
        if (counter === 0) animationActions[counter][0].play();
        else animationActions[counter][0].startAt(9).play();
        /* else animationActions[ counter ][ 0 ].startAt( 5 ).play(); */
      }
    
      if (animationActions.length && counter > 0) {
        // SCALE DOWN ANIMATION: -- i think these scale ups and down are the same every model so do we really need to make it based on the counter?
        // animationActions[ (counter - 1) ][ 1 ].reset().play();
        animationActions[ (counter - 1) ][ 1 ].reset().setEffectiveTimeScale( 0.9 ).play(); //1.2 was original
        /* animationActions[ (counter - 1) ][ 1 ].setEffectiveTimeScale( 0.5 ).play(); */
      }
    
      if (animationActions.length && animationActions[counter][2]) {
        // NESTED ANIMATION:
        animationActions[counter][2].setLoop(LoopPingPong, Infinity);
        animationActions[counter][2].play();
      }
    }

  }, [ animationActions, props.counter ]);

  // Update animation mixers on each frame.
  useFrame((_, delta) => {
    if (animationActions.length) {
      // Main animation
      animationActions[props.counter][0]._mixer.update(delta);

      // Nested animation
      animationActions[props.counter][2]?._mixer.update(delta);

      if (props.counter > 0) {
        // Scale In animation
        animationActions[props.counter][1]._mixer.update(delta);
        // Scale Out animation
        animationActions[props.counter - 1][1]._mixer.update(delta);
      };
    };
  });

  function CreateReactModels( initializedModels: any ) {
    const ReactModels = initializedModels.map((model: any, i: number) => {
      if (model.path) {
        return (
          <CreateReactModel
            _model={model}
            key={model.id}
            setAnimationActions={setAnimationActions}
            counter={props.counter}
          />
        );
      }
      else {
        return <></>;
      };
    });
    return ReactModels // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]
  }; const ReactModels = CreateReactModels( props.initializedPage.models );


  return (
    <>
      {ReactModels}
    </>
  );
}











/** Fn Description
 * 
 * Grabs meshes and animationClips from initializedPage.models[ i ].meshes & initializedPage.models[ i ].animations --> 
 *
 * Returns a <group> of all the <mesh>es of the model. 
 * Essentially converts a model{} in data.ts into a jsx <group>
 * <group> is an object of type Group with a prototype of Object3D.
 * [ <group> ] mounted to the scene graph when the parent fxn (Models) is called;

* After returning, useEffect creates an array of AnimationActions from the AnimationClips in initializedPage.models[ i ].animations
* and attaches them to the model (group).
* 
*/
function CreateReactModel(props: any): JSX.Element {
  // create a type for the <group> object that the ref is attached to
  const ref = useRef(new THREE.Group());
  const nestedRef = useRef(new THREE.Mesh());

  const animationClips = props._model.animationClips;

  const mesh = props._model.loadedMeshes.map((loadedMesh: any) => {
    const hasInstancedMeshes = loadedMesh.children.length;
    let instancedNestedMeshes = []; // Are these really instances? Or is Three making a seperate draw call for each sphere?

    if (hasInstancedMeshes) {
      instancedNestedMeshes = loadedMesh.children.map((child: any) => {
        return (
          <mesh
            geometry={child.geometry}
            material={child.material}
            key={child.uuid}
            name={child.name}
            position={child.position}
            scale={child.scale}
          />
        );
      });
    }

    return (
      <mesh
        geometry={loadedMesh.geometry}
        material={loadedMesh.material}
        ref={loadedMesh.name === 'nestedModel' ? nestedRef : undefined}
        key={loadedMesh.uuid}
        name={loadedMesh.name}
        position={loadedMesh.position}
        scale={loadedMesh.scale}
      >
        {instancedNestedMeshes}
      </mesh>
    );
  });

  // Create and store AnimationActions in Models() state
  useEffect( () => {
    props.setAnimationActions((animationAction: any) => [
      ...animationAction,
      [
        createAnimationAction(ref.current, animationClips[0], {
          clamped: false,
          loop: true,
          repetitions: 5,
        }),
        createAnimationAction(ref.current, animationClips[1], {
          clamped: true,
          loop: false,
          repetitions: 1,
        }),
        createAnimationAction(nestedRef.current, animationClips[2], {
          clamped: true,
          loop: true,
          repetitions: 1,
        }),
      ],
    ])

    function createAnimationAction(
      ReactModel: any,
      animationClip: THREE.AnimationClip,
      config: any
    ): THREE.AnimationAction | null {
      if (!ReactModel || !animationClip) return null;
      const mixer = new THREE.AnimationMixer(ReactModel);
      const animationAction = mixer.clipAction(animationClip);
      animationAction.clampWhenFinished = config.clamped;
      if (!config.loop) animationAction.repetitions = config.repetitions
      else animationAction.setLoop(THREE.LoopRepeat, Infinity); //THREE.LoopPingPong
      return animationAction;
    }
  }, []
  );

  return (
    <group
      position={props._model.initializedPositions}
      scale={props._model.scale}
      visible={props._model.visible}
      name={props._model.modelNumber}
      ref={ref}
    >
      {mesh}
    </group>
  );
}

































// const ReactModels = props.page.models.map((_model: any, i: number) => {
//   if (_model.path) {
//     return (
//       <CreateReactModel
//         _model={_model}
//         key={_model.id}
//         setAnimationActions={setAnimationActions}
//         counter={props.counter}
//       />
//     );
//   }
//   else {
//     return <></>;
//   };
// }); // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]
















































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
