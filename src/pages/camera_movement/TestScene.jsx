import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame  } from '@react-three/fiber';
import { Plane, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../redux/actions';
import Stars from '../../components/Stars';
import * as THREE from 'three';
import pages from '../../components/lessons.js';
import UpdateCamera from './UpdateCamera.jsx';


// To do 

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
    function ConstructSceneCamera() {
        const cam = new THREE.PerspectiveCamera(45, 1, .1, 10);
        cam.position.set(0, 0, 5);
        return cam;
    }


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

        // Need to disable controls when camera is moving

        return (
            <>
                <PerspectiveCamera ref={ref} position={[0,0,40]} fov={45} aspect={1}/>
                <CameraControls />
            </>
        )
    };

    const [sceneCamera, setSceneCamera] = useState( () => ConstructSceneCamera() );
    const page = pages.find( (page) => page.id === "fullerene" );  // can be lifted, never changes everytime Scene() is called.
    const counter = useSelector(state => state.counter);
    

    return (
        <Canvas >
            <DevelopmentCamera  />
            <cameraHelper args={[sceneCamera]}/>
            <ambientLight />
            <Plane position={[0,0,-1]} scale={[.4, .4, 1]} />
            <Stars />

            {/* This fn should only be called when the camera is moving? */}            
            <UpdateCamera sC={sceneCamera} counter={counter} page={page} />
        </Canvas>
    )
}



/*
Is this necessary to hold in state? No because it doesn't need to be preserved between renders.
const [newCamera, setNewCamera] = useState(lesson.cameraSettings[0]);
useEffect( () => {
    setNewCamera( lesson.cameraSettings[counter] );
}, [counter]); 
*/