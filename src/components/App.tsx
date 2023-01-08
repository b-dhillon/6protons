import { useState, useEffect, Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
 
import TestPage from './TestPage';


const _pages = [
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



export default function App() {
    console.log('App Called');

    const [ pages , setPages ] = useState( _pages );

    async function AddAllMeshesOfAppToData() {
        const allMeshesOfApp: any = await ExtractAllMeshesOfApp(); 
        setPages( oldPages  => {
            return oldPages.map( (oldPage: any, i: number) => {
                return {
                    ...oldPage, 
                    models: oldPage.models.map( ( model: any, j: number ) => {
                        return {
                            ...model, 
                            meshes: allMeshesOfApp[i][j]
                        }
                    })
                }
            }) 

        });

        return pages;

        function LoadModel( path: any ) {
            return new Promise( (resolve, reject) => {
                const loader = new GLTFLoader();
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
                loader.setDRACOLoader( dracoLoader );
                loader.load(
                    path,
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
        
        async function LoadAllModelsOfApp() {
            // const allModelsOfApp: any = [] // [ [ model0, model1, model2 ], [ model0, model1, model2 ], [ model0, model1, model2  ] ]
                                            //         ^ models[] of page0             ^models[] of page1               ^models[] of page2
        
            const all_pages_models = _pages.map(async (page: any) =>
            {
                const page_models: any = []; // [ model0, model1, model2 ]
                for (let i = 0; i < page.models.length; i++)
                {
                    page_models[i] = LoadModel(page.models[i].path);
                    // console.log(`model loaded`);
                }
                return Promise.all(page_models);
            })

            return Promise.all(all_pages_models); 
        }
        
        async function ExtractAllMeshesOfApp() {
            const allModelsOfApp = await LoadAllModelsOfApp();
            // console.log(allModelsOfApp); // [ [gltf0, gltf1], [gltf0], [gltf0], [gltf0] ]
        
            const allMeshesOfApp = allModelsOfApp.map( (arrayOfGltfs: any) => {
                return arrayOfGltfs.map( ( gltf: any ) => {
                    return gltf.scene.children.filter( ( child: any ) => child.isMesh && child.__removed === undefined )
                });
            } ) // [ [[Mesh], [Mesh], [Mesh]], [[Mesh], [Mesh], [Mesh]], [[Mesh], [Mesh],  [Mesh]]
        
            return allMeshesOfApp; 
        };
    };

    useEffect( () => {
        AddAllMeshesOfAppToData();
    }, [] );


    // Make this less hacky:  
    const [ loading, setLoading ] = useState( true )
    setTimeout( () => {
        setLoading( false )
    }, 2000 )

    if(loading) return <h1>Loading</h1>;
    if(!loading) return <TestPage data={ pages }/>
    else return <h1>Something is broken.</h1>

};








































    /*
    async function AddAllMeshesToPageDataOf( page: keyof typeof pages ) {
        const extracted_meshes = await ExtractAllMeshesOf( page );


        setPages( ( oldPages: any ) => {
            return oldPages.map( (oldPage: any) => {
                oldPage === page ? oldPage.models.map( (model: any, i: number) => { 
                    return { ...model, meshes: extracted_meshes[i] }
                }) : oldPage;
            });
        });
    
        
        // const new_pages = JSON.parse(JSON.stringify(_pages));
        // new_pages.test_page.models = new_pages.test_page.models.map( (model: any, i: number) => {
        //     return { ...model, meshes: extracted_meshes[i] }
        // });
        // console.log(new_pages);
        // return new_pages;
    
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
    */

/*
return oldPages.map( ( oldPage ) => {
    return {
        ...oldPage,
        models: oldPage.models.map( (model: any, i: number) => {
            return {
                ...model,
                meshes: extracted_meshes[i]
            }
        })
    }
})
*/




/*
function Init() {
    // Will set App global state data by loading all models, extracting all meshes, and creating all animations.

}
*/