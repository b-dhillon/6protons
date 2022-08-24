import { useSelector } from 'react-redux';


function NanotubeText(){
    const counter = useSelector(state => state.counter);

    // Change line breaks into a class with a uniform padding bottom

    if (counter === 0)
    {
        return (
            <div className='title--wrapper'>
                <h1 className='title'>C<sub>n</sub> - Nanotubes</h1>
            </div>
        )
    }

    else if (counter === 1)
    {
        return (
            <div className='text--wrapper' style={{fontSize: 20}}>
                <p>In 1952, L. V. Radushkevich and V. M. Lukyanovich, published clear images of 50nm diameter 
                    tubes made of carbon in the Journal of Physical Chemistry Of Russia. 
                </p>
            </div>
        )
    }

    else if (counter === 2) 
    {
        return (
            <div className='text--wrapper' style={{fontSize: 20}}>
                <p> This discovery went largely unnoticed. As the article was published in Russia during the cold war, a time
                    where Western scientists' access to Soviet press was severely limited.
                </p>
            </div>

            
        )
    }

    else if (counter === 3)
    {
        return(
            <div className='text--wrapper'>
                <p>The rest of this lesson is actively being developed. Please see the lesson on <span>Fullerenes</span> for an example of the
                    minimal viable product (MVP) of this project. 
                </p>
            </div>
        )
    }
    
}

export default NanotubeText;