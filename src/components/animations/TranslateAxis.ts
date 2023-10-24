import { AnimationClip, NumberKeyframeTrack } from "three";

function TranslateAxis( config: config ) {

    const times = [ 0, config.duration ],
          values = [ config.initialPosition, config.finalPosition ],
          trackName = '.position[z]',
          track = new NumberKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, config.duration, [ track ] );


}

interface config { 
    duration: number, 
    initialPosition: number,
    finalPosition: number
}