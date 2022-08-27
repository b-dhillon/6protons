import { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../actions';
import MemoizedStars from '../../components/Stars'
import Models from './Models'
import HomeText from './HomeText';
import './styles.css';

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
          <h1 class='loading--title'>loading...</h1>
          <h2>for the best experience, please use google chrome.</h2>
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
              <ambientLight intensity={.2} />
              {started ? '' : <Models flipped={flipped}/>}
          </Suspense>
      </Canvas>

      <div className='overlay'>
        <div className='overlay--wrapper' style={{top: (started ? 0 : '52%')}}>
          <HomeText setPage={props.setPage} overlay={props.overlay} setOverlay={props.setOverlay} rotateModel={rotateModel}/>

          
          { started ? '' : <button className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => { dispatch(start());}}
          >
            {started ? "Back to Home" : "Get Started"}
          </button>}
          


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



        </div>
      </div>
    </>
  )
}

export default HomePage;