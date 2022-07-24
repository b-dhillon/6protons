import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';





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

  if(page === 'Home')
  {
    return (<Home setPage={handlePage} setCameraRotate={handleClick} cameraRotate={cameraRotate} />);
  }

  else if(page === 'Fullerenes_Lesson')
  {
    return (
      <>
        <FullerenesLesson setPage={handlePage} setCameraRotate={handleClick}/>
      </>
    )
  }


  
  else if(page === 'Diamonds_Lesson')
  {
    return (<DiamondsLesson />)
  }

  else if(page === 'Nanotubes_Lesson')
  {
    return (<NanotubesLesson/>)
  }
  else return <h1>Uh oh, something broke.</h1>
  
}
