import { AnimationClip, NumberKeyframeTrack } from 'three';

function Rotate({
  duration = 1,
  axis = 'y',
  iAngle = 0,
  fAngle = Math.PI * 2,
}: config ) {
  const times = [0, duration];
  const values = [iAngle, fAngle];
  const trackName = '.rotation[' + axis + ']';
  const track = new NumberKeyframeTrack(trackName, times, values);

  return new AnimationClip(trackName, duration, [track]);
};

interface config {
  duration: number;
  axis: string;
  iAngle: number;
  fAngle: number;
};

export default Rotate;
