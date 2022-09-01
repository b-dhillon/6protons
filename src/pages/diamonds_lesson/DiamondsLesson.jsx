import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MemoizedStars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import { Provider } from 'react-redux';
import DiamondModels from './DiamondModels';
import DataStore from '../../redux/store';
import LessonNav from '../../components/LessonNav';
import DiamondText from './DiamondText';
import { OrbitControls } from '@react-three/drei'


function DiamondsLesson(props) {
    return (
      <>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
          <OrbitControls/>
            <Suspense fallback={null}>
              <MemoizedStars />
              <Provider store={DataStore}>
                <DiamondModels/>
              </Provider>
              <spotLight position={[10, 10, 10] } intensity={4}/>
              <spotLight position={[-10, 10, 10] } intensity={4}/>
              <pointLight position={[0, -0.5, -2] } intensity={20}/>
              <ambientLight intensity={3} />
            </Suspense>
        </Canvas>
        <HomeNav setPage={props.setPage} setOverlay={props.setOverlay} />
        <LessonNav />
        <DiamondText />
      </>
    );
}

export default DiamondsLesson;