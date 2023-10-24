import { AnimationClip, VectorKeyframeTrack } from 'three';

function OscilateTranslateXYZ( config: config ): AnimationClip {

    const times = [ 0, config.duration / 2, config.duration ], 
          values = [ ...config.initialPosition, ...config.finalPosition, ...config.initialPosition ],
          trackName = '.position',
          track = new VectorKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );
};

interface config {
    duration: number, 
    initialPosition: number[], 
    finalPosition: number[]
};
;
export default OscilateTranslateXYZ;