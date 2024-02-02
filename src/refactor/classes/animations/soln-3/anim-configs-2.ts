import { Euler, Vector3 } from "three";


abstract class AnimConfig {
    // all fields that both share
    animName: string | undefined;

    iPos: Vector3 | undefined;
    fPos: Vector3 | undefined;
    iRot: Euler | undefined;
    fRot: Euler | undefined; 
    rotAxis: string | undefined;
    easingFn: Function | undefined;
    smoothness: number | undefined;
    duration: number | undefined;
  



  


    constructor() {}


}

class CamAnimConfig extends AnimConfig {
    // extra fields for camera like tMag, rMag
    tMag: number | undefined;
    rMag: number | undefined;
}

class ModelAnimConfig extends AnimConfig {
    // extra fields for model like iScale and fScale
    iScale: Vector3 | undefined; 
    fScale: Vector3 | undefined;
}