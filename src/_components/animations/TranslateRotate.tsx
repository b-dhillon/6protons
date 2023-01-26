import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from "three";

function TranslateRotate ( config: config ) {

    const times_Position = [ 0, config.duration ];
    const values_Position = [ ...config.initial_position, ...config.final_position ];
    const trackName_Position = '.position';
    const track_Position = new VectorKeyframeTrack( trackName_Position, times_Position, values_Position );

    const times_Rotation = [ 0, config.duration ];

    let values_Rotation: number[] = []
    if (config.axis === 'x') values_Rotation = [ config.initial_angle[ 0 ], config.final_angle[ 0 ] ];
    if (config.axis === 'y') values_Rotation = [ config.initial_angle[ 1 ], config.final_angle[ 1 ] ];
    if (config.axis === 'z') values_Rotation = [ config.initial_angle[ 2 ], config.final_angle[ 2 ] ];
    const trackName_Rotation = '.rotation[' + config.axis + ']';
    
    const track_Rotation = new NumberKeyframeTrack( trackName_Rotation, times_Rotation, values_Rotation );

    return new AnimationClip( 'TranslateRotateCamera', config.duration, [ track_Position, track_Rotation  ] );

};

interface config {
    duration: number, 
    initial_position: number[],
    final_position: number[], 
    axis: string, 
    initial_angle: number[], 
    final_angle: number[]
}

export default TranslateRotate;