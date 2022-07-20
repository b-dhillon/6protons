
export default function BottomNavBar({sectionState, handleBack, handleNext}) {
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
        <div className='lesson1--bottomNav'>
            <button onClick={handleBack}></button>
            <button onClick={handleNext}></button>
        </div> 
    )

    // <i className="fa-solid fa-angle-left bottomNav--icons"></i>
    // <i className="fa-solid fa-angle-right bottomNav--icons"></i>

    // if(sectionState >= 0)
    // {

    // }

}