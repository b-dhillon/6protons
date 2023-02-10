// Redux:
import { useDispatch } from 'react-redux';

// AnimationClip Constructors: 
import ScaleXYZ from './_components/animations/ScaleXYZ';
import Rotate from './_components/animations/Rotate';
import SuspendInSolution from './_components/animations/SuspendInSolution';
import { AnimationClip } from 'three';
import { AppData } from './types/types';

// To do 
/*
- You have camera AnimationClips being constructed in Init, but Model AnimationClips are created here. You should unify this. 
- Finish creating all the interfaces for all your data structures. 
    - Model DS needs work...Vector3 and Euler3 are no longer needed.
*/

const data: AppData = {
    pages: [
        {
            id: 'test_page',
            page_title: 'Buckminsterfullerene',
            section: 0,
            max_section: 6,
            thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
    
            universe: {
                id: 'fullerene universe',
                star_count: 25000,
                radius: 5,
            },
    
            camera: {
              //                      0                     1                      2                     3                    4                     5                  
             // positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ],
                positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.75, 0.00,-2.00 ], [ 1.00, 2.00, 0.00 ] ],
                rotations: [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.75, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
                // build programatically w-/ Init() + this.CreateAnimationDataFromPositionsRotations()
                animation_data: [
                    //  initial position      final poisition        initial rotation       final rotation
                    [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
                    [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
                    [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
                    [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.75, 0.00 ] ], // 3
                    [ [ 0.00, 0.00, 0.00 ], [ 1.00, 2.00, 0.00 ],  [ 0.00, 0.75, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
                    //         0                      1                     2                       3
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
            },
    
            models: [
                {
                    id: '0',
                    name: 'model0',
                    path: '/Fullerenes/models/instance0.glb',
                    visible: true,
                    scale: 0.18,
                    positions: [ [ 0.00, 0.00, -1.00 ] ], // calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00,  0.00 ] ],
                    animation_clips: [ 
                        SuspendInSolution( 90 ), 
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } ) 
                    ],
                },
                {
                    id: '1',
                    name: 'model1',
                    // path: '',
                    path: '/Fullerenes/models/instance1.glb',
                    visible: false,
                    scale: 0,
                    positions: [ [ 0.75, 0.66, 0.00 ] ], // calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00, 0.00 ] ],
                    animation_clips: [ 
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ), 
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } )
                    ]
                },
                {
                    id: '2',
                    name: 'model2',
                    path: '/Fullerenes/models/instance2.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.75, 0.00, -3.00 ] ], // calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00, 0.00,  0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } )
                    ]
                },
                {
                    id: '3',
                    name: 'model3',
                    path: '/Fullerenes/models/___instance3.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.00, -0.66, -1.00 ] ], // calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00,  0.000 , 0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0.00, 0.00, 0.00 ] } ),
                        Rotate( { duration: 1500, axis: 'x', initial_angle: 0, final_angle: 360 } ),
                    ]
                },
                {
                    id: '4',
                    name: 'model4',
                    path: '/Fullerenes/models/___instance4.glb',
                    visible: true,
                    scale: 0,
                    positions: [ [ 0.00, -0.10, -3.00 ] ], // calculated in Init() based off of camera position at the current section
                    rotations: [ [ 0.00,  0.00,  0.00 ] ],
                    animation_clips: [
                        Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                        ScaleXYZ( { duration: 1, initial_scale: [ 0.10, 0.10, 0.10 ], final_scale: [ 0.00, 0.00, 0.00 ] } ),
                        ScaleXYZ( { duration: 3, initial_scale: [ 0.01, 0.01, 0.01 ], final_scale: [ 0.075, 0.075, 0.075 ] } )
                    ]
                }
                
            ],
    
            text: [
                '',
                'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas.',
                'Firing lazers at graphite rods in a supersonic helium beam, produced novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed Buckyball.',
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
                "/music/fullerene3.mp3"
            ],
    
            voices: [
                "/voices/fiona/voice0.mp3", // 0
                "/voices/fiona/voice0.mp3", // 1
                "/voices/fiona/voice1.mp3", // 2
                "/music/fullerene3.mp3",    // 3
                "/music/fullerene3.mp3",    // 4
            ],
            //                0     1     2     3     4
            loaded_voices: [ null, null, null, null, null ],
    
            dispatch: useDispatch,
        }    
    ]
};































// Old DS
/*
    {
        id: 'test_page',
        page_title: 'Fullerenes',
        section: 0,
        max_section: 6,
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",

        universe: {
            id: 'fullerene universe',
            radius: 5,
            size: 25000,
            models: [],
        },

        camera: {
            //                     0                   1                      2                     3                    4                     5                  
            positions: [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ] ],
            rotations: [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
            
            // this is built programmatically by Init() in App() 
            animation_data: [
                //  initial position      final poisition        initial rotation       final rotation
                [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 0 
                [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ], // 1
                [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 2
                [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ], // 3
                [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ], // 4
            ],

            animation_clips: null,

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

        },

        models: [
            {
                id: '0',
                name: 'model0',
                path: '/Fullerenes/models/instance0.glb',
                // loadedMeshes: null,
                // meshes: null,
                visible: true,
                scale: 0.18,
                // _positions: null,
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animation_clips: [ 
                    SuspendInSolution( 90 ), 
                    ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } )
                ],
            },
            {
                id: '1',
                name: 'model1',
                path: '/Fullerenes/models/instance2.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0.71, z: 0 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animation_clips: [
                    Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                    ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } )
                ]
            },
            {
                id: '2',
                name: 'model2',
                path: '/Fullerenes/models/instance2.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0, z: -3 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animation_clips: [
                    Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                    ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } )
                ]
            },
            {
                id: '3',
                name: 'model3',
                path: '/Fullerenes/models/___instance3.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.675, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animation_clips: [
                    Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                    ScaleXYZ( { duration: 1, initial_scale: [ 0.18, 0.18, 0.18 ], final_scale: [ 0, 0, 0 ] } ),
                    Rotate( { duration: 1500, axis: 'x', initial_angle: 0, final_angle: 360 } ),
                ]
            },
            {
                id: '4',
                name: 'model4',
                path: '/Fullerenes/models/___instance4.glb',
                loadedMeshes: null,
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.1, z: -3 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animation_clips: [
                    Rotate( { duration: 5000, axis: 'y', initial_angle: 0, final_angle: 360 } ),
                    ScaleXYZ( { duration: 1, initial_scale: [ 0.10, 0.10, 0.10 ], final_scale: [ 0, 0, 0 ] } ),
                    ScaleXYZ( { duration: 3, initial_scale: [ 0.01, 0.01, 0.01 ], final_scale: [ 0.075, 0.075, 0.075 ] } )
                ]
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

        loaded_voices: null,

        dispatch: useDispatch,
    },
*/

export default data; 




























// Other pages:
/*
{
    id: 'nanotube',
    title: 'Nanotubes',
    thumbnail: "url('./lesson_thumbnails/nanotube.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'diamond',
    title: 'Diamonds',
    thumbnail: "url('./lesson_thumbnails/diamond.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'graphenes',
    title: 'Graphenes',
    thumbnail: "url('./lesson_thumbnails/graphene.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
},

{
    id: 'chirality',
    title: 'Chirality',
    thumbnail: "url('./lesson_thumbnails/chirality.png')",
    speach: null,
    text: null,
    models: [
        {
            id: "model0", 
            path: '/lesson3_models/model0.glb', 
            meshes: null
        }
    ],
}
*/

// Old TranslateRotate_x
/*
TranslateRotate_x: function ( duration: number, initial_position: number[], final_position: number[], axis: string, initial_angle: number[], final_angle: number[] ) {
    // console.log( 'positions', this.positions );

    const times_Position = [ 0, duration ];
    const values_Position = [ ...initial_position, ...final_position ];
    const trackName_Position = '.position';
    const track_Position = new VectorKeyframeTrack( trackName_Position, times_Position, values_Position, InterpolateLinear );

    const times_Rotation = [ 0, duration ];

    let values_Rotation: number[];
    values_Rotation = [ initial_angle[ 0 ], final_angle[ 0 ] ];

    // Control flow for rotation axis assignment
    
    if( axis === 'x' ) {
        console.log('break before values asignment');
        values_Rotation = [ initial_angle[ 0 ], final_angle[ 0 ] ];
        console.log('break after values asignment, X');
    };
    if( axis === 'y' ) {
        values_Rotation = [ initial_angle[ 1 ], final_angle[ 1 ] ];
        console.log('break after values asignment, Y');
    };
    if( axis === 'z' ) values_Rotation = [ initial_angle[ 2 ], final_angle[ 2 ] ];
    
    
    const trackName_Rotation = '.rotation[' + axis + ']';
    const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );
    return new AnimationClip( 'TranslateRotateCamera', duration, [ track_Position, track_Rotation  ] );
}
/*

// Old animation ds
/*

animations: [
    [ Translate( 3, [ 0, 0, 3 ], [ 0, 0, 0 ] ),  Rotate( 0, 'x', 0, 0) ],
    [ Translate( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ] ), Rotate( 3, 'x', 0, 0.66 ) ], 
    [ Translate( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'x', 0.66, 0 ) ], // favorite animation, rotates down and translates z
    [ Translate( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ] ), Rotate( 3, 'x', 0, -0.66 ) ], 
    [ Translate( 3, [ 0, 0, 0 ], [ 0, 0, -2 ] ), Rotate( 3, 'x', -0.66, 0 ) ],
    // [ Translate( 0, [ 0.75, 0, -2 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'y', 0, 1.5 ) ], 
],

animations: [
    [ TranslateRotateCamera( 3, [ 0, 0, 3 ], [ 0, 0, 0 ], 'x', 0, 0 ) ],
    [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ], 'x', 0, 0.66 ) ],
    [ TranslateRotateCamera( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ], 'x', 0.66, 0 ) ],
    [ TranslateRotateCamera( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ], 'x', 0, -0.66 ) ],
    [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0, 0, -2 ], 'x', -0.66, 0 ) ],
],

positions: [
    { x: 0, y: 0, z: 0 },
    { x: 0.5, y: 0, z: 1 },
    { x: 1, y: 0, z: 1.5 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
],

animation_data: [
    //   position            rotation 
    [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.75, 0.00, 1.00 ], [ 0.66, 0.00, 0.00 ] ],
    [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ],
    [ [ 0.00, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ] ],
],

*/

// Old SuspendInSolution() with useFrame()
/*
function Levitate( ref ) {
    useFrame( (state, delta ) => {
    // const t = state.clock.getElapsedTime();
    const t = state.clock.elapsedTime;
    ref.current.position.y = (0.75 + Math.sin(t / 1.5 )) / 4 // sin up and down 
    ref.current.rotation.y += (delta / 12) // continous rotation
    ref.current.rotation.x = Math.cos( t / 4 ) / 2 // cos wobble 
    })
};

*/

// Unused fns: myLerp() & preCalculateAllTimesAndValues()
/*
function myLerp( o: number, n: number, s: number ) {
    const r = (1 - s) * o + s * n;
    return Math.abs(o - n) < 0.005 ? n : r;
};


function preCalulateAllTimesAndAllValues( _duration: number, _initial: number, _final: number ) {
    const delta = .008
    const allTimes = [], allValues = [];
    const animationTime = _duration;
    const numberSteps = animationTime / delta;
    const initial = _initial;; 
    const final = _final;

    for (let i = 0; i < numberSteps; i++) {
        allTimes.push( i * delta ); // refresh rate. 
        allValues.push( myLerp( initial, final, i / numberSteps ) );
    };

    return [ allTimes, allValues ];
}
*/

// Old AnimationClip constructors
/*
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    Rotate( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    Rotate( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )

    Rotate( 5000, 'y', 0, 360 ),
    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] ),
    Rotate( 2500, 'x', 0, 360 ),
    Rotate( 4000, 'y', 0, 360 ),
    Scale( 1, [ 0.1, 0.1, 0.1 ], [ 0, 0, 0 ] ),
    Scale( 3, [ 0.01, 0.01, 0.01 ], [ 0.075, 0.075, 0.075 ] ),
*/

// Old DS'
/*
const positionsData = [
    { x: 0, y: 0, z: 0 },
    { x: 0.5, y: 0, z: 1 },
    { x: 1, y: 0, z: 1.5 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
];

const rotations = [
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0.5, _y: 0, _z: 0 },
    { _x: 1, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
]
*/