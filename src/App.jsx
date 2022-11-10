import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';


export default function App() {
  console.log('APP RE-RENDERED');
  const [page, setPage] = useState('Diamonds_Lesson');
  const [loading, setLoading] = useState(true)

  function handleLoading() {
    setLoading(false);
  }

  function handlePage(id){
    setPage(`${id}`)
  }  

  if(page === 'Home') return <Home setPage={handlePage} loading={loading} setLoading={handleLoading} />;
  if(page === 'Fullerenes_Lesson') return <FullerenesLesson setPage={handlePage} /> 
  if(page === 'Diamonds_Lesson') return <DiamondsLesson setPage={handlePage} />
  if(page === 'Graphene_Lesson') return <GrapheneLesson setPage={handlePage} />
  else return <NanotubesLesson setPage={handlePage} />
}
