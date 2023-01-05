import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function App() {


    return <p>Error</p>;
};

const pages = {
    "test_page": {
        id: 'test_page',
        title: 'Fullerenes',
        thumbnail: "url('./lesson_thumbnails/fullereneTile.png')",
        section_count: 6,

        universe: {
            radius: 10,
            size: 100
        },

        camera: {
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
            ],
        },

        models: [
            {
                id: 'model0',
                path: '/lesson3_models/model0.glb',
                positions: [
                    { x: 0, y: 0, z: -1 },
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: [
                ],
                meshes: null,
                nodes: null, 
                materials: null,
                visible: true,
                name: 'model0',
                scale: { x: 1, y: 1, z: 1 },
            },
            {
                id: 'model1',
                path: '/lesson4_models/model1.glb',
                positions: [
                    { x: 0, y: 0, z: -1 }
                ],
                rotations: [
                    { _x: 0, _y: 0, _z: 0 }
                ],
                animations: null,
                meshes: null,
                nodes: null, 
                materials: null,
                visible: true,
                name: 'model1',
                scale: { x: 1, y: 1, z: 1 },
            },
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
};


async function AddAllMeshesToPageDataOf( page: keyof typeof pages ) {
    const extracted_meshes = await ExtractAllMeshesOf( page );
    const new_pages = JSON.parse(JSON.stringify(pages));
    new_pages.test_page.models = new_pages.test_page.models.map( (model: any, i: number) => {
        return { ...model, meshes: extracted_meshes[i] }
    });
    console.log(new_pages);
    return new_pages;

    async function LoadAllModelsOf( page: keyof typeof pages ) {

        function LoadModel( i: number ) {
            return new Promise( (resolve, reject) => {
                const loader = new GLTFLoader();
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
                loader.setDRACOLoader( dracoLoader );
                loader.load(
                    pages[page].models[i].path,
                    (gltf: any) => {
                        resolve(gltf);
                        console.log('loaded');
                    },
                    (xhr: any) => {
                        // console.log((xhr.loaded / xhr.total) + 'loaded');
                    },
                    (error: any) => {
                        console.error(error);
                        reject(error);
                    }
                );
            });
        };
    
        const models: any = [];
        for (let i = 0; i < pages[page].models.length; i++) {
            models[i] = await LoadModel(i);
        };
        return models; // [model0, model1, model2, ...]
    };
    
    async function ExtractAllMeshesOf( page: keyof typeof pages ) {
        const models = await LoadAllModelsOf( page );
        const extracted_meshes = models.map( (gltf: any) => gltf.scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined ));
        return extracted_meshes; // [ [mesh0, mesh1, mesh2, ...], [mesh0, mesh1, mesh2, ...], [mesh0, mesh1, mesh2, ...], ... ]
    }
};

AddAllMeshesToPageDataOf( 'test_page' );

