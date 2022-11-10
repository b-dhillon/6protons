import { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { TrackballControls, MeshRefractionMaterial, OrbitControls } from '@react-three/drei'
import Stars from '../../components/Stars';
import DataStore from '../../redux/store';
import DiamondModels from './DiamondModels';
import LessonOverlay from '../../components/LessonOverlay';




function DiamondsLesson(props) {
  const lesson = 'Diamonds';

  return (
    <>
      <Suspense fallback={null}>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
          <OrbitControls noZoom />

          <Stars />
          <Provider store={DataStore}>
            <DiamondModels/>
          </Provider>
          <ambientLight intensity={.2} />
          <spotLight position={[10, 10, 10] } intensity={1}/>
              {/* <spotLight position={[-10, 10, 10] } intensity={4}/> */}
              {/* <pointLight position={[0, -0.5, -1] } intensity={20}/> */}
              {/* <pointLight position={[0, -0.5, -1] } intensity={20}/> */}
        </Canvas>
        {/* <LessonOverlay lesson={lesson} setPage={props.setPage}/> */}
      </Suspense>
    </>
  );
}

export default DiamondsLesson;