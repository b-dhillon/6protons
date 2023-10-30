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

export function TranslateCircle(config: config): AnimationClip {

  let easingFn = config.easingType === 'out' ? easeOutCubic : easeInOutCubic;


  function createPositionTrack(): VectorKeyframeTrack {

    const initialPosition = new Vector3(config.initialPosition[0], config.initialPosition[1], config.initialPosition[2]);
    /** Why is the circleCenter defined like this?
     *    Because, we are moving in the x-z plane. Therefore the origin (center) is x=0 and z=0. 
     *    But the y-position needs to be the same y-position as the camera or else 
     *    the camera will move in a spiral and not purely in the x-z plane.
    */
    const circleCenter = new Vector3(0, initialPosition.y, 0); 
    const radius = initialPosition.distanceTo(circleCenter);
    /** This finds the angle (radians) between the camera's current position 
     *  and the positive x-axis. The positive x-axis is our end goal here (90 degrees).
     */
    let initialAngle = Math.atan2(initialPosition.z, initialPosition.x);


    function getPositionAtT(t: number) {
      let easedT = easingFn(t);
      let currentAngle = initialAngle + easedT * Math.PI / 2;
      return new Vector3(
        circleCenter.x + radius * Math.cos(currentAngle),
        initialPosition.y,
        circleCenter.z + radius * Math.sin(currentAngle)
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

    return positionTrack
  }

  // const duration = times[times.length - 1];

  return new AnimationClip(
    'TranslateCircle', 
    1, 
    [ createPositionTrack() ]
  );
};
