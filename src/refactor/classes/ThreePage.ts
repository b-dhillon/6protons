import { Camera } from "./Camera";
import { Model } from "./ModelRF";
import { Universe } from "./Universe";

interface ThreePageConfig {
  id: string,
  title?: string,
  camera?: Camera
}

type SectionModels = Model[];


export class ThreePage {

  id: string | undefined;
  title: string | undefined;
  camera: Camera | undefined;
  universe: Universe | undefined;
  modelsOfEntirePage: Model[][] = [];


  // constructor( { id, title = '', camera = new Camera({}) }: ThreePageConfig ) {
  //   this.id = id;
  //   this.title = title;
  //   this.camera = camera;
  //   this.models = [];
  // }

  constructor(){}

  bigBang(id: string, starCount: number, radius: number): void {
    this.universe = {
      id: id,
      starCount: starCount,
      radius: radius,
    };
  }
}
