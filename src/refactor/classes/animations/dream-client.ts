
/**
 * Step-1: Initialize a universe:
 */
const universe = new Universe('fullerene-universe', 25000, 5);



// This should be turned into a get method on Lesson
const numberOfSections = lesson.getSectionCount();


/** 
 * Step-3: Instantiate and initialize camera: 
*/ 
const camera = new Cam({});

camera.setStartPosition( 0, 0, 5 ); 

camera.createClip( "zoom-in", 4 );

camera.createClip( "zoom-out-rotate-up", 2, Math.PI / 4 );

camera.createClip( "zoom-in-rotate-down", 2, Math.PI / 4 );

camera.createClip( "circle-model", Math.PI / 2, -Math.PI / 2 );

camera.createClip( "zoom-out", 3 );

camera.createClip( "corkscrew-up", 2, Math.PI / 2 );


camera.init(); // whatever else needs to be handled can be placed in this init function.



/**
 * Step-4. Build models
 * 
 * This can be looped 
 * 
 * We will need a hasModel property on the sections to determine assignedSection
 * loop fn can take in:
 *  list of paths
 *  list of names
 *  
*/
/**
 * There are 3 dependant properties: 
 *  1. yOffsetForText
 *  2. inNewPosition 
 *  3. zoomInOnReverse{navigation} //should change name
 * 
 * These properties are abstracted away via addDependantProperties
 */

const modelBuilder = new ModelBuilder();

const camAnimationNames = camera.getCamAnimationNames();

const textOfEntireLesson = lesson.getTextOfEntireLesson();

const posRots = camera.getPosRots();

let section;

// m0
section = 0;

modelBuilder.assignSection( section );

modelBuilder.addPath( "/fullerene/models/m0.glb" );

modelBuilder.addName( "floating-cage" );

modelBuilder.createClip( "enter", "scale-up" );
modelBuilder.createClip( "main", "spin-y" );
modelBuilder.createClip( "exit", "scale-down" );

modelBuilder.addDependantProperties( camAnimationNames, textOfEntireLesson );

modelBuilder.computePosition( posRots[ section ] );

modelBuilder.extractMeshes();

const m0 = modelBuilder.build();


// m1
section = 0;

modelBuilder.assignSection( section );

modelBuilder.addPath( "/fullerene/models/m0.glb" );

modelBuilder.addName( "no-soccer-pattern" );

modelBuilder.createClip( "enter", "scale-up" );
modelBuilder.createClip( "main", "spin-y" );
modelBuilder.createClip( "exit", "scale-down" );

modelBuilder.addDependantProperties( camAnimationNames, textOfEntireLesson );

modelBuilder.computePosition( posRots[ section ] );

modelBuilder.extractMeshes();

const m1 = modelBuilder.build();

// m2
section = 1;

modelBuilder.assignSection( section );

modelBuilder.addPath( "/fullerene/models/m0.glb" );

modelBuilder.addName( "no-soccer-pattern" );

modelBuilder.createClip( "enter", "scale-up" );
modelBuilder.createClip( "main", "spin-y" );
modelBuilder.createClip( "exit", "scale-down" );

modelBuilder.addDependantProperties( camAnimationNames, textOfEntireLesson );

modelBuilder.computePosition( posRots[ section ] );

modelBuilder.extractMeshes();

const m2 = modelBuilder.build();


// Group models by section, in case you want multiple models per section in the future:
const models = new Models( [ m0, m1, m2 ] );
models.groupBySection( numberOfSections );



/** 
 * Step-6: Loop and instantiate sections:
*/ 
const sections: Section[] = [];

for( let i = 0; i < numberOfSections; i++ ) {

  const section = new Section({
    section: i,
    camAnimation: camAnimations[ i ], // What's the point of this again?
    posRot: posRots[ i ],
    models: models.groupedBySection[ i ],
    text: textsOfEntireLesson[ i ],
    voicePath: voicePathsOfEntireLesson[ i ],
  }); 
  
  sections[ i ] = section;

};



/** 
 * Step-7: Build lesson with builder: 
*/ 
const lessonBuilder = new LessonBuilder();

lessonBuilder.addTitle( "Buckminsterfullerene" )

             .addThumbnail( "url('./lesson-thumbnails/fullerene.png')" )

             .addUniverse( universe )

             .addCamera( camera )

             .setModels( models.groupedBySection )

             .setTexts( textsOfEntireLesson )

             .addMusics( musicPathsOfEntireLesson )

             .addVoices( voicePathsOfEntireLesson )

             .setSections( sections )

             .extractSections() // need to move implmentation from Lesson to LessonBuilder
;


const buckminsterfullerene = lessonBuilder.build();
