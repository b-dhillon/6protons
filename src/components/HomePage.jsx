import { useState, Suspense, useRef, useEffect} from 'react'
import { Canvas, useFrame, } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'
import fullerenesThumbnail from '../images/fullerenes2.jpeg'
import diamondsThumbnail from '../images/diamonds12-min.png'
import nanotubesThumbnail from '../images/nano.jpeg'
// import * as random from "maath/random";


export default function HomePage(props) 
{
  const [flipped, setFlipped] = useState(false);

  function rotateModel()
  {
    setFlipped(!flipped);
  }

  return (
    <>
        {/* 3D SCENE */}
        <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 20, fov: 75, position: [0,0,5] }}>
          <color attach="background" args={["#000000"]} />
            <Suspense fallback={null}>
                <Stars />
                <RotateCamera cameraRotate={props.cameraRotate}/>
                <spotLight position={[10, 10, 10] } intensity={1}/>
                <ambientLight intensity={.4} />
                <TestosteroneModel flipped={flipped}/>
            </Suspense>
        </Canvas>

        {/* OVERLAYS  */}
        { props.cameraRotate ? <LessonSelectionOverlay setPage={props.setPage}/> : <HeroOverlay />}

        {/* BUTTONS */}
        <div className="heroBtn" onMouseEnter={rotateModel} onMouseLeave={rotateModel} onClick={() => {props.setCameraRotate()}} style={props.cameraRotate ? {marginTop: 80} : {marginTop: 0}}>
            <div><a title={props.cameraRotate ? "Back to Home" : "Get Started"}></a></div>
        </div>

    </>
    )
}

function RotateCamera({cameraRotate}) {
  useFrame((state) => 
  {
    // Rotating camera on button click -- NEEDS TO BE MOVED
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (cameraRotate ? (Math.PI) : 0), 0.05)
  })
  return <></>
}

function TestosteroneModel(props) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/testosterone2-transformed.glb')

    useFrame((state) => {
        ref.current.rotation.z = Math.sin((state.clock.elapsedTime) * 1.5) / 6
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, props.flipped ? (Math.PI * 1.5) : Math.PI / 2 , 0.1)
    })

    return (
    <group position={[-.1, .55, -1]} {...props} dispose={null}>
        {/* <Html scale={0.5} rotation={[0, 0, 0]} position={[0, -0.6, 0]} transform occlude style={ props.flipped ? {display: ''} : {display: 'none'}}>
          <div className="annotation">
            Steroid Hormone
          </div>
        </Html> */}
        <group ref={ref} scale={0.07} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.SurfSphere.geometry} material={materials.Oxygen} />
            <mesh geometry={nodes.SurfSphere_1.geometry} material={materials.Carbon} />
            <mesh geometry={nodes.SurfSphere_2.geometry} material={materials.Hydrogen} />
        </group>
    </group>
    )
}

function HeroOverlay() {
    return (
      <div className='hero--wrapper'>
        <div className='hero' >
            <h1 className='hero--title'>Learn by Seeing.</h1>
            <p className='hero--subtitle'>A visual introduction to organic chemistry.</p>
        </div>
      </div>
  )
}

function LessonSelectionOverlay(props) {
  function Card(props) 
  {
    
    const frame = useRef();
    const card = useRef(); 

    function mouseMove(e)
    { 
      let { x, y, width, height } = frame.current.getBoundingClientRect()
      const left = e.clientX - x
      const top = e.clientY - y
      const centerX = left - width / 2
      const centerY = top - height / 2
      const d = Math.sqrt(centerX ** 2 + centerY ** 2)
  
      card.current.style.boxShadow = `
      ${-centerX / 5}px ${-centerY / 5}px 40px rgba(248, 248, 248, 0.689)`
  
      card.current.style.transform = `
      rotate3d(${-centerY / 5}, ${centerX / 5}, 0, ${d / 12}deg)`
  
      // light.current.style.backgroundImage = `
      // radial-gradient(circle at ${left}px ${top}px, #00000040, #ffffff00, #ffffff99)`
    }
  
    function mouseLeave()
    {
      frame.current.removeEventListener('mousemove', mouseMove)
      card.current.style.boxShadow = ''
      card.current.style.transform = ''
    }
    

    return (
      <div className="frame" onMouseMove={mouseMove} onMouseLeave={mouseLeave} ref={frame} onClick={() => props.setPage(`lesson${props.id}`)}>
      {/* <div className="frame" onClick={() => props.setPage(`lesson${props.id}`)}> */}
        <div className="card" ref={card}>
        {/* <div className="card"> */}
          <h1>{props.title}</h1>
          <img src={props.img} className='card--img'/>
          <h3>{props.description}</h3>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='lessonSelection--wrapper'>
        <h1 className='lessonSelection--title'>Please select a lesson.</h1>
        <div className='card--wrapper'>
          <Card id={1} setPage={props.setPage} title={"Fullerenes"} img={fullerenesThumbnail} description={"Placeholder for Fullerenes description. Lorem impsum, just random filler text here. And a little more."} />
          <Card id={2} setPage={props.setPage} title={"Diamonds"} img={diamondsThumbnail} description={"Placeholder for Diamonds description. Lorem impsum, just random filler text here. And a little more."}/>
          <Card id={3} setPage={props.setPage} title={"Nanotubes"} img={nanotubesThumbnail} description={"Placeholder for Nanotubes description. Lorem impsum, just random filler text here. And a little more."}/>
        </div>
      </div>
    </>
  )
}