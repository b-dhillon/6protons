
// In this file, we will use our new OOP re-factor to re-create the
// data-structure in initialized data

// Lesson Construction - Step by Step 
/*
- instantiate new Lesson
- instantiate all Sections
- instantiate new Camera
- create all camPosRots
- instantiate all Models
- create all model positions
- create Camera AnimationClips
- create Model AnimationClips
- extract all GLTF Meshes
*/


import { Lesson } from './classes/Lesson';
import { Section } from './classes/Section';
import { Model } from './classes/Model';
import { Camera } from './classes/Camera';

interface SectionConfig {
  id: number;
  camAnimation?: string;
  models?: Model[];
  text?: string[];
  voicePath?: string;
}


// 0. List out everything -- optional, allows for looping of Lesson.createSection();
const camAnimations = [
  'zoom-in',
  'zoom-out-rotate-up',
  'zoom-in-rotate-down',
  'circle-model',
  'none', // example of the camera not moving between sections
  'corkscrew-up',
]; 




// 1. Instantiate a new lesson
const buckminsterfullerene = new Lesson({
  id: 'fullerene-lesson',
  title: 'Buckminsterfullerene',
  thumbnail: "url('./lessonThumbnails/fullereneTile.png')",
});

// 2. Start building your sections
buckminsterfullerene.createSection({
  id: 0,
  camAnimation: 'zoom-in',
  models: [
    new Model({
      path: '/fullerene/models/m0.glb',
    }),
  ],
});

buckminsterfullerene.createSection({
  id: 1,
  camAnimation: 'zoom-out-rotate-up',
  models: [
    new Model({
      path: '/fullerene/models/m1.glb',
    }),
  ],
});

buckminsterfullerene.createSection({
  id: 2,
  camAnimation: 'zoom-in-rotate-down',
  models: [
    new Model({
      path: '/fullerene/models/m0.glb',
    }),
  ],
});

buckminsterfullerene.createSection({
  id: 3,
  camAnimation: 'circle-model-clockwise',
  models: [
    new Model({
      path: '/fullerene/models/m2.glb',
    }),
  ],
});

buckminsterfullerene.createSection({
  id: 4,
  camAnimation: 'zoom-out',
  models: [
    new Model({
      path: '/fullerene/models/m3.glb',
    }),
  ],
});

buckminsterfullerene.createSection({
  id: 5,
  camAnimation: 'corkscrew-up',
  models: [
    new Model({
      path: '/fullerene/models/m4.glb',
    }),
  ],
});

// 3. Create camera positions and rotations
// This method should also set camPosition and
// camRotation forEach Section.
buckminsterfullerene.camera.createPosRots(); // This method needs to be written

// 4. Create camera AnimationClips
buckminsterfullerene.camera.createAnimationClips();

// 5. Create model positions, now that we have camera positions
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
  buckminsterfullerene.camPositions.push(section.camPosition);
  buckminsterfullerene.camRotations.push(section.camRotation);
});
