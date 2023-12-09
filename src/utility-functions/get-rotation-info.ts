
// AnimationData needed for each section's camera transition
// This is an array that contains four other arrays

import { Vector3 } from "three";

// iPoistion, fPosition, iRotation, fRotation
type AnimationDataOfSection = number[][]

interface AnimationClipConfig__Camera {
  iPos: Vector3;
  fPos: Vector3;
  iRot: Vector3;
  fRot: Vector3;
}


interface RotationInfo {
  axis: string, 
  rotsEqual: boolean
}



// After OO refactor:
export function getRotInfo( animationClipConfig: AnimationClipConfig__Camera ): RotationInfo {
  let axis = '';

  // First check if rots are equal
  const { iRot, fRot } = animationClipConfig

  const rotsEqual = iRot.x === fRot.x && iRot.y === fRot.y && iRot.z === fRot.z;
  

  if ( rotsEqual ) {

    // find the rotation where it is not zero
    // we will clamp the rotation on this axis, so it doesn't snap
    // back to zero

    if (iRot.x ) axis = 'x';
    else if (iRot.y) axis = 'y';
    else if (iRot.z) axis = 'z';
    else axis = 'x'; 

  }
  else {
    const deltas = subtractEachIndexOf2Arrays(
      Object.values(iRot),
      Object.values(fRot)
    );
    if (deltas[0]) axis = 'x'; // redundant check
    else if (deltas[1]) axis = 'y';
    else if (deltas[2]) axis = 'z';
    else throw new Error('somehow arrays not equal, but no delta');
  }

  return { axis: axis, rotsEqual: rotsEqual };
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function getRotationInfo( AnimationData: AnimationDataOfSection ): RotationInfo {
  let axis = '';

  // First check if arrays are equal
  const rotsEqual = arraysEqual(AnimationData[2], AnimationData[3]);

  if (rotsEqual) {

    // find the rotation (index) where it is not zero
    // we will clamp the rotation on thix axis, so it doesn't snap
    // back to zero
    const axisAsIndex = AnimationData[3].findIndex(
      (element: number) => element !== 0
    );
    if (axisAsIndex === 0) axis = 'x';
    else if (axisAsIndex === 1) axis = 'y';
    else if (axisAsIndex === 2) axis = 'z';
    else axis = 'x'; 
  

  } else {
    const deltas = subtractEachIndexOf2Arrays(
      AnimationData[2],
      AnimationData[3]
    );
    if (deltas[0]) axis = 'x'; // redundant check
    else if (deltas[1]) axis = 'y';
    else if (deltas[2]) axis = 'z';
    else throw new Error('somehow arrays not equal, but no delta');
  }

  return { axis: axis, rotsEqual: rotsEqual  };
}



function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true; // checks if both are the same instance
  if (a == null || b == null) return false; // checks if either is null or undefined
  if (a.length !== b.length) return false; // arrays with different lengths are not equal

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false; // as soon as a non-equal element is found, return false
  }
  return true; // if all elements are equal, return true
}

function subtractEachIndexOf2Arrays(a: number[], b: number[]) {
  return a.map((x, i) => x - b[i]);
}
