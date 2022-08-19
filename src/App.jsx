import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';

export default function App() {
  console.log('App.JSX Rendered');
  const [page, setPage] = useState('Home');
  const [loading, setLoading] = useState([])
  const [overlay, setOverlay] = useState(false);

  function handleOverlay(){
    setOverlay(!overlay);
  }

  function handleLoading()
  {
    setLoading(loading.push(1));
  }

  function handlePage(id)
  {
    setPage(`${id}`)
  }  

  if(page === 'Home')
  {
    return (<Home setPage={handlePage} loading={loading} setLoading={handleLoading} overlay={overlay} setOverlay={handleOverlay}/>);
  }

  else if(page === 'Fullerenes_Lesson')
  {
    return (
      <FullerenesLesson setPage={handlePage} />
    )
  }  

  else if(page === 'Diamonds_Lesson')
  {
    return (<DiamondsLesson setPage={handlePage}/>)
  }

  else if(page === 'Nanotubes_Lesson')
  {
    return (<NanotubesLesson setPage={handlePage}/>)
  }
  else return <h1>Uh oh, something broke.</h1>
}
