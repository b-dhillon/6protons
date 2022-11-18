import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';
import { useTransition, useSpring, useChain, config, animated, useSpringRef } from "@react-spring/web";
import lessons from '../../components/lessons.js';
import data from "./data";
import styles from "./styles.module.css";
import { useGLTF } from '@react-three/drei';
// import tileTest2 from '../../images/tileTest2.png';


export default function StartBtn({handleFlip, setPage}) {
  const [open, set] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();  


  const springApi = useSpringRef();
  const { height, width, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { 
      display: "flex", 
      width: "180px", 
      height: "44px", 
      backgroundColor: "transparent",
      border: open ? "2px solid #3272F4" : "",
      marginBottom: open ? "150px" : "170px"
    },

    to: {
      display: open ? "grid" : "flex",
      width: open ? "1200px" : "180px",
      height: open ? "800px" : "44px",
      backgroundColor: open ? "rgba(0,0, 0, 0.1)" : "transparent",
      border: open ? "2px solid #3272F4" : "",
      marginBottom: open ? "150px" : "170px"
    }
  });
  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });
  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.6 : 0.1
  ]);

  const ref = useRef();

  // Controlling the pink border hover animation:
  useEffect( () => {
    console.log('effect ran');
    ref.current.classList = "";
    ref.current.classList.add(styles.btn);
    if (!open) {
      ref.current.classList.add(styles.hoverAn);
    }
  }, [open])

  // The problem is that when i set open to false 


  return (
    <animated.div ref={ref} style={{ ...rest, width: width, height: height }} className={styles.btn} 
      onClick={() => {
        set((open) => !open)
        dispatch(start())
        // handleFlip();
        useGLTF.preload( `/lesson1_models/model0.glb`);
        } 
      }
      onMouseEnter={!open ? handleFlip : null} onMouseLeave={!open ? handleFlip : null} >

      {!open ? <p className={styles.btnText} >Get Started</p> : ""}

      {open ? <h1 className={styles.title}>Please select a lesson.</h1> : ""}

      { open ? 

        <div className={styles.grid}>
          { transition( (animationStyle, lesson) => (
            <animated.div onClick={ (e) => { e.stopPropagation(); setPage(lesson.id); } } className={styles.itemContainer} style={{ ...animationStyle }}>
              <div className={styles.items} style={{backgroundImage: `${lesson.background}`, padding: '20px'} }></div>
            </animated.div>
            //   <p className={styles.caption}>Chirality</p>
          ))}
        </div> 

        : "" }

      {open ? 
      <div className={styles.backBtnWrapper}>
        <div className={styles.backBtn}>Back</div>
      </div>  
      : "" }

    </animated.div>)
}


{/* <div className={styles.items} onClick={ () => {
              setPage('Diamonds')
            } }></div>
</div>  */}


