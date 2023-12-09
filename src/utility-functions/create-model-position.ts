/*
Function was tested. Works nicely. However, 
when rotation on camera's x-axis, the yOffsetForText is
not perfect. Perhaps we need to add offSet to the z-coordinate too if rotating
camera on x-axis?
*/

import { Vector3, Matrix4 } from 'three';

// Fn Description:
/**
 * Model position is simply in front of the camera. 
 * The tricky part is the rotation.
 * 
 * For the rotation we use unit vectors and a rotation matrix
 * 
 * First we define untit vector that points out the front of the camera (modelLocalPosition)
 *
 * Then we define a rotation vector, also a unit vector that is our axis of rotation. (rotationVector)
 * 
 * Next, ceate a rotation matrix from the rotation vector and rotaion angle
 * 
 * Apply the rotaion matrix to modelLocalPosition
 * 
 * This gives us the position of our model in local space relative to the camera
 * 
 * To get into world space we just perform a vector addition uising the rotation matrix.
 * 
 */
export function createModelPosition(
  cameraPosition: number[],
  rotationAngleCorodinates: number[],
  rotationAxis: string,
  yOffsetForText: number
) {
  let rotationAngle: number;

  // Define the vector that points out the front of the camera in its local space
  // Since the camera looks down the negative z-axis, the front is the negative z-direction
  let modelLocalPosition = new Vector3(0, 0, -1);

  // Define a rotation vector for the rotation around the specified axis
  let rotationVector = new Vector3();

  // Set the correct axis for rotation
  switch (rotationAxis) {
    case 'x':
      rotationVector.setX(1); // Rotate around the x-axis
      rotationAngle = rotationAngleCorodinates[0]; // set rotation angle from x-coordinates
      break;
    case 'y':
      rotationVector.setY(1); // Rotate around the y-axis
      rotationAngle = rotationAngleCorodinates[1]; // set rotation angle from y-coordinates
      break;
    case 'z':
      rotationVector.setZ(1); // Rotate around the z-axis
      rotationAngle = rotationAngleCorodinates[2]; // set rotation angle from z-coordinates
      break;
    default:
      throw new Error('Invalid rotation axis');
  }

  // Create a new rotation matrix for the additional rotation
  const rotationMatrix = new Matrix4();

  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  rotationMatrix.makeRotationAxis(rotationVector.normalize(), rotationAngle);

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle
  modelLocalPosition.applyMatrix4(rotationMatrix);

  // Add the camera's world position to the model's position
  // This positions the model in front of the camera in the world space
  const cameraWorldPosition = new Vector3(...cameraPosition);
  const modelWorldPosition = cameraWorldPosition.add(modelLocalPosition);

  // converting to coordinate-array and adding yOffset to y-cordinate which is index 1
  const modelWorldPositionArr = Object.values(modelWorldPosition).map( (c, i) => i === 1 ? c + yOffsetForText : c );

  // Return the new model position in world space
  return modelWorldPositionArr;
}













// Testing:

/*
const page = uninitializedData.pages[0];
const animationDS = page.camera.createAnimationDS();
const yOffsets = page.models.map( (model: any) => model.yOffsetForText );


const rotationAxisArr = page.models.map((model: any, j: number) => {
  let modelInNewPos = model.newModelLocation;

  // WHY IS THIS DEPENDANT ON modelInNewPos?
  let axisData = findRotationAxis(animationDS[ j ]);
  // let axisData = findRotationAxis(animationDS[modelInNewPos ? j : j - 1]);

  let rotationAxis = axisData[0];

  return rotationAxis;
});


// Call the function to compute the model's position
const modelPositions = animationDS.map((section: any[][], i: number) => {
  const modelPosition = createModelPosition(
    section[1], // camera final positon co-ordinates
    section[3], // camera final rotation co-ordinates
    rotationAxisArr[i],
    yOffsets[i]
  );
  return modelPosition;
});


Expected: (get from logging to the console the results old method)
[0, 0, -1],

[0, 0.66, 0],

[0.75, 0.15, -3],

[0.75, 0.15, -3],

[-3.25, 0.15, -3],
[-3.25, 2.07, -4]



Observed:
[ 0, 0, -1 ] // GOOD

[0, 0.6131168519734338, 0.21000776850263492] //ERROR in Z Co-ordinate --> X-AXIS ROTATION

[0.75, 0.15, -3] // GOOD

[0.75, 0.15, -3] // GOOD

[-3.25, 0.15, -3] // GOOD
 
[-3.25, 2.07, -4] // GOOD
    
]
*/

// Creating model positions based on rotationAngles
// that are relative to the previous rotation:
/*
function createModelPositionRelative(
  cameraPosition: number[],
  cameraQuaternion: Quaternion,
  rotationAngle: number,
  rotationAxis: string
) {

  // If the camera is already rotated we start with the model directly in front of the camera
  // Then, with that as the baseline, we apply the next rotation from there.
  // This allows us to define rotations relative to the previous rotation.
  // If the camera is aready rotated PI/2, and the next rotation is -PI/4
  // relative to PI/2. This approach will place the model correctly, 
  // in front the camera after the -PI/4 by first placing the model
  // at PI/2 and then rotating it back to -PI/4 

  // 1. Convert the camera's quaternion to a rotation matrix representing the camera's current orientation
  const cameraRotationMatrix = new Matrix4().makeRotationFromQuaternion(
    cameraQuaternion
  );

  // 2. Define the vector that points out the front of the camera in its local space
  //    Since the camera looks down the negative z-axis, the front is the negative z-direction
  let modelLocalPosition = new Vector3(0, 0, -1);

  // 3. Apply the camera's current orientation to this vector to align it correctly in local space
  modelLocalPosition.applyMatrix4(cameraRotationMatrix);

  // Define a rotation vector for the additional rotation around the specified axis
  let additionalRotationAxis = new Vector3();

  // Use a switch-case statement to set the correct axis for rotation
  switch (rotationAxis) {
    case 'x':
      additionalRotationAxis.setX(1); // Rotate around the x-axis
      break;
    case 'y':
      additionalRotationAxis.setY(1); // Rotate around the y-axis
      break;
    case 'z':
      additionalRotationAxis.setZ(1); // Rotate around the z-axis
      break;
    default:
      throw new Error('Invalid rotation axis');
  }

  // Create a new rotation matrix for the additional rotation
  const additionalRotationMatrix = new Matrix4();
  // Initialize the rotation matrix to rotate around the specified axis by the given angle
  additionalRotationMatrix.makeRotationAxis(
    additionalRotationAxis.normalize(),
    rotationAngle
  );

  // Apply the additional rotation to the model's position vector
  // This rotates the model around the camera based on the specified axis and angle
  modelLocalPosition.applyMatrix4(additionalRotationMatrix);

  // Add the camera's world position to the model's position
  // This positions the model in front of the camera in the world space
  const cameraWorldPosition = new Vector3(...cameraPosition);
  const modelWorldPosition = cameraWorldPosition.add(modelLocalPosition);

  // Return the new model position in world space
  return modelWorldPosition;
}
*/
