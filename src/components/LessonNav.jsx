import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions';

function LessonNav() {

    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();

    // function SectionCounterGUI() {
    //     return <h5 className='sectionCounter'>{`Section ${counter}`}</h5>
    // }

    if(counter === 0)
    {
        return (
            <>
                {/* <SectionCounterGUI /> */}
                <div className='startLessonBtn--wrapper'>
                    <div className="startLessonBtn" onClick={() => dispatch(increment())}>
                        <div><a title={"Start Lesson"}></a></div>
                    </div>  
                </div> 
            </>
        )
    }

    else if( counter >= 0 )
    {
        return (
            <>
                {/* <SectionCounterGUI /> */}
                <div className='lessonNav'>
                    <button className='lesson--decrementBtn'
                        onClick={() => dispatch(decrement())}>
                        <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                    </button>
    
                    <button className='lesson--incrementBtn'
                        onClick={() => dispatch(increment()) }>
                        <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                    </button>
    
                    {/* <button onClick={handleBack}></button>
                    <button onClick={handleNext}></button> */}
                </div> 
            </>
        )
    }
}

export default LessonNav