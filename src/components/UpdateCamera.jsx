import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
// import { dampE } from 'maath/easing';

function lerp(o, n, s) {
    const r = (1 - s) * o + s * n;
    return Math.abs(o - n) < 0.005 ? n : r;
};


// This is increasing the z position by 0.0017 each frame. 
export default function UpdateCamera( { _ref, counter, camera_data } ) {

    console.log(camera_data);

    let i = 0; 

    // Grabbing new camera values from global data object based on counter:
    // const newPosition = camera_data[counter].positions;
    const newPosition =  { x: 0, y: 0, z: 0 }
    // const c = camera_config[counter];
    // const [rX, rY, rZ] = [c.rotation.x, c.rotation.y, c.rotation.z];

    // Updating old camera values:
        // Can improve performance by running all lerps before hand and storing them in an array. You'll need to do this with a delta
        // Also, interpolating rotation is a bit more complicated, I dont think you can just lerp here, can cause gimbal lock and imprecise rotations.
    useFrame((_, delta) => {

        // I never define the time so this thing keeps appraoching 0 to infinity and never stops, this is why it is so smooth.
        _ref.current.position.lerp( newPosition, delta );
        _ref.current.updateMatrixWorld();






        // _ref.current.rotation.set(lerp(_ref.current.rotation.x, rX, delta*2), lerp(_ref.current.rotation.y, rY, delta*2), lerp(_ref.current.rotation.z, rZ, delta*2));
        // console.log( _ref.current.position );
    });
};







// ref.current.rotation.setFromVector3( _ref.current.rotation.toVector3().lerp(newRotation, delta * 3))
// easing.dampE(mesh.rotation, [Math.PI / 2, 0, 0], 0.25, delta)


// const vec3 = [0, 0, 0];
// const vec3_2 = [0, 1, 0];
// lerp(vec3, vec3_2, 0.5)

/* 
    // const [x, y, z, rX, rY, rZ] = getNewValues(counter, camera_config);

    // function getNewValues ( counter, camera_config ) {
    //     const c = camera_config[counter];
    //     const [x, y, z, rX, rY, rZ] = [c.position.x, c.position.y, c.position.z, c.rotation.x, c.rotation.y, c.rotation.z];
    //     return [x, y, z, rX, rY, rZ];
    // };


    // const [x, y, z, rX, rY, rZ] = [c.position.x, c.position.y, c.position.z, c.rotation.x, c.rotation.y, c.rotation.z];        _ref.current.rotation.set(lerp(_ref.current.rotation.x, rX, delta * 3), lerp(_ref.current.rotation.y, rY, delta * 3), lerp(_ref.current.rotation.z, rZ, delta * 3) );
    // _ref.current.position.set(lerp(_ref.current.position.x, x, delta*2), lerp(_ref.current.position.y, y, delta*2), lerp(_ref.current.position.z, z, delta*2));
    // _ref.current.rotation.set(lerp(_ref.current.rotation.x, rX, delta*2), lerp(_ref.current.rotation.y, rY, delta*2), lerp(_ref.current.rotation.z, rZ, delta*2));


    // Previous way to update camera: 
    camera.position.set ( 
        lerp(camera.position.x, x, delta), 
        lerp(camera.position.y, y, delta), 
        lerp(camera.position.z, z, delta) 
    );
    camera.rotation.set (
        lerp(camera.rotation.x, rX, delta * 3),
        lerp(camera.rotation.y, rY, delta * 3),
        lerp(camera.rotation.z, rZ, delta * 3)
    );

    camera.updateMatrixWorld();

    */


//     /*
// nxt btn is clicked > counter updates > new camera properties are set in Scene() state object > 
// Scene() re-renders > UpdateCamera() is called by useEffect() > lerp() interpolates the difference between
// old camera properties and the new ones and renders them on each frame with useFrame().
// This is how the camera is changed and animated.
// */


// /* 
// next btn clicked > counter updates > Scene() re-renders > 
// UpdateCamera() is called again because counter changed > sC is updated >
//  Scene() re-renders because sC changed

// */



// // rotate
// // sC.rotation.x = lerp(sC.rotation.x, rX, delta * 3);
// // sC.rotation.y = lerp(sC.rotation.y, rY, delta * 3);
// // sC.rotation.z = lerp(sC.rotation.z, rZ, delta * 3);


// // translate 
// // sC.position.x = lerp(sC.position.x, nC.position.x, delta);
// // sC.position.y = lerp(sC.position.y, nC.position.y, delta);
// // sC.position.z = lerp(sC.position.z, nC.position.z, delta);
// // console.log(`rX:${sC.rotation.x}, rY:${sC.rotation.y}, rZ:${sC.rotation.z}`);


// // if(firstLoad) {
// //     state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 1, delta)  
// // }


// // sC.position.set ( lerp(a, b, delta), lerp(c, d, delta), lerp(e, f, delta) );
// // sC.rotation.set ( lerp(g, h, delta), lerp(i, j, delta), lerp(k, l, delta) );

// // sC.rotation.x = lerp(g, h, delta * 3);
// // sC.rotation.y = lerp(i, j, delta * 3);
// // sC.rotation.z = lerp(k, l, delta * 3);


// // Animates changes to camera object:
// // export default function UpdateCamera( { nC } ) {
// //     useFrame((_, delta) => {

// //         // translate 
// //         camera.position.x = lerp(camera.position.x, nC.position.x, delta);
// //         camera.position.y = lerp(camera.position.y, nC.position.y, delta);
// //         camera.position.z = lerp(camera.position.z, nC.position.z, delta);

// //         // rotate
// //         camera.rotation.x = lerp(camera.rotation.x, nC.rotation.x, delta * 3);
// //         camera.rotation.y = lerp(camera.rotation.x, nC.rotation.y, delta * 3);
// //         camera.rotation.z = lerp(camera.rotation.x, nC.rotation.z, delta * 3);

// //         // ^can I use .set() to change x,y,z in 1 line instead of 3?

// //         camera.updateMatrixWorld();
// //     })
// // }

// // Calls the camera movement functions each time after the counter is updated.
// // useEffect(() => {

// //     UpdateCamera( { nC } );
// // }, [counter])













// // Object that stores all of the functions that will move the camera.
// // cameraMovementFxns = {
// //     m1: function ({ cameraPosition }) {
// //         useFrame((_, delta) => {
// //             camera.rotation.x = lerp(camera.rotation.x, cameraPosition.rX, delta * 3);
// //             camera.position.z = lerp(camera.position.z, cameraPosition.z, delta);
// //             camera.position.x = lerp(camera.position.x, cameraPosition.x, delta);
// //             camera.updateMatrixWorld();
// //         })

// //         // ^ do I need to unmount the useFrame hooks? 

// //     },
// //     m2: function ({ cameraPosition }) {
// //         useFrame((_, delta) => {
// //             camera.rotation.x = lerp(camera.rotation.x, cameraPosition.rX, delta * 3);
// //             camera.position.z = lerp(camera.position.z, cameraPosition.z, delta);
// //             camera.position.x = lerp(camera.position.x, cameraPosition.x, delta);
// //             camera.updateMatrixWorld();
// //         })
// //     }
// // }




// // Monday 12/5 brainstorm below:



// /* 

// How to control which CameraMovement function fires:

//     function CameraMovements() {
//         if(counter === 1) {
//             CameraMovement1();
//         }
//         if(counter === 2) {
//             CameraMovement2();
//         }
//     }

// 2 ways to store the camera positions: 
//     const cameraPositions = [ {x: 0,  y: 0, z: 0, rX: 0}, { x: 0.5, y: 0, z: 1, rX: .5 } ]

//     const cameraPositions = {
//         p0: [0, 0, 0],
//         p1: [0.5, 0, 1]
//     }



// */ 


// }
