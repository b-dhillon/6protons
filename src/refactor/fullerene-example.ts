
// In this file, we will use our new OOP re-factor to re-create the
// data-structure in initialized data

// Lesson Construction - Step by Step 
/*

0. List out assets or import them as lists
1. Instantiate new Lesson
2. Loop and instantiate all Sections
3. Instantiate new Camera

// Initializing Camera:
4. Create all camPosRots
5. Create Camera AnimationClips

// Initializing Models:
6. Create all model positions
7. Create Model AnimationClips
8. Load + Extract all GLTF Meshes
9. Set uninitialized properties: 
    id:
    yOffsetForText:
    zoomInOnReverse:
    inNewPosition:

*/

import { Lesson } from './classes/Lesson';
import { Section } from './classes/Section';
import { Model } from './classes/Model';
import { Camera } from './classes/Camera';
import { Vector3 } from 'three';

interface SectionConfig {
  id: number;
  camAnimation?: string;
  models?: Model[];
  text?: string[];
  voicePath?: string;
};


// 0. List out everything -- optional, allows for looping of Lesson.createSection();
const camAnimationNames = [
  'zoom-in',
  'zoom-out-rotate-up',
  'zoom-in-rotate-down',
  'circle-model',
  'none', // example of the camera not moving between sections
  'corkscrew-up',
];




const lessonModels = [
  ['path1', 'path2'], // section 0
  [ 'path3' ], // section 1
  [ 'path4', 'path5' ],
  [],
  [],
  [],
];


// 1. Instantiate a new lesson
const buckminsterfullerene = new Lesson({
  id: 'fullerene-lesson',
  title: 'Buckminsterfullerene',
  thumbnail: "url('./lessonThumbnails/fullereneTile.png')",
});


// 2. Loop and instantiate all Sections:
for( let i = 0; i < camAnimationNames.length; i++ ) {

  const section = new Section({
    id: i,
    camAnimation: camAnimationNames[i],
    models: [
      new Model({
        path: `/fullerene/models/m${i}.glb`,
      }),
    ],
  });

  buckminsterfullerene.setSections(section);
};


// 3. Set Camera startPositon, startRotation(if not 0,0,0), and animationNames
buckminsterfullerene.camera.setStartPosition( new Vector3( 0, 0, 5 ) ); 
buckminsterfullerene.camera.setStartRotation( new Vector3( 0, 0, 0 ) ); 
buckminsterfullerene.camera.setAnimationNames( camAnimationNames ); 


// 4. Create camera positions and rotations
// This method should also set camPosition and
// camRotation forEach Section and for the Lesson 
// in Lesson.camPositions and Lesson.camRotations
buckminsterfullerene.camera.createPosRots(); // This method needs to be written


// 5. Create camera AnimationClips
buckminsterfullerene.camera.createAnimationClips();


// 6. Create model positions, now that we have camera positions
// This is a side-effect. Are we sure the models on the lesson will
// be changed? We will have to make sure they are in the .createPosition method.
// using the this keyword.
buckminsterfullerene.models.forEach((sectionModels: Model[]) => {
  let firstModel = sectionModels[0];
  firstModel.createPosition();
  // This .createPosition() method needs to be written, but most of it is already done in create-model-position.ts
  // It is only called on the first model, because the method is only written for 1 model, placed in front of the camera.
});


// Last. Pull all assets out of all sections and store them
// in Lesson as lists.
// Maybe we should write a .get method for this!?
// const buckminsterfullerene.models = buckminsterfullerene.getModels();
// const buckminsterfullerene.texts = buckminsterfullerene.getTexts();
buckminsterfullerene.sections.forEach((section, i) => {
  buckminsterfullerene.models[i] = section.models;
  buckminsterfullerene.texts[i] = section.text;
  buckminsterfullerene.camera.camAnimations[i] = section.camAnimation;

  // We need to figure out camera.createCamPosRots() method first.
  // Here we .push, because the array will contain 1 item already,
  // the startPosition and startRotation
  // AND I dont think we will need to set this because 
  // these should aready be set with the original method call 
  // camera.createPosRots();
  buckminsterfullerene.camPositions.push(section.camPosition);
  buckminsterfullerene.camRotations.push(section.camRotation);
});






















