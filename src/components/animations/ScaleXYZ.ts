import { AnimationClip, VectorKeyframeTrack } from 'three';

function ScaleXYZ({ duration = 1, iScale, fScale }: ModelAnimConfig) {
  
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const name = '.scale';
  const track = new VectorKeyframeTrack(name, times, values);

  return new AnimationClip(name, duration, [track]);
};

export function scaleUp({ duration = 1, iScale = [0,0,0], fScale = [1,1,1] }: ModelAnimConfig) {
  
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const name = '.scaleUp';
  const track = new VectorKeyframeTrack(name, times, values);

  return new AnimationClip(name, duration, [track]);
};

export function scaleDown({ duration = 1, iScale = [1,1,1],  fScale = [0,0,0] }: ModelAnimConfig) {
  
  const times = [0, duration];
  const values = [...iScale, ...fScale];
  const name = '.scaleDown';
  const track = new VectorKeyframeTrack(name, times, values);

  return new AnimationClip(name, duration, [track]);
};

interface ModelAnimConfig {
  iScale: number[];
  fScale: number[];
  duration: number;
};

export default ScaleXYZ;