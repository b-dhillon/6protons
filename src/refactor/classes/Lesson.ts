import { ThreePage } from './ThreePage';
import { Section } from './Section';
import { Model } from './Model';
import { Vector3 } from 'three';

interface LessonConfig {
  id: string;
  title: string;
  thumbnail?: string;
};

type SectionText = string[];


export class Lesson extends ThreePage {

  thumbnail: string | undefined;
  sections: Section[] = [];

  texts: SectionText[] = [];
  musicPaths: string[] = [];
  voicePaths: string[] = [];
  
  // these arrays will already be on the camera object
  camPositions: Vector3[] = [];
  camRotations: Vector3[] = [];

  constructor( { id, title, thumbnail = '' }: LessonConfig ) {
    super({id, title});
    this.thumbnail = thumbnail;
  };

  setSections( section: Section ) {
    this.sections.push(section);
  };
  
};









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

