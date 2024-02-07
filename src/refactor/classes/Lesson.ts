import { ThreePage } from './ThreePage';
import { Section } from './Section';
import { Model } from './Model';
import { Universe } from './Universe'
import { Cam } from './Cam';


type TextOfSection = string[];

export class Lesson extends ThreePage {

  constructor(){ super(); };

  thumbnail: string | undefined;

  numberOfSections: number | undefined;

  sections: Section[] = [];

  textOfEntireLesson: TextOfSection[] = [];

  musicPathsOfEntireLesson: string[] = [];

  voicePathsOfEntireLesson: string[] = [];
  
};


interface ILessonBuilder {

  addTitle(title: string): LessonBuilder;

  addNumberOfSections( numberofSections: number ): LessonBuilder;

  addThumbnail(thumbnail: string): LessonBuilder;

  addUniverse(universe: Universe): LessonBuilder;

  addSection(section: Section): LessonBuilder;

  setSections( sections: Section[] ): LessonBuilder

  addCamera(camera: Cam): LessonBuilder;

  addModel(model: Model[]): LessonBuilder;

  setModels(models: Model[][]): LessonBuilder;

  addText(textOfSection: string[]): LessonBuilder;

  setTexts(textsOfLesson: string[][]): LessonBuilder;

  addMusics(musicPathsOfEntireLesson: string[]): LessonBuilder;

  addVoices(voicePathsOfEntireLesson: string[]): LessonBuilder;

  extractSections(): void

};



export class LessonBuilder implements ILessonBuilder {

  lesson!: Lesson;

  constructor(){

    this.reset();

  }

  
  reset(): void {

    this.lesson = new Lesson();

  };


  addTitle( title: string ): LessonBuilder {

    this.lesson.title = title;
    return this; 

  };

  addNumberOfSections( numberofSections: number ): LessonBuilder {

    this.lesson.numberOfSections = numberofSections;
    return this;

  }


  addThumbnail( thumbnail: string ): LessonBuilder {

    this.lesson.thumbnail = thumbnail;
    return this; 

  };


  addUniverse( universe: Universe ): LessonBuilder {

    this.lesson.universe = universe;
    return this; 

  };


  addSection( section: Section ): LessonBuilder {

    this.lesson.sections.push(section);
    return this; 

  };


  setSections( sections: Section[] ): LessonBuilder {

    this.lesson.sections = sections;
    return this; 

  };


  addCamera( camera: Cam ): LessonBuilder {

    this.lesson.camera = camera;
    return this; 

  };


  addModel( model: Model[] ): LessonBuilder {

    this.lesson.modelsOfEntirePage.push( model )
    return this; 

  };


  setModels( models: Model[][] ): LessonBuilder {

    this.lesson.modelsOfEntirePage = models;
    return this; 

  };


  // text and texts should be re-named to: 
  // textOfSection and textOfEntireLesson
  addText( textOfSection: string[] ): LessonBuilder {

    this.lesson.textOfEntireLesson.push( textOfSection );
    return this;

  };


  setTexts( textsOfLesson: string[][] ): LessonBuilder {

    this.lesson.textOfEntireLesson = textsOfLesson;
    return this;

  };


  addMusics( musicPathsOfEntireLesson: string[] ): LessonBuilder {

    this.lesson.musicPathsOfEntireLesson = musicPathsOfEntireLesson; 
    return this;

  };


  addVoices( voicePathsOfEntireLesson: string[] ): LessonBuilder {

    this.lesson.voicePathsOfEntireLesson = voicePathsOfEntireLesson;
    return this;

  };


  extractSections(): void {

    if( this.lesson.sections.length === 0 ) throw new Error( "Sections have not been added or set. Therefore, no sections to extract." )

    this.lesson.sections.forEach(( section: Section ) => {

      this.lesson.textOfEntireLesson.push( section.text );
      this.lesson.voicePathsOfEntireLesson.push( section.voicePath );
      this.lesson.modelsOfEntirePage.push( section.models );

    });

  };


  build(): Lesson {

    const product = this.lesson; 
    this.reset();
    return product;

  };

};

