import { useState } from 'react';

export default function BottomNavBar() {

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

    // if(sectionState === 0)
    // {
    //     return (
    //         <div className='lesson1--footer'>
    //             <div className="startLesson1Btn" onClick={handleNext}>
    //                 <div><a title={"Start Lesson"}></a></div>
    //             </div>  
    //         </div> 
    //     )
    // }

    return (
        <>
            <h1 className='test'>{`Section ${sectionState}`}</h1>
            <div className='lesson1--bottomNav'>
                <button onClick={handleBack}></button>
                <button onClick={handleNext}></button>
            </div> 
        </>

    )

    // <i className="fa-solid fa-angle-left bottomNav--icons"></i>
    // <i className="fa-solid fa-angle-right bottomNav--icons"></i>

    // if(sectionState >= 0)
    // {

    // }

}