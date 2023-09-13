import * as THREE from 'three';
import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { uninitializedData } from './data';
import { TranslateRotate } from './components/animations/TranslateRotate';
import { PageConstructor } from './components/PageConstructor';
import { FindRotationAxis } from './components/FindRotationAxis';
import { AppData, LoadedPage, Page } from './types/types';


/** Fn Description
 * 
 * Responsibilities: 
 *   - load and inits data and call PageConstructor once data is loaded.
 *   - control which page is being rendered 
 * 
 * 
 * loadAndInit() 
 *  - Load all models of app
 *  - Load all voices of app.
 *  - Construct camera AnimationClips.
 *  - Initialize model positions based off camera positions. 
 *  - Calculate particle poositions
 * 
 * once data is loaded, calls PageConstructor()
 */

export default function App() {
  const [initializedData, setInitializedData] = useState<LoadedPage[]>([]);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState('test_page');

  useEffect(() => {
    loadAndInit();
  }, []);

  async function loadAndInit() {
    const initializedData = await initialize( uninitializedData );
    console.log('initializedData', initializedData);
    setInitializedData(initializedData);
    setDataInitialized(true);
  }

  // Once app is loaded and initialized --> find the current page's data and construct that with PageConstructor
  if (dataInitialized) {

    const [dataToRenderPage] = initializedData.filter( (page: LoadedPage) => page.id === currentPage );

    return (
      <PageConstructor
        loadedPage={dataToRenderPage}
        setCurrentPage={setCurrentPage}
      />
    );
  } else return <h2 style={ { padding: "10px 30px" } } >Loading...</h2>;
}




/*
Init() is responsible for the following for each page:
  - Initializing model positions based off of camera positions
  - Loading all voices of app.
  - Loading all glTF's and extracting all meshes from each glTF.
  - Creating all AnimationClips for the camera. 
*/

async function initialize(data: AppData) {

  function initializeModelPositionsFromCamera(
    cameraPosition: number[],
    cameraRotation: number[],
    rotationAxis: string
  ) {
    // If you rotate the camera on X axis you need to position the model on the Y axis.
    if (rotationAxis === 'x') {
      const rotationAngle = cameraRotation[0];

      const x = cameraPosition[0];
      const y = cameraPosition[1] + rotationAngle;
      const z = cameraPosition[2] - 1;
      return [x, y, z];
    }

    // If you rotate the camera on Y axis you need to offset position the model on the X axis AND Z axis.
    if (rotationAxis === 'y') {
      const rotationAngle = cameraRotation[1];

      const offset = rotationAngle * -1;

      if (rotationAngle > 0) {
        const x = cameraPosition[0] + offset;
        const y = cameraPosition[1];
        const z = cameraPosition[2] + offset;
        return [x, y, z];
      } else {
        const x = cameraPosition[0];
        const y = cameraPosition[1];
        const z = cameraPosition[2] - 1;
        return [x, y, z];
      }
    }

    // If you rotate the camera on Z axis you don't need to do anything to the model.
    if (rotationAxis === 'z') {
      const rotationAngle = cameraRotation[2];

      const x = cameraPosition[0];
      const y = cameraPosition[1];
      const z = cameraPosition[2] - 1;
      return [x, y, z];
    } else {
      const x = cameraPosition[0];
      const y = cameraPosition[1];
      const z = cameraPosition[2] - 1;
      return [x, y, z];
    }
  }

  async function LoadAllVoicesOfApp() {
    /* const allVoicesOfApp: any = [][] // [ [ voice0, voice1, voice2 ], [ voice0, voice1, voice2 ], etc... ]
                                                            ^ voices[] of page0          ^ voices[] of page1      */
    const allVoicesOfApp = data.pages.map(async (page: any) => {
      let pageVoices = []; // [ voice0, voice1, voice2 ]

      for (let i = 0; i < page.voices.length; i++) {
        pageVoices[i] = LoadVoice(page.voices[i]);
        // console.log(`LoadAllVoicesOfApp() voice${i} loaded`);
      }

      return Promise.all(pageVoices);
    });

    return Promise.all(allVoicesOfApp);
  }

  function LoadVoice(path: string) {
    return new Promise((resolve, reject) => {
      const listener = new THREE.AudioListener();
      const AudioObject = new THREE.Audio(listener);
      const loader = new THREE.AudioLoader();
      loader.load(
        path,

        // onLoad
        (buffer: AudioBuffer) => {
          // Set the audio object's buffer to the loaded object
          AudioObject.setBuffer(buffer);
          AudioObject.setLoop(false);
          AudioObject.setVolume(1);
          resolve(AudioObject);
        },

        // onProgress
        (xhr) => {
          // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError
        (err) => {
          console.log('Error loading voices', err);
        }
      );
    });
  }

  async function LoadAllMusicOfApp() {
    /* const allMusicOfApp: any = [][] // [ [ music0, music1, music2 ], [ music0, music1, music2 ], etc... ]
                                                            ^ music[] of page0          ^ music[] of page1      */
    const allMusicOfApp = data.pages.map(async (page: any) => {
      let pageMusic = []; // [ music0, music1, music2 ]

      for (let i = 0; i < page.music.length; i++) {
        pageMusic[i] = LoadMusic(page.music[i]);
      }

      return Promise.all(pageMusic);
    });

    return Promise.all(allMusicOfApp);
  }

  function LoadMusic(path: string) {
    return new Promise((resolve, reject) => {
      const listener = new THREE.AudioListener();
      const AudioObject = new THREE.Audio(listener);
      const loader = new THREE.AudioLoader();
      loader.load(
        path,

        // onLoad
        (buffer: AudioBuffer) => {
          // Set the audio object's buffer to the loaded object
          AudioObject.setBuffer(buffer);
          AudioObject.setLoop(false);
          AudioObject.setVolume(1);
          resolve(AudioObject);
        },

        // onProgress
        (xhr) => {
          // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError
        (err) => {
          console.log('Error loading voices', err);
        }
      );
    });
  }

  function LoadModel(path: any) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

      // dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/draco_decoder.js' );
      // dracoLoader.setDecoderPath('./draco/gltf');

      // dracoLoader.setDecoderPath( 'examples/jsm/libs/draco/' );
      // dracoLoader.setDecoderPath( './node_modules/three/examples/jsm/libs/draco/' );
      // dracoLoader.setDecoderConfig( { type: 'js' } );
      // loader.setDRACOLoader( dracoLoader );
      // loader.preload();

      // dracoLoader.setDecoderPath('./draco/gltf/darco_decorder.js');

      // (Optional) Force non-WebAssembly JS decoder (without this line, WebAssembly
      // is the default if supported).
      dracoLoader.setDecoderConfig({ type: 'js' });

      loader.setDRACOLoader(dracoLoader);

      loader.load(
        path,
        (gltf: any) => {
          // console.log('gltf', gltf);
          resolve(gltf);
          // console.log('glTF loaded');
        },
        (xhr: any) => {
          // console.log('loading glTF');
          // console.log((xhr.loaded / xhr.total) + 'loaded');
        },
        (error: any) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async function LoadAllGLTFSOfApp() {
    const all_pages_models = data.pages.map(async (page: any) => {
      const page_models: any = []; // [ model0, model1, model2 ]
      for (let i = 0; i < page.models.length; i++) {
        page_models[i] = LoadModel(page.models[i].path);
        // console.log(`model loaded`);
      }
      return Promise.all(page_models);
    });

    return Promise.all(all_pages_models);
  }

  async function ExtractAllMeshesOfApp() {
    const allGLTFSOfApp = await LoadAllGLTFSOfApp(); // [ [ gltf0, gltf1 ], [ gltf0 ], [ gltf0 ], [ gltf0 ] ]

    const allMeshesOfApp = allGLTFSOfApp.map((arrayOfGltfs: any) => {
      return arrayOfGltfs.map((gltf: any) => {
        // if(gltf) {
        return gltf.scene.children.filter(
          (child: any) =>
            child.isMesh || (child.isGroup && child.__removed === undefined)
        );
        // } else return ''
      });
    });
    // [ [ [ Mesh ], [ Mesh ], [ Mesh ] ] ]

    return allMeshesOfApp;
  }

  const allMeshesOfApp: any = await ExtractAllMeshesOfApp();
  const allVoicesOfApp: any = await LoadAllVoicesOfApp();
  const allMusicOfApp: any = await LoadAllMusicOfApp();

  const initializedData = data.pages.map((page: Page, i: number): LoadedPage => {
    const initializedCameraAnimationData = page.camera.createAnimationDataFromPositionsRotations();

    return {
      ...page,

      camera: {
        ...page.camera,
        initializedAnimationData: initializedCameraAnimationData, // needed for initial position assignment
        initializedAnimationClips: initializedCameraAnimationData.map(
          (AnimationData: [][], i: number) => {
            return [
              TranslateRotate({
                duration: 4,
                initial_position: AnimationData[0],
                final_position: AnimationData[1],
                initial_angle: AnimationData[2],
                final_angle: AnimationData[3],
                // axis: 'x',
                axis: FindRotationAxis(AnimationData),
              }),
            ];
          }
        ),
      },

      // add meshes and positions to each model
      models: page.models.map((model: any, j: number) => {
        return {
          ...model,
          loadedMeshes: allMeshesOfApp[i][j],

          // Need to access AnimationData here which is just the [][] NOT the whole [][][]. 
          // Although you can use that too, but you'll need to loop through it.
          initializedPositions: initializeModelPositionsFromCamera(
            page.camera.positions[j + 1],
            page.camera.rotations[j + 1],
            FindRotationAxis(initializedCameraAnimationData[j])
          ),
        };
      }),

      loadedVoices: allVoicesOfApp[i],
      loadedMusic: allMusicOfApp[i],
    };
  });

  return initializedData;
};