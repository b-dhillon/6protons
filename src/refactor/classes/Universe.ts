export class Universe {
  id: string | undefined;
  starCount: number | undefined;
  radius: number | undefined;

  constructor(id: string, starCount: number, radius: number) {
    this.id = id;
    this.starCount = starCount;
    this.radius = radius;
  };
};
