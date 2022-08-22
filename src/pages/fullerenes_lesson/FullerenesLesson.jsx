import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei'
import { Provider } from 'react-redux';
import FullereneModels from './FullereneModels';
import FullereneText from './FullereneText';
import LessonNav from '../../components/LessonNav';
import HomeNav from '../../components/HomeNav';
import MemoizedStars from '../../components/Stars';
import DataStore from '../../store';
import './fullerene-styles.css'

function FullerenesLesson(props) {
    const [lessonLoading, setLessonLoading] = useState(true)

    useEffect(() =>
    {
      setTimeout(() => setLessonLoading(false) , 2200)
    }, [])
  
  
    if (lessonLoading) {
      return (
        <>
          <div className='spinnerWrapper'>
            <div className='spinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <h1 style={{marginTop: 80}}>loading fullerenes</h1>
          </div>
        </>
      )
    }

    else return (
        <>
            {/* <Stats showPanel={0} className="stats" {...props} /> */}
            <HomeNav setPage={props.setPage} />
            <LessonNav />
            <FullereneText />
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                  <spotLight position={[10, 10, 10] } intensity={.8}/>
                  <ambientLight intensity={.3} />
                  <MemoizedStars />
                  <Provider store={DataStore}>
                      <FullereneModels/>
                  </Provider>
                </Suspense>
            </Canvas>
        </>
    )
}

export default FullerenesLesson;