import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions';

function LessonNav() {

    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();

    if(counter === 0)
    {
        return (
            <>
                <div className='startLessonBtn--wrapper' >
                    <button className="startLessonBtn" onClick={() => dispatch(increment())}>
                        Start Lesson
                    </button>  
                </div> 
            </>
        )
    }

    else if( counter >= 0 )
    {
        return (
            <>
                <div className='lessonNav'>
                    <button className='lesson--decrementBtn'
                        onClick={() => dispatch(decrement())}>
                        <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                    </button>
    
                    <button className='lesson--incrementBtn'
                        onClick={() => dispatch(increment()) }>
                        <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                    </button>
                </div> 
            </>
        )
    }
}

export default LessonNav