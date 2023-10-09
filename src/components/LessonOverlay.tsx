import { useDispatch } from 'react-redux';
import { decrement, increment, reset, start } from '../redux/actions';



/** Fn Description
 * 
 * LessonOverlay() configures and returns the overlay that will sit on top of the 3D WebGL scene:
 * 
 * The LessonOverlay() contains the output of 3 JSX functions.
 * 
 *   Header(): JSX.Element
 *     lesson-title
 *     button--home
 *     button--back
 * 
 * 
 *   Body(): JSX.Element
 *     lesson-navigation
 *     lesson-text
 * 
 * 
 *   Footer(): JSX.Element
 *     start-button
 *
*/
export function LessonOverlay( { devMode, initializedPage, section, setCurrentPage }: any ): JSX.Element {

  const dispatch = useDispatch();

  if (devMode) {
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
      <div className='lesson-overlay'>
        <LessonHeader page={initializedPage} section={section} setCurrentPage={setCurrentPage}/>
        <LessonBody page={initializedPage} section={section} />
        <LessonFooter page={initializedPage} section={section} />
      </div>
    );
  }
}














/** Fn Description
 * 
 * LessonHeader() contains two elements:
 *  button-container
 *  title
 * 
*/
function LessonHeader( { page, section, setCurrentPage }: any ): JSX.Element {

  // can we move dispatch to the data object as a method? but why?
  const dispatch = useDispatch();
  function GoHome() {
    dispatch(start());
    dispatch(reset());
    setCurrentPage(`home`);
  }

  function GoBack() {
    dispatch(reset());
    setCurrentPage(`home`);
  }

  return (
    <div className='lesson-header'>

      {/* do we need li > button > i, do we really need all 3 of these elements? */}
      <li className='lesson-header__button-container' onClick={() => GoBack}>
        <button className='lesson-header__button-container__button'>
          <i className='fa-solid fa-arrow-left-long icon--back' style={{ color: 'white' }}></i>
        </button>
      </li>

      <div className='lesson-header__title'>
        {section === 0 ? (
          <div>
            <h1 className='title' style={{}}>
              {page.title}
            </h1>
          </div>
        ) : (
          ''
        )}
      </div>

      <li className='lesson-header__button-container' onClick={() => GoHome}>
        <button className='lesson-header__button-container__button'>
          <i className='fas fa-house icon--home' style={{ color: 'white' }}></i>
        </button>
      </li>

    </div>
  );
}





/** Fn Description
 * 
 * LessonBody() returns all of the JSX needed to render the body of the overlay. 
 * 
 * 
 * The body contains two elements 
 *  LessonNavigation
 *  LessonText
 * 
*/
function LessonBody( { page, section }: any ): JSX.Element {
  // Decide between these two dispatch methods
  // const dispatch = props.data.dispatch(); // this dispatch
  const dispatch = useDispatch();

  function LessonNavigation(props: any): JSX.Element {
    return (
      <div className='lesson-body__navigation'>
        <button
          className={`lesson-body__navigation__button--${props.type}`}
          onClick={() =>
            props.type === 'forwards'
              ? dispatch(increment())
              : dispatch(decrement())
          }
        >
          <i
            className={`fa-solid fa-angle-${
              props.type === 'forwards' ? 'right' : 'left'
            } lessonNav--icons`}
            style={{ color: 'white' }}
          ></i>
        </button>
      </div>
    );
  }

  function LessonText(props: any): JSX.Element {
    if (props.page.textPlacement[props.section] === 'center') {
      return (
        <>
          <div className='lesson-body__text--no-model'>
            <p> {props.page.text[props.section]} </p>
          </div>
        </>
      );
    }
    else if (props.page.textPlacement[props.section] === 'left') {
      return (
        <>
          <div className='panel--left'>
            {/* <div className='text-wrapper--with-model'>
              <p> { props.page.text[ props.section ] } </p>
            </div> */}
          </div>
          <div className='panel--right'></div>
        </>
      );
    }

    // Need to still create all the classes below --> /styles/overlay-styles.css
      // .bottom
      // .text--wrapper3
      // .top
    else if(props.page.textPlacement[props.section] === 'bottom'){
      return (
        <div className='lesson-body__text-container--with-model'>
          <div className='panel--top'></div>
          <div className='panel--bottom'>
            <div className='lesson-body__text--with-model'>
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
              <p> { props.page.text[ props.section ] } </p> 
            </div>
          </div>
        </div>
      );
    }
    else return <></>;
  }

  return (
    <>
      {section > 0 ? (
        <div className='lesson-body'>
          <LessonNavigation type={'backwards'} />
          <LessonText page={page} section={section} />
          <LessonNavigation type={'forwards'} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}






/** Fn Description
 * Outputs the start-button to start the lesson or just an empty string if lesson already started
 */

function LessonFooter( {section}: any): JSX.Element {
  const dispatch = useDispatch();
  return (
    <>
      {section === 0 ? (
        <div className='lesson-footer'>
          <button className='lesson-footer__start-button' onClick={() => dispatch(increment())}>
            Start Lesson
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
