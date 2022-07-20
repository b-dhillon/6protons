import { useState, useEffect, Suspense } from 'react';
import BottomNavBar from './BottomNavBar';
import Model from './Model'



export default function Lesson1() {
    function handleNext() 
    {
      setSectionState((prevCount) => prevCount + 1)
      console.log('section state was increased');
    }
  
    function handleBack() 
    {
        setSectionState((prevCount) => {
            if(prevCount > 0) return prevCount - 1;
            else return prevCount;
        })
        console.log('section state was decreased');
    }

    const [sectionState, setSectionState] = useState(0);

    return (
        <>
            <Model path={`/model${sectionState}.glb`} sectionState={sectionState} />
        </>

    )
}