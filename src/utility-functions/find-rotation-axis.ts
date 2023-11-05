export function FindRotationAxis( AnimationData: [][] ) {
    const subtractEachIndexOf2Arrays = ( a: number[], b: number[] ) => a.map( ( x, i ) => x - b[ i ] );                        
    let axis = 'x'; 
    const delta = subtractEachIndexOf2Arrays( AnimationData[ 2 ], AnimationData[ 3 ] );
    if( delta[ 0 ]  ) axis = 'x'; // redundant check
    if( delta[ 1 ]  ) axis = 'y';
    if( delta[ 2 ]  ) axis = 'z';
    return axis;
}