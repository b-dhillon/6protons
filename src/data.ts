import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack, InterpolateSmooth, AdditiveAnimationBlendMode, InterpolateLinear, BooleanKeyframeTrack } from 'three';

const data = [
    {
        id: 'test_page',
        title: 'Fullerenes',
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
        section_count: 6,

        universe: {
            radius: 10,
            size: 100
        },

        camera: {
            initialPosition: [ 0, 0, 3 ],
            positions: [
                { x: 0, y: 0, z: 0 },
                { x: 0.5, y: 0, z: 1 },
                { x: 1, y: 0, z: 1.5 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 0, z: 0 },
            ],
            rotations: [
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0.5, _y: 0, _z: 0 },
                { _x: 1, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
                { _x: 0, _y: 0, _z: 0 },
            ],
            animations: [
                [ Translate( 3, [ 0, 0, 3 ], [ 0, 0, 0 ] ),  Rotate( 0, 'x', 0, 0) ],
                [ Translate( 3, [ 0, 0, 0 ], [ 0.75, 0, 1 ] ), Rotate( 3, 'x', 0, 0.66 ) ], 
                [ Translate( 3, [ 0.75, 0, 1 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'x', 0.66, 0 ) ], // favorite animation, rotates down and translates z
                [ Translate( 3, [ 0.75, 0, -2 ], [ 0, 0, 0 ] ), Rotate( 3, 'x', 0, -0.66 ) ], 
                [ Translate( 3, [ 0, 0, 0 ], [ 0, 0, -2 ] ), Rotate( 3, 'x', -0.66, 0 ) ], 

                // [ Translate( 0, [ 0.75, 0, -2 ], [ 0.75, 0, -2 ] ), Rotate( 3, 'y', 0, 1.5 ) ], 
            ],
        },

        models: [
            {
                id: '0',
                name: 'model0',
                modelNumber: 0,
                path: '/lesson1_models/instance0.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [ Rotate( 5000, 'y', 0, 360 ), Scale( 1, [ 0.18, 0.18, 0.18 ], [ 0, 0, 0 ] ) ],
            },
            {
                id: 'model1',
                name: 'model1',
                modelNumber: 1,
                path: '/lesson1_models/instance1.glb',
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
                id: 'model2',
                name: 'model2',
                modelNumber: 2,
                path: '/lesson1_models/instance2.glb',
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
                id: 'model3',
                name: 'model3',
                modelNumber: 3,
                path: '/lesson1_models/instance3.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: -0.675, z: -1 },
                    // { x: -0.75, y: 0, z: -2.15 }
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
                id: 'model4',
                name: 'model4',
                modelNumber: 4,
                path: '/lesson1_models/instance4.glb',
                meshes: null,
                visible: true,
                scale: 0,
                positions: [
                    { x: 0, y: 0, z: -3 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                    Rotate( 5000, 'y', 0, 360 ),
                    Scale( 1, [ 0.1, 0.1, 0.1 ], [ 0, 0, 0 ] )
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

        speach: null,
        music: null
    },
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
];

function Rotate( duration: number, axis = 'x', initial_angle: number, final_angle: number ) {
    const times = [ 0, duration ], values = [ initial_angle, final_angle ];
    const trackName = '.rotation[' + axis + ']';
    const track = new NumberKeyframeTrack( trackName, times, values );
    return new AnimationClip( trackName, duration, [ track ] );
};

// TranslateZ()
/*
Need to check if the track has all the values already computed after the clip is created. 
function TranslateZ( duration: number, initial_position: number, final_position: number ) {
    const [ times, values ] = calulateAllTimesAndAllValues( duration, initial_position, final_position );

    // const times = , values = [ initial_position, final_position ];
    const trackName = '.position[z]';
    const track = new NumberKeyframeTrack( trackName, times, values );
    console.log( track );
    return new AnimationClip( trackName, duration, [ track ] );
};
*/

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

