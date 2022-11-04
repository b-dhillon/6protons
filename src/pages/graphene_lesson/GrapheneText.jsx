import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../redux/actions';


function GrapheneText(props){
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    if (counter === 0)
    {
        return (
            <div className='title-container'>
                <h1 className='title'>C<sub>n</sub> - Graphene</h1>
            </div>
        )
    }

    else
    {
        return(
            <div className='text--wrapper' style={{flexDirection: 'column'}}>
                <p>This lesson is being developed. Please see the lesson on <span>Fullerenes </span>
                 for an example of the minimal viable product (MVP) of this project.
                </p>

                <button className='fullerene-redirect' onClick={() => {
                    props.setPage('Fullerenes_Lesson');
                    dispatch(reset());
                }}>
                    Go to Fullerenes Lesson
                </button> 
            </div>
        )
    }
    
}

export default GrapheneText;