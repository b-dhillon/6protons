import { AnimationClip, VectorKeyframeTrack } from 'three';

function ScaleXYZ({ duration = 1, iScale, fScale }: config) {
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const trackName = '.scale';
  const track = new VectorKeyframeTrack(trackName, times, values);

  return new AnimationClip(trackName, duration, [track]);
};

export function scaleUp({ duration = 1, iScale = [0,0,0], fScale = [1,1,1] }: config) {
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const trackName = '.scaleUp';
  const track = new VectorKeyframeTrack(trackName, times, values);

  return new AnimationClip(trackName, duration, [track]);
};

export function scaleDown({ duration = 1, iScale = [1,1,1],  fScale = [0,0,0] }: config) {
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const trackName = '.scaleDown';
  const track = new VectorKeyframeTrack(trackName, times, values);

  return new AnimationClip(trackName, duration, [track]);
};

interface config {
  duration: number;
  iScale: number[];
  fScale: number[];
};

export default ScaleXYZ;