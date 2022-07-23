import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei'
import { Provider } from 'react-redux';
import LessonModels from './LessonModels';
import LessonText from './LessonText';
import LessonNav from '../../components/LessonNav';
import HomeNav from '../../components/HomeNav';
import MemoizedStars from '../../components/Stars';
import DataStore from '../../store';



function FullerenesLesson(props) {

    return (
        <>
            <Stats showPanel={0} className="stats" {...props} />
            <HomeNav setPage={props.setPage} setCameraRotate={props.setCameraRotate}/>
            <LessonNav />
            <LessonText />
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 3] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                <spotLight position={[10, 10, 10] } intensity={.8}/>
                <ambientLight intensity={.3} />
                <MemoizedStars />
                <Provider store={DataStore}>
                    <LessonModels/>
                </Provider>
                </Suspense>
            </Canvas>
        </>
    )
}

export default FullerenesLesson;