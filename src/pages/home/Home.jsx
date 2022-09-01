import { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';
import fullerenesThumbnail from '../../images/fullerenes2.jpeg';
import nanotubesThumbnail from '../../images/nano.jpeg';
import diamondsThumbnail from '../../images/diamonds12-min.png';
import grapheneThumbnail from '../../images/graphene.jpg';
import MemoizedStars from '../../components/Stars'
import Card from './Card';
import Models from './Models'
import './home-styles.css';
import { Stats } from '@react-three/drei'

function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();

  function rotateModel()
  {
    setFlipped(!flipped);
  }

  useEffect(() =>
  {
    setTimeout(() => props.setLoading() , 1600)
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
          <h1 class='loading--title'>loading</h1>
        </div>
      </>
    )
  }

  else return (
    <>
      {/* <Stats showPanel={0} className="stats" {...props} /> */}
      <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0, 2.5] }}>
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
          <p className='hero--subtitle'>A visual introduction to the chemistry of carbon crystals.</p>
          <button className="heroBtn"   onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { 
            dispatch(start());
            }}>
            Get Started
          </button>
        </div>

        <div className={`lessonSelection--wrapper hidden`}>
          <div className='lessonSelection'>
            <h1 className='lessonSelection--title'>Please select a lesson</h1>

            <div className='card--wrapper--wrapper'>
              <div className='card--wrapper'>
                <Card id={'Fullerenes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Fullerenes"} img={fullerenesThumbnail}  />
                <Card id={'Nanotubes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Nanotubes"} img={nanotubesThumbnail} />
                <Card id={'Graphene'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Graphene"} img={grapheneThumbnail} />
                <Card id={'Diamonds'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Diamonds"} img={diamondsThumbnail} />
              </div>
            </div>

            <button className="heroBtn" style={{height: '45px'}} onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { 
              dispatch(start());}}>
              Back to Home
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default HomePage;