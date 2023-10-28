// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { setCameraAnimating } from '../redux/actions';

/** FN Description
 * 
 * Creates Camera,
 * Creates all AnimationActions for 3d camera movements 
 * Creates + calls an AnimationController() that:
 *   Plays the correct Animation, based on section.
 *   Updates the animation mixer.
 * Renders cameraHelper when called.
 * 
*/

export function Camera( { initializedPage, section, isCameraAnimating }: any ): JSX.Element {
  
  const [ animations, setAnimations ] = useState<AnimationAction[]|[]>([]);
  const [ mixer, setMixer ] = useState<THREE.AnimationMixer | null>();
  const ref = useRef();
  const prevSection = useRef();
  const cameraDidntMove = useRef(false);
  const camera = initializedPage.camera;
  const maxSection = initializedPage.maxSection
  const dispatch = useDispatch();


  /* Creates all AnimationActions via looping camera.animationClips[] */
  useEffect(() => {
    /* if no mixer, create mixer */
    if( !mixer ) setMixer(new THREE.AnimationMixer(ref.current))
    /* if mixer, create AnimationActions from mixer */
    else {
      /* Map over AnimationClips and creates an AnimationAction for each AnimationClip */
      function createAnimations( ref: any, animationClips: [][] ): AnimationAction[] {
        function createAnimation( clip: THREE.AnimationClip ): THREE.AnimationAction {
          // mixer = new THREE.AnimationMixer(ref);
          const animation = mixer.clipAction(clip);
          animation.loop = THREE.LoopOnce;
          animation.clampWhenFinished = true;
          return animation;
        };
        return animationClips.map( (animationClip: []) => createAnimation(animationClip[0]) );
        /** Why is index hard-coded 0?? --> because theres only one animation per section
         *  I believe I initially built it to be explandable to multiple animations per section.
         *  But this should be re-factored to an object, like what we did with the model's multiple animations.
        */
      };
      setAnimations( createAnimations(ref.current, camera.animationClips) );
      /* Add an eventListener for the "finished" event */
      mixer.addEventListener('finished', function (event) {
        console.log('Animation finished!', event.action);  // event.action gives you the action that has just finished.
      });
    };
  }, [mixer]);

  /* controller --> Plays AnimationAction based on section */
  useEffect(() => {

    controller();

    /* 1. section mutates, controller is popped onto the call-stack: */
    function controller() {
      if (animations.length && section >= 0) {

        /* Ensure all animations are stopped before playing the next one:*/
        mixer.stopAllAction();

        /* Needed for the first animation, before start-button is clicked.
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
            animations[section].setEffectiveTimeScale(0.2);
            animations[0].play();
          };

          if(backwards) {            
            dispatch( setCameraAnimating(true) );
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[0][0].duration
            animations[section + 1].setEffectiveTimeScale(-0.2);
            animations[section + 1].play();
          };

          /* set prevSection to currSection to get ready for next navigation */
          prevSection.current = 0;
        };

        if (prevSection.current !== undefined && section !== 0) {

          /* if delta negative, move up the stack: */
          const forwards: boolean = ( prevSection.current - section ) < 0;
          /* if delta positive, move down the stack: */
          const backwards: boolean = ( prevSection.current - section ) > 0;
          cameraDidntMove.current = !initializedPage.models[ forwards ? section : section + 1].newModelLocation;


          if (forwards && section <= maxSection) {            
            dispatch( setCameraAnimating(true) );
            animations[section].reset();
            animations[section].setEffectiveTimeScale(0.2);
            animations[section].play();
          };

          if ( backwards ) {
            dispatch( setCameraAnimating(true) );
            animations[section + 1].reset();
            animations[section + 1].time = camera.animationClips[section][0].duration
            animations[section + 1].setEffectiveTimeScale(-0.2);
            animations[section + 1].play();
          };

          /* sets prevSection to currSection to get ready for next navigation */
          prevSection.current = section;
        };
      };
    };
  }, [animations, section]);

  /** Update animation via mixer */
  useFrame((_, delta) => {
    /** This conditional needs to be re-thought */
    if (animations.length && mixer && section >= 0){
      mixer.update(delta);
      /** This conditional needs to be re-factored */
      if (
        isCameraAnimating && !animations[section].isRunning() && !animations[section + 1]?.isRunning() 
        || cameraDidntMove.current && isCameraAnimating) {
          dispatch( setCameraAnimating(false) )
      }
    };
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












// animations.forEach( ( animation: AnimationAction ) => animation.stop() );

// const elapsed = animations[section].time;
      
// const duration = animations[section]._clip.duration;
// console.log('elapsed', elapsed);

// // i++
// // console.log('i' ,i);



// if (elapsed > 0.25 && elapsed < duration) {
//   // Adjust the timeScale based on our custom function
//   // console.log('calling setter');
//   console.log('easing output', easeOutQuartic(elapsed / duration));
//   let aTS = easeOutQuartic(elapsed / duration);
//   // if (aTS === 0) aTS = 0.01
//   animations[section].timeScale = aTS
// }

// console.log( 'time scale', animations[section].getEffectiveTimeScale());











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
