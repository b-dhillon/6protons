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
* 


/** reversing navigation to-do:
 * 
 * 2. Try to clean up the mixers. -- Try 1 mixer again, but this time without the weird [section-1]
 * 3. Prevent ability to animate camera past maxSection and minSection
 * 4. Re-factor and clean up code
 * 5. Add checks for isRunning so that user cant click increment again if animation is currently still running.
 * 5. Get lessonText and lessonModels behaving properly as well.
 * 
*/ 
export function Camera( { initializedPage, section }: any ): JSX.Element {
  
  const [ animations, setAnimations ] = useState<AnimationAction[]|[]>([]);
  const camera = initializedPage.camera;
  const ref = useRef();
  const prevSection = useRef();
  const maxSection = initializedPage.maxSection
  // const [ mixer, setMixer ] = useState();


  // creates all AnimationActions via looping camera.animationClips[]
  useEffect(() => {

    // creating only 1 mixer:
    /**
      if( !mixer ) {
         setMixer(new THREE.AnimationMixer(ref.current));
        console.log("Animation mixer created");
      } 
      if (mixer) {
     * 
     */

      // maps over animationClips and creates an AnimationAction for each AnimationClip
      function createAnimations( ref: any, animationClips: [][] ): AnimationAction[] {
  
        function createAnimation( clip: THREE.AnimationClip ): THREE.AnimationAction {
          const mixer = new THREE.AnimationMixer(ref);
          const animation = mixer.clipAction(clip);
          animation.loop = THREE.LoopOnce;
          animation.clampWhenFinished = true;
          return animation;
        }; 
  
        return animationClips.map((animationClip: []) => createAnimation(animationClip[0]) ); 
        // Why is index hard-coded 0?? --> because theres only one animation per section
        // I believe I initially built it to be explandable to multiple animations per section.
        // But this should be re-factored to an object, like what we did with the model's multiple animations.
  
      };
      setAnimations( createAnimations(ref.current, camera.animationClips) );
      
    // }
  }, []);


  // animationController --> Plays the AnimationAction based on section
  useEffect(() => {

    animationController();

    function animationController() {
      if (animations.length) {
        // if (section !== 1) 
        // animations[section].play().warp(1, 0.01, 7.8); // .warp( 1.3, 0.01, 4.6 );


        // This is needed for the first animation before the start-button is clicked.
        if( section === 0 ) {
          console.log("ORIGIN block!, currSection:", section);

          const backwardsNavigation: boolean = (prevSection.current - section) > 0;
          const forwards = !backwardsNavigation

          if (forwards) {
            animations[0].reset();
            animations[0].timeScale = 1; // needed if warp? first argument in warp() sets the timeScale
            
            animations[0].play().warp(1, 0.01, 7.8);
          }
          else {
            console.log("BACKWARDS!, currSection:", section);
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[0][0].duration
            // animations[section + 1].timeScale = -1; // needed if warp? first argument in warp() sets the timeScale
            
            animations[section + 1].play().warp(-1, 0.01, 7.8);
          }
          prevSection.current = 0;
        };

        if (prevSection.current !== undefined && section !== 0) {
          console.log('prevSection', prevSection.current);

          // if delta negative, move up the stack:
          const forwardsNavigation: boolean = ( prevSection.current - section ) < 0;
          // if delta positive, move down the stack:
          const backwardsNavigation: boolean = ( prevSection.current - section ) > 0;

          if (forwardsNavigation) {
            console.log("FORWARDS!, currSection:", section);
            animations[section].reset();
            // animations[section].timeScale = 1; // needed if warp? first argument in warp() sets the timeScale
            
            animations[section].play().warp(1, 0.01, 7.8);
            prevSection.current = section;
          };

          if (backwardsNavigation) {
            console.log("BACKWARDS!, currSection:", section);
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[section][0].duration
            // animations[section + 1].timeScale = -1; // needed if warp? first argument in warp() sets the timeScale
            animations[section + 1].play().warp(-1, 0.01, 7.8);
            prevSection.current = section;
          };
        };
      };
    };

  }, [animations, section]);



  // Updates animation via mixer
  useFrame((_, delta) => {
    if (animations.length) {

      // This needs to be cleaned up and written better. 
      // Im pretty sure only 1 mixer is needed.
      // mixer.update(delta)


      // For the entrance animation
      if (section===0) animations[0]._mixer.update(delta)
      // For the forwards and reverse animations 
      animations[section]._mixer.update(delta)
      // if (section!==0)animations[section+1]._mixer.update(delta)
      if( section < maxSection ) animations[section+1]._mixer.update(delta)
    };
    // animations[1]._mixer.update(delta);
  });



  // Setting the scene's camera. There are two. Perspective and Development.
  useHelper( ref, THREE.CameraHelper );
  /** 
   const set = useThree((state) => state.set);
   useEffect(() => set({ camera: ref.current }));
  */


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
