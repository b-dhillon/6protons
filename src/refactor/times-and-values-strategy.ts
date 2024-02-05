
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

import { Euler, Vector3 } from "three";
import { computeModelPosition } from "../utility-functions/compute-model-position";
import { easeInOutCubic, easeOutCubic } from "../utility-functions/easing-functions";
import { CamAnimConfig } from "./types";


////////////////////////
/// Stategy Pattern  ///
////////////////////////

type TandV = {
    times: number[],
    values: {
      pos?: number[],
      rot?: number[]
      scale?: number[]
    }
};

// abstract strategy:
export interface TimesAndValuesStrategy {

    execute( config: any ): TandV ; 

};


// concrete strategies:
export class CircleStrategy implements TimesAndValuesStrategy {

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


        return { 
            times: times, 
            values: {
                pos: posValues, 
                rot: rotValues
            } 
        };

    };

};

export class TRStrategy implements TimesAndValuesStrategy {

    execute( config: CamAnimConfig ) {

        let times: number[] = [], posValues: number[] = [], rotValues: number[] = [];

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

        return { 
            times: times, 
            values: {
                pos: posValues,
                rot: rotValues
            } 
        };
        
    };

};
/**
 * 
 * ModelStrategy is different from the other two because 
 * it doesn't seem to use loops. 
 * ScaleUp, ScaleDown, SpinY don't use loops to create Times and Values 
 * Suspend however does. And Suspend is just Translate-Rotate effectively, but with a sin approach 
 * 
 */

export class SuspendStrategy implements TimesAndValuesStrategy {

    execute( config: any ) {

		let times: number[] = [];
        let posValues: number[] = [];
        let rotValues: number[] = [];

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


        const n = 100;

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

        return { 
            times: times, 
            values: {
                pos: posValues,
                rot: rotValues
            } 
        };
        
    };

};


export class SimpleScaleStrategy implements TimesAndValuesStrategy {

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

        return { 
            times: times, 
            values: {
                scale: scaleValues,
            } 
        };
        
    };

};


export class SimpleRotateStrategy implements TimesAndValuesStrategy {

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

        return { 
            times: times, 
            values: {
                rot: rotValues,
            } 
        };
        
    };

};








////////////////////////
/// Strategy Context ///
////////////////////////

export class TimesAndValues {

    strategy: TimesAndValuesStrategy | undefined;

    setStrategy( strategy: TimesAndValuesStrategy ) {

        this.strategy = strategy

    };

    create( config: any ): TandV {

        if ( this.strategy ) {

            return this.strategy.execute( config );

        } 
        
        else {

            throw new Error('No strategy set!');

        };
        
    };

};



/////////////////
// Helper Fn's //
/////////////////


function createRotationThatDoesntChange( iRot: Vector3 ): number[]  {

    const rotValues = [];
    rotValues[0] = iRot.y;
    rotValues[1] = iRot.y;

    return rotValues;
};