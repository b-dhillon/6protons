import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import MemoizedStars from '../../components/Stars';
import HomeNav from '../../components/HomeNav';
import DataStore from '../../redux/store';
import LessonNav from '../../components/LessonNav';
import DiamondModels from './DiamondModels';
import DiamondText from './DiamondText';


function DiamondsLesson(props) {
    return (
      <>
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,2] }}>
          <OrbitControls/>
            <Suspense fallback={null}>
              <MemoizedStars />
              <Provider store={DataStore}>
                <DiamondModels/>
              </Provider>
              <ambientLight intensity={1} />
              <spotLight position={[10, 10, 10] } intensity={4}/>
              <spotLight position={[-10, 10, 10] } intensity={4}/>
              <pointLight position={[0, -0.5, -1] } intensity={20}/>
              {/* <pointLight position={[0, -0.5, -1] } intensity={20}/> */}
            </Suspense>
        </Canvas>
        <HomeNav setPage={props.setPage} setOverlay={props.setOverlay} />
        <LessonNav />
        <div className="global-text-wrapper">
          <DiamondText setPage={props.setPage}/>
        </div>
      </>
    );
}

export default DiamondsLesson;