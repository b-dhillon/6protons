// @ts-nocheck
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

/** FN Description
 * 
 * Creates React Three Camera,
 * Creates all AnimationActions for camera transitions 
 * Plays the correct Animation, based on counter.
 * Updates the animation mixer.
 * Renders cameraHelper when called.
 * 
*/ 


export function Camera( { initializedPage, counter }: any ): JSX.Element {
  
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

      const animationActions = animationClips.map((animationClip: []) => createAnimationAction(animationClip[0]) ); //why hard-coded index 0??

      setAnimationActions(animationActions);
    };

  }, []);

  // AnimationController --> Plays the AnimationAction based on counter
  useEffect(() => {

    AnimationController();

    function AnimationController() {
      if (AnimationActions.length)
        AnimationActions[counter].play().warp(1, 0.01, 7.8); // .warp( 1.3, 0.01, 4.6 );
    }

  }, [AnimationActions, counter]);

  // Updates the animation via the mixer
  useFrame((_, delta) => {
    if (AnimationActions.length)
      AnimationActions[counter]._mixer.update(delta);
  });

  // Setting the scene's camera. There are two. Perspective and Development.
  const set = useThree((state) => state.set);
  useEffect(() => set({ camera: ref.current }));

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



















// useHelper( ref, THREE.CameraHelper );
// import { CameraHelper } from "three"; <-- Not needed if THREE is already imported with *


function SetCamera(cam): void {
  set({ camera: cam });
}


{
  /* < UpdateCamera _ref={ref} counter={ counter } camera_data={ camera_data } /> */
}
{
  /* < PerspectiveCamera ref={ref} position={ page.camera._animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.15 } far={ 8 } /> */
}
