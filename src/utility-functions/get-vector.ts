import { Euler, Matrix4, Vector3 } from "three";

export function getFrustrumVector( iPos: Vector3, rot: Euler ): Vector3 {

  let rotAngle: number;
  const rotAxis = rot.x ? 'x' : rot.y ? 'y' : rot.z ? 'z' : null;
  
  // Define the vector that points out the front of the camera in its local space
  // Since the camera looks down the negative z-axis, the front is the negative z-direction
  let localFrustrumVector = new Vector3( 0, 0, -1 );

  // Define a rotation vector for the rotation around the specified axis
  let rotVector = new Vector3();

  // Set the correct axis for rotation
  switch (rotAxis) {
    case 'x':
      rotVector.setX(1); // Rotate around the x-axis
      rotAngle = rot.x; // set rotation angle from x-coordinates
      break;
    case 'y':
      rotVector.setY(1); // Rotate around the y-axis
      rotAngle = rot.y; // set rotation angle from y-coordinates
      break;
    case 'z':
      rotVector.setZ(1); // Rotate around the z-axis
      rotAngle = rot.z; // set rotation angle from z-coordinates
      break;
    default:
      throw new Error('Invalid rotation axis');
  }

  // Create a new rotation matrix for the additional rotation
  const rotationMatrix = new Matrix4();

  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  rotationMatrix.makeRotationAxis(rotVector.normalize(), rotAngle);

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle
  localFrustrumVector.applyMatrix4(rotationMatrix);

  // Vector transformation from local-space to world-space
  // Add the camera's new scaled vector to the camera's world position
  const worldFrustrumVector = iPos.add( localFrustrumVector );

  return worldFrustrumVector;
};









export function getUpVector( iPos: Vector3, rot: Euler ): Vector3 {

  let rotAngle: number;
  const rotAxis = rot.x ? 'x' : rot.y ? 'y' : rot.z ? 'z' : null;
  
  // Define the vector that points up in local space
  let localUpVector = new Vector3(0, 1, 0);

  // Define a rotation vector for the rotation around the specified axis
  let rotVector = new Vector3();

  // Set the correct axis for rotation
  switch (rotAxis) {
    case 'x':
      rotVector.setX(1); // Rotate around the x-axis
      rotAngle = rot.x; // set rotation angle from x-coordinates
      break;
    case 'y':
      rotVector.setY(1); // Rotate around the y-axis
      rotAngle = rot.y; // set rotation angle from y-coordinates
      break;
    case 'z':
      rotVector.setZ(1); // Rotate around the z-axis
      rotAngle = rot.z; // set rotation angle from z-coordinates
      break;
    default:
      throw new Error('Invalid rotation axis');
  };

  // Create a new rotation matrix for the additional rotation
  const rotMatrix = new Matrix4();

  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  rotMatrix.makeRotationAxis(rotVector.normalize(), rotAngle);

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle
  localUpVector.applyMatrix4(rotMatrix);

  // Vector transformation from local-space to world-space
  // Add the camera's new scaled vector to the camera's world position
  const worldUpVector = iPos.add(localUpVector);

  return worldUpVector;
};