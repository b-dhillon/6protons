import { useDispatch } from 'react-redux';
import { decrement, increment, reset, start } from '../redux/actions';

export default function LessonUI(props: any) {
  const dispatch = useDispatch();

  if (props.devMode) {
    return (
      <button
        onClick={() => dispatch(increment())}
        style={{ position: 'absolute', zIndex: 10, top: 0 }}
      >
        next
      </button>
    );
  } 
  else {
    return (
      <div className='global-overlay-container'>
        <Header
          page={props.page}
          counter={props.counter}
          setCurrentPage={props.setCurrentPage}
        />
        <Body page={props.page} counter={props.counter} />
        <Footer page={props.page} counter={props.counter} />
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
          <i
            className='fa-solid fa-arrow-left-long backBtn'
            style={{ color: 'white' }}
          ></i>
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
    if (props.page.textType[props.counter] === 'centered') {
      return (
        <>
          <div className='text--wrapper'>
            <p> {props.page.text[props.counter]} </p>
          </div>
        </>
      );
    }
    if (props.page.textType[props.counter] === 'left') {
      return (
        <>
          <div className='panel left'>
            <div className='text--wrapper2'>
              {/* < p > { props.page.text[ props.counter ] } </ p > */}
            </div>
          </div>

          <div className='panel right'></div>
        </>
      );
    } else return <></>;
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
