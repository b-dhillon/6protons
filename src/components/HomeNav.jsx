function HomeNav(props) {

    return (
            <ul className="homeBtn--wrapper">
                <li className="homeBtn" onClick={() => {
                    props.setPage(`Home`); 
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></a>
                </li>
            </ul>
    )
}

export default HomeNav;