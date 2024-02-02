import { AnimationClip } from 'three';

/**
 * Implementation Questions:
 * 
 * After Epiphany Questions:
 *  Should we return an AnimationClip for .createClip or AnimClip 
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


// creator:
type AnimConfig = {
  name: string;
};

// guru - Dialog
//   us - Anim
abstract class Anim {

  // factory method:
  abstract createClip( config: AnimConfig ): AnimClip;

};



// concrete creators: 

// guru - WebDialog
//  us -  ZoomOutAnim
class ZoomOutAnim extends Anim {

  createClip(): AnimClip {

    return new ZoomOutClip();
    
  };

};


class CircleModelAnim extends Anim {

  createClip(): AnimClip {

    return new CircleModelClip();

  };
    
};



// client: 

if (anim.name === 'zoom-out' ) new ZoomOutAnim();

if (anim.name === 'circle-model' ) new CircleModelAnim();