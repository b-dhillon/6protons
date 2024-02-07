import { AnimationClip, Euler, Vector3 } from "three";
import { CamAnimation } from "./classes/Cam";
import { KeyframeStrategy } from "./keyframes-strategy";

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

  keyframeStrategy: KeyframeStrategy;

};







// export type ModelAnimConfig = {

//   animName: string | undefined;

//   iPos: Vector3 | undefined;
//   fPos: Vector3 | undefined;

//   iRot: Euler | undefined;
//   fRot: Euler | undefined; 
//   rotAxis: string | undefined;

//   easingFn: Function | undefined;
//   smoothness: number | undefined;
//   duration: number;

//   iScale: Vector3 | undefined; 
//   fScale: Vector3 | undefined;

//   keyframeStrategy: KeyframeStrategy;

// };

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


export type ModelAnimConfig = {

  animName: string,
 
  initial?: any, 
  final?: any,
  
  iPos?: Vector3,
  iRot?: Euler,

  smoothness?: number;
  duration?: number;
  
  keyframeStrategy: KeyframeStrategy

};


export type RotAngleAndRotVector = {

  camRotAngle: number;
  camRotVector: Vector3;

};

export type ModelDirectorConfig = {

  path: string, 
  section: number, 
  name: string,
  animNames: ModelAnimNamesConfig,

};