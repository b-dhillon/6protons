import { AnimationClip, VectorKeyframeTrack } from 'three';

function OscilateTranslateXYZ( config: config ) {

    const times = [ 0, config.duration / 2, config.duration ], 
          values = [ ...config.initial_position, ...config.final_position, ...config.initial_position ],
          trackName = '.position',
          track = new VectorKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );
};

interface config {
    duration: number, 
    initial_position: number[], 
    final_position: number[]
};
;
export default OscilateTranslateXYZ;