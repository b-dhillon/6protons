import { useFrame } from '@react-three/fiber';

export default function UpdateCamera( { sC, counter, page } ) {
    
    // Grabbing new camera values based on counter:
    const nC = page.cameraSettings[counter];
    const [x, y, z] = [nC.position.x, nC.position.y, nC.position.z];
    const [rX, rY, rZ] = [nC.rotation.x, nC.rotation.y, nC.rotation.z];

    // Updating old camera values:
    useFrame((_, delta) => {
        sC.position.set ( 
            lerp(sC.position.x, x, delta), 
            lerp(sC.position.y, y, delta), 
            lerp(sC.position.z, z, delta) 
        );

        sC.rotation.set (
            lerp(sC.rotation.x, rX, delta * 3),
            lerp(sC.rotation.y, rY, delta * 3),
            lerp(sC.rotation.z, rZ, delta * 3)
        );

        sC.updateMatrixWorld();
    })
}

function lerp(o, n, s) {
    const r = (1 - s) * o + s * n
    return Math.abs(o - n) < 0.001 ? n : r
}



/*
nxt btn is clicked > counter updates > new camera properties are set in Scene() state object > 
Scene() re-renders > UpdateCamera() is called by useEffect() > lerp() interpolates the difference between
old camera properties and the new ones and renders them on each frame with useFrame().
This is how the camera is changed and animated.
*/


/* 
next btn clicked > counter updates > Scene() re-renders > 
UpdateCamera() is called again because counter changed > sC is updated >
 Scene() re-renders because sC changed

*/



// rotate
// sC.rotation.x = lerp(sC.rotation.x, rX, delta * 3);
// sC.rotation.y = lerp(sC.rotation.y, rY, delta * 3);
// sC.rotation.z = lerp(sC.rotation.z, rZ, delta * 3);


// translate 
// sC.position.x = lerp(sC.position.x, nC.position.x, delta);
// sC.position.y = lerp(sC.position.y, nC.position.y, delta);
// sC.position.z = lerp(sC.position.z, nC.position.z, delta);
// console.log(`rX:${sC.rotation.x}, rY:${sC.rotation.y}, rZ:${sC.rotation.z}`);


// if(firstLoad) {
//     state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, delta)  
// }


// sC.position.set ( lerp(a, b, delta), lerp(c, d, delta), lerp(e, f, delta) );
// sC.rotation.set ( lerp(g, h, delta), lerp(i, j, delta), lerp(k, l, delta) );

// sC.rotation.x = lerp(g, h, delta * 3);
// sC.rotation.y = lerp(i, j, delta * 3);
// sC.rotation.z = lerp(k, l, delta * 3);


// Animates changes to camera object:
// export default function UpdateCamera( { nC } ) {
//     useFrame((_, delta) => {

//         // translate 
//         camera.position.x = lerp(camera.position.x, nC.position.x, delta);
//         camera.position.y = lerp(camera.position.y, nC.position.y, delta);
//         camera.position.z = lerp(camera.position.z, nC.position.z, delta);

//         // rotate
//         camera.rotation.x = lerp(camera.rotation.x, nC.rotation.x, delta * 3);
//         camera.rotation.y = lerp(camera.rotation.x, nC.rotation.y, delta * 3);
//         camera.rotation.z = lerp(camera.rotation.x, nC.rotation.z, delta * 3);

//         // ^can I use .set() to change x,y,z in 1 line instead of 3?

//         camera.updateMatrixWorld();
//     })
// }

// Calls the camera movement functions each time after the counter is updated.
// useEffect(() => {

//     UpdateCamera( { nC } );
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

