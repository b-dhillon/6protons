import { Camera } from "./Camera";
import { Model } from "./Model";

interface ThreePageConfig {
  id: string,
  title?: string,
  camera?: Camera
}

type SectionModels = Model[];


export class ThreePage {

  id: string;
  title: string;
  camera: Camera;
  universe: any | undefined;
  models: SectionModels[];


  constructor( { id, title = '', camera = new Camera({}) }: ThreePageConfig ) {
    this.id = id;
    this.title = title;
    this.camera = camera;
    this.models = [];
  }

  bigBang(id: string, starCount: number, radius: number): void {
    this.universe = {
      id: id,
      starCount: starCount,
      radius: radius,
    };
  }
}
