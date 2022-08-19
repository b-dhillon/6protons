import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MemoizedStars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';



function DiamondsLesson(props) {
    const [lessonLoading, setLessonLoading] = useState(true)

    useEffect(() =>
    {
      setTimeout(() => setLessonLoading(false) , 2200)
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
            <h1>loading lesson</h1>
          </div>
        </>
      )
    }


    else return (
        <>
            <HomeNav setPage={props.setPage} />
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={1} />
                    <MemoizedStars />
                </Suspense>
            </Canvas>
        </>
    );
}

export default DiamondsLesson;