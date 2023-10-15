import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// Components:
import { Models } from './Models';
import { Camera } from './Camera';
import { Sound } from './Sound';
import { Universe } from './Universe';
import DevelopmentCamera from './DevelopmentCamera';
// import Music from './Sound';
// Mounts components to scene graph and renders 3D scene.
export function Scene({ section, initializedPage }: any): JSX.Element {
  function Lighting(): JSX.Element {
    return (
      <>
        <ambientLight intensity={0.25} />
        <spotLight position={[-10, 10, 10]} intensity={0.9} />
      </>
    );
  };
  return (
    <Suspense>
      {/* <FadeIn /> */}
      <Canvas>
        <Universe initializedPage={initializedPage} />
        <Sound initializedPage={initializedPage} section={section} />
        <Camera initializedPage={initializedPage} section={section} />
        <DevelopmentCamera/>
        <Models initializedPage={initializedPage} section={section} />
        <Lighting/>
      </Canvas>
    </Suspense>
  );
};

function FadeIn() {
  const [fadeDone, setFadeDone] = useState(false);
  function handleFadeDoneAfter(seconds: number) {
    setTimeout(() => setFadeDone(true), seconds);
  }
  handleFadeDoneAfter(5500);
  if (!fadeDone) return <div className='blackFade'></div>;
  else return <></>;
}
<FadeIn />




{/* < DevelopmentCamera  /> */}
/* < BackgroundMusic /> */


