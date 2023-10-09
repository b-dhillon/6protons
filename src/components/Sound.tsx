import { Audio } from 'three';

export function Sound({ initializedPage, section }: any): JSX.Element {
  const voices: Audio[] = initializedPage.loadedVoices;
  const music: Audio[] = initializedPage.loadedMusic;

  // Configuring background music
  music[0].play();
  // if (section > 0) {
  //   // music[ 0 ].pause();
  //   music[0].setVolume(0.15);
  //   // music[ 0 ].play();
  //   voices[section].play(8.2);
  // }

  return <></>;
};





















// if( section > 0 && section < props.page.maxSection ) voices[ section ].play( 4 );
// props.data.voices[ section ].offset(4).play();

// // Configuring voice
// if ( props.section > 0 ) {
//     // reset
//     /*
//     voices.forEach( ( voice: any ) => {
//         voice.stop();
//     });
//     */

// }

// Attempt at combining all audio into one component
/*
function Audio( props: any ): JSX.Element {
    return (
        <>
            < BackroundMusic data={ props.data } />
            < Voice data={ props.data } section={ props.section }/>
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
