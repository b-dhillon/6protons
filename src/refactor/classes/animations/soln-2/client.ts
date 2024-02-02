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

CameraClipFactory.createClip( 'zoom-in', 4 );
CameraClipFactory.createClip( 'zoom-out' ); // <-- add default tMag and rMag values for these animations. Overriding defaults possible, but not necessary.
CameraClipFactory.createClip( 'zoom-out-rotate-up' ); 
CameraClipFactory.createClip( 'zoom-in-rotate-down' );
CameraClipFactory.createClip( 'circle-model' );
CameraClipFactory.createClip( 'corkscrew-up' );

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

  // NEW ABSTRACT FACTORY-METHOD WAY:
  this.builder.setAnimClips();

  public setAnimClips(): void {

    if( !this.model.anims ) throw new Error('no animNames have been set');


    this.model.animClips = {

      enter: ModelClipFactory.createClip( anims.enter );

      main: ModelClipFactory.createClip( anims.main, { duration: 50 } ) , 
      
      exit: ModelClipFactory.createClip( anims.exit )

      nested: anims.nested ? ModelAnimationFactory.createClip( anims.nested ) : undefined 

    };

  };


  this.builder.addDependantProperties( this.camAnimations, this.textOfEntireLesson );

  this.builder.computePosition( this.posRots[ section ] );

  this.builder.extractMeshes();

};
*/