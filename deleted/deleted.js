// Home Nav 

import { useDispatch } from 'react-redux';
import { reset, start } from '../redux/actions';

function HomeNav(props)
{
    const dispatch = useDispatch();
    return (
        <ul className="homeNav--wrapper">

            <li className="backBtn" onClick={() =>
            {
                dispatch(reset());
                props.setPage(`Home`);
            }}>
                <a href="#" className="homeBtn--icon"><i className="fa-solid fa-arrow-left-long" style={{ color: 'white' }}></i></a>
            </li>

            <li className="homeBtn" onClick={() =>
            {
                dispatch(start());
                dispatch(reset());
                props.setPage(`Home`);
            }}>
                <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{ color: 'white' }}></i></a>
            </li>
        </ul>
    )
}


// Lesson Nav 

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/actions';

function LessonNav()
{

    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();

    if (counter === 0)
    {
        return (
            <>
                <div className='footer-container' >
                    <button className="startLessonBtn" onClick={() => dispatch(increment())}>
                        Start Lesson
                    </button>
                </div>
            </>
        )
    }

    else if (counter >= 0)
    {
        return (
            <>
                <div className='lessonNav'>
                    <button className='lesson--decrementBtn'
                        onClick={() => dispatch(decrement())}>
                        <i className="fa-solid fa-angle-left lessonNav--icons" style={{ color: 'white' }}></i>
                    </button>

                    <button className='lesson--incrementBtn'
                        onClick={() => dispatch(increment())}>
                        <i className="fa-solid fa-angle-right lessonNav--icons" style={{ color: 'white' }}></i>
                    </button>
                </div>
            </>
        )
    }
}

// if (props.loading) {
//   return (
//     <>
//       <div className='spinnerWrapper'>
//         <div className='spinner'>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//         <h1 className='loading--title'>loading</h1>
//       </div>
//     </>
//   )
// }

// counter === 2 model
// <group ref={group} {...props} dispose={null} position={positions} scale={scale2}>
          //   <group name="Scene">
          //     <group name="animation-empty">
          //       <mesh name="carbon-atoms" geometry={nodes['carbon-atoms'].geometry} material={materials.Carbon} position={[1.02, 3.01, 1.45]} scale={0.23} />
          //       <mesh name="carbon-bonds" geometry={nodes['carbon-bonds'].geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
          //       <mesh name="soccer-pattern" geometry={nodes['soccer-pattern'].geometry} material={materials.Carbon} position={[0.18, 1.66, 3.07]} scale={0.23} />
          //     </group>
          //     <mesh name="Text" geometry={nodes.Text.geometry} material={materials['text-material']} position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]} />
          //   </group>
          // </group>

// Soccer ball part:
      // if(counter === 3) {
        
      //   OscilateAnimation();

      //   return (
      //     <group ref={ref} {...props} dispose={null} position={positions} scale={scale2}>
      //       <mesh geometry={nodes.Text.geometry} material={materials['text-material']} position={[-0.93, -5, -1.06]} rotation={[Math.PI / 2, 0, 0.13]} scale={0.9} />

      //       <group position={[0.18, 1.66, 3.07]} scale={0.23} rotation={[0,-0.2,0]}>
      //         <mesh geometry={nodes.SurfSphere047.geometry} material={materials['Material.001']} />
      //         <mesh geometry={nodes.SurfSphere047_1.geometry} material={materials['Material.001']} />
      //       </group>
      //     </group>
      //   )
      // }







///////////////////////////////////////////////
// GETTING ANIMATIONS TO SET AT A SPECIFIC TIME
///////////////////////////////////////////////
    
// let _animations; 
  // let actions;

  // let animationTime;


  // This useEffect is what re-starts the animation 
  // useEffect(() =>
  // {
    // if( counter === 0 || 1 )
    // {
    //   console.log(actions);
      // console.log(actions.actions);
      // _animations = Object.values(actions.actions);
      // console.log(_animations);
      // _animations.forEach((a) => a.play())
      // actions.actions.setTime(2)

      // How to get the animation to play at a specific time: 
      // _animations.forEach((a) => {
      //   console.log(a._mixer);
      //   a._mixer.setTime(animationTime)
      //   console.log(a.time);
      //   a.play();
      // })

      // .setTime is on the mixer -- event dispatch prototype
      // actions.actions.setTime()
    // }
  // }, [counter])


  // This prints the current time starting at the setTime() passed above, looping at 8, and going up to 10.
  // useFrame(() => console.log(actions.actions.EmptyAction.time))
