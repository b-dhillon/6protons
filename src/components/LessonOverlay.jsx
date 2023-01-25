import data from './scene_configs';
import { reset, start, increment, decrement } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import '../overlay-styles.css';

// Old UI for lessons, 
// contains back button, home button, and lesson navigation increment and decrement buttons, as well as the overlay text for lesson.

/*
Old Architecture set up: 
    title and maxSectionCount are pulled from a data object, however the text itself is not. 
    the text instead is pulled from a seperate function that returns the appropriate text based 
    on the counter. Done with a bunch of if statements. 
*/ 


/*
New Architcture set up: 
    Pull section_counter, page_title, section_count, and Text all from a single data object. 
    You can even keep the < LessonText > function the same and instead just call it with the text from the data object 

*/



function LessonOverlay( props ) {
    // const lesson = data.find( (lesson) => lesson.title === props.lesson );
    // const counter = useSelector(state => state.counter);
    // const dispatch = useDispatch();
    // const LessonText = lesson.text;
    

    return (
        
        <div className='global-overlay-container'>

            {/* HEADER --> Back-Button, Lesson Title, Home-Button */}
            <div className='header-container'>

                <li className="home-back-container" onClick={() => {
                    dispatch(reset());
                    props.setPage(`home`); 
                }}>
                    <button className="homeBtn--icon"><i className="fa-solid fa-arrow-left-long backBtn" style={{color: 'white'}}></i></button> 
                </li>
                
                
                <div className='title-container'>
                    { 
                        counter === 0 
                        ?
                        <div>
                            <h1 className='title' style={{}}>{lesson.title}</h1>
                        </div>
                        :
                        ""
                    }
                </div> 

                <li className="home-back-container" 
                    onClick={() => {
                        dispatch( start() );
                        dispatch( reset() );
                        props.setPage(`home`); 
                    }}
                    >
                    <button href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></button>
                </li>
                

            </div>

            {/* MAIN TYPE 1 --> Lesson Back Btn, Lesson Text Type 1 (centered), Lesson Forward Btn  */}
            {
                counter === 1 || counter === lesson.maxSectionCount 
                ?
                <div className='main-container'>

                        <div className='lessonNav-container'>
                            <button className='lesson--decrementBtn'
                                onClick={() => dispatch(decrement())}>
                                <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                            </button>
                        </div>

                        < LessonText />

                        {/* <div className='panel left'>  </div> */}
                        {/* <div className='panel right'></div> */}

                        <div className='lessonNav-container'>
                            <button className='lesson--incrementBtn'
                                onClick={() => dispatch(increment()) }>
                                <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                            </button>
                        </div>

                </div> 
                :
                ""
            }  
                

            {/* MAIN TYPE 2 --> Lesson Back Btn, Lesson Text Type 2 (left-aligned), Lesson Forward Btn  */}

            {/* To get text-overlay to center */}
            {
                counter > 0 && counter !== 1 && counter !== lesson.maxSectionCount
                ?
                <div className='main-container'>

                        <div className='lessonNav-container'>
                            <button className='lesson--decrementBtn'
                                onClick={() => dispatch(decrement())}>
                                <i className="fa-solid fa-angle-left lessonNav--icons" style={{color: 'white'}}></i>
                            </button>
                        </div>

                        <div className='panel left'> < LessonText /> </div>
                        <div className='panel right'></div>

                        <div className='lessonNav-container'>
                            <button className='lesson--incrementBtn'
                                onClick={() => dispatch(increment()) }>
                                <i className="fa-solid fa-angle-right lessonNav--icons" style={{color: 'white'}}></i>
                            </button>
                        </div>

                </div> 
                : 
                '' 
            }
            

            {/* 
            {
                counter === 0 
                ?
                <div className='footer-container' >
                    <button className="startLessonBtn" onClick={() => dispatch(increment())}>
                        Start Lesson
                    </button>  
                </div>
                : 
                ""
            } 
            */}
            

        </div>
        
    )
}

export default LessonOverlay