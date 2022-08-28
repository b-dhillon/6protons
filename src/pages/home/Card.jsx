function Card(props) {
    return (

        <div className="card" onClick={() => 
          {
            props.setPage(`${props.id}_Lesson`)
            props.setOverlay();
          }}
        >
          <h1>{props.title}</h1>
          <img src={props.img} className='card--img' />
        </div>
    )
}

export default Card