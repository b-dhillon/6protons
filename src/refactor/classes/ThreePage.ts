


export class ThreePage {
  id: string;
  title: string;
  universe: any | undefined;
  camera: any | undefined;
  models: any | undefined;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  bigBang(id: string, starCount: number, radius: number): void {
    this.universe = {
      id: id,
      starCount: starCount,
      radius: radius,
    };
  }
}
