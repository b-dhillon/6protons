import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { LoopPingPong } from 'three'; // you already imported all of THREE on line 1

/** Reversing Navigation
 * 
 * Problems: 
 *  .startAt(8) is fucking up the backwards nav for some reason
 *    - When we navigate forwards to section2 it works. 
 *    - Then navigating backwards to section1 and then forwards to section2 leads to model2 being at time0 (full scale)
 *        - I think navigating backwards is doing something to that AnimationAction:
 *              It is messing up the following properties: 
 *                paused: 
 *                _effectiveTimeScale
 *                _startTime
 * 
 * 
 *    After logging the currModelAnimationAction to the console I discovered: 
 *    When NOT calling .stop()
 *      On the first run:   
 *          timeScale: -1

 *          time: 0
 *          paused: false
 *          _effectiveTimeScale = -1
 *          _startTime: 8
 * 
 *      
 *      On the second run: 
 *          timeScale: -1
 * 
 *          time: 1
 *          paused: true
 *          _effectiveTimeScale = 0
 *          _startTime: null
 * 
 * 
 *      When calling .stop()
 *        On the first run:   
 *          timeScale: -1
 *          time: 0
 * 
 *          paused: false
 *          _effectiveTimeScale = -1
 *          _startTime: 8
 *      
 *        On the second run: 
 *          timeScale: -1
 *          time: 0
 * 
 *          paused: true
 *          _effectiveTimeScale = 0
 *          _startTime: null
 * 
 * 
 * 
 * TO MUCH COMPLEXITY STICKING TO THIS ROUTE. JUST GO MAKE TWO SEPERATE ANIMATIONS FOR SCALE IN AND SCALE OUT
 * IT WILL MAKE THE WHOLE THING MORE READABLE TOO 
 * 
 *    - Test this with the mainAnimation. That one has a delay too, see if it works?
 * 
 * WORKED WITH setTimeout HACK!!!! But need to test on the entire lesson!
 * 
 * Only DownSide: 
 *  Perhaps less performant with more mixers?
 *          
 * 
 * 
 * 
 * 
 * I think I just need to re-factor the mixers now and get them updating properly.
 *    You only need one mixer for each model. The mixer can control animations for: mainAnimation and scaleAnimation but nested
 *    will need another mixer because it is a different Object3D
 * 
 *    We will likely need to copy a lot of code from Camera.tsx's animationController
 *  
 *
 * 
*/



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
interface ModelAnimations {
  mainAnimation: THREE.AnimationAction, 
  scaleAnimation: THREE.AnimationAction, 
  nestedAnimation: THREE.AnimationAction
}

export function Models( { initializedPage, section, isCameraAnimating } : any): JSX.Element {

  const [ animationActions, setAnimationActions ] = useState<ModelAnimations[]>([]); // [ { mainAnimation, scaleAnimation, nestedAnimation }, [ ], etc... ]
  const [ doneControlling, setDoneControlling ] = useState<boolean>(() => false);
  const set = useThree((state) => state.set);
  const prevSection = useRef(-1);

  let currModelAnimations = useRef<ModelAnimations>(animationActions[0]);
  let prevModelAnimations = useRef<ModelAnimations>();

  /** controller --> Plays the AnimationActions based on section + handles model visibility
   * 
   * controller1:
   *   1. section mutates, controller1 is popped onto the call-stack:
   *   2. Check if mutation forwards or backwards:
   *   3 Check if cameraDidntMove
   *   4. Handle visibility of models:
   *   5. Handle animation assignment
   *   6. Handle exitAnimation of prevModel:
   *   7. Pause/Stop animation of previousModel:
   * 
   * controller2:
   *   1. isCameraAnimating mutates, controller2 is popped onto the call-stack:
   *   2. Trigger entranceAnimation, mainAnimation, and nestedAnimation of currModel 
   *   3. set prevSection to currSection to get ready for next navigation
   * 
  */  
  useEffect(() => {

    // if(doneControlling) setDoneControlling( false );
    controller1(animationActions, section);

    /* 1. section mutates, controller1 is popped onto the call-stack: */
    function controller1( animationActions: ModelAnimations[], section: number ): void {

      if ( animationActions.length && section >= 0 ) {

        console.log('top of controller prevSection:', prevSection.current, 'currSection:', section);

        /* 2. Check if mutation was forwards or backwards: */
        const forwards: boolean = ( prevSection.current - section ) < 0; // if delta -, move up stack:  
        const backwards: boolean = ( prevSection.current - section ) > 0; // if delta +, move down stack:
        
        /* 3 Check if cameraDidntMove */
        let cameraDidntMove = !initializedPage.models[ forwards ? section : section + 1].newModelLocation;


        /* 4. Handle visibility of models: */
        set((state) => {

          // 4.1) If camera-did-move, then we keep the prevModel visibility true so that the exit animation can play

          // 4.2) Always set current model visibility to true:
          const currModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section}`);
          state.scene.children[currModelIndex].visible = true;
    

          // 4.3) If cameraDidntMove, we have to set the prevModel visibility to false to make room for the new model.

          // 4.3--A) If forwards, section is greater than 0, and cameraDidntMove, then mutate LOWER ON STACK (section -1) model's visibility to false.
          if(forwards && section > 0 && cameraDidntMove ) {
            const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section - 1}`);
            state.scene.children[prevModelIndex].visible = false;
          }
          // 4.3--B) If backwards, section is greater than 0, and cameraDidntMove, then mutate HIGHER ON STACK (section + 1) model's visibility to false.
          else if (backwards && section > 0 && cameraDidntMove ) {
            // let cameraDidntMove = !initializedPage.models[section+1].newModelLocation;
            const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section + 1}`);
            state.scene.children[prevModelIndex].visible = false;
          }
        });

      
        /* 5. Handle animation assignment */

        /* 5.1 Mutate top-level currModelAnimations, and prevModelAnimations based on if forwards or backwards */
        currModelAnimations.current = animationActions[ section ];
        if (forwards) {
          prevModelAnimations.current = animationActions[ section - 1 ];
          console.log("Forwards!");
        };
        if (backwards) prevModelAnimations.current = animationActions[ section + 1 ];


        /* 6. Handle animation playback: */

        /* 6.1--A) If camera didn't move location: */
        if( cameraDidntMove ) {
          /* A. Grab earlier model's animation time */
          const oldT = animationActions[ forwards ? section - 1 : section + 1 ].mainAnimation.time;
          /* B. Set current model's animation to this time.  */
          currModelAnimations.current.mainAnimation.time = oldT;
          /* C. Play current model's animation */
          currModelAnimations.current.mainAnimation.play();
        } 
        /* 6.1--B) If camera did move: */
        else {

          /** Trigger prevModel exit animation as camera moves */
          // if(isCameraAnimating) {
            prevModelAnimations.current?.scaleAnimation.reset().setEffectiveTimeScale( 0.9 ).play();
          // }
          
          if (section === 0) {
            /* Getting first model to re-appear when going backwards, it is shrunk from going forwards */
            animationActions[ 0 ].scaleAnimation.stop(); 

            /* Triggering suspension animation on model0 */
            currModelAnimations.current.mainAnimation.play();

            /* Playing current model's main animation: */
            // currModelAnimations.current.mainAnimation.play();
          } 

        };

        /* 7. Pause/Stop mainAnimation of previousModel: 
         *     This is hacky and should be re-thought
         *     Instead of setting a hard-coded timeout, 
         *     perhaps make it half the duration of the animation
        */
        if ( section > 0 ) {
          setTimeout( () => {
            prevModelAnimations.current?.mainAnimation.stop();
          }, 2500 )
        } /* What about stopping the nestedAnimation and scaleAnimation?? */

      }

      /* 7. set prevSection to currSection to get ready for next navigation */
    } 

  }, [ animationActions, section ]);


  /** controller2 */ 
  useEffect( () => {
    console.log("controller2, isCameraAnimating:", isCameraAnimating);

    if(!isCameraAnimating && section > 0 ) {
      console.log('inside entranceAnimation trigger block');

      /** Trigger currModel entrance animation when camera stops animating */
      animationActions[ section ].scaleAnimation.stop().setEffectiveTimeScale(-1).play();

      /** Trigger currModel mainAnimation when camera stops animating */
      currModelAnimations.current.mainAnimation.play();

      /** Trigger nested animation, if exists: */ 
      if (currModelAnimations.current.nestedAnimation) {
        currModelAnimations.current.nestedAnimation.setLoop(LoopPingPong, Infinity);
        currModelAnimations.current.nestedAnimation.play();
      };
    }

    /* We are now done controlling, set prevSection to section to get ready for next navigation */
    prevSection.current = section;

  }, [ isCameraAnimating ] )



  /* Update animation mixers on each frame. */
  useFrame((_, delta) => {
    if (animationActions.length ) {
      /* Main animation */
      // @ts-ignore
      currModelAnimations.current.mainAnimation._mixer.update(delta);
      /* Nested animation */
      // @ts-ignore
      currModelAnimations.current.nestedAnimation?._mixer.update(delta);

      if (section > 0) {
        /* Scale In animation */
        // @ts-ignore
        currModelAnimations.current.scaleAnimation._mixer.update(delta);
        /* Scale Out animation */
        // @ts-ignore
        prevModelAnimations.current?.scaleAnimation?._mixer.update(delta);
        // @ts-ignore
        // animationActions[section + 1].scaleAnimation._mixer.update(delta);
      };
    };
  });

  function CreateFiberModels( initializedModels: any ) {
    const FiberModels = initializedModels.map((model: any, i: number) => {
      if (model.path) {
        return (
          <CreateFiberModel
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
    return FiberModels // [ $$typeof: Symbol(react.element), $$typeof:Symbol(react.element) ]
  }; const FiberModels = CreateFiberModels( initializedPage.models );

  return (
    <>
      {FiberModels}
    </>
  );
}














// useEffect( () => {
//   /* 7. set prevSection to currSection to get ready for next navigation */
//   if(doneControlling && !isCameraAnimating) {
//     console.log('setting prevSection');
//     prevSection.current = section;
//     setDoneControlling( false );
//   }
// }, [ doneControlling, isCameraAnimating ] ) 





/** Hacky startAt trigger of mainAnimation */
// else currModelAnimations.current.mainAnimation.startAt(9).play(); //every other model needs a delay to wait for camera transition to finish



/** Visibility Controller for making prevModel invisible if zoomIn */
// ZoomIn conditional. If camera transition is a zoom-in, then the shrink animation 
// looks too janky, so instead we just set the visibility to zero.
// REFACTOR THIS TOO MANY UN-NECESSARY CHECKS:
// else if (backwards) {
//   const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section + 1}`);
//   if (initializedPage.models[section + 1].zoomInOnReverse)
//     state.scene.children[prevModelIndex].visible = false
// }



/** Hacky useEffect trigger of entranceAnimation */
// II. Play current model's entrance animation:
// DO WE NEED TO CLEAN UP THIS TIME OUT? --> Pretty sure we do?
// if (section !== 0) {
//   setTimeout( () => {
//     animationActions[ section ].scaleAnimation.stop().setEffectiveTimeScale(-1).play(); // currModelAnimations.current.scaleAnimation.startAt(8).setEffectiveTimeScale(-1).play();
//   }, 8000 )
// }
// }










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
function CreateFiberModel(props: any): JSX.Element {
  // create a type for the <group> object that the ref is attached to  
  const ref = useRef(new THREE.Group());
  const nestedRef = useRef(new THREE.Mesh());

  const animationClips = props.model.animationClips;

  const mesh = props.model.loadedMeshes.map((loadedMesh: any ) => {
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







            // animationActions[ forwards ? section - 1 : section + 1 ].scaleAnimation.reset().setEffectiveTimeScale( 0.9 ).play();


  // currModelAnimations.current.scaleAnimation.stop()
  // animationActions[ section ].scaleAnimation.stop();
  // console.log(animationActions[ section ].scaleAnimation.paused);
  // @ts-ignore
  // animationActions[ section ].scaleAnimation._mixer.stopAllAction()
  // animationActions[ section ].scaleAnimation.paused = false;




  // @ts-ignore
  // animationActions[ forwards ? section - 1 : section + 1 ].scaleAnimation._mixer.addEventListener( 'finished', ( e: any) => {
  //   console.log("Shrinking exitAnimation completed");
  //   animationActions[ forwards ? section - 1 : section + 1 ].scaleAnimation.stop()
      // })




  // animationActions.forEach( ( animations: ModelAnimations ) => {
  //   animations.mainAnimation.reset();
  //   //@ts-ignore
  //   animations.scaleAnimation.reset();
  //   animations?.nestedAnimation?.reset();
  // } );











  /* VisibilityController --> Mutates the visibility of models. 
   * Sets current model's visibility to true.
   * Sets the previousModel visibility to false if no newModelLocation
  */
  // useEffect(() => {

  //   set((state) => {

  //     const currModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section}`);
  //     state.scene.children[currModelIndex].visible = true;

  //     // If section is greater than 0 and there is NOT a newModelLocation, then mutate the previous model's visibility to false.
  //     // If there is a newModelLocation, then we keep the visibility true so that the exit animation can play
  //     if(section > 0 && !initializedPage.models[section].newModelLocation) {
  //       const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section - 1}`);
  //       state.scene.children[prevModelIndex].visible = false;
  //     };
  //   });

  // }, [section])







              // }
              // if(backwards){
              //   prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section + 1}`);
              //   state.scene.children[prevModelIndex].visible = false;
              // }














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
//       <CreateFiberModel
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
