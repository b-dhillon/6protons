import { Suspense, useState, useEffect } from 'react';
import { Canvas,  } from '@react-three/fiber';
import { Provider } from 'react-redux';
import FullereneModels from './FullereneModels';
import FullereneText from './FullereneText';
import LessonNav from '../../components/LessonNav';
import HomeNav from '../../components/HomeNav';
import MemoizedStars from '../../components/Stars';
import DataStore from '../../redux/store';

function FullerenesLesson(props) {
    // const [lessonLoading, setLessonLoading] = useState(true)
    // useEffect(() =>
    // {
    //   setTimeout(() => setLessonLoading(false) , 1500)
    // }, [])  
    // if (lessonLoading) {
    //   return (
    //     <>
    //       <div className='spinnerWrapper'>
    //         <div className='spinner'>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //         </div>
    //         <h1 style={{marginTop: 80}}>loading fullerenes</h1>
    //       </div>
    //     </>
    //   )
    // }
    return (
      <>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>      
            <Suspense fallback={null}>
              <MemoizedStars />
              <Provider store={DataStore}>
                  <FullereneModels/>
              </Provider>
              <spotLight position={[10, 10, 10] } intensity={.8}/>
              <ambientLight intensity={.3} />
            </Suspense>
          </Canvas>
          <HomeNav setPage={props.setPage} setOverlay={props.setOverlay} />
          <LessonNav />
          <div className="text--wrapper--wrapper">
            <FullereneText />
          </div>
      </>
    )
}

export default FullerenesLesson;