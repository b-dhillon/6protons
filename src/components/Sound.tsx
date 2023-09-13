import { Audio } from 'three';

export function Sound( { page, counter }: any ): JSX.Element {

    const voices: Audio[] = page.loadedVoices
    const music: Audio[] = page.loadedMusic

    // Configuring background music
    music[ 0 ].play();
    if ( counter > 0 ) {
        // music[ 0 ].pause();
        music[ 0 ].setVolume( 0.15 );
        // music[ 0 ].play();
        voices[ counter ].play( 8.2 );
    }

    // // Configuring voice
    // if ( props.counter > 0 ) {
    //     // reset
    //     /*
    //     voices.forEach( ( voice: any ) => {
    //         voice.stop();
    //     });
    //     */

    // }

    return <></>

    // if( counter > 0 && counter < props.page.maxSection ) voices[ counter ].play( 4 );
    // props.data.voices[ counter ].offset(4).play();
}





























// Attempt at combining all audio into one component
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

// Old audio code -- using HTML audio elements
/*
export default function Music( props: any ): JSX.Element {
    return (
      < audio autoPlay >
        < source src={ props.page.music[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};
*/