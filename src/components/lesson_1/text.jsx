import { useSelector } from 'react-redux';

export default function Text(){
    const counter = useSelector(state => state.counter);

    function TopNavBar({sectionState, setPage, setCameraRotate}) {
        return (
            <header className='lesson1--header'>
                <ul className="homeBtn--wrapper">
                    <li className="homeBtn" onClick={() => 
                    {
                        setPage(`home`)
                        setCameraRotate()
                    }}>
                        <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
                    </li>
                </ul>
                {counter === 0 ? <h1 style={{zIndex: 3, position: 'absolute'}}>C<sub>60</sub> - Fullerene</h1> : null}
            </header>
        )
    }

    if (counter === 0)
    {
        return (
            <TopNavBar />
        )
    }

    if(counter === 1)
    {
        return (
            // Refactor all wrapper classes into one.
            <>
                <TopNavBar />
                <div className='lesson1--text--wrapper'>
                    <p>In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of He<sub>2</sub></p>
                </div>
            </>

        )
    }

    else if(counter === 2)
    {
        return (
            <>
                <TopNavBar />
                <div className='lesson1--text--wrapper2'>
                    <p>The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered.
                    <br/>
                    <br/>
                    This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed <span>Buckyball</span>.</p>
                </div>
            </>
        )
    }

    else if(counter === 3)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>Each fullerene (buckyball) has 20 hexagons and 12 pentagons <span>(highlighted in red)</span> that fit together like the seams of a soccer ball. 
                <br/>
                <br/>
                They have extraordinary chemical and physical properties. Fullerenes are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known.</p>
            </div>
        )
    }

    else if(counter === 4)
    {
        return (
            <>
                <div className='lesson1--text--wrapperX'>
                    <p>For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.
                    <br/>
                    <br/>
                    These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as <span>novel drug delivery systems</span>.
                    <br/>
                    <br/>
                    Scientists have even turned their attention to buckyballs in their quest for a <span>cure for AIDS...</span></p>
                </div>
            </>

        )
    }

    else if(counter === 5)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>
                    How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a <span>nonpolar pocket</span> in its three-dimensional structure.
                    <br/>
                    <br/>
                    On the model to the right, notice how the nonpolar Fullerene is growing to fit the exact diameter of the enzyme's binding pocket.
                    <br/>
                    <br/>
                    If this pocket is blocked, the production of virus ceases. Because <span>buckyballs are nonpolar</span>, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.
                </p>
            </div>
        )
    }
    else if(counter === 6)
    {
        return (
            <div className='lesson1--text--wrapper3'>
                <h4>Congratulations! 🎉 You have completed this lesson!</h4>
            </div>
        )
    }
    
}