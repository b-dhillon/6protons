
export default function Audio( props: any ): JSX.Element {
    return (
        <>
            < BackroundMusic />
            < Voice data={ props.data } counter={ props.counter }/>
        </>
    )
}

function Voice( props: any ): void {
    // console.log( props.data.loaded_voices );
    const counter = props.counter; 
    const voices = props.data.loaded_voices

    // reset
    voices.forEach( ( voice: any ) => {
        voice.stop();
    });

    if( counter > 0 && counter < props.data.max_section ) voices[ counter ].play( 4 );
    // props.data.voices[ counter ].offset(4).play();
}

function BackroundMusic() {
    return (
      < audio autoPlay >
        {/* < source src="/music/fullerene2.mp3" type="audio/mp3" /> */}
        < source src={ props.data.musicTracks[ 0 ] } type="audio/mp3" />
      </ audio >
    );
};
