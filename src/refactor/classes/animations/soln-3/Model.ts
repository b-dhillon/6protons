import { AnimationClip, Euler, Group, Matrix4, Mesh, Object3D, Vector3 } from 'three';
import { Section } from '../../Section';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { CamAnimation } from './Camera';
import { scaleUp, scaleDown } from '../../../../components/animations/ScaleXYZ';
import { spinY } from '../../../../components/animations/spin-y';
import { ModelAnimNamesConfig, ModelAnimNames, ModelAnimConfig, ModelClipConstructors, ModelAnimClips, RotAngleAndRotVector, ModelDirectorConfig, PosRot } from "../../../types"
import { suspend } from '../../../../components/animations/suspend';
import { AnimationClipCreator } from './animation-clip-creator';

const modelClipConstructors: ModelClipConstructors = {
  'scale-up': scaleUp,
  'spin-y': spinY,
  'scale-down': scaleDown,
  'suspend': suspend
};

/**
 * Here we changed a few different things:
 * 
 * added proeprty on Model: animConfigs
 * 
 * added method on builder: createAnimConfigs()
 * 
 */

class ModelAnimConfigs {

  enter: ModelAnimConfig | undefined;
  main: ModelAnimConfig | undefined;
  exit: ModelAnimConfig | undefined;
  nested: ModelAnimConfig | undefined;

  [ key: string ]: ModelAnimConfig | undefined // index signature

}

class BlankModelAnimConfig {

  animName: string | undefined;

  iPos: Vector3 | undefined;
  fPos: Vector3 | undefined;
  iRot: Euler | undefined;
  fRot: Euler | undefined; 
  rotAxis: string | undefined;
  easingFn: Function | undefined;
  smoothness: number | undefined;
  duration: number = 1;

  iScale: Vector3 | undefined; 
  fScale: Vector3 | undefined;

  constructor() {};

};

class Anims {

  enter: { name?: string, config?: ModelAnimConfig, clip?: AnimationClip } = {};
  exit: { name?: string, config?: ModelAnimConfig, clip?: AnimationClip } = {};
  main: { name?: string, config?: ModelAnimConfig, clip?: AnimationClip } = {};
  nested: { name?: string, config?: ModelAnimConfig, clip?: AnimationClip } = {};

  constructor() {}

};

export class Model {

    private static _lastId = 0;
    
    constructor() {
  
      this.id = Model._lastId++;
      this.anims = new Anims();

    }
  
    readonly id: number;
  
    section!: number;
  
    name: string | undefined;
  
    path!: string;
  
    visible: boolean = false;
  
    scale: number = 1;
  
    /**
     * All three of the objects below have the same keys: 
     *   enter: { name: string, config: AnimConfig, clip: }
     *   main: 
     *   exit:
     *   nested: 
     */
    animNames!: ModelAnimNames;

    animConfigs!: ModelAnimConfigs
    
    animClips: ModelAnimClips | undefined;

    /**
     * Experimental:
     */
    anims: Anims;

    
    meshes: Object3D[] | undefined;
  
    position: Vector3 | undefined;
    
    rotation: Euler = new Euler(0, 0, 0);
  
    inNewPosition: boolean | undefined;
    
    yOffsetForText: number = 0;
  
    zoomInOnReverse: boolean | undefined;
  
};


export class Models {

  constructor( models: Model[] ) {

    this.models = models

  };

  models: Model[];

  groupedBySection: Model[][] = [];

  public groupBySection(numberOfSectionsInLesson: number): void {

    const modelsBySection: Model[][] = [];

    for (let i = 0; i < numberOfSectionsInLesson; i++) {
      modelsBySection.push([]);
    };

    for( let i = 0; i < this.models.length; i++ ) {
      let section = this.models[i].section
      modelsBySection[section].push(this.models[i]); 
    };
    
    this.groupedBySection = modelsBySection;

  };
  
};









interface IModelBuilder {

  addPath(path: string): void;

  assignSection(section: number): void;

  addName(name: string): void;

  addAnimNames( animNames: ModelAnimNamesConfig ): void;

  createAnimConfigs(): void;

  createAnimClips(): void;

  addDependantProperties(camAnimations: CamAnimation[], textOfEntireLesson: string[][]): void;

  computePosition(posRot: PosRot): void;

  extractMeshes(): void;

};


export class ModelBuilder implements IModelBuilder {

  model!: Model;

  constructor() {

    this.reset();

  }

  public reset(): void {

    this.model = new Model();

  }

  public addPath(path: string): ModelBuilder {

    this.model.path = path;
    return this

  };

  public assignSection(section: number): void {

    this.model.section = section;

  };

  public addName(name: string): void {

    this.model.name = name;

  };

  public addAnimNames( animNames: ModelAnimNamesConfig = {} ): void {

    const names = {
      enter: 'scale-up',
      main: 'spin-y',
      exit: 'scale-down',
      nested: '',
      ...animNames, // over-rides any defaults
    };

    this.model.animNames = names;

    /**
     * Experimental:
     */
    this.model.anims.enter.name = names.enter;
    this.model.anims.main.name  = names.main; 
    this.model.anims.exit.name  = names.exit;
    this.model.anims.nested.name = names.nested;

  };

  public createAnimConfigs() {

    // this.model.animConfigs = new ModelAnimConfigs(); 

    // const animNameKeys = Object.keys( this.model.animNames );

    // const animNameValues = Object.values( this.model.animNames );

    // const numberOfAnimationsOnModel = animNameValues.length;
    
    // for ( let i = 0; i < numberOfAnimationsOnModel; i++ ) {

    //   const modelAnimConfig = new BlankModelAnimConfig();

    //   switch( animNameValues[ i ] ) {

    //     case 'scale-up':
    //       modelAnimConfig.iScale = new Vector3( 0, 0, 0 );
    //       modelAnimConfig.fScale = new Vector3( 1, 1, 1 );
    //       break;

    //     case 'scale-down':
    //       modelAnimConfig.iScale = new Vector3( 1, 1, 1 );
    //       modelAnimConfig.fScale = new Vector3( 0, 0, 0 );
    //       break; 

    //     case 'spin-y': 
    //       modelAnimConfig.iRot = new Euler( 0, 1, 0 );
    //       modelAnimConfig.fRot = new Euler( 0, Math.PI * 2, 0);
    //       modelAnimConfig.rotAxis = 'y';
    //       break;

    //     case 'suspend':
    //       modelAnimConfig.duration = 90;
    //       break;

    //     default:
    //       throw new Error( "Invalid animation name. no model animation with that name found." )
  
    //   };

    //   this.model.animConfigs[ animNameKeys[ i ] ] = modelAnimConfig;

    // };


    // Experimental: 
    this.model.anims.enter.config = createConfig( this.model.anims.enter.name )
    this.model.anims.main.config = createConfig( this.model.anims.main.name )
    this.model.anims.exit.config = createConfig( this.model.anims.exit.name )
    this.model.anims.nested.config = createConfig( this.model.anims.nested.name )


  };

  // Creates AnimationClips based on animNames that are set when Model is instantiated
  public createAnimClips(): void {

    if( !this.model.animNames ) this.addAnimNames();
    if( !this.model.animConfigs ) this.createAnimConfigs();

    
    /**
     * Here is where I dont think this pattern is going to work out. 
     * This looks bad
     */
    AnimationClipCreator.CreateScaleUpAnimation()

    AnimationClipCreator.CreateSpinYAnimation()

    AnimationClipCreator.CreateScaleDownAnimation()

    AnimationClipCreator.CreateSuspendAnimation()

    /**
     * What I actually want at this point
     */

    this.model.createClip( anims.enter )
    this.model.createClip( anims.main )
    this.model.createClip( anims.exit )
    this.model.createClip( anims.enter )

    

    // grabbing the names (strings) of the animations
    const enterName = this.model.animNames.enter;
    const mainName = this.model.animNames.main;
    const exitName = this.model.animNames.exit;
    const nestedName = this.model.animNames?.nested;

    // string indexing an object that stores all of the constructor functions
    const enterAnimationConstructor = modelClipConstructors[ enterName ];
    const mainAnimationConstructor = modelClipConstructors[ mainName ];
    const exitAnimationConstructor = modelClipConstructors[ exitName ];
    let nestedAnimationConstructor; 
    if( nestedName ) nestedAnimationConstructor = modelClipConstructors[ nestedName ];

    // set the animationClips object to hold the AnimationClips
    // that will be returned from these functions
    this.model.animClips = {

      enter: enterAnimationConstructor(),
      main: mainAnimationConstructor({ duration: 50 }), 
      // ^changing the default duration from 1 to 50
      exit: exitAnimationConstructor(),
      nested: nestedName ? nestedAnimationConstructor!() : undefined 

    };

  };

  public addDependantProperties( camAnimations: CamAnimation[], textOfEntireLesson: string[][] ): void {

    const section = this.model.section;
    if (!section) {

      throw new Error(
        'model has not been assigned to a section, dependant properties depend on the section.'
      );

    };

    const sectionCamAnimation = camAnimations[ section ]
    const prevCamAnimation = camAnimations[ section - 1 ];
    if (!sectionCamAnimation || !prevCamAnimation) {

      throw new Error(
        "camAnimation or prevCamAnimation is falsy for this model's assigned section, dependant properties depend on camAnimation."
      );

    };

    const sectionText = textOfEntireLesson[ section ];
    const sectionHasText = sectionText.length; // boolean, no paragraphs should be an empty array NOT an empty string in the first index.

    this.model.yOffsetForText = sectionHasText ? 0.15 : 0;
    this.model.inNewPosition = sectionCamAnimation.name === 'circle-model' || null ? false : true;
    this.model.zoomInOnReverse = prevCamAnimation.name === 'zoom-out' ? true : false;

  };


  // When an animation that doesn't exist is called for, the PosRot is just all undefined
  // do we need to control for this?
  public computePosition( posRot: PosRot ): void {

    const { pos: camPos, rot: camRot, axis: rotAxis } = posRot;

    const yOffsetForText = this.model.yOffsetForText;
  
    // Define the vector that points out the front of the camera in local space
    let modelLocalPosition = new Vector3(0, 0, -1);

    const { camRotAngle, camRotVector } = getCamRotAngleAndRotVector(rotAxis, camRot);

    if ( camRot ) {

      modelLocalPosition = applyCamRotation( modelLocalPosition, camRotAngle, camRotVector );

    };

    // Add model local pos to camPos to get world pos of model:
    let modelWorldPos = camPos.add(modelLocalPosition);

    if (yOffsetForText) {

      modelWorldPos = new Vector3(modelWorldPos.x, (modelWorldPos.y + yOffsetForText), modelWorldPos.z);

    };

    this.model.position = modelWorldPos;

  };

  public async extractMeshes(): Promise<void> {

    const path = this.model.path;

    const gltf = await loadGLTF(path);

    const meshes = gltf.scene.children.filter( (child: any) => {

      return child.isMesh || ( child.isGroup && child.__removed === undefined )

    });

    this.model.meshes = meshes;

  };

  public getProduct(): Model {

    const result = this.model;
    this.reset();
    return result;

  };
}


export class ModelDirector {

  builder: ModelBuilder;

  textOfEntireLesson: string[][] | undefined;

  camAnimations: CamAnimation[] | undefined;

  posRots: PosRot[] | undefined;

  constructor( builder: ModelBuilder) {

    this.builder = builder;

  };

  resetBuilder( builder: ModelBuilder ) {

    this.builder = builder; 

  };

  addDependencies( camAnimations: CamAnimation[], textOfEntireLesson: string[][], posRots: PosRot[] ) {

    this.camAnimations = camAnimations; 
    this.textOfEntireLesson = textOfEntireLesson;
    this.posRots = posRots;

  };

  constructModel( { path, section, name, anims }: ModelDirectorConfig ) {

    if(!this.textOfEntireLesson || !this.camAnimations || !this.posRots) {

      throw new Error('dependencies have not been added. Call Director.addDependencies first');

    };

    this.builder.addPath( path );

    this.builder.assignSection( section );

    this.builder.addName( name );

    this.builder.addAnimNames( anims ); // only over-rides the nested animation, the rest (enter, main, exit) are set to their defaults

    this.builder.createAnimClips();

    this.builder.addDependantProperties( this.camAnimations, this.textOfEntireLesson );

    this.builder.computePosition( this.posRots[ section ] );

    this.builder.extractMeshes();

  };

};








// Utility Functions:

function getCamRotAngleAndRotVector( rotAxis: string | null, camRot: Euler ): RotAngleAndRotVector {

  let rotVector = new Vector3();
  let rotAngle = 0;

  switch (rotAxis) {

    case 'x':
      rotVector.setX(1);
      rotAngle = camRot.x;
      break;

    case 'y':
      rotVector.setY(1);
      rotAngle = camRot.y;
      break;

    case 'z':
      rotVector.setZ(1);
      rotAngle = camRot.z;
      break;

    default: 
      throw new Error( "Invalid rotAxis provided, must be 'x', 'y', or 'z' " );
  }

  return { camRotAngle: rotAngle, camRotVector: rotVector };

}


function applyCamRotation( modelLocalPosition: Vector3, camRotAngle: number, camRotVector: Vector3 ): Vector3 {
  // Create a new rotation matrix for the additional rotation
  const rotMatrix = new Matrix4();

  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  rotMatrix.makeRotationAxis(camRotVector.normalize(), camRotAngle); // <-- need to test if this works if rotVector = 0,0,0 and rotAngle = 0

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle of the camera's rotation
  modelLocalPosition.applyMatrix4(rotMatrix);

  return modelLocalPosition;

}


function loadGLTF(path: string): Promise<GLTF> {

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

    // (Optional) Force non-WebAssembly JS decoder (without this line, WebAssembly
    // is the default if supported).
    dracoLoader.setDecoderConfig({ type: 'js' });

    loader.setDRACOLoader(dracoLoader);

    loader.load(
      path,
      (gltf: any) => {
        // console.log('gltf', gltf);
        resolve(gltf);
      },
      (xhr: any) => {
        // console.log('loading glTF');
        // console.log((xhr.loaded / xhr.total) + 'loaded');
      },
      (error: any) => {
        console.error(error);
        reject(error);
      }
    );
  });

}

function createConfig( name: string | undefined ) {

  const modelAnimConfig = new BlankModelAnimConfig();

  switch( name ) {

    case 'scale-up':
      modelAnimConfig.iScale = new Vector3( 0, 0, 0 );
      modelAnimConfig.fScale = new Vector3( 1, 1, 1 );
      break;

    case 'scale-down':
      modelAnimConfig.iScale = new Vector3( 1, 1, 1 );
      modelAnimConfig.fScale = new Vector3( 0, 0, 0 );
      break; 

    case 'spin-y': 
      modelAnimConfig.iRot = new Euler( 0, 1, 0 );
      modelAnimConfig.fRot = new Euler( 0, Math.PI * 2, 0);
      modelAnimConfig.rotAxis = 'y';
      break;

    case 'suspend':
      modelAnimConfig.duration = 90;
      break;

    default:
      throw new Error( `Invalid animation name. no model animation with that name found. NAME: ${name}` )

  };

  return modelAnimConfig;

};


/** 
 * Notes:
 * 
 * Initializing Models Steps:
 * 
 *   Create all model positions
 * 
 *   Create Model AnimationClips
 * 
 *   Load + Extract all GLTF Meshes
 * 
 *   Set dependant properties:
 *    id?
 *    yOffsetForText:
 *    zoomInOnReverse:
 *    inNewPosition:
 *
 */