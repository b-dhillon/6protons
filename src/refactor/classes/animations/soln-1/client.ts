import { LessonBuilder } from '../../Lesson';
import { Section } from '../..//Section';
import { Camera, CamAnimation } from '../../Camera';
import { Models, ModelBuilder, ModelDirector } from '../../Model';
import { Universe } from '../../Universe';

/** 
 * Step-0. List out assets or import them as lists
*/ 
import { 
    textsOfEntireLesson, 
    musicPathsOfEntireLesson, 
    voicePathsOfEntireLesson 
} from "../client-assets"


/** 
 * Step-1: Initialize a universe:
*/ 
const universe = new Universe('fullerene-universe', 25000, 5);


/** 
 * Step-2: Instantiate and initialize camera: 
*/ 
const camera = new Camera();

camera.setStartPosition( 0, 0, 5 ); 

camera.createClip( 'zoom-in', 4 );
camera.createClip( 'zoom-out' ); // <-- add default tMag and rMag values for these animations. Overriding defaults possible, but not necessary.
camera.createClip( 'zoom-out-rotate-up' ); 
camera.createClip( 'zoom-in-rotate-down' );
camera.createClip( 'circle-model' );
camera.createClip( 'corkscrew-up' );

camera.init();

const posRots = camera.getPosRots();


/**
 * Step-4. Build models  
*/
const modelBuilder = new ModelBuilder();

const modelDirector = new ModelDirector( modelBuilder );
modelDirector.addDependencies( camera.getAnimations(), textsOfEntireLesson, posRots );



/*
constructModel( { path, assignedSection, name, anim }: ModelDirectorConfig ) {

  if(!this.textOfEntireLesson || !this.camAnimations || !this.posRots) {

    throw new Error('dependencies have not been added. Call Director.addDependencies first');

  };

  this.builder.addPath( path );

  this.builder.assignSection( section );

  this.builder.addName( name );





  this.builder.addAnimNames( anims ); // only over-rides the nested animation, the rest (enter, main, exit) are set to their defaults


  // OLD ANTI-PATTERN WAY:
  this.builder.createAnimClips();

  public createAnimClips(): void {

    if(!this.model.animNames) throw new Error('no animNames have been set');

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
    if(nestedName) nestedAnimationConstructor = modelClipConstructors[ nestedName ];

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

  // NEW FACTORY-METHOD WAY:
  this.builder.setAnimClips();

  public setAnimClips(): void {

    if( !this.model.anims ) throw new Error('no animNames have been set');


    this.model.animClips = {

      enter: this.model.createClip( anims.enter );

      main: this.model.createClip( anims.main, { duration: 50 } ) , 
      
      exit: this.model.createClip( anims.exit )

      nested: anims.nested ? this.model.createClip( anims.nested ) : undefined 

    };

  };


  this.builder.addDependantProperties( this.camAnimations, this.textOfEntireLesson );

  this.builder.computePosition( this.posRots[ section ] );

  this.builder.extractMeshes();

};
*/

modelDirector.constructModel({
  section: 0,
  path: '/fullerene/models/m0.glb',
  name: 'floating-cage',
  anims: { nested: 'suspend' },
}); const m0 = modelBuilder.getProduct();

modelDirector.constructModel({
  section: 2,
  path: '/fullerene/models/m0.glb',
  name: 'no-soccer-pattern',
  anims: {},
}); const m2 = modelBuilder.getProduct();

modelDirector.constructModel({
  section: 3,
  path: '/fullerene/models/m2.glb',
  name: 'soccer-pattern',
  anims: {},
}); const m3 = modelBuilder.getProduct();

modelDirector.constructModel({
  section: 4,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  anims: {},
}); const m4 = modelBuilder.getProduct();

modelDirector.constructModel({
  section: 5,
  path: '/fullerene/models/m3.glb',
  name: 'doped-cage',
  anims: {},
}); const m5 = modelBuilder.getProduct();

const models = new Models( [ m0, m2, m3, m4, m5 ] );

models.groupBySection( numberOfSections );


/** 
 * Step-6: Loop and instantiate sections:
*/ 
const sections: Section[] = [];

for( let i = 0; i < numberOfSections; i++ ) {

  const section = new Section({
    section: i,
    camAnimation: camAnimations[i],
    posRot: posRots[i],
    models: models.groupedBySection[i],
    text: textsOfEntireLesson[i],
    voicePath: voicePathsOfEntireLesson[i],
  }); sections[i] = section;

};

/** 
 * Step-7: Build lesson with builder: 
*/ 
const lessonBuilder = new LessonBuilder();
lessonBuilder.addTitle('Buckminsterfullerene')
             .addThumbnail("url('./lesson-thumbnails/fullerene.png')")
             .addUniverse(universe)
             .addCamera(camera)
             .setModels(models.groupedBySection)
             .setTexts(textsOfEntireLesson)
             .addMusics(musicPathsOfEntireLesson)
             .addVoices(voicePathsOfEntireLesson)
             .setSections(sections)
             .extractSections() // need to move implmentation from Lesson to LessonBuilder
;

const buckminsterfullerene = lessonBuilder.build();

export default buckminsterfullerene;





/**
 * Lesson Build Steps: 
 * 
 * 0. List out all assets or import them as lists
 * 1. Initialize a Universe
 * 2. Define all the camera animations you want to use. How you want to move through the universe.
 * 3. Instantiate and initialize Camera
 * 4. Build 3D models -- still need to create model AnimationClips
 * 5. Loop, instantiate, and initialize all Sections
 *
*/

/**
 * What are we missing? What is not initialized?
 *  
 * Re-think model animation clip construction anti-pattern
 * 
 * What about data validation for your setters/adders on your builders?
 * What about error-handling?
 * 
 * After all that, time to write tests and finish this "pro" back-end re-factor.
 * 
 * Construct lessons and push to server.
*/