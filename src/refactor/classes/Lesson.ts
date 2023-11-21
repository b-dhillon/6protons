import { ThreePage } from './ThreePage';
import { Section } from './Section';
import { Model } from './Model';
import { Vector3 } from 'three';

interface LessonConfig {
  id: string;
  title: string;
  thumbnail: string;
};

interface SectionConfig {
  id: number;
  camAnimation?: string;
  models: Model[];
  text?: string[];
  voicePath?: string;
};

type SectionModels = Model[];
type SectionText = string[];


export class Lesson extends ThreePage {

  thumbnail: string | undefined;
  sections: Section[] = [];
  camPositions: Vector3[] = [];
  camRotations: Vector3[] = [];
  models: SectionModels[] = [];
  texts: SectionText[] = [];
  musicPaths: string[] = [];
  voicePaths: string[] = [];

  constructor( { id, title, thumbnail }: LessonConfig ) {
    super(id, title);
    this.thumbnail = thumbnail;
  };

  createSection( config: SectionConfig ) {
    const section = new Section( config );
    this.sections.push(section);
  };
};





/*

Brainstorming Init method:
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

