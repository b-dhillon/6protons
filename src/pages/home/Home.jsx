import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';
import { useGLTF, Html } from '@react-three/drei';
import { Stats } from '@react-three/drei';
import Stars from '../../components/Stars';


import * as THREE from 'three';
import fullerenesThumbnail from '../../images/fullerene.jpeg';
import nanotubesThumbnail from '../../images/nanotube.jpeg';
import diamondsThumbnail from '../../images/diamond.png';
import grapheneThumbnail from '../../images/graphene.jpg';
import Card from './Card';
import Models from './Models';

import './home-styles.css';

import StartBtn from './StartBtn';
useGLTF.preload( `/home_models/model0.glb`);
useGLTF.preload( `/diamond_models/model0.glb`);

function HomePage(props) 
{

  const [flipped, setFlipped] = useState(false);
  const started = useSelector(state => state.start);


  function handleFlip()
  {
    setFlipped(!flipped);
    console.log('flipped');
  }

  function Spinner() {
    console.log('spinner be spinning');
    return (
      <div className='spinnerWrapper'>
        <h1 className='loading--title'>loading</h1>
      </div> 
    )
  }

  return ( 
    <>
      <Suspense fallback={<Spinner/>}>
        {/* <Stats showPanel={0} className="stats" {...props} /> */}

        {/* Canvas is firing asynchronously. After it fires, it cues up <Models /> to load. 
        Only after model loads does Canvas fire again and paint */}

        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 8, fov: 75, position: [0,0,4] }}>
          
          {flipped && !started 
            ?
            <Html scale={.33} rotation={[0, 0, 0]} position={[0, 0, -1]} transform  >
                  <div className="annotation">
                      Steroid Hormone
                  </div>
            </Html> 
            : 
          ""}

          <spotLight position={[10, 10, 10] } intensity={1}/>
          <ambientLight intensity={.3} />

          <Models flipped={flipped}/>
          <Stars />
        </Canvas>

        <div className='overlay'>
          <div className='hero--wrapper'>

            <h1 className='hero--title'>Learn by Seeing</h1>
            <p className='hero--subtitle'>A visual approach to organic chemistry.</p>

            
          </div>
          <StartBtn handleFlip={handleFlip} setPage={props.setPage} />
        </div>

      </Suspense>
    </>
  )
}

export default HomePage;