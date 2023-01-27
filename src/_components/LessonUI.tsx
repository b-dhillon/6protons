import { useDispatch } from "react-redux";
import { decrement, increment, reset, start } from "../components/redux/actions";


export default function LessonUI( props: any  ) {

    return (
        < div className='global-overlay-container' >

            < Header data={ props.data } setPage={ props.setPage } counter={ props.counter } />
            < Body data={ props.data } counter={ props.counter } />
            < Footer data={ props.data } counter={ props.counter } />

        </ div >
    )
} 

function Header( props: any ) {

    // can we move dispatch to the data object as a method?
    const dispatch = useDispatch();


    return (
        <div className='header-container'>

            < li 
                className="home-back-container" 
                onClick={ () => {
                        dispatch( reset() );
                        props.setPage(`home`); 
                    }
                }
            >
                <button className="homeBtn--icon">
                    <i className="fa-solid fa-arrow-left-long backBtn" style={ { color: 'white' } }></i>
                </button> 

            </ li >


            <div className='title-container'>
                { 
                    props.data.section === 0 
                    ?
                    <div>
                        <h1 className='title' style={{}} >{ props.data.title }</ h1 >
                    </div>
                    :
                    ""
                }
            </div> 

            < li className="home-back-container" 
                onClick={ () => {
                        dispatch( start() );
                        dispatch( reset() );
                        props.setPage(`home`); 
                    }
                }
            >
                < button className="homeBtn--icon">
                    < i className="fas fa-house homeIcon" style={ { color: 'white '} } ></i> 
                </ button >
            </ li >


        </div>
    )
}

function Body( props: any ) {

    // Decide between these two dispatch methods
    // const dispatch = props.data.dispatch(); // this dispatch 
    const dispatch = useDispatch();


    function LessonNavigationButton( props: any ): JSX.Element {

        return (
            < div className='lessonNav-container' >
                < button 
                    className={`lesson--${props.type}Btn`}
                    onClick={ () => props.type === 'next' ?  dispatch( increment() ) : dispatch( decrement() ) }
                >

                    
                    < i className={`fa-solid fa-angle-${ props.type === "next" ? "right" : "left" } lessonNav--icons`} style={ { color: 'white' } }></ i >
                
                </ button >
            </ div >
        )
    }


    function Text( props: any ): JSX.Element {

        if ( props.data.textType[ props.counter ] === 'centered' ) {
            return (
                <>
                    <div className='text--wrapper'>
                        {/* <p> { props.data.text[ props.counter ] } </p> */}
                    </div>
                </>
            )
        }

        if ( props.data.textType[ props.counter ] === 'left' ) {
            return (
                <>
                    < div className='panel left' >
                        < div className='text--wrapper2' >
                            {/* < p > { props.data.text[ props.counter ] } </ p > */}
                        </ div >
                    </ div >

                    < div className='panel right' >
                    </ div >
                    
                </>
            )
        }

        else return <></>
    }

    return (
        <>
            {
                props.counter > 0 
                ?
                < div className='main-container' >

                    < LessonNavigationButton type={ 'back' } />

                    < Text data={ props.data } counter={ props.counter }/>

                    < LessonNavigationButton type={ 'next' } />

                </ div > 
                :
                ""
            } 
        </>
    )
}

function Footer( props: any ) {
    const dispatch = useDispatch();

    return (
        <>
            {
                props.counter === 0 
                ?
                <div className='footer-container' >
                    <button className="startLessonBtn" onClick={ () => dispatch( increment() ) }>
                        Start Lesson
                    </button>  
                </div>
                : 
                ""
            } 
        </>
    )
}