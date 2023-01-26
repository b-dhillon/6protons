import { AnimationClip, VectorKeyframeTrack } from 'three'; 

function ScaleXYZ( config: config ) {

    const times = [ 0, config.duration ],
          values = [ ...config.initial_scale, ...config.final_scale ],
          trackName = '.scale',
          track = new VectorKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );

};

interface config {
    duration: number, 
    initial_scale: number[], 
    final_scale: number[]
};

export default ScaleXYZ;