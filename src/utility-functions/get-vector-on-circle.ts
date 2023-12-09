import { Euler, Vector3 } from 'three';
import { getFrustrumVector } from './get-vector';


export function getVectorOnCircle( iPos: number[], circleMag: number ): number[] {

  // Step 1: Find the circle's center.
  // For this case, the circle's center is assumed to be on the y-axis at the same y-level as iPos.
  const initialPos = new Vector3( iPos[0], iPos[1], iPos[2] )

  // this needs to be the computed modelPosition from createModelPosition
  // or it can be the frustrum-vector that looks straight down the camera by 1 unit.
  // because, thats where the model will be positioned anyways.
  const modelPosition = new Vector3(initialPos.x, initialPos.y, initialPos.z - 1);

  const circleCenter = modelPosition;  
  const radius = initialPos.distanceTo(circleCenter);
  
  // Step 2: Calculate the initial angle with respect to the positive x-axis on the x-z plane.
  const initialAngle = circleMag;
  // if( initialPos.z < 0) initialAngle *= -1; // standardize for a positive angle 
  
  // Step 3: Add circleMag if you want to rotate clockwise, 
  //         subtract circleMag if you want to rotate counter-clockwise
  let finalAngle = initialAngle + circleMag;
  
  // Step 4: Calculate the finalPosition using polar to Cartesian conversion.
  const finalPosition = [
    circleCenter.x + ( radius * Math.cos(finalAngle) ),
    initialPos.y,
    circleCenter.z + ( radius * Math.sin(finalAngle) )
  ];
  
  return finalPosition;
};


// after oo re-factor 
export function getVecOnCircle( iPos: Vector3, iRot: Euler, circleMag: number ): Vector3 {

  // Step 1: Find the circle's center.
  // Circle is of r=1 and is centered looking dwon the camera's frustrum. This is where the
  // model will be.
  const circleCenter = getFrustrumVector( iPos, iRot );
  const radius = iPos.distanceTo(circleCenter);
  
  // Step 2: Calculate the initial angle with respect to the positive x-axis on the x-z plane.
  const initialAngle = circleMag;
  
  // Step 3: Add circleMag if you want to rotate clockwise, 
  // subtract circleMag if you want to rotate counter-clockwise
  let finalAngle = initialAngle + circleMag;
  
  // Step 4: Calculate the finalPosition using polar to Cartesian conversion.
  const fPos = new Vector3(
    circleCenter.x + ( radius * Math.cos(finalAngle) ),
    iPos.y,
    circleCenter.z + ( radius * Math.sin(finalAngle) )
  );
  
  return fPos;
};
















  // if( initialPos.z < 0) initialAngle *= -1; // standardize for a positive angle 
