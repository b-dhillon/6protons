import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';

export default function LessonNavBar() {

    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();

    function SectionCounterGUI() {
        return <h5 className='sectionCounter'>{`Section ${counter}`}</h5>
    }

    if(counter === 0)
    {
        return (
            <>
                <SectionCounterGUI />
                <div className='lesson1--footer'>
                    <div className="startBtn-lesson" onClick={() => dispatch(increment())}>
                        <div><a title={"Start Lesson"}></a></div>
                    </div>  
                </div> 
            </>
        )
    }

    else if( counter >= 0)
    {
        return (
            <>
                <SectionCounterGUI />
                <div className='lesson--nav'>
                    <button className='lesson--decrementBtn'
                        onClick={() => dispatch(decrement())}>
                        <i className="fa-solid fa-angle-left bottomNav--icons"></i>
                    </button>
    
                    <button className='lesson--incrementBtn'
                        onClick={() => dispatch(increment())}>
                        <i className="fa-solid fa-angle-right bottomNav--icons"></i>
                    </button>
    
                    {/* <button onClick={handleBack}></button>
                    <button onClick={handleNext}></button> */}
                </div> 
            </>
        )
    }




    // else if( counter >= 0)
    // {

    // }

}