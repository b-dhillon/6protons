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

useGLTF.preload(`/home_models/model0.glb`);



// function onPageLoad() {
//   setTimeout( () => {
//     console.log('executed');
//     document
//       .querySelector(".hero--wrapper")
//       .style
//       .display = 'flex';

//   // To make the font load queue before the rest of the models
//   setTimeout( () => {
//     console.log('Starting pre-load of all other models');
//     useGLTF.preload( `/lesson1_models/model0.glb`);
//     useGLTF.preload( `/lesson2_models/model0.glb`);
//     useGLTF.preload( `/lesson3_models/model0.glb`);
//     useGLTF.preload( `/lesson4_models/model0.glb`);
//   }, 1000)
// } 
// }

function HomePage(props) 
{
    // THREE.DefaultLoadingManager.onLoad = onPageLoad;

    const [flipped, setFlipped] = useState(false);
    const started = useSelector(state => state.start);





    // Adds/Removes .hidden class between home page and lesson selection page. 
    // useEffect(() => {
    //   const hero = document.querySelector(".hero--wrapper");
    //   const lessonSelection = document.querySelector(".lessonSelection--wrapper");

    //   if (started)
    //   {
    //     hero.classList.add("hidden");
    //     // lessonSelection.classList.remove("hidden");
    //   } 
    //   else {
    //     hero.classList.remove("hidden");
    //     // if(lessonSelection) {
    //     //   // lessonSelection.classList.add("hidden");
    //     // }
    //   }
    // }, [started])


    function handleFlip()
    {
        setFlipped(!flipped);
    }

    function Spinner()
    {
        console.log('ive been called');
        return (
            <div className='spinnerWrapper'>
                <h1 className='loading--title'>loading...</h1>
            </div>
        )
    }

    return (
        <>
            <Suspense fallback={null}>
                {/* <Stats showPanel={0} className="stats" {...props} /> */}

                {/* Canvas is firing asynchronously. After it fires, it cues up <Models /> to load. 
        Only after model loads does Canvas fire again and paint */}
                <Canvas gl={{ alpha: false }} dpr={[1, 2]} camera={{ near: 0.01, far: 8, fov: 75, position: [0, 0, 5] }}>

                    {flipped && !started
                        ?
                        <Html scale={.33} rotation={[0, 0, 0]} position={[0, 0, -1]} transform  >
                            <div className="annotation">
                                Steroid Hormone 🩸
                            </div>
                        </Html>
                        :
                        ""}

                    <spotLight position={[10, 10, 10]} intensity={1} />
                    <ambientLight intensity={.3} />

                    {/* { started ? '' : <Models flipped={flipped}/> } */}
                    <Models flipped={flipped} />
                    <Stars />
                </Canvas>

                <div className='overlay'>
                    <div className='hero--wrapper'>

                        <h1 className='hero--title'>Learn by Seeing</h1>
                        <p className='hero--subtitle'>A visual approach to learning organic chemistry.</p>
                        {/* 
            <button className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { 
              dispatch(start());
              useGLTF.preload(`/lesson1_models/model0.glb`);
              useGLTF.preload(`/lesson2_models/model0.glb`);
              useGLTF.preload(`/lesson3_models/model0.glb`);
              useGLTF.preload(`/lesson4_models/model0.glb`);
              }}>
              Get Started
            </button> */}

                    </div>

                    {/* <div className={`lessonSelection--wrapper hidden`}>
            <div className='lessonSelection'>
              <h1 className='lessonSelection--title'>Please select a lesson</h1>

              <div className='card--container'>
                <div className='card--wrapper'>
                  <Card id={'Fullerenes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Fullerenes"} img={fullerenesThumbnail}  />
                  <Card id={'Nanotubes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Nanotubes"} img={nanotubesThumbnail} />
                  <Card id={'Diamonds'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Diamonds"} img={diamondsThumbnail} />
                  <Card id={'Graphene'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Graphene"} img={grapheneThumbnail} />
                </div>
              </div>

              <button className="heroBtn" onClick={() => { 
                dispatch(start());}}>
                Back
              </button>
            </div>
          </div> */}
                    <StartBtn handleFlip={handleFlip} setPage={props.setPage} />
                </div>
            </Suspense>
        </>
    )
}

export default HomePage;