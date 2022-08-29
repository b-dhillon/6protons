import { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../actions';
import MemoizedStars from '../../components/Stars'
import Card from './Card';
import Models from './Models'
import './home-styles.css';
import fullerenesThumbnail from '../../images/fullerenes2.jpeg';
import nanotubesThumbnail from '../../images/nano.jpeg';
import diamondsThumbnail from '../../images/diamonds12-min.png';
import grapheneThumbnail from '../../images/graphene.jpg';
// import { Stats } from '@react-three/drei'
// import HomeText from './HomeText';





function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();

  // const [cameraRotate, setCameraRotate] = useState(false);
  // function RotateCamera({cameraRotate}) {
  //   // const rotatedCamera = useSelector(state => state.rotatedCamera);

  //   useFrame((state) => 
  //   {
  //     state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (rotatedCamera ? (Math.PI) : 0), 0.15)
  //   })
  

  //   return <></>
  // }

  function rotateModel()
  {
    setFlipped(!flipped);
  }

  useEffect(() =>
  {
    setTimeout(() => props.setLoading() , 3500)
  }, [])

  useEffect(() => {
    if (started)
    {
      const lessonSelection = document.querySelector(".lessonSelection--wrapper");
      lessonSelection.classList.remove("hidden")
      const hero = document.querySelector(".hero--wrapper");
      hero.classList.add("hidden")


      console.log('done');
    } 
    else {
      const lessonSelection = document.querySelector(".lessonSelection--wrapper");
      if(lessonSelection) {
        lessonSelection.classList.add("hidden")
        const hero = document.querySelector(".hero--wrapper");
        hero.classList.remove("hidden")
        console.log('done');

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
          {/* <h2>for the best experience, please use google chrome.</h2> */}
        </div>
      </>
    )
  }

  else return (
    <>
      {/* <Stats showPanel={0} className="stats" {...props} /> */}

      <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0, 2.5] }}>
        <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
              {/* <RotateCamera cameraRotate={cameraRotate}/> */}
              <MemoizedStars />
              <spotLight position={[10, 10, 10] } intensity={1}/>
              <ambientLight intensity={.3} />
              {started ? '' : <Models flipped={flipped}/>}
          </Suspense>
      </Canvas>

      <div className='overlay'>

        {/* <div className='overlay--wrapper' style={{top: (started ? 0 : 0)}}> */}
          {/* <HomeText setPage={props.setPage} overlay={props.overlay} setOverlay={props.setOverlay} rotateModel={rotateModel}/> */}


          <div className='hero--wrapper'>
            <h1 className='hero--title'>Learn by Seeing</h1>
            <p className='hero--subtitle'>A visual introduction to carbon allotropes.</p>
            <button className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { dispatch(start());}}>
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

              <button className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { dispatch(start());}}>
                {started ? "Back to Home" : "Get Started"}
              </button>

            </div>
          </div>

        {/* { started ? '' : <div className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => {
          dispatch(start());
          // Timeout is to create a delay between camera rotating and paining of 
          // lesson DOM elements to the screen. This produces a smoother animation with less 
          // frames being dropped.
          // setTimeout(() => props.setOverlay() , 600)
          }}>
            <div><a title={started ? "Back to Home" : "Get Started"}></a></div>
        </div>
        } */}

        {/* </div> */}
      </div>
    </>
  )
}

export default HomePage;