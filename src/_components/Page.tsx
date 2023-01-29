// React: 
import { useState } from 'react';
import { Suspense, useEffect } from 'react';
// Redux:
import { useSelector } from 'react-redux';
// Components:
import UI from './LessonInterface'
import Scene from './Scene'
// Styles:
import '../styles/overlay-styles.css'

export default function Page( props: any ): JSX.Element {
    const [ page, setPage ] = useState( props.data );
    const counter = useSelector( ( state: any ) => state.counter );
    useEffect( () => console.log( 'page _data', page ), [] );
    return (
        < Suspense >

            < UI data={ page } setData={ setPage } counter={ counter }/>
            < Scene data={ page } counter={ counter }/>

        </ Suspense >
    );
};

// To-do:
/* 
To-do: 

    - Refactor 
        - Write unit tests.
            - Configure Jest to work with TypeScript and Modules.
        - Clean up and get a high level understanding of everything that you've re-factored.
        - Add types for 'any' types.

 




    - Add Voices.
        - You'll have to add a delay though to wait out the camera transition.

        - You'll also likely need to add some sort of post-processing effect to blend the background music with the speach audio
            however, this can easily be done with tuning the volumes. --> Likely achieved with .offset()
            
            
    - Juice up camera transitions?
        - Get models positioned properly to right middle half of screen




    - Any way to make updating mixers more efficient?
    - Get rid of all hard coded data, both in data.ts and here in TestPage.tsx.

*/

/*
// Renders UI + creates event handlers to handle user input.
function UI( props ): JSX.Element {

    const dispatch = useDispatch();

    function nextSection() {
        props.setData( (oldData) => {
            return {
                ...oldData, 
                section: oldData.section + 1
            };
        });
    };

    return (
        <>
            <button 
                style={{
                    position: 'absolute', 
                    zIndex: '5', 
                    width: '100px', 
                    height: '33px'
                }} 
                onClick={ () => {
                    dispatch( increment() );
                    nextSection();
                }}
            >
            Next
            </button> 
        </>
    )
};
*/

/* 
<>
{
    props.counter === 1 || props.counter === props.data.max_section
    ?
    < div className='main-container' >

            < div className='lessonNav-container' >
                < button 
                    className='lesson--decrementBtn'
                    onClick={ () => dispatch( decrement() ) }
                >
                    < i className="fa-solid fa-angle-left lessonNav--icons" style={ {color: 'white'} }></ i >

                </ button >
            </ div >

            < Text />

            < div className='lessonNav-container'>
                < button className='lesson--incrementBtn'
                    onClick={ () => dispatch( increment() ) } 
                >
                    < i className="fa-solid fa-angle-right lessonNav--icons" style={ {color: 'white'} }></ i >
                </ button >
            </ div >

    </ div > 
    :
    ""
} 
</> 
*/

/*
console.log( 'scene graph', useThree( (state) => state ) );
const set = useThree( (state) => state.set ); 
props.type === 'next'
?
< i className="fa-solid fa-angle-right lessonNav--icons" style={ { color: 'white' } }></ i >
:
< i className="fa-solid fa-angle-left lessonNav--icons" style={ { color: 'white' } }></ i >
*/ 

/*
delta = .008, 8ms.


final position drop is .051, and then it is a sudden stop fixed at the value. Perhaps after this animation is done, we can 
blend another animation where it trends to another value? Because the other one doesn't stop suddenly, it keeps going and going. 
so we do one animation where we go from initial to final-1, and then another from final-1 to final. 

final position using TranslateZ = .039, final delta = .051
final position using Translate at 1s = 0, final delta = 0.5
final position using Translate at 3.37s  with smooth interpolation = 0, final delta = 0.0072
final position using Translate at 3.37s  with linear interpolation = 0, final delta = 0.0364
final posiition using UpdateCamera = 0.08, final delta = 0.00017


function getLerpValues( final, initial ) {
    let _initial = initial;
    const lerpValues = [ 5 ];
    for( let i = 0; i < 70; i++ ) {
        lerpValues.push( _initial + ( ( final - _initial ) * .008 ) );
        _initial += ( ( final - initial ) * .008 );
    };

    // console.log( lerpValues );
};
    
    getLerpValues( 0, 5 );
*/

/*
function getLerpValues( initial, final ) {
    const lerpValues = [];
    for( let i = 0; i < 70; i++ ) {
        lerpValues.push( initial - ( ( final - initial ) * .008 ) );
    }
    console.log( lerpValues );
}
*/

/*
 getLerpValues( 0, 5 );
 this.z = 5 --> z = 0 
 detlaZ = newZ - oldZ
 newZ = newZ + ( deltaZ * alpha )
 delta = 0.008

 i = i - ( ( f - i ) * .008 )
 01 --> 4.9600 = 5.0000 - ( ( 0 - 5.0000 ) * .008 );
 02 --> 4.9203 = 4.9600 - ( ( 0 - 4.9600 ) * .008 );
 03 --> 4.8809 = 4.9203 - ( ( 0 - 4.9203 ) * .008 );
 04 --> 4.8418 = 4.8809 - ( ( 0 - 4.8809 ) * .008 );
 05 --> 4.8030 = 4.8418 - ( ( 0 - 4.8418 ) * .008 );
 06 --> 4.7645 = 4.8030 - ( ( 0 - 4.8030 ) * .008 );
 07 --> 4.7263 = 4.7645 - ( ( 0 - 4.7645 ) * .008 );
 08 --> 4.6884 = 4.7263 - ( ( 0 - 4.7263 ) * .008 );
 09 --> 4.6508 = 4.6884 - ( ( 0 - 4.6884 ) * .008 );
 10 --> 4.6134 = 4.6508 - ( ( 0 - 4.6508 ) * .008 );
 11 --> 4.5763 = 4.6134 - ( ( 0 - 4.6134 ) * .008 );
 12 --> 4.5395 = 4.5763 - ( ( 0 - 4.5763 ) * .008 );
 13 --> 4.5029 = 4.5395 - ( ( 0 - 4.5395 ) * .008 );
 14 --> 4.4666 = 4.5029 - ( ( 0 - 4.5029 ) * .008 );
 15 --> 4.4305 = 4.4666 - ( ( 0 - 4.4666 ) * .008 );
 16 --> 4.3947 = 4.4305 - ( ( 0 - 4.4305 ) * .008 );
 17 --> 4.3591 = 4.3947 - ( ( 0 - 4.3947 ) * .008 );
 18 --> 4.3238 = 4.3591 - ( ( 0 - 4.3591 ) * .008 );
 19 --> 4.2887 = 4.3238 - ( ( 0 - 4.3238 ) * .008 );
 20 --> 4.2539 = 4.2887 - ( ( 0 - 4.2887 ) * .008 );
 21 --> 4.2193 = 4.2539 - ( ( 0 - 4.2539 ) * .008 );
 22 --> 4.1849 = 4.2193 - ( ( 0 - 4.2193 ) * .008 );
 23 --> 4.1508 = 4.1849 - ( ( 0 - 4.1849 ) * .008 );
 24 --> 4.1169 = 4.1508 - ( ( 0 - 4.1508 ) * .008 );
 25 --> 4.0832 = 4.1169 - ( ( 0 - 4.1169 ) * .008 );
 26 --> 4.0498 = 4.0832 - ( ( 0 - 4.0832 ) * .008 );
 27 --> 4.0166 = 4.0498 - ( ( 0 - 4.0498 ) * .008 );
 28 --> 3.9836 = 4.0166 - ( ( 0 - 4.0166 ) * .008 );
 29 --> 3.9509 = 3.9836 - ( ( 0 - 3.9836 ) * .008 );
 30 --> 3.9184 = 3.9509 - ( ( 0 - 3.9509 ) * .008 );
 31 --> 3.8861 = 3.9184 - ( ( 0 - 3.9184 ) * .008 );
 32 --> 3.8541 = 3.8861 - ( ( 0 - 3.8861 ) * .008 );
 33 --> 3.8223 = 3.8541 - ( ( 0 - 3.8541 ) * .008 );
 34 --> 3.7907 = 3.8223 - ( ( 0 - 3.8223 ) * .008 );
 35 --> 3.7593 = 3.7907 - ( ( 0 - 3.7907 ) * .008 );
 36 --> 3.7282 = 3.7593 - ( ( 0 - 3.7593 ) * .008 );
 37 --> 3.6973 = 3.7282 - ( ( 0 - 3.7282 ) * .008 );
 38 --> 3.6666 = 3.6973 - ( ( 0 - 3.6973 ) * .008 );
 39 --> 3.6362 = 3.6666 - ( ( 0 - 3.6666 ) * .008 );
 40 --> 3.6059 = 3.6362 - ( ( 0 - 3.6362 ) * .008 );
 41 --> 3.5759 = 3.6059 - ( ( 0 - 3.6059 ) * .008 );
 42 --> 3.5461 = 3.5759 - ( ( 0 - 3.5759 ) * .008 );
 43 --> 3.5165 = 3.5461 - ( ( 0 - 3.5461 ) * .008 );
 44 --> 3.4872 = 3.5165 - ( ( 0 - 3.5165 ) * .008 );
 45 --> 3.4581 = 3.4872 - ( ( 0 - 3.4872 ) * .008 );
 46 --> 3.4292 = 3.4581 - ( ( 0 - 3.4581 ) * .008 );
 47 --> 3.4005 = 3.4292 - ( ( 0 - 3.4292 ) * .008 );
 48 --> 3.3721 = 3.4005 - ( ( 0 - 3.4005 ) * .008 );
 49 --> 3.3439 = 3.3721 - ( ( 0 - 3.3721 ) * .008 );
 50 --> 3.3159 = 3.3439 - ( ( 0 - 3.3439 ) * .008 );
 51 --> 3.2881 = 3.3159 - ( ( 0 - 3.3159 ) * .008 );
 52 --> 3.2605 = 3.2881 - ( ( 0 - 3.2881 ) * .008 );
 53 --> 3.2332 = 3.2605 - ( ( 0 - 3.2605 ) * .008 );
 54 --> 3.2061 = 3.2332 - ( ( 0 - 3.2332 ) * .008 );
 55 --> 3.1792 = 3.2061 - ( ( 0 - 3.2061 ) * .008 );
 56 --> 3.1525 = 3.1792 - ( ( 0 - 3.1792 ) * .008 );
 57 --> 3.1260 = 3.1525 - ( ( 0 - 3.1525 ) * .008 );
 58 --> 3.0997 = 3.1260 - ( ( 0 - 3.1260 ) * .008 );
 59 --> 3.0737 = 3.0997 - ( ( 0 - 3.0997 ) * .008 );
 60 --> 3.0478 = 3.0737 - ( ( 0 - 3.0737 ) * .008 );
 61 --> 3.0222 = 3.0478 - ( ( 0 - 3.0478 ) * .008 );
 62 --> 2.9968 = 3.0222 - ( ( 0 - 3.0222 ) * .008 );
 63 --> 2.9716 = 2.9968 - ( ( 0 - 2.9968 ) * .008 );
 64 --> 2.9466 = 2.9716 - ( ( 0 - 2.9716 ) * .008 );
 65 --> 2.9218 = 2.9466 - ( ( 0 - 2.9466 ) * .008 );
 66 --> 2.8972 = 2.9218 - ( ( 0 - 2.9218 ) * .008 );
 67 --> 2.8728 = 2.8972 - ( ( 0 - 2.8972 ) * .008 );
 68 --> 2.8486 = 2.8728 - ( ( 0 - 2.8728 ) * .008 );
 69 --> 2.8246 = 2.8486 - ( ( 0 - 2.8486 ) * .008 );
 70 --> 2.8008 = 2.8246 - ( ( 0 - 2.8246 ) * .008 );
*/