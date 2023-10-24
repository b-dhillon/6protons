import { AnimationClip, NumberKeyframeTrack } from "three";

function Rotate( config: config ) {

    const times = [ 0, config.duration ], values = [ config.initialAngle, config.finalAngle ];
    const trackName = '.rotation[' + config.axis + ']';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, config.duration, [ track ] );

};

interface config {
    duration: number, 
    axis: string, 
    initialAngle: number, 
    finalAngle: number
}

export default Rotate; 