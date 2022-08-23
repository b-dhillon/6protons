import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MemoizedStars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import { Provider } from 'react-redux';
import DiamondModels from './DiamondModels';
import DataStore from '../../store';
import LessonNav from '../../components/LessonNav';
import './diamond-styles.css'
import DiamondText from './DiamondText';

function DiamondsLesson(props) {
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
            <h1 style={{marginTop: 80}}>loading diamonds</h1>
          </div>
        </>
      )
    }


    else return (
      <>
          <HomeNav setPage={props.setPage} setOverlay={props.setOverlay} />
          <LessonNav />
          <DiamondText />
          <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
              <color attach="background" args={["#000000"]} />
              <Suspense fallback={null}>
                <Provider store={DataStore}>
                  <DiamondModels/>
                </Provider>
                <spotLight position={[10, 10, 10] } intensity={4}/>
                <spotLight position={[-10, 10, 10] } intensity={4}/>
                <pointLight position={[0, -0.5, -1] } intensity={3}/>
                <ambientLight intensity={3} />
                <MemoizedStars />
              </Suspense>
          </Canvas>
      </>
    );
}

export default DiamondsLesson;