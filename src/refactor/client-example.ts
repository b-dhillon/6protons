
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

import { Lesson, LessonBuilder } from './classes/Lesson';
import { Section } from './classes/Section';
import { Model } from './classes/Model';
import { Camera, CamAnimation } from './classes/Camera';
import { Euler, Vector3 } from 'three';
import { ModelBuilder, ModelDirector } from './classes/ModelRF';





// 0. List out assets -- optional, allows for looping of Lesson.createSection();
//    Each index corresponds to a section:

const camAnimations = [
  new CamAnimation( 'zoom-in', 4 ),
  new CamAnimation( 'zoom-out-rotate-up', 2, Math.PI/4 ),
  new CamAnimation( 'zoom-in-rotate-down', 2, Math.PI/4 ),
  new CamAnimation( 'circle-model', Math.PI/2, -Math.PI/2 ),
  new CamAnimation( 'zoom-out', 3 ),
  new CamAnimation( 'corkscrew-up', 2, Math.PI/2 )
]

const modelPaths = [
  [ 'path1' ], // section 0
  [ 'path2' ], // section 1
  [ 'path3', 'path4' ],
  [],
  [],
  [],
];

const paragraphs = [
  [],
  [],
  [],
  [],
  [],
  []
]

const voicePaths = [
  [],
  [],
  [],
  [],
  [],
  []
]

















// 1. Instantiate a new lesson
const lesson = new Lesson({
  id: 'fullerene-lesson',
  title: 'Buckminsterfullerene',
  thumbnail: "url('./lesson-thumbnails/fullerene.png')",
});

////////////////////////////
////// Lesson Builder //////
////////////////////////////

const lessonBuilder = new LessonBuilder();

lessonBuilder.addTitle('')
             .addThumbnail('')
             .addUniverse()
             .addCamera()
             .addModels()
             .addText()
             .addMusic()
             .addVoices()

             
      

// 2. Loop and instantiate all Sections:
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

for( let i = 0; i < camAnimations.length; i++ ) {

  const section = new Section({
    id: i,
    camAnimation: camAnimations[i],
  });

  lesson.addSection(section);
};


// 3. Set Camera startPositon, startRotation(if not 0,0,0).
lesson.camera.setStartPosition( 0, 0, 5 ); 
lesson.camera.setStartRotation( 0, 0, 0 ); 


// 4. Initialize camera:
// This method should also set camPosition and <---- Still need to implement this side-effect
// camRotation forEach Section
lesson.camera.createPosRots();
lesson.camera.createAnimationClips();


/////////////////////// 
//      MODELS       //
///////////////////////
// lesson.camera.camAnimations and lesson.texts need to be initialized before this point
const modelBuilder = new ModelBuilder();
const modelDirector = new ModelDirector( modelBuilder );

modelDirector.constructModel({
  path: 'my/path',
  assignedSection: 0,
  name: 'myName',
  animNames: {nested: 'suspend-in-solution'},
  sections: lesson.sections, 
  posRot: lesson.camera.posRots[modelBuilder.model.section]
});
const m0 = modelBuilder.getProduct();

modelBuilder.reset();
modelDirector.constructModel({
  path: 'my/path',
  assignedSection: 1,
  name: 'myName',
  animNames: {nested: 'suspend-in-solution'},
  sections: lesson.sections, 
  posRot: lesson.camera.posRots[modelBuilder.model.section]
});
const m1 = modelBuilder.getProduct();


// or no director: 
// need to return this for all of these methods:
modelBuilder.assignSection(0)
            .addPath('')
            .addName('')
            .addAnimNames({nested: 'suspend-in-solution'})
            .addDependantProperties(lesson.sections)
            .computePosition( lesson.camera.posRots[modelBuilder.model.section] )
            .extractMeshes()
;
const m00 = modelBuilder.getProduct();

modelBuilder.reset();

modelBuilder.assignSection(1)
            .addPath('')
            .addName('')
            .addAnimNames({})
            .addDependantProperties(lesson.sections)
            .computePosition( lesson.camera.posRots[modelBuilder.model.section] )
            .extractMeshes()
;

const m01 = modelBuilder.getProduct();










































// OLD WAY WITHOUT BUILDER PATTERN:

// 6. Create model positions, now that we have camera positions
// This is a side-effect. Are we sure the models on the lesson will
// be changed? We will have to make sure they are in the .createPosition method.
// using the this keyword.
lesson.models.forEach((sectionModels: Model[]) => {
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
lesson.sections.forEach((section, i) => {
  lesson.models[i] = section.models;
  lesson.texts[i] = section.text;
});






















