import { useDispatch } from 'react-redux';
import { decrement, increment, reset, start } from '../redux/actions';

export function LessonInterface(props: any) {
  const dispatch = useDispatch();

  if (props.devMode) {
    return (
      <button 
        onClick={() => dispatch(increment())} 
        style={{ position: 'absolute', zIndex: 10, top: 0 }}>
        next
      </button>
    );
  } 
  else {
    return (
      <div className='global-overlay-container'>
        <Header
          page={props.initializedPage}
          counter={props.counter}
          setCurrentPage={props.setCurrentPage}
        />
        <Body page={props.initializedPage} counter={props.counter} />
        <Footer page={props.initializedPage} counter={props.counter} />
      </div>
    );
  }
}

function Header(props: any) {
  let section: number = props.counter;
  let lesson: any = props.page;

  // can we move dispatch to the data object as a method? but why?
  const dispatch = useDispatch();
  function GoHome() {
    dispatch(start());
    dispatch(reset());
    props.setCurrentPage(`home`);
  }

  function GoBack() {
    dispatch(reset());
    props.setCurrentPage(`home`);
  }

  return (
    <div className='header-container'>
      <li className='home-back-container' onClick={() => GoBack}>
        <button className='homeBtn--icon'>
          <i className='fa-solid fa-arrow-left-long backBtn' style={{ color: 'white' }}></i>
        </button>
      </li>

      <div className='title-container'>
        {section === 0 ? (
          <div>
            <h1 className='title' style={{}}>
              {lesson.title}
            </h1>
          </div>
        ) : (
          ''
        )}
      </div>

      <li className='home-back-container' onClick={() => GoHome}>
        <button className='homeBtn--icon'>
          <i className='fas fa-house homeIcon' style={{ color: 'white ' }}></i>
        </button>
      </li>
    </div>
  );
}

function Body(props: any) {
  // Decide between these two dispatch methods
  // const dispatch = props.data.dispatch(); // this dispatch
  const dispatch = useDispatch();

  function LessonNavigationButton(props: any): JSX.Element {
    return (
      <div className='lessonNav-container'>
        <button
          className={`lesson--${props.type}Btn`}
          onClick={() =>
            props.type === 'next'
              ? dispatch(increment())
              : dispatch(decrement())
          }
        >
          <i
            className={`fa-solid fa-angle-${
              props.type === 'next' ? 'right' : 'left'
            } lessonNav--icons`}
            style={{ color: 'white' }}
          ></i>
        </button>
      </div>
    );
  }

  function Text(props: any): JSX.Element {
    if (props.page.textPlacement[props.counter] === 'center') {
      return (
        <>
          <div className='text--wrapper'>
            <p> {props.page.text[props.counter]} </p>
          </div>
        </>
      );
    }
    else if (props.page.textPlacement[props.counter] === 'left') {
      return (
        <>
          <div className='panel left'>
            <div className='text--wrapper2'>
              <p> { props.page.text[ props.counter ] } </p>
            </div>
          </div>
          <div className='panel right'></div>
        </>
      );
    }

    // Need to still create all the classes below --> /styles/overlay-styles.css
      // .bottom
      // .text--wrapper3
      // .top
    else if(props.page.textPlacement[props.counter] === 'bottom'){
      return (
        <div className='textOnBottomHalf'>
          <div className='panel top'></div>
          <div className='panel bottom'>
            <div className='text--wrapper2'>
              {/* To create better spacing and seperation between the text
                  Lets go into unitinitializedData and modify the text data structure 
                  We should make it a list of lists instead of just a single list.
                  Then, we write a simple loop to create <p></p> elements of each item in the nested list
                  
                  {
                    function() {
                      let paragraphElements = [];
                      for( let i = 0; i < page.text.[section].length; i++ ) {
                        paragraphElements.push( <p>page.text[section][i]</p> )
                      }
                      return paragraphElements
                    } ();

                    or 

                    page.text.[section].map( (t, i) => <p>t[i]</p> )


                  }
                */}
              <p> { props.page.text[ props.counter ] } </p> 
            </div>
          </div>
        </div>
      );
    }
    else return <></>;
  }

  return (
    <>
      {props.counter > 0 ? (
        <div className='body-container'>
          <LessonNavigationButton type={'back'} />
          <Text page={props.page} counter={props.counter} />
          <LessonNavigationButton type={'next'} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

function Footer(props: any) {
  const dispatch = useDispatch();
  return (
    <>
      {props.counter === 0 ? (
        <div className='footer-container'>
          <button
            className='startLessonBtn'
            onClick={() => dispatch(increment())}
          >
            Start Lesson
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
