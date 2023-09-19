import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from 'three';

interface config {
  duration: number;
  initialPosition: number[];
  finalPosition: number[];
  initialAngle: number[];
  finalAngle: number[];
  axis: string;
}

export function TranslateRotate(config: config) {

  const positionTimes = [0, config.duration];
  const positionPoints = [
    ...config.initialPosition,
    ...config.finalPosition,
  ];

  // This is where the camera's animation is interpolated. The interpolation needs to be set to catmull-rom 
  // but only, for the one time that you need it. That will need to be defined in the config object.
  const positionTrack = new VectorKeyframeTrack(
    '.position',
    positionTimes,
    positionPoints
  );



















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
    rotationValues
  );

  return new AnimationClip('TranslateRotateCamera', config.duration, [
    positionTrack,
    rotationTrack,
  ]);
}