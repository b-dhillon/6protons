
function Vec3ToArr( data: any[] ) {

    const result = [];
    for ( const item of data ) {
        result.push( [item.x, item.y, item.z] );
    }
    return result;
    
}

export default Vec3ToArr;