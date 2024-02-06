import {
	AnimationClip,
	BooleanKeyframeTrack,
	ColorKeyframeTrack,
	Euler,
	InterpolateSmooth,
	NumberKeyframeTrack,
	Vector3,
	VectorKeyframeTrack
} from 'three';

import {
    TimesAndValues, 
    CircleStrategy, 
    TRStrategy,
    SuspendStrategy,
	TimesAndValuesStrategy
} from './times-and-values-strategy'

import { CamAnimConfig, ModelAnimConfig } from './types';


class AnimationClipCreator {

	static timesAndValues: TimesAndValues = new TimesAndValues();


	static CreateCameraAnimation( config: CamAnimConfig ) {

		this.timesAndValues.setStrategy( assignCamStrategy( config.animName ) );

		const { times, values } = this.timesAndValues.create( config );

		const posTrack = new VectorKeyframeTrack( '.position', times, values.pos as number[] );

		const rotTrack = new NumberKeyframeTrack( '.rotation[' + config.rotAxis + ']', times, values.rot as number[] );

		return new AnimationClip( config.animName, config.duration, [ posTrack, rotTrack ] );

	};

	/*
	static CreateModelAnimation( config: any ) {
		
		this.keyframes.setStrategy( config.strategy );

		const keyframeTracks = this.keyframes.create( config );

		return new AnimationClip( config.animName, 1, keyframeTracks );

	};
	*/
	

	// model animations:
	static CreateSuspendAnimation( config: ModelAnimConfig ) {

		this.timesAndValues.setStrategy( new SuspendStrategy() );

		const { times, values } = this.timesAndValues.create( config );
	
		const posTrack = new VectorKeyframeTrack( '.position', times, values.pos as number[], InterpolateSmooth )

		const rotTrack = new VectorKeyframeTrack( '.rotation', times, values.rot as number[], InterpolateSmooth )
	
		return new AnimationClip( "suspend", config.duration, [ posTrack, rotTrack ] );
		
	};


	static CreateScaleUpAnimation() {

		const times = [ 0, 1 ];

		const values = [ [ 0, 0, 0 ] , [ 1, 1, 1 ] ]; // are these arrays flattened automatically?

		const track = new VectorKeyframeTrack( ".scale", times, values );
	  
		return new AnimationClip( "scale-up", 1, [ track ] );

	};


	static CreateScaleDownAnimation() {

		const times = [ 0, 1 ];

		const values = [ [ 1, 1, 1 ] , [ 0, 0, 0 ] ];

		const track = new VectorKeyframeTrack( ".scale", times, values );
	  
		return new AnimationClip( "scale-down", 1, [ track ] );

	};


	static CreateSpinYAnimation() {

		const times = [ 0, 1 ];

		const values = [ 0, Math.PI * 2 ];
		
		const track = new NumberKeyframeTrack( ".rotation['y']", times, values );
	  
		return new AnimationClip( "spin-y", 1, [ track ]);
		
	};


}

/**
 * 
 * Potential way to unify Model animations so that we can call CreateModelAnimation( config ) just like 
 * CreateCameraAnimation( config ).
 * 
 * 	What we can do is, create strategies for times and values for even the scale-up, scale-down, and spin-y animations
 * 
 *  Then we can create a seperate function createTracks() that will select what tracks, and how many are needed. 
 *  There can really only be about 3 different tracks currently: 
 * 		Position
 * 		Rotation
 * 		Scale
 * 
 *  Lastly, we call the AnimationClip() constructor and pass in the tracks 
 * 
 * 
 *  ModelAnimConfig will need to come back. 
 * 	It will need the following propeties:
 * 		1. animName
 * 		2. types of keyframe tracks needed
 * 		3. Initial/Final values for any property that is going to be animated.
 * 
 */



function assignCamStrategy( animName: string ): TimesAndValuesStrategy {

	const splitName = animName.split('-');
	const firstName = splitName[ 0 ];

	if ( firstName === 'circle' ) return new CircleStrategy();
	else return new TRStrategy();

}

export { AnimationClipCreator };

/*

	static CreateScaleAxisAnimation( period, axis = 'x' ) {

		const times = [ 0, period ], values = [ 0, 1 ];

		const trackName = '.scale[' + axis + ']';

		const track = new NumberKeyframeTrack( trackName, times, values );

		return new AnimationClip( null, period, [ track ] );

	};

	static CreateShakeAnimation( duration, shakeScale ) {

		const times = [], values = [], tmp = new Vector3();

		for ( let i = 0; i < duration * 10; i ++ ) {

			times.push( i / 10 );

			tmp.set( Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0 )
			    .multiply( shakeScale )
				.toArray( values, values.length );

		}

		const trackName = '.position';

		const track = new VectorKeyframeTrack( trackName, times, values );

		return new AnimationClip( null, duration, [ track ] );

	};

	static CreatePulsationAnimation( duration, pulseScale ) {

		const times = [], values = [], tmp = new Vector3();

		for ( let i = 0; i < duration * 10; i ++ ) {

			times.push( i / 10 );

			const scaleFactor = Math.random() * pulseScale;
			tmp.set( scaleFactor, scaleFactor, scaleFactor ).
				toArray( values, values.length );

		}

		const trackName = '.scale';

		const track = new VectorKeyframeTrack( trackName, times, values );

		return new AnimationClip( null, duration, [ track ] );

	};

	static CreateVisibilityAnimation( duration ) {

		const times = [ 0, duration / 2, duration ], values = [ true, false, true ];

		const trackName = '.visible';

		const track = new BooleanKeyframeTrack( trackName, times, values );

		return new AnimationClip( null, duration, [ track ] );

	};

	static CreateMaterialColorAnimation( duration, colors ) {

		const times = [], values = [],
			timeStep = duration / colors.length;

		for ( let i = 0; i < colors.length; i ++ ) {

			times.push( i * timeStep );

			const color = colors[ i ];
			values.push( color.r, color.g, color.b );

		}

		const trackName = '.material.color';

		const track = new ColorKeyframeTrack( trackName, times, values );

		return new AnimationClip( null, duration, [ track ] );

	};

*/