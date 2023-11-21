import { Vector3 } from 'three';
import { Universe } from './types/types';

interface Model {
  id: string;
  name: string;
  path: string;
  visible: boolean;
  newModelLocation: boolean;
  scale: number;
  yOffsetForText: number;
  zoomInOnReverse: boolean;
  animationClips: THREE.AnimationClip[];
}

interface Camera {
  animationTypes: Function[];
  positions: number[][];
  rotations: number[][];
  createAnimationDS: Function;
  createAnimationClips: Function;
}


interface Universe {
  id: string,
  starCount: number, 
  radius: number
}















class Page {
  id: string;
  title: string;
  universe: Universe | undefined;
  camera: Camera | undefined;
  models: Model[] | undefined;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  bigBang( id: string, starCount: number, radius: number ): void {
    this.universe = {
      id: id, 
      starCount: starCount,
      radius: radius
    }
  }

  createCamera( ): void {
    this.camera = {
      animationTypes: Function[],
      positions: number[][],
      rotations: number[][],
      createAnimationDS: Function,
      createAnimationClips: Function
    }
  }
}

class Lesson extends Page {

  text: string[] | undefined;
  musicPaths: string[] | undefined;
  voicePaths: string[] | undefined;


  constructor(id: string, title: string) {
    super( id, title );
  }

}


class Model {
  id: string,
  name: string,
  path: string,
  visible: boolean = false,
  newModelLocation: boolean,
  scale: number,
  yOffsetForText: number,
  zoomInOnReverse: boolean,
  animationClips: THREE.AnimationClip[],


  position: Vector3 | undefined;
  rotation: Vector3 | undefined;

  constructor( id: string, name: string,  path: string  ) {

    this.id = id;
    this.name = name;
    this.path = path;


  }
}