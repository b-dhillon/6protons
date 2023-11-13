import { Vector3 } from 'three';


export function getVectorOnCircle( initialPosition: number[], rotationAngle: number ): number[] {
    // Step 1: Find the circle's center.
    // For this case, the circle's center is assumed to be on the y-axis at the same y-level as initialPosition.
    const initialPos = new Vector3( initialPosition[0], initialPosition[1], initialPosition[2] )
  
    // this needs to be the computed modelPosition from createModelPosition
    const modelPosition = new Vector3(initialPos.x, initialPos.y, initialPos.z - 1);
    const circleCenter = modelPosition;  
    const radius = initialPos.distanceTo(circleCenter);
    
    // Step 2: Calculate the initial angle with respect to the positive x-axis on the x-z plane.
    const initialAngle = rotationAngle;
    // if( initialPos.z < 0) initialAngle *= -1; // standardize for a positive angle 
    
    // Step 3: Add rotationAngle if you want to rotate clockwise, 
    //         subtract rotationAngle if you want to rotate counter-clockwise
    let finalAngle = initialAngle + rotationAngle;
    
    // Step 4: Calculate the finalPosition using polar to Cartesian conversion.
    const finalPosition = [
      circleCenter.x + ( radius * Math.cos(finalAngle) ),
      initialPos.y,
      circleCenter.z + ( radius * Math.sin(finalAngle) )
    ];
    
    return finalPosition;
  };