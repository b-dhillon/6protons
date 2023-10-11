import { AnimationClip, Audio, Mesh } from "three"

export interface UninitializedData {
    initializeModelPositionsFromCamera: Function,
    pages: UninitializedPage[]
}






export interface UninitializedPage {
    id: string,
    pageTitle: string,
    section: number,
    maxSection: number,
    thumbnail: string,
    text: string[],
    _text: string[][],
    textPlacement: string[],
    music: string[],
    voices: string[],
    // loadedVoices: null[] | Audio[] // is this property needed here?
    universe: Universe,
    dispatch: Function,
    camera: UninitializedLessonCamera,
    models: UninitializedModel[],
};



export interface InitializedPage {
    id: string,
    pageTitle: string,
    section: number,
    maxSection: number,
    thumbnail: string,
    text: string[],
    textPlacement: string[],
    music: string[],
    voices: string[],
    universe: Universe,
    dispatch: Function,
    camera: InitializedLessonCamera,
    models: InititalizedModel[],
    loadedVoices: Audio[],
    loadedMusic: Audio[],
};








// Will have to get rid of "extends" to get rid of unecessary data copying and passing. 
// There is data and function definitions that no longer need to be copied and passed 
// down to PageRenderer. But the savings could be far more trouble then they are worth.

// export interface InitializedPage extends UninitializedPage {
//     camera: InitializedLessonCamera,
//     models: InititalizedModel[],
//     loadedVoices: Audio[],
//     loadedMusic: Audio[],
// };

export interface UninitializedLessonCamera {
    positions: number[][],
    rotations: number[][],
    createAnimationDataStructure: Function,
    createAnimationClips: Function
};

export interface InitializedLessonCamera {
    initialPosition: number[]
    animationClips: AnimationClip[][],
};

export interface UninitializedModel {
    id: string,
    name: string,
    path: string,
    visible: boolean,
    newModelLocation: boolean,
    scale: number,
    yOffsetForText: boolean,


    positions: number[][], //needed?
    rotations: number[][], //needed?
    animationClips: THREE.AnimationClip[],
};

export interface InititalizedModel extends UninitializedModel {
    loadedMeshes: Mesh[][],
    initializedPositions: number[][],
};

export interface Universe {
    id: string,
    star_count: number, 
    radius: number
}


// animationData: number[][][], //not needed
// animationClips: null[], // not needed