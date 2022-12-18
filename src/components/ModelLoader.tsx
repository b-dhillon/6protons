// @ts-nocheck
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';




const scene = {
    id: 'test_page',
    title: 'Fullerenes',
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

    models: [
        {
            id: 'model0',
            path: '/lesson4_models/model1.glb',
            positions: [
                { x: 0, y: 0, z: -1 }
            ],
            mesh: {},
            nodes: {}, 
            materials: {},
            visible: true,
            methods: {
                animations: {
                    rotate: function(ref: { current: { rotation: { y: number; }; }; }, delta: number) {
                        ref.current.rotation.y += delta;
                    },
                },
            }

        },
        {
            id: 'model1',
            path: '/lesson3_models/model0.glb',
            mesh: {}, 
            positions: [
                { x: 0, y: 0, z: -1 }
            ],
            visible: false,
            methods: {
                animations: [
                    function rotate(ref: { current: { rotation: { y: number; }; }; }, delta: number) {
                        ref.current.rotation.y -= delta;
                    },
                ],
            }
        }
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
    },
};


// Getting all the gltfs into an array:
const gltfs = [];

function LoadGLTFS() {
    for (let i = 0; i < scene.models.length; i++) {
        LoadGLTF(i);
    }
}

function LoadGLTF(i) {

    gltfs[i] = useLoader(GLTFLoader, scene.models[i].path, (loader: any) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);
    });


}

function ExtractMeshes() {
    for (let i = 0; i < scene.models.length; i++) {
        scene.models[i].mesh = gltfs[i].scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined );
        console.log(scene);
    }
}

export default function ExtractMeshesTo() {
    LoadGLTFS();
    ExtractMeshes();
}