import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Stars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import LessonNav from '../../components/LessonNav';
import NanotubeText from './NanotubeText';
import NanotubeModels from './NanotubeModels';
import DataStore from '../../store';
import './nanotube-styles.css'

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
            {/* <h1 style={{position: 'absolute', zIndex: 3, top: '40%', left: '24%'}}>This part of the world is under construction.</h1> */}

            <HomeNav setPage={props.setPage} setOverlay={props.setOverlay}/>
            <LessonNav />
            <NanotubeText setPage={props.setPage}/>


            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    {/* <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={.4} /> */}
                    <spotLight position={[10, 10, 10] } intensity={4}/>
                    <spotLight position={[-10, 10, 10] } intensity={4}/>
                    <pointLight position={[0, -0.5, -1] } intensity={3}/>
                    <ambientLight intensity={3} />
                    <Stars />
                    <Provider store={DataStore}>
                        <NanotubeModels/>
                    </Provider>
                </Suspense>
            </Canvas>
        </>
    );
}

export default NanotubesLesson; 
