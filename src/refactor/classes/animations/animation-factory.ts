import { AnimationClip } from 'three';

/**
 * Implementation Questions:
 * 
 * After Epiphany Questions:
 *  Should we return an AnimationClip from .createClip or AnimClip 
 *    Can we extend AnimationClip into an interface? 
 * 
 * 
 * -----------
 * 
 * 
 * 1. How will PosRots be handled?
 *    a. Do I need another factory method --> createPosRot --> therefore I need a Abstract Factory since I will need multiple factory methods?
 * 
 * 2. Where does the business logic for how to build the AnimationClip live? In the ConcreteProduct or ConcreteCreator
 * 3. Refactoring.guru says the Creator's primary responsibility is to do something with the Product, not just create the product. How do we implement this?
 *    a. I have implemented this by using an Anim class that will use an AnimClip product
 *    b. however, this can also be AnimClip creator class with Keyframe product
 * 
 */

// abstract product
interface AnimClip {

  createNTimesAndValues( n: number ): TimesAndValues;

  createPosKeyframes( timesAndValues: TimesAndValues ): PosKeyframes;

  createRotKeyframes( timesAndValues: TimesAndValues ): RotKeyframes;

  createScaleKeyframes( timesAndValues: TimesAndValues ): ScaleKeyframes;

  createAnimationClip( keyframes: any ): AnimationClip;

};

// concrete-products: camera animations:
class ZoomOutClip implements AnimClip {}

class ZoomInClip implements AnimClip {}

class CorkscrewUpClip implements AnimClip {}

class CircleModelClip implements AnimClip {}

// concrete-products: model animations:
class ScaleUpClip implements AnimClip {}

class ScaleDownClip implements AnimClip {}

class RotateClip implements AnimClip {}


// creator
type AnimConfig = {
  name: string;
  mag: {
    translate: number, 
    rotate: number, 
    scale: number
  }
};

// guru - Dialog
//   us - Obj3D
abstract class Obj3D {

  // factory method:
  abstract createClip( config: AnimConfig ): AnimClip;

};



// concrete creators: 

// guru - WebDialog
//   us - Obj3D
class Camera extends Obj3D {

  createClip( config: AnimConfig ): AnimClip {

    const { name } = config;

    if (name === 'zoom-out') return new ZoomOutClip( config )
    else if (name === 'zoom-in') return new ZoomInClip( config )
    else if (name === 'corkscrew-up') return new CorkscrewUpClip( config )
    else if (name === 'circle-model') return new CircleModelClip( config );

  };

};


// refactoring.guru - WebDialog
//               us - ModelAnim
class Model extends Obj3D {

  createClip( config: AnimConfig ): AnimClip {

    const { name } = config;

    if (name === 'scale-up') return new ScaleUpClip( config )
    else if (name === 'sacle-down') return new ScaleDownClip( config )
    else if (name === 'rotate') return new RotateClip( config );

  };

};



// client:
// put .createClip as a factory method in Camera
camera.createClip('zoom-out');
camera.createClip('circle-model');
camera.createClip('corkscrew-up');


model.createClip('scale-up')
model.createClip('spin')
model.createClip('scale-down')