
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
    // console.log( props.data.loaded_voices );
    const voices = props.page._loaded_voices

    console.log( voices );

    // reset
    voices.forEach( ( voice: any ) => {
        voice.stop();
    });

    // if( counter > 0 && counter < props.page.max_section ) voices[ counter ].play( 4 );
    // props.data.voices[ counter ].offset(4).play();


    voices[ props.counter ].play();
    return <></>
}

export default function Music( props: any ): JSX.Element {
    return (
      < audio autoPlay >
        {/* < source src="/music/fullerene2.mp3" type="audio/mp3" /> */}
        < source src={ props.page.music[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};
