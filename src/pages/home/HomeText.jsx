import Card from './Card';
import fullerenesThumbnail from '../../images/fullerenes2.jpeg';
import diamondsThumbnail from '../../images/diamonds12-min.png';
import nanotubesThumbnail from '../../images/nano.jpeg';
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../actions';
import { } from 'react-redux';





function HomeText(props) {

  const ref = useRef();




  function slide(direction){
    var container = document.querySelector('.card--wrapper');
    let scrollCompleted = 0;

    // if(direction == 'left'){
    //   container.scrollLeft -= 340;
    //   // console.log(container.scrollLeft);
    //     // container.scrollLeft -= 10;
    // } else {
    //   container.scrollLeft += 340;
    //   // console.log(container.scrollLeft);
    //     // container.scrollLeft += 10;
    // }



    var slideVar = setInterval(function(){
        if(direction == 'left'){
          container.scrollLeft -= 10;
          // console.log(container.scrollLeft);
            // container.scrollLeft -= 10;
        } else {
          container.scrollLeft += 10;
          // console.log(container.scrollLeft);
            // container.scrollLeft += 10;
        }
        scrollCompleted += 10;
        if(scrollCompleted >= 340){
            window.clearInterval(slideVar);
        }
    }, 10);

  }

  const started = useSelector(state => state.start);
  const dispatch = useDispatch();





  if(!started)
  {
    return (
        <div className='hero--wrapper'>
            <h1 className='hero--title'>Learn by Seeing</h1>
            <p className='hero--subtitle'>A visual introduction to carbon allotropes.</p>
        </div>
    )
  }

  else
    return (
      <div className='lessonSelection--wrapper'>
        <div className='lessonSelection'>
          <h1 className='lessonSelection--title'>Please select a lesson</h1>


          <div className='card--wrapper--wrapper'>
            {/* <button onClick={ () => slide('left')}><i className="fa-solid fa-angle-left lessonNav--icons" ></i></button> */}
            <div className='card--wrapper'>
              <Card id={'Fullerenes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Fullerenes"} img={fullerenesThumbnail} description={"Placeholder for Fullerenes description. Lorem impsum, just random filler text here. And a little more."} />
              <Card id={'Nanotubes'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Nanotubes"} img={nanotubesThumbnail} description={"Placeholder for Nanotubes description. Lorem impsum, just random filler text here. And a little more."}/>
              {/* <Card id={'Diamonds'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Diamonds"} img={diamondsThumbnail} description={"Placeholder for Diamonds description. Lorem impsum, just random filler text here. And a little more."}/> */}
              {/* <Card id={'Graphene'} setPage={props.setPage} setOverlay={props.setOverlay} title={"Graphene"} img={diamondsThumbnail} description={"Placeholder for Graphene description. Lorem impsum, just random filler text here. And a little more."}/> */}
            </div>
            {/* <button onClick={ () => slide('right')} style={{background: 'transparent'}}><i className="fa-solid fa-angle-right lessonNav--icons"></i></button> */}
          </div>

          
          <button className="heroBtn" onMouseEnter={props.rotateModel} onMouseLeave={props.rotateModel} onClick={() => {
          dispatch(start());}}>

            {started ? "Back to Home" : "Get Started"}
          </button>
        
        
          {/* <div className="heroBtn" onClick={() => {
              dispatch(start());
              // Timeout is to create a delay between camera rotating and paining of 
              // lesson DOM elements to the screen. This produces a smoother animation with less 
              // frames being dropped.
              // setTimeout(() => props.setOverlay() , 600)
            }} 
            onMouseEnter={props.rotateModel} 
            onMouseLeave={props.rotateModel}
            >
            <div>
              <a title={started ? "Back to Home" : "Get Started"}></a>
            </div>
          </div> */}
  
      </div>
    </div>
  )
}

export default HomeText