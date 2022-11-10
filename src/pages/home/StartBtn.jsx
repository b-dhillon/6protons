/* 
To-do: 

*/

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { start } from '../../redux/actions';

import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef
} from "@react-spring/web";

import data from "./data";
import styles from "./styles.module.css";


export default function StartBtn({handleFlip}) {
  const [open, set] = useState(false);
  const started = useSelector(state => state.start);
  const dispatch = useDispatch();  


  const springApi = useSpringRef();
  const { height, width, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { 
      display: "flex", 
      width: "200px", 
      height: "50px", 
      backgroundColor: "transparent",
      border: open ? "2px solid #3272F4" : null},

    to: {
      display: open ? "grid" : "flex",
      width: open ? "1200px" : "200px",
      height: open ? "800px" : "50px",
      backgroundColor: open ? "rgba(0,0, 0, 0.1)" : "transparent",
      border: open ? "2px solid #3272F4" : null
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

  // Controlling hover animation:
  useEffect( () => {
    console.log('effect ran');
    ref.current.classList = "";
    ref.current.classList.add(styles.btn);
    if (!open) {
      ref.current.classList.add(styles.hoverAn);
    }
  }, [open])

  return (
    <animated.div ref={ref} style={{ ...rest, width: width, height: height }} className={styles.btn} 
      onClick={() => {
        set((open) => !open)
        dispatch(start())}
      }
      onMouseEnter={handleFlip} onMouseLeave={handleFlip}
    >

      {!open ? <p className={styles.btnText} >Get Started</p> : ""}

      {open ? <h1 className={styles.title}>Please select a lesson.</h1> : ""}

      {open ? 
      <div className={styles.grid}>
        {transition((style, item) => (
          <animated.div
            className={styles.itemContainer}
            style={{ ...style }}
            onClick={(e) => e.stopPropagation() } >
            {/* <p>test</p> */}

            <div className={styles.items}>
            </div>

            <p className={styles.caption}>Chirality</p>
          </animated.div>
        ))}
      </div> : ""}

      {open ? 
      <div className={styles.backBtnWrapper}>
        <div className={styles.backBtn}>Back</div>
      </div>  : null}

    </animated.div>)
}
