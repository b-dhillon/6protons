import { Euler, Vector3 } from "three";
import { CamAnimConfig } from "../../../types";
import { easeInOutCubic, easeOutCubic } from "../../../../utility-functions/easing-functions";


interface AnimConfigs {

    create( a: any ): void 

}

  


class CamAnimConfigs implements AnimConfigs {

    animConfigs: CamAnimConfig[] = []

    create( a: any ): void {
        
        for (let i = 0; i < a.positions.length - 1; i++) {

            const animConfig: CamAnimConfig = {

              animName: a.animName, // CamAnimation.animName
              tMag: a.tMag, // CamAnimation.tMag
              rMag: a.rMag, // CamAnimation.rMag

              iPos: a.positions[ i ],
              fPos: a.positions[ i + 1 ],
    
              iRot: a.rotations[ i ],
              fRot: a.rotations[ i + 1 ],
              rotAxis: a.posRots[ i ].axis,

              easingFn: i === 0 ? easeOutCubic : easeInOutCubic,
              smoothness: 100,
              duration: a.duration
    
            };
    
            this.animConfigs[i] = animConfig;
    
        };

    };
    
};


class BlankModelAnimConfig {

    animName: string | undefined;

    iPos: Vector3 | undefined;
    fPos: Vector3 | undefined;
    iRot: Euler | undefined;
    fRot: Euler | undefined; 
    rotAxis: string | undefined;
    easingFn: Function | undefined;
    smoothness: number | undefined;
    duration: number;
  
    iScale: Vector3 | undefined; 
    fScale: Vector3 | undefined;
  
    constructor( conf: any = {} ) {
  
      this.iPos = conf.iPos;
      this.fPos = conf.fPos;
      this.iRot = conf.iRot;
      this.fRot = conf.fRot;
      this.rotAxis = conf.rotAxis;
      this.iScale = conf.iScale;
      this.fScale = conf.fScale;
      this.duration = conf.duration ? conf.duration : 1;
  
    };
  
};

class ModelAnimConfigs implements AnimConfigs {

    animConfigs: ModelAnimConfig[] = []

    create( a: any ): void {
        for (let i = 0; i < a.models.length; i++) {

            const modelAnimConfig = new BlankModelAnimConfig();

            switch( a.name ) {

                case 'scale-up':
                modelAnimConfig.iScale = new Vector3( 0, 0, 0 );
                modelAnimConfig.fScale = new Vector3( 1, 1, 1 );
                break;
        
                case 'scale-down':
                modelAnimConfig.iScale = new Vector3( 1, 1, 1 );
                modelAnimConfig.fScale = new Vector3( 0, 0, 0 );
                break; 
        
                case 'spin-y': 
                modelAnimConfig.iRot = new Euler( 0, 1, 0 );
                modelAnimConfig.fRot = new Euler( 0, Math.PI * 2, 0);
                modelAnimConfig.rotAxis = 'y';
                break;
        
                case 'suspend':
                modelAnimConfig.duration = 90;
                break;
        
                default:
                throw new Error( "Invalid animation name. no model animation with that name found." )
        
            };

            this.animConfigs[i] = modelAnimConfig;

        };
    };
};