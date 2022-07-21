import { useSelector } from 'react-redux';

export default function Text(){
    const counter = useSelector(state => state.counter);

    if (counter === 0)
    {
        return (
            null
        )
    }

    if(counter === 1)
    {
        return (
            // Refactor all wrapper classes into one.
            <div className='lesson1--text--wrapper'>
                <p>In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of helium gas...</p>
            </div>
        )
    }

    else if(counter === 2)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered.</p>
                <p>This molecule would go on to be named Buckminsterfullerene. Often shortened to fullerene, and nicknamed <span>Buckyball</span>.</p>
            </div>
        )
    }

    else if(counter === 3)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>Each buckyball has 20 hexagons and 12 pentagons <span>(highlighted in red)</span> that fit together like the seams of a soccer ball. </p>
                <p>Fullerenes have extraordinary chemical and physical properties. They are exceedingly rugged and are even capable of surviving the extreme temperatures of outer space. And because they are essentially hollow cages, they can be manipulated to make materials never before known...</p>
            </div>
        )
    }

    else if(counter === 4)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.</p>
                <p>These molecules are presently being studied for use in many other applications, such as new polymers and catalysts, as well as <span>novel drug delivery systems</span>.</p>
                <p>Scientists have even turned their attention to buckyballs in their quest for a <span>cure for AIDS...</span></p>
            </div>
        )
    }

    else if(counter === 5)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p className='lesson1--section5--text'>How can buckyballs help cure aids? An enzyme (HIV-1-Protease) that is required for HIV to reproduce, exhibits a <span>nonpolar pocket</span> in its three-dimensional structure.</p>
                <p className='lesson1--section5--text'>On the model to the right, notice how the nonpolar Fullerene is growing to fit the exact diameter of the enzyme's binding pocket.</p>
                <p className='lesson1--section5--text'>If this pocket is blocked, the production of virus ceases. Because <span>buckyballs are nonpolar</span>, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.</p>
            </div>
        )
    }
    else if(counter === 6)
    {
        return (
            <div className='lesson1--text--wrapper3'>
                <p>Refrences: add references here </p>
            </div>
        )
    }
    
}