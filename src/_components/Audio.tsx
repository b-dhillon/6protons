import { Audio } from 'three';

/*
function Audio( props: any ): JSX.Element {
    return (
        <>
            < BackroundMusic data={ props.data } />
            < Voice data={ props.data } counter={ props.counter }/>
        </>
    )
}
*/

export function Voice( props: any ): JSX.Element {
    const voices: Audio[] = props.page._loaded_voices

    // reset
    // voices.forEach( ( voice: any ) => {
    //     voice.stop();
    // });

    // if( counter > 0 && counter < props.page.max_section ) voices[ counter ].play( 4 );
    // props.data.voices[ counter ].offset(4).play();


    voices[ 0 ].play();
    if ( props.counter > 0 ) {
        voices[ 0 ].pause();
        voices[ 0 ].setVolume( 0.15 );
        voices[ 0 ].play();
        console.log( voices[ 0 ].getVolume() );
    }

    return <></>
}

export default function Music( props: any ): JSX.Element {
    return (
      < audio autoPlay >
        < source src={ props.page.music[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};
