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

// 2. See if you can hook up the decrement button click to just calling the same animation but in reverse with: setEffectiveTimeScale(-1)
//  if increment
//      animationActions[section].play.warp()
//  if decrement
//      animationActions[section].setEffectiveTimeScale(-1).play.warp()


// Just need to figure out how to set up increment vs decrement. 
// And if the decrement will need the section, or section-1, or section+1 to reverse?



// animationData --> animationClips --> animationActions --> animationController


export function Camera( { initializedPage, section }: any ): JSX.Element {
  
  const [ AnimationActions, setAnimationActions ] = useState([]);
  const camera = initializedPage.camera;
  const ref = useRef();

  // Creates AnimationActions for each camera rotation and translation via looping camera.animationClips[]
  useEffect(() => {

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

  }, []);

  // AnimationController --> Plays the AnimationAction based on section
  useEffect(() => {

    animationController();

    function animationController() {
      if (AnimationActions.length)
        AnimationActions[section].play().warp(1, 0.01, 7.8); // .warp( 1.3, 0.01, 4.6 );
    }

  }, [AnimationActions, section]);

  // Updates the animation via the mixer
  useFrame((_, delta) => {
    if (AnimationActions.length)
      AnimationActions[section]._mixer.update(delta);
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
