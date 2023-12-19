

import { AnimationClip, Euler, Interpolant, KeyframeTrack, Vector3 } from "three";

// abstract product 1
interface AnimConfig {
  iPos: Vector3 | undefined;
  fPos: Vector3 | undefined;
  iRot: Euler | undefined;
  fRot: Euler | undefined; 
}

// concrete product 1A
class CamAnimConfig implements AnimConfig {

  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler;
  fRot: Euler; 

  axis: string; 
  easing: string;

  tMag: number;

  // Dependencies: camAnimations, positions, rotations, PosRotFactory
  createPosRots() {
    // need to implement
  }

}

// concrete product 1B

type Conf = {

  iPos?: Vector3 | undefined;
  fPos?: Vector3 | undefined;
  iRot?: Euler | undefined;
  fRot?: Euler | undefined; 
  axis?: string | undefined;

  iScale?: Vector3 | undefined; 
  fScale?: Vector3 | undefined;
  duration?: number | undefined;

}

class ModelAnimConfig implements AnimConfig {

  iPos: Vector3 | undefined;
  fPos: Vector3 | undefined;
  iRot: Euler | undefined;
  fRot: Euler | undefined; 
  axis: string | undefined;

  iScale: Vector3 | undefined; 
  fScale: Vector3 | undefined;
  duration: number;

  constructor( conf: Conf = {} ) {

    this.iPos = conf.iPos;
    this.fPos = conf.fPos;
    this.iRot = conf.iRot;
    this.fRot = conf.fRot;
    this.axis = conf.axis;
    this.iScale = conf.iScale;
    this.fScale = conf.fScale;
    this.duration = conf.duration ? conf.duration : 1;

  }

}


// abstract product 2 ? --> maybe this is a strategy pattern use case?
interface AnimKeyframes {

  keyframes: KeyframeTrack;

}


// abstract product 3
interface AnimClip {

  clip: AnimationClip;

}


// abstract factory
abstract class AnimFactory {

  abstract createAnimConfig( clientSettings: any ): AnimConfig; 

  abstract createAnimKeyframes( times: number[], values: any[], name: string ): KeyframeTrack;

  abstract createClip( name: string, duration: number, keyframes: KeyframeTrack, interp: Interpolant ): AnimationClip;

};


// concrete factory A
class CamAnimFactory extends AnimFactory {

  // this is already implemented in Camera
  createAnimConfig( clientSettings: any ): CamAnimConfig {
    
    const { name, tMag, rMag } = clientSettings;

    const posRot = PosRotFactory.create( this.camAnimations[i], this.positions[i], this.rotations[i] );



  }; 

  createAnimKeyframes( times: number[], values: any[], name: string ): KeyframeTrack {};

  createClip( name: string, duration: number, keyframes: KeyframeTrack, interp: Interpolant ): AnimationClip {};

}


// concrete factory B
class ModelAnimFactory extends AnimFactory {

  createAnimConfig( clientSettings: any ): ModelAnimConfig {

    const name = clientSettings.name

    let iPos: Vector3;
    let fPos: Vector3;
    let iRot: Euler;
    let fRot: Euler;
    let axis: string;
    let iScale: Vector3;
    let fScale: Vector3;

    switch(name) {

      case 'scale-up':
        iScale = new Vector3(0,0,0);
        fScale = new Vector3(1,1,1);
        return new ModelAnimConfig( { iScale, fScale } );

      case 'scale-down':
        iScale = new Vector3(1,1,1);
        fScale = new Vector3(0,0,0);
        return new ModelAnimConfig( { iScale, fScale } );

      case 'spin-y': 
        iRot = new Euler( 0, 1, 0 ),
        fRot = new Euler( 0, Math.PI * 2, 0),
        axis = 'y'
        return new ModelAnimConfig( { iRot, fRot, axis } );

      case 'suspend':
        return new ModelAnimConfig({ duration: 90 });

      default:
        throw new Error( "Invalid animation name. no model animation with that name found." )

    };

  }; 

  createAnimKeyframes( times: number[], values: any[], name: string ): KeyframeTrack {};

  createClip( name: string, duration: number, keyframes: KeyframeTrack, interp: Interpolant ): AnimationClip {};

}



// client end-goal: 

AnimFactory.createClip( 'zoom-out' )
AnimFactory.createClip( 'scale-up' )
AnimFactory.createClip( 'suspend-in-soln' )

// or

this.model.animClips = {
  enter: this.createClip( 'scale-up' ),
  main: this.createClip( 'spin' ),
  exit: this.createClip( 'scale-down' ),
  nested: nestedName ? this.createClip( 'suspend-in-soln' ) : undefined 
};