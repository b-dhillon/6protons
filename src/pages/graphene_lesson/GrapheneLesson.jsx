import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Provider } from 'react-redux';
import MemoizedStars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import DataStore from '../../redux/store';
import LessonNav from '../../components/LessonNav';
import GrapheneModels from './GrapheneModels.jsx';
import GrapheneText from './GrapheneText.jsx'

function GrapheneLesson(props) {
    // const [lessonLoading, setLessonLoading] = useState(true)
    // useEffect(() =>
    // {
    //   setTimeout(() => setLessonLoading(false) , 1500)
    // }, [])
    // if (lessonLoading) {
    //   return (
    //     <>
    //       <div className='spinnerWrapper'>
    //         <div className='spinner' >
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //         </div>
    //         <h1 style={{marginTop: 80}}>loading graphene</h1>
    //       </div>
    //     </>
    //   )
    // }


    return (
      <>
          <HomeNav setPage={props.setPage} setOverlay={props.setOverlay} />
          <LessonNav />
          
          <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
            <MemoizedStars />
            <Suspense fallback={null}>

                <Provider store={DataStore}>
                    <GrapheneModels/>
                </Provider>

                <spotLight position={[10, 10, 10] } intensity={4}/>
                <spotLight position={[-10, 10, 10] } intensity={4}/>
                <spotLight position={[1, 1, 1] } intensity={4}/>
                <spotLight position={[-1, 1, 1] } intensity={4}/>
                <pointLight position={[0, 0, -1.2] } intensity={20}/>
                <ambientLight intensity={3} />
            
            </Suspense>
          </Canvas>
          <GrapheneText setPage={props.setPage}/>
      </>
    );
}

export default GrapheneLesson;