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
      setTimeout(() => setLessonLoading(false) , 2000)
    }, [])
  
  
    if (lessonLoading) {
      return (
        <>
          <div className='lessonSpinnerWrapper'>
            <div className='lessonSpinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <h1>loading diamonds</h1>
          </div>
        </>
      )
    }


    else return (
      <>
          <HomeNav setPage={props.setPage} />
          <LessonNav />
          <DiamondText />
          <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
              <color attach="background" args={["#000000"]} />
              <Suspense fallback={null}>
                <Provider store={DataStore}>
                  <DiamondModels/>
                </Provider>
                <spotLight position={[10, 10, 10] } intensity={.8}/>
                <ambientLight intensity={.3} />
                <MemoizedStars />
              </Suspense>
          </Canvas>
      </>
    );
}

export default DiamondsLesson;