import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MemoizedStars from './components/Stars';
import LessonNav from './components/LessonNav';
import LessonText from './components/Lessons/Lesson_1/LessonText';
import Models from './components/Lessons/Lesson_1/LessonModels';
import DataStore from './store';

import Home from './components/Home';
import HomeNav from './components/HomeNav';
import Lesson_1 from './components/Lessons/Lesson_1/Lesson_1.jsx';
import Lesson_2 from './components/Lessons/Lesson_2/Lesson_2.jsx';
import Lesson_3 from './components/Lessons/Lesson_3/Lesson_3.jsx';

import { Provider } from 'react-redux';


export default function App() {
  console.log('App.JSX Rendered');
  const [page, setPage] = useState('Home');
  const [cameraRotate, setCameraRotate] = useState(false);

  function handleClick() 
  {
    setCameraRotate(!cameraRotate)
  }

  function handlePage(id)
  {
    setPage(`${id}`)
  }


  {/* <Lesson1 setPage={handlePage} setCameraRotate={handleClick}/> */}
  

  if(page === 'Home')
  {
    return (<Home setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />);
  }

  else if(page === 'Lesson_1')
  {
    return (
      <>
        <HomeNav setPage={handlePage} setCameraRotate={handleClick}/>
        <LessonNav />
        <LessonText />

        {/* <Lesson1 /> */}
          <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>
            <color attach="background" args={["#000000"]} />
            <Suspense fallback={null}>
              <spotLight position={[10, 10, 10] } intensity={.8}/>
              <ambientLight intensity={.3} />
              <MemoizedStars />
              <Provider store={DataStore}>
                <Models/>
              </Provider>
            </Suspense>
          </Canvas>
      </>
    )
  }


  
  else if(page === 'Lesson_2')
  {
    return (<Lesson_2 />)
  }

  else if(page === 'Lesson_3')
  {
    return (<Lesson_3 />)
  }
  else return <h1>Uh oh, something broke.</h1>
  
}
