import { AnimationClip, Mesh, Vector3 } from 'three';
import { 
    CameraPositionToModelPosition, 
    CreateCameraAnimationDataFromPositionsRotations,
    ConstructCameraAnimationClips, 
    // LoadAllVoicesOfApp, 
    // ExtractAllMeshesOfApp
} from '../_components/Init/Helpers';

import Vec3ToArr from '../_components/Vec3ToArr';
import data from '../data';
// import { Init } from '../_components/Init';
// import SuspendInSolution from '../_components/animations/SuspendInSolution';
// import ScaleXYZ from '../_components/animations/ScaleXYZ';
// import Rotate from '../_components/animations/Rotate';
// import { useDispatch } from 'react-redux';
// import TranslateRotate from '../_components/animations/TranslateRotate';


// .toEqual used for objects and arrays -- does a deep check, .toBe used for primitive types
// onLoad 
/*
Camera Load:
- _animation_data -- WRITTEN -- CreateAnimationDataFromPositionsRotations()
- _animation_clips -- WRITTEN -- ConstructCameraAnimationClips()
Model Load:
- _positions -- WRITTEN -- CameraPositionToModelPosition()

- loadedMeshes -- WRITTEN -- ExtractAllMeshesOfApp()
- _loaded_voices -- WRITTEN -- ExtractAllVoicesOfApp()
*/

/*
Whats left to test?                        
    - cameraPositions
*/


describe( 'Vec3ToArr', () => {
    test('Should convert Vec3 to array', () => {
        expect( Vec3ToArr( new Vector3( 1.00, 2.00, 3.00 ) ) ).toEqual( [ 1.00, 2.00, 3.00 ] );
        expect( Vec3ToArr( new Vector3( 12.0, 12.0, 33.0 ) ) ).toEqual( [ 12.0, 12.0, 33.0 ] );
        expect( Vec3ToArr( new Vector3( 0.10, 0.02, 30.0 ) ) ).toEqual( [ 0.10, 0.02, 30.0 ] );
        expect( Vec3ToArr( new Vector3(-6.00,-3.00,-3.00 ) ) ).toEqual( [-6.00,-3.00,-3.00 ] );
    });
});




describe( 'CameraPositionToModelPosition', () => {
    const positions = [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ];
    const rotations = [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ];
    const modelPositions = [ [ 0.00, 0.00, -1.00 ], [ 0.75, 0.71, 0.00 ], [ 0.75, 0.00, -3.00 ], [ 0.00, -0.675, -1.00 ], [ 0.00, -0.10, -3.00 ] ];
    
    test( 'Grabs the camera positions, and based on rotation, calculates model positions', () => {
        for( let i = 0; i < positions.length; i++ ) {
            expect( CameraPositionToModelPosition( positions[ i + 1 ], rotations[ i + 1 ], "x" ) ).toEqual( modelPositions[ i ] );
        }
    });
});




















describe( 'CreateCameraAnimationDataFromPositionsRotations() + ConstructCameraAnimationClips()', () => {
    const positions = [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ];
    const rotations = [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ];
    const animationData = [
        //  initial position      final poisition        initial rotation       final rotation
        [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
        [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
        [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
        [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
        [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
    ], animationClips = ConstructCameraAnimationClips( animationData );

    it( "Should convert positions and rotations to animationData DS", () => {
        expect( CreateCameraAnimationDataFromPositionsRotations( positions, rotations ) ).toEqual( animationData );
    });

    it( "Should construct ALL camera animation clips", () => {
        expect( animationClips.length ).toBe( positions.length - 1 );
    });

    it( "Should be an array of only AnimationClip objects", () => {
        for( const item of animationClips ) {
            expect( item ).toBeInstanceOf( AnimationClip )
        };
    });
});

// describe( "LoadAllVoicesOfApp()", async() => {

//     const AllVoicesOfApp = await LoadAllVoicesOfApp( data );

//     it( "Should contain as many elements as pages", () => {
//         expect( AllVoicesOfApp.length ).toBe( data.pages.length );
//     });

//     it( "Should be an array of arrays with only Audio objects inside", () => {
//         for( const pageVoices of AllVoicesOfApp ) {
//             for ( const voice of pageVoices ) expect( voice ).toBeInstanceOf( Audio );
//         };
//     });

// });

// describe( "ExtractAllMeshesOfApp()", async() => {
//     const AllMeshesOfApp = await ExtractAllMeshesOfApp( data );

//     it( "Should return an array of all Meshes of the app", () => {
//         expect( AllMeshesOfApp.length ).toBe( data.pages.length );
//     });

//     it( "Should be an array of arrays of only Mesh arrays inside", () => {
//         for( const pageMeshes of AllMeshesOfApp ) {
//             for( const modelMeshes of pageMeshes ) {
//                 for( const mesh of modelMeshes ) { 
//                     expect( mesh ).toBeInstanceOf( Mesh )
//                 };
//             };
//         };
//     });
// });

/*
describe( 'Init', () => {
    const AnimationData = [
        //  initial position      final poisition        initial rotation       final rotation
        [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
        [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
        [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
        [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
        [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
    ];
    const hardCodedLoadedData = [
        {
            id: 'test_page',
            page_title: 'Fullerenes',
            section: 0,
            max_section: 6,
            thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
    
            universe: {
                id: 'fullerene universe',
                size: 25000,
                radius: 5,
                models: [],
            },
    
            camera: {
                //                     0                   1                      2                     3                    4                     5                  
                positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ],
                rotations: [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
                
                // build programatically by Init() with this.CreateAnimationDataFromPositionsRotations(), remove from original data structure and just keep here. 
                animation_data: [
                    //  initial position      final poisition        initial rotation       final rotation
                    [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
                    [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
                    [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
                    [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
                    [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
                ],
                //                  0     1     2     3     4 
                animation_clips: [ null, null, null, null, null ],
                CreateAnimationDataFromPositionsRotations: function() {
                    const animation_data = [];
                    for( let i = 0; i < this.positions.length - 1; i++ ) {
                        const initial_position: number[] = this.positions[ i ];
                        const final_position: number[] = this.positions[ i + 1 ];
                        const initial_rotation: number[] = this.rotations[ i ];
                        const final_rotation: number[] = this.rotations[ i + 1 ];
                        animation_data.push( [ initial_position, final_position, initial_rotation, final_rotation ] );
                    };
                    return animation_data;
                },


                _animation_data: [
                    //  initial position      final poisition        initial rotation       final rotation
                    [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
                    [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
                    [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
                    [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
                    [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
                ],

                _animation_clips: [
                    TranslateRotate( { duration: 3, initial_position: AnimationData[ 0 ][ 0 ], final_position: AnimationData[ 0 ][ 1 ], initial_angle: AnimationData[ 0 ][ 2 ], final_angle: AnimationData[ 0 ][ 3 ],axis: 'x', }),
                    TranslateRotate( { duration: 3, initial_position: AnimationData[ 1 ][ 0 ], final_position: AnimationData[ 1 ][ 1 ], initial_angle: AnimationData[ 1 ][ 2 ], final_angle: AnimationData[ 1 ][ 3 ],axis: 'x', }),
                    TranslateRotate( { duration: 3, initial_position: AnimationData[ 2 ][ 0 ], final_position: AnimationData[ 2 ][ 1 ], initial_angle: AnimationData[ 2 ][ 2 ], final_angle: AnimationData[ 2 ][ 3 ],axis: 'x', }),
                    TranslateRotate( { duration: 3, initial_position: AnimationData[ 3 ][ 0 ], final_position: AnimationData[ 3 ][ 1 ], initial_angle: AnimationData[ 3 ][ 2 ], final_angle: AnimationData[ 3 ][ 3 ],axis: 'x', }),
                    TranslateRotate( { duration: 3, initial_position: AnimationData[ 4 ][ 0 ], final_position: AnimationData[ 4 ][ 1 ], initial_angle: AnimationData[ 4 ][ 2 ], final_angle: AnimationData[ 4 ][ 3 ],axis: 'x', }),
                ]
            },
    
            models: [
                {
                    id: '0',
                    name: 'model0',
                    path: '/Fullerenes/models/instance0.glb',
                    visible: true,
                    scale: 0.18,
                    positions: [ [ 0.00, 0.00, -1.00 ] ], // this is calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00,  0.00 ] ],
                    animation_clips: [ 
                        SuspendInSolution( 90 ), 
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } ) 
                    ],

                    _positions: [ [ 0.00, 0.00, -1.00 ] ],
                    loadedMeshes: [ [] ]
                },
                {
                    id: '1',
                    name: 'model1',
                    path: '/Fullerenes/models/instance2.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.75, 0.71, 0.00 ] ], // this is calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00, 0.00 ] ],
                    animation_clips: [ 
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ), 
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } )
                    ],

                    _positions: [ [ 0.75, 0.71, 0.00 ] ],
                    loadedMeshes: [ [] ]
                },
                {
                    id: '2',
                    name: 'model2',
                    path: '/Fullerenes/models/instance2.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.75, 0.00, -3.00 ] ], // this is calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00,  0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } )
                    ],

                    _positions: [ [ 0.75, 0.00, -3.00 ] ],
                    loadedMeshes: [ [] ]
                },
                {
                    id: '3',
                    name: 'model3',
                    path: '/Fullerenes/models/___instance3.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.00, -0.675, -1.00 ] ], // this is calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00,  0.000 , 0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } ),
                        Rotate( { duration: 1500, axis: 'x', initial_angle: 0, final_angle: 360 } ),
                    ],

                    _positions: [ [ 0.00, -0.675, -1.00 ] ],
                    loadedMeshes: [ [] ]
                },
                {
                    id: '4',
                    name: 'model4',
                    path: '/Fullerenes/models/___instance4.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.00, -0.10, -3.00 ] ], // this is calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00,  0.00,  0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.10, 0.10, 0.10 ], final_scale: [ 0.00, 0.00, 0.00 ] } ),
                        ScaleXYZ( { duration: 3, initial_scale: [ 0.01, 0.01, 0.01 ], final_scale: [ 0.075, 0.075, 0.075 ] } )
                    ],

                    _positions: [ [ 0.00, -0.10, -3.00 ] ],
                    loadedMeshes: [ [] ]
                }
                
            ],
    
            text: [
                '',
                'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...',
                'The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed Buckyball.',
                'Each molecule of Fullerene is composed of pure carbon. The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.',
                'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known. These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems. Scientists have even turned their attention to buckyballs in their quest for a cure for AIDS.',
                'How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a nonpolar pocket in its three-dimensional structure. On the model to the right, notice how the nonpolar Fullerene fits the exact diameter of the enzyme\'s binding pocket. If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.',
            ],
    
            textType: [
                'centered',
                'centered',
                'left',
                'left',
                'left',
                'left'
            ],
    
            music: [
                "/music/fullerene2.mp3"
            ],
    
            voices: [
                "/music/fullerene2.mp3", // 0
                "/music/fullerene2.mp3", // 1
                "/music/fullerene2.mp3", // 2
                "/music/fullerene2.mp3", // 3
                "/music/fullerene2.mp3", // 4
            ],
            //                0     1     2     3     4
            loaded_voices: [ null, null, null, null, null ],    
            dispatch: useDispatch,


            _loaded_voices: [  ],
        }
    ]

    
    test('Should load data and update data object', async () => {
        const testData = await Init( data );
        expect( testData ).toEqual( hardCodedLoadedData );
    });
});
*/







