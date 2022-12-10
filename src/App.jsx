import React, { useState, useMemo } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';
import TestScene from './pages/camera_movement/TestScene.jsx';

export default function App() {
  console.log('App() is called');

  const [page, setPage] = useState('home');
  const [loading, setLoading] = useState(true);

  function handleLoading() {
    setLoading(false);
  }

  function handlePage(id){
    setPage(`${id}`)
  }  

  if(page === 'home') return <Home setPage={handlePage} loading={loading} setLoading={handleLoading} />;
  if(page === 'fullerene') return <FullerenesLesson setPage={handlePage} /> ;
  if(page === 'diamond') return <DiamondsLesson setPage={handlePage} />;
  if(page === 'graphene') return <GrapheneLesson setPage={handlePage} />;
  if (page === 'cameraTest') return <TestScene />;
  else return <NanotubesLesson setPage={handlePage} />;
};


/* 
// generates and caches  array of points, so it only gets created once:

function randomSpherePoints(r, c) {
  const p =  new Float32Array(c);
  for (let i = 0; i < c; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const s = Math.sin(phi);
    const x = r * s * Math.cos(theta);
    const y = r * s * Math.sin(theta);
    const z = r * Math.cos(phi);
    p[i] = x;
    p[i + 1] = y;
    p[i + 2] = z;
  }
  return p;
};

const start = performance.now(); 
const sphere2 = useMemo(() => inSphere(new Float32Array(50000), { radius: 5 }), []);
const end = performance.now();
console.log(`execution time: ${(end - start).toFixed(5)} ms`);
*/