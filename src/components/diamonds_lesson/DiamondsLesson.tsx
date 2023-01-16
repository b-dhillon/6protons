import { Suspense, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import UpdateCamera from '../UpdateCamera';
import Universe from '../Universe';
import DataStore from '../redux/store';
import DiamondModels from './DiamondModels';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import LessonOverlay from '../LessonOverlay';
// import * as THREE from 'three'


function DiamondsLesson( props: any ) {
  const lesson = 'Diamonds';

  const [ fadeDone, setFadeDone ] = useState( false );

  function handleFadeDoneAfter( seconds: number ) {
    setTimeout( () => setFadeDone( true ), seconds );
  }; useEffect( () => handleFadeDoneAfter( 5500 ) )

  return (
    <>

      < Suspense fallback={null} >
        { !fadeDone ?  < IntroFade /> : ""}

        < Canvas gl={ { alpha: false } } dpr={ [ 1, 2 ] } camera={ { near: 0.01, far: 10, fov: 75, position: [ 0, 0, 4 ] } } >

          < Universe />
          < Lights />
          < Models />
          < DiamondGlow />

          { !fadeDone ? < UpdateCamera /> : "" }
          { fadeDone ? < OrbitControls autoRotate autoRotateSpeed={ 0.5 } minPolarAngle={ 0 }  maxPolarAngle={ Math.PI / 2 } /> : "" }

        </ Canvas >

      </ Suspense >
    </>
  );
}

export default DiamondsLesson;

function IntroFade() {
  return (
    <div className="blackFade"></div>
  );
};

function Lights() {

  return (
    <>
      < ambientLight intensity={0.1} />
      < spotLight position={ [ 5, 5, -10 ] } angle={ 0.15 } penumbra={ 1 } />
      < pointLight position={ [ -10, -10, -10 ] } />
    </>
  );
};

function Models() {
  return (
    < Provider store={ DataStore } >
      < DiamondModels />
    </ Provider >
  );
};

function DiamondGlow() {
  return (
    < EffectComposer >
      < Bloom luminanceThreshold={ 2 } intensity={ .18 } levels={ 9 } mipmapBlur />
    </ EffectComposer >
  );
};



/*
const spotLight: any = useRef();
useHelper(spotLight, BoxHelper, 'cyan') 
*/
{/* <color attach="background" args={['white']} /> */}
{/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" /> */}
{/* <LessonOverlay lesson={lesson} setPage={props.setPage}/> */}