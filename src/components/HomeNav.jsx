import { useDispatch } from 'react-redux';
import { reset, start } from '../redux/actions';

function HomeNav(props) {
    const dispatch = useDispatch();
    return (
        <ul className="homeNav--wrapper">

            <li className="backBtn" onClick={() => {
                dispatch(reset());
                props.setPage(`Home`); 
            }}>
                <a href="#" className="homeBtn--icon"><i className="fa-solid fa-arrow-left-long" style={{color: 'white'}}></i></a> 
            </li>

            <li className="homeBtn" onClick={() => {
                dispatch(start());
                dispatch(reset());
                props.setPage(`Home`); 
            }}>
                <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></a>
            </li>
        </ul>
    )
}

export default HomeNav;