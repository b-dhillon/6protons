// import FullereneText from '../pages/fullerenes_lesson/FullereneText';

import { Vector3 } from "three"

// can set some properties to null and then update them later as theyre created

const scene_configs = [
    {
        id: 'test_page',
        title: 'Fullerenes',
        univerase_size: '100 metres',
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
        maxSectionCount: 6,
        universe_config: {
            size: 100,
            radius: 10
        },
        camera_config: {
            0: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            1: { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
            2: { position: { x: 1, y: 0, z: 1.5 }, rotation: { x: 1, y: 0, z: 0 } },
            3: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            4: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            5: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        },

        // model is positioned same as camera, but z-1. 
        // how can I link camera position to model position but with z-1?
        models_config: [
            {
                id: 'model0',
                path: '/lesson4_models/model1.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                mesh: null,
                nodes: null, 
                materials: null,
                visible: true,
                methods: {
                    animations: [
                        function rotate(ref, delta) {
                            ref.current.rotation.y += delta;
                        },
                    ],
                }

            },
            {
                id: 'model1',
                path: '/lesson3_models/model0.glb',
                mesh: null, 
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                visible: false,
                methods: {
                    animations: [
                        function rotate(ref, delta) {
                            ref.current.rotation.y -= delta;
                        },
                    ],
                }
            },
            {
                id: 'model2',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                mesh: null, 
                visible: false,
            },
            {
                id: 'model3',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                mesh: null, 
                visible: false,
            },
            {
                id: 'model4',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                mesh: null, 
                visible: false,
            },
            {
                id: 'model5',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                mesh: null, 
                visible: false,
            },
        ],

        text_config: {
            0: '',
            1: 'In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of Helium gas...',
            2: 'The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered. This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed Buckyball.',
            3: 'Each molecule of Fullerene is composed of pure carbon. The carbon atoms arrange themselves as hexagons and pentagons (highlighted in red), like the seams of a soccer ball. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.',
            4: 'For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known. These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems. Scientists have even turned their attention to buckyballs in their quest for a cure for AIDS.',
            5: 'How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a nonpolar pocket in its three-dimensional structure. On the model to the right, notice how the nonpolar Fullerene fits the exact diameter of the enzyme\'s binding pocket. If this pocket is blocked, the production of virus ceases. Because buckyballs are nonpolar, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.',
        },

        speach_config: {
            0: null,
            1: null, 
            2: null,
            3: null,
            4: null,
            5: null,
        },
    },

    {
        id: 'nanotube',
        title: 'Nanotubes',
        thumbnail: "url('./lesson_thumbnails/nanotube.png')",
        text: null,
        audio: null,
        models: null,
    },

    {
        id: 'diamond',
        title: 'Diamonds',
        thumbnail: "url('./lesson_thumbnails/diamond.png')",
        text: null,
        audio: null,
        models: null,
    },

    {
        id: 'graphenes',
        title: 'Graphenes',
        thumbnail: "url('./lesson_thumbnails/graphene.png')",
        text: null,
        audio: null,
        models: null,
    },

    {
        id: 'chirality',
        title: 'Chirality',
        thumbnail: "url('./lesson_thumbnails/chirality.png')",
        text: null,
        audio: null,
        models: null,
    }
]

export default scene_configs;

/* 
import FullereneModels from '../../FullereneModels';

import NanotubeText from '../pages/fullerenes_lesson/FullereneText';
import NanotubeModels from '../../FullereneModels';

import DiamondText from '../pages/fullerenes_lesson/FullereneText';
import DiamondModels from '../../FullereneModels';

import GrapheneText from '../pages/fullerenes_lesson/FullereneText';
import GrapheneModels from '../../FullereneModels';
*/ 

/* 

textArrOfObj: [
    { section: 0, text: FullereneText[0] },
    { section: 1, text: FullereneText.s1 },
    { section: 2, text: FullereneText.s2 },
    { section: 3, text: FullereneText.s3 },
    { section: 4, text: FullereneText.s4 },
    { section: 5, text: FullereneText.s5 },
],

textArr: [
    FullereneText[0],
    FullereneText[1],
    FullereneText[2],
    FullereneText[3],
    FullereneText[4],
    FullereneText[5],
],

textObj: {
    0: FullereneText[0],
    1: FullereneText[1],
    2: FullereneText[2],
    3: FullereneText[3],
    4: FullereneText[4],
    5: FullereneText[5],
},

cameraPositions: {
    p0: [0, 0, 0],
    p1: [0.5, 0, 1]
},

cameraSettings: {
    s0: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s1: { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
    s2: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s3: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s4: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
    s5: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
},
*/ 