import FullerenesText from '../pages/fullerenes_lesson/FullereneText';
// import FullerenesModels from '../../FullereneModels';

import NanotubeText from '../pages/fullerenes_lesson/FullereneText';
// import NanotubeModels from '../../FullereneModels';

import DiamondText from '../pages/fullerenes_lesson/FullereneText';
// import DiamondModels from '../../FullereneModels';

import GrapheneText from '../pages/fullerenes_lesson/FullereneText';
// import GrapheneModels from '../../FullereneModels';


export default [
    {
        id: 'fullerene',
        title: 'Fullerenes',
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
        sections: 6,
        cameraPositions: {
            p0: [0, 0, 0],
            p1: [0.5, 0, 1]
        },
        cameraSettings: [
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
            { position: { x: 1, y: 0, z: 1.5 }, rotation: { x: 1, y: 0, z: 0 } },
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        ],

        text: FullerenesText,
        audio: null,
        models: null,
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



        // cameraSettings: {
        //     s0: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        //     s1: { position: { x: 0.5, y: 0, z: 1 }, rotation: { x: 0.5, y: 0, z: 0 } },
        //     s2: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        //     s3: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        //     s4: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        //     s5: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
        // },