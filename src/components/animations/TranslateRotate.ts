import { AnimationClip, InterpolateSmooth, NumberKeyframeTrack, VectorKeyframeTrack } from 'three';
import { easeOutCubic, easeInOutCubic } from '../../utility-functions/easing-functions'

interface config {
  duration: number;
  initialPosition: number[];
  finalPosition: number[];
  initialAngle: number[];
  finalAngle: number[];
  axisData: [string, boolean];
  easingType: string;
  _page: any;
  _i: number;
  _modelInNewPos: boolean
};

/** the for-loops in createPositionTrack and createRotationTrack can be combined into a single loop */
export function TranslateRotate(config: config) {

  let [ axis, rotationsEqual ] = config.axisData

  let section = config._i

  let easingFn = config.easingType === 'out' ? easeOutCubic : easeInOutCubic;

  /** Position Keyframes */
  function createPositionTrack(): VectorKeyframeTrack {
    // create n position values:
    const n = 100;
    const startPosition = config.initialPosition;
    const endPosition = config.finalPosition;
    const positionValues = [];
  
    for (let i = 0; i < n; i++) {
      const t = i / (n-1);  // Normalize i to 0 -> 1
      const easedT = easingFn(t);
      const iX = startPosition[0] + (endPosition[0] - startPosition[0]) * easedT;
      const iY = startPosition[1] + (endPosition[1] - startPosition[1]) * easedT;
      const iZ = startPosition[2] + (endPosition[2] - startPosition[2]) * easedT;
      positionValues.push(iX, iY, iZ);
    };
  
    // creates n times:
    const positionTimes = Array.from({ length: n }, (_, i) => i/n );  // [0, 1, 2, ..., 9]
    // create keyframe track with n times and n values:
    const positionTrack = new VectorKeyframeTrack(
      '.position',
      positionTimes,
      positionValues,
    );

    return positionTrack;
  };


  /** Rotation Keyframes */
  function createRotationTrack(): NumberKeyframeTrack {
    // create n rotation values and times:
    const n = 100;
    let rotationAxis = ''
    if (axis) rotationAxis = '.rotation[' + axis + ']';
    else throw new Error('axis is falsy inside TranslateRotate')

    // Blocked here. How do we handle 0,0,0 to 0,0,0 ?
    // Do we default the rotation axis to 'x' and just dont do anything?
    // Or do we default the rotation axis to '' and check if it is falsy or truthy?
      // What happens if we dont do a rotationTrack? Does it just snap back to zero?























    // const wasPreviousAnimationTranslateCircle = !config._page.models[ section < 1 ? 0 : section-1 ].newModelLocation
    // if ( wasPreviousAnimationTranslateCircle ) rotationAxis = '.rotation[y]'

    const initialAngle = config.initialAngle;
    const finalAngle = config.finalAngle;
    const rotationTimes = []
    const rotationValues = [];


    /** If inital and fianl angles the same, create rotation that doesn't change
     *  else, create rotation values and times 
    */
    if( rotationsEqual ) {
    // if(  ) {

      for (let i = 0; i < n; i++) {
        const t = i / (n-1);  // Normalize i to 0 -> 1
        rotationValues[i] = initialAngle[1];
        rotationTimes[i] = t;
      };

    } else {

      for (let i = 0; i < n; i++) {
        const t = i / (n-1);  // Normalize i to 0 -> 1
        const easedT = easingFn(t);
        
        let angle = 0;
        if (axis === 'x') {
          angle = initialAngle[0] + (finalAngle[0] - initialAngle[0]) * easedT;
        }
        if (axis === 'y') {
          angle = initialAngle[1] + (finalAngle[1] - initialAngle[1]) * easedT;
        }
        if (axis === 'z') {
          angle = initialAngle[2] + (finalAngle[2] - initialAngle[2]) * easedT;
        }
  
        rotationValues[i] = angle;
        rotationTimes[i] = t;
      };
      
    };

    const rotationTrack = new NumberKeyframeTrack(
      rotationAxis,
      rotationTimes,
      rotationValues,
    );

    return rotationTrack;
  }


  return new AnimationClip(
    'TranslateRotate',
    1,
    [ createPositionTrack(), createRotationTrack() ]
  );

};


function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true; // checks if both are the same instance
  if (a == null || b == null) return false; // checks if either is null or undefined
  if (a.length !== b.length) return false; // arrays with different lengths are not equal

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false; // as soon as a non-equal element is found, return false
  }
  return true; // if all elements are equal, return true
}















// old rotation track method, with no easing:
/**
 
function createRotationTrack(): NumberKeyframeTrack {
  const rotationTimes = [0, config.duration];

  let rotationValues: number[] = [];
  if (config.axis === 'x')
    rotationValues = [config.initialAngle[0], config.finalAngle[0]];
  if (config.axis === 'y')
    rotationValues = [config.initialAngle[1], config.finalAngle[1]];
  if (config.axis === 'z')
    rotationValues = [config.initialAngle[2], config.finalAngle[2]];

  const rotationAxis = '.rotation[' + config.axis + ']';
  const rotationTrack = new NumberKeyframeTrack(
    rotationAxis,
    rotationTimes,
    rotationValues,
    InterpolateSmooth
  );

  return rotationTrack
}

 */






  /** Position */
  // const positionTimes = [0, config.duration];
  // const positionPoints = [
  //   ...config.initialPosition,
  //   ...config.finalPosition,
  // ];









  // Adjusted times and positions with buffer
  // const bufferTime = config.duration * .01; // Adjust this value to control the buffer duration
  // const positionTimes = [-bufferTime, 0, config.duration, config.duration + bufferTime];

  // const positionPoints = [
  //   ...config.initialPosition, // Buffer start
  //   ...config.initialPosition,
  //   ...config.finalPosition,
  //   ...config.finalPosition, // Buffer end
  // ];



    // With buffer:
  // const rotationTimes = [-bufferTime, 0, config.duration, config.duration + bufferTime];
  // let rotationValues: number[] = [];
  // if (config.axis === 'x')
  //   rotationValues = [config.initialAngle[0], config.initialAngle[0], config.finalAngle[0], config.finalAngle[0]];
  // if (config.axis === 'y')
  //   rotationValues = [config.initialAngle[1], config.initialAngle[1], config.finalAngle[1], config.finalAngle[1]];
  // if (config.axis === 'z')
  //   rotationValues = [config.initialAngle[2], config.initialAngle[2], config.finalAngle[2], config.finalAngle[2]];