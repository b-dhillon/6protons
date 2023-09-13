import { AnimationClip, Audio, Mesh } from "three"

export interface AppData {
    pages: Page[]
}

export interface Page {
    id: string,
    pageTitle: string,
    section: number,
    maxSection: number,
    thumbnail: string,
    text: string[],
    textType: string[],
    music: string[],
    voices: string[],
    loadedVoices: null[] | Audio[] // is this property needed here?
    universe: Universe,
    camera: LessonCamera,
    models: Model[],    
    dispatch: Function,
};

export interface LoadedPage extends Page {
    camera: LoadedLessonCamera,
    models: LoadedModel[],
    loadedVoices: Audio[],
    loadedMusic: Audio[],
};

export interface LessonCamera {
    positions: number[][],
    rotations: number[][],
    animationData: number[][][],
    animationClips: null[],
    createAnimationDataFromPositionsRotations: Function,
};

export interface LoadedLessonCamera extends LessonCamera {
    initializedAnimationData: number[][][]
    initializedAnimationClips: AnimationClip[][],
};

export interface Model {
    id: string,
    name: string,
    path: string,
    visible: boolean,
    scale: number,
    positions: number[][],
    rotations: number[][],
    animationClips: THREE.AnimationClip[],
};

export interface LoadedModel extends Model {
    loadedMeshes: Mesh[][],
    initializedPositions: number[][],
};

export interface Universe {
    id: string,
    star_count: number, 
    radius: number
}