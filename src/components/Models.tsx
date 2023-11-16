import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

/** Fn Description 
 * 
 *  Responsibilities:
 *   1. Creat React Three objects out of binary .glb model data.
 *   2. Handling the model's animations - creating/playing/updating the animationActions and animationAction._mixers
 * 
 *  All models are created and mounted to the scene as an array.
 *  They live in state.scene.children as a list of objects. Alongside the lights and stars.
 * 
 * 
 *  Loops initializedPage.models[] --> calls CreateReactModel() for each model in lesson.
 *  Returns array of {}'s with $$typeof: Symbol(react.element), one {} for each {} in initializedPage.models[]
 *  These {}'s have a FiberNode{} inside them that holds the data for the model ( the group of meshes )
 *  This array of {}'s are mounted to the scene graph when Models() is called by Scene()
 * 
 *  This fn needs to be re-factored. Currently there is as model created and mounted even if the section doesnt need a model. 
 *  i.e. section1, it is just the "vaporized graphite rods text" and yet 
 *  there is still a model created and mounted. Wasteful. Bad code.
 * 
*/
interface ModelAnimations {
  mainAnimation: THREE.AnimationAction, 
  scaleAnimation: THREE.AnimationAction, 
  nestedAnimation: THREE.AnimationAction
}

export function Models( { initializedPage, section, isCameraAnimating } : any): JSX.Element {

  const [ animationActions, setAnimationActions ] = useState<ModelAnimations[]>([]); // [ { mainAnimation, scaleAnimation, nestedAnimation }, [ ], etc... ]
  const set = useThree((state) => state.set);
  const prevSection = useRef(-1);

  let currModelAnimations = useRef<ModelAnimations>(animationActions[0]);
  let prevModelAnimations = useRef<ModelAnimations>();
  let nextModelInSamePosition = useRef<boolean>(false);

  

  /** controllers --> handles AnimationActions based on state + handles model visibility
   * 
   * controller1:
   *   1. section mutates, controller1() is popped onto the call-stack:
   *   2. Check if mutation forwards or backwards:
   *   3. Check if nextModelInSamePosition
   *   4. Handle visibility of prevModel based on if nextModelInSamePosition
   *        If it is, we set the visibility to false 
   *        If not, we keep visibility true so exit animation can be seen. 
   *   5. Handle animationAction assignment of prevModel's Animations based on if forwards or backwards 
   *        If forwards, previous is down the stack --> section -1
   *        If backwards, previous is up the stack --> section + 1
   *   6. Handle exitAnimation of prevModel:
   *   7. Pause/Stop animation of previousModel:
   * 
   *  Summary: 
   *    Control visibility and play exit animation of prevModel
   *    Also, responsible for re-setting model0's animations in a hacky way.
   * 
   *   
   * 
   * controller2:
   *   1. isCameraAnimating mutates, controller2() is popped onto the call-stack:
   *   2. Trigger entranceAnimation, mainAnimation, and nestedAnimation of currModel 
   *   3. set prevSection to currSection to get ready for next navigation
   * 
   * 
   *  We can re-name these controllers to beforeCameraMoves controller and afterCameraMoves controller!!
  */  
  useEffect(() => {

    let timer: NodeJS.Timeout;

    // if(doneControlling) setDoneControlling( false );
    controller1(animationActions, section);

    /* 1. section mutates, controller1 is popped onto the call-stack: */
    function controller1( animationActions: ModelAnimations[], section: number ): void {

      if ( animationActions.length && section >= 0 ) {

        /* 2. Check if mutation was forwards or backwards: */
        const forwards: boolean = ( prevSection.current - section ) < 0; // if delta -, move up stack:  
        const backwards: boolean = ( prevSection.current - section ) > 0; // if delta +, move down stack:
        
        /* 3 Check if nextModelInSamePosition */
        nextModelInSamePosition.current = !initializedPage.models[ forwards ? section : section + 1].newModelLocation;


        /* 4. Handle visibility of currModel: */
        set((state) => {
          // If next model is in a different position, we handle the visibility 
          // before the camera starts animating
          // we set the currModel visibility to true.
          // It is never set back to false though?
          if( !nextModelInSamePosition.current ) {
            const currModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section}`);
            state.scene.children[currModelIndex].visible = true;
          }
        });

      
        /* 5. HANDLE ANIMATION ASSIGNMENT */

        /* 5.1 Mutate prevModelAnimations based on if forwards or backwards.  currModelAnimations is always the same.
           This is unecessary we can just use ternaries -- prev --> forwards ? section - 1 : section + 1
            But this will add a conditional check every time. Better to just check once and assign?
        
        */
        currModelAnimations.current = animationActions[ section ];
        prevModelAnimations.current = animationActions[ forwards ? section - 1 : section + 1];


        /* 6. HANDLE ANIMATION PLAYBACK: */

        /* 6.1--A) If next model in same position: */
        if( nextModelInSamePosition.current ) {
          // pause prev model main animation to ready for TranslateCircle
          prevModelAnimations.current!.mainAnimation.paused = true;
        }  
        /* 6.1--B) */
        else {
          /** Trigger prevModel exit animation as camera moves */
          prevModelAnimations.current?.scaleAnimation.reset();
          prevModelAnimations.current?.scaleAnimation.setEffectiveTimeScale( 1.66 );
          prevModelAnimations.current?.scaleAnimation.play();

          // Hacky way to trigger model0 scaleOut animation 
          if( section === 1 ) {
            // animationActions[0].scaleAnimation.paused = false;
            animationActions[0].scaleAnimation.reset().setEffectiveTimeScale( 1.5 );
            animationActions[0].scaleAnimation.play();
          } 
          
          if (section === 0) {
            /* Getting first model to re-appear when going backwards, it is shrunk from going forwards */
            animationActions[0].scaleAnimation.stop()

            /* Triggering suspension animation on model0 */
            currModelAnimations.current.mainAnimation.play();
          } 
        };

        /* 7. Pause/Stop mainAnimation of previousModel: 
         *      This is hacky and should be re-thought
         *      Instead of setting a hard-coded timeout, 
         *      perhaps make it half the duration of the camera 
         *      animation
        */
        if ( section > 0 && !nextModelInSamePosition.current ) {
          timer = setTimeout( () => {
            prevModelAnimations.current?.mainAnimation.stop();
          }, 2500 )
        } /* What about stopping the nestedAnimation and scaleAnimation?? */
      }
    } 

    return () => clearTimeout(timer);

  }, [ animationActions, section ]);


  /** controller2 --> handles mainAnimation and entranceAnimation after camera completes animating 
   * 
   * Play mainAnimation, scaleUp animation, and nest animation for curr model after camera finishes animating.
   * 
   * if nextModelInSamePosition
   * 
   *   Check if mutation was forwards or backwards --> REDUNDANT --> Check was already performed by controller1
   * 
   *   Pass animation time from prevModel's animation to currModel's animation
   * 
   *   Handle visibility of prevModel and currModel
   *    First, assign prevModel animations based on if forwards or backwards 
   * 
   * 
   * Set prevSection to section after all controlling is finished.
   * 
   * */ 
  useEffect( () => {

    if( !isCameraAnimating && section ) {

      /** Play currModel entrance (scaleUp) animation when camera stops animating and if model in a different position */
      if( !nextModelInSamePosition.current ) animationActions[ section ].scaleAnimation.stop().setEffectiveTimeScale(-1).play();

      /** Play currModel mainAnimation when camera stops animating */
      currModelAnimations.current.mainAnimation.play();

      /** Play nested animation, if exists: */ 
      if (currModelAnimations.current.nestedAnimation) {
        currModelAnimations.current.nestedAnimation.setLoop(THREE.LoopPingPong, Infinity);
        currModelAnimations.current.nestedAnimation.play();
      };

      /** If model in same position, we handle the visibility after the camera completes animating
       * 
       * Set visibility of prevModel to false, currModel to true, and pass .mainAnimation time,
       * from prevModel
      */
      if( nextModelInSamePosition.current ) {
        const forwards: boolean = ( prevSection.current - section ) < 0; // if delta -, move up stack:  
        const backwards: boolean = ( prevSection.current - section ) > 0; // if delta +, move down stack:


        /** Passing animation time */
        /* A. Grab earlier model's animation time */
        const oldT = animationActions[ forwards ? section - 1 : section + 1 ].mainAnimation.time;
        /* B. Set current model's animation to this time.  */
        currModelAnimations.current.mainAnimation.time = oldT;
        /* C. Play current model's animation */
        currModelAnimations.current.mainAnimation.paused = false;
        currModelAnimations.current.mainAnimation.play();

        // Handle visibility of prevModel and currModel
        set((state) => {

          // 4.3) set prevModel visibility to false to make room for new model.
          // 4.3--A) If forwards, mutate LOWER ON STACK (section -1) model's visibility to false.
          if(forwards) {
            const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section - 1}`);
            state.scene.children[prevModelIndex].visible = false;
          }
          // 4.3--B) If backwards, mutate HIGHER ON STACK (section + 1) model's visibility to false.
          else if (backwards) {
            const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section + 1}`);
            state.scene.children[prevModelIndex].visible = false;
          }

          // Set currModel visibility to true 
          const currModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section}`);
          state.scene.children[currModelIndex].visible = true;

        })
      };
      /* We are now done controlling, set prevSection to section to get ready for next navigation */
      prevSection.current = section;
    };


  }, [ isCameraAnimating ] );



  /* Update animation mixers on each frame. */
  useFrame((_, delta) => {
    if (animationActions.length ) {

      // Hacky way to get model0's scaleOut animation to re-trigger after going backwards
      // We just hard coded the mixer to update
      if (section === 1) {
        // @ts-ignore
        animationActions[0].scaleAnimation._mixer.update(delta)
      }


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
        prevModelAnimations.current?.scaleAnimation._mixer.update(delta);
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
            _i={i}
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
      { FiberModels }
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
  }, [] );

  return (
    <group
      position={ props.model.initializedPosition }
      scale={props.model.scale}
      visible={props.model.visible}
      name={props.model.name}
      ref={ref}
    >
      {mesh}
    </group>
  );
}


























// GRAVEYARD: ☠️☠️☠️☠️☠️


//Visibility Controller for making prevModel invisible if zoomIn 
/** 
ZoomIn conditional. If camera transition is a zoom-in, then the shrink animation 
looks too janky, so instead we just set the visibility to zero.
REFACTOR THIS TOO MANY UN-NECESSARY CHECKS:

else if (backwards) {
  const prevModelIndex = state.scene.children.findIndex( (obj3D) => obj3D.name === `model${section + 1}`);
  if (initializedPage.models[section + 1].zoomInOnReverse)
    state.scene.children[prevModelIndex].visible = false
}

*/


// STOPPING ANIMATIONS:
/*
animationActions[section].forEach( ( animation: AnimationAction ) => {
 animation.stop();
});
*/

// Alternate Animation Set Up: Sets the animations property on <group> to an array of AnimationActions instead of storing the AnimationActions in the state of Models()
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
