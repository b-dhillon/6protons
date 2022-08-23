import { useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import MemoizedStars from '../../components/Stars'
import * as THREE from 'three'
import fullerenesThumbnail from '../../images/fullerenes2.jpeg'
import diamondsThumbnail from '../../images/diamonds12-min.png'
import nanotubesThumbnail from '../../images/nano.jpeg'
import Models from './Models'
import { useSelector, useDispatch } from 'react-redux';
import { rotateCamera, resetCamera } from '../../actions';



import './styles.css';

// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

function Overlay(props) {
  const rotatedCamera = useSelector(state => state.rotatedCamera);


  function Card(props) {
    return (
      <div className="frame" onClick={() => 
        {
          props.setPage(`${props.id}_Lesson`)
          props.setOverlay();
        }
      }>
        <div className="card">
          <h1>{props.title}</h1>
          <img src={props.img} className='card--img' />
          <h3>{props.description}</h3>
        </div>
      </div>
    )
  }


  if(!rotatedCamera)
  {

    return (
      <div className='hero--wrapper'>
        <div className='hero' >
            <h1 className='hero--title'>Learn by Seeing.</h1>
            <p className='hero--subtitle'>A visual introduction to carbon chemistry.</p>
        </div>
      </div>
    )
  }

  else if(props.overlay)
    return (
      <div className='lessonSelection--wrapper'>
        <h1 className='lessonSelection--title'>Please select a lesson.</h1>
        <div className='card--wrapper'>
          <Card id={'Diamonds'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Diamonds"} img={diamondsThumbnail} description={"Placeholder for Diamonds description. Lorem impsum, just random filler text here. And a little more."}/>
          <Card id={'Fullerenes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Fullerenes"} img={fullerenesThumbnail} description={"Placeholder for Fullerenes description. Lorem impsum, just random filler text here. And a little more."} />
          <Card id={'Nanotubes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Nanotubes"} img={nanotubesThumbnail} description={"Placeholder for Nanotubes description. Lorem impsum, just random filler text here. And a little more."}/>
        </div>
      </div>
  )

  else return <></>
}




export default function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);
  const [cameraRotate, setCameraRotate] = useState(false);
  const rotatedCamera = useSelector(state => state.rotatedCamera);


  const dispatch = useDispatch();



  function RotateCamera({cameraRotate}) {
    // const rotatedCamera = useSelector(state => state.rotatedCamera);

    useFrame((state) => 
    {
      state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (rotatedCamera ? (Math.PI) : 0), 0.125)
    })
  

    return <></>
  }

  function rotateModel()
  {
    setFlipped(!flipped);
  }




  useEffect(() =>
  {
    setTimeout(() => props.setLoading() , 2500)
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
          <h1 class='loading--title'>loading world</h1>
          <h2>for the best experience, please use Google Chrome.</h2>
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
              <RotateCamera cameraRotate={cameraRotate}/>
              <MemoizedStars />
              <spotLight position={[10, 10, 10] } intensity={1}/>
              <ambientLight intensity={.4} />
              <Models flipped={flipped}/>
          </Suspense>
      </Canvas>
      <Overlay setPage={props.setPage} cameraRotate={cameraRotate} overlay={props.overlay} setOverlay={props.setOverlay}/>

      {/* BUTTON */}
      <div className='heroBtnWrapper'>
        <div className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => {
          // setCameraRotate(!cameraRotate)
          dispatch(rotateCamera());
          // console.log(rotatedCamera);




          // Timeout is to create a delay between camera rotating and paining of 
          // lesson DOM elements to the screen. This produces a smoother animation with less 
          // frames being dropped.
          setTimeout(() => props.setOverlay() , 600)
          }}>
            <div><a title={rotatedCamera ? "Back to Home" : "Get Started"}></a></div>
        </div>
      </div>

    </>
  )
}


