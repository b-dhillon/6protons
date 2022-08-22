import { Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from '../../components/Stars'
import HomeNav from '../../components/HomeNav';


function NanotubesLesson(props) {
    return (
        <>
            <h1 style={{position: 'absolute', zIndex: 3, top: '40%', left: '24%'}}>This part of the world is under construction.</h1>

            <HomeNav setPage={props.setPage} setOverlay={props.setOverlay}/>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={.4} />
                    <Stars />
                </Suspense>
            </Canvas>
        </>
    );
}

export default NanotubesLesson; 
