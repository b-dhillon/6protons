import { AnimationClip, Euler, KeyframeTrack, Vector3 } from 'three';
/**
 * Implementation Questions:
 * 
 * 1. How will PosRots be handled?
 *    a. Do I need another factory method --> createPosRot --> therefore I need a Abstract Factory since I will need multiple factory methods?
 */

type AnimConfig = {

};

// abstract product v1
interface AnimClip {

  createAnimConfig( clientConfig: ClientConfig ): void
    
  createNTimesAndValues( n: number ): TimesAndValues;

  createPosKeyframes( timesAndValues: TimesAndValues ): PosKeyframes;

  createRotKeyframes( timesAndValues: TimesAndValues ): RotKeyframes;

  createScaleKeyframes( timesAndValues: TimesAndValues ): ScaleKeyframes;

  createAnimationClip( keyframes: any ): void;

};

// abstract product v2 -- re-thought
abstract class AnimClipper {

  animConfig: AnimConfig

  keyframes: KeyframeTrack[]

  clip: AnimationClip

  constructor( clientConfig: ClientConfig ){

    this.animConfig = this.createAnimConfig( clientConfig );

    this.keyframes = this.createKeyframes( 100, this.animConfig );

    this.clip = this.createAnimationClip( this.keyframes );

  };

  abstract createKeyframes( n: number, animConfig: AnimConfig ): KeyframeTrack[] 
  
  private createAnimConfig( clientConfig: ClientConfig ): AnimConfig {

  }



  private createAnimationClip( keyframes: KeyframeTrack[] ): AnimationClip {

    const duration = this.animConfig.duration

    return new AnimationClip( 'zoom-out', duration, keyframes );

  };

}

// concrete-products: camera animations:
class ZoomOut extends AnimClipper {

  constructor( clientConfig: ClientConfig ){

    super( clientConfig )

  };

  // each new animation will have to implement these 3 methods:
  // or maybe we just need to implement createKeyframes, because that is all that will change between animations?

  // createAnimConfig might be 'abstract-able'
  createAnimConfig( clientConfig: ClientConfig ): AnimConfig {

    this.animConfig = {}

  };

  createKeyframes( n: number, animConfig: AnimConfig ): KeyframeTrack[] {

  };

};





if (anim.name === 'zoom-out' ) new ZoomOut();






class ZoomInClip implements AnimClip {}

class ZoomOutRotateUpClip implements AnimClip {}

class ZoomInRotateDownClip implements AnimClip {}

class CorkscrewUpClip implements AnimClip {}

class CircleModelClip implements AnimClip {}



// concrete-products: model animations:
class ScaleUpClip implements AnimClip {}

class ScaleDownClip implements AnimClip {}

class SpinClip implements AnimClip {}

class Suspend implements AnimClip {}


// creator
type ClientConfig = {

  tMag: number, 
  rMag: number, 
  sMag: number,
  duration: number

};



// guru - Dialog
//   us - Obj3D
abstract class Obj3D {

  // factory method:
  abstract createClip( name: string, clientConfig: ClientConfig ): AnimClip;
  abstract createAnimConfigs( name: string, clientConfig: ClientConfig ): AnimConfig;

};



// concrete creators: 

// guru - WebDialog
//   us - Obj3D
class Camera extends Obj3D {

  createClip( name: string, clientConfig: ClientConfig ): AnimClip {


    if (name === 'zoom-out') return new ZoomOut( clientConfig )

    else if (name === 'zoom-in') return new ZoomInClip( clientConfig )
    else if (name === 'corkscrew-up') return new CorkscrewUpClip( clientConfig )
    else if (name === 'circle-model') return new CircleModelClip( clientConfig );

  };


  createAnimConfigs( name: string, clientConfig: ClientConfig ): AnimConfig {

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

          iPos: this.positions[ i ],
          fPos: this.positions[ i + 1 ],

          iRot: this.rotations[ i ],
          fRot: this.rotations[ i + 1 ],

          rotAxis: this.posRots[ i ].axis,
          easingFn: i === 0 ? easeOutCubic : easeInOutCubic,
          smoothness: 100

          animType: clientSettings.animType

        };

        this.animConfigs[i] = animConfig;

      };

    } else {

      throw new Error(
        'not enough positions and rotations to create AnimationConfigs'
      );

    };
    
  }

};


// refactoring.guru - WebDialog
//               us - ModelAnim
class Model extends Obj3D {

  createClip( name: string, config: ClientConfig ): AnimClip {

    if (name === 'scale-up') return new ScaleUpClip( clientConfig )
    else if (name === 'sacle-down') return new ScaleDownClip( clientConfig )
    else if (name === 'rotate') return new SpinClip( clientConfig );

  };

  createAnimConfig( clientSettings: any ): ModelAnimConfig {

    const name = clientSettings.name

    const modelAnimConfig = new ModelAnimConfig();

    switch(name) {

      case 'scale-up':
        modelAnimConfig.iScale = new Vector3( 0, 0, 0 );
        modelAnimConfig.fScale = new Vector3( 1, 1, 1 );
        break;

      case 'scale-down':
        modelAnimConfig.iScale = new Vector3( 1, 1, 1 );
        modelAnimConfig.fScale = new Vector3( 0, 0, 0 );
        break; 

      case 'spin-y': 
        modelAnimConfig.iRot = new Euler( 0, 1, 0 );
        modelAnimConfig.fRot = new Euler( 0, Math.PI * 2, 0);
        modelAnimConfig.rotAxis = 'y';
        break;

      case 'suspend':
        modelAnimConfig.duration = 1;
        break;

      default:
        throw new Error( "Invalid animation name. no model animation with that name found." )

    };

    return modelAnimConfig;

  }; 

  createAnimConfigs( name: string, clientConfig: ClientConfig ): ModelAnimConfig {

    for (let i = 0; i < this.positions.length - 1; i++) {

      const animConfig = this.createAnimConfig( clientSettings )

      this.animConfigs[i] = animConfig;

    };
    
  }

};



// client:
// put .createClip as a factory method in Camera
camera.createClip('zoom-in');
camera.createClip('zoom-out');
camera.createClip('zoom-out-rotate-up');
camera.createClip('zoom-in-rotate-down');
camera.createClip('circle-model');
camera.createClip('corkscrew-up');


model.createClip('scale-up')
model.createClip('spin')
model.createClip('scale-down')
model.createClip('suspend')