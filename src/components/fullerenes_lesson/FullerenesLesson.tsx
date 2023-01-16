import { Suspense, useState } from 'react';
import { Canvas,  } from '@react-three/fiber';
import { Provider } from 'react-redux';
import Stars from '../Universe';
import DataStore from '../redux/store';
import LessonOverlay from '../LessonOverlay';
import FullereneModelsCombined from './FullereneModels';
import { OrbitControls } from '@react-three/drei';
import UpdateCamera from '../UpdateCamera';
// import { Stats } from '@react-three/drei';

export default function FullerenesLesson( props: any ) {

  const [ fadeDone, setFadeDone ] = useState( false );

  function handleFadeDoneAfter( seconds: number ) {
    setTimeout( () => setFadeDone( true ), seconds )
  }; handleFadeDoneAfter( 5500 );

  const lesson = 'Fullerenes';

  return (
    <>
      {/* <Stats showPanel={0} className="stats" {...props} /> */}

      < Suspense fallback={ null } >
        
        {!fadeDone ? <div className="blackFade"></div> : "" }

        < Audio />

        < Canvas gl={ { alpha: false } } dpr={[1, 2]} camera={{ near: 0.01, far: 6, fov: 45, position: [ 0, 0, 5 ] }} >     
            
            { fadeDone ? < OrbitControls minPolarAngle={0}  maxPolarAngle={Math.PI / 2} /> : "" }
            < Stars />
            < Provider store={DataStore}>
              < FullereneModelsCombined />
            </ Provider >
            < spotLight position={[-10, 10, 10] } intensity={.9} />
            < ambientLight intensity={.3} />
            { !fadeDone ? < UpdateCamera /> : "" }

        </ Canvas >


      </Suspense>
    </>
  )
}

function Audio() {
  return (
    <audio  autoPlay >
      <source src="/music/fullerene2.mp3" type="audio/mp3" />
    </audio>
  );
};


{/* <LessonOverlay lesson={lesson} setPage={props.setPage}/> */}
{/* <iframe src="/fullereneAudio1.mp3" type="audio/mp3" allow="autoplay" id="audio" style="display:none"></iframe> */}


// OscialteAnimation()
/*
function OscilateAnimation() {
    useFrame((state) => {
      ref.current.rotation.y = Math.sin((state.clock.elapsedTime) * .75) / 4.5
  })
}
*/


// onPageLoad()
/*
function onPageLoad() {
  setTimeout( () => {
    document
      .querySelector(".global-overlay-container")
      .style
      .display = 'flex';
  }, 800)
}
THREE.DefaultLoadingManager.onLoad = onPageLoad;
*/


// CubeSpinner()
/*
function CubeSpinner() {
  console.log('spinner spinning');
  return (
    <div className='spinnerWrapper'>
      <h1 className='loading--title'>loading...</h1>
    </div> 
  )
}
*/


// RotateAnimation()
/* 
function RotateAnimation() {
  Store the current rotation in an object (like in bananas project) and then use that rotation for the next one too.
  useFrame((_, delta) => {
    ref.current.rotation.y += (delta / 6)
  })
}  
*/