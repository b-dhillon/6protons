


// Creates camera, handles its updates and renders the cameraHelper when called.

import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import THREE from "three";

// Is wired to data.section_counter NOT redux counter!
export default function Camera( props: { counter: number, data: any } ): JSX.Element {

    // const section = props.data.section;
    const camera = props.data.camera;
    const ref = useRef();

    const [ AnimationActions, setAnimationActions ] = useState( [] );

    // Loops camera.animation_clips[] --> creates AnimationAction for each rotation and translation animation:
    function CreateAnimationActions( fiberCameraRef: any, allAnimationClips: [][] ) {

        function CreateAnimationAction_Cam( clip: THREE.AnimationClip ): THREE.AnimationAction {
            const mixer = new THREE.AnimationMixer( fiberCameraRef );
            const animationAction = mixer.clipAction( clip );
            animationAction.loop = THREE.LoopOnce;
            animationAction.clampWhenFinished = true;
            return animationAction;
        };

        const allAnimationActions = allAnimationClips.map( ( animationClip: [] ) => CreateAnimationAction_Cam( animationClip[ 0 ] ) );
        setAnimationActions( allAnimationActions );
    }; 

    useEffect( () => {
        CreateAnimationActions( ref.current, camera._animation_clips )
    }, [] );
                                                         
    function AnimationController() {
        if( AnimationActions.length ) AnimationActions[ props.counter ].play().warp( 1.3, 0.01, 4.5 );
    }; useEffect( AnimationController, [ AnimationActions, props.counter ] );


    useFrame( ( _, delta ) => {
        if( AnimationActions.length ) AnimationActions[ props.counter ]._mixer.update( delta );
    });

    useHelper( ref, CameraHelper );

    const set = useThree((state) => state.set);
    useEffect( () => set( { camera: ref.current } ) );


    return (
        <>
            < PerspectiveCamera ref={ref} position={ camera._animation_data[ 0 ][ 0 ] } fov={ 45 } near={ 0.2 } far={ 8 } />
            {/* < UpdateCamera _ref={ref} counter={ props.counter } camera_data={ props.camera_data } /> */}
        </>
    );
};



function SetCamera( _camera ): void {
    const set = useThree((state) => state.set);
    set( { camera: _camera } );
}
