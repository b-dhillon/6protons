import TranslateRotate from '../animations/TranslateRotate';
import { AppData, LoadedPage } from '../../types/types';
import { CameraPositionToModelPosition, ExtractAllMeshesOfApp, LoadAllVoicesOfApp } from './InitHelpers';


export async function Init( data: AppData ) {
    const allMeshesOfApp: any = await ExtractAllMeshesOfApp( data );
    const allVoicesOfApp: any = await LoadAllVoicesOfApp( data ); 

    const loadedPages = data.pages.map( ( oldPage: any, i: number ): LoadedPage[] => {
        const cameraAnimationData = oldPage.camera.CreateAnimationDataFromPositionsRotations();
        return {
            ...oldPage, 
            camera: {
                ...oldPage.camera, 
                _animation_data: cameraAnimationData, // needed for initial position assignment
                _animation_clips: cameraAnimationData.map( ( AnimationData:[][], i: number ) => {
                    return [ TranslateRotate( { duration: 3, initial_position: AnimationData[ 0 ], final_position: AnimationData[ 1 ], initial_angle: AnimationData[ 2 ], final_angle: AnimationData[ 3 ],axis: 'x', }) ];
                }),
            },

            // add meshes and positions to each model
            models: oldPage.models.map( ( model: any, j: number ) => {
                return {
                    ...model, 
                    loadedMeshes: allMeshesOfApp[ i ][ j ],
                    _positions: CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], 'x' )

                };
            }),

            _loaded_voices: allVoicesOfApp[ i ]
        };
    });

    return loadedPages;    
};