import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import TestPage from './_components/Page';
import _pages from './data';
import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack, InterpolateSmooth, AdditiveAnimationBlendMode, InterpolateLinear, BooleanKeyframeTrack } from 'three';
import * as THREE from 'three'
import TranslateRotate from './_components/animations/TranslateRotate'



export default function App() {

    const [ pages , setPages ] = useState( _pages );
    const [ current_page, setCurrentPage ] = useState( 'test_page' );

    function LoadData() {
        /*
        This Init() fn is responsible for the following for each page:
            - Loading all glTF's and extracting all meshes from each glTF.
            - Creating all AnimationClips for the camera. 
            - Creating all AnimationClips for the models. <-- Still need to do this.
            - Loading all voices for each page.
        */
        async function Init() {
            const allMeshesOfApp: any = await ExtractAllMeshesOfApp();
            const allVoicesOfApp: any = await LoadAllVoicesOfApp(); 

            setPages( oldPages  => {
                return oldPages.map( ( oldPage: any, i: number ) => {
                    return {
                        ...oldPage, 

                        // add animation clips to camera
                        // camera: {
                        //     ...oldPage.camera, 
                        //     _animation_data: oldPage.camera.CreateAnimationDataFromPositionsRotations(),
                        //     _animation_clips: oldPage.camera.CreateAnimationDataFromPositionsRotations().map( ( datum:[][], i: number ) => {
                        //         return [ TranslateRotate_x( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
                        //     }),
                        //     animation_clips: oldPage.camera.animation_data.map( ( datum:[][], i: number ) => {
                        //         return [ TranslateRotate_x( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
                        //     })
                        // },

                        camera: {
                            ...oldPage.camera, 
                            _animation_data: oldPage.camera.CreateAnimationDataFromPositionsRotations(), // needed for initial position assignment
                            _animation_clips: oldPage.camera.CreateAnimationDataFromPositionsRotations().map( ( AnimationData:[][], i: number ) => {
                                return [ TranslateRotate(
                                        { 
                                            duration: 3, 
                                            initial_position: AnimationData[ 0 ], 
                                            final_position: AnimationData[ 1 ], 
                                            initial_angle: AnimationData[ 2 ], 
                                            final_angle: AnimationData[ 3 ],
                                            axis: 'x', 
                                        }
                                    )
                                ];
                            }),
                        },

                        // add meshes and positions to each model
                        models: oldPage.models.map( ( model: any, j: number ) => {
                            return {
                                ...model, 
                                meshes: allMeshesOfApp[i][j],
                                _positions: CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], 'x' )

                            };
                        }),

                        loaded_voices: allVoicesOfApp[ i ]
                    };
                });
            });

            function CameraPositionToModelPosition( cameraPosition: number[], cameraRotation: number[], rotationAxis: string ) {

                let rotationAngle = cameraRotation[ 0 ];

                // If you rotate the camera on X axis you need to position the model on the Y axis.
                if( rotationAxis === 'x' ) {
                    const x = cameraPosition[ 0 ];
                    const y = ( cameraPosition[ 1 ] + rotationAngle );
                    const z = cameraPosition[ 2 ] - 1;
                    return [ x, y, z ];
                }

                // If you rotate the camera on Y axis you need to position the model on the X axis.
                if( rotationAxis === 'y' ) {
                    const x = ( cameraPosition[ 0 ] + rotationAngle );
                    const y = cameraPosition[ 1 ];
                    const z = cameraPosition[ 2 ];
                    return [ x, y, z ];
                }

                // If you rotate the camera on Z axis you don't need to do anything to the model.
                if( rotationAxis === 'z' ) {
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
                                                                    ^ voices[] of page0          ^ voices[] of page1                           */
                const allVoicesOfApp = _pages.map( async (page: any) => {
        
                    let pageVoices = []; // [ voice0, voice1, voice2 ]
        
                    for ( let i = 0; i < page.voices.length; i++ ) {
                        pageVoices[ i ] = LoadVoice( page.voices[ i ] );
                        // console.log(`LoadAllVoicesOfApp() voice${i} loaded`);
                    };
        
                    return Promise.all( pageVoices );
                });
        
                return Promise.all( allVoicesOfApp ); 
            }

            function LoadVoice( path: string ) {            
                return new Promise( ( resolve, reject ) => {
                    const listener = new THREE.AudioListener();
                    const AudioObject = new THREE.Audio( listener );
                    const loader = new THREE.AudioLoader();
                    loader.load( 
                        path,
                        // onLoad
                        ( buffer: AudioBuffer ) => {
                            // console.log('onLoad callback called');

                            // set the audio object's buffer to the loaded object
                            AudioObject.setBuffer( buffer );
                            AudioObject.setLoop( false );
                            AudioObject.setVolume( 0.5 );
                            AudioObject.play();
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
            }
            
            function LoadModel( path: any ) {
                return new Promise( (resolve, reject) => {
                    const loader = new GLTFLoader();
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
                    loader.setDRACOLoader( dracoLoader );
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
                });
            };
            
            async function LoadAllModelsOfApp() {
                // const allModelsOfApp: any = [] // [ [ model0, model1, model2 ], [ model0, model1, model2 ], [ model0, model1, model2  ] ]
                                                //               ^ models[] of page0           ^models[] of page1           ^models[] of page2
            
                const all_pages_models = _pages.map(async (page: any) => {
                    const page_models: any = []; // [ model0, model1, model2 ]
                    for ( let i = 0; i < page.models.length; i++ ) {
                        page_models[i] = LoadModel(page.models[i].path);
                        // console.log(`model loaded`);
                    };
                    return Promise.all(page_models);
                });
    
                return Promise.all(all_pages_models); 
            }
            
            async function ExtractAllMeshesOfApp() {
                const allModelsOfApp = await LoadAllModelsOfApp();
                // console.log(allModelsOfApp); // [ [gltf0, gltf1], [gltf0], [gltf0], [gltf0] ]
            
                const allMeshesOfApp = allModelsOfApp.map( (arrayOfGltfs: any) => {
                    return arrayOfGltfs.map( ( gltf: any ) => {
                        return gltf.scene.children.filter( ( child: any ) => child.isMesh || child.isGroup && child.__removed === undefined )
                    });
                }) // [ [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ] ]
            
                return allMeshesOfApp; 
            };
        };

        Init();
    };

    useEffect( () => LoadData(), [] );

    // Make this less hacky:  
    const [ loading, setLoading ] = useState( true );

    setTimeout( () => {
        setLoading( false )
    }, 2000 );

    if( loading ) return <h2 style={ { position: 'absolute', top: '500px', left: '800px' } }>Loading...</h2>;
    if( !loading && current_page === 'test_page' ) return < TestPage data={ pages.find( ( page ) => page.id === current_page  ) } setPage={ setCurrentPage } />;
    else return <h2>Something is broken.</h2>;
};



/*
function TranslateRotate_x ( duration: number, initial_position: number[], final_position: number[], axis: string, initial_angle: number[], final_angle: number[] ) {

    const times_Position = [ 0, duration ];
    const values_Position = [ ...initial_position, ...final_position ];
    const trackName_Position = '.position';
    const track_Position = new VectorKeyframeTrack( trackName_Position, times_Position, values_Position, InterpolateLinear );

    const times_Rotation = [ 0, duration ];

    let values_Rotation: number[];
    values_Rotation = [ initial_angle[ 0 ], final_angle[ 0 ] ];
    
    const trackName_Rotation = '.rotation[' + axis + ']';
    const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );

    return new AnimationClip( 'TranslateRotateCamera', duration, [ track_Position, track_Rotation  ] );
};
*/


// animation_clips: oldPage.camera.animation_data.map( ( datum:[][], i: number ) => {
//     return [ TranslateRotate( 3, datum[ 0 ] , datum[ 1 ], 'x', datum[ 2 ], datum[ 3 ] ) ];
// })

/*
    function CreatePulsationAnimation( duration, pulseScale ) {

        const times = [], values = [], tmp = new Vector3();

        for ( let i = 0; i < duration * 10; i ++ ) {

            times.push( i / 10 );

            const scaleFactor = Math.random() * pulseScale;
            tmp.set( scaleFactor, scaleFactor, scaleFactor ).
                toArray( values, values.length );

        }

        const trackName = '.scale';

        const track = new VectorKeyframeTrack( trackName, times, values );

        return new AnimationClip( null, duration, [ track ] );

    }
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

/*
function Init() {
    // Will set App global state data by loading all models, extracting all meshes, and creating all animations.

}
*/

