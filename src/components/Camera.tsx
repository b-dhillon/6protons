// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { setCameraAnimating } from '../redux/actions';

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

export function Camera( { initializedPage, section }: any ): JSX.Element {
  
  const [ animations, setAnimations ] = useState<AnimationAction[]|[]>([]);
  const [ mixer, setMixer ] = useState();
  const camera = initializedPage.camera;
  const ref = useRef();
  const prevSection = useRef();
  const cameraDidntMove = useRef(false);
  const maxSection = initializedPage.maxSection

  const dispatch = useDispatch();


  /* creates all AnimationActions via looping camera.animationClips[] */
  useEffect(() => {
    // if no mixer, create mixer
    if( !mixer ) {
      setMixer(new THREE.AnimationMixer(ref.current));
    } 
    // if mixer, animations are ready to be created from mixer:
    else {
      // maps over animationClips and creates an AnimationAction for each AnimationClip
      function createAnimations( ref: any, animationClips: [][] ): AnimationAction[] {
        function createAnimation( clip: THREE.AnimationClip ): THREE.AnimationAction {
          // mixer = new THREE.AnimationMixer(ref);
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
      // Add an eventListener for the "finished" event
      mixer.addEventListener('finished', function (event) {
        console.log('Animation finished!', event.action);  // event.action gives you the action that has just finished.
      });
    }
  }, [mixer]);

  /* animationController --> Plays the AnimationAction based on section */
  useEffect(() => {

    animationController();

    function animationController() {
      if (animations.length && section >= 0) {
        /* ensure all animations are stopped before playing the next one:
         * you can also just use mixer.stopAllAction to all actions on the mixer in one go!
        */
        mixer.stopAllAction();
        // animations.forEach( ( animation: AnimationAction ) => animation.stop() );


        /* This is needed for the first animation, before the start-button is clicked.
         * This should be re-factored however. Make the whole camera a stack. Start the stack at -1. 
         * When lesson is loaded, move the stack from -1 to 0, triggering the first entrance animation as a forwards animation
         * With that logic, you would theoretically not need this extra block.
        */
        if( section === 0 ) {
          const backwards: boolean = (prevSection.current - section) > 0;
          const forwards = !backwards;
          if (forwards && section <= maxSection ) {
            dispatch( setCameraAnimating(true) );
            animations[0].reset();
            animations[section].setEffectiveTimeScale(1);
            animations[0].play()
            animations[0].halt(7.8);
          };
          if(backwards) {            
            dispatch( setCameraAnimating(true) );
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[0][0].duration
            animations[section + 1].setEffectiveTimeScale(-1);
            animations[section + 1].play();
            animations[section + 1].halt(7.8);
            // animations[section + 1].play().warp(-1, 0.01, 7.8);
          };
          /* set prevSection to currSection to get ready for next navigation */
          prevSection.current = 0;
        };

        if (prevSection.current !== undefined && section !== 0) {
          // console.log('prevSection', prevSection.current);
          // if delta negative, move up the stack:
          const forwards: boolean = ( prevSection.current - section ) < 0;
          // if delta positive, move down the stack:
          const backwards: boolean = ( prevSection.current - section ) > 0;
          cameraDidntMove.current = !initializedPage.models[ forwards ? section : section + 1].newModelLocation;


          if (forwards && section <= maxSection) {            
            dispatch( setCameraAnimating(true) );
            animations[section].reset();
            animations[section].setEffectiveTimeScale(1);
            animations[section].play();
            animations[section].halt(7.8);
            // animations[section].play().warp(1, 0.01, 7.8);
          };

          if (backwards) {
            dispatch( setCameraAnimating(true) );
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[section][0].duration
            animations[section + 1].setEffectiveTimeScale(-1);
            animations[section + 1].play();
            animations[section + 1].halt(7.8);
            // animations[section + 1].play().warp(-1, 0.01, 7.8);
          };
          /* sets prevSection to currSection to get ready for next navigation */
          prevSection.current = section;
        };
      };
    };
  }, [animations, section]);

  // Updates animation via mixer
  useFrame((_, delta) => {
    if (animations.length && mixer && section >= 0){
      mixer.update(delta)
      // Will need to think about backwards animations too. But first, lets see if forwards
      // works with disabling the buttons.
      if (!animations[section].isRunning() && !animations[section + 1]?.isRunning() || cameraDidntMove.current)
        dispatch( setCameraAnimating(false) )
    } 
  });

  // Setting the scene's camera. There are two. Perspective and Development.
  // useHelper( ref, THREE.CameraHelper );
  // /** 
   const set = useThree((state) => state.set);
   useEffect(() => set({ camera: ref.current }));
  // */

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















// .warp(1, 0.01, 7.8);






/** Old way of doing animation mixers --> multiple mixers, 1 for each action
  // For the entrance animation
  if (section===0) animations[0]._mixer.update(delta)
  // For the forwards and reverse animations 
  animations[section]._mixer.update(delta)
  // if (section!==0)animations[section+1]._mixer.update(delta)
  if( section < maxSection ) animations[section+1]._mixer.update(delta)
*/















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
