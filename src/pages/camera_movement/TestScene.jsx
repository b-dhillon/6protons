import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { Plane, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../redux/actions';
import Stars from '../../components/Stars';
import * as THREE from 'three';
import lessons from '../../components/lessons.js';
import UpdateCamera from './UpdateCamera.jsx';

const lesson = lessons.find( (lesson) => lesson.id === "fullerene" );

// To do 
// - Fix shaking camera bug...constant lerp problem?
// - Re-factor
// - Is it a big deal that Scene() is called twice? Once for updating counter and another 
// for updating camera properties. Should we move camera properties up to Page() level?
// that way UI and Scene will both have access to the same camera properties and Scene() shall 
// only be called once. Buuuuuut, will this make Page() call twice? Idk, will have to test.

// Renders everything that user sees on the screen, UI, 3D scene, audio and text.
export default function Page() {
    console.log('Page() is called');
    return (
        <Suspense>
            <UI />
            <Scene />
        </Suspense>
    );
}

// Renders the UI and creates event handlers to handle user input.
function UI() {
    console.log('UI() is called');
    const dispatch = useDispatch();
    return (
        <button 
            style={{
                position: 'absolute', 
                zIndex: '5', 
                width: '100px', 
                height: '33px'
            }} 
            onClick={ () => dispatch( increment() ) } 
        >
        Next
        </button> 
    )
}

// Renders the 3D scene.
function Scene() {
    console.log('Scene() is called');
    const counter = useSelector(state => state.counter);
    const [sceneCamera, setSceneCamera] = useState( new THREE.PerspectiveCamera(45, 1, .1, 10) );


    // Is this necessary to hold in state?
    const [newCamera, setNewCamera] = useState(lesson.cameraSettings[0]);

    useEffect( () => {
        setNewCamera( lesson.cameraSettings[counter] );
    }, [counter]); 

    function DevelopmentCamera () {
        const ref = useRef();
        const set = useThree((state) => state.set)

        // Make the camera known to the system
        useEffect(() => {
            set({ camera: ref.current });
        }, [])

        // Update it every frame
        useFrame(() => {
            // ref.current.updateProjectionMatrix();
            ref.current.updateMatrixWorld();
        });

        // Add 3D OrbitControls
        function CameraControls() {
            const { camera, gl } = useThree();
            const controls = useRef();
            useFrame((state, delta) => controls.current.update(delta));
            return <OrbitControls ref={controls} args={[camera, gl.domElement]} />;
        }

        return (
            <>
                <PerspectiveCamera ref={ref} position={[0,0,40]} fov={45} aspect={1}/>
                <CameraControls />
            </>
        )
    };

    function SceneCamera() {
        // sceneCamera = new THREE.PerspectiveCamera();
        // sceneCamera.fov = 45;
        // sceneCamera.aspect = 1;
        // sceneCamera.near = 0.1;
        // sceneCamera.far = 10;
        return <cameraHelper args={[sceneCamera]}/>
    };

    return (
        <Canvas >
            <DevelopmentCamera  />
            <SceneCamera />
            <ambientLight />
            <Plane position={[0,0,-1]} scale={[.4, .4, 1]} />
            <Stars />
            <UpdateCamera sceneCamera={sceneCamera} newCamera={newCamera} />
        </Canvas>
    )
}

