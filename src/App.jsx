import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';

export default function App() {
  const [page, setPage] = useState('Home');
  const [loading, setLoading] = useState([])
  const [overlay, setOverlay] = useState(false);


  function handleOverlay(){
    setOverlay(a => !a);
  }

  function handleLoading()
  {
    setLoading(loading.push(1));
  }

  function handlePage(id)
  {
    setPage(`${id}`)
  }  

  console.log('App.JSX Rendered');

  if(page === 'Home')
  {
    return <Home setPage={handlePage} loading={loading} setLoading={handleLoading} overlay={overlay} setOverlay={handleOverlay}/>;
  }

  else if(page === 'Fullerenes_Lesson')
  {
    return <FullerenesLesson setPage={handlePage} setOverlay={handleOverlay}/> 
  }  

  else if(page === 'Diamonds_Lesson')
  {
    return <DiamondsLesson setPage={handlePage} setOverlay={handleOverlay}/>
  }
  else if(page === 'Graphene_Lesson')
  {
    return <GrapheneLesson setPage={handlePage} setOverlay={handleOverlay}/>
  }

  else return <NanotubesLesson setPage={handlePage} setOverlay={handleOverlay}/>


}
