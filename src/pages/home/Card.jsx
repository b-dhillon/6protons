function Card(props) {
    return (
      <div className="frame" onClick={() => 
        {
          props.setPage(`${props.id}_Lesson`)
          props.setOverlay();
        }
      }>
        <div className="card">
          <h1>{props.title}</h1>
          <img src={props.img} className='card--img' />
          {/* <h3>{props.description}</h3> */}
        </div>
      </div>
    )
}

export default Card