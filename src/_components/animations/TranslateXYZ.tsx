import { VectorKeyframeTrack, AnimationClip } from 'three' 

function TranslateXYZ( config: config ) {

    const times = [ 0, config.duration ], 
          values = [ ...config.initial_position, ...config.final_position ],
          trackName = '.position',
          track = new VectorKeyframeTrack( trackName, times, values );
          
    return new AnimationClip( trackName, config.duration, [ track ] );

};

interface config {
    duration: number, 
    initial_position: number[],
    final_position: number []
}

export default TranslateXYZ;