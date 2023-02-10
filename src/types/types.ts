import { AnimationClip, Audio, Mesh } from "three"

export interface AppData {
    pages: Page[]
}

export interface Page {
    id: string,
    page_title: string,
    section: number,
    max_section: number,
    thumbnail: string,
    text: string[],
    textType: string[],
    music: string[],
    voices: string[],
    loaded_voices: null[]
    universe: Universe,
    camera: LessonCamera,
    models: Model[],    
    dispatch: Function,
};

export interface LoadedPage extends Page {
    camera: LoadedLessonCamera,
    models: LoadedModel[],
    _loaded_voices: Audio[],
    _loaded_music: Audio[],
};

export interface LessonCamera {
    positions: number[][],
    rotations: number[][],
    animation_data: number[][][],
    animation_clips: null[],
    CreateAnimationDataFromPositionsRotations: Function,
};

export interface LoadedLessonCamera extends LessonCamera {
    _animation_data: number[][][]
    _animation_clips: AnimationClip[][],
};

export interface Model {
    id: string,
    name: string,
    path: string,
    visible: boolean,
    scale: number,
    positions: number[][],
    rotations: number[][],
    animation_clips: THREE.AnimationClip[],
};

export interface LoadedModel extends Model {
    loadedMeshes: Mesh[][],
    _positions: number[][],
};

export interface Universe {
    id: string,
    star_count: number, 
    radius: number
}