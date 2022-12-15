import { parse } from './react-three/gltfjsx'
// import { parse } from '../modules/react-three/gltfjsx'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'

// function parseModel()
// {
//     console.log('parse() called');

//     const gltfLoader = new GLTFLoader();
//     const dracoloader = new DRACOLoader();
//     dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
//     gltfLoader.setDRACOLoader(dracoloader);
//     const url = '/lesson3_models/model0.glb';
//     const filename = 'model0.glb'

//     const jsx = gltfLoader.load(url, (gltf) =>
//     {
//         return parse(filename, gltf)
//     })

//     console.log(jsx);
// }

// parseModel();