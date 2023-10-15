// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useHelper } from '@react-three/drei';

/** FN Description
 * 
 * Creates React Three Camera,
 * Creates all AnimationActions for camera transitions 
 * Creates and calls an AnimationController() that:
 *   Plays the correct Animation, based on section.
 *   Updates the animation mixer.
 * Renders cameraHelper when called.
 * 
*/ 

/**
 * 
 * Then, we need to try to clean up the mixers.
 * Essentially, we just need to re-factor it a bit, and control for the entrance animation.
 * 
 * Will also need to add control flow for first and last sections.
 * 
 * 
 * 
 * 
 * 
 * 
 * 

 * 
 * 
 * 
 * 
 * 
 * 
 * On decrement. trigger the backwards block. trigger the animationActions[section + 1]
 * For mixers, 
 *  on decrement, trigger the backwards block and animationActions[section + 1]._mixer
 *  on increment, trigger the forwards block and animationActions[section]._mixer
 * ^^ the problem here, is that the mixers are not scoped within forwardsNavigation and backwardsNavigation booleans. 
 *    those booleans are scoped inside of the useEffect, because they need to be updated everytime section changes. 
 *    
 *    Perhaps, we can set them in state, and then the mixers will have access to them too.
 *    OR, we can just declare those variables as let at top level of the fn. And then just mutate them inside the useEffect?
 * 
 * 
 * 
 * 
 * 
 * 
 */








// Just need to figure out how to set up increment vs decrement. 
// And if the decrement will need the section, or section-1, or section+1 to reverse?



// animationData --> animationClips --> animationActions --> animationController


export function Camera( { initializedPage, section }: any ): JSX.Element {
  
  const [ AnimationActions, setAnimationActions ] = useState([]);
  // const [ mixer, setMixer ] = useState();
  const camera = initializedPage.camera;
  const ref = useRef();
  const prevSection = useRef();
  const maxSection = initializedPage.maxSection





  // Creates AnimationActions for each camera rotation and translation via looping camera.animationClips[]
  useEffect(() => {

    // if( !mixer ) {
    //   setMixer(new THREE.AnimationMixer(ref.current));
    //   console.log("Animation mixer created");
    // } 

    // if (mixer) {

      createAnimationActions(ref.current, camera.animationClips);
  
      function createAnimationActions( ref: any, animationClips: [][] ) {
  
        function createAnimationAction( clip: THREE.AnimationClip ): THREE.AnimationAction {
          const mixer = new THREE.AnimationMixer(ref);
          const animationAction = mixer.clipAction(clip);
          animationAction.loop = THREE.LoopOnce;
          animationAction.clampWhenFinished = true;
          return animationAction;
        };
  
        const animationActions = animationClips.map((animationClip: []) => createAnimationAction(animationClip[0]) ); //why is index hard-coded 0?? --> because theres only one animation per section
  
        setAnimationActions(animationActions);
      };

    // }



  }, []);

  // AnimationController --> Plays the AnimationAction based on section
  useEffect(() => {

    animationController();

    function animationController() {
      if (AnimationActions.length) {
        // if (section !== 1) 
        // AnimationActions[section].play().warp(1, 0.01, 7.8); // .warp( 1.3, 0.01, 4.6 );


        // This is needed for the first animation before the start-button is clicked.
        if( section === 0 ) {
          console.log("ORIGIN block!", section);

          const backwardsNavigation: boolean = (prevSection.current - section) > 0;


          if (!backwardsNavigation) {
            AnimationActions[0].reset();
            AnimationActions[0].timeScale = 1;
            AnimationActions[0].play();
          }
          else {
            console.log("BACKWARDS!", section);
            AnimationActions[section + 1].reset();
            AnimationActions[section + 1].time = camera.animationClips[0][0].duration
            AnimationActions[section + 1].timeScale = -1;
            AnimationActions[section + 1].play();
          }
          prevSection.current = 0;
        }

        if (prevSection.current !== undefined && section !== 0) {
          console.log('prevSection', prevSection.current);
          console.log('section', section);

          const forwardsNavigation: boolean = (prevSection.current - section) < 0;
          const backwardsNavigation: boolean = (prevSection.current - section) > 0;

          if (forwardsNavigation) {
            console.log("FORWARDS!", section);
            AnimationActions[section].reset();
            AnimationActions[section].timeScale = 1;
            AnimationActions[section].play();
            prevSection.current = section;
          }

          else if(backwardsNavigation) {
            console.log("BACKWARDS!", section);
            AnimationActions[section + 1].reset();
            AnimationActions[section + 1].time = camera.animationClips[section - 1][0].duration
            AnimationActions[section + 1].timeScale = -1;
            AnimationActions[section + 1].play();
            prevSection.current = section;

          }
        }


      }
    }

  }, [AnimationActions, section]);

  // Updates the animation via the mixer
  useFrame((_, delta) => {
    if (AnimationActions.length) {

      // This needs to be cleaned up and written better. 
      // Im pretty sure only 1 mixer is needed.
      // mixer.update(delta)


      // For the entrance animation
      if (section===0) AnimationActions[0]._mixer.update(delta)
      // For the forwards and reverse animations 
      AnimationActions[section]._mixer.update(delta)
      // if (section!==0)AnimationActions[section+1]._mixer.update(delta)
      if( section < maxSection ) AnimationActions[section+1]._mixer.update(delta)
    };
    // AnimationActions[1]._mixer.update(delta);
  });

  useHelper( ref, THREE.CameraHelper );


  // Setting the scene's camera. There are two. Perspective and Development.
  const set = useThree((state) => state.set);
  // useEffect(() => set({ camera: ref.current }));

  return (
    <>
      <PerspectiveCamera
        ref={ref}
        position={[camera.initialPosition]}
        fov={45}
        near={0.25}
        far={7}
      />
    </>
  );
}



















// import { CameraHelper } from "three"; <-- Not needed if THREE is already imported with *


// function SetCamera(cam): void {
//   set({ camera: cam });
// }


{
  /* < UpdateCamera _ref={ref} section={ section } camera_data={ camera_data } /> */
}
{
  /* < PerspectiveCamera ref={ref} position={ page.camera._animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.15 } far={ 8 } /> */
}
