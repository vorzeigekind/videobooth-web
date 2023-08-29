// INDEX FUNCTION

export function indexify( attribute ){
    var object = {};
    object[ attribute ] = Math.floor( Math.random() * 10000 );
    return( JSON.stringify( object ) );
};