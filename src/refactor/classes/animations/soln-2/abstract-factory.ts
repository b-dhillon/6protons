
/**
 * I dont think we need an Abstract Factory.
 * 
 * Abstract Factories are for families of products that differ by variant 
 *  i.e. victorian chair, victorian coffee-table, victorian sofa
 * 
 * We have:
 *  model anim-config and camera anim-config
 *  but...keyframes, and animation-clip however do not vary with model and camera, they vary by the type of clip
 * 
 * Instead, perhaps deploy a factory-method with a strategy pattern for AnimConfig? 
 */



// abstract factory -- re-thinking
interface AnimClipFactory {

  createAnimConfig( clientConfig: ClientConfig ): AnimConfig

  createKeyframes( n: number, animConfig: AnimConfig ): KeyframeTrack[]

  createClip( keyframes: KeyframeTrack[] ): AnimationClip
  
}


// concrete factory 
class CameraClipFactory implements AnimClipFactory {

  animConfig: AnimConfig
  keyframes: KeyframeTrack[]
  clip: AnimationClip

  constructor( clientConfig: ClientConfig ){
  
    this.animConfig = this.createAnimConfig( clientConfig );

    this.keyframes = this.createKeyframes( 100, this.animConfig );

    this.clip = this.createAnimationClip( this.keyframes );

  };


  createAnimConfig( clientConfig: ClientConfig ): AnimConfig {}

  createKeyframes( n: number, animConfig: AnimConfig ): KeyframeTrack[] {}

  createClip( keyframes: KeyframeTrack[] ): AnimationClip {}


}
  
// concrete-products: camera animations:
class ZoomOut extends CameraAnimClipFactory {

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
  