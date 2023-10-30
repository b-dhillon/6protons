import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";


// Creates zoomed out camera with orbit controls to make dev easier:
function DevelopmentCamera(): JSX.Element {
    const ref: any = useRef();
    const set = useThree(( state ) => state.set );

    // Setting default camera:
    useEffect( () => set( { camera: ref.current } ) );
    useFrame( () => { ref.current.updateMatrixWorld() } );

    function CameraControls() {
        const { camera, gl } = useThree();
        const ref: any = useRef();
        useFrame( ( _, delta ) => ref.current.update( delta ) );
        return < OrbitControls ref={ ref } args={ [ camera, gl.domElement ] } />;
    };

    // Need to disable controls when camera is moving
    return (
        <>
            < PerspectiveCamera ref={ref} position={ [ 0, 0, 20 ] } rotation={ [0, 0, 0] } fov={45} aspect={1} />
            {/* < CameraControls /> */}
        </>
    );
};

export default DevelopmentCamera;

// rotation={ [0, ( Math.PI/2 ) , 0] }