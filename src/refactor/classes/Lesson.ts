import { ThreePage } from './ThreePage';
import { Section } from './Section';
import { Model } from './ModelRF';
import { Camera } from './Camera'
import { Universe } from './Universe'



/**
  perhaps we should change this from a string to an object:

  class TextOfSection {

    id: number // sectionIter
    p1: [ sentence, sentence, sentence ]
    p2: [ sentence, sentence, sentence ]
    p3: [ sentence, sentence, sentence ]

    constructor(){}

    paragraphToSentences(paragraph: string): string[] {
     const sentences = paragraph.split( '.' )  
    }
  } 
 */

type TextOfSection = string[];


export class Lesson extends ThreePage {
  constructor(){ super(); };

  thumbnail: string | undefined;
  sections: Section[] = [];
  textOfEntireLesson: TextOfSection[] = [];
  musicPathsOfEntireLesson: string[] = [];
  voicePathsOfEntireLesson: string[] = [];
  
  public extractSections(): void {
    this.sections.forEach( (section: Section) => {
      this.textOfEntireLesson.push(section.text);
      this.voicePathsOfEntireLesson.push(section.voicePath);
      this.modelsOfEntirePage.push(section.models)
    });
  };
};

interface ILessonBuilder {
  addTitle(title: string): void;
  addThumbnail(thumbnail: string): void;
  addUniverse(universe: Universe): void;
  addSection(section: Section): void;
  addCamera(camera: Camera): void;
  addModel(model: Model[]): void;
  setModels(models: Model[][]): void;
  addText(textOfSection: string[]): void;
  setTexts(textsOfLesson: string[][]): void;
  addMusics(musicPathsOfEntireLesson: string[]): void;
  addVoices(voicePathsOfEntireLesson: string[]): void;
};

export class LessonBuilder implements ILessonBuilder {
  lesson!: Lesson;

  constructor(){
    this.reset();
  }

  reset(): void {
    this.lesson = new Lesson();
  };

  addTitle(title: string): LessonBuilder {
    this.lesson.title = title;
    return this; 
  };

  addThumbnail(thumbnail: string): LessonBuilder {
    this.lesson.thumbnail = thumbnail;
    return this; 
  };

  addUniverse(universe: Universe): LessonBuilder {
    this.lesson.universe = universe;
    return this; 
  };

  addSection( section: Section): LessonBuilder {
    this.lesson.sections.push(section);
    return this; 
  };

  setSections( sections: Section[]): LessonBuilder {
    this.lesson.sections = sections;
    return this; 
  };

  addCamera(camera: Camera): LessonBuilder {
    this.lesson.camera = camera;
    return this; 
  };

  addModel(model: Model[] ): LessonBuilder {
    this.lesson.modelsOfEntirePage.push(model)
    return this; 
  };

  setModels(models: Model[][]): LessonBuilder {
    this.lesson.modelsOfEntirePage = models;
    return this; 
  }

  // text and texts should be re-named to: 
  // textOfSection and textOfEntireLesson

  addText(textOfSection: string[]): LessonBuilder {
    this.lesson.textOfEntireLesson.push(textOfSection);
    return this;
  };

  setTexts( textsOfLesson: string[][] ): LessonBuilder {
    this.lesson.textOfEntireLesson = textsOfLesson;
    return this;
  };

  addMusics(musicPathsOfEntireLesson: string[]): LessonBuilder {
    this.lesson.musicPathsOfEntireLesson = musicPathsOfEntireLesson; 
    return this;
  };

  addVoices(voicePathsOfEntireLesson: string[]): LessonBuilder {
    this.lesson.voicePathsOfEntireLesson = voicePathsOfEntireLesson;
    return this;
  };

  getProduct(): Lesson {
    const product = this.lesson; 
    this.reset();
    return product;
  };

};





// old pre builder-pattern constructor: 
  // constructor( { id, title, thumbnail = '' }: LessonConfig ) {
  //   super({id, title});
  //   this.thumbnail = thumbnail;
  // };



// Brainstorming Init method:
/*

  Lesson.init() method will:
    initialize camera: create animationDS, set an initial position, and create AnimationClips
    initialize models: load and extract meshes from GLTF and create modelPositions
    initialize text: extract text from some type of file and break it up into necessary paragraphs and sections
  .
.


Example Use:
 diamond.init();
 lessons.push(diamond);
.

*/

