function Card( props: any ) {
    return (
        <div className="card" onClick={() => { props.setPage(`${props.id}`) }}>
          <h1>{props.title}</h1>
          <img src={props.img} className='card--img' />
        </div>
    )
}

export default Card