import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import TestPage from './TestPage';
import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack, InterpolateSmooth, AdditiveAnimationBlendMode } from 'three';
import _pages from '../data';


export default function App() {

    const [ pages , setPages ] = useState( _pages );
    const [ current_page, setCurrentPage ] = useState( 'test_page' )

    function LoadData() {

        async function AddAllMeshesOfAppToData() {
            const allMeshesOfApp: any = await ExtractAllMeshesOfApp(); 
            setPages( oldPages  => {
                return oldPages.map( ( oldPage: any, i: number ) => {
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
                } ) // [ [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh],[Mesh] ]
            
                return allMeshesOfApp; 
            };

            // return pages;
        };

        AddAllMeshesOfAppToData();
        // AddAllMeshesOfAppToData().then( setLoading(false) ) here when the async function returns
        // return AddAllMeshesOfAppToData();

    };

    useEffect( () => LoadData(), [] );

    // Make this less hacky:  
    const [ loading, setLoading ] = useState( true );

    setTimeout( () => {
        setLoading( false )
    }, 2000 );



    if( loading ) return <h2 style={ { position: 'absolute', top: '500px', left: '800px' } }>Loading...</h2>;
    if( !loading && current_page === 'test_page' ) return <TestPage data={ pages.find( ( page ) => page.id === current_page  ) }/>
    else return <h2>Something is broken.</h2>
};








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