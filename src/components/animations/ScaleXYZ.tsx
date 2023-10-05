import { AnimationClip, VectorKeyframeTrack } from 'three'; 

function ScaleXYZ( config: config ) {

    const times = [ 0, config.duration ],
          values = [ ...config.initialScale, ...config.finalScale ],
          trackName = '.scale',
          track = new VectorKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );

};

interface config {
    duration: number, 
    initialScale: number[], 
    finalScale: number[]
};

export default ScaleXYZ;