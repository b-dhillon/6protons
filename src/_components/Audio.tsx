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

export function Audio( props: any ): JSX.Element {
    const voices: Audio[] = props.page._loaded_voices
    const music: Audio[] = props.page._loaded_music

    // Configuring background music
    music[ 0 ].play();
    if ( props.counter > 0 ) {
        music[ 0 ].pause();
        music[ 0 ].setVolume( 0.15 );
        music[ 0 ].play();
    }

    // Configuring voice
    if ( props.counter > 0 ) {
        voices[ props.counter ].play();
    }



    return <></>

    // reset
    // voices.forEach( ( voice: any ) => {
    //     voice.stop();
    // });

    // if( counter > 0 && counter < props.page.max_section ) voices[ counter ].play( 4 );
    // props.data.voices[ counter ].offset(4).play();
}

export default function Music( props: any ): JSX.Element {
    return (
      < audio autoPlay >
        < source src={ props.page.music[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};
