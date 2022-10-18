import { useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';
import fullerenesThumbnail from '../../images/fullerene.jpeg';
import nanotubesThumbnail from '../../images/nanotube.jpeg';
import diamondsThumbnail from '../../images/diamond.png';
import grapheneThumbnail from '../../images/graphene.jpg';
import MemoizedStars from '../../components/Stars'
import Card from './Card';
import Models from './Models'
import './home-styles.css';

import { OrbitControls, Stats } from '@react-three/drei'
function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();

  const [loadState, setLoadState] = useState(document.readyState);

  function rotateModel()
  {
    setFlipped(!flipped);
  }

  useEffect(() =>
  {
    setTimeout(() => props.setLoading() , 3700)
  }, [])




  useEffect(() => {
    if (started)
    {
      const hero = document.querySelector(".hero--wrapper");
      hero.classList.add("hidden")
      const lessonSelection = document.querySelector(".lessonSelection--wrapper");
      lessonSelection.classList.remove("hidden")
    } 
    else {
      const lessonSelection = document.querySelector(".lessonSelection--wrapper");
      if(lessonSelection) {
        lessonSelection.classList.add("hidden")
        const hero = document.querySelector(".hero--wrapper");
        hero.classList.remove("hidden")
      }

    }
  }, [started])


  if (props.loading.length === 0) {
    return (
      <>
        <div className='spinnerWrapper'>
          <div className='spinner'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className='loading--title'>loading</h1>
        </div>
      </>
    )
  }

  else console.log(document.readyState)
  return (
    <>
      <Stats showPanel={0} className="stats" {...props} />
      <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0, 1.66] }}>
          <Suspense fallback={null}>
              <MemoizedStars />
              <spotLight position={[10, 10, 10] } intensity={1}/>
              <ambientLight intensity={.3} />
              {started ? '' : <Models flipped={flipped}/>}
          </Suspense>
      </Canvas>

      <div className='overlay'>

        <div className='hero--wrapper'>
          <h1 className='hero--title'>Learn by Seeing</h1>
          <p className='hero--subtitle'>A visual introduction to carbon crystals.</p>
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
    </>
  )
}

export default HomePage;