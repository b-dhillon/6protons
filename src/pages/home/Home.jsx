import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';
import { useGLTF } from '@react-three/drei';
import { Stats } from '@react-three/drei';
import Stars from '../../components/Stars';
import Card from './Card';
import Models from './Models';
import * as THREE from 'three';
import fullerenesThumbnail from '../../images/fullerene.jpeg';
import nanotubesThumbnail from '../../images/nanotube.jpeg';
import diamondsThumbnail from '../../images/diamond.png';
import grapheneThumbnail from '../../images/graphene.jpg';
import './home-styles.css';

useGLTF.preload( `/home_models/model0.glb`);

function onPageLoad() {
  console.log('onPageLoad executed');
  // document.querySelector('.loading--title').style.display = 'none'

  // setTimeout( () => {
  //   console.log('executed');
  //   document
  //     .querySelector(".hero--wrapper")
  //     .style
  //     .display = 'flex';

  // To make the font load queue before the rest of the models
  setTimeout( () => {
    console.log('Starting pre-load of all other models');
    useGLTF.preload( `/lesson1_models/model0.glb`);
    useGLTF.preload( `/lesson2_models/model0.glb`);
    useGLTF.preload( `/lesson3_models/model0.glb`);
    useGLTF.preload( `/lesson4_models/model0.glb`);
  }, 1000)
} 

function HomePage(props) 
{
  THREE.DefaultLoadingManager.onLoad = onPageLoad;

  const [flipped, setFlipped] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();  

  useEffect(() => {
    const hero = document.querySelector(".hero--wrapper");
    const lessonSelection = document.querySelector(".lessonSelection--wrapper");

    if (started)
    {
      hero.classList.add("hidden");
      lessonSelection.classList.remove("hidden");
    } 
    else {
      if(lessonSelection) {
        lessonSelection.classList.add("hidden");
        hero.classList.remove("hidden");
      }
    }
  }, [started])


  function rotateModel()
  {
    setFlipped(!flipped);
  }

  function Spinner() {
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
        <Stats showPanel={0} className="stats" {...props} />
        {/* Canvas is firing asynchronously ( verified by Test2() ). After it fires, it cues up Models to load. 
        Only after model loads does Canvas fire again and paint */}
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0,3] }}>
          <spotLight position={[10, 10, 10] } intensity={1}/>
          <ambientLight intensity={.3} />
          { started ? '' : <Models flipped={flipped}/> }
          <Stars />
        </Canvas>

        <div className='overlay'>
          <div className='hero--wrapper'>
            <h1 className='hero--title'>Learn by Seeing</h1>
            <p className='hero--subtitle'>A visual introduction to carbon nanomaterials.</p>
            <button className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { 
              dispatch(start());
              }}>
              Get Started
            </button>
          </div>

          <div className={`lessonSelection--wrapper hidden`}>
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
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default HomePage;