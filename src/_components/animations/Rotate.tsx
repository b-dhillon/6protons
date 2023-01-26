import { AnimationClip, NumberKeyframeTrack } from "three";

function Rotate( config: config ) {

    const times = [ 0, config.duration ], values = [ config.initial_angle, config.final_angle ];
    const trackName = '.rotation[' + config.axis + ']';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, config.duration, [ track ] );

};

interface config {
    duration: number, 
    axis: string, 
    initial_angle: number, 
    final_angle: number
}

export default Rotate; 