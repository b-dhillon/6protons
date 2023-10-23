import { useDispatch } from 'react-redux';
import { decrement, increment, reset, start } from '../redux/actions';
import { InitializedPage } from '../types/types';
import { useEffect, useState } from 'react';


/** Reversing Navigation
 * 
 * It seems like after setting up isCameraAnimating, the text aniamtions seem to have messed up. 
 * Need to confirm with section2 and section3 text. 
 * 
 * But what I think is going on now is that, due to this extra state variable that mutates, LessonOverlay is rendered again
 * which triggers the CSS animation to re-fire. 
 * 
 * We should instead have a local state that is mutated when isCameraAnimating is false. 
 * When this state is true, we fire off the text fade in animation. 
 * This will likely mean we have to do some JavaScript styles or something for the animations. 
 * I think this is good anyways, because it allows us to fade the animations of multiple paragraph elements in a better way than just 
 * creating a bunch of css classes.
 * 
 * Also, it will allow us to hook up the chime in sync with the text in a better way. 
 * Because when !isCameraAnimating we just trigger the chime animation to happen, which 
 * essentially signals the mutating of the state and start of the text animations! Nice!
 * This should be one of the last major things we need to solve.
 * 
 * 
 * Step-1: Figure out to implement jss text fades.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

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

interface LessonOverlayConfig {
  devMode: boolean,
  initializedPage: InitializedPage,
  section: number,
  setCurrentPage: Function, 
  isCameraAnimating: boolean, 
}

export function LessonOverlay({
    devMode, 
    initializedPage, 
    section, 
    setCurrentPage, 
    isCameraAnimating 
  }: LessonOverlayConfig ): JSX.Element {

  const dispatch = useDispatch();

  if (devMode) {
    return (
      <>
        <button 
          disabled={ isCameraAnimating }
          onClick={() => dispatch(increment())} 
          id='forwardNav'          
          style={{ position: 'absolute', zIndex: 10, top: 0 }}>
            forwards
        </button>
        <button 
          disabled={ isCameraAnimating }
          onClick={() => dispatch(decrement())} 
          id='backwardNav'
          style={{ position: 'absolute', zIndex: 10, top: 20 }}>
            backwards
        </button>
      </>
    );
  } 

  else {
    return (
      <div className='lesson-overlay'>
        <LessonHeader page={initializedPage} section={section} setCurrentPage={setCurrentPage}/>
        <LessonBody page={initializedPage} section={section} isCameraAnimating={isCameraAnimating} />
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
            <h1 className='title'>
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
function LessonBody( { page, section, isCameraAnimating }: any ): JSX.Element {
  // Decide between these two dispatch methods
  // const dispatch = props.data.dispatch(); // this dispatch
  const dispatch = useDispatch();

  function LessonNavigation(props: any): JSX.Element {
    return (
      <div className='lesson-body__navigation'>
        <button
          disabled={ isCameraAnimating }

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

  // I dont think we need 'forwards' and 'backwards' here like the camera
  // because we simply just want to display the text of the current section. 
  // the previous section shouldn't factor into it at all. 

  // I just need to make sure there is no bug with fading in and out. 
  // Perhaps start with disabling the animations, and see if the bug is still there.
  // If not, then re-add the classes and see.
  function LessonText(): JSX.Element {

    const [currentDisplayIndex, setCurrentDisplayIndex] = useState(-1);
    const paragraphsOfSection = page.text[section];
    const hiddenStyle = {
      opacity: 0,
      transition: 'opacity 0.7s ease-in-out'
    };
    const fadeInStyle = {
      opacity: 1,
      transition: 'opacity 0.7s ease-in-out'
    };

    // Control the display of paragraphs in sequence after camera finishes animation
    useEffect(() => {
      if (!isCameraAnimating && currentDisplayIndex < paragraphsOfSection.length - 1) {
        const timer = setTimeout(() => {
          setCurrentDisplayIndex(prevIndex => prevIndex + 1);
        }, 900); // Show next paragraph every second after camera stops animating
        return () => clearTimeout(timer);
      };
    }, [isCameraAnimating, currentDisplayIndex]);


    if (page.textPlacement[section] === 'center') {
      return (
        <>
          <div className='lesson-body__text--no-model'>
            {
              paragraphsOfSection.map((paragraph: string, index: number) => (
                <p key={index} style={index <= currentDisplayIndex ? fadeInStyle : hiddenStyle}>
                  {paragraph}
                </p>
              ))
            }
            {/* <p> {page.text[section]} </p> */}
          </div>
        </>
      );
    } else if (page.textPlacement[section] === 'left') {
      return (
        <>
          <div className='panel--left'>
            {/* <div className='text-wrapper--with-model'>
              <p> { page.text[ section ] } </p>
            </div> */}
          </div>
          <div className='panel--right'></div>
        </>
      );
    } else if(page.textPlacement[section] === 'bottom') {
      return (
        <div className='lesson-body__text-container--with-model'>
          <div className='panel--top'></div>
          <div className='panel--bottom'>
            <div className='lesson-body__text--with-model'>
              { 
                paragraphsOfSection.map((paragraph: string, index: number) => (
                  <p key={index} style={index <= currentDisplayIndex ? fadeInStyle : hiddenStyle}>
                    {paragraph}
                  </p>
                ))
              }
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
          <LessonText />
          <LessonNavigation type={'forwards'} />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

//className={ cameraMovement ? `fade--cam-move-${i}` : `fade--no-cam-move-${i}` }






// To create better spacing and seperation between the text
//                   Lets go into unitinitializedData and modify the text data structure 
//                   We should make it a list of lists instead of just a single list.
//                   Then, we write a simple loop to create <p></p> elements of each item in the nested list
                  
//                   {
//                     function() {
//                       let paragraphElements = [];
//                       for( let i = 0; i < page.text.[section].length; i++ ) {
//                         paragraphElements.push( <p>page.text[section][i]</p> )
//                       }
//                       return paragraphElements
//                     } ();

//                     or 






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
