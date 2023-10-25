import { AnimationClip, InterpolateSmooth, NumberKeyframeTrack, VectorKeyframeTrack } from 'three';
import { easeOutCubic } from '../../utility-functions/easing-functions'

interface config {
  duration: number;
  initialPosition: number[];
  finalPosition: number[];
  initialAngle: number[];
  finalAngle: number[];
  axis: string;
};

export function TranslateRotate(config: config) {

  /** Custom Interpolation:
   * Here we are interpolating the positionValues our selves with our 
   * custom easing function.
   * 
   * What is the expected return of the easeOutCubic function?
   *  For each input of time, it will give us...
  */

  // create n position values:
  const n = 100;
  const startPosition = config.initialPosition;
  const endPosition = config.finalPosition;
  const positionValues = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;  // Normalize i to 0 -> 1
    const easedT = easeOutCubic(t);
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

  /** Rotation */
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

  return new AnimationClip('TranslateRotateCamera', 1, [
    positionTrack,
    rotationTrack,
  ]);
}













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