import { Model } from "./Model";
import { Universe } from "./Universe";
import { Cam } from "./Cam";

interface ThreePageConfig {
  id: string,
  title?: string,
  camera?: Cam
}

type SectionModels = Model[];


export class ThreePage {

  constructor() {
    this.id = ThreePage._lastId++;
  };
  
  private static _lastId = 0;
  readonly id: number;

  title: string | undefined;
  camera: Cam | undefined;
  universe: Universe | undefined;
  modelsOfEntirePage: Model[][] = [];


  bigBang(id: string, starCount: number, radius: number): void {
    this.universe = {
      id: id,
      starCount: starCount,
      radius: radius,
    };
  }
}
