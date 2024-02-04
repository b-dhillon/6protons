/**
 * Do I make animations configurable? Or should I just make a new animation everyime I need one?
 * 
 * i.e. 
 * Do I make circle-model configurable to circle any amount
 * or If I need to circle model more than quarter, I just make another animation called
 * "half-circle"
 * 
 * 
 * No configs can make writing the code quicker and nicer, the client just has to define animations by their names.
 * 
 * But,
 * 
 * As animations scale, we might clutter the animation name-space quickly with a bunch of variations of the same animation.
 * 
 * ...I'm leaning towards just strings for now...thinknig if I can make it optionally configurable to make it future proof
 */



/**
 * Step-1: Initialize a universe:
 */
const universe = new Universe( "fullerene-universe", 25000, 5 );


const numberOfSections = lesson.getSectionCount();


/** 
 * Step-3: Instantiate and initialize camera: 
*/ 
const camera = new Cam({});



camera.setStartPosition( 0, 0, 5 ); 

const camAnims = [
  { main: "zoom-in", config: { tMag: 4 } },

  { main: "zoom-out-rotate-up", config: { tMag: 2, rMag: Math.PI / 4 } },

  { main: "zoom-in-rotate-down", config: { tMag: 4 } },

  { main: "circle-model", config: { tMag: Math.PI / 2, rMag: -Math.PI / 2 } },

  { main: "zoom-out", config: { tMag: 3 } },

  { main: "corkscrew-up", config: { tMag: 2, rMag: Math.PI / 2 } },
]
// or 

const camAnims = [

  { section: 0, name: "zoom-in" },
  { section: 1, name: "zoom-out-rotate-up" },
  { section: 2, name: "zoom-in-rotate-down" },
  { section: 3, name: "circle-cw" },
  { section: 4, name: "zoom-out" },
  { section: 5, name: "corkscrew-up" },
  { section: 6, name: "" } // example if camera doesn't move between sections 

]

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
const modelDirector = new ModelDirector( modelBuilder );

const camAnimationNames = camera.getCamAnimationNames();
const textOfEntireLesson = lesson.getTextOfEntireLesson();
const posRots = camera.getPosRots();

modelDirector.addDependencies( camAnimationNames, textsOfEntireLesson, posRots );

modelDirector.constructModel({
  section: 0,
  path: "/fullerene/models/m0.glb",
  name: "floating-cage",
  anims: [
    { enter: "scale-in" }, 
    { main: "spin-y" }, 
    { exit: "scale-out" }, 
    { nested: "suspend-in-solution" }, 
  ]
});

// or

modelDirector.constructModel({
  section: 0,
  path: "/fullerene/models/m0.glb",
  name: "floating-cage",
  anims: {
    enter: "scale-up",
    main: "spin-y",
    exit: "scale-down",
    nested: "suspend-in-solution"
  }
});


// ^ behind the scenes, the anims are turned into keyframes with .createClip or something.
  
const m0 = modelBuilder.getProduct();


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
