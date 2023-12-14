import { Lesson, LessonBuilder } from './classes/Lesson';
import { Section } from './classes/Section';
import { Camera, CamAnimation } from './classes/Camera';
import { Euler, Vector3 } from 'three';
import { Model, ModelBuilder, ModelDirector } from './classes/ModelRF';
import { Universe } from './classes/Universe';

// Step by Step Lesson Construction:
/**
 *
 * 0. List out assets or import them as lists
 * 1. Define all camAnimations: 
 * 3. Instantiate and Initialize Universe
 * 4. Instantiate and initialize Camera
 * 5. Build models -- still need to create model AnimationClips
 * 6. Loop, instantiate, and initialize all Sections
 *
*/



// 0. List out assets or import them as lists
const modelPaths = [
  ['path1'], // section 0
  ['path2'], // section 1
  ['path3', 'path4'],
  [],
  [],
  [],
];
const textsOfEntireLesson = [[], ['', ''], [''], ['', ''], [''], ['']]; // each index is textOfSection
const musicPathsOfEntireLesson = ['', ''];
const voicePathsOfEntireLesson = ['', '', '', ''];


// Step-1. Define all camAnimations: 
const camAnimations = [
  new CamAnimation('zoom-in', 4),
  new CamAnimation('zoom-out-rotate-up', 2, Math.PI / 4),
  new CamAnimation('zoom-in-rotate-down', 2, Math.PI / 4),
  new CamAnimation('circle-model', Math.PI / 2, -Math.PI / 2),
  new CamAnimation('zoom-out', 3),
  new CamAnimation('corkscrew-up', 2, Math.PI / 2),
];

// Step-2. Instantiate a universe:
const universe = new Universe('fullerene-universe', 25000, 5);


// Step-3. Instantiate and initialize camera: 
const camera = new Camera({});
camera.setStartPosition( 0, 0, 5 ); 
camera.setCamAnimations( camAnimations );
camera.init();
const posRots = camera.getPosRots();



// Step-4. Build models
/**
 * This can be looped 
 * 
 * We will need a hasModel property on the sections to determine assignedSection
 * loop fn can take in:
 *  list of paths
 *  list of names
 *  
 */
const models: Model[] = [];
const modelBuilder = new ModelBuilder();
const modelDirector = new ModelDirector( modelBuilder );
modelDirector.addDependencies( camAnimations, textsOfEntireLesson, posRots );

modelDirector.constructModel({
  assignedSection: 0,
  path: '/fullerene/models/m0.glb',
  name: 'floating-cage',
  animNames: {nested: 'suspend-in-solution'},
});
const m0 = modelBuilder.getProduct();

modelDirector.constructModel({
  assignedSection: 2,
  path: '/fullerene/models/m0.glb',
  name: 'no-soccer-pattern',
  animNames: {},
});
const m2 = modelBuilder.getProduct();

modelDirector.constructModel({
  assignedSection: 3,
  path: '/fullerene/models/m2.glb',
  name: 'soccer-pattern',
  animNames: {},
});
const m3 = modelBuilder.getProduct();

modelDirector.constructModel({
  assignedSection: 4,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  animNames: {},
});
const m4 = modelBuilder.getProduct();

modelDirector.constructModel({
  assignedSection: 5,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  animNames: {},
});
const m5 = modelBuilder.getProduct();

models.push(m0, m2, m3, m4, m5);




// Group models by section, in case some sections have multiple assigned models:
// We can move this into a method somewhere
// A section with no models will have an empty array. 
const numberOfSectionsInLesson = camAnimations.length;
const modelsBySection: Model[][] = [];
for (let i = 0; i < numberOfSectionsInLesson; i++) {
  modelsBySection.push([]);
};
for( let i = 0; i < models.length; i++ ) {
  let section = models[i].section
  modelsBySection[section].push(models[i]); 
};


// Step-6: Loop and instantiate sections:
const sections: Section[] = [];
for( let i = 0; i < camAnimations.length; i++ ) {
  const section = new Section({
    id: i,
    camAnimation: camAnimations[i],
    posRot: posRots[i],
    models: modelsBySection[i],
    text: textsOfEntireLesson[i],
    voicePath: voicePathsOfEntireLesson[i],
  });
  sections[i] = section;
};


// Step-7: Build lesson with builder: 
const lessonBuilder = new LessonBuilder();
lessonBuilder.addTitle('Buckminsterfullerene')
             .addThumbnail("url('./lesson-thumbnails/fullerene.png')")
             .addUniverse(universe)
             .addCamera(camera)
             .setModels(models)
             .setTexts(textsOfEntireLesson)
             .addMusics(musicPathsOfEntireLesson)
             .addVoices(voicePathsOfEntireLesson)
             .setSections(sections)
;
const buckminsterfullerene = lessonBuilder.getProduct();

buckminsterfullerene.extractSections();

export default buckminsterfullerene;




/**
 * What are we missing? What is not initialized?
 * 
 * .extractSections() method on lesson
 * .groupModelsBySection() method
 * 
 * id's of some objects!!!
 * 
 * potentially re-think model animation clip construction anti-pattern
 * 
 * What about data validation for your setters/adders on your builders?
 * What about error-handling 
 * 
 * After all that, time to write tests and finish this back-end re-factor.
 * 
 * Construct lessons and push to server.
 */