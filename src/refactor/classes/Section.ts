/** GOAL
 * I want to try to organize everything inside a lesson by section
 * Why:
 *  This is likely how I will conceptulize lessons inside my head, section by section
 *  It will allow us to create a cleaner data structure, one that is organized by
 *  a stack of sections that the user navigates through --> But for camera animations
 *  the user will still be navigating through a stack of AnimationActions
 * 
 * And it also allows us to still have the list of everything in a Lesson 
 * by just iterating over sections and pulling out whatver we need. 
 * We can write .get() and .set() methods for this!
 */

import { Vector3 } from 'three';
import { Model } from './ModelRF';
import { PosRot } from './Camera';


type CamAnimation = {
  name: string;
  tMag: number;
  rMag: number;
};

type SectionConfig = {
  id: number;
  camAnimation?: CamAnimation;
  posRot: PosRot;
  models?: Model[];
  text?: string[];
  voicePath?: string;
}



export class Section {
  id: number;
  camAnimation: CamAnimation | undefined;
  posRot: PosRot;
  models: Model[];
  text: string[];
  voicePath: string;

  constructor({
    id,
    camAnimation,
    posRot,
    models = [],
    text = [],
    voicePath = '',
  }: SectionConfig) {
    this.id = id;
    this.camAnimation = camAnimation; 
    this.posRot = posRot;
    this.models = models;
    this.text = text;
    this.voicePath = voicePath;
  };

}


// Section Factory Notes:
// This factory would be called in the fullerene-example.ts
  /*
    To make this more extendable, we can turn this into a 
    SectionFactory that can create different types of sections
    For now, we will just have a factory with one section, DefaultSection
    but in the future we can have different kinds of section like 
    InteractiveSection or etc... 
  */
/*

class SectionFactory {
  createDefaultSection( self: any, config: DefaultSectionConfig ) {
    const section = new Section( config );
    return section;
  }

  createInteractiveSection( self: any, config: InteractiveSectionConfig ) {
    const section = new Section( config );
    return section;
  }
}
const s0 = SectionFactory.createDefaultSection({ }: SectionConfig)
buckminsterfullerene.sections.push( s0 )

// or use a Factory Function instead of a class:

interface Section {
  // section variables and methods
}

class InteractiveSection implements Section {
  // must have same variables and methods 
  // but the variables can have different values 
  // and the methods can have different definitions
}

createSection( config: SectionConfig ) {
  let section;

  switch (config.sectionType) {
    case'interactive-section': 
      section = new InteractiveSection(config)

    default: 'default-section'
      section = new DefaultSection(config)
  }

  this.sections.push(section)
};

*/