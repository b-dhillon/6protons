import { ThreePage } from './classes/ThreePage';
import { Lesson } from './classes/Lesson';
import { Section } from './classes/Section';
import { Model } from './classes/Model';
import { Vector3 } from 'three';
import { Camera } from './classes/Camera';

// This file will represent an example of us building a lesson.
const diamond = new Lesson({
  id: 'diamondLesson',
  title: 'Diamonds',
  thumbnail: './my/path',
});



/////////////////////// 
// SECTIONS
///////////////////////

// Section properties:
  // id: number | undefined;
  // camPosition: Vector3 | undefined; <-- When and where do we set this?
  // camRotation: Vector3 | undefined; <-- When and where do we set this?
  // camTransition: string; <-- Is this needed? If so, when/where do we set? Why would it not be needed?
  
  // models: Model[];
  // text: string[];
  // voicePath: string;


diamond.sections = Array.from( {length: 5}, (_, i) => new Section({id: i}) );

// or

interface SectionConfig {
  camAnimation: string;
  model: Model;
  text: string[];
  voicePath: string;
}

diamond.createSection({
  id: 0,
  camAnimation: 'circle-model',
  models: [
    new Model({
      name: '',
      path: '',
      animations: {}
    })
  ],
  text: [''],
  voicePath: ''
});


// Once all sections are created, we can pull out everything 
// from each section pretty easily with this data architecture:
const models = diamond.sections.map( (section) => section.models );
const texts = diamond.sections.map( (section) => section.text );
const camPositions = diamond.sections.map( (section) => section.camPosition );
const camRotations = diamond.sections.map( (section) => section.camRotation );

// or with just 1 loop:

let models = [];
let texts = [];
let camPositions = [];
let camRotations = []; 
let camAnimations = [];

diamond.sections.forEach( (section, i) => {
  models[i] = section.models
  texts[i] = section.text
  camPositions[i] = section.camPosition
  camRotations[i] = section.camRotation
  diamond.camera.camAnimations[i] = section.camAnimation
});


















/////////////////////// 
// CAMERA
///////////////////////
diamond.camera = new Camera({
  startPosition: new Vector3(0, 0, 5),
});
// Do animationNames have to be strings? They can just be functions that take arguments and return AnimationClips 


// initializing camera
diamond.camera.createCameraPosRots(); // STILL NEED TO WRITE THIS METHOD
diamond.camera.createAnimationClipConfigs();
diamond.camera.createAnimationClips(); // STILL NEED TO WRITE THIS METHOD




// initializing models
// 1. Load and Extract Meshes
// 2. Create positions
// 3. Create animation clips
const initializedModels = models.map( (model, section) => {
  const meshes = model.extractMeshes();
  model.addMeshes( meshes  )
  model.createPosition( sections[ section ].cameraPosition ) // STILL NEED TO WRITE THIS METHOD
  model.createAnimationClips();
});






 