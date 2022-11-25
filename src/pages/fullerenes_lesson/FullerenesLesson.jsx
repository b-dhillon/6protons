import { Suspense, useState } from 'react';
import { Canvas,  } from '@react-three/fiber';
import { Provider } from 'react-redux';
import Stars from '../../components/Stars';
import DataStore from '../../redux/store';
import LessonOverlay from '../../components/LessonOverlay';
import { OrbitControls } from '@react-three/drei'


import FullereneModelsCombined from './FullereneModels'


import { Stats } from '@react-three/drei';



// function onPageLoad() {
//   setTimeout( () => {
//     document
//       .querySelector(".global-overlay-container")
//       .style
//       .display = 'flex';
//   }, 800)
// }



function FullerenesLesson(props) {

  function Spinner() {
    console.log('spinner be spinning');
    return (
      <div className='spinnerWrapper'>
        <h1 className='loading--title'>loading...</h1>
      </div> 
    )
  }


  const [fadeDone, setFadeDone] = useState(false);
  function handleFadeDoneAfter2Seconds() {
    setTimeout( () => {
      setFadeDone(true);
    }, 2000 )
  }; handleFadeDoneAfter2Seconds();



  const lesson = 'Fullerenes';
  // THREE.DefaultLoadingManager.onLoad = onPageLoad;

  return (
    <>
      {/* <Stats showPanel={0} className="stats" {...props} /> */}

      <Suspense fallback={null}>
        {!fadeDone ? <div className="blackFade"></div> : ""}


        {/* <iframe src="/fullereneAudio1.mp3" type="audio/mp3" allow="autoplay" id="audio" style="display:none"></iframe> */}
        <audio  autoPlay >
            <source src="/music/fullerene2.mp3" type="audio/mp3" />
        </audio>

        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 5, fov: 45, position: [0, 0, 5] }}>     
            <OrbitControls noZoom minPolarAngle={0}  maxPolarAngle={Math.PI / 2}/>
            <Stars />
            <Provider store={DataStore}>
              <FullereneModelsCombined/>
            </Provider>
            <spotLight position={[-10, 10, 10] } intensity={.9}/>
            <ambientLight intensity={.3} />
        </Canvas>

        <LessonOverlay lesson={lesson} setPage={props.setPage}/>
      </Suspense>
    </>
  )
}

export default FullerenesLesson;



  // function OscilateAnimation() {
  //     useFrame((state) => {
  //       ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 4.5
  //   })
  // }

// Store the current rotation in an object (like in bananas project) and then use that rotation for the next one too.
// function RotateAnimation() {
//   useFrame((_, delta) => {
//     ref.current.rotation.y += (delta / 6)
//   })
// }  