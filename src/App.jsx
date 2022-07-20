import React, { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './components/Stars'
import * as THREE from 'three'
import BottomNavBar from './components/BottomNavBar'

import HomePage from './components/HomePage'
import Lesson1 from './components/Lesson1.jsx'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'

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


  // const [loading, setLoading] = useState(true)

  // useEffect(() =>
  // {
  //   setTimeout(() => setLoading(false), 3000)
  // }, [])

  
  // if(loading === false)
  // {
  //   return (<HomePage setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />)
  // }
  // else return (<h1>Loading...</h1>)
  

  if(page === 'home')
  {
    return (<HomePage setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />);
  }

  else if(page === 'lesson1')
  {
    return (
      <>
      {/* <BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext} /> */}
      <BottomNavBar />
        {/* <Lesson1 /> */}
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 2] }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <spotLight position={[10, 10, 10] } intensity={.8}/>
            <ambientLight intensity={.5} />
            <Stars />
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
