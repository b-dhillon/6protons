import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../redux/actions';

function DiamondText(props){
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    if (counter === 0)
    {
        return (
            <div className='title--wrapper'>
                <h1 className='title' style={{}}>C<sub>n</sub> - Diamond</h1>
            </div>
        )
    }

    // else if (counter === 1)
    // {
    //     return (
    //         <div className='text--wrapper' style={{fontSize: 20}}>
    //             <p>Diamonds are the hardest of all substances. They contain only carbon atoms, just like Fullerenes and Nanotubes. 
    //                 Diamonds however, have their carbon atoms arranged in a <span>tetrahedral lattice</span>. 
    //             </p>
    //         </div>
    //     )
    // }

    else
    {
        
        return(
            <div className='text--wrapper' style={{flexDirection: 'column'}}>
                <p>The lesson is being developed. Please see the lesson on <span>Fullerenes </span>
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

export default DiamondText;