import { Suspense, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import Stars from '../Universe';
import DataStore from '../redux/store';
import DiamondModels from './DiamondModels';
// import LessonOverlay from '../LessonOverlay';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
// import * as THREE from 'three'


function DiamondsLesson(props: any) {
  const lesson = 'Diamonds';

  const spotLight: any = useRef();
  // useHelper(spotLight, BoxHelper, 'cyan')



  const [fadeDone, setFadeDone] = useState(false);
  function handleFadeDoneAfter2Seconds() {
    setTimeout( () => {
      setFadeDone(true);
    }, 2000 )
  }; handleFadeDoneAfter2Seconds();




  return (
    <>
      <Suspense fallback={null}>
        {!fadeDone ? <div className="blackFade"></div> : ""}


        {/* <div className="blackFade"></div> */}
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
          {/* <color attach="background" args={['white']} /> */}


          <OrbitControls autoRotate autoRotateSpeed={.5} minPolarAngle={0} maxPolarAngle={Math.PI / 2}/>
          {/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" /> */}


          <Stars />

          <Provider store={DataStore}>
            <DiamondModels />
          </Provider>

          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, -10]} angle={0.15} penumbra={1} ref={spotLight} />
          <pointLight position={[-10, -10, -10]} />



          <EffectComposer>
            <Bloom luminanceThreshold={2} intensity={2.5} levels={9} mipmapBlur />
          </EffectComposer>

        </Canvas>

        {/* <LessonOverlay lesson={lesson} setPage={props.setPage}/> */}
      </Suspense>
    </>
  );
}

export default DiamondsLesson;