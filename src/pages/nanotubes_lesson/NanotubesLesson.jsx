import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Stars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import LessonNav from '../../components/LessonNav';
import NanotubeText from './NanotubeText';
import NanotubeModels from './NanotubeModels';
import DataStore from '../../redux/store';
import './nanotube-styles.css'
import { TrackballControls } from '@react-three/drei'
import { Provider } from 'react-redux';


function NanotubesLesson(props) {

  return (
      <>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
          <TrackballControls/>
            <Suspense fallback={null}>
                <Stars />
                <spotLight position={[10, 10, 10] } intensity={4}/>
                <spotLight position={[-10, 10, 10] } intensity={4}/>
                <pointLight position={[0, -0.5, -1] } intensity={3}/>
                <ambientLight intensity={3} />
                <Provider store={DataStore}>
                    <NanotubeModels/>
                </Provider>
            </Suspense>
        </Canvas>

        <HomeNav setPage={props.setPage} setOverlay={props.setOverlay}/>
        <LessonNav />
        <NanotubeText setPage={props.setPage}/>
      </>
  );
}

export default NanotubesLesson; 
