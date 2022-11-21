import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSelector,  } from 'react-redux';
import { useGLTF, Html, OrbitControls } from '@react-three/drei';
import Stars from '../../components/Stars';
import Models from './Models';
import './home-styles.css';
import StartBtn from './StartBtn';
useGLTF.preload( `/home_models/model0.glb`);
useGLTF.preload( `/diamond_models/model0.glb`);
// import { Stats } from '@react-three/drei';
// import { start } from '../../redux/actions';
// import * as THREE from 'three';
// import fullerenesThumbnail from '../../images/fullerene.jpeg';
// import nanotubesThumbnail from '../../images/nanotube.jpeg';
// import diamondsThumbnail from '../../images/diamond.png';
// import grapheneThumbnail from '../../images/graphene.jpg';
// import Card from './Card';


function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);
  const [fadeDone, setFadeDone] = useState(false);


  const started = useSelector(state => state.start);


  function handleFlip() {
    if (!started) setFlipped(!flipped);
  }

  function Spinner() {
    console.log('spinner spinning');
    return (
      <div className='spinnerWrapper'>
        <h1 className='loading--title'>loading</h1>
      </div> 
    )
  }

  function handleFadeDoneAfter2Seconds() {
    setTimeout( () => {
      setFadeDone(true);
    }, 2000 )
  }; handleFadeDoneAfter2Seconds();

  return ( 
    <>
      <Suspense fallback={null}>
        {/* <Stats showPanel={0} className="stats" {...props} /> */}

        {/* Canvas is executing asynchronously. After it begins executing, it cues up <Models /> to load. 
        Only after model resolves its promise does Canvas callback and execute again and paint */}
        {!fadeDone ? <div className="blackFade"></div> : ""}

        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 8, fov: 75, position: [0,0,4] }}>
          <OrbitControls/>
          
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