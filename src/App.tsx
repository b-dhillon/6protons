import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three'
import Page_ from './_components/PageConstructor';
import data from './data';
import TranslateRotate from './_components/animations/TranslateRotate';
import { AppData, LoadedPage, Page } from './types/types';
import PageConstructor from './_components/PageConstructor';
import { FindRotationAxis } from './_components/FindRotationAxis';

export default function App() {
    const [ pages, setPages ] = useState<Page[] | LoadedPage[]>( data.pages );
    const [ current_page, setCurrentPage ] = useState( 'test_page' );
    const [ loading, setLoading ] = useState( true );  // Make less hacky
    setTimeout( () => { setLoading( false ) }, 4000 ); // Make less hacky

    function LoadData() { Init( setPages, data ) }; 
    
    /*
    Fix this up so that it's not so hacky. Make page only be of type LoadedPage and have it's asignment await LoadData()
    You can also initialize state of pages to nothing. And then only set it to data.pages --> data.loadedPages with Init().
    */
    useEffect( () => { LoadData() }, [] );
    // const [ page ]: Page[] | LoadedPage[] = pages.filter( ( page ) => page.id === current_page );
    if( !loading ) {
        const [ page ]: Page[] | LoadedPage[] = pages.filter( ( page ) => page.id === current_page );
        return < PageConstructor page={ page } setCurrentPage={ setCurrentPage } />
    };
    if( loading ) return < h2 style={ { position: 'absolute', top: '500px', left: '800px' } }>Loading...</ h2 >;
    else return < h2 >Something is broken.</ h2 >;
};



/*
This Init() fn is responsible for the following for each page:
    - Loading all glTF's and extracting all meshes from each glTF.
    - Creating all AnimationClips for the camera. 
    - Creating all AnimationClips for the models. <-- Still need to do this.
    - Loading all voices for each page.
*/
export async function Init( setPages : Function, data: AppData ) {
    const allMeshesOfApp: any = await ExtractAllMeshesOfApp();
    const allVoicesOfApp: any = await LoadAllVoicesOfApp(); 

    setPages( ( oldPagesArr: Page[] )  => {
        return oldPagesArr.map( ( oldPage: any, i: number ): LoadedPage[] => {
            const cameraAnimationData = oldPage.camera.CreateAnimationDataFromPositionsRotations();
            return {
                ...oldPage, 
                camera: {
                    ...oldPage.camera, 
                    _animation_data: cameraAnimationData, // needed for initial position assignment
                    _animation_clips: cameraAnimationData.map( ( AnimationData:[][], i: number ) => {
                        return [ TranslateRotate({ 
                            duration: 4, 
                            initial_position: AnimationData[ 0 ], 
                            final_position: AnimationData[ 1 ], 
                            initial_angle: AnimationData[ 2 ], 
                            final_angle: AnimationData[ 3 ], 
                            // axis: 'x', 
                            axis: FindRotationAxis( AnimationData ), 
                        }) ];
                    }),
                },

                // add meshes and positions to each model
                models: oldPage.models.map( ( model: any, j: number ) => {
                    return {
                        ...model, 
                        loadedMeshes: allMeshesOfApp[ i ][ j ],


                        // Need to get access to AnimationData here which is just the [][] NOT the whole [][][]. Although you can use that too, but youll need to loop through it.
                        _positions: CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], FindRotationAxis( cameraAnimationData[ j ] ) )
                    };
                }),

                _loaded_voices: allVoicesOfApp[ i ]
            };
        });
    });

    function CameraPositionToModelPosition( cameraPosition: number[], cameraRotation: number[], rotationAxis: string ) {


        // If you rotate the camera on X axis you need to position the model on the Y axis.
        if( rotationAxis === 'x' ) {
            const rotationAngle = cameraRotation[ 0 ];

            const x = cameraPosition[ 0 ];
            const y = ( cameraPosition[ 1 ] + rotationAngle );
            const z = cameraPosition[ 2 ] - 1;
            return [ x, y, z ];
        }

        // If you rotate the camera on Y axis you need to offset position the model on the X axis AND Z axis.
        if( rotationAxis === 'y' ) {
            const rotationAngle = cameraRotation[ 1 ];

            const offset = rotationAngle * -1

            if (rotationAngle > 0) {
                const x = ( cameraPosition[ 0 ] + offset );
                const y = cameraPosition[ 1 ];
                const z = ( cameraPosition[ 2 ] + offset );
                return [ x, y, z ];
            }
            else {
                const x = cameraPosition[ 0 ];
                const y = cameraPosition[ 1 ];
                const z = ( cameraPosition[ 2 ] - 1 );
                return [ x, y, z ];
            }
        }

        // If you rotate the camera on Z axis you don't need to do anything to the model.
        if( rotationAxis === 'z' ) {
            const rotationAngle = cameraRotation[ 2 ];

            const x = cameraPosition[ 0 ];
            const y = cameraPosition[ 1 ];
            const z = ( cameraPosition[ 2 ] - 1 );
            return [ x, y, z ];
        } 
        
        else {
            const x = cameraPosition[ 0 ];
            const y = cameraPosition[ 1 ];
            const z = ( cameraPosition[ 2 ] - 1 );
            return [ x, y, z ];
        }
    };

    async function LoadAllVoicesOfApp() {
        /* const allVoicesOfApp: any = [][] // [ [ voice0, voice1, voice2 ], [ voice0, voice1, voice2 ], etc... ]
                                                            ^ voices[] of page0          ^ voices[] of page1      */
        const allVoicesOfApp = data.pages.map( async ( page: any ) => {

            let pageVoices = []; // [ voice0, voice1, voice2 ]

            for ( let i = 0; i < page.voices.length; i++ ) {
                pageVoices[ i ] = LoadVoice( page.voices[ i ] );
                // console.log(`LoadAllVoicesOfApp() voice${i} loaded`);
            };

            return Promise.all( pageVoices );
        });

        return Promise.all( allVoicesOfApp ); 
    };

    function LoadVoice( path: string ) {            
        return new Promise( ( resolve, reject ) => {
            const listener = new THREE.AudioListener();
            const AudioObject = new THREE.Audio( listener );
            const loader = new THREE.AudioLoader();
            loader.load( 
                path,

                // onLoad
                ( buffer: AudioBuffer ) => {
                    // Set the audio object's buffer to the loaded object
                    AudioObject.setBuffer( buffer );
                    AudioObject.setLoop( false );
                    AudioObject.setVolume( 1 );
                    // AudioObject.play();
                    resolve( AudioObject )
                },
        
                // onProgress 
                ( xhr ) => {
                    // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
        
                // onError
                ( err ) => {
                    console.log( 'An error happened', err );
                }
            );
        })
    };
    
    function LoadModel( path: any ) {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
            loader.setDRACOLoader( dracoLoader );

            if (path) {
                loader.load(
                    path,
                    (gltf: any) => {
                        resolve( gltf );
                        console.log('glTF loaded');
                    },
                    (xhr: any) => {
                        // console.log((xhr.loaded / xhr.total) + 'loaded');
                    },
                    (error: any) => {
                        console.error(error);
                        reject(error);
                    }
                );
            } else resolve('')

        });
    };
    
    async function LoadAllModelsOfApp() {
        // const allModelsOfApp: any = [] // [ [ model0, model1, model2 ], [ model0, model1, model2 ], [ model0, model1, model2  ] ]
        //                                             ^ models[] of page0           ^models[] of page1           ^models[] of page2
    
        const all_pages_models = data.pages.map(async (page: any) => {
            const page_models: any = []; // [ model0, model1, model2 ]
            for ( let i = 0; i < page.models.length; i++ ) {
                page_models[i] = LoadModel(page.models[i].path);
                // console.log(`model loaded`);
            };
            return Promise.all(page_models);
        });

        return Promise.all(all_pages_models); 
    };
    
    async function ExtractAllMeshesOfApp() {
        const allModelsOfApp = await LoadAllModelsOfApp();
        // console.log(allModelsOfApp); // [ [gltf0, gltf1], [gltf0], [gltf0], [gltf0] ]
    
        const allMeshesOfApp = allModelsOfApp.map( (arrayOfGltfs: any) => {
            return arrayOfGltfs.map( ( gltf: any ) => {
                if(gltf) {
                    return gltf.scene.children.filter( ( child: any ) => child.isMesh || child.isGroup && child.__removed === undefined )
                } else return ''
            });
        }) // [ [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ] ]
    
        return allMeshesOfApp; 
    };
};



























/*
// useEffect( () => { Init( setPages ) }, [] );
// animation_clips: oldPage.camera.animation_data.map( ( datum:[][], i: number ) => {
//     return [ TranslateRotate( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
// })
*/



// Old adding animation clips to camera
/*
camera: {
    ...oldPage.camera, 
    _animation_data: oldPage.camera.CreateAnimationDataFromPositionsRotations(),
    _animation_clips: oldPage.camera.CreateAnimationDataFromPositionsRotations().map( ( datum:[][], i: number ) => {
        return [ TranslateRotate_x( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
    }),
    animation_clips: oldPage.camera.animation_data.map( ( datum:[][], i: number ) => {
        return [ TranslateRotate_x( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
    })
},
*/

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

    
    const new_pages = JSON.parse(JSON.stringify(_pages));
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
