
/**
 * Notes:
 * only createTimes() and createValues() will need to be poly-morphic here
 * We can treat these as 'factory-methods' or we can try to implement a strategy pattern
 * 
 * Adding a new animation with this solution will involve:
 *  1. Adding it to the name space
 *  2. Potentially creating a new strategy implementation?
 *  3. Potentially creating a new config?
 */

import { Euler, InterpolateSmooth, KeyframeTrack, NumberKeyframeTrack, Vector3, VectorKeyframeTrack } from "three";
import { computeModelPosition } from "../utility-functions/compute-model-position";
// import { easeInOutCubic, easeOutCubic } from "../utility-functions/easing-functions";
import { CamAnimConfig } from "./types";


////////////////////////
/// Stategy Pattern  ///
////////////////////////


// Abstract Strategy:
export interface KeyframeStrategy {

    execute( config: any ): KeyframeTrack[] ; 

};


// Concrete Strategies:
export class CircleStrategy implements KeyframeStrategy {

    execute( config: CamAnimConfig ) {

        const times: number[] = [], posValues: number[] = [], rotValues: number[] = [];

        const { iPos, iRot, fRot, rotAxis, easingFn, smoothness: n } = config;

        /**
         * These 4 pieces below are specific to the CircleStrategy implementation. All other strategies will have:
         * 1. similar variable declarations
         * 2. similar config destructuring
         * 3. similar loop producing times and values
         * 4. same returned object.
         */
        const tMag = Math.PI / 2
        const circleCenter = computeModelPosition( iPos, iRot, rotAxis );
        const radius = iPos.distanceTo( circleCenter );


        function createPos( easedT: number ): Vector3 {
      
            const initialAngle = Math.PI / 2; // angle with respect to positive-x rotAxis

            let currentAngle = initialAngle + ( easedT * tMag );
        
            return new Vector3(
                circleCenter.x + ( radius * Math.cos(currentAngle) ),
                iPos.y,
                circleCenter.z + ( radius * Math.sin(currentAngle) )
            );
        
        };


        function createRot( easedT: number ): number {

            let rot = 0;

            if ( rotAxis === 'x' ) rot = iRot.x + ( fRot.x - iRot.x ) * easedT;
            else if ( rotAxis === 'y' ) rot = iRot.y + ( fRot.y - iRot.y ) * easedT;
            else if ( rotAxis === 'z' ) rot = iRot.z + ( fRot.z - iRot.z ) * easedT;

            return rot;

        };


        for ( let i = 0; i < n; i++ ) {

            const t = i / ( n - 1 );

            times[ i ] = t;

            const easedT = easingFn( t );
        
            /** Create Position Values */
            const pos = createPos( easedT );
            posValues[ i * 3 ] = pos.x;
            posValues[ i * 3 + 1 ] = pos.y;
            posValues[ i * 3 + 2 ] = pos.z;
        
            /** Create Rotation Values */
            rotValues[ i ] = createRot( easedT )
            
        };


        const posTrack = new VectorKeyframeTrack( '.position', times, posValues as number[] );

		const rotTrack = new NumberKeyframeTrack( '.rotation[' + config.rotAxis + ']', times, rotValues as number[] );

        return [ posTrack, rotTrack ];
    };

};

export class TRStrategy implements KeyframeStrategy {

    execute( config: CamAnimConfig ) {

        let times: number[] = [];

        let posValues: number[] = [];
        
        let rotValues: number[] = [];

        const { iPos, fPos, iRot, fRot, rotAxis, easingFn, smoothness: n } = config;


        function createPos( easedT: number ): Vector3 {

            const x = iPos.x + ( fPos.x - iPos.x ) * easedT;
            const y = iPos.y + ( fPos.y - iPos.y ) * easedT;
            const z = iPos.z + ( fPos.z - iPos.z ) * easedT;

            return new Vector3( x, y, z );

        };


        function createRot( easedT: number ): number {

            let rot = 0;

            if ( rotAxis === 'x' ) rot = iRot.x + ( fRot.x - iRot.x ) * easedT;
            else if ( rotAxis === 'y' ) rot = iRot.y + ( fRot.y - iRot.y ) * easedT;
            else if ( rotAxis === 'z' ) rot = iRot.z + ( fRot.z - iRot.z ) * easedT;

            return rot;
        }


        for ( let i = 0; i < n; i++ ) {

            const t = i / ( n - 1 );

            times[ i ] = t;

            const easedT = easingFn( t );
        
            /** Create Position Values */
            const pos = createPos( easedT );
            posValues[ i * 3 ] = pos.x;
            posValues[ i * 3 + 1 ] = pos.y;
            posValues[ i * 3 + 2 ] = pos.z;
        
            /** Create Rotation Values */            
            rotValues[ i ] = createRot( easedT )
            
        };

        const posTrack = new VectorKeyframeTrack( '.position', times, posValues as number[] );

		const rotTrack = new NumberKeyframeTrack( '.rotation[' + config.rotAxis + ']', times, rotValues as number[] );

        return [ posTrack, rotTrack ];
        
    };

};


export class SuspendStrategy implements KeyframeStrategy {

    execute( config: any ) {

		let times: number[] = [];
        let posValues: number[] = [];
        let rotValues: number[] = [];

        const n = 100;

        const { iPos, iRot } = config;

        const fRot = new Euler( 0, Math.PI * 2, 0)


        function createPos( t: number ): Vector3 {

			const x = ( Math.sin( t / 4 ) ) / 30

			const y = ( 0.5 + Math.sin( t / 2 ) ) / 12

			const z = iPos.z

            return new Vector3( x, y, z );

        };


		function createRot( t: number ): Vector3 {

			const x = ( Math.sin( t / 7 ) )

			const y = iRot.y + ( ( fRot.y - iRot.y ) * t )

			const z = iRot.z

            return new Vector3( x, y, z );

        };



        for( let i = 0; i < n; i++ ) {
	
			const t = i / ( n - 1 ); // normalizes t from 0 - 1

            times[ i ] = t;

			/** Create Position Values */
			const pos = createPos( t );

			posValues[ i * 3 ] = pos.x;
            posValues[ i * 3 + 1 ] = pos.y;
            posValues[ i * 3 + 2 ] = pos.z;

	        /** Create Rotation Values */
			const rot = createRot( t );

			rotValues[ i * 3 ] = rot.x;
            rotValues[ i * 3 + 1 ] = rot.y;
            rotValues[ i * 3 + 2 ] = rot.z;
	
		};

        const posTrack = new VectorKeyframeTrack( ".position", times, posValues as number[], InterpolateSmooth )

		const rotTrack = new VectorKeyframeTrack( ".rotation", times, rotValues as number[], InterpolateSmooth )

        return [ posTrack, rotTrack ]
        
    };

};


export class SimpleScaleStrategy implements KeyframeStrategy {

    execute( config: any ) {

		let times: number[] = [];
        let scaleValues: number[] = [];
        const n = 100;


        const { initial, final } = config;


        function createScale( t: number ): Vector3 {

            // y is arbitrary. could be x or z. just need same for all 3.
			const y = initial.y + ( ( final.y - initial.y ) * t )

            return new Vector3( y, y, y );

        };


        for( let i = 0; i < n; i++ ) {
	
			const t = i / ( n - 1 ); // normalizes t from 0 - 1

            times[ i ] = t;

			/** Create Scale Values */
			const scale = createScale( t );

			scaleValues[ i * 3 ] = scale.x;
            scaleValues[ i * 3 + 1 ] = scale.y;
            scaleValues[ i * 3 + 2 ] = scale.z;

		};

        const scaleTrack = new VectorKeyframeTrack( ".scale", times, scaleValues as number[], InterpolateSmooth )

        return [ scaleTrack ]
        
    };

};


export class SimpleRotateStrategy implements KeyframeStrategy {

    execute( config: any ) {

		let times: number[] = [];

        let rotValues: number[] = [];

        const n = 100;

        const rotAxis = "y";

        const { initial, final } = config;


        function createRot( t: number ): Vector3 {

			const y = initial.y + ( ( final.y - initial.y ) * t )

            return new Vector3( initial.x, y, initial.z );

        };


        for( let i = 0; i < n; i++ ) {
	
			const t = i / ( n - 1 ); // normalizes t from 0 - 1

            times[ i ] = t;

			/** Create Scale Values */
			const rot = createRot( t );

			rotValues[ i * 3 ] = rot.x;
            rotValues[ i * 3 + 1 ] = rot.y;
            rotValues[ i * 3 + 2 ] = rot.z;

		};

        const rotTrack = new VectorKeyframeTrack( ".rotation['y']", times, rotValues as number[], InterpolateSmooth )

        return [ rotTrack ]
        
    };

};








////////////////////////
/// Strategy Context ///
////////////////////////

export class KeyframeCreator {

    strategy: KeyframeStrategy | undefined;

    setStrategy( strategy: KeyframeStrategy ) {

        this.strategy = strategy

    };

    resetStrategy() {
        this.strategy = undefined;
    }

    create( config: any ): KeyframeTrack[] {

        if ( this.strategy ) {

            return this.strategy.execute( config );

        } 
        
        else {

            throw new Error('No strategy set!');

        };
        
    };

};



/*


ClipCreator.createClip( config );

^^ This one line could then work for all animations, model and camera. 
When we get a new animation, we simply have to create a new keyframe strategy and config for it.
The keyframe strategies all follow a common pattern now:

    -- createStep in some property i.e. createPos
    -- for-loop to create times and values 
    -- use the times and values to create keyframe tracks
    -- the keyframe tracks to create animation clips

*/


/////////////////
// Helper Fn's //
/////////////////


function createRotationThatDoesntChange( iRot: Vector3 ): number[]  {

    const rotValues = [];
    rotValues[0] = iRot.y;
    rotValues[1] = iRot.y;

    return rotValues;
};