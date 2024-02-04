import { AnimationClip, Euler, Vector3 } from "three";
import { CamAnimation } from "./classes/Camera";

/**
 * Camera 
 */

export type CamConfig = {

  startPosition?: Vector3;
  startRotation?: Euler;
  camAnimations?: CamAnimation[];

};
  
export type CamAnimConfig = {

  animName: string;
  tMag: number;
  rMag: number;


  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler;
  fRot: Euler;
  rotAxis: string | null;
  easingFn: Function;
  smoothness: number;
  duration: number;

};


export type ModelAnimConfig = {

  animName: string | undefined;

  iPos: Vector3 | undefined;
  fPos: Vector3 | undefined;
  iRot: Euler | undefined;
  fRot: Euler | undefined; 
  rotAxis: string | undefined;
  easingFn: Function | undefined;
  smoothness: number | undefined;
  duration: number;

  iScale: Vector3 | undefined; 
  fScale: Vector3 | undefined;

};

export type PosRot = {

  pos: Vector3;
  rot: Euler;
  axis: string | null;

};



/**
 * Model 
 */

export type ModelAnimNamesConfig = {

  enter?: string;
  main?: string;
  exit?: string;
  nested?: string;

};

export type ModelAnimNames = {

  enter: string;
  main: string;
  exit: string;
  nested?: string;

};



export type ModelClipConstructors = {
  
  [key: string]: AnimationClip; // Index signature

  // 'scale-up': (config?: any) => AnimationClip;
  // 'spin-y': (config?: any) => AnimationClip;
  // 'scale-down': (config?: any) => AnimationClip;
  // 'suspend': (config?: any) => AnimationClip;

  'scale-up': AnimationClip;
  'spin-y': AnimationClip;
  'scale-down': AnimationClip;
  'suspend': AnimationClip;
  
};

export type ModelAnimClips = {

  enter: AnimationClip | undefined;
  main: AnimationClip | undefined; 
  exit: AnimationClip | undefined; 
  nested: AnimationClip | undefined;

};


export type RotAngleAndRotVector = {

  camRotAngle: number;
  camRotVector: Vector3;

};

export type ModelDirectorConfig = {

  path: string, 
  section: number, 
  name: string,
  anims: ModelAnimNamesConfig,

};