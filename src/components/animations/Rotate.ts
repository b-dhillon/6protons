import { AnimationClip, NumberKeyframeTrack } from 'three';

type AnimConfig = {
  iRot: number;
  fRot: number;
  axis: string;
  duration: number;
};

function rotate({
  duration = 1,
  axis = 'y',
  iRot = 0,
  fRot = Math.PI * 2,
}: AnimConfig ) {

  const times = [ 0, duration ];
  const values = [ iRot, fRot ];
  const trackName = '.rotation[' + axis + ']';
  const track = new NumberKeyframeTrack(trackName, times, values);

  return new AnimationClip(trackName, duration, [track]);
};



export default rotate;
