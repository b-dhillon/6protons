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
import { Model } from './Model';

interface SectionConfig {
  id: number;
  camAnimation?: string;
  models: Model[];
  text?: string[];
  voicePath?: string;
}



export class Section {
  id: number;
  camPosition: Vector3 | undefined;
  camRotation: Vector3 | undefined;
  camAnimation: string | undefined;
  models: Model[];
  text: string[];
  voicePath: string | undefined;

  constructor({
    id,
    camAnimation,
    models = [],
    text = [],
    voicePath,
  }: SectionConfig) {
    this.id = id;
    this.camAnimation = camAnimation;
    this.models = models;
    this.text = text;
    this.voicePath = voicePath;
  };
}

// id: number, camAnimation = '', models = [], text = [], voicePath = ''
