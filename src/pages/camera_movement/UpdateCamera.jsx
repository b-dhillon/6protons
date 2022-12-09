import { Suspense, useState } from 'react';
import { Canvas, useFrame  } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';
import { useSelector } from 'react-redux';
import Stars from '../../components/Stars';


/*
nxt btn is clicked > counter updates > new camera properties are set in Scene() state object > 
Scene() re-renders > UpdateCamera() is called by useEffect() > lerp() interpolates the difference between
old camera properties and the new ones and renders them on each frame with useFrame().
This is how the camera is changed and animated.
*/

export default function UpdateCamera( { sceneCamera, newCamera } ) {

    function lerp(o, n, s) {
        const r = (1 - s) * o + s * n
        return Math.abs(o - n) < 0.001 ? n : r
    }

    useFrame((_, delta) => {

        // translate 
        sceneCamera.position.x = lerp(sceneCamera.position.x, newCamera.position.x, delta);
        sceneCamera.position.y = lerp(sceneCamera.position.y, newCamera.position.y, delta);
        sceneCamera.position.z = lerp(sceneCamera.position.z, newCamera.position.z, delta);

        // rotate
        sceneCamera.rotation.y = lerp(sceneCamera.rotation.x, newCamera.rotation.y, delta * 3);
        sceneCamera.rotation.z = lerp(sceneCamera.rotation.x, newCamera.rotation.z, delta * 3);
        sceneCamera.rotation.x = lerp(sceneCamera.rotation.x, newCamera.rotation.x, delta * 3);

        // ^can I use .set() to change x,y,z in 1 line instead of 3?

        sceneCamera.updateMatrixWorld();
    })
}







// Animates changes to camera object:
// export default function UpdateCamera( { newCamera } ) {
//     useFrame((_, delta) => {

//         // translate 
//         camera.position.x = lerp(camera.position.x, newCamera.position.x, delta);
//         camera.position.y = lerp(camera.position.y, newCamera.position.y, delta);
//         camera.position.z = lerp(camera.position.z, newCamera.position.z, delta);

//         // rotate
//         camera.rotation.x = lerp(camera.rotation.x, newCamera.rotation.x, delta * 3);
//         camera.rotation.y = lerp(camera.rotation.x, newCamera.rotation.y, delta * 3);
//         camera.rotation.z = lerp(camera.rotation.x, newCamera.rotation.z, delta * 3);

//         // ^can I use .set() to change x,y,z in 1 line instead of 3?

//         camera.updateMatrixWorld();
//     })
// }

// Calls the camera movement functions each time after the counter is updated.
// useEffect(() => {

//     UpdateCamera( { newCamera } );
// }, [counter])













// Object that stores all of the functions that will move the camera.
// cameraMovementFxns = {
//     m1: function ({ cameraPosition }) {
//         useFrame((_, delta) => {
//             camera.rotation.x = lerp(camera.rotation.x, cameraPosition.rX, delta * 3);
//             camera.position.z = lerp(camera.position.z, cameraPosition.z, delta);
//             camera.position.x = lerp(camera.position.x, cameraPosition.x, delta);
//             camera.updateMatrixWorld();
//         })

//         // ^ do I need to unmount the useFrame hooks? 

//     },
//     m2: function ({ cameraPosition }) {
//         useFrame((_, delta) => {
//             camera.rotation.x = lerp(camera.rotation.x, cameraPosition.rX, delta * 3);
//             camera.position.z = lerp(camera.position.z, cameraPosition.z, delta);
//             camera.position.x = lerp(camera.position.x, cameraPosition.x, delta);
//             camera.updateMatrixWorld();
//         })
//     }
// }




// Monday 12/5 brainstorm below:



/* 

How to control which CameraMovement function fires:

    function CameraMovements() {
        if(counter === 1) {
            CameraMovement1();
        }
        if(counter === 2) {
            CameraMovement2();
        }
    }

2 ways to store the camera positions: 
    const cameraPositions = [ {x: 0,  y: 0, z: 0, rX: 0}, { x: 0.5, y: 0, z: 1, rX: .5 } ]

    const cameraPositions = {
        p0: [0, 0, 0],
        p1: [0.5, 0, 1]
    }



*/ 

