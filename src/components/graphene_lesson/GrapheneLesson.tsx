import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Provider } from 'react-redux';
import Stars from '../Universe';
import DataStore from '../redux/store';
import GrapheneModels from './GrapheneModels';

// import LessonOverlay from '../LessonOverlay';


function GrapheneLesson( props: any  ) {
  const lesson = 'Graphenes';

  return (
    <>
      <Suspense fallback={null}>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
          <Stars />
          <Provider store={DataStore}>
              <GrapheneModels/>
          </Provider>
          <spotLight position={[10, 10, 10] } intensity={4}/>
          <spotLight position={[-10, 10, 10] } intensity={4}/>
          <spotLight position={[1, 1, 1] } intensity={4}/>
          <spotLight position={[-1, 1, 1] } intensity={4}/>
          <pointLight position={[0, 0, -1.2] } intensity={20}/>
          <ambientLight intensity={3} />
        </Canvas>

        {/* <LessonOverlay lesson={lesson} setPage={props.setPage}/> */}
      </Suspense>
    </>
  );
}

export default GrapheneLesson;