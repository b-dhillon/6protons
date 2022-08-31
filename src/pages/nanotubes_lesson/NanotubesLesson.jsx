import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Stars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import LessonNav from '../../components/LessonNav';
import NanotubeText from './NanotubeText';
import NanotubeModels from './NanotubeModels';
import DataStore from '../../store';
import './nanotube-styles.css'
import { OrbitControls, PointerLockControls, TrackballControls } from '@react-three/drei'


import { Provider } from 'react-redux';


function NanotubesLesson(props) {

  const [lessonLoading, setLessonLoading] = useState(true)

  useEffect(() =>
  {
    setTimeout(() => setLessonLoading(false) , 1500)
  }, [])

  
  if (lessonLoading) {
    return (
      <>
        <div className='spinnerWrapper'>
          <div className='spinner' >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 style={{marginTop: 80}}>loading nanotubes</h1>
        </div>
      </>
    )
  }

  else return (
      <>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
          {/* <OrbitControls/> */}
          {/* <PointerLockControls/> */}
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
