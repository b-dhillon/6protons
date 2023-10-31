import * as THREE from 'three';
import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { uninitializedData } from './uninitializedData';
import { TranslateRotate } from './components/animations/TranslateRotate';
import { Page } from './components/Page';
import { FindRotationAxis } from './utility-functions/find-rotation-axis';
import { UninitializedData, UninitializedPage, InitializedPage } from './types/types';


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
  const [initializedPages, setInitializedPages] = useState<InitializedPage[] | undefined>(undefined);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState('test-page-2');

  useEffect(() => {
    Init();
  }, []);

  async function Init() {
    const _initializedPages = await initialize( uninitializedData );
    // console.log('initializedPages', _initializedPages);
    setInitializedPages(_initializedPages);
    setDataInitialized(true);
  }

  // Once app is loaded and initialized --> find current page's data and render with PageRenderer
  if (dataInitialized) {

    const [initializedPage] = initializedPages!.filter( (page: InitializedPage) => page.id === currentPage );

    return (
      <Page
        initializedPageData={initializedPage}
        setCurrentPage={setCurrentPage}
      />
    );
  } else return <h3 style={ { padding: "10px 30px" } } >Loading...</h3>;
}





/** Fn Description
Init() is responsible for the following for each page:
  - Initializing model positions based off of camera positions
  - Loading all voices of app.
  - Loading all glTF's and extracting all meshes from each glTF.
  - Creating all AnimationClips for the camera. 
*/
async function initialize(data: UninitializedData): Promise<InitializedPage[]> {

  // LoadVoices and LoadMusic is the same code? 
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
      try {
        const listener = new THREE.AudioListener();
        const AudioObject = new THREE.Audio(listener);
        const loader = new THREE.AudioLoader();
        loader.load(
          path,
          // onLoad
          (buffer: AudioBuffer) => {
            // Set the audio object's buffer to the loaded object
            try {
              AudioObject.setBuffer(buffer);
              AudioObject.setLoop(false);
              AudioObject.setVolume(1);
              resolve(AudioObject);
            } catch(e) {
              console.error(e);
              reject(e)
            }
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
      } catch(e) {
        console.log(e);
        reject(e)
      }
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
  // const allVoicesOfApp: any = await LoadAllVoicesOfApp();
  const allMusicOfApp: any = await LoadAllMusicOfApp();

  const textChime = await LoadVoice(uninitializedData.textChimePath)

  const initializedPages = data.pages.map((page: UninitializedPage, i: number): InitializedPage => {

    const animationDS = page.camera.createAnimationDS();
    const animationTypes = page.models


    return {
      ...page, // is this needed? 

      camera: {
        ...page.camera, // is this needed --> renderer just needs initial position and animationClips?
        initialPosition: page.camera.positions[0],
        animationClips: page.camera.createAnimationClips(animationDS),
      },

      // add meshes and positions to each model
      models: page.models.map((model: any, j: number) => {

        let newPos = model.newModelLocation
        

        return {
          ...model,
          loadedMeshes: allMeshesOfApp[i][j],

          initializedPositions: data.createModelPosFromCamPos(
            /** If model in new pos we do j+1 because first index in camera.positions is technichally -1 
             *  if not, just j because we want position of previous model for camera.lookAt() for TranslateCircle
            */
            page.camera.positions[ newPos ? j + 1 : j ], // cameraPosition: number[]
            page.camera.rotations[ newPos ? j + 1 : j ], // cameraRotation: number[]
            FindRotationAxis(animationDS[j]),
            model.yOffsetForText
          ),
        };
      }),

      loadedTextChime: textChime,
      // loadedVoices: allVoicesOfApp[i],
      loadedVoices: null,
      loadedMusic: allMusicOfApp[i],
    };
  });

  return initializedPages
};











// Need to access AnimationData here which is just the [][] NOT the whole [][][]. 
// Although you can use that too, but you'll need to loop through it.
// initializedPositions: initializeModelPositionsFromCamera(
//   page.camera.positions[j + 1],
//   page.camera.rotations[j + 1],
//   FindRotationAxis(animationDS[j])
// ),

// animationDataStructure: page.camera.createAnimationDS(), // needed for initial position assignment --> where is it being consumed? Can't initial position be consumed from the hard-coded positions array?


// initializedAnimationClips: animationDataStructure.map((animationData: [][], i: number) => {
//   return [
//     TranslateRotate({
//       duration: 4,
//       initial_position: animationData[0],
//       final_position: animationData[1],
//       initial_angle: animationData[2],
//       final_angle: animationData[3],
//       // axis: 'x',
//       axis: FindRotationAxis(animationData),
//     }),
//   ];
// }),