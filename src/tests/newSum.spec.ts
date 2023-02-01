import { Vector3 } from 'three';
import Vec3ToArr from '../_components/Vec3ToArr';
import Init from '../App';
import data from '../data';
import CreateAnimationDataFromPositionsRotations from '../_components/CreateAnimationDataFromPositionsRotations';
import CameraPositionToModelPosition from '../_components/CameraPositionToModelPosition';
import setPages from '../App';


// .toEqual used for objects and arrays -- does a deep check.
// .toBe used for primitive types

/*
Load: 
    - Functions to test 
        - Init 
        - CreateAnimationDataFromPositionsRotations
        - CameraPositionToModelPosition

    - LoadedData 
    - cameraPositions
    - modelPositions
*/

describe( 'Vec3ToArr', () => {
    test('Should convert Vec3 to array', () => {
        expect( Vec3ToArr( new Vector3( 1.00, 2.00, 3.00 ) ) ).toEqual( [ 1.00, 2.00, 3.00 ] );
        expect( Vec3ToArr( new Vector3( 12.0, 12.0, 33.0 ) ) ).toEqual( [ 12.0, 12.0, 33.0 ] );
        expect( Vec3ToArr( new Vector3( 0.10, 0.02, 30.0 ) ) ).toEqual( [ 0.10, 0.02, 30.0 ] );
        expect( Vec3ToArr( new Vector3(-6.00,-3.00,-3.00 ) ) ).toEqual( [-6.00,-3.00,-3.00 ] );
    });
});

describe( 'Init', () => {
    const loadedData = {};
    test('Should load data and update data object', () => {
        expect( Init( data ) ).toEqual( loadedData );
    });
});


describe( 'CreateAnimationDataFromPositionsRotations', () => {
    const positions = [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ];
    const rotations = [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ];
    const animationData = [
        //  initial position      final poisition        initial rotation       final rotation
        [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
        [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
        [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
        [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
        [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
    ];
    test( 'Should convert positions and rotations to animationData DS', () => {
        expect( CreateAnimationDataFromPositionsRotations( positions, rotations ) ).toEqual( animationData );
    });
});

describe( 'CameraPositionToModelPosition', () => {
    const cameraPosition = [ 0.00, 0.00, 0.00 ];
    const modelPosition = [ 0.00, 0.00, 0.00 ];
    test( 'Grabs the camera positions, and based on rotation, calculates model positions', () => {
        expect( CameraPositionToModelPosition( cameraPosition ) ).toEqual( modelPosition );
    });
});




