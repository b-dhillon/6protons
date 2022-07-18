import { Suspense} from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import Stars from './Stars'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


export default function Lesson2() {
    function Model(props) {
        // Model
        const model = useLoader(
            GLTFLoader,
            props.path,
            loader => {
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath("myDecoder/gltf/");
                loader.setDRACOLoader(dracoLoader);
               }
        )
        return (
            <>
                <primitive 
                object={model.scene}
                scale={(.2)}
                position={[0, -1, -1]}
                transparent={false}/>
            </>
        )

    }
    return (
        <>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={1} />
                    <Stars />
                    <Model path={`/diamond.glb`} />
                </Suspense>
            </Canvas>
        </>
    );
}
