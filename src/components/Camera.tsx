// @ts-nocheck
// Creates camera, handles its updates and renders cameraHelper when called.
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// import { CameraHelper } from "three";

export default function Camera(props: {
  counter: number;
  page: any;
}): JSX.Element {
  // const section = props.data.section;
  const camera = props.page.camera;
  const ref = useRef();

  const [AnimationActions, setAnimationActions] = useState([]);

  // Loops camera._animation_clips[] --> creates AnimationAction for each rotation and translation animation:
  function CreateAnimationActions(
    fiberCameraRef: any,
    allAnimationClips: [][]
  ) {

    function CreateAnimationAction_Cam(
      clip: THREE.AnimationClip
    ): THREE.AnimationAction {
      const mixer = new THREE.AnimationMixer(fiberCameraRef);
      const animationAction = mixer.clipAction(clip);
      animationAction.loop = THREE.LoopOnce;
      animationAction.clampWhenFinished = true;
      return animationAction;
    };

    const allAnimationActions = allAnimationClips.map((animationClip: []) =>
      CreateAnimationAction_Cam(animationClip[0])
    );
    setAnimationActions(allAnimationActions);
  }

  useEffect(() => {
    CreateAnimationActions(ref.current, camera.initializedAnimationClips);
  }, []);

  function AnimationController() {
    // if( AnimationActions.length ) AnimationActions[ props.counter ].play().warp( 1.3, 0.01, 4.6 );
    if (AnimationActions.length)
      AnimationActions[props.counter].play().warp(1, 0.01, 7.8);
    // if( AnimationActions.length && props.counter > 0 ) AnimationActions[ props.counter ].play().warp( 0.75, 0.01, 10 );
  }

  useEffect(AnimationController, [AnimationActions, props.counter]);

  useFrame((_, delta) => {
    if (AnimationActions.length)
      AnimationActions[props.counter]._mixer.update(delta);
  });

  const set = useThree((state) => state.set);

  // useHelper( ref, CameraHelper );

  useEffect(() => set({ camera: ref.current }));

  return (
    <>
      <PerspectiveCamera
        ref={ref}
        position={[props.page.camera.positions[0]]}
        fov={45}
        near={0.25}
        far={7}
      />
    </>
  );
}

function SetCamera(cam): void {
  set({ camera: cam });
}

{
  /* < UpdateCamera _ref={ref} counter={ props.counter } camera_data={ props.camera_data } /> */
}
{
  /* < PerspectiveCamera ref={ref} position={ props.page.camera._animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.15 } far={ 8 } /> */
}
