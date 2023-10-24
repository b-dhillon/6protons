import { AnimationClip, InterpolateSmooth, NumberKeyframeTrack } from "three";

/*
// Transform the following code into a function that returns an AnimationClip
useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8)
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7
})
*/
function SuspendInSolution2( duration: number ) {
    const trackNamePositionX = '.position[x]';
    let timesRotation: number[] = [];
    let valuesRotation: number[][] = [];
    for( let i = 0; i < duration; i++ ) {
        timesRotation.push( i );
        valuesRotation.push( [ Math.cos(i / 4) / 8, Math.sin(i / 3) / 4, 0.15 + Math.sin(i / 2) / 8 ] );
                                        //  ^velocity                 ^amplitude
    };
    const track = new NumberKeyframeTrack( trackNamePositionX, timesRotation, valuesRotation, InterpolateSmooth );
    return new AnimationClip( 'SuspendInSolution2', duration, [ track ] );
}

export default SuspendInSolution2;

