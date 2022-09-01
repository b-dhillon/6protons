import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../global-styles.css'


function LessonText(){
    const counter = useSelector(state => state.counter);
    const [overflow, setOverflow] = useState();

    useEffect(()=> {
        const element = document.querySelector('.text--wrapper2--p')
        if(element)
        {
            const isOverflown = ({clientHeight, scrollHeight }) => {
                return scrollHeight > clientHeight;
            }
            setOverflow(isOverflown(element));
        }
    }, [counter])

    function ScrollHelper() {
        return (
            <div className='scrolldown--wrapper'>
                <div className="scrolldown">
                    <div className="chevrons">
                        <div className="chevrondown"></div>
                        <div className="chevrondown"></div>
                    </div>
                </div>
            </div>
        )
    }


    // Change line breaks into a class with a uniform padding or margin bottom
    if (counter === 0)
    {
        return (
            <div className='title--wrapper'>
                <h1 className='title' style={{}}>C<sub>60</sub> - Fullerene</h1>
            </div>
        )
    }

    else if(counter === 1)
    {
        return (
            // Refactor all wrapper classes into one.
            <>
                <div className='text--wrapper'>
                    <p>In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of He<sub>2</sub> gas.</p>
                </div>
            </>

        )
    }

    else if(counter === 2)
    {
        return (
            
            <div className='text--wrapper2'>
                <p className='text--wrapper2--p'>The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered.
                <br/>
                <br/>
                This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed <span>Buckyball</span>.</p>
                {overflow ? <ScrollHelper/> : ''}
            </div>
            
        )
    }

    else if(counter === 3)
    {
        return (
            <div className='text--wrapper2'>
                <p className='text--wrapper2--p'>Each molecule of fullerene has 20 hexagons and 12 pentagons <span>(highlighted in red)</span> that fit together like the seams of a soccer ball. 
                <br/>
                <br/>
                Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space, and because they are essentially hollow cages, they can be manipulated to make materials never before known.</p>
                {overflow ? <ScrollHelper/> : ''}
            </div>

        )
    }

    else if(counter === 4)
    {

        return (
            <>
                <div className='text--wrapper2'>
                    <p className='text--wrapper2--p'>For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.
                    <br/>
                    <br/>
                    These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as novel drug delivery systems.
                    <br/>
                    <br/>
                    Scientists have even turned their attention to buckyballs in their quest for a <span>cure for AIDS.</span></p>
                    {overflow ? <ScrollHelper/> : ''}
                </div>

            </>

        )
    }

    else if(counter === 5)
    {
        return (
            <div className='text--wrapper2'>
                <p className='text--wrapper2--p'>
                    How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a <span>nonpolar pocket</span> in its three-dimensional structure.
                    <br/>
                    <br/>
                    On the model to the right, notice how the nonpolar Fullerene is growing to fit the exact diameter of the enzyme's binding pocket.
                    <br/>
                    <br/>
                    If this pocket is blocked, the production of virus ceases. Because <span>buckyballs are nonpolar</span>, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.
                </p>

                {overflow ? <ScrollHelper/> : ''}

            </div>
        )
    }
    else
    {
        return (
            <div className='text--wrapper' style={{fontSize: '1.25rem'}}>
                <h4>Lesson completed! Please navigate back to lesson selection <i className="fa-solid fa-arrow-left-long" style={{color: 'white'}}></i> or home <i className="fas fa-house homeIcon" style={{color: 'white'}}></i></h4>
            </div>
        )
    }
    
}

export default LessonText;