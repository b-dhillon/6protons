import { AnimationClip, NumberKeyframeTrack } from "three";

function TranslateAxis( config: config ) {

    const times = [ 0, config.duration ],
          values = [ config.initial_position, config.final_position ],
          trackName = '.position[z]',
          track = new NumberKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );


}

interface config { 
    duration: number, 
    initial_position: number,
    final_position: number
}