import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { AnimationAction, LoopPingPong } from 'three'; // you already imported all of THREE on line 1


/** Fn Description 
 * 
 * This Fn is responsible for:
 *  1. Creating React Three objects out of binary .glb model data 
 *  2. Handling the model's animations - creating/playing/updating the animationActions and animationAction._mixers
 * 
 * All models are created and mounted to the scene as an array.
 * They live in state.scene.children as a list of objects. Alongside the lights and stars.
 * 
 * 
 * Loops initializedPage.models[] --> calls CreateReactModel() for each model in lesson.
 * Returns array of {}'s with $$typeof: Symbol(react.element), one {} for each {} in initializedPage.models[]
 * These {}'s have a FiberNode{} inside them that holds the data for the model ( the group of meshes )
 * This array of {}'s are mounted to the scene graph when Models() is called by Scene()
 * 
 * This fn needs to be re-factored a bit. Currently there is as model created and mounted even if the section doesnt need a model. 
 * i.e. section 1, it is just the "vaporized graphite rods text" and yet 
 * there is still a model created and mounted. Wasteful. Bad code.
 * 
*/
export function Models( { initializedPage, section } : any): JSX.Element {

  const [ animationActions, setAnimationActions ] = useState<any[]>([]); // [ [ mainAnimation, scaleAnimation, nestedAnimation ], [ ], etc... ]
  const set = useThree((state) => state.set);

  // VisibilityController --> Mutates the visibility of models. 
    // Sets current model's visibility to true.
    // Sets the previousModel visibility to false if no newModelLocation
  useEffect(() => {

    set((state) => {

      const modelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section}`);
      state.scene.children[modelIndex].visible = true;

      // If section is greater than 0 and there is NOT a newModelLocation, then mutate the previous model's visibility to false.
      // If there is a newModelLocation, then we keep the visibility true so that the exit animation can play
      if(section > 0 && !initializedPage.models[section].newModelLocation) {
        const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section - 1}`);
        state.scene.children[prevModelIndex].visible = false;
      };
    });

  }, [section])

  // AnimationController --> Plays the AnimationAction based on section (section)
  useEffect(() => {
    animationController(animationActions, section);

    function animationController(animationActions: any, section: number): void {
      if (animationActions.length) {

        let currentModel = animationActions[section]
        let previousModel = animationActions[section-1]

        // 1. Section++
        // 2. Control flow for not new location
        if( !initializedPage.models[section].newModelLocation ){
          // A. Grab previous model's animation time
          // const oldT = animationActions[section-1].mainAnimation.time;
          const oldT = previousModel.mainAnimation.time;

          // B. Set current model's animation to this time. 
          // animationActions[section].mainAnimation.time = oldT;
          currentModel.mainAnimation.time = oldT;

          // C. Play current model's animation
          // animationActions[section].mainAnimation.play();
          currentModel.mainAnimation.play();
        }
        else {
          // A. Trigger old model's exit animation:
          if(section > 0) previousModel.scaleAnimation.reset().setEffectiveTimeScale( 0.9 ).play();

          // B. Play new model's entrance animation:
          currentModel.scaleAnimation.startAt(8).setEffectiveTimeScale(-1).play();

          // C. Play new model's main animation:
          if (section === 0) currentModel.mainAnimation.play() //first model should play right away
          else currentModel.mainAnimation.startAt(9).play(); //every other model needs a delay to wait for camera transition to finish

          // D. Play Nested animation if it exists:
          if (currentModel.nestedAnimation) {
            currentModel.nestedAnimation.setLoop(LoopPingPong, Infinity);
            currentModel.nestedAnimation.play();
          }
        };

        // 3. Pause/Stop animation of previousModel:
        if( section > 0 ) animationActions[section-1].mainAnimation.stop(); // What about stopping the nestedAnimation and scaleAnimation??



        // ANIMATION ACTION DATA STRUCTURE REWRITE TEST:

        /*
        // Scaling up:
        currentModel.scaleAnimation.startAt(8).setEffectiveTimeScale(-1).play();

        // Main animation:
        if (section === 0) currentModel.mainAnimation.play()
        else currentModel.mainAnimation.startAt(9).play(); //delay to wait for camera transition to finish

        // Scaling down:
        // I think these scale ups and down are the same every model so do we really need to make it based on the section?
        // Also, we need a way to not play the exit animation conditionally.
        if (section > 0) {
          animationActions[ (section - 1) ].scaleAnimation.reset().setEffectiveTimeScale( 0.9 ).play(); //1.2 was original
          //                    ^section-1 because section will increase and we want to access the previous sections model's exit animation, not the current model.
        }

        // Nested animation:
        if (currentModel.nestedAnimation) {
          currentModel.nestedAnimation.setLoop(LoopPingPong, Infinity);
          currentModel.nestedAnimation.play();
        }
        */


      }
    }

  }, [ animationActions, section ]);

  // Update animation mixers on each frame.
  useFrame((_, delta) => {
    if (animationActions.length) {

      // Main animation
      animationActions[section].mainAnimation._mixer.update(delta);


      // Nested animation
      animationActions[section].nestedAnimation?._mixer.update(delta);

      if (section > 0) {
        // Scale In animation
        animationActions[section].scaleAnimation._mixer.update(delta);
        // Scale Out animation
        animationActions[section - 1].scaleAnimation._mixer.update(delta);
      };
    };
  });

  function CreateReactModels( initializedModels: any ) {
    const ReactModels = initializedModels.map((model: any, i: number) => {
      if (model.path) {
        return (
          <CreateReactModel
            model={model}
            key={model.id}
            setAnimationActions={setAnimationActions}
            section={section}
          />
        );
      }
      else {
        return <></>;
      };
    });
    return ReactModels // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]
  }; const ReactModels = CreateReactModels( initializedPage.models );

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
 * Returns a <group> of all <mesh> of the model. 
 * Essentially converts a model{} in data.ts into a jsx <group>
 * <group> is an object of type Group with a prototype of Object3D.
 * [ <group> ] mounted to the scene graph when the parent fxn, Models() is called by Scene().

 * After returning, useEffect creates an array of AnimationActions from the AnimationClips in initializedPage.models[ i ].animations
 * and links them to the model ( <group>) via a ref.
 * 
*/
function CreateReactModel(props: any): JSX.Element {
  // create a type for the <group> object that the ref is attached to  
  const ref = useRef(new THREE.Group());
  const nestedRef = useRef(new THREE.Mesh());

  const animationClips = props.model.animationClips;

  const mesh = props.model.loadedMeshes.map((loadedMesh: any) => {
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
    {
      mainAnimation: createAnimationAction(ref.current, animationClips[0], {
        clamped: false,
        loop: true,
        repetitions: 5,
      }),
      scaleAnimation: createAnimationAction(ref.current, animationClips[1], {
        clamped: true,
        loop: false,
        repetitions: 1,
      }),
      nestedAnimation: createAnimationAction(nestedRef.current, animationClips[2], {
        clamped: true,
        loop: true,
        repetitions: 1,
      }),
    }
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
      position={props.model.initializedPositions}
      scale={props.model.scale}
      visible={props.model.visible}
      name={props.model.name}
      ref={ref}
    >
      {mesh}
    </group>
  );
}

















































// STOPPING ANIMATIONS:
// animationActions[section].forEach( ( animation: AnimationAction ) => {
//  animation.stop();
// });



// useEffect( () => {
//   props.setAnimationActions((animationAction: any) => [
//     ...animationAction,
//     [
//       createAnimationAction(ref.current, animationClips[0], {
//         clamped: false,
//         loop: true,
//         repetitions: 5,
//       }),
//       createAnimationAction(ref.current, animationClips[1], {
//         clamped: true,
//         loop: false,
//         repetitions: 1,
//       }),
//       createAnimationAction(nestedRef.current, animationClips[2], {
//         clamped: true,
//         loop: true,
//         repetitions: 1,
//       }),
//     ],
//   ])

// Section++ event

  // Pause/Stop main animation:
  //    animationActions[section-1].mainAnimation.stop();

  // if( !initializedPage.models[section].newModelLocation ):
  //   1. Grab old model's animation time
  //      const oldT = animationActions[section-1].mainAnimation.time;
  //    
  //   2. Set new model's animation to this time. 
  //        animationActions[section].mainAnimation.time = oldT
  //
  //   3. Play new model's animation
  //      animationActions[section].mainAnimation.play();


  // else:
  //  1. Trigger old model's exit animation:
  //      animationActions[section - 1].exitAnimation.play();

  //  2. Play new model's entrance animation:
  //      animationActions[section].entranceAnimation.play();

  //  3. Play new model's main animation:
  //      animationActions[section].mainAnimation.play();








// GRAVEYARD: ☠️☠️☠️☠️☠️



// // SCALE UP ANIMATION:
// currentModelAnimations[1].startAt(8).setEffectiveTimeScale(-1).play();

// // MAIN ANIMATION:
// if (section === 0) currentModelAnimations[0].play()
// else currentModelAnimations[0].startAt(9).play(); //delay to wait for camera transition to finish

// // SCALE DOWN ANIMATION: -- i think these scale ups and down are the same every model so do we really need to make it based on the section?
// // Also, we need a way to not play the exit animation conditionally.
// if (section > 0) {
//   animationActions[ (section - 1) ][ 1 ].reset().setEffectiveTimeScale( 0.9 ).play(); //1.2 was original
//   //                    ^section-1 because section will increase and we want to access the previous sections model's exit animation, not the current model.
// }
// // NESTED ANIMATION:
// if (currentModelAnimations[2]) {
//   currentModelAnimations[2].setLoop(LoopPingPong, Infinity);
//   currentModelAnimations[2].play();
// }











// const ReactModels = props.page.models.map((_model: any, i: number) => {
//   if (_model.path) {
//     return (
//       <CreateReactModel
//         _model={_model}
//         key={_model.id}
//         setAnimationActions={setAnimationActions}
//         section={props.section}
//       />
//     );
//   }
//   else {
//     return <></>;
//   };
// }); // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]





        /* animationActions[ section ][ 1 ].startAt( 4 ).setEffectiveTimeScale( -1 ).play(); */











































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
