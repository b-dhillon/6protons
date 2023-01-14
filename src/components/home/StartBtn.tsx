// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { start } from '../redux/actions';
import { useTransition, useSpring, useChain, config, animated, useSpringRef } from "@react-spring/web";
import lessons from '../../components/scenes.jsx';
import lesson from "./oldData";
import styles from "../../styles.module.css";
import { useGLTF } from '@react-three/drei';


export default function StartBtn( props: { handleFlip: any, setPage:  any }  ) {
  const [open, set] = useState(false);
  const dispatch = useDispatch();  
  // const started = useSelector(state => state.start);


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
      marginBottom: open ? "100px" : "170px"
    },

    to: {
      display: open ? "grid" : "flex",
      width: open ? "1200px" : "180px",
      height: open ? "800px" : "44px",
      backgroundColor: open ? "rgba(0,0, 0, 0.1)" : "transparent",
      border: open ? "2px solid #3272F4" : "",
      marginBottom: open ? "100px" : "170px"
    }
  });

  const thumbnailRef = useSpringRef();
  const thumbnailFade = useTransition( open ? lesson : [], 
    {
      ref: thumbnailRef,
      trail: 400 / lesson.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 }
    }
  );
  
  // Chaining the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, thumbnailRef] : [thumbnailRef, springApi], [
    0,
    open ? 0.6 : 0.1
  ]);

  const ref: any = useRef();

  // Controlling the pink border hover animation:
  useEffect( () => {
    ref.current.classList = "";
    ref.current.classList.add(styles.btn);
    if (!open) {
      ref.current.classList.add(styles.hoverAn);
    }
  }, [open])

  function handleClick () {
    set((open) => !open)
    setTimeout( () => dispatch(start()), 100)
    // handleFlip();
    useGLTF.preload( `/lesson1_models/model0.glb`);
  }



  return (
    <animated.div ref={ref} style={{ ...rest, width: width, height: height }} className={styles.btn} 
      onClick={ handleClick } 
      onMouseEnter={ props.handleFlip } 
      onMouseLeave={ props.handleFlip } 
     >

      {!open ? <p className={styles.btnText} >Get Started</p> : ""}

      {open ? <h1 className={styles.title}>Please select a lesson.</h1> : ""}

      { 
        open 
        ? 
        <div className={styles.grid}>
          { thumbnailFade( (animationStyle, lesson) => (
            <animated.div onClick={ (e) => { e.stopPropagation(); props.setPage(lesson.id); } } className={styles.itemContainer} style={{ ...animationStyle }}>
              <div className={styles.items} style={{backgroundImage: `${lesson.thumbnail}`, padding: '20px'} }></div>
            </animated.div>
            //   <p className={styles.caption}>Chirality</p>
          ))}
        </div> 
        : 
        "" 
      }

      {
        open 
        ? 
        <div className={styles.backBtnWrapper}>
          <div className={styles.backBtn}>Back</div>
        </div>  
        : 
        "" 
      }

    </animated.div>
  );
}

