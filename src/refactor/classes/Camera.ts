import { AnimationClip, Vector3 } from 'three';

interface CameraConfig {
  startPosition: Vector3;
  animationNames?: string[];
}

interface AnimationClipConfig__Camera {
  iP: Vector3;
  fP: Vector3;
  iR: Vector3;
  fR: Vector3;
}

export class Camera {
  startPosition: Vector3 = new Vector3(0, 0, 0);
  startRotation: Vector3 = new Vector3(0, 0, 0);
  positions: Vector3[] = [];
  rotations: Vector3[] = [];
  inNewPosition: boolean | undefined; // needs to either be an array by section, or needs to be set everytime section mutates
  // ^ sometimes we want multiple sections without moving camera at all. 
  //   not even in a circle. Just revealing more of the model slowly.

  
  animationNames: string[];
  animationClipConfigs: AnimationClipConfig__Camera[] | undefined; // animationDS
  animationClips: AnimationClip[] | undefined;

  constructor( { startPosition, animationNames = [] }: CameraConfig) {
    this.startPosition = startPosition;
    this.animationNames = animationNames;
  };

  createAnimationClipConfigs(): AnimationClipConfig__Camera[] {

    if( this.positions.length > 2 && this.rotations.length > 2 ) {
      
      const cameraAnimationClipConfigs = [];
      for (let i = 0; i < this.positions.length - 1; i++) {
        const iP: Vector3 = this.positions[i];
        const fP: Vector3 = this.positions[i + 1];
        const iR: Vector3 = this.rotations[i];
        const fR: Vector3 = this.rotations[i + 1];

        const cameraAnimationClipConfig = {
          iP: iP,
          fP: fP,
          iR: iR,
          fR: fR,
        };

        cameraAnimationClipConfigs[i] = cameraAnimationClipConfig;
      }

      return cameraAnimationClipConfigs;
    } else throw new Error('not enough positions and rotations to create AnimationClips')
  };
};







































/* 


Data Flow from animationNames to AnimationClips:

animationNames --> createCameraPosRots() --> cameraPosRots: { positions[], rotations[] }

cameraPosRots --> createAnimationClipConfigs() --> animationClipConfig[]

animationClipConfig[] --> createAnimationClips() --> animationClips


NEED TWO METHODS: 
  1. createCameraPosRots
  2. crateAnimationClips

////////////////////////
 1. createCameraPosRots
////////////////////////

names:

    'pushIn',
    'pullOutRotateUp',
    'pushInRotateDown', //this is just the opposite (reverse) of the animation before it
    'circleModel',
    'none', // for fullerenes, this should be zoomOut 
    'corkscrewUp',

animationInfo {
  name: 'pushIn'
  magnitude: 3
}


const animationInfos = [
  {
    name: 'pushIn'
    tMag: 3, // translate magnitude
    rMag: 0  // rotate magnitude
  },
  {
    name: 'pullOutRotateUp'
    tMag: 3,
    rMag: Math.PI / 4
  },
  {
    name: 'pushInRotateDown'
    tMag: 3,
    rMag: -Math.PI / 4
  },
  {
    name: 'circleModel'
    tMag: Math.PI / 2, // circle model 90 degrees
    rMag: Math.PI / 2  // rotate camera 90 degrees
  },
  {
    name: 'pullOut'
    tMag: 3,
    rMag: Math.PI / 4
  },
  {
    name: 'corkscrewUp'
    tMag: 3,
    rMag: Math.PI / 2
  }
]


1. First we need to check which name 
2. Once we have matched the name we need the pP and pR (prev positiov and prev rotation) to create the nP (next position).



case: zoomIn 

  if not rotated: 
    nP = new Vector3( pP.x, pP.y, pP.z - zoomInAmount )

  if x-rotated:


  if y-rotated:





createCameraPosRots() {


}


*/