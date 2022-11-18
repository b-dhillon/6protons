import { Suspense } from 'react';
import { Canvas,  } from '@react-three/fiber';
import { Provider } from 'react-redux';
import Stars from '../../components/Stars';
import DataStore from '../../redux/store';
import LessonOverlay from '../../components/LessonOverlay';
import { OrbitControls } from '@react-three/drei'


import FullereneModelsCombined from './FullereneModels'


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
  const lesson = 'Fullerenes';
  // THREE.DefaultLoadingManager.onLoad = onPageLoad;

  return (
    <>
      <Suspense fallback={null}>
        <div className="blackFade"></div>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>     

            <OrbitControls noZoom minPolarAngle={0}  maxPolarAngle={Math.PI / 2}/>
 
            {/* <Suspense fallback={null}> */}
              <Stars />
              <Provider store={DataStore}>
                <FullereneModelsCombined/>
              </Provider>
              {/* <spotLight position={[10, 10, -10] } intensity={.8}/> */}
              <spotLight position={[-10, 10, 10] } intensity={.8}/>
              <ambientLight intensity={.25} />
            {/* </Suspense> */}
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