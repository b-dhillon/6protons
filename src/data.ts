import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack, InterpolateSmooth, AdditiveAnimationBlendMode, InterpolateLinear, BooleanKeyframeTrack } from 'three';


// Convert the data of Vector3 to flatten array
function flattenVector3( data: any[] ) {
    const result = [];
    for ( const item of data ) {
        result.push( [item.x, item.y, item.z] );
    }
    return result;
}

const positionsData = [
    { x: 0, y: 0, z: 0 },
    { x: 0.5, y: 0, z: 1 },
    { x: 1, y: 0, z: 1.5 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
];

flattenVector3( positionsData ); 
// Output: [ [ 0, 0, 0 ], [ 0.5, 0, 1 ], [ 1, 0, 1.5 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]


const rotations = [
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0.5, _y: 0, _z: 0 },
    { _x: 1, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
    { _x: 0, _y: 0, _z: 0 },
]

flattenVector3( rotations ); 
// Output: [ [ 0, 0, 0 ], [ 0.5, 0, 0 ], [ 1, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]




const data = [
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
            //                  0                   1                   2                   3                   4                   5              6       
            positions: [ [ 0.0, 0.0, 3.0 ], [ 0.0, 0.0, 0.0 ], [ 0.5, 0.0, 1.0 ], [ 1.0, 0.0, 1.5 ], [ 0.0, 0.0, 0.0 ], [ 0.0, 0.0, 0.0 ], [ 0.0, 0.0, 0.0 ] ],
            rotations: [ [ 0.0, 0.0, 0.0 ], [ 0.5, 0.0, 0.0 ], [ 1.0, 0.0, 0.0 ], [ 0.0, 0.0, 0.0 ], [ 0.0, 0.0, 0.0 ], [ 0.0, 0.0, 0.0 ] ],
            // animations: [
            //     [ TranslateRotateCamera( 3, [ 0, 0, 3 ], [ 0, 0, 0 ], 'x', 0, 0 ) ],
            //     [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ], 'x', 0, 0.66 ) ],
            //     [ TranslateRotateCamera( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ], 'x', 0.66, 0 ) ],
            //     [ TranslateRotateCamera( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ], 'x', 0, -0.66 ) ],
            //     [ TranslateRotateCamera( 3, [ 0, 0, 0 ], [ 0, 0, -2 ], 'x', -0.66, 0 ) ],
            // ],
            animation_data: [
                //  initial position      final poisition        initial rotation       final rotation
                [ [ 0.00, 0.00, 3.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
                [ [ 0.00, 0.00, 0.00 ], [ 0.75, 0.00, 1.00 ],  [ 0.00, 0.00, 0.00 ], [ 0.66, 0.00, 0.00 ] ],
                [ [ 0.75, 0.00, 1.00 ], [ 0.75, 0.00,-2.00 ],  [ 0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
                [ [ 0.75, 0.00,-2.00 ], [ 0.00, 0.00, 0.00 ],  [ 0.00, 0.00, 0.00 ], [-0.66, 0.00, 0.00 ] ],
                [ [ 0.00, 0.00, 0.00 ], [ 0.00, 0.00,-2.00 ],  [-0.66, 0.00, 0.00 ], [ 0.00, 0.00, 0.00 ] ],
            ],

            animation_clips: null,


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
                /*
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
                */
                
                const trackName_Rotation = '.rotation[' + axis + ']';
                const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );
            
                return new AnimationClip( 'TranslateRotateCamera', duration, [ track_Position, track_Rotation  ] );
            },
        },

        models: [
            {
                id: '0',
                name: 'model0',
                path: '/Fullerenes/models/instance0.glb',
                meshes: null,
                visible: true,
                scale: 0.18,
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [ 
                    Levitate( 0 ), 
                    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] ) 
                ],
            },
            {
                id: '1',
                name: 'model1',
                path: '/Fullerenes/models/instance2.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0.71, z: 0 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotate( 5000, 'y', 0, 360 ),
                    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )
                ]
            },
            {
                id: '2',
                name: 'model2',
                path: '/Fullerenes/models/instance2.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0.75, y: 0, z: -3 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotate( 5000, 'y', 0, 360 ),
                    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] )
                ]
            },
            {
                id: '3',
                name: 'model3',
                path: '/Fullerenes/models/___instance3.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.675, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotate( 5000, 'y', 0, 360 ),
                    Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] ),
                    Rotate( 2500, 'x', 0, 360 ),
                ]
            },
            {
                id: '4',
                name: 'model4',
                path: '/Fullerenes/models/___instance4.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.1, z: -3 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotate( 4000, 'y', 0, 360 ),
                    Scale( 1, [ 0.1, 0.1, 0.1 ], [ 0, 0, 0 ] ),
                    Scale( 3, [ 0.01, 0.01, 0.01 ], [ 0.075, 0.075, 0.075 ] ),
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

        speach: null,
        music: null
    },
    // {
    //     id: 'nanotube',
    //     title: 'Nanotubes',
    //     thumbnail: "url('./lesson_thumbnails/nanotube.png')",
    //     speach: null,
    //     text: null,
    //     models: [
    //         {
    //             id: "model0", 
    //             path: '/lesson3_models/model0.glb', 
    //             meshes: null
    //         }
    //     ],
    // },

    // {
    //     id: 'diamond',
    //     title: 'Diamonds',
    //     thumbnail: "url('./lesson_thumbnails/diamond.png')",
    //     speach: null,
    //     text: null,
    //     models: [
    //         {
    //             id: "model0", 
    //             path: '/lesson3_models/model0.glb', 
    //             meshes: null
    //         }
    //     ],
    // },

    // {
    //     id: 'graphenes',
    //     title: 'Graphenes',
    //     thumbnail: "url('./lesson_thumbnails/graphene.png')",
    //     speach: null,
    //     text: null,
    //     models: [
    //         {
    //             id: "model0", 
    //             path: '/lesson3_models/model0.glb', 
    //             meshes: null
    //         }
    //     ],
    // },

    // {
    //     id: 'chirality',
    //     title: 'Chirality',
    //     thumbnail: "url('./lesson_thumbnails/chirality.png')",
    //     speach: null,
    //     text: null,
    //     models: [
    //         {
    //             id: "model0", 
    //             path: '/lesson3_models/model0.glb', 
    //             meshes: null
    //         }
    //     ],
    // }
];

// Will need to turn this into a loop to loop over all of camera positions and camera rotations array creating a new animation for each index.
// Might have to comnine positions and rotations into a single list of lists to make this work with a .map() call.
data[0].camera.TranslateRotate_x(3, data[0].camera.positions[0], data[0].camera.positions[1], 'y', data[0].camera.rotations[0], data[0].camera.rotations[1] );




// Just need to figure out how to stop the animation from jumping rotation. It's jumping because the first value is 0;
function Levitate( positionY: number ) {
    const duration = 90;

    const trackNamePositionX = '.position[x]';
    let timesPositionX: number[] = [];
    let valuesPositionX: number[] = [];
    for( let i = 0; i < duration; i++ ) {
        timesPositionX.push( i );
        valuesPositionX.push( ( Math.sin(i / 4) ) / 30 );
                                        //  ^velocity ^amplitude
    };
    const trackPositionX = new NumberKeyframeTrack( trackNamePositionX, timesPositionX, valuesPositionX, InterpolateSmooth );


    const trackNamePositionY = '.position[y]';
    let timesPositionY: number[] = [];
    let valuesPositionY: number[] = [];
    for( let i = 0; i < duration; i++ ) {
        timesPositionY.push( i );
        valuesPositionY.push( ( 0.5 + Math.sin(i / 2 ) ) / 12 );
        //                                 ^velocity ^amplitude
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

function TranslateRotateCamera( duration: number, initial_position: number[], final_position: number[], axis = 'x', initial_angle: number, final_angle: number ) {

    const times_Position = [ 0, duration ];
    const values_Position = [ ...initial_position, ...final_position ];
    const trackName_Position = '.position';
    const track_Position = new VectorKeyframeTrack( trackName_Position, times_Position, values_Position, InterpolateLinear );

    const times_Rotation = [ 0, duration ];
    const values_Rotation = [ initial_angle, final_angle ];
    const trackName_Rotation = '.rotation[' + axis + ']';
    const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );

    return new AnimationClip( 'TranslateRotateCamera', duration, [ track_Position, track_Rotation  ] );
};

function Rotate( duration: number, axis = 'x', initial_angle: number, final_angle: number ) {
    const times = [ 0, duration ], values = [ initial_angle, final_angle ];
    const trackName = '.rotation[' + axis + ']';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, duration, [ track ] );
};

function TranslateZ( duration: number, initial_position: number, final_position: number ) {
    const [ times, values ] = calulateAllTimesAndAllValues( duration, initial_position, final_position );
    const trackName = '.position[z]';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, duration, [ track ] );
};


function Translate( duration: number, initial_position: number[], final_position: number[] ) {
    const times = [ 0, duration ], values = [ ...initial_position, ...final_position ];
    const trackName = '.position';
    const track = new VectorKeyframeTrack( trackName, times, values, InterpolateLinear );
    return new AnimationClip( trackName, duration, [ track ] );
};

function Scale( duration: number, initial_scale: number[], final_scale: number[] ) {
    const times = [ 0, duration ], values = [ ...initial_scale, ...final_scale ];
    const trackName = '.scale';
    const track = new VectorKeyframeTrack( trackName, times, values, InterpolateLinear );
    return new AnimationClip( trackName, duration, [ track ] );
};

function Oscilate( duration: number, initial_position: number[], final_position: number[] ) {
    const times = [ 0, duration / 2, duration ], values = [ ...initial_position, ...final_position, ...initial_position ];
    const trackName = '.position';
    const track = new VectorKeyframeTrack( trackName, times, values, InterpolateLinear );
    return new AnimationClip( trackName, duration, [ track ] );
};

function myLerp( o: number, n: number, s: number ) {
    const r = (1 - s) * o + s * n;
    return Math.abs(o - n) < 0.005 ? n : r;
};

function VisibilityAnimation( duration: number ) {
    const times = [ 0, duration / 2, duration ], values = [ true, false, true ];

    const trackName = '.visible';

    const track = new BooleanKeyframeTrack( trackName, times, values );

    return new AnimationClip( trackName, duration, [ track ] );

}

function calulateAllTimesAndAllValues( _duration: number, _initial: number, _final: number ) {
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

export default data; 


/*
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

// const initialPosition = oldPage.camera.animation_data[ i ][ 0 ];
// const nextPosition = oldPage.camera.animation_data[ i + 1 ][ 0 ];

// const initialRotation = oldPage.camera.animation_data[ i ][ 1 ];
// const nextRotation = oldPage.camera.animation_data[ i + 1 ][ 1 ];

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

animations: [
    [ Translate( 3, [ 0, 0, 3 ], [ 0, 0, 0 ] ),  Rotate( 0, 'x', 0, 0) ],
    [ Translate( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ] ), Rotate( 3, 'x', 0, 0.66 ) ], 
    [ Translate( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'x', 0.66, 0 ) ], // favorite animation, rotates down and translates z
    [ Translate( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ] ), Rotate( 3, 'x', 0, -0.66 ) ], 
    [ Translate( 3, [ 0, 0, 0 ], [ 0, 0, -2 ] ), Rotate( 3, 'x', -0.66, 0 ) ],
    // [ Translate( 0, [ 0.75, 0, -2 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'y', 0, 1.5 ) ], 
],

positions: [
                { x: 0, y: 0, z: 0 },
                { x: 0.5, y: 0, z: 1 },
                { x: 1, y: 0, z: 1.5 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
            ],
*/
