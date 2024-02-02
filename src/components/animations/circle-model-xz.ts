import {
  AnimationClip,
  InterpolateSmooth,
  NumberKeyframeTrack,
  VectorKeyframeTrack,
  Vector3,
  Euler
} from 'three';
  
import {
  easeOutCubic,
  easeInOutCubic,
} from '../../utility-functions/easing-functions';

import { computeModelPosition } from '../../utility-functions/compute-model-position';

/** 
 * Fn description:
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
 *          y = initialPosition.y
 *          z = circle.z + ( radius * sin(currentAngle) )
 * 
 * 3. Write a loop to create n times and values.
 *      Loop calls getPositionAtT n times
 * 
 */

type CameraAnimConfig = {
  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler;
  fRot: Euler;
  axis: string | null;
  easing: string;
};

type TimesAndValues = {
  times: number[],
  values: {
    pos: number[],
    rot: number[]
  }
};

/**
 *  How are we going to get access to tMag? tMag is turned into fPos inside the PosRot
 *  with the help of getVecOnCircle
 */

// Should we turn this into a class, with the config variables being fields that are 
// assigned in the constructor?
// And each part of the function being methods?
    // getCircleCenter();
    // getVecOnCircleAtT()
    // createNTimesAndValues()
    // createKeyframeTracks()
    // createAnimationClip() 
export function circleModel( config: CameraAnimConfig ): AnimationClip {

  const { iPos, iRot, fRot, axis, easing } = config;

  const easingFn = easing === 'out' ? easeOutCubic : easeInOutCubic;

  // Variables needed for function, but scoped outside
  // because fn is looped and we don't need to re-compute 
  // these variables on each iteration of the loop
  const tMag = Math.PI / 2
  const circleCenter = computeModelPosition( iPos, iRot, axis );
  const radius = iPos.distanceTo(circleCenter);
  const initialAngle = Math.PI / 2; // angle with respect to positive-x axis
  function getVecOnCirclerAtT(easedT: number): Vector3 {

    let currentAngle = initialAngle + ( easedT * tMag );

    return new Vector3(
      circleCenter.x + ( radius * Math.cos(currentAngle) ),
      iPos.y,
      circleCenter.z + ( radius * Math.sin(currentAngle) )
    );

  };

  /** 3. Loop n times and call getVecOnCirclerAtT n times */
  function createNTimesAndValues(n: number): TimesAndValues {

    // const n = 100;  // You can adjust this based on desired smoothness
    const times = []
    const posValues = []
    const rotValues = []
  
  
    for (let i = 0; i < n; i++) {
  
      const t = i / (n - 1);
      times[i] = t;
      const easedT = easingFn(t);
  
      /** Create Position Values */
      const pos = getVecOnCirclerAtT(easedT);
      posValues[i * 3] = pos.x;
      posValues[i * 3 + 1] = pos.y;
      posValues[i * 3 + 2] = pos.z;
  
      /** Create Rotation Values */
      let angle = 0;
      switch( axis ) {
        case 'x':
          angle = iRot.x + (fRot.x - iRot.x) * easedT;
          break;
        case 'y':
          angle = iRot.y + (fRot.y - iRot.y) * easedT;
          break;
        case 'z':
          angle = iRot.z + (fRot.z - iRot.z) * easedT;
          break;
      };
  
      rotValues[ i ] = angle;
      
    };
  
    return { 
      times: times,
      values: {
        pos: posValues,
        rot: rotValues
      } 
    };
  };






  const timesAndValues = createNTimesAndValues(100);
  function createKeyframeTracks( timesAndValues: TimesAndValues ) {

    const posTrack = new VectorKeyframeTrack(
      '.position',
      timesAndValues.times,
      timesAndValues.values.pos,
      InterpolateSmooth
    );
  
    const rotTrack = new NumberKeyframeTrack(
      '.rotation[' + axis + ']',
      timesAndValues.times,
      timesAndValues.values.rot,
    );

    return {
      posTrack: posTrack, 
      rotTrack: rotTrack
    };
  };


  const tracks = createKeyframeTracks(timesAndValues)
  return new AnimationClip(
    'circle-model', 
    1, 
    [ tracks.posTrack, tracks.rotTrack ]
  );
};



