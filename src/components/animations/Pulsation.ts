import { AnimationClip, Vector3, VectorKeyframeTrack } from "three";

export function CreatePulsationAnimation( duration: number, pulseScale: number ) {

    const times = [], values: string | any[] | undefined = [], tmp = new Vector3();

    for ( let i = 0; i < duration * 10; i ++ ) {
        times.push( i / 10 );
        const scaleFactor = Math.random() * pulseScale;
        tmp.set( scaleFactor, scaleFactor, scaleFactor ).toArray( values, values.length );
    };

    const trackName = '.scale';
    const track = new VectorKeyframeTrack( trackName, times, values );
    return new AnimationClip( 'pulsation', duration, [ track ] );
}
