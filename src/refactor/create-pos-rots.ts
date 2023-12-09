import { Matrix4, Vector3 } from "three";


const camAnimationNames = [
  'zoom-in',
  'zoom-out-rotate-up',
  'zoom-in-rotate-down',
  'circle-model',
  'zoom-out', // example of the camera not moving between sections
  'corkscrew-up',
];

class CamAnimation {
  animationName: string;
  tMag: number;
  rMag: number;

  
  constructor( animationName: string, tMag: number, rMag: number = 0 ) {
    this.animationName = animationName; 
    this.tMag = tMag;
    this.rMag = rMag;
  }
}

const startPosition = new Vector3( 0,0,5 );
const startRotation = new Vector3( 0,0,0 );

const positions = [
  startPosition
]

const rotations = [
  startRotation
]


interface CamPosRot {
  pos: Vector3;
  rot: Vector3;
}







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// Define cam animations
const camAnimations = [
  new CamAnimation( 'zoom-in', 4),
  new CamAnimation( 'zoom-out-rotate-up', 2, Math.PI/ 4 ), // x-axis rotation
  new CamAnimation( 'zoom-in-rotate-down', 2, Math.PI/4 ), // x-axis rotation
  new CamAnimation( 'circle-model', Math.PI/2, Math.PI/2 ), // y-axis rotation
  new CamAnimation( 'zoom-out', 3 ), //
  new CamAnimation( 'corkscrew-up', 2, Math.PI/2 ), // y-axis rotation
]


















// 2. Set up a PosRotFactory that can return the proper 
//    PosRot based on the animation type
class PosRotFactory {

  static zoomOut( tMag: number, i: number, positions: number[], rotations: number[] ): CamPosRot {
  
    const prevPos = positions[ i ];
    const prevRot = rotations[ i ];
  
    // const nextPos = new Vector3( prevPos.x, prevPos.y, prevPos.z - tMag ) // too simple because it does take into account the rMag
  
    // zoom in:
    const frustrumVector = getFrustrumVector( prevRot );
  
    const oppFrustrumVector = frustrumVector.clone().negate(); // need to figure out how to get a 180 vector
    
    const scaledVector = oppFrustrumVector.multiplyScalar( tMag )
    
    const nextPos = scaledVector;
  
    // zoom does not have a rotation, so we just copy 
    // the prevRot to set the nextRot
    const nextRot = prevRot;
  
    return { pos: nextPos, rot: nextRot }
  
  };
  
  static zoomIn( tMag: number, i: number, positions: Vector3[], rotations: Vector3[] ): CamPosRot {
  
    const prevPos = positions[ i ];
    const prevRot = rotations[ i ];
  
    // const nextPos = new Vector3( prevPos.x, prevPos.y, prevPos.z - tMag ) // too simple because it does take into account the rMag
  
    // zoom in:
    const frustrumVector = getFrustrumVector( prevRot );
    
    const scaledVector = frustrumVector.multiplyScalar( tMag );
    
    const nextPos = scaledVector;
  
    // zoom does not have a rotation, so we just copy 
    // the prevRot to set the nextRot
    const nextRot = prevRot;
  
    return { pos: nextPos, rot: nextRot }
  
  };
  
  static zoomOutRotateUp( tMag: number, rMag: number, i: number ): CamPosRot{
    //
  };
  
  static zoomInRotateDown( tMag: number, rMag: number, i: number ): CamPosRot {

    //

  };

  static corkscrewUp( tMag: number, rMag: number, i: number ): CamPosRot {

    //

  };

  static circleModel( tMag: number, rMag: number, i: number ): CamPosRot {

    //

  };

};




// Creates proper posRot from factory based on camAnimation.name
function createPosRot( camAnimation: any, i: number ): CamPosRot | null {


  switch(camAnimation.name){

    case 'zoom-out':
      return PosRotFactory.zoomOut( camAnimation.tMag, i, this.rotations );

    case 'zoom-in':
      return PosRotFactory.zoomIn( camAnimation.tMag, i, this.positions );

    case 'zoom-out-rotate-up':
      return PosRotFactory.zoomOutRotateUp( camAnimation.tMag, camAnimation.rMag, i );

    case 'zoom-in-rotate-down':
      return PosRotFactory.zoomInRotateDown( camAnimation.tMag, camAnimation.rMag, i );

    default:
      throw new Error('Invalid animation name');

  }


  //
}



const posRots = [];
for( let i = 0; i < camAnimations.length; i++ ) {

  const posRot = createPosRot( camAnimations[i], i );
  posRots.push(posRot);


}

export default posRots;
