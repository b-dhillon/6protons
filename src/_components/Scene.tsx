// React: 
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

// Components: 
import Universe from './Universe';
import Models from './Models';
import Audio from './Audio';
import DevelopmentCamera from './DevelopmentCamera';
import Camera from './Camera';


// Mounts components to scene graph and renders 3D scene.
function Scene( props: any ): JSX.Element {

    const counter = props.counter;

    return (
        < Suspense >

            < Canvas >

                < Universe data={ props.data } />
                < Camera data={ props.data } counter={ counter }  />
                < Models data={ props.data } counter={ counter } />
                < Audio data={ props.data } counter={ counter } />

                < ambientLight intensity={ .25 } />
                < spotLight position={ [ -10, 10, 10 ] } intensity={ 0.9 } />
                < DevelopmentCamera  />

            </ Canvas >
            
        </ Suspense >
    );
};

export default Scene;


// const counter = useSelector( ( state: any ) => state.counter );
{/* < FadeIn /> */}
{/* < BackgroundMusic /> */}
