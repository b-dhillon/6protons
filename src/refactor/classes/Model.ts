import { ModelAnimNamesConfig, ModelAnimNames, ModelAnimConfig, RotAngleAndRotVector, ModelDirectorConfig, PosRot } from "../types"
import { AnimationClip, Euler, Matrix4, Object3D, Vector3 } from 'three';
import { ClipCreator } from '../clip-creator';
import { SimpleRotateStrategy, SimpleScaleStrategy, SuspendStrategy } from "../keyframes-strategy";
import { CamAnimation } from "./Cam";



class Anims {

  enter: { name?: string, config?: ModelAnimConfig | null , clip?: AnimationClip | null } = {};
  exit: { name?: string, config?: ModelAnimConfig | null , clip?: AnimationClip | null } = {};
  main: { name?: string, config?: ModelAnimConfig | null , clip?: AnimationClip | null } = {};
  nested: { name?: string, config?: ModelAnimConfig | null , clip?: AnimationClip | null } = {};

  constructor() {}

};

export class Model {

  private static _lastId = 0;
  
  constructor() {

    this.id = Model._lastId++;
    this.anims = new Anims();

  };
  
  readonly id: number;

  section: number | undefined;

  name: string | undefined;

  path!: string;

  visible: boolean = false;

  scale: number = 1;  

  anims: Anims;
    
  meshes: Object3D[] | undefined | any;

  position: Vector3 | undefined;
  
  rotation: Euler = new Euler( 0, 0, 0 );

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

  public groupBySection( numberOfSectionsInLesson: number ): void {

    const modelsBySection: Model[][] = [];

    for (let i = 0; i < numberOfSectionsInLesson; i++) {
      modelsBySection.push([]);
    };

    for( let i = 0; i < this.models.length; i++ ) {

      let section = this.models[i].section;

      if ( section === undefined ) throw new Error(
        "Model has not been assigned to a section. Cannot groupBySection if no section assigned. Please call builder.assignSection first."
      );

      else modelsBySection[ section ].push( this.models[i] ); 

    };
    
    this.groupedBySection = modelsBySection;

  };
  
};





interface IModelBuilder {

  addPath( path: string ): void;

  assignSection( section: number ): void;

  addName( name: string ): void;

  addAnimNames( animNames: ModelAnimNamesConfig ): void;

  createAnimConfigs( animNames: ModelAnimNames | undefined ): any;

  createAnimClips(): void;

  addDependantProperties( camAnimations: CamAnimation[], textOfEntireLesson: string[][] ): void;

  computePosition( posRot: PosRot ): void;

  // extractMeshes(): void;

};



export class ModelBuilder implements IModelBuilder {

  model!: Model;


  constructor() {

    this.reset();

  };


  public reset(): void {

    this.model = new Model();

  };


  public addPath( path: string ): ModelBuilder {

    this.model.path = path;
    return this

  };


  public assignSection( section: number ): void {

    this.model.section = section;

  };


  public addName( name: string ): void {

    this.model.name = name;

  };


  public addAnimNames( animNames: ModelAnimNamesConfig = {} ): void {

    const names = {
      enter: "scale-up",
      main: "spin-y",
      exit: "scale-down",
      nested: "",
      ...animNames, // over-rides the hard-coded defaults
    };

    this.model.anims.enter.name = names.enter;
    this.model.anims.main.name = names.main;
    this.model.anims.exit.name = names.exit;
    this.model.anims.nested.name = names.nested;

  };


  // Experimental:
  public createAnimConfigs() {

    const iPos = this.model.position;
    const iRot = this.model.rotation;


    // Experimental: 
    this.model.anims.enter.config = createConfig( this.model.anims.enter.name );
    this.model.anims.main.config = createConfig( this.model.anims.main.name );
    this.model.anims.exit.config = createConfig( this.model.anims.exit.name );
    this.model.anims.nested.config = createConfig( this.model.anims.nested.name );


    function createConfig( animName: string | undefined ): ModelAnimConfig | null {

      let initial; 
      let final;
      let config;
    
      switch( animName ) {
    
        case "scale-up":
  
          initial = new Vector3( 0, 0, 0 );
          final = new Vector3( 1, 1, 1 );
          
          config = { initial: initial, final: final, animName: animName, keyframeStrategy: new SimpleScaleStrategy() }
  
        return config;
      
    
        case "scale-down":
  
          initial = new Vector3( 1, 1, 1 );
          final = new Vector3( 0, 0, 0 );

          config = { initial: initial, final: final, animName: animName, keyframeStrategy: new SimpleScaleStrategy() }
  
        return config;
    
  
        case "spin-y": 
  
          initial = new Euler( 0, 1, 0 );
          final = new Euler( 0, Math.PI * 2, 0);

          config = { initial: initial, final: final, animName: animName, keyframeStrategy: new SimpleRotateStrategy() }
  
        return config;
    
  
        case "suspend":
  
          config = { iPos: iPos, iRot: iRot, animName: animName, keyframeStrategy: new SuspendStrategy() }
  
        return config

        case "":
          return null;
    
  
        default:
          throw new Error( `Invalid animation name. No model animation with that name found. NAME: ${ animName }` )
    
      };
    
    };

  };



  public addDependantProperties( camAnimations: CamAnimation[], textOfEntireLesson: string[][] ): void {

    const section = this.model.section;

    if ( section === undefined ) {

      throw new Error(
        'model has not been assigned to a section, dependant properties depend on the section.'
      );

    };

    const sectionText = textOfEntireLesson[ section ];
    const sectionHasText = sectionText.length; // boolean, no paragraphs should be an empty array NOT an empty string in the first index.
    this.model.yOffsetForText = sectionHasText ? 0.15 : 0;



    const sectionCamAnimation = camAnimations[ section ];
    let prevCamAnimation;

    if ( section > 0 ) prevCamAnimation = camAnimations[ section - 1 ]
    else prevCamAnimation = null;

    if ( !sectionCamAnimation ) {

      throw new Error(
        "sectionCamAnimation is falsy for this model's assigned section, dependant properties depend on camAnimation."
      );

    };


    this.model.inNewPosition = sectionCamAnimation.name === "circle-cw" || null ? false : true;

    if ( prevCamAnimation === null ) this.model.zoomInOnReverse = false
    else this.model.zoomInOnReverse = prevCamAnimation.name === "zoom-out" ? true : false;

  };


  // When an animation that doesn't exist is called for, the PosRot is just all undefined
  // do we need to control for this?
  public computePosition( posRot: PosRot ): void {

    const { pos: camPos, rot: camRot, axis: rotAxis } = posRot;

    const yOffsetForText = this.model.yOffsetForText;
  
    // Define the vector that points out the front of the camera in local space
    let modelLocalPosition = new Vector3(0, 0, -1);


    if ( rotAxis !== null ) {

      const { camRotAngle, camRotVector } = getCamRotAngleAndRotVector( rotAxis, camRot );

      if ( camRot ) {
  
        modelLocalPosition = applyCamRotation( modelLocalPosition, camRotAngle, camRotVector );
  
      };

    }


    // Add model local pos to camPos to get world pos of model:
    let modelWorldPos = camPos.add( modelLocalPosition );


    if ( yOffsetForText ) {

      modelWorldPos = new Vector3( modelWorldPos.x, (modelWorldPos.y + yOffsetForText), modelWorldPos.z );

    };

    this.model.position = modelWorldPos;

  };
  

  // Creates AnimationClips based on animNames that are set when Model is instantiated
  public createAnimClips(): void {


    // Experimental:
    const enterConfig = this.model.anims.enter.config
    const mainConfig = this.model.anims.main.config
    const exitConfig = this.model.anims.exit.config
    const nestedConfig = this.model.anims.nested.config

    // this should be handled with a setter: setAnims()
    this.model.anims.enter.clip = enterConfig ? ClipCreator.createClip( enterConfig ) : null;

    this.model.anims.main.clip = mainConfig ? ClipCreator.createClip( mainConfig ) : null;

    this.model.anims.exit.clip = exitConfig ? ClipCreator.createClip( exitConfig ) : null;

    this.model.anims.nested.clip = nestedConfig ? ClipCreator.createClip( nestedConfig ) : null;
    

  };


  // public async extractMeshes(): Promise<any> {

    // const path = this.model.path;

    // this.model.meshes = "NEED FETCH FOR GLTF LOADER"

    // return new Promise( async( resolve, reject ) => {

    //   try {
  
    //     const gltf = await loadGLTF( path );
    
    //     const meshes = gltf.scene.children.filter( (child: any) => {
    
    //       return child.isMesh || ( child.isGroup && child.__removed === undefined )
    
    //     });
    
    //     console.log("Setting mesh!");
    //     this.model.meshes = meshes;
    //     console.log("MESH", this.model.meshes);

    //     resolve(meshes);
    //     return meshes;
  
    //   }
  
    //   catch(e) {

    //     this.model.meshes = e
    //     reject( e );

    //   }

    // })


  // };


  public getProduct(): Model {

    const result = this.model;
    this.reset();
    return result;

  };

};



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


  async constructProduct( { path, section, name, animNames }: ModelDirectorConfig ) {

    if(!this.textOfEntireLesson || !this.camAnimations || !this.posRots) {

      throw new Error('dependencies have not been added. Call Director.addDependencies first');

    };

    this.builder.addPath( path );

    this.builder.assignSection( section );

    this.builder.addName( name );

    this.builder.addAnimNames( animNames );

    this.builder.addDependantProperties( this.camAnimations, this.textOfEntireLesson );
    
    this.builder.computePosition( this.posRots[ section ] );

    // needs to be called after compute position because this function depends on the iPos and iRot 
    // of our model that is the output of compute position. It needs this for the Suspend animation.
    this.builder.createAnimConfigs();

    this.builder.createAnimClips();

    // this.builder.extractMeshes();
    // const meshes = await this.builder.extractMeshes();

  };

};




// Utility Functions:
function getCamRotAngleAndRotVector( rotAxis: string | null, camRot: Euler ): RotAngleAndRotVector {

  let rotVector = new Vector3();
  let rotAngle = 0;

  switch (rotAxis) {

    case "x":
      rotVector.setX(1);
      rotAngle = camRot.x;
    break;

    case "y":
      rotVector.setY(1);
      rotAngle = camRot.y;
    break;

    case "z":
      rotVector.setZ(1);
      rotAngle = camRot.z;
    break;

    default: 
      console.log( `Rotation Axis: ${ rotAxis }` ); // null
      throw new Error( "Invalid rotAxis provided, must be 'x', 'y', or 'z' " );
  }

  return { camRotAngle: rotAngle, camRotVector: rotVector };

};


function applyCamRotation( modelLocalPosition: Vector3, camRotAngle: number, camRotVector: Vector3 ): Vector3 {

  // Create a new rotation matrix for the additional rotation
  const rotMatrix = new Matrix4();

  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  rotMatrix.makeRotationAxis( camRotVector.normalize(), camRotAngle ); // <-- need to test if this works if rotVector = 0,0,0 and rotAngle = 0

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle of the camera's rotation
  modelLocalPosition.applyMatrix4( rotMatrix );

  return modelLocalPosition;

};


/*

function loadGLTF( path: string ): Promise<GLTF> {

  return new Promise((resolve, reject) => {

    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

    // (Optional) Force non-WebAssembly JS decoder (without this line, WebAssembly
    // is the default if supported).
    dracoLoader.setDecoderConfig({ type: 'js' });

    loader.setDRACOLoader( dracoLoader );

    loader.load(
      path,
      (gltf: any) => {
        console.log('gltf loaded');
        resolve( gltf );
      },
      (xhr: any) => {
        console.log('loading glTF');
        console.log((xhr.loaded / xhr.total) + 'loaded');
      },
      (error: any) => {
        console.log('gltf FAILED');
        console.error(error);
        reject(error);
      }
    );

  });

};

*/



/*

function createAnimClips() {

  if( !this.model.animNames ) this.addAnimNames();
  if( !this.model.animNames ) this.addAnimNames();


  grabbing the names of the animations
  const enterName = this.model.animNames.enter;
  const mainName = this.model.animNames.main;
  const exitName = this.model.animNames.exit;
  const nestedName = this.model.animNames?.nested;


  // string indexing an object that stores the constructor functions
  const createEnterClip = enterName ? modelClipCreators[ enterName ] : () => undefined;
  const createMainClip = mainName ? modelClipCreators[ mainName ] : () => undefined;
  const createExitClip = exitName ? modelClipCreators[ exitName ] : () => undefined;
  const createNestedClip = nestedName ? modelClipCreators[ nestedName ] : () => undefined;

  // set the animationClips object to hold the AnimationClips
  // that will be returned from these functions
  this.model.animClips = {

    enter: createEnterClip(),
    main: mainName === "suspend" ? createMainClip( config ) : createMainClip(), 
    exit: createExitClip(),
    nested: createNestedClip()

  };
  
};

*/



// Model Animation Configs graveyard:
/*

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











/** 
 * Notes:
 * 
 * Initializing Models Steps:
 * 
 *   Create all model positions
 * 
 *   Create Model AnimationClips
 *   
 *   Set dependant properties:
 *    id?
 *    yOffsetForText:
 *    zoomInOnReverse:
 *    inNewPosition:
 *
 */