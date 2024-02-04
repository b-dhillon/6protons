import { AnimationClip, Euler, Vector3 } from 'three';
import {
  getFrustrumVector,
  getUpVector,
} from '../../utility-functions/get-vector';
import { getVecOnCircle } from '../../utility-functions/get-vector-on-circle';
import { translateRotate } from '../../components/animations/translate-rotate-oo';
import { circleModel } from '../../components/animations/circle-model-xz';
import { CamConfig, CamAnimConfig } from "../types"
import { easeInOutCubic, easeOutCubic } from '../../utility-functions/easing-functions';



export class Camera {

  startPosition: Vector3;

  startRotation: Euler;

  positions: Vector3[];

  rotations: Euler[];

  posRots: PosRot[];

  inNewPosition: boolean | undefined;

  camAnimations: CamAnimation[];

  animConfigs: CamAnimConfig[]; // animationDS

  animClips: AnimationClip[];

  constructor({
    startPosition = new Vector3( 0, 0, 0 ),
    startRotation = new Euler( 0, 0, 0 ),
    camAnimations = [],
  }: CamConfig = {} ) {

    this.startPosition = startPosition;
    this.startRotation = startRotation;
    this.camAnimations = camAnimations;
    this.positions = [];
    this.rotations = [];
    this.posRots = [];
    this.animConfigs = [];
    this.animClips = [];
    
  };

  
  // public methods:
  public setStartPosition(x: number = 0, y: number = 0, z: number = 0): void {

    const startPos = new Vector3(x, y, z);

    this.startPosition = startPos;
    this.positions[0] = startPos;

  };


  public setStartRotation(x: number = 0, y: number = 0, z: number = 0): void {

    const startRot = new Euler(x, y, z);

    this.startRotation = startRot;
    this.rotations[0] = startRot;

  };


  public setCamAnimations( camAnimations: CamAnimation[] ): void {

    this.camAnimations = camAnimations;

  };


  public init(): void {

    this.createPosRots();
    this.createAnimClips();

  };


  // private methods:
  private createPosRots(): void {

    if (!this.camAnimations.length) {

      throw new Error('No camAnimations have been created');

    };

    if (!this.positions.length || this.rotations.length) {

      throw new Error('Initial position or initial rotation have not been set');

    };

    for (let i = 0; i < this.camAnimations.length; i++) {

      const posRot = PosRotFactory.create( this.camAnimations[i], this.positions[i], this.rotations[i] );

      this.posRots.push( posRot );

    };

  };


  private createAnimConfigs(): void {

    // if positions and rotations haven't been extracted from PosRots
    // and set, then set them:
    const arePosRotsExtracted = this.positions.length > 2 && this.rotations.length > 2;

    if ( !arePosRotsExtracted ) {

      this.setPositions(this.posRots);
      this.setRotations(this.posRots);

    };

    if ( arePosRotsExtracted ) {

      for (let i = 0; i < this.positions.length - 1; i++) {

        const animConfig: CamAnimConfig = {

          animName: this.camAnimations[i].name,

          iPos: this.positions[i],
          fPos: this.positions[i + 1],
          iRot: this.rotations[i],
          fRot: this.rotations[i + 1],
          rotAxis: this.posRots[i].axis,
          
          easingFn: i === 0 ? easeOutCubic : easeInOutCubic

        };

        this.animConfigs[i] = animConfig;

      };

    } else {

      throw new Error(
        'not enough positions and rotations to create AnimationConfigs'
      );

    };

  };


  private createAnimClips() {

    if (!this.animConfigs.length) {

      this.createAnimConfigs();

    };

    this.animConfigs.forEach( (config: CamAnimConfig, i: number) => {

      let clip: AnimationClip;

      if ( this.camAnimations[i].name === 'circle-model' ) {

        clip = circleModel( config );

      }
      
      else {

        clip = translateRotate( config );

      };

      this.animClips.push( clip );

    });

  };


  private setPositions(posRots: PosRot[]): void {

    for (let i = 0; i < posRots.length; i++) {

      this.positions.push(posRots[i].pos);

    };

  };


  private setRotations(posRots: PosRot[]): void {

    for (let i = 0; i < posRots.length; i++) {

      this.rotations.push(posRots[i].rot);

    };

  };


  public getPosRots(): PosRot[] {

    if (!this.posRots.length) throw new Error('posRot array is empty')

    else return this.posRots;

  };

}







export class CamAnimation {

  name: string;
  tMag: number;
  rMag: number;
  duration: number;

  constructor( name: string, tMag: number, rMag: number = 0, duration: number = 1 ) {

    this.name = name;
    this.tMag = tMag;
    this.rMag = rMag;
    this.duration = duration

  };

}









export class PosRot {
  pos: Vector3;
  rot: Euler;
  axis: string | null;

  constructor(fPos: Vector3, fRot: Euler, axis: string | null = null) {
    this.pos = fPos;
    this.rot = fRot;
    this.axis = axis;
  }
}

class PosRotFactory {

  static create( camAnimation: CamAnimation, iPos: Vector3, iRot: Euler ): PosRot {
    const { tMag, rMag, name } = camAnimation

    switch (name) {

      case 'zoom-out':
        return this.zoomOut(tMag, iPos, iRot );

      case 'zoom-in':
        return this.zoomIn(tMag, iPos, iRot );

      case 'zoom-out-rotate-up':
        return this.zoomOutRotateUp(
          tMag,
          rMag,
          iPos,
          iRot,
        );

      case 'rotate-down-zoom-in':
        return this.rotateDownZoomIn(
          tMag,
          rMag,
          iPos,
          iRot,
        );

      case 'corkscrew-up':
        return this.corkscrewUp(
          tMag,
          rMag,
          iPos,
          iRot,
        );

      case 'circle-model':
        return this.circleModel(
          tMag,
          rMag,
          iPos,
          iRot,
        );
        
      default: 
        return new PosRot(
          new Vector3(undefined, undefined, undefined),
          new Euler(undefined, undefined, undefined), 
          null
        )
    }
  }

  private static zoomOut(
    tMag: number,
    iPos: Vector3,
    iRot: Euler,
  ): PosRot {

    const frustrumVector = getFrustrumVector(iPos, iRot);
    const oppFrustrumVector = frustrumVector.clone().negate();
    const scaledVector = oppFrustrumVector.multiplyScalar(tMag);
    const fPos = scaledVector;
    // zoom does not have a rotation, we copy:
    const fRot = iRot;

    return new PosRot(fPos, fRot, null);
  }

  private static zoomIn(
    tMag: number,
    iPos: Vector3,
    iRot: Euler,
  ): PosRot {

    const frustrumVector = getFrustrumVector(iPos, iRot);
    const scaledVector = frustrumVector.multiplyScalar(tMag);
    const fPos = scaledVector;

    // zoom does not have a rotation, so fRot = iRot.
    const fRot = iRot;

    return new PosRot(fPos, fRot, null);
  }

  private static zoomOutRotateUp(
    tMag: number,
    rMag: number,
    iPos: Vector3,
    iRot: Euler
  ): PosRot {

    // zoom out -- final position (fPos):
    const frustrumVector = getFrustrumVector(iPos, iRot);
    const oppFrustrumVector = frustrumVector.clone().negate();
    const scaledVector = oppFrustrumVector.multiplyScalar(tMag);
    const fPos = scaledVector;

    // rotate up -- final rotation (fRot) - rotate x-axis
    const axis = 'x';
    const fRot = new Euler(iRot.x + rMag, iRot.y, iRot.z);

    return new PosRot(fPos, fRot, axis);
  }

  private static rotateDownZoomIn(
    tMag: number,
    rMag: number,
    iPos: Vector3,
    iRot: Euler
  ): PosRot {

    // first we rotate down to get the fRot -- rotate x-axis
    const axis = 'x';
    const fRot = new Euler(iRot.x - rMag, iRot.y, iRot.z);

    // then we feed the fRot to getFrustrumVector for a zoom-in
    const frustrumVector = getFrustrumVector(iPos, fRot);
    const scaledVector = frustrumVector.multiplyScalar(tMag);
    const fPos = scaledVector;

    return new PosRot(fPos, fRot, axis);
  }

  private static corkscrewUp(
    tMag: number,
    rMag: number,
    iPos: Vector3,
    iRot: Euler
  ): PosRot {

    // get the y-vector with an applied rotation matrix and then scale it:
    const upVector = getUpVector(iPos, iRot);
    const scaledUpVector = upVector.multiplyScalar(tMag);
    const fPos = scaledUpVector;

    // final rotation - corkscrewUp rotates the y-axis.
    const axis = 'y';
    const fRot = new Euler(iRot.x, iRot.y + rMag, iRot.z);

    return new PosRot(fPos, fRot, axis);
  }

  // rMag = -tMag if you want the camera
  // to .lookAt the model after circle translation
  private static circleModel(
    tMag: number,
    rMag: number,
    iPos: Vector3,
    iRot: Euler
  ): PosRot {

    const fPos = getVecOnCircle(iPos, iRot, tMag);

    const axis = 'y';
    // fRot is just iRot.y +- Math.PI/2
    const fRot = new Euler(iRot.x, iRot.y - rMag, iRot.z);
    //                                          ^ is this - or + ? clock-wise should be negative.

    return new PosRot(fPos, fRot, axis);
  }
}











/**
 * Notes: 
 * 
 * Camera.inNewPosition: boolean | undefined;
 * 
 * this field needs to be an array indexed by section, or needs to be set everytime section mutates
 * sometimes we want multiple sections without moving camera. so user can click next
 * and see something else happen on screen.
 */




/* 


Data Flow from animationNames to AnimationClips:

animationNames --> createPosRots() --> cameraPosRots: { positions[], rotations[] }

cameraPosRots --> createAnimationClipConfigs() --> animationClipConfig[]

animationClipConfig[] --> createAnimationClips() --> animationClips




// factory .create method --> moved to inside the factory 
// reason: we don't want to bloat the class with extra methods. this method 
// could be cut and moved into the factory
private createPosRot(camAnimation: CamAnimation, i: number): PosRot {
    const { name, tMag, rMag } = camAnimation;

    PosRotFactory.create( camAnimation )

    switch (name) {
      case 'zoom-out':
        return PosRotFactory.zoomOut(tMag, this.positions, this.rotations, i);

      case 'zoom-in':
        return PosRotFactory.zoomIn(tMag, this.positions, this.rotations, i);

      case 'zoom-out-rotate-up':
        return PosRotFactory.zoomOutRotateUp(
          tMag,
          rMag,
          this.positions,
          this.rotations,
        );

      case 'rotate-down-zoom-in':
        return PosRotFactory.rotateDownZoomIn(
          tMag,
          rMag,
          this.positions,
          this.rotations,
        );

      case 'corkscrew-up':
        return PosRotFactory.corkscrewUp(
          tMag,
          rMag,
          this.positions,
          this.rotations,
        );

      case 'circle-model':
        return PosRotFactory.circleModel(
          tMag,
          rMag,
          this.positions,
          this.rotations,
        );

      default:
        return {
          pos: new Vector3(undefined, undefined, undefined),
          rot: new Vector3(undefined, undefined, undefined),
          axis: null,
        };
    }
    //
  }
*/
