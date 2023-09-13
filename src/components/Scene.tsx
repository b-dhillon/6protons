// React:
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// Components:
import Universe from './Universe';
import Models from './Models';
import DevelopmentCamera from './DevelopmentCamera';
import Camera from './Camera';
import { Sound } from './Sound';
// import Music from './Sound';


// Mounts components to scene graph and renders 3D scene.
export function Scene(props: any): JSX.Element {

  const counter = props.counter;

  return (
    <Suspense>
      {/* < Music page={ props.page } counter={ counter } /> */}

      <FadeIn />

      <Canvas>
        <Sound page={props.page} counter={counter} />

        <Universe page={props.page} />
        <Camera page={props.page} counter={counter} />
        <Models page={props.page} counter={counter} />

        <ambientLight intensity={0.25} />
        <spotLight position={[-10, 10, 10]} intensity={0.9} />
        {/* < DevelopmentCamera  /> */}
      </Canvas>
      
    </Suspense>
  );
}

function FadeIn() {
  const [fadeDone, setFadeDone] = useState(false);
  function handleFadeDoneAfter(seconds: number) {
    setTimeout(() => setFadeDone(true), seconds);
  }
  handleFadeDoneAfter(5500);
  if (!fadeDone) return <div className='blackFade'></div>;
  else return <></>;
}


/* < FadeIn /> */
/* < BackgroundMusic /> */

