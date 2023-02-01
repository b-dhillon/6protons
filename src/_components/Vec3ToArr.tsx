import { Vector3 } from 'three';

function Vec3ToArr( Vec3: Vector3 ) {
    return [ Vec3.x, Vec3.y, Vec3.z ];
};

export default Vec3ToArr;