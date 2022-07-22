function HomeNav(props) {
    console.log(props);

    return (
        <header className='lesson1--header'>
            <ul className="homeBtn--wrapper">
                <li className="homeBtn" onClick={() => {
                    props.setCameraRotate();
                    props.setPage(`home`); 
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
                </li>
            </ul>
        </header>
    )
}

export default HomeNav;