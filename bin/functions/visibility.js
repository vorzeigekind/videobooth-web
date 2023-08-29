// VISIBILITY FUNCTIONS

function makeVisible ( qTarget ){
    if ( qTarget.classList.contains( 'direction-up ') ){
        qTarget.classList.remove( 'direction-up' );
    } else if ( qTarget.classList.contains( 'direction-down ') ){
        qTarget.classList.remove( 'direction-down' );
    }
    qTarget.classList.remove( 'visible-false' );
    qTarget.classList.add( 'visible-true' );
}

function makeInvisible ( qTarget, direction ){
    qTarget.classList.remove( 'visible-true' );
    qTarget.classList.add( 'visible-false' );
    qTarget.classList.add( 'direction-' + direction );
}

export function changeVis ( target, visibility, direction ){
    var queryTarget = document.querySelector( '#' + target );
    if ( visibility == true ){
        makeVisible( queryTarget );
    } else if ( visibility == false ){
        makeInvisible( queryTarget, direction );
    }
};