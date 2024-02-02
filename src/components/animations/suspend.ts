
import { AnimationClip, InterpolateSmooth, NumberKeyframeTrack } from "three";

// This class in an attempt to connect all model animations 
class ModelAnimationValues {

    pos: {
        x: number[] 
        z: number[] 
        y: number[] 
    } = {
        x: [],
        y: [],
        z: []
    }

    rot: {
        x: number[] 
        z: number[] 
        y: number[] 
    } = {
        x: [],
        y: [],
        z: []
    }

    scale: {
        x: number[] 
        z: number[] 
        y: number[] 
    } = {
        x: [],
        y: [],
        z: []
    }
}

function suspend( duration: number ) {

    let times: number[] = [];

    let values = new ModelAnimationValues();

    let posXValues: number[] = [];
    let posYValues: number[] = [];
    
    let rotXValues: number[] = [];
    const rotYValues = [ 0, ( Math.PI * 2 ) ]; // this will only be 2 values, but times will have n values. will this be an issue for the animation?

    for( let i = 0; i < duration; i++ ) {

        times.push( i );

        values.pos.x.push( ( Math.sin( i / 4 ) ) / 30 );

        posXValues.push( ( Math.sin( i / 4 ) ) / 30 );
        //                               ^velocity ^amplitude

        posYValues.push( ( 0.5 + Math.sin( i / 2 ) ) / 12 );
        //                                     ^velocity ^amplitude

        rotXValues.push( ( Math.sin( i / 7 ) ) );
        //                               ^velocity

    };

    const posKeyframes = {
        x: new NumberKeyframeTrack( '.position[x]', times, posXValues, InterpolateSmooth ),
        y: new NumberKeyframeTrack( '.position[y]', times, posYValues, InterpolateSmooth )
    };

    const rotKeyframes = {
        x: new NumberKeyframeTrack( '.rotation[x]', times, rotXValues ),
        y: new NumberKeyframeTrack( '.rotation[y]', times, rotYValues )
    };

    return new AnimationClip( 'suspend', duration, [ posKeyframes.y, rotKeyframes.y, rotKeyframes.x, posKeyframes.x ] );

};

export { suspend };



// const timesRotationY = [ 0, duration ];