import { Euler, Matrix4, Mesh, Vector3 } from 'three';
import { Section } from './Section';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

type AnimNames__Model = {
  enter?: string;
  main?: string;
  exit?: string;
  nested?: string;
};

type PosRot = {
  pos: Vector3;
  rot: Euler;
  axis: string | null;
};

export class Model {
  id: number | undefined; // will be initialized in init, with a loop: id = i --> model0, model1, model2
  section!: number;
  name: string | undefined; // will be initialized in init, with a loop model${i} --> model0, model1, model2
  path!: string; // initialized with constructor

  visible: boolean = false;
  scale: number = 1; // initialized with constructor, defaulted to 1

  animNames: AnimNames__Model | undefined;

  position: Vector3 | undefined;
  rotation: Euler = new Euler(0, 0, 0);

  inNewPosition: boolean | undefined;
  yOffsetForText: number = 0;
  zoomInOnReverse: boolean | undefined;

  constructor() {}
}

















interface Builder {
  addPath(path: string): void;
  assignSection(section: number): void;
  addName(name: string): void;
  addAnimNames(animNames: AnimNames__Model): void;
  addDependantProperties(section: Section[]): void;
  computePosition(posRot: PosRot): void;
  extractMeshes(): void;
}

export class ModelBuilder implements Builder {
  model!: Model;

  constructor() {
    this.reset();
  }

  reset(): void {
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

  public addAnimNames(animNames: AnimNames__Model = {}): void {
    const defaultAnimNames = {
      enter: 'scale-up',
      main: 'rotate',
      exit: 'scale-down',
      nested: '',
      ...animNames, // over-rides any defaults
    };

    this.model.animNames = defaultAnimNames;
  }

  public addDependantProperties(sections: Section[]): void {
    const section = this.model.section;
    if (!section) {
      throw new Error(
        'model has not been assigned to a section, dependant properties depend on the section.'
      );
    }
    const sectionCamAnimation = sections[section].camAnimation;
    const prevCamAnimation = sections[section - 1].camAnimation;
    if (!sectionCamAnimation || !prevCamAnimation) {
      throw new Error(
        "camAnimation or prevCamAnimation is falsy for this model's assigned section, dependant properties depend on camAnimation."
      );
    }
    const sectionText = sections[section].text;
    const sectionHasText = sectionText.length; // boolean, no paragraphs should be an empty array NOT an empty string in the first index.

    // yOffsetForText
    this.model.yOffsetForText = sectionHasText ? 0.15 : 0;

    // inNewPosition
    this.model.inNewPosition = sectionCamAnimation.name === 'circle-model' || null ? false : true;

    // zoomInOnReverse
    this.model.zoomInOnReverse = prevCamAnimation.name === 'zoom-out' ? true : false;
  };



  // When an animation that doesn't exist is asked for, the PosRot is just all undefined
  // do we need to control for this?
  public computePosition(posRot: PosRot): void {

    const { pos: camPos, rot: camRot, axis: rotAxis } = posRot;
    const yOffsetForText = this.model.yOffsetForText;
  
    // Define the vector that points out the front of the camera in local space
    let modelLocalPosition = new Vector3(0, 0, -1);

    // Define a rotation vector for the rotation around the specified axis
    const { camRotAngle, camRotVector } = getCamRotAngleAndRotVector(rotAxis, camRot);

    if (camRotAngle) {
      modelLocalPosition = applyCamRotation( modelLocalPosition, camRotAngle, camRotVector );
    };

    // Add model local pos to camPos to get world pos of model:
    let modelWorldPos = camPos.add(modelLocalPosition);
    if (yOffsetForText) {
      modelWorldPos = new Vector3(modelWorldPos.x, (modelWorldPos.y + yOffsetForText), modelWorldPos.z);
    };

    this.model.position = modelWorldPos;
  };



  // better to extract meshes for each gltf as the models get created
  // instead of doing it all at once 
  // this will be better because not each section will have a Model. 
  // when we do everything all at once it is based on a tripple loop gltf --> pageGLTFs --> allPageGLTF's
  // that assumes all sections have models
  public async extractMeshes(): Promise<Mesh[]> {
    const path = this.model.path;
    const gltf = await loadGLTF(path);

    const meshes: Mesh[] = gltf.scene.children.filter(
      (child: any) =>
        child.isMesh || (child.isGroup && child.__removed === undefined)
    );

    return meshes;
  }



  public getProduct(): Model {
    const result = this.model;
    this.reset();
    return result;
  }
}















type ModelDirectorConfig = {
  path: string, 
  assignedSection: number, 
  name: string,
  animNames: AnimNames__Model,
  posRot: PosRot
};

export class ModelDirector {

  builder: ModelBuilder;
  sections: Section[];

  constructor( builder: ModelBuilder, sections: Section[] ) {
    this.builder = builder;
    this.sections = sections;
  }

  resetBuilder( builder: ModelBuilder ) {
    this.builder = builder; 
  }

  constructModel( { path, assignedSection, name, animNames, posRot }: ModelDirectorConfig ) {
    this.builder.addPath(path);
    this.builder.assignSection(assignedSection);
    this.builder.addName(name);
    this.builder.addAnimNames(animNames); // only over-rides the nested animation, the rest (enter, main, exit) are set to their defaults
    this.builder.addDependantProperties( this.sections );
    this.builder.computePosition( posRot );
    this.builder.extractMeshes();
  }
}








type RotAngleAndRotVector = {
  camRotAngle: number;
  camRotVector: Vector3;
};
// Utility Functions:

function getCamRotAngleAndRotVector(
  rotAxis: string | null,
  camRot: Euler
): RotAngleAndRotVector {
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


function loadGLTF(path: string) {
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