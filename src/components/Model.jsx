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
            </>
        )
    }

    else if (props.sectionState === 3) {
        return (
            <>
            </>
        )
    }
    else if (props.sectionState === 4) {
        return (
            <>
            </>
        )
    }
    else if (props.sectionState === 5) {
        return (
            <>
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
