import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './components/Stars'
import LessonNavBar from './components/lesson_navigation'
import Text from './components/lesson_1/text'
import Models from './components/lesson_1/models'
import store from './store'


import Home from './components/Home'
import Lesson1 from './components/Lesson1.jsx'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'
import { Provider } from 'react-redux';


export default function App() {


  const [page, setPage] = useState('lesson1');
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
  

  if(page === 'home')
  {
    return (<Home setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />);
  }

  else if(page === 'lesson1')
  {
    return (
      <>
        <LessonNavBar />
        <Text />
        {/* <Lesson1 /> */}
          <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>
            <color attach="background" args={["#000000"]} />
            <Suspense fallback={null}>
              <spotLight position={[10, 10, 10] } intensity={.8}/>
              <ambientLight intensity={.5} />
              <Stars />
              <Provider store={store}>
                <Models/>
              </Provider>
            </Suspense>
          </Canvas>
      </>
    )
  }


  
  else if(page === 'lesson2')
  {
    return (<Lesson2 />)
  }
  else if(page === 'lesson3')
  {
    return (<Lesson3 />)
  }
  else return <h1>Uh oh, something broke.</h1>
  
}
