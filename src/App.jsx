import React, { useState, useMemo } from 'react';
import Home from './pages/home/Home';
import FullerenesLesson from './pages/fullerenes_lesson/FullerenesLesson.jsx';
import DiamondsLesson from './pages/diamonds_lesson/DiamondsLesson.jsx';
import NanotubesLesson from './pages/nanotubes_lesson/NanotubesLesson.jsx';
import GrapheneLesson from './pages/graphene_lesson/GrapheneLesson.jsx';
import TestScene from './pages/camera_movement/TestScene.jsx';


export default function App() {

  console.log('APP RE-RENDERED');
  const [page, setPage] = useState('cameraTest');
  const [loading, setLoading] = useState(true);
  const never = 0;

  function randomSpherePoints(radius, count) {
      const points =  new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const s = Math.sin(phi);
        const x = radius * s * Math.cos(theta);
        const y = radius * s * Math.sin(theta);
        const z = radius * Math.cos(phi);
        points[i] = x;
        points[i + 1] = y;
        points[i + 2] = z;
      }
      return points;
  };

  // caches the array of points, so it only gets created once.
  const start = performance.now(); 
  const sphere2 = useMemo(() => randomSpherePoints(5, 50000), [never] );
  const end = performance.now();
  console.log(`Execution Time: ${(end - start).toFixed(5)} ms`);

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
