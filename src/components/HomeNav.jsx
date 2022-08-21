import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../actions';

function HomeNav(props) {

    const dispatch = useDispatch();


    return (
            <ul className="homeBtn--wrapper">
                <li className="homeBtn" onClick={() => {
                    dispatch(reset());
                    props.setPage(`Home`); 
                    
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></a>
                </li>
            </ul>
    )
}

export default HomeNav;