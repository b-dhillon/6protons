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

  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler;
  fRot: Euler;
  axis: string | null;
  easing: string;

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

export type ModelAnimConfig = {

  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler; 
  fRot: Euler;
  iScale: Vector3;
  fScale: Vector3;
  duration: number;

};


export type ModelClipConstructors = {
  
  [key: string]: (config?: any) => AnimationClip; // Index signature

  'scale-up': (config?: any) => AnimationClip;
  'rotate': (config?: any) => AnimationClip;
  'scale-down': (config?: any) => AnimationClip;
  
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
  assignedSection: number, 
  name: string,
  animNames: ModelAnimNamesConfig,

};