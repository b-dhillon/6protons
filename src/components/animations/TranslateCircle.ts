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
  axis: string;
  easingType: string;
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

  let ease = config.easingType === 'out' ? easeOutCubic : easeInOutCubic;

  const initialPosition = new Vector3(config.initialPosition[0], config.initialPosition[1], config.initialPosition[2]);
  /** Why is the circleCenter defined like this?
   *    Because, we are moving in the x-z plane. Therefore the origin (center) is x=0 and z=0. 
   *    But the y-position needs to be the same y-position as the camera or else 
   *    the camera will move in a spiral and not purely in the x-z plane.
   * 
   *    BUT, if we move the camera past 0,0,1 like 0,0,-2, then the origin is not 0,0,0. We want the circle center
   *    to just be the position of the model. 
   *    Which is just: 
   *      const modelPosition = new Vector3(initialPosition.x, initialPosition.y, initialPosition.z - 1)
   *    
   *    We can also grab this from initializedData 
   *    or
   *    We can compute this with our fn.
  */
  const modelPosition = new Vector3(initialPosition.x, initialPosition.y, initialPosition.z - 1);
  const circleCenter = modelPosition;
  const radius = initialPosition.distanceTo(circleCenter);

  /** atan2 finds angle (radians) between the camera's current position and the positive x-axis of origin */
  let initialAngle = Math.atan2(initialPosition.z, initialPosition.x);
  if( initialPosition.z < 0) initialAngle *= -1; // standardize for a positive angle 


  /** 2. Define fn that returns vectors around a circle as a function of time */
  function getVectorAtT(t: number): Vector3 {

    let easedT = ease(t);
    let currentAngle = initialAngle - ( easedT * (Math.PI / 2) ); // (Math.PI / 2) is how much we want to rotate by

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
  const values = new Float32Array(n * 3);  // x, y, z for each keyframe

  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    times[i] = t;
    const pos = getVectorAtT(t);
    values[i * 3] = pos.x;
    values[i * 3 + 1] = pos.y;
    values[i * 3 + 2] = pos.z;
  };

  const timesArray = Array.from(times);
  const valuesArray = Array.from(values);

  const positionTrack = new VectorKeyframeTrack(
    '.position',
    timesArray,
    valuesArray,
    InterpolateSmooth
  );

  return new AnimationClip(
    'TranslateCircle', 
    1, 
    [ positionTrack ]
  );
};
































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