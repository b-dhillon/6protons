/** GOAL:
 * Drop model gltf assets in a directory:
 * Then construct a model by just configuring its path and animations you want
 * All other properties should be initialized/computed with init or have default values
*/

import { AnimationClip, Vector3 } from 'three';
import { scaleUp, scaleDown } from '../../components/animations/ScaleXYZ';
import Rotate from '../../components/animations/Rotate';

type AnimationClipConfig__Model = any; // Define the 'config' type appropriately

type AnimationClipConstructors__Model = {
  'scale-up': (config?: AnimationClipConfig__Model) => AnimationClip;
  'rotate': (config?: AnimationClipConfig__Model) => AnimationClip;
  'scale-down': (config?: AnimationClipConfig__Model) => AnimationClip;
  [key: string]: (config?: AnimationClipConfig__Model) => AnimationClip; // Index signature
  // index signature defines the object's key types and value types
  // key is of type string, values are all functions.
};

interface AnimationNames__Model { 
  enter: string;
  main: string; 
  exit: string;
  nested: string 
};

interface AnimationClips__Model {
  enter: AnimationClip | undefined;
  main: AnimationClip | undefined; 
  exit: AnimationClip | undefined; 
  nested: AnimationClip | undefined;
};

interface ModelConfig {
  path: string;
  scale?: number; 
  animationNames?: {
    enter?: string;
    main?: string;
    exit?: string;
    nested?: string;
  };
};



// Mapping animation string to a fn that returns an AnimationClip
/*
This object can grow in length to hold all possible
animations for all models of the app
This should be moved into it's own file?
BUT WHY
Why not just store the functions directly?
Whats the point of mapping strings to functions????
*/
const animationClipConstructors__Model: AnimationClipConstructors__Model = {
  'scale-up': scaleUp,
  'rotate': Rotate,
  'scale-down': scaleDown,
};



export class Model {
  id: number | undefined; // will be initialized in init, with a loop: id = i --> model0, model1, model2
  name: string | undefined; // will be initialized in init, with a loop model${i} --> model0, model1, model2
  path: string | undefined; // initialized with constructor
  visible: boolean = false;
  scale: number | undefined; // initialized with constructor, defaulted to 1 
  animationNames: AnimationNames__Model; // initialized with constructor, with defaults
  animationClips: AnimationClips__Model | undefined; // will be initialized in init with model.createAnimationClips() method

  // properties we still need to initalize programatically:
  // logic is in refactor.md
  // the default initalizations here should be removed?
  inNewPosition: boolean | undefined = true;
  yOffsetForText: number | undefined = 0;
  zoomInOnReverse: boolean | undefined = false;
  position: Vector3 | undefined;
  rotation: Vector3 | undefined;


  constructor({ path, animationNames = {}, scale = 1 }: ModelConfig) {
    this.path = path;
    this.scale = scale;
    // sets default animations and over-rides them
    // if constructor is provided animation names
    this.animationNames = {
      enter: 'scale-up',
      main: 'rotate',
      exit: 'scale-down',
      nested: '',
      ...animationNames,
    };
  }


  // Creates AnimationClips based on animations that are set when the
  // class is instantiated
  createAnimationClips(): void {
    // grabbing the names (strings) of the animations
    const enterName: string = this.animationNames.enter;
    const mainName: string = this.animationNames.main;
    const exitName: string = this.animationNames.exit;
    const nestedName: string = this.animationNames?.nested;

    // string indexing an object that stores all of the constructor functions
    const enterAnimationConstructor = animationClipConstructors__Model[ enterName ];
    const mainAnimationConstructor = animationClipConstructors__Model[ mainName ];
    const exitAnimationConstructor = animationClipConstructors__Model[ exitName ];
    let nestedAnimationConstructor; 
    if(nestedName) nestedAnimationConstructor = animationClipConstructors__Model[ nestedName ];

    // set the animationClips object to hold the AnimationClips
    // that will be returned from these functions
    this.animationClips = {
      enter: enterAnimationConstructor(),
      main: mainAnimationConstructor({ duration: 50 }), //changing the default duration from 1 to 50
      exit: exitAnimationConstructor(),
      nested: nestedName ? nestedAnimationConstructor!() : undefined 
    };
  }
}
















/*
const models = [
  new Model({
    name: 'm0',
    path: '/my/path',
    animations: {
      exit: 'scale-down',
    },
  }),
];

*/