import { useFrame, useLoader,  } from '@react-three/fiber';
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Model0 from '../models/Model0'

export default function Model(props) {
    console.log(props);
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

    // Animation
    let mixer
    if (model.animations.length) {
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations.forEach(clip => {
            const action = mixer.clipAction(clip)

            // action.warp(1, 2, 2).play()
            action.play();
        });
    }

    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    
    if (props.sectionState === 0) {
        return (
            <Model0 />

            // <>
            //     <primitive 
            //     object={model}
            //     scale={(.1)}
            //     position={[0, 0, -0.5]}
            //     transparent={false}/>
            // </>
        )
    }

    else if (props.sectionState === 1) {
        return (
        <>
        </>
        )
    }

    else if (props.sectionState === 2) {
        return (
            <>
                <primitive 
                object={model}
                scale={(.12)}
                position={[.66, 0, -1]}
                transparent={false}
                />
            </>
        )
    }

    else if (props.sectionState === 3) {
        return (
            <>
                <primitive 
                object={model}
                scale={(.11)}
                position={[.66, 0, -1]}
                rotation={[0, (-Math.PI / 8), 0]}
                transparent={false}
                />
            </>
        )
    }
    else if (props.sectionState === 4) {
        return (
            <>
                <primitive 
                object={model}
                scale={(.11)}
                position={[.66, 0, -1]}
                transparent={false}
                />
            </>
        )
    }
    else if (props.sectionState === 5) {
        return (
            <>
                <primitive 
                object={model}
                scale={(.03)}
                position={[.66, 0, -1]}
                transparent={false}
                />
            </>
        )
    }
    else if (props.sectionState === 6) {
        return (
            <>
            </>
        )
    }
}
