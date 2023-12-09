import {
  AnimationClip,
  Euler,
  NumberKeyframeTrack,
  Vector3,
  VectorKeyframeTrack,
} from 'three';
import {
  easeInOutCubic,
  easeOutCubic,
} from '../../utility-functions/easing-functions';

type AnimConfig__Camera = {
  iPos: Vector3;
  fPos: Vector3;
  iRot: Euler;
  fRot: Euler;
  axis: string | null;
};

// need to figure out how rotationInfo object will look
// in OO
export function translateRotate(
  config: AnimConfig__Camera,
  easingType: string = 'in-out'
) {

  const { iPos, fPos, iRot, fRot, axis } = config;
  const rotsEqual = iRot.x === fRot.x && iRot.y === fRot.y && iRot.z === fRot.z;
  let easingFn = easingType === 'out' ? easeOutCubic : easeInOutCubic;

  function createPosKeyframes(): VectorKeyframeTrack {
    const n = 100;
    // create n position values:
    const posVals = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1); // Normalize i to 0 -> 1
      const easedT = easingFn(t);
      const x = iPos.x + (fPos.x - iPos.x) * easedT;
      const y = iPos.y + (fPos.y - iPos.y) * easedT;
      const z = iPos.z + (fPos.z - iPos.z) * easedT;
      posVals.push(x, y, z);
    };
    // create n times:
    const posTimes = Array.from({ length: n }, (_, i) => i / n); // shouldn't this be n-1?
    // create keyframe track with n times and n values:
    const posKeyframes = new VectorKeyframeTrack(
      '.position',
      posTimes,
      posVals
    );
    return posKeyframes;
  };

  function createRotKeyframes(): NumberKeyframeTrack {
    // create n rotation values and times:
    const n = 100;
    const rotTimes = [];
    const rotVals = [];
    let rotName = '';
    if (axis) rotName = '.rotation[' + axis + ']';
    else throw new Error('axis is falsy inside TranslateRotate');

    // If rotsEqual, create rotation that doesn't change
    if ( rotsEqual ) {
      rotVals[0] = iRot.y;
      rotVals[1] = iRot.y;

      rotTimes[0] = 0;
      rotTimes[1] = 1;
    } 
    else {
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1); // Normalize i to 0 -> 1
        const easedT = easingFn(t);
        let rot = 0;

        if (axis === 'x') {
          rot = iRot.x + (fRot.x - iRot.x) * easedT;
        }
        else if (axis === 'y') {
          rot = iRot.y + (fRot.y - iRot.y) * easedT;
        }
        else if (axis === 'z') {
          rot = iRot.z + (fRot.z - iRot.z) * easedT;
        };
        rotVals[i] = rot;
        rotTimes[i] = t;
      }
    }

    const rotationTrack = new NumberKeyframeTrack(
      rotName,
      rotTimes,
      rotVals
    );

    return rotationTrack;
  }

  return new AnimationClip('TranslateRotate', 1, [
    createPosKeyframes(),
    createRotKeyframes(),
  ]);
}
