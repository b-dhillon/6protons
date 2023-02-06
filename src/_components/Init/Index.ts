import TranslateRotate from '../animations/TranslateRotate';
import { AppData, LoadedPage, LoadedLessonCamera } from '../../types/types';
import { CameraPositionToModelPosition, ConstructCameraAnimationClips } from './Helpers';
// import { ExtractAllMeshesOfApp, LoadAllVoicesOfApp } from './Helpers';


// export async function Init( data: AppData ) {
//     const allMeshesOfApp: any = await ExtractAllMeshesOfApp( data );
//     const allVoicesOfApp: any = await LoadAllVoicesOfApp( data ); 

//     const loadedPages = data.pages.map( ( oldPage: any, i: number ): LoadedPage[] => {
//         const cameraAnimationData = oldPage.camera.CreateAnimationDataFromPositionsRotations();
//         return {
//             ...oldPage, 
//             camera: {
//                 ...oldPage.camera, 
//                 _animation_data: cameraAnimationData, // needed for initial position assignment
//                 _animation_clips: ConstructCameraAnimationClips( cameraAnimationData )
//             },

//             // add meshes and positions to each model
//             models: oldPage.models.map( ( model: any, j: number ) => {
//                 return {
//                     ...model, 
//                     loadedMeshes: allMeshesOfApp[ i ][ j ],
//                     _positions: CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], 'x' )

//                 };
//             }),

//             _loaded_voices: allVoicesOfApp[ i ]
//         };
//     });

//     return loadedPages;    
// };
