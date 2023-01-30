import { AnimationClip } from "three"

export interface PageData {
    id: string,
    page_title: string,
    section: number,
    max_section: number,
    thumbnail: string,
    universe: any,
    camera: LessonCamera,
    models: Model[],
    text: string[],
    textType: string[],
    music: string[],
    voices: string[],
    audio: any,
    dispatch: Function,
    loaded_voices: null
};

export interface LoadedPageData extends PageData {
    // id: string,
    // page_title: string,
    // section: number,
    // max_section: number,
    // thumbnail: string,
    // universe: any,
    // models: Model[],
    // text: string[],
    // textType: string[],
    // music: string[],
    // voices: string[],
    // audio: any,
    // dispatch: Function,
    
    model: LoadedModel[],
    camera: LoadedLessonCamera,
    _loaded_voices: any[]
};

export interface LessonCamera {
    positions: number[][],
    rotations: number[][],
    animation_data: number[][][],
    animation_clips: null | any[][],
    CreateAnimationDataFromPositionsRotations: Function
};

export interface LoadedLessonCamera extends LessonCamera {
    // positions: number[][],
    // rotations: number[][],
    // animation_data: number[][][],
    // animation_clips: null | any[][],
    // CreateAnimationDataFromPositionsRotations: Function,

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
    loadedMeshes: any[][],
    _positions: number[][],
};