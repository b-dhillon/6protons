
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
    dispatch: Function
}

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
    loaded_voices: any[] | null
}



export interface LessonCamera {
    positions: number[][],
    rotations: number[][],
    animation_data: number[][][],
    animation_clips: null | any[][],
    CreateAnimationDataFromPositionsRotations: Function
}


export interface LoadedLessonCamera extends LessonCamera {
    // positions: number[][],
    // rotations: number[][],
    // animation_data: number[][][],
    // animation_clips: null | any[][],
    // CreateAnimationDataFromPositionsRotations: Function,

    _animation_clips: null | any[][],
    _animation_data: null | any[][]
}


export interface Model {
    id: string,
    name: string,
    path: string,
    visible: boolean,
    scale: number,
    positions: THREE.Vector3[],
    rotations: THREE.Euler[],
    animation_clips: THREE.AnimationClip[],
}

export interface LoadedModel extends Model {
    loadedMeshes: any[][],
    _positions: number[][],
}