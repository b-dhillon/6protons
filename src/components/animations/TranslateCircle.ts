import {
  AnimationClip,
  InterpolateSmooth,
  NumberKeyframeTrack,
  Vector,
  VectorKeyframeTrack,
  Vector3
} from 'three';

import {
  easeOutCubic,
  easeInOutCubic,
} from '../../utility-functions/easing-functions';


interface config {
  duration: number;
  initialPosition: number[];
  finalPosition: number[];
  initialAngle: number[];
  finalAngle: number[];
  axisData: [string, boolean];
  easingType: string;
  modelPosition: number[];
  _modelInNewPos: boolean
}



/** Fn description
 * 
 * 1. Define 4 variables 
 *     a. initial camera position 
 *     b. circle center
 *     c. radius
 *     d. initial angle
 * 
 * 2. Define fn: getPositionAtT( t: number )
 *      a. call our easing function to produce easedT 
 *      b. define current angle = initial angle + ( easedT * Math.PI/2 )
 *      c. return new vector3 --> 
 *          x = circle.x + radius * cos(currentAngle)  
 *          y = initialPositio.y
 *          z = circle.z + ( radius * sin(currentAngle) )
 * 
 * 3. Write a loop to create n times and values.
 *      Loop calls getPositionAtT n times
 * 
 *
 */
export function TranslateCircle(config: config): AnimationClip {
  
  // TranslateCirlce always rotates on Y axis, if we translating XZ plane.
  let axis = 'y'
  let ease = config.easingType === 'out' ? easeOutCubic : easeInOutCubic;

  const initialPosition = new Vector3(config.initialPosition[0], config.initialPosition[1], config.initialPosition[2]);

  /** Why is the circleCenter defined like this?
   *  We want the circle center to just be the position of the model 
   *  that the camera is rotating around. 
  */
  const circleCenter = new Vector3( ...config.modelPosition );;
  const radius = initialPosition.distanceTo(circleCenter);
  const initialAngle = Math.PI / 2;

  /** 2. Define fn that returns vectors around a circle as a function of time */
  function getVectorAtT(easedT: number): Vector3 {
    let currentAngle = initialAngle + ( easedT * (Math.PI / 2) ); // (Math.PI / 2) is how much we want to rotate by
    return new Vector3(
      circleCenter.x + ( radius * Math.cos(currentAngle) ),
      initialPosition.y,
      circleCenter.z + ( radius * Math.sin(currentAngle) )
    );
  };

  /** 3. Loop n times and call getVectorAtT n times */
  // create n position and time values
  const n = 100;  // You can adjust this based on desired smoothness
  const times = new Float32Array(n);
  const posValues = new Float32Array(n * 3);  // x, y, z for each keyframe
  const rotValues = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    times[i] = t;
    const easedT = ease(t);

    /** Create Position Values */
    const pos = getVectorAtT(easedT);
    posValues[i * 3] = pos.x;
    posValues[i * 3 + 1] = pos.y;
    posValues[i * 3 + 2] = pos.z;

    /** Create Rotation Values */
    const initialAngle = config.initialAngle;
    const finalAngle = config.finalAngle;

    let angle = 0;

    switch( axis ) {
      case 'x':
        angle = initialAngle[0] + (finalAngle[0] - initialAngle[0]) * easedT;
        break;
      case 'y':
        angle = initialAngle[1] + (finalAngle[1] - initialAngle[1]) * easedT;
        break;
      case 'z':
        angle = initialAngle[2] + (finalAngle[2] - initialAngle[2]) * easedT;
        break;
    };

    rotValues[ i ] = angle
  };

  const timesArray = Array.from(times);
  const posValuesArray = Array.from(posValues);
  const rotValuesArray = Array.from(rotValues);

  const posTrack = new VectorKeyframeTrack(
    '.position',
    timesArray,
    posValuesArray,
    InterpolateSmooth
  );

  const rotTrack = new NumberKeyframeTrack(
    '.rotation[' + axis + ']',
    timesArray,
    rotValuesArray,
  );


  return new AnimationClip(
    'TranslateCircle', 
    1, 
    [ posTrack, rotTrack ]
  );
};























// if (axis === 'x') {
//   angle = initialAngle[0] + (finalAngle[0] - initialAngle[0]) * easedT;
// }
// if (axis === 'y') {
//   angle = initialAngle[1] + (finalAngle[1] - initialAngle[1]) * easedT;
// }
// if (axis === 'z') {
//   angle = initialAngle[2] + (finalAngle[2] - initialAngle[2]) * easedT;
// }





// const modelPositionArray = uninitializedData.createModelPosition( 
//   config.initialPosition,
//   config.initialAngle,
//   prevSectionAxis,
//   0
//);
// const modelPosition = new Vector3( modelPositionArray[0], modelPositionArray[1], modelPositionArray[2] );




// function createRotationTrack(): NumberKeyframeTrack {
//   // create n rotation values:
//   const n = 100;
//   const initialAngle = config.initialAngle;
//   const finalAngle = config.finalAngle;

//   const rotationValues = [];
//   for (let i = 0; i < n; i++) {
//     const t = i / n;  // Normalize i to 0 -> 1
    
//     let angle = 0;
//     if (config.axis === 'x') {
//       angle = initialAngle[0] + (finalAngle[0] - initialAngle[0]) * easedT;
//     }
//     if (config.axis === 'y') {
//       angle = initialAngle[1] + (finalAngle[1] - initialAngle[1]) * easedT;
//     }
//     if (config.axis === 'z') {
//       angle = initialAngle[2] + (finalAngle[2] - initialAngle[2]) * easedT;
//     }
//     rotationValues.push(angle);
//   };

//   // creates n times:
//   const rotationTimes = Array.from({ length: n }, (_, i) => i/n );
//   const rotationAxis = '.rotation[' + config.axis + ']';

//   const rotationTrack = new NumberKeyframeTrack(
//     rotationAxis,
//     rotationTimes,
//     rotationValues,
//   );

//   return rotationTrack;
// }




// if(i < 1) {
//   console.log('circle.x', circleCenter.x); // initial.x --> 0.75
//   console.log('first currentAngle:', currentAngle); // 1.57
//   console.log('first add to x:', Math.cos(currentAngle) ); //
//   console.log('first new x', circleCenter.x + ( radius * Math.cos(currentAngle) )); // 0.75
//   i++;
// };



/** atan2 finds angle (radians) between the camera's current position and the positive x-axis of origin */
// let initialAngle = Math.atan2(initialPosition.z, initialPosition.x);
// if( initialPosition.z < 0) initialAngle *= -1; // standardize for a positive angle 









// Determine the direction of the curve based on initial Z value
// let direction = initialPosition.z >= 0 ? 1 : -1;

// Adjust the current angle based on the direction
// If we change this to a subtraction, then finalAngle will come out to 0, instead of 3.14


// let currentAngle = initialAngle + easedT * Math.PI / 2;
// return new Vector3(
//   circleCenter.x + radius * Math.cos(currentAngle),
//   initialPosition.y,
//   circleCenter.z + radius * Math.sin(currentAngle)
// );


// if(i < 1) {
//   console.log('circle.z', circleCenter.z); // initial.z - 1 --> -2 - 1 --> -3
//   console.log('first currentAngle:', currentAngle); // -1.57
//   console.log('first add to z:', Math.sin(currentAngle * direction) ); // 1
//   console.log('first new z', circleCenter.z + ( radius * Math.sin(currentAngle * direction) )); // -2
//   i++;
// };