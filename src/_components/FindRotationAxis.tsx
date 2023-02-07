export function FindRotationAxis( AnimationData: [][] ) {
    const subtract = ( a: number[], b: number[] ) => a.map( ( x, i ) => x - b[ i ] );                        
    let axis: string = 'x'; 
    const delta = subtract( AnimationData[ 2 ], AnimationData[ 3 ] );
    if( delta[ 0 ]  ) axis = 'x'; // redundant check
    if( delta[ 1 ]  ) axis = 'y';
    if( delta[ 2 ]  ) axis = 'z';
    return axis;
}