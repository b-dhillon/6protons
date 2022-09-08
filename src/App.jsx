import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';

useGLTF.preload(`/lesson1_models/model0.glb`)
useGLTF.preload(`/lesson1_models/model1.glb`)
useGLTF.preload(`/lesson1_models/model2.glb`)
useGLTF.preload(`/lesson1_models/model3.glb`)
useGLTF.preload(`/lesson1_models/model4.glb`)
useGLTF.preload(`/lesson1_models/model5.glb`)

export default function App() {
  const [page, setPage] = useState('Home');
  const [loading, setLoading] = useState([])

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
    return <Home setPage={handlePage} loading={loading} setLoading={handleLoading} />;
  }

  else if(page === 'Fullerenes_Lesson')
  {
    return <FullerenesLesson setPage={handlePage} /> 
  }  

  else if(page === 'Diamonds_Lesson')
  {
    return <DiamondsLesson setPage={handlePage} />
  }
  else if(page === 'Graphene_Lesson')
  {
    return <GrapheneLesson setPage={handlePage} />
  }

  else return <NanotubesLesson setPage={handlePage} />
}
