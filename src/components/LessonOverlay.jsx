import lessons from './lessons.js';
import { reset, start, increment, decrement } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './overlay-styles.css';




function LessonOverlay(props) {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();
    const thisLesson = lessons.find( (lesson) => lesson.title === props.lesson );

    const LessonText = thisLesson.text;
    

    return (
        
        <div className='global-overlay-container'>

            <div className='header-container'>

                <li className="home-back-container" onClick={() => {
                    dispatch(reset());
                    props.setPage(`home`); 
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fa-solid fa-arrow-left-long backBtn" style={{color: 'white'}}></i></a> 
                </li>
                
                
                <div className='title-container'>

                {counter === 0 ?
                    <div>
                        <h1 className='title' style={{}}></h1>
                    </div>
                : ""}
                </div> 

                    <li className="home-back-container" onClick={() => {
                        dispatch(start());
                        dispatch(reset());
                        props.setPage(`home`); 
                    }}>
                        <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></a>
                    </li>
                

            </div>

            {/* To get text-overlay to center  */}
            {counter === 1 || counter === thisLesson.maxCounter ?
            <div className='main-container'>

                    <div className='lessonNav-container'>
                        <button className='lesson--decrementBtn'
                            onClick={() => dispatch(decrement())}>
                            <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                        </button>
                    </div>

                    <LessonText />

                    {/* <div className='panel left'>  </div> */}
                    {/* <div className='panel right'></div> */}

                    <div className='lessonNav-container'>
                        <button className='lesson--incrementBtn'
                            onClick={() => dispatch(increment()) }>
                            <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                        </button>
                    </div>

            </div> 
            : ""}  
                

            {/* For text-overlay2 */}
            {counter > 0 && counter !== 1 && counter !== thisLesson.maxCounter?
            <div className='main-container'>

                    <div className='lessonNav-container'>
                        <button className='lesson--decrementBtn'
                            onClick={() => dispatch(decrement())}>
                            <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                        </button>
                    </div>

                    <div className='panel left'> <LessonText /> </div>
                    <div className='panel right'></div>

                    <div className='lessonNav-container'>
                        <button className='lesson--incrementBtn'
                            onClick={() => dispatch(increment()) }>
                            <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                        </button>
                    </div>

            </div> : '' }
            

            {/* {counter === 0 ?
            <div className='footer-container' >
                <button className="startLessonBtn" onClick={() => dispatch(increment())}>
                    Start Lesson
                </button>  
            </div>
            : ""} */}
            

        </div>
        
    )
}

export default LessonOverlay