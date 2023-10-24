import { AnimationClip, InterpolateSmooth, NumberKeyframeTrack } from "three";

function SuspendInSolution( duration: number ) {

    const trackNamePositionX = '.position[x]';
    let timesPositionX: number[] = [];
    let valuesPositionX: number[] = [];
    for( let i = 0; i < duration; i++ ) {
        timesPositionX.push( i );
        valuesPositionX.push( ( Math.sin(i / 4) ) / 30 );
                                        //  ^veloc. ^amplitude
    };
    const trackPositionX = new NumberKeyframeTrack( trackNamePositionX, timesPositionX, valuesPositionX, InterpolateSmooth );

    const trackNamePositionY = '.position[y]';
    let timesPositionY: number[] = [];
    let valuesPositionY: number[] = [];
    for( let i = 0; i < duration; i++ ) {
        timesPositionY.push( i );
        valuesPositionY.push( ( 0.5 + Math.sin(i / 2 ) ) / 12 );
        //                                         ^velocity ^amplitude
    };
    const trackPositionY = new NumberKeyframeTrack( trackNamePositionY, timesPositionY, valuesPositionY, InterpolateSmooth );

    const trackNameRotationY = '.rotation[y]';
    const timesRotationY = [ 0, duration ];
    const valuesRotationY = [ 0, (Math.PI * 2) ];
    const trackRotationY = new NumberKeyframeTrack( trackNameRotationY, timesRotationY, valuesRotationY );

    const trackNameRotationX= '.rotation[x]';
    let timesRotationX: number[] = [];
    let valuesRotationX: number[] = [];
    for( let i = 0; i < duration; i++ ) {
        timesRotationX.push( i );
        valuesRotationX.push( ( Math.sin( i / 7 ) ) );
        //                                 ^velocity   ^amplitude
    };
    const trackRotationX = new NumberKeyframeTrack( trackNameRotationX, timesRotationX, valuesRotationX );

    return new AnimationClip( 'Levitate', duration, [ trackPositionY, trackRotationY, trackRotationX, trackPositionX ] );
}

export default SuspendInSolution;