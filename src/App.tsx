import * as THREE from 'three';
import { useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { uninitializedData } from './uninitialized-data';
import { TranslateRotate } from './components/animations/TranslateRotate';
import { Page } from './components/Page';
import { getRotationInfo } from './utility-functions/get-rotation-info';
import { UninitializedData, UninitializedPage, InitializedPage } from './types/types';
import { createModelPosition } from './utility-functions/create-model-position';

interface RotationInfo {
  axis: string, 
  rotationsEqual: boolean
}

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
  const [currentPage, setCurrentPage] = useState('test-page');

  useEffect(() => {
    Init();
  }, []);

  async function Init() {
    const _initializedPages = await initialize( uninitializedData );
    // console.log('initializedPages', _initializedPages);
    setInitializedPages(_initializedPages);
    setDataInitialized(true);
  }

  // Once app is loaded and initialized --> find current page data and render with Page()
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
  - Loading
    - Load models
      - Load all GLTFs and extract all meshes inside GLTF object.
    - Load music
    - Load voices

  - Initializing
    - Create camera animationDS
    - Initalize Camera
      - Create camera AnimationClips
    
    - Initalize Models
      - Create model positions
      - Add loaded meshes




  Too much going on in one function, we need to split this up

  1. Load and extract everything in 1 fn. 
  2. .map and InitializePages in another fn
  3. Create all AnimationClips in another fn.

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
  }

  async function ExtractAllMeshesOfApp() {

    const allGLTFSOfApp = await loadAllGLTFsOfApp(); // [ [ gltf0, gltf1 ], [ gltf0 ], [ gltf0 ], [ gltf0 ] ]

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

    async function loadAllGLTFsOfApp() {

      const allPagesGLTFs = data.pages.map(async (page: any) => {
        const pageGLTFs: any = []; // [ model0, model1, model2 ]
        for (let i = 0; i < page.models.length; i++) {
          pageGLTFs[i] = loadGLTF(page.models[i].path);
        }
        return Promise.all(pageGLTFs);
      });
  
      return Promise.all(allPagesGLTFs);

      function loadGLTF(path: any) {
        return new Promise((resolve, reject) => {
          const loader = new GLTFLoader();
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    
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
    };
  } 


  const allMeshesOfApp: any = await ExtractAllMeshesOfApp();
  // const allVoicesOfApp: any = await LoadAllVoicesOfApp();
  const allMusicOfApp: any = await LoadAllMusicOfApp();
  const textChime = await LoadVoice(uninitializedData.textChimePath);


  /** When initializing pages we: 
   *  Create animationDS
   * 
   *  Initialize Models
   *    getRotationInfo of the camera for each section to pass into createModelPositon
   *    Create model position from animationDS
   *    add loaded meshes to the new initializedModel object
   * 
   * Initialize Camera 
   *    create animation clips by calling method page.camera.createAnimationClips
   * 
   * Add everything that has been loaded and initalized to 
   * the new initalizedPage object at the bottom that is returned
   * at the end the fn.
   * 
   */
  const initializedPages = data.pages.map((page: UninitializedPage, i: number): InitializedPage => {

    const animationDS = page.camera.createAnimationDS();

    const initializedModelPositions: number[][] = [];
    const rotationInfos: RotationInfo[] = [];

    // This should be its own fn: function initializeModelsOfPage( page ): initializedModel[]

    const initializedModels = page.models.map((model: any, section: number) => {

      const rotationInfo = getRotationInfo(animationDS[section])


      // create model position from camera positions, 
      // which are nicely stored in the animationDS
      const initializedPosition = createModelPosition(
        animationDS[section][1],
        animationDS[section][3],
        rotationInfo.axis,
        model.yOffsetForText
      );

      // push position and rotationAxis to array to store data
      // for ClipConstructor
      initializedModelPositions[section] = initializedPosition
      rotationInfos[section] = rotationInfo

      return {
        ...model,
        loadedMeshes: allMeshesOfApp[i][section],
        initializedPosition: initializedPosition
      };
    });


    return {
      ...page, // is this needed? 

      camera: {
        ...page.camera, // is this needed --> renderer just needs initial position and animationClips?
        initialPosition: page.camera.positions[0],
        animationClips: page.camera.createAnimationClips( animationDS, page, initializedModelPositions, rotationInfos ),
      },

      models: initializedModels,
      modelPositions: initializedModelPositions, // needed?, its just being passed to createAnimationClips above

      loadedTextChime: textChime,
      // loadedVoices: allVoicesOfApp[i],
      loadedVoices: null,
      loadedMusic: allMusicOfApp[i],
    };
  });

  return initializedPages;
  
};




























// In case Draco breaks:
/*
dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/draco_decoder.js' );
dracoLoader.setDecoderPath('./draco/gltf');

dracoLoader.setDecoderPath( 'examples/jsm/libs/draco/' );
dracoLoader.setDecoderPath( './node_modules/three/examples/jsm/libs/draco/' );
dracoLoader.setDecoderConfig( { type: 'js' } );
loader.setDRACOLoader( dracoLoader );
loader.preload();

dracoLoader.setDecoderPath('./draco/gltf/darco_decorder.js');
*/











