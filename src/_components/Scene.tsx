// React: 
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

// Components: 
import Universe from './Universe';
import Models from './Models';
import Music from './Audio';
import DevelopmentCamera from './DevelopmentCamera';
import Camera from './Camera';
import { Voice } from './Audio';


// Mounts components to scene graph and renders 3D scene.
function Scene( props: any ): JSX.Element {

    const counter = props.counter;

    return (
        < Suspense >

            {/* < Music page={ props.page } counter={ counter } /> */}
            
            < Canvas >

                < Voice page={ props.page } counter={ counter }/>

                < Universe page={ props.page } />
                < Camera page={ props.page } counter={ counter }  />
                < Models page={ props.page } counter={ counter } />


                < ambientLight intensity={ .25 } />
                < spotLight position={ [ -10, 10, 10 ] } intensity={ 0.9 } />
                {/* < DevelopmentCamera  /> */}

            </ Canvas >

        </ Suspense >
    );
};

export default Scene;







// const counter = useSelector( ( state: any ) => state.counter );
{/* < FadeIn /> */}
{/* < BackgroundMusic /> */}