import { AnimationClip, BooleanKeyframeTrack } from "three";

function Visibility( duration: number ) {

    const times = [ 0, duration / 2, duration ], values = [ true, false, true ],
          trackName = '.visible',
          track = new BooleanKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, duration, [ track ] );

};

export default Visibility;