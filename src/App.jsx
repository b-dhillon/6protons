import React, { useState } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';


export default function App() {
  console.log('APP RE-RENDERED');
  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true)

  function handleLoading() {
    setLoading(false);
  }

  function handlePage(id){
    setPage(`${id}`)
  }  

  if(page === 'home') return <Home setPage={handlePage} loading={loading} setLoading={handleLoading} />;
  if(page === 'fullerene') return <FullerenesLesson setPage={handlePage} /> 
  if(page === 'diamond') return <DiamondsLesson setPage={handlePage} />
  if(page === 'graphene') return <GrapheneLesson setPage={handlePage} />
  else return <NanotubesLesson setPage={handlePage} />
}
