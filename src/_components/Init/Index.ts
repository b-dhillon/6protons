import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three'
import TranslateRotate from '../animations/TranslateRotate';
import { AppData, LoadedPage, Page } from '../../types/types';
import * as Helpers from './Helpers';


export async function Init( data: AppData ) {
    const allMeshesOfApp: any = await Helpers.ExtractAllMeshesOfApp();
    const allVoicesOfApp: any = await Helpers.LoadAllVoicesOfApp(); 

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
                    _positions: Helpers.CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], 'x' )

                };
            }),

            _loaded_voices: allVoicesOfApp[ i ]
        };
    });

    return loadedPages;    
};