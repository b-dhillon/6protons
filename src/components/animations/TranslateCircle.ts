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






/** Debugging Quarter Cirlce with negative Z
 * 
 * 
 * neg z: 
 *  initial: 0, 0, -1
 *  final:  -1, 0, 0 (-1.5 x 10^-7)
 *  ^ Z SHOULD BE -2 NOT ZERO!!!!!
 * 
 * Okay, here you are going from z = -1 to z = 0, so you are pulling OUT
 * 
 * 
 * pos z:
 *   initial: 0, 0, 1
 *   final:  -1, 0, 0 (-1.87 x 10^-8)
 * 
 * Here, we have the final position as the same, BUT we move from z=1 to z=0, we are pulling IN 
 * 
 * 
 * 
 * So, we dont need the same finalPosition, we need the right position given the correct initialPosition.
 * 
 */




export function TranslateCircle(config: config): AnimationClip {

  let easingFn = config.easingType === 'out' ? easeOutCubic : easeInOutCubic;


  function createPositionTrack(): VectorKeyframeTrack {

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
    // const circleCenter = new Vector3(0, initialPosition.y, 0);
    const modelPosition = new Vector3(initialPosition.x, initialPosition.y, initialPosition.z - 1);
    const circleCenter = modelPosition;










    const radius = initialPosition.distanceTo(circleCenter);
    console.log('RADIUS', radius);
    /** This finds the angle (radians) between the camera's current position 
     *  and the positive x-axis. The positive x-axis is our end goal here (90 degrees).
     */
    let initialAngle = Math.atan2(initialPosition.z, initialPosition.x);

    console.log('INITIAL ANGLE:', initialAngle);


    function getPositionAtT(t: number) {
      let easedT = easingFn(t);

      // Determine the direction of the curve based on initial Z value
      let direction = initialPosition.z >= 0 ? 1 : -1;

      // Adjust the current angle based on the direction
      let currentAngle = initialAngle + ( direction * easedT * (Math.PI / 2) );
      // let currentAngle = initialAngle + easedT * (Math.PI / 2);
      console.log('CURRENT ANGLE', currentAngle);

      return new Vector3(
        circleCenter.x + radius * Math.cos(currentAngle),
        initialPosition.y,
        circleCenter.z + radius * Math.sin(currentAngle * direction)
      );

    };

    // create n position and time values
    const n = 100;  // You can adjust this based on desired smoothness
    const times = new Float32Array(n);
    const values = new Float32Array(n * 3);  // x, y, z for each keyframe

    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      times[i] = t;
      const pos = getPositionAtT(t);
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
    );

    positionTrack.setInterpolation(InterpolateSmooth);


    return positionTrack
  }

  // const duration = times[times.length - 1];

  return new AnimationClip(
    'TranslateCircle', 
    1, 
    [ createPositionTrack() ]
  );
};


   // let currentAngle = initialAngle + easedT * Math.PI / 2;
      // return new Vector3(
      //   circleCenter.x + radius * Math.cos(currentAngle),
      //   initialPosition.y,
      //   circleCenter.z + radius * Math.sin(currentAngle)
      // );