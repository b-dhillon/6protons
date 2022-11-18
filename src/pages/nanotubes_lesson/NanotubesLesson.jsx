import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Stars from '../../components/Stars';
import NanotubeModels from './NanotubeModels';
import DataStore from '../../redux/store';
// import { TrackballControls } from '@react-three/drei'
import { Provider } from 'react-redux';
import './nanotube-styles.css'
import LessonOverlay from '../../components/LessonOverlay';



function NanotubesLesson(props) {
  const lesson = 'Nanotubes';

  return (
    <>
      <Suspense fallback={null}>
        <div className="blackFade"></div>

        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,1.66] }}>
          {/* <TrackballControls/> */}
          <Stars />
          <spotLight position={[10, 10, 10] } intensity={4}/>
          <spotLight position={[-10, 10, 10] } intensity={4}/>
          <pointLight position={[0, -0.5, -1] } intensity={3}/>
          <ambientLight intensity={3} />
          <Provider store={DataStore}>
              <NanotubeModels/>
          </Provider>
        </Canvas>

        <LessonOverlay lesson={lesson} setPage={props.setPage}/>
      </Suspense>
    </>
  );
}

export default NanotubesLesson; 
